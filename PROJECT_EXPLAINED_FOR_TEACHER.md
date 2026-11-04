# AuthSentry ITDR — Teacher Presentation & Project Guide
**Autonomous Identity Threat Detection & Response Platform**

---

## 1. What is this project in simple words?
Imagine a company where **1,428 employees** log into work every day using their laptops, smartphones, and office computers. 

**AuthSentry is like an intelligent digital security guard that watches all user logins in real-time.** 
Instead of just asking *"Did they type the right password?"*, it checks **behavior, location, and physical speed** to catch hackers even when they have stolen real passwords.

> **The 1-Sentence Elevator Pitch:**  
> *"AuthSentry protects companies from stolen passwords and token hijacking by analyzing login behavior in real-time (like detecting if someone logged in from two countries 8 minutes apart) and automatically kicking hackers out in under 38 milliseconds."*

---

## 2. Why do we need it? (The Real-World Problem)
In modern cybersecurity, hackers rarely break into servers through firewalls. Instead, **they steal employee passwords** through phishing emails, malware, or darknet data dumps.

* **The Old Way (Fails):**  
  Standard login systems only check: *"Is the password correct?"* If a hacker types the stolen password, the system welcomes them right in, believing they are the employee.
* **The AuthSentry Way (Succeeds):**  
  AuthSentry checks physics and habits. Even with the correct password, if employee **Sarah Chen** logs in from **San Francisco** and then 8 minutes later logs in from **Germany**, that requires flying at **8,820 km/h (Mach 7.1)**! AuthSentry identifies this impossible speed and instantly cancels the stolen session.

---

## 3. Core Terminology Explained Simply

| Term | What it Means in Plain English |
| :--- | :--- |
| **ITDR** | *Identity Threat Detection & Response* — Software dedicated to protecting accounts, logins, and identity tokens rather than just servers. |
| **Impossible Travel** | When two consecutive logins occur from distant locations faster than any commercial passenger airplane can fly (commercial speed limit is ~900 km/h). |
| **Credential Spraying** | An automated hacker bot rapidly testing stolen passwords against dozens of employee accounts in a few seconds. |
| **MFA Push Fatigue** | When a hacker floods an employee's phone with dozens of login approval popups at night, hoping the tired employee accidentally taps "Accept". |
| **Tor Exit Node** | An encrypted anonymizing darknet relay used by attackers to hide their real country and location. |
| **Autonomous Mitigation** | When the software takes defense action automatically (e.g. revoking tokens, blocking IPs) without waiting hours for human approval. |

---

## 4. Which Page is What? (The 5 Application Tabs)

### Tab 1: Security Dashboard (`Badge: HQ`)
* **What it is:** The main executive cockpit showing the entire enterprise's security health.
* **Key Features:**
  * **Threat Detection & Diagnostic Matrix:** 5 interactive cards where you can test live attack simulations (*Impossible Travel*, *Password Guessing*, *Phone Spam*, *Tor Relays*, *Normal Safe Day*). Clicking any card triggers an active live evaluation scan!
  * **Concentric Living Arc Gauge:** Visualizes the company's baseline danger score (**22% = Normal & Healthy**) and authentication distribution (68% Single Sign-On, 21% Hardware Keys).
  * **Radar Vulnerability Map:** A 6-axis web graph showing risk distribution across passwords, locations, phone alerts, new devices, hidden networks, and resets.
  * **Hacker Speed & Impossible Travel Card:** Displays real-time calculated velocity (e.g. 33 km/h safe vs 8,820 km/h alert).

### Tab 2: History Tree (`Badge: 10 Hubs`)
* **What it is:** An interactive forensic investigation archive and visual search engine.
* **Key Features:**
  * **10 Archive Hubs:** Organizes all historical company activity into clean branches (User Records, Login History, Device History, IP History, Detection Evidence, Audit Trail).
  * **Forensic Dossier:** Selecting an employee (like *Sarah Chen*) reveals their account threat score, 24-hour activity sparkline, known devices, and a **Plain English AI Security Summary** explaining what happened.

### Tab 3: Recent Activity (`Badge: Live Feed`)
* **What it is:** The live flight recorder streaming incoming authentication events from around the world.
* **Key Features:**
  * **Reload Latest Event Button:** Click to immediately poll the edge gateway and ingest a new live authentication packet from Dublin, Tokyo, London, or Austin with audio feedback.
  * **Live Ingestion HUD:** Displays WebSocket connection status and throughput (18.4 messages/sec).
  * **Raw Telemetry Payload Viewer:** Clicking any event row expands its forensic detection factors and shows the raw JSON payload with a one-click "Copy JSON" button.

### Tab 4: Block & Log Out (`Badge: Mitigate`)
* **What it is:** The rapid incident response and containment room.
* **Key Features:**
  * **Targeted Active Session Revocation:** Lists specific compromised sessions with a **`Kill Session Now`** button that invalidates the hacker's stolen token in under 38 milliseconds.
  * **Edge Firewall Blacklist:** Displays quarantined attacker subnets with countdown timers (`Permanent Ban`, `Auto-unban in 46m`) and includes an input form to ban new malicious IP/CIDR blocks.
  * **Dual-Tier Emergency Killswitch:** Option to safely revoke only flagged high-risk accounts or trigger the nuclear option to log out all 1,428 employees during a critical breach.

### Tab 5: Settings & Rules (`Badge: v2.4`)
* **What it is:** The sensitivity and policy studio where security rules are tuned.
* **Key Features:**
  * **Physical Travel Velocity Limit:** Slider to set the alert threshold (default 800 km/h).
  * **Brute-Force Tolerance:** Slider to configure how many wrong passwords trigger an alarm (default 5 fails in 30s).
  * **Autonomous Containment Matrix:** Toggle automatic token revocation and edge firewall blacklisting.

---

## 5. How to Demo This to Your Teacher (Step-by-Step Script)

1. **Step 1 — Start on Tab 1 (Dashboard):**  
   *"Professor, this is AuthSentry ITDR. We are currently monitoring 1,428 enterprise identities. As you can see, our baseline danger score is a safe 22%, with 68% of users verified through single sign-on."*

2. **Step 2 — Click 'Impossible Travel Check' on the Matrix:**  
   *"Now watch what happens when I click 'Impossible Travel Check'. The sensor runs an active scan across all accounts. It detects employee Sarah Chen logging in from San Francisco and Germany 8 minutes apart — requiring a physically impossible speed of 8,820 km/h (Mach 7.1). The danger score spikes to 74% and an alert sounds."*

3. **Step 3 — Switch to Tab 3 (Recent Activity):**  
   *"Next, in Recent Activity, we see our live ingestion feed. I can click 'Reload Latest Event' to poll our edge servers and see verified logins arriving in real-time from our regional offices in Dublin, Tokyo, and Austin."*

4. **Step 4 — Switch to Tab 4 (Block & Log Out):**  
   *"Finally, in Block & Log Out, our SecOps team doesn't have to log out the entire company. We can see Sarah Chen's compromised session in Frankfurt and click 'Kill Session Now'. In less than 38 milliseconds, the stolen session token is invalidated, locking the attacker out while keeping our business running."*

---

*AuthSentry ITDR — Designed for Enterprise Identity Security*
