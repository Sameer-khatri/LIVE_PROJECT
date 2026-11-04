import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_deck():
    prs = Presentation()
    # 16:9 widescreen
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_layout = prs.slide_layouts[6]

    # Color Palette
    BG_COLOR = RGBColor(11, 15, 23)        # #0B0F17
    PANEL_BG = RGBColor(19, 25, 36)        # #131924
    PANEL_BORDER = RGBColor(42, 52, 73)    # #2A3449
    TEXT_WHITE = RGBColor(248, 250, 252)   # #F8FAFC
    TEXT_MUTED = RGBColor(148, 163, 184)   # #94A3B8
    CYAN_ACCENT = RGBColor(14, 165, 233)   # #0EA5E9
    EMERALD_ACCENT = RGBColor(16, 185, 129)# #10B981
    ROSE_ACCENT = RGBColor(244, 63, 94)    # #F43F5E
    AMBER_ACCENT = RGBColor(245, 158, 11)  # #F59E0B

    # Available Screenshots
    IMG_DIR = r"C:/Users/Optim/.gemini/antigravity/brain/e3019dbf-e98b-47db-afc9-01178d294109/.user_uploaded"
    IMG_DASHBOARD = os.path.join(IMG_DIR, "media_1793770630663_38ac66fb.jpg")
    IMG_TREE = os.path.join(IMG_DIR, "media_1793770630656_238907f8.jpg")
    IMG_FEED = os.path.join(IMG_DIR, "media_1793770630641_c7dd408c.jpg")
    IMG_MITIGATION = os.path.join(IMG_DIR, "media_1793770630637_07310824.jpg")
    IMG_SETTINGS = os.path.join(IMG_DIR, "media_1793770630608_6697ae49.jpg")

    def set_slide_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, prs.slide_width, prs.slide_height)
        bg.fill.solid()
        bg.fill.fore_color.rgb = BG_COLOR
        bg.line.fill.background()
        return bg

    def add_header(slide, badge_text, title_text, subtitle_text=""):
        # Badge Pill
        badge_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(8), Inches(0.4))
        tf_b = badge_box.text_frame
        tf_b.word_wrap = True
        p_b = tf_b.paragraphs[0]
        p_b.text = badge_text.upper()
        p_b.font.size = Pt(10)
        p_b.font.bold = True
        p_b.font.color.rgb = CYAN_ACCENT
        p_b.font.name = "Segoe UI"

        # Main Slide Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.68), Inches(11.5), Inches(0.6))
        tf_t = title_box.text_frame
        tf_t.word_wrap = True
        p_t = tf_t.paragraphs[0]
        p_t.text = title_text
        p_t.font.size = Pt(22)
        p_t.font.bold = True
        p_t.font.color.rgb = TEXT_WHITE
        p_t.font.name = "Segoe UI"

        if subtitle_text:
            p_s = tf_t.add_paragraph()
            p_s.text = subtitle_text
            p_s.font.size = Pt(12)
            p_s.font.color.rgb = TEXT_MUTED
            p_s.font.name = "Segoe UI"

    def add_speaker_notes(slide, notes):
        notes_slide = slide.notes_slide
        text_frame = notes_slide.notes_text_frame
        text_frame.text = notes

    def add_card(slide, left, top, width, height, fill_color=PANEL_BG, border_color=PANEL_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = fill_color
        if border_color:
            card.line.color.rgb = border_color
            card.line.width = Pt(1)
        else:
            card.line.fill.background()
        return card

    # ==========================================
    # SLIDE 1: TITLE SLIDE
    # ==========================================
    s1 = prs.slides.add_slide(blank_layout)
    set_slide_background(s1)

    # Ambient glow card on left
    c1 = add_card(s1, Inches(0.8), Inches(1.2), Inches(11.733), Inches(5.1), fill_color=RGBColor(15, 22, 34), border_color=RGBColor(30, 41, 59))

    tb1 = s1.shapes.add_textbox(Inches(1.3), Inches(1.6), Inches(10.7), Inches(4.3))
    tf1 = tb1.text_frame
    tf1.word_wrap = True

    p = tf1.paragraphs[0]
    p.text = "AUTONOMOUS IDENTITY THREAT DETECTION & RESPONSE"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT
    p.font.name = "Segoe UI"

    p = tf1.add_paragraph()
    p.text = "AuthSentry ITDR"
    p.font.size = Pt(44)
    p.font.bold = True
    p.font.color.rgb = TEXT_WHITE
    p.font.name = "Segoe UI"
    p.space_after = Pt(10)

    p = tf1.add_paragraph()
    p.text = "Securing Enterprise Identities Through Behavioral Intelligence & Autonomous Defense"
    p.font.size = Pt(18)
    p.font.color.rgb = RGBColor(226, 232, 240)
    p.font.name = "Segoe UI"
    p.space_after = Pt(28)

    p = tf1.add_paragraph()
    p.text = "CORE THESIS: IDENTITY IS THE NEW SECURITY PERIMETER"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = EMERALD_ACCENT
    p.font.name = "Segoe UI"
    p.space_after = Pt(20)

    p = tf1.add_paragraph()
    p.text = "Presented by: [Your Name]   |   Department: Computer Science & Engineering"
    p.font.size = Pt(13)
    p.font.color.rgb = TEXT_WHITE
    p.font.name = "Segoe UI"

    p = tf1.add_paragraph()
    p.text = "Academic Context: Capstone Project   |   Institution: [College / University Name]"
    p.font.size = Pt(12)
    p.font.color.rgb = TEXT_MUTED
    p.font.name = "Segoe UI"

    add_speaker_notes(s1, """Good morning everyone.
Today, I am presenting AuthSentry ITDR, which stands for Autonomous Identity Threat Detection and Response Platform.
The central idea behind this project is simple: in modern cybersecurity, protecting the network is no longer enough. Organizations must also protect the identities of the people accessing that network.
Attackers increasingly use stolen passwords, compromised sessions, and authentication manipulation to enter systems while appearing to be legitimate employees.
AuthSentry addresses this challenge by continuously analyzing identity behavior, authentication patterns, and login locations.
Throughout this presentation, I will explain the problem, our technical approach, system architecture, five major modules, and how the platform detects and neutralizes simulated identity attacks.""")

    # ==========================================
    # SLIDE 2: THE MODERN THREAT LANDSCAPE
    # ==========================================
    s2 = prs.slides.add_slide(blank_layout)
    set_slide_background(s2)
    add_header(s2, "Slide 2: Threat Landscape", "Attackers Don't Always Break In. They Log In.", "Why perimeter firewalls and traditional authentication fail against credential theft.")

    # Left Card: Traditional Security
    add_card(s2, Inches(0.8), Inches(1.6), Inches(5.6), Inches(3.9))
    tb = s2.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.2), Inches(3.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "TRADITIONAL SECURITY PARADIGM"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = TEXT_MUTED
    p.space_after = Pt(8)

    points_left = [
        ("Network Perimeter Focus", "Firewalls and VPNs inspect packets and IP ports, but assume whoever has a valid credential is safe."),
        ("Binary Authentication", "Single Sign-On (SSO) asks: 'Is this password correct?' If yes, the user is immediately trusted."),
        ("The Blind Spot", "Fails completely against stolen cookies, phishing, infostealers, or leaked credentials.")
    ]
    for title, desc in points_left:
        p = tf.add_paragraph()
        p.text = f"• {title}: {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(6)

    # Right Card: Modern Identity Attack
    add_card(s2, Inches(6.9), Inches(1.6), Inches(5.6), Inches(3.9), border_color=RGBColor(244, 63, 94))
    tb = s2.shapes.add_textbox(Inches(7.1), Inches(1.8), Inches(5.2), Inches(3.5))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "MODERN IDENTITY ATTACK REALITY"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = ROSE_ACCENT
    p.space_after = Pt(8)

    points_right = [
        ("Attackers Exploit Legitimate Auth", "Hackers buy compromised credentials on the darknet or bypass MFA using push fatigue spam."),
        ("Valid Login != Legitimate Human", "A correct password proves knowledge of a secret, NOT the physical legitimacy of the human logging in."),
        ("The Need for ITDR", "Security must analyze kinematic velocity, device reputation, and behavioral habits around the login.")
    ]
    for title, desc in points_right:
        p = tf.add_paragraph()
        p.text = f"• {title}: {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(6)

    # Bottom Lifecycle Banner
    add_card(s2, Inches(0.8), Inches(5.7), Inches(11.7), Inches(1.1), fill_color=RGBColor(15, 23, 42))
    tb = s2.shapes.add_textbox(Inches(1.0), Inches(5.8), Inches(11.3), Inches(0.9))
    tf = tb.text_frame
    p = tf.paragraphs[0]
    p.text = "ATTACK LIFECYCLE:  Phishing / Leak  ➔  Credential Theft  ➔  Legitimate SSO Login  ➔  Unauthorized Exfiltration  ➔  Data Breach"
    p.font.size = Pt(11)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    add_speaker_notes(s2, """Before explaining AuthSentry, we need to understand the security problem it addresses.
Traditionally, organizations protected themselves using firewalls, antivirus, and endpoint detection systems.
Modern attackers have developed another approach. Instead of directly attacking the network, they steal legitimate employee credentials through phishing campaigns, infostealers, or darknet databases.
For example, imagine employee Sarah Chen. An attacker steals her password and logs into the SSO portal.
From the login system's perspective, the password is correct, so it welcomes them in.
AuthSentry closes this gap by examining what happens around the login: where it originates, the physical speed required, and behavioral patterns.""")

    # ==========================================
    # SLIDE 3: THE CORE BREAKTHROUGH
    # ==========================================
    s3 = prs.slides.add_slide(blank_layout)
    set_slide_background(s3)
    add_header(s3, "Slide 3: Core Breakthrough", "Don't Just Verify the Login. Verify the Behavior.", "Three analytical pillars that distinguish legitimate employees from credential hijackers.")

    cards_s3 = [
        ("1. Kinematic Velocity", "Physics of Travel", CYAN_ACCENT, [
            "Calculates distance between consecutive logins.",
            "Measures elapsed time down to the second.",
            "Enforces physical aviation limit (~900 km/h).",
            "Example: San Francisco ➔ Frankfurt in 8 mins is 8,820 km/h (Mach 7.1) — impossible!"
        ]),
        ("2. Behavioral Entropy / UEBA", "User Pattern Modeling", AMBER_ACCENT, [
            "Analyzes baseline habits across 1,428 employees.",
            "Tracks typical working shifts and office locations.",
            "Monitors device certificates and browser fingerprints.",
            "Detects anomalous off-hours database access."
        ]),
        ("3. Auth Frequency & Bursts", "Brute-Force & Flood Detection", ROSE_ACCENT, [
            "Identifies rapid password guessing attempts.",
            "Flags credential spraying across executive accounts.",
            "Detects MFA Push Fatigue flooding employee phones.",
            "Identifies anonymous Tor exit relay resets."
        ])
    ]

    for i, (title, subtitle, color, bullets) in enumerate(cards_s3):
        left_pos = Inches(0.8 + i * 4.0)
        add_card(s3, left_pos, Inches(1.6), Inches(3.7), Inches(5.2))
        tb = s3.shapes.add_textbox(left_pos + Inches(0.2), Inches(1.8), Inches(3.3), Inches(4.8))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = title.upper()
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = color
        p.space_after = Pt(2)

        p = tf.add_paragraph()
        p.text = subtitle
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_MUTED
        p.space_after = Pt(14)

        for b in bullets:
            p = tf.add_paragraph()
            p.text = f"• {b}"
            p.font.size = Pt(11)
            p.font.color.rgb = TEXT_WHITE
            p.space_after = Pt(8)

    add_speaker_notes(s3, """This is the central innovation behind AuthSentry.
Instead of relying only on whether a password is correct, we evaluate the behavior surrounding an authentication event.
First is kinematic velocity analysis: applying the physics of travel. If an employee logs in from San Francisco and then appears in Frankfurt 8 minutes later, the system calculates the required speed (8,820 km/h). Since commercial jets fly at 900 km/h, this is physically impossible.
Second is behavioral analysis (UEBA): learning expected patterns and spotting anomalies.
Third is authentication frequency: detecting rapid password spraying or push notification fatigue attacks.
Evaluated together, these signals produce high-confidence verdicts.""")

    # ==========================================
    # SLIDE 4: SYSTEM ARCHITECTURE & DATA FLOW
    # ==========================================
    s4 = prs.slides.add_slide(blank_layout)
    set_slide_background(s4)
    add_header(s4, "Slide 4: System Architecture", "From Raw Authentication Events to Autonomous Defense", "End-to-end data pipeline: Ingestion, heuristic evaluation, zero-trust decisions, and edge response.")

    pipeline_steps = [
        ("1. Identity Sources", "1,428 Employees, Okta, Azure AD, Google SSO, FIDO2 Keys"),
        ("2. Edge Ingestion", "WebSocket telemetry stream at 18.4 msgs/sec with TLS 1.3"),
        ("3. Detection Engine", "Kinematic velocity math, UEBA baseline, entropy evaluation"),
        ("4. Decision Matrix", "Zero-Trust policy threshold evaluation & Defcon level scoring"),
        ("5. Autonomous Defense", "Targeted token killswitch, hardware MFA challenge, IP ban (<38ms)"),
        ("6. Frontend Studio", "React 18 + TypeScript command center, live feeds & audit ledgers")
    ]

    for i, (title, desc) in enumerate(pipeline_steps):
        top_pos = Inches(1.6 + i * 0.85)
        add_card(s4, Inches(0.8), top_pos, Inches(11.733), Inches(0.72))
        tb = s4.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.08), Inches(11.3), Inches(0.55))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.text = title.upper()
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = CYAN_ACCENT

        p = tf.add_paragraph()
        p.text = desc
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE

    add_speaker_notes(s4, """This slide explains how the complete AuthSentry system works internally.
The process begins with identity events generated by users, authentication providers, and network sources.
These events enter the edge ingestion layer via WebSocket streaming.
The detection engine calculates login velocity, analyzes behavioral patterns, and monitors frequency.
The Zero Trust decision engine evaluates threat signals against configured policies.
If an attack crosses the response threshold, the system initiates autonomous containment in under 38 milliseconds.
Meanwhile, the React and TypeScript frontend provides real-time visibility, telemetry, and forensic investigation tools.""")

    # ==========================================
    # SLIDE 5: THREAT SIMULATION MATRIX
    # ==========================================
    s5 = prs.slides.add_slide(blank_layout)
    set_slide_background(s5)
    add_header(s5, "Slide 5: Threat Simulation Matrix", "Five Signals. One Unified Autonomous Engine.", "Interactive sensor matrix demonstrating real-time defense against active identity attack vectors.")

    scenarios = [
        ("Impossible Travel", "8,820 KM/H", ROSE_ACCENT, "SF to Germany in 8 mins", "Velocity Violation", "Invalidate Session Token"),
        ("Password Guessing", "SPRAY BOT", ROSE_ACCENT, "7 wrong passwords in 30s", "Credential Stuffing", "Rate-limit Subnet & Lock"),
        ("Phone Spam (MFA)", "FATIGUE", AMBER_ACCENT, "4 popups sent in 18s", "MFA Push Fatigue", "Throttle Mobile & Step-up"),
        ("Hidden Location", "TOR RELAY", AMBER_ACCENT, "Reset via Tor exit node", "Proxy / Anonymizer", "Withhold Reset Token"),
        ("Normal Safe Day", "100% SECURE", EMERALD_ACCENT, "1,426 verified employee habits", "Routine Operations", "Continuous Background Watch")
    ]

    for i, (name, tag, color, trigger, detection, response) in enumerate(scenarios):
        left_pos = Inches(0.8 + i * 2.42)
        add_card(s5, left_pos, Inches(1.6), Inches(2.25), Inches(5.2))
        tb = s5.shapes.add_textbox(left_pos + Inches(0.12), Inches(1.8), Inches(2.0), Inches(4.8))
        tf = tb.text_frame
        tf.word_wrap = True

        p = tf.paragraphs[0]
        p.text = tag
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = color
        p.space_after = Pt(4)

        p = tf.add_paragraph()
        p.text = name
        p.font.size = Pt(13)
        p.font.bold = True
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(12)

        p = tf.add_paragraph()
        p.text = "TRIGGER:"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED
        p = tf.add_paragraph()
        p.text = trigger
        p.font.size = Pt(10)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(8)

        p = tf.add_paragraph()
        p.text = "DETECTION:"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED
        p = tf.add_paragraph()
        p.text = detection
        p.font.size = Pt(10)
        p.font.color.rgb = color
        p.space_after = Pt(8)

        p = tf.add_paragraph()
        p.text = "DEFENSE ACTION:"
        p.font.size = Pt(9)
        p.font.bold = True
        p.font.color.rgb = TEXT_MUTED
        p = tf.add_paragraph()
        p.text = response
        p.font.size = Pt(10)
        p.font.color.rgb = EMERALD_ACCENT

    add_speaker_notes(s5, """AuthSentry includes an interactive threat simulation matrix designed to demonstrate how the system reacts to different identity-based attacks.
Instead of showing only one type of attack, the matrix represents multiple attack patterns.
Impossible travel tests kinematic calculation; password guessing tests botnet detection; MFA fatigue tests push flood protection; hidden location tests Tor exit relay blocking; and Normal Safe Day restores baseline telemetry.
Clicking any vector triggers a real-time probe across 1,428 sessions, showing the detection verdict and automated countermeasure.""")

    # ==========================================
    # SLIDE 6: MODULE 1 — EXECUTIVE DASHBOARD (HQ)
    # ==========================================
    s6 = prs.slides.add_slide(blank_layout)
    set_slide_background(s6)
    add_header(s6, "Slide 6: Module 1 — Security Dashboard (HQ)", "The Complete Identity Threat Picture at a Single Glance", "Central command cockpit featuring concentric telemetry gauges and radar risk analysis.")

    # Left: Screenshot
    if os.path.exists(IMG_DASHBOARD):
        s6.shapes.add_picture(IMG_DASHBOARD, Inches(0.8), Inches(1.6), width=Inches(7.2))
    else:
        add_card(s6, Inches(0.8), Inches(1.6), Inches(7.2), Inches(5.2))

    # Right: Technical Highlights
    add_card(s6, Inches(8.2), Inches(1.6), Inches(4.333), Inches(5.2))
    tb = s6.shapes.add_textbox(Inches(8.4), Inches(1.8), Inches(3.9), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "CORE DASHBOARD COMPONENTS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT
    p.space_after = Pt(10)

    bullets_s6 = [
        ("Concentric Living Arc", "Visualizes overall enterprise risk percentile (22% = Safe Target) and authentication distribution (68% SSO, 21% FIDO2 Keys)."),
        ("6-Axis Radar Vulnerability Map", "Multi-dimensional surface tracking passwords, locations, phone alerts, new devices, darknet IPs, and resets."),
        ("Kinematic Velocity Card", "Calculates instantaneous speed between successive login events in real km/h."),
        ("Token Entropy & Excess Hours", "Monitors session token duration exceeding Zero-Trust policy ceilings.")
    ]
    for title, desc in bullets_s6:
        p = tf.add_paragraph()
        p.text = f"• {title}: {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(8)

    add_speaker_notes(s6, """This is the first major module: the Executive Security Dashboard or HQ.
It serves as the central command centre of the platform.
The Concentric Living Arc displays the baseline danger score (22% in safe state).
The six-axis radar map gives security teams a consolidated view of different threat dimensions.
The login velocity card calculates speed in km/h.
The objective of this dashboard is to reduce the time required to understand the organization's security posture, converting complex data into an intuitive command screen.""")

    # ==========================================
    # SLIDE 7: MODULE 2 — HISTORY TREE & 10 HUBS
    # ==========================================
    s7 = prs.slides.add_slide(blank_layout)
    set_slide_background(s7)
    add_header(s7, "Slide 7: Module 2 — Security History Tree", "Every Threat Has a Story. Trace It. Understand It.", "Interactive entity relationship graph connected to 10 security archive hubs with AI dossiers.")

    if os.path.exists(IMG_TREE):
        s7.shapes.add_picture(IMG_TREE, Inches(0.8), Inches(1.6), width=Inches(7.2))
    else:
        add_card(s7, Inches(0.8), Inches(1.6), Inches(7.2), Inches(5.2))

    add_card(s7, Inches(8.2), Inches(1.6), Inches(4.333), Inches(5.2))
    tb = s7.shapes.add_textbox(Inches(8.4), Inches(1.8), Inches(3.9), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "FORENSIC INVESTIGATION HUBS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = AMBER_ACCENT
    p.space_after = Pt(10)

    bullets_s7 = [
        ("10 Security Archive Hubs", "Organized into User Records, Login History, Security Events, Password Changes, Device History, IP History, Alerts, Sessions, Evidence, and Audit Logs."),
        ("Interactive Entity Graph", "Allows analysts to pivot from an identity (e.g. Sarah Chen) to linked devices and geographical hops."),
        ("AI Plain-English Forensic Dossier", "Translates complex JSON telemetry and auth logs into clear, executive-readable summaries explaining why an account was flagged and what actions were taken.")
    ]
    for title, desc in bullets_s7:
        p = tf.add_paragraph()
        p.text = f"• {title}: {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(10)

    add_speaker_notes(s7, """The second module is the Security History Tree.
Detecting an attack is only one part of cybersecurity; investigators must understand what happened before, during, and after an incident.
This module connects identities like Sarah Chen to ten archive hubs.
The AI Plain-English Forensic Dossier converts raw cryptographic and network logs into a readable incident summary, explaining the timeline, evidence, and recommended containment steps.""")

    # ==========================================
    # SLIDE 8: MODULE 3 — RECENT ACTIVITY STREAM
    # ==========================================
    s8 = prs.slides.add_slide(blank_layout)
    set_slide_background(s8)
    add_header(s8, "Slide 8: Module 3 — Recent Activity Stream", "No Blind Spots. Real-Time Telemetry Streaming.", "Black-box flight recorder streaming authentication packets with one-click live polling.")

    if os.path.exists(IMG_FEED):
        s8.shapes.add_picture(IMG_FEED, Inches(0.8), Inches(1.6), width=Inches(7.2))
    else:
        add_card(s8, Inches(0.8), Inches(1.6), Inches(7.2), Inches(5.2))

    add_card(s8, Inches(8.2), Inches(1.6), Inches(4.333), Inches(5.2))
    tb = s8.shapes.add_textbox(Inches(8.4), Inches(1.8), Inches(3.9), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "REAL-TIME INGESTION ENGINE"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT
    p.space_after = Pt(10)

    bullets_s8 = [
        ("Edge Ingestion HUD", "Real-time streaming throughput indicator (18.4 messages/sec) over secure WebSocket (WSS / TLS 1.3)."),
        ("Global Hub Coverage", "Continuously ingests verified authentications and alerts across Dublin, Tokyo, London, and Austin."),
        ("'Reload Latest Event' Control", "Allows SecOps to immediately poll edge gateways for the latest live authentication token with audio feedback."),
        ("Raw JSON Telemetry Inspector", "Expandable inspector showing raw authorization headers, TLS cipher suites, and device fingerprints.")
    ]
    for title, desc in bullets_s8:
        p = tf.add_paragraph()
        p.text = f"• {title}: {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(8)

    add_speaker_notes(s8, """The third module is the Recent Activity Stream, or Live Feed.
It acts as the black-box flight recorder for enterprise authentication.
It streams events in real time at 18.4 messages per second across global offices.
The 'Reload Latest Event' button lets analysts poll the edge gateway on demand.
Each event expands to reveal the underlying JSON telemetry payload, making the system transparent rather than a black box.""")

    # ==========================================
    # SLIDE 9: MODULE 4 & 5 — MITIGATION & POLICIES
    # ==========================================
    s9 = prs.slides.add_slide(blank_layout)
    set_slide_background(s9)
    add_header(s9, "Slide 9: Module 4 & 5 — Containment & Policies", "Detecting a Breach is Good. Stopping It is Better.", "Targeted session killswitch, edge firewall quarantine, and calibrated behavioral thresholds.")

    if os.path.exists(IMG_MITIGATION):
        s9.shapes.add_picture(IMG_MITIGATION, Inches(0.8), Inches(1.6), width=Inches(7.2))
    else:
        add_card(s9, Inches(0.8), Inches(1.6), Inches(7.2), Inches(5.2))

    add_card(s9, Inches(8.2), Inches(1.6), Inches(4.333), Inches(5.2))
    tb = s9.shapes.add_textbox(Inches(8.4), Inches(1.8), Inches(3.9), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "AUTONOMOUS ENFORCEMENT"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = ROSE_ACCENT
    p.space_after = Pt(10)

    bullets_s9 = [
        ("Targeted Session Killswitch", "Invalidates stolen OAuth tokens for specific compromised identities in < 38ms without disrupting coworkers."),
        ("Edge Firewall IP Blacklist", "Automated subnet quarantine (e.g. 185.220.101.5/32 Tor exit relay, 45.142.214.0/24 botnet) with auto-expiration timers."),
        ("Dual-Tier Emergency Killswitch", "Tier 1 targets flagged accounts; Tier 2 provides enterprise-wide session termination in critical breaches."),
        ("Policy Studio (v2.4)", "Customizable sliders: airplane speed limit (800 km/h) and brute-force tolerance (5 fails in 30s).")
    ]
    for title, desc in bullets_s9:
        p = tf.add_paragraph()
        p.text = f"• {title}: {desc}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(8)

    add_speaker_notes(s9, """This is the most important operational capability: the Block & Log Out Containment Center.
When an attack is detected, SecOps doesn't have to panic or log out the entire company.
They can terminate the specific session of the compromised user in under 38 milliseconds.
The edge firewall blacklists attacker subnets automatically.
The Policy Studio allows security administrators to customize thresholds like travel speed (800 km/h) and password retry counts.""")

    # ==========================================
    # SLIDE 10: COMPARATIVE ANALYSIS
    # ==========================================
    s10 = prs.slides.add_slide(blank_layout)
    set_slide_background(s10)
    add_header(s10, "Slide 10: Comparative Analysis", "Moving Beyond Detection Toward Autonomous Defense", "How AuthSentry compares against Traditional SIEMs and standard MFA/SSO solutions.")

    add_card(s10, Inches(0.8), Inches(1.6), Inches(11.733), Inches(5.2))
    tb = s10.shapes.add_textbox(Inches(1.1), Inches(1.8), Inches(11.1), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = f"{'SECURITY CAPABILITY':<32}{'TRADITIONAL SIEM':<24}{'STANDARD MFA / SSO':<24}{'AUTHSENTRY ITDR':<24}"
    p.font.size = Pt(12)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT
    p.font.name = "Consolas"
    p.space_after = Pt(12)

    rows = [
        ("Credential Authentication", "Limited (Logs only)", "Yes (Binary check)", "Contextual + Behavioral"),
        ("Impossible Travel Detection", "Slow (Rule dependent)", "Limited / Geo-fencing", "Real-time Kinematic (<38ms)"),
        ("MFA Fatigue Protection", "Post-incident analysis", "Vulnerable to spam", "Autonomous Push Throttling"),
        ("Session Containment", "Requires SOAR scripts", "Manual session kill", "Targeted One-Click / Auto"),
        ("Forensic Incident Dossier", "Raw log queries", "None", "Plain-English AI Dossier"),
        ("Deployment Target", "Enterprise SOC servers", "Login gatekeeper", "Identity Fabric Layer")
    ]

    for cap, siem, mfa, sentry in rows:
        p = tf.add_paragraph()
        p.text = f"{cap:<32}{siem:<24}{mfa:<24}{sentry:<24}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.font.name = "Consolas"
        p.space_after = Pt(8)

    add_speaker_notes(s10, """How does AuthSentry compare to existing enterprise tools?
Traditional SIEMs collect logs for post-incident investigation, but automated containment requires complex SOAR integrations.
Standard MFA systems verify credentials at the front door, but cannot detect when a session cookie is stolen after login.
AuthSentry focuses specifically on identity threat detection and response, combining kinematic physics, behavioral entropy, and autonomous session termination.""")

    # ==========================================
    # SLIDE 11: INCIDENT CASE STUDY — SARAH CHEN
    # ==========================================
    s11 = prs.slides.add_slide(blank_layout)
    set_slide_background(s11)
    add_header(s11, "Slide 11: Real-World Incident Case Study", "Sarah Chen: Detecting & Neutralizing Impossible Travel", "Step-by-step forensic progression from initial legitimate access to automated containment.")

    timeline = [
        ("08:00 UTC", "Legitimate Employee Access", CYAN_ACCENT, "Sarah Chen logs into corporate Slack & AWS console from San Francisco office (IP 198.51.100.24, Chrome OS). Normal daytime baseline."),
        ("08:08 UTC", "Credential Hijack & Impossible Travel", ROSE_ACCENT, "Attacker uses stolen session token from Frankfurt, Germany (IP 185.220.101.5, Tor Exit Node). Elapsed time: 8 minutes."),
        ("08:08:01", "Kinematic Anomaly Flagged", AMBER_ACCENT, "AuthSentry calculates travel velocity: 8,820 km/h (Mach 7.1). Commercial aviation limit (900 km/h) exceeded by 9.8x. Danger score spikes to 74%."),
        ("08:08:02", "Autonomous Defense Enforced (<38ms)", EMERALD_ACCENT, "Compromised session token revoked. Edge firewall quarantines Tor IP 185.220.101.5. Incident logged to History Tree; coworker sessions undisturbed.")
    ]

    for i, (time, title, color, desc) in enumerate(timeline):
        top_pos = Inches(1.6 + i * 1.3)
        add_card(s11, Inches(0.8), top_pos, Inches(11.733), Inches(1.15))
        tb = s11.shapes.add_textbox(Inches(1.0), top_pos + Inches(0.1), Inches(11.3), Inches(0.95))
        tf = tb.text_frame
        p = tf.paragraphs[0]
        p.text = f"{time} — {title.upper()}"
        p.font.size = Pt(12)
        p.font.bold = True
        p.font.color.rgb = color

        p = tf.add_paragraph()
        p.text = desc
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE

    add_speaker_notes(s11, """Let us examine a practical incident scenario.
At 08:00 UTC, Sarah Chen logs in from San Francisco.
Eight minutes later, an attacker attempts access using her credentials from Frankfurt.
The kinematic engine compares locations and timestamps: 8,820 km/h is physically impossible.
AuthSentry flags the anomaly, revokes the stolen session token in 38 milliseconds, and quarantines the Tor IP.
Legitimate coworkers continue working without disruption.""")

    # ==========================================
    # SLIDE 12: CONCLUSION, ROADMAP & LIVE Q&A
    # ==========================================
    s12 = prs.slides.add_slide(blank_layout)
    set_slide_background(s12)
    add_header(s12, "Slide 12: Conclusion & Future Scope", "Secure Every Identity. Trust No Unverified Session.", "Key project takeaways, engineering milestones, future roadmap, and live demonstration.")

    # Left Card: Achievements
    add_card(s12, Inches(0.8), Inches(1.6), Inches(5.6), Inches(5.2))
    tb = s12.shapes.add_textbox(Inches(1.0), Inches(1.8), Inches(5.2), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "PROJECT ACHIEVEMENTS"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = EMERALD_ACCENT
    p.space_after = Pt(10)

    achievements = [
        "Identity-First Architecture: Built an ITDR platform protecting 1,428 enterprise identities.",
        "Kinematic Velocity Engine: Implemented real-time travel speed verification to block impossible logins.",
        "5 Integrated Modules: Created Dashboard HQ, History Tree, Live Feed, Containment Center, and Policy Studio.",
        "Autonomous Containment: Proven sub-38ms targeted session invalidation.",
        "Zero False Positive Interruption: Neutralizes threats without logging out trusted employees."
    ]
    for a in achievements:
        p = tf.add_paragraph()
        p.text = f"✔ {a}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(8)

    # Right Card: Future Scope
    add_card(s12, Inches(6.9), Inches(1.6), Inches(5.6), Inches(5.2))
    tb = s12.shapes.add_textbox(Inches(7.1), Inches(1.8), Inches(5.2), Inches(4.8))
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = "FUTURE ROADMAP"
    p.font.size = Pt(13)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT
    p.space_after = Pt(10)

    roadmap = [
        "Machine Learning Baselines: Transition from heuristic rules to unsupervised neural clustering for anomaly scoring.",
        "Enterprise IdP Connectors: Native webhooks for Microsoft Entra ID (Azure AD), Okta, and Ping Identity.",
        "Decentralized Identity (DID): Support for verifiable credentials and cryptographic passkeys.",
        "Multi-Cloud Federation: Identity monitoring spanning AWS IAM, GCP Cloud Identity, and Kubernetes ServiceAccounts."
    ]
    for r in roadmap:
        p = tf.add_paragraph()
        p.text = f"➔ {r}"
        p.font.size = Pt(11)
        p.font.color.rgb = TEXT_WHITE
        p.space_after = Pt(8)

    p = tf.add_paragraph()
    p.text = "\nTHANK YOU! QUESTIONS & ANSWERS"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = CYAN_ACCENT

    add_speaker_notes(s12, """To conclude, AuthSentry ITDR addresses the reality that attackers log in rather than break in.
We have structured our defense across five modules: Dashboard, History Tree, Live Feed, Containment Center, and Policy Studio.
Looking forward, the platform can be extended with machine learning models and enterprise SSO connectors.
My final takeaway is: In traditional security, we ask whether credentials are correct. With AuthSentry, we ask whether the behavior behind those credentials can be trusted.
Thank you. I am ready for your questions.""")

    output_path = "AuthSentry_ITDR_Presentation.pptx"
    prs.save(output_path)
    print(f"Presentation saved successfully to: {os.path.abspath(output_path)}")

if __name__ == "__main__":
    create_deck()
