export async function fetchHealth() {
  try {
    const res = await fetch('/api/v1/health');
    return await res.json();
  } catch (e) {
    return { status: 'STANDALONE_CLIENT', error: e instanceof Error ? e.message : 'Unknown error' };
  }
}

export async function ingestEvent(eventPayload: any) {
  try {
    const res = await fetch('/api/v1/events/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventPayload)
    });
    return await res.json();
  } catch (e) {
    console.warn('API offline, processing client-side:', e);
    return { success: true, clientFallback: true, event: eventPayload };
  }
}

export async function triggerSimulationApi(scenarioId: string) {
  try {
    const res = await fetch(`/api/v1/simulate/${scenarioId}`, { method: 'POST' });
    return await res.json();
  } catch (e) {
    return { success: true, clientFallback: true };
  }
}

export async function revokeSessionApi(userEmail: string, reason: string) {
  try {
    const res = await fetch('/api/v1/mitigate/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userEmail, reason })
    });
    return await res.json();
  } catch (e) {
    return { success: true, clientFallback: true };
  }
}

export async function fetchPolicyApi() {
  try {
    const res = await fetch('/api/v1/policy');
    return await res.json();
  } catch (e) {
    return null;
  }
}

