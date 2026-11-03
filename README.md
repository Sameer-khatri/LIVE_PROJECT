# SentinelLite AI & AuthSentry ITDR — Dual Operation Platform

> **1. Living Operations Center** (Executive Real-Time SOC Dashboard)  
> **2. Stored Intelligence & Historical Graph (Analyzer)** (OSINT Multi-Generation Investigation Graph)

---

## 📁 Project Structure

```
├── PRDs/                                # Complete Requirements Suite
│   ├── project.prd                      # Core Business, Problem & Scope PRD
│   ├── techstack.prd                    # Tech Stack PRD
│   ├── architecture.prd                 # Multi-Layer Detection Pipeline PRD
│   ├── ui_ux.prd                        # SOC Interface Guidelines PRD
│   ├── dashboard.prd                    # Master Specification for Living Dashboard
│   └── ANALYZER.prd                     # Master Specification for Stored Intelligence Graph
│
└── tool/                                # Working Application
    ├── src/
    │   ├── components/
    │   │   ├── analyzer/                # 🕸️ Stored Intelligence Graph Components
    │   │   │   ├── AnalyzerCanvas.tsx   # Horizontally expanding OSINT graph (Root + G1 + G2 + G3)
    │   │   │   ├── InspectorPanel.tsx   # Right 30% inspection panel with histogram sparkline
    │   │   │   └── AnalyzerView.tsx     # Coordinator container
    │   │   ├── HeaderBar.tsx            # Live DEFCON banner & controls
    │   │   ├── SimulatorBar.tsx         # Live attack vector switcher
    │   │   ├── HeroSection.tsx          # Radar + Living Arc + Session Entropy
    │   │   ├── RadarWidget.tsx          # 6-Axis Identity Attack Surface
    │   │   ├── CelestialArcGauge.tsx    # Semicircular Compromise Arc (74th percentile)
    │   │   ├── SessionTrendWidget.tsx   # Session age & 24h risk curve
    │   │   ├── RiskScoreCard.tsx        # Identity Risk Score (0.76 vs 0.15)
    │   │   ├── IdentityHygieneTable.tsx # UEBA behavioral baseline table
    │   │   ├── ThreatVelocityCard.tsx   # Travel velocity (8,820 km/h) & Kill-Switch
    │   │   └── ReportModal.tsx          # Printable incident audit report
    │   ├── types/
    │   │   ├── dashboard.ts
    │   │   └── analyzer.ts              # Stored intelligence node interfaces
    │   ├── data/
    │   │   ├── dashboardData.ts
    │   │   └── analyzerData.ts           # Historical database archive records
    │   ├── App.tsx                      # Root coordinator with 1-click Tab Switcher
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 How to Run the Tool

```bash
cd "c:\Users\Optim\Desktop\New folder (3)\tool"
npm run dev
```

Open: **`http://localhost:5173`**

---

## 🧭 How to Navigate Between Views

Use the **Tab Switcher** at the top left of the dashboard:

1. **`📊 Living Operations Center`**:
   * View the living 74th percentile compromise arc, 6-axis radar, 24h risk line curve, and trigger live attack simulations.
2. **`🕸️ Stored Intelligence (Analyzer Graph)`**:
   * Inspect the historical cybersecurity database through a true **left-to-right horizontally expanding OSINT graph** matching the reference design!
   * **Root Node:** `STORED SECURITY INTELLIGENCE` with 1,428 records and planetary iris aura.
   * **Generation 1:** 10 core category branches (`USER RECORDS`, `LOGIN HISTORY`, `SECURITY EVENTS`, `PASSWORD HISTORY`, `DEVICE HISTORY`, `IP HISTORY`, `ALERT ARCHIVE`, `SESSION HISTORY`, `DETECTION EVIDENCE`, `AUDIT HISTORY`).
   * **Generation 2:** Selecting any category fans out smooth radial curved fibers to individual entity nodes.
   * **Generation 3:** Selecting an entity expands contextual evidence (`Profile`, `Login Timeline`, `Devices`, `IPs`, `Alerts`).
   * **Right Inspector Panel (~30%):** Displays entity details, risk contribution rate histogram sparkline, 2x2 metric tiles, AI synthesis, and interactive natural-language query bar.
