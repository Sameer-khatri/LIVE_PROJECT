export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const failedHistory = new Map();
const lastUserLogins = new Map();

export function evaluateEvent(rawEvent, policy) {
  const factors = [];
  let points = 0;
  const now = new Date(rawEvent.timestamp || Date.now()).getTime();

  // 1. Heuristics: Failed login velocity
  if (rawEvent.eventType === 'LOGIN_FAILED') {
    const key = rawEvent.user?.id || rawEvent.client?.ip || 'unknown';
    const timestamps = (failedHistory.get(key) || []).filter(t => now - t < 60 * 1000);
    timestamps.push(now);
    failedHistory.set(key, timestamps);

    if (timestamps.length >= (policy.bruteForceThreshold || 5)) {
      factors.push(`Rapid Brute-Force: ${timestamps.length} failures inside 60s window`);
      points += 45;
    } else {
      factors.push('Authentication credential mismatch');
      points += 15;
    }
  }

  // 2. Threat Intel: Tor Exit Node / Datacenter ASN
  if (rawEvent.client?.ipType === 'TOR_EXIT') {
    factors.push('Source IP verified as Tor Onion Anonymizing Exit Node');
    points += 50;
  } else if (rawEvent.client?.ipType === 'DATACENTER') {
    factors.push(`Hosting provider datacenter ASN: ${rawEvent.client.asn || 'Cloud Datacenter'}`);
    points += 25;
  }

  // Suspicious user-agent
  const ua = (rawEvent.client?.userAgent || '').toLowerCase();
  if (ua.includes('python') || ua.includes('curl') || ua.includes('headless')) {
    factors.push('Automated attack runner script detected in User-Agent header');
    points += 35;
  }

  // 3. UEBA: Impossible Travel Velocity
  if (rawEvent.user?.id && rawEvent.client?.latitude && rawEvent.client?.longitude) {
    const last = lastUserLogins.get(rawEvent.user.id);
    if (last) {
      const timeDeltaHours = Math.max(0.01, (now - new Date(last.timestamp).getTime()) / (1000 * 60 * 60));
      const distKm = calculateDistanceKm(last.lat, last.lon, rawEvent.client.latitude, rawEvent.client.longitude);
      const speedKmH = Math.round(distKm / timeDeltaHours);

      if (distKm > 300 && speedKmH > (policy.impossibleTravelSpeedKmH || 800)) {
        factors.push(`Impossible physical travel: ${speedKmH.toLocaleString()} km/h (${distKm} km from ${last.city} to ${rawEvent.client.city} in ${(timeDeltaHours * 60).toFixed(0)} mins)`);
        points += 55;
      }
    }

    lastUserLogins.set(rawEvent.user.id, {
      timestamp: rawEvent.timestamp,
      lat: rawEvent.client.latitude,
      lon: rawEvent.client.longitude,
      city: rawEvent.client.city
    });
  }

  // Calculate final score clamped 0 - 100
  const finalScore = Math.min(100, Math.max(8, points));
  let riskTier = 'LOW';
  let verdict = 'AUTHORIZED';

  if (finalScore >= 70) {
    riskTier = 'CRITICAL';
    verdict = 'ATTACK_DETECTED';
  } else if (finalScore >= 40) {
    riskTier = 'MEDIUM';
    verdict = 'SUSPICIOUS';
  }

  return {
    ...rawEvent,
    id: rawEvent.id || `evt_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: rawEvent.timestamp || new Date().toISOString(),
    evaluation: {
      riskScore: finalScore,
      riskTier,
      verdict,
      factors,
      autonomousActionTaken: finalScore >= 70 && policy.autoRevokeOnCritical ? 'SESSION_REVOKED_BY_AUTHSENTRY' : undefined
    }
  };
}
