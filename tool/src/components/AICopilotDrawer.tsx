import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Sparkles, Send, Bot, User, ShieldAlert, CheckCircle2, 
  Terminal, ArrowRight, Zap, RefreshCw, Copy, Check, Lock, ShieldCheck
} from 'lucide-react';
import { TelemetryState } from '../types/dashboard';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  telemetry: TelemetryState;
  currentScenario: string;
  onExecuteRemediation: (actionName: string, detail: string) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  timestamp: string;
  text: string;
  suggestedAction?: {
    label: string;
    actionName: string;
    payload: string;
  };
  metrics?: {
    riskScore: number;
    verdict: string;
    confidence: string;
  };
}

const PROMPT_CHIPS = [
  'Triage Sarah Chen’s impossible travel anomaly',
  'What is the blast radius of IP 185.220.101.5?',
  'Explain why 7 password attempts triggered a brute-force alert',
  'Generate executive CISO remediation summary'
];

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({
  isOpen,
  onClose,
  telemetry,
  currentScenario,
  onExecuteRemediation
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      timestamp: 'Just now',
      text: `Hello, Security Analyst. I am **SentryCopilot AI**, your autonomous identity threat triage assistant.\n\nI continuously synthesize telemetry across 1,428 enterprise identities, 10 regional hubs, and edge firewalls. How can I assist your investigation today?`,
      metrics: {
        riskScore: telemetry.riskPercentile,
        verdict: telemetry.riskPercentile > 50 ? 'ELEVATED_THREAT' : 'HEALTHY_BASELINE',
        confidence: '99.4%'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isThinking]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const generateAIResponse = (userPrompt: string): ChatMessage => {
    const lower = userPrompt.toLowerCase();

    if (lower.includes('sarah chen') || lower.includes('impossible travel') || lower.includes('travel')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🚨 Kinematic Velocity Anomaly Detected: Sarah Chen\n\n- **Target Account:** \`sarah.chen@innovatech.io\` (Lead Cloud Architect)\n- **Incident:** Successive authentications in **San Francisco (198.51.100.24)** and **Frankfurt (185.220.101.5)** occurred only **8.2 minutes apart**.\n- **Haversine Distance:** 9,120 km.\n- **Calculated Speed:** **8,820 km/h (Mach 7.1)**. Commercial air travel limit is ~850 km/h.\n- **Threat Hypothesis:** Valid session cookie or OAuth refresh token exfiltrated via infostealer malware and replayed from an overseas cloud hosting server.\n\n**Recommended Autonomous Action:** Terminate active OAuth bearer token immediately and challenge the Frankfurt session with hardware FIDO2 WebAuthn.`,
        metrics: {
          riskScore: 96,
          verdict: 'IMPOSSIBLE_TRAVEL_CONFIRMED',
          confidence: '99.8%'
        },
        suggestedAction: {
          label: 'Terminate Sarah Chen’s Session Token Now',
          actionName: 'REVOKE_SESSION',
          payload: 'sarah.chen@innovatech.io'
        }
      };
    } else if (lower.includes('blast radius') || lower.includes('185.220.101.5') || lower.includes('ip')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🌐 Blast Radius Assessment: IP 185.220.101.5\n\n- **Autonomous System:** AS9009 (Anonymous Tor Exit Relay / European Cloud Host)\n- **Correlated Identities:** 2 accounts touched within the last 15 minutes (\`sarah.chen@innovatech.io\` & \`david.kim@innovatech.io\`).\n- **Risk Factor:** 100% Tor exit node probability; zero historical legitimate enterprise traffic from this ASN.\n- **Impact of Quarantining /24 Subnet:** 0 legitimate employees will be blocked. Malicious replay traffic will be dropped at the border within 32ms.`,
        metrics: {
          riskScore: 91,
          verdict: 'TOR_EXIT_CONTAINMENT_REQUIRED',
          confidence: '98.9%'
        },
        suggestedAction: {
          label: 'Quarantine Subnet 185.220.101.0/24 on Edge Firewall',
          actionName: 'QUARANTINE_IP',
          payload: '185.220.101.0/24'
        }
      };
    } else if (lower.includes('password') || lower.includes('brute') || lower.includes('marcus')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🛡️ Credential Stuffing Evaluation: Marcus Vance (CFO)\n\n- **Pattern:** 7 failed password attempts within a 28-second sliding window from IP \`45.142.214.18\` (Saint Petersburg, Russia).\n- **User-Agent:** \`curl/7.88.1\` (Automated dictionary attack tool signature).\n- **Zero-Trust Rule Triggered:** Sliding-window brute force tolerance is calibrated to \`5 fails / 30s\`.\n- **Status:** Rate limit enforcement has locked the password endpoint for 60 minutes. An adversary is attempting to access executive payroll and financial systems.`,
        metrics: {
          riskScore: 92,
          verdict: 'BRUTE_FORCE_SPRAY_BOT',
          confidence: '99.5%'
        },
        suggestedAction: {
          label: 'Enforce Step-Up Hardware Key for Marcus Vance',
          actionName: 'FORCE_MFA',
          payload: 'marcus.vance@innovatech.io'
        }
      };
    } else if (lower.includes('summary') || lower.includes('ciso') || lower.includes('executive')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 📋 Executive Identity Security Brief\n\n**Current Threat Level:** ${telemetry.riskPercentile}/100 (${telemetry.riskPercentile > 50 ? 'ELEVATED' : 'NOMINAL'})\n\n**Key Telemetry Summary:**\n- **Fleet Size:** 1,428 enterprise identities monitored.\n- **Legitimate Login Ratio:** ${telemetry.legitimateLoginRatio}% nominal traffic.\n- **Active Incidents:** ${telemetry.activeIncidentsCount} high-priority anomalies under containment.\n- **Mean Response Latency:** < 38ms (Automated OAuth token revocation and firewall blacklisting).\n\n**Compliance & Zero-Trust Posture:** Full alignment with NIST 800-207 and CISA Zero Trust Maturity Model (Identity Pillar v2).`,
        metrics: {
          riskScore: telemetry.riskPercentile,
          verdict: 'CISO_BRIEF_GENERATED',
          confidence: '100%'
        }
      };
    } else {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `I analyzed your inquiry: "*${userPrompt}*"\n\nBased on current behavioral models and OCSF security telemetry:\n- **Identity Health:** 98.4% of corporate users are safely within their behavioral baseline.\n- **Autonomous Defense Status:** Armed & Enforcing (Session Revocation: Active, Subnet Quarantine: Active).\n- **Active Threat Vector:** ${currentScenario}.\n\nWould you like me to inspect a specific employee dossier, evaluate edge firewall rules, or run a diagnostic simulation?`,
        metrics: {
          riskScore: telemetry.riskPercentile,
          verdict: 'DIAGNOSTIC_EVALUATION',
          confidence: '97.4%'
        }
      };
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text.trim()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    setTimeout(() => {
      const aiReply = generateAIResponse(text);
      setMessages((prev) => [...prev, aiReply]);
      setIsThinking(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container (Right 440px) */}
      <div className="w-full max-w-[460px] h-full bg-[#0d121c]/98 border-l border-purple-500/30 shadow-2xl flex flex-col relative animate-slide-left z-10">
        
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between bg-gradient-to-r from-purple-950/30 via-[#101625] to-[#0d121c]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-sm">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-sans">SentryCopilot AI</h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  SOC TIER-3
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">Autonomous Identity Threat Intelligence</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="px-4 py-2.5 bg-black/30 border-b border-white/[0.04] overflow-x-auto flex gap-1.5 no-scrollbar">
          {PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[10px] font-medium text-slate-300 bg-white/[0.04] hover:bg-purple-500/20 hover:text-purple-200 border border-white/[0.06] hover:border-purple-500/40 px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex-shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Stream Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-sans text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 relative group ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-[#121927] border border-white/[0.08] text-slate-200 shadow-panel'
                }`}
              >
                {/* AI Header Badge */}
                {msg.sender === 'ai' && msg.metrics && (
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-b border-white/[0.06] pb-1.5 mb-2">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>CONFIDENCE: {msg.metrics.confidence}</span>
                    </span>
                    <span className={msg.metrics.riskScore > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      RISK: {msg.metrics.riskScore}/100
                    </span>
                  </div>
                )}

                {/* Message Text with simple markdown formatting */}
                <div className="space-y-1.5 leading-relaxed whitespace-pre-wrap text-[11.5px]">
                  {msg.text.split('\n').map((line, lIdx) => {
                    if (line.startsWith('### ')) {
                      return <h4 key={lIdx} className="font-bold text-white text-xs mt-1 mb-0.5">{line.replace('### ', '')}</h4>;
                    }
                    if (line.startsWith('- ')) {
                      return <div key={lIdx} className="pl-2 border-l border-purple-500/40 text-slate-300 my-0.5">{line.replace('- ', '')}</div>;
                    }
                    return <p key={lIdx}>{line}</p>;
                  })}
                </div>

                {/* Interactive Action Button embedded in AI message */}
                {msg.suggestedAction && (
                  <div className="mt-3 pt-2.5 border-t border-white/[0.08]">
                    <button
                      onClick={() => {
                        onExecuteRemediation(msg.suggestedAction!.actionName, msg.suggestedAction!.payload);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500/20 to-purple-500/20 border border-rose-500/40 hover:border-rose-400 text-rose-200 text-[11px] font-bold transition-all shadow-sm group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                        <span>{msg.suggestedAction.label}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-rose-300 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Message Timestamp & Copy Button */}
                <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 mt-2 pt-1 border-t border-white/[0.04]">
                  <span>{msg.timestamp}</span>
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white"
                  >
                    {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {/* AI Thinking Animation */}
          {isThinking && (
            <div className="flex gap-2.5 justify-start">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#121927] border border-white/[0.08] rounded-2xl p-3 flex items-center gap-2 text-slate-400 text-xs">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                <span>Synthesizing identity telemetry and evaluating OCSF schema...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Text Box */}
        <div className="p-3 border-t border-white/[0.08] bg-[#090d14]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2 bg-[#121824] rounded-2xl border border-white/[0.08] focus-within:border-purple-500/50 p-1.5 transition-all"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask SentryCopilot to analyze accounts, IP addresses, or rules..."
              className="flex-1 bg-transparent px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white flex items-center justify-center transition-all flex-shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="text-[9.5px] font-mono text-slate-500 text-center mt-1.5">
            SentryCopilot v2.4 • Zero-Trust Autonomous Remediation Engine
          </div>
        </div>

      </div>
    </div>
  );
};
