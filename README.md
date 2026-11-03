# SentinelLite AI & AuthSentry ITDR — Enterprise Identity Threat Detection & Response Platform

> **Tailored for SMBs and Security Teams Needing Enterprise-Grade Identity Defense Without Enterprise SIEM Complexity.**  
> Real-Time Telemetry · Autonomous Response · OSINT-Style Historical Graph Investigation · Full REST API Backend

---

## 📁 Repository Structure

```
├── PRDs/                                # Complete Requirements & Architecture Suite
│   ├── project.prd                      # Problem Statement, Personas, Value Proposition
│   ├── techstack.prd                    # Tech Stack, Real-Time Budgets & Data Models
│   ├── architecture.prd                 # Multi-Layer Detection Pipeline (Haversine, UEBA, Tor)
│   ├── ui_ux.prd                        # SOC Interface Guidelines, Accessibility & Tokens
│   ├── dashboard.prd                    # Specification for Living Operations SOC Dashboard
│   └── ANALYZER.prd                     # Specification for Stored Intelligence OSINT Graph
│
└── tool/                                # Production Full-Stack Application
    ├── server/                          # 🚀 Express REST Backend & Threat Engine
    │   ├── db.json                      # Persistent Database Store (Users, Devices, IPs, Events)
    │   ├── engine.js                    # Server-side Haversine & Sliding-Window Anomaly Engine
    │   ├── store.js                     # In-Memory & File-Backed Storage Operations
    │   └── index.js                     # Express Server (Port 3001) with Health, Ingest, Sim APIs
    ├── src/
    │   ├── components/
    │   │   ├── analyzer/                # 🕸️ Stored Intelligence Graph Components
    │   │   │   ├── AnalyzerCanvas.tsx   # Horizontally expanding OSINT graph (Root + G1 + G2 + G3)
    │   │   │   ├── InspectorPanel.tsx   # Right 30% inspection panel with histogram sparkline
    │   │   │   └── AnalyzerView.tsx     # Coordinator container
    │   │   ├── tabs/                    # 🧭 Dedicated Operational Platform Tabs
    │   │   │   ├── IncidentStreamTab.tsx# Real-Time Incident Stream with Raw OCSF JSON Viewer
    │   │   │   ├── MitigationCenterTab.tsx# Autonomous Kill-Switch & IP Deny-List Response
    │   │   │   └── PolicyStudioTab.tsx  # Dynamic Detection Threshold Tuning & Auto-Containment
    │   │   ├── HeaderBar.tsx            # Live DEFCON banner & status indicators
    │   │   ├── SimulatorBar.tsx         # Live attack vector injector (5 scenarios)
    │   │   ├── HeroSection.tsx          # Radar + Living Arc + Session Entropy
    │   │   ├── RadarWidget.tsx          # 6-Axis Identity Attack Surface
    │   │   ├── CelestialArcGauge.tsx    # Semicircular Compromise Arc (74th percentile)
    │   │   ├── SessionTrendWidget.tsx   # Session age & 24h risk curve
    │   │   ├── RiskScoreCard.tsx        # Identity Risk Score (0.76 vs 0.15)
    │   │   ├── IdentityHygieneTable.tsx # UEBA behavioral baseline table
    │   │   ├── ThreatVelocityCard.tsx   # Travel velocity (8,820 km/h) & Kill-Switch
    │   │   └── ReportModal.tsx          # Printable incident audit report
    │   ├── services/
    │   │   └── api.ts                   # Resilient Full-Stack REST Client with Offline Fallback
    │   ├── types/
    │   │   ├── dashboard.ts
    │   │   └── analyzer.ts              # Stored intelligence node interfaces
    │   ├── data/
    │   │   ├── dashboardData.ts
    │   │   └── analyzerData.ts           # Historical database archive records
    │   ├── App.tsx                      # Root coordinator with 5-Tab Navigation System
    │   ├── index.css                    # Tailwind + Luxury Dark Slate/Graphite Theme
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts                   # Vite config with backend proxy (/api -> :3001)
```

---

## 🧭 The 5 Navigation Tabs

1. **`📊 Living Operations Center`**:
   * **Living Attack Gauge:** Semicircular compromise arc showing 74th percentile risk with animated breathing glow and 5 orbiting satellite vectors.
   * **6-Axis Identity Surface Radar:** Real-time multi-dimensional exposure across Credential, Geolocation, MFA, Device, Network, and Privilege axes.
   * **Session Entropy & 24h Curve:** OAuth refresh token lifetime vs zero-trust policy limit, accompanied by a 24-hour hourly risk curve.
   * **3 Analytical Bottom Cards:** Normalized Composite Risk (0.76 vs 0.15 baseline), Identity Hygiene UEBA Baselines, and Threat Travel Velocity (8,820 km/h).
   * **Live Attack Simulator:** Injects 5 realistic attack scenarios (`Impossible Travel`, `Credential Stuffing`, `MFA Push Bombing`, `Tor Exit Reset`, `Legitimate Baseline`).

2. **`🕸️ Stored Intelligence (Analyzer Graph)`**:
   * **Left-to-Right Horizontal Graph:** Planetary iris root node (`STORED SECURITY INTELLIGENCE`) expanding horizontally into 10 first-generation categories.
   * **Multi-Generation Fan-Out:** Expanding any category displays individual entity nodes connected by smooth Bezier curves.
   * **Evidence Nodes:** Expanding any entity reveals profile, login history, associated devices, IPs, and alerts.
   * **Inspector Panel (~30% Width):** Displays entity risk contribution histogram sparkline, 2x2 metric tiles, AI synthesis summary, and interactive query search.

3. **`⚡ Incident Stream & Triage`**:
   * Live real-time chronological event stream with DEFCON severity badges (`CRITICAL`, `HIGH`, `LOW`).
   * Filterable by severity and full-text search across actor, IP, and detection rule.
   * One-click drawer to inspect **raw OCSF / CEF JSON payload** for compliance audits.

4. **`🛡️ Autonomous Responses`**:
   * Instant SOC Containment Console: One-click "Emergency Revoke All Active Sessions" kill-switch.
   * Active Quarantined IP Deny-List with rule citation, timestamp, and instant "Unblock IP" action.
   * Live Autonomous Audit Log tracking all automated interventions.

5. **`⚙️ Policy Studio`**:
   * Interactive threshold sliders: Maximum Travel Speed (km/h), Sliding Window for Failed Logins, MFA Push Fatigue threshold, and Session Expiry.
   * Autonomous Auto-Containment triggers for zero-touch credential suspension.

---

## 🚀 How to Run the Tool

### Option A: Standard Full-Stack (Backend + Frontend)

Open two terminals:

**Terminal 1 — Express Backend API:**
```bash
cd tool
npm run server
```
*Backend runs on `http://localhost:3001`.*

**Terminal 2 — Vite React Frontend:**
```bash
cd tool
npm run dev
```
*Frontend runs on `http://localhost:5173` with automatic `/api` proxy forwarding.*

---

### Option B: Frontend Standalone (with Built-In Engine Fallback)

If you only want to start one terminal, the frontend includes a resilient fallback detection engine so all simulations and telemetry work out-of-the-box:

```bash
cd tool
npm run dev
```

Open your browser to: **`http://localhost:5173`**

---

## 📡 Backend API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/health` | Healthcheck and active system metrics |
| `GET` | `/api/v1/events` | List all normalized OCSF security events |
| `POST` | `/api/v1/events/ingest` | Ingest external identity event and compute risk |
| `GET` | `/api/v1/events/stats` | Retrieve aggregate counts, DEFCON level & risk |
| `GET` | `/api/v1/stored-intelligence/root` | Fetch stored intelligence root node and counts |
| `POST` | `/api/v1/simulate/:scenarioId` | Trigger attack scenario (`impossible_travel`, `stuffing`, `mfa_bombing`, `tor_reset`, `baseline`) |
| `POST` | `/api/v1/mitigate/revoke` | Revoke user sessions or quarantine actor IP |
| `GET/POST` | `/api/v1/policy` | Retrieve or update live SOC detection thresholds |
