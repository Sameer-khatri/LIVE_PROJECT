import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Sparkles, Send, Bot, User, ArrowRight, Zap, RefreshCw, Copy, Check 
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
  };
}

const SHORT_PROMPT_CHIPS = [
  'Triage Sarah Chen',
  'Check Tor IP 185.220.101.5',
  'Explain Brute Force',
  'Executive Summary'
];

// Helper to render bold, italic, and inline code cleanly without raw asterisks
const renderFormattedText = (raw: string) => {
  return raw.split('\n').map((line, lIdx) => {
    if (!line.trim()) return <div key={lIdx} className="h-2" />;

    if (line.startsWith('### ')) {
      return (
        <h4 key={lIdx} className="font-bold text-white text-xs mt-1.5 mb-1 flex items-center gap-1.5">
          <span>{line.replace('### ', '')}</span>
        </h4>
      );
    }

    const isBullet = line.startsWith('- ') || line.startsWith('• ');
    const content = isBullet ? line.replace(/^[-•]\s*/, '') : line;

    // Parse **bold** and `code`
    const parts = content.split(/(\*\*.*?\*\*|`.*?`)/g);

    const formattedParts = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={pIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={pIdx} className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 font-mono text-purple-300 text-[10.5px]">{part.slice(1, -1)}</code>;
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={lIdx} className="flex items-start gap-1.5 pl-1 my-1 text-slate-300">
          <span className="text-purple-400 font-bold">•</span>
          <span className="flex-1 leading-relaxed">{formattedParts}</span>
        </div>
      );
    }

    return (
      <p key={lIdx} className="leading-relaxed my-1">
        {formattedParts}
      </p>
    );
  });
};

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
      text: `Hello! I am **SentryCopilot**, your autonomous security assistant.\n\nI watch over all 1,428 team identities, spot stolen passwords, and can log out attackers with one click.\n\nAsk me anything in plain English, or tap a quick topic below.`,
      metrics: {
        riskScore: telemetry.riskPercentile,
        verdict: telemetry.riskPercentile > 50 ? 'ELEVATED' : 'SAFE'
      }
    }
  ]);

  const [inputQuery, setInputQuery] = useState<string>('');
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    const lower = userPrompt.toLowerCase().trim();

    // Friendly conversational answers
    if (lower === 'who are u' || lower === 'who are you' || lower === 'what is this' || lower.includes('introduce')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `I am **SentryCopilot**, the built-in AI assistant for **AuthSentry ITDR**.\n\nMy job is to:\n- Monitor logins from all **1,428 employees** in real time.\n- Catch impossible travel (e.g. logging in from San Francisco and Germany 8 minutes apart).\n- Detect password guessing bots and push approval spam.\n- Immediately invalidate stolen session cookies and block hacker IPs before data is breached.\n\nYou can ask me to triage any user, explain an alert, or execute emergency containment.`,
        metrics: {
          riskScore: telemetry.riskPercentile,
          verdict: 'IDENTITY_ASSISTANT'
        }
      };
    }

    if (lower === 'hi' || lower === 'hello' || lower === 'hey') {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `Hello! All systems are running. How can I help you today? You can ask me about current threats, specific employee logins, or firewall rules.`,
        metrics: {
          riskScore: telemetry.riskPercentile,
          verdict: 'ONLINE'
        }
      };
    }

    if (lower.includes('sarah chen') || lower.includes('impossible travel') || lower.includes('travel')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🚨 Sarah Chen — Impossible Travel Anomaly\n\n- **Target Account:** \`sarah.chen@innovatech.io\` (Lead Cloud Architect)\n- **What Happened:** Sarah logged in from **San Francisco** and then appeared in **Frankfurt, Germany** only **8.2 minutes later**.\n- **Speed Required:** **8,820 km/h (Mach 7.1)**, which is physically impossible by airplane.\n- **Cause:** Her login session cookie was stolen and replayed from an overseas cloud server.\n\n**Recommended Action:** Revoke her active session token now so the attacker is kicked out.`,
        metrics: {
          riskScore: 96,
          verdict: 'IMPOSSIBLE_TRAVEL'
        },
        suggestedAction: {
          label: 'Kick Out Attacker (Revoke Token Now)',
          actionName: 'REVOKE_SESSION',
          payload: 'sarah.chen@innovatech.io'
        }
      };
    }

    if (lower.includes('blast radius') || lower.includes('185.220.101.5') || lower.includes('tor') || lower.includes('ip')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🌐 IP Assessment: 185.220.101.5\n\n- **Network:** Anonymous Tor Exit Relay (European host)\n- **Threat Risk:** 100% Tor proxy; no regular employee uses this IP.\n- **Accounts Impacted:** Sarah Chen & David Kim.\n- **Impact of Blocking:** 0 normal employees will be affected. All attacker connections from this subnet will be dropped instantly at the edge firewall.`,
        metrics: {
          riskScore: 91,
          verdict: 'TOR_PROXY'
        },
        suggestedAction: {
          label: 'Block IP Subnet 185.220.101.0/24 on Firewall',
          actionName: 'QUARANTINE_IP',
          payload: '185.220.101.0/24'
        }
      };
    }

    if (lower.includes('password') || lower.includes('brute') || lower.includes('marcus')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 🛡️ Credential Stuffing: Marcus Vance (CFO)\n\n- **Pattern:** 7 wrong passwords entered in 28 seconds from a script in Russia.\n- **Zero-Trust Rule:** Tolerance is set to \`5 fails / 30s\`.\n- **Defense Action:** The password page for this account is locked for 60 minutes to prevent unauthorized access.`,
        metrics: {
          riskScore: 92,
          verdict: 'BRUTE_FORCE_BLOCKED'
        },
        suggestedAction: {
          label: 'Require Hardware YubiKey for Marcus Vance',
          actionName: 'FORCE_MFA',
          payload: 'marcus.vance@innovatech.io'
        }
      };
    }

    if (lower.includes('summary') || lower.includes('ciso') || lower.includes('executive')) {
      return {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `### 📋 Identity Health Summary\n\n- **Fleet:** 1,428 company identities monitored.\n- **Health Status:** ${telemetry.legitimateLoginRatio}% of team logins are verified and safe.\n- **Active Threat Vector:** ${currentScenario}.\n- **Mean Containment Speed:** Under **38 milliseconds** for token revocation.\n\nAll systems align with Zero-Trust standards.`,
        metrics: {
          riskScore: telemetry.riskPercentile,
          verdict: 'SUMMARY'
        }
      };
    }

    // Default simplified answer
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Here is what I found regarding "${userPrompt}":\n\n- **Fleet Status:** 1,428 team identities active.\n- **Safe Login Ratio:** ${telemetry.legitimateLoginRatio}% clean baseline.\n- **Current Danger Level:** ${telemetry.riskPercentile} / 100.\n\nCan I help you triage a specific user, explain an alert, or simulate an attack?`,
      metrics: {
        riskScore: telemetry.riskPercentile,
        verdict: 'NOMINAL'
      }
    };
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
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn select-none">
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Container (Right 420px) */}
      <div className="w-full max-w-[420px] h-full bg-[#0d121c] border-l border-white/[0.08] shadow-2xl flex flex-col relative animate-slide-left z-10">
        
        {/* Simple & Clean Header */}
        <div className="p-3.5 border-b border-white/[0.08] flex items-center justify-between bg-[#101625]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-sans">SentryCopilot</h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-purple-500/20 text-purple-300">
                  AI ASSISTANT
                </span>
              </div>
              <p className="text-[10.5px] text-slate-400">Identity Threat Intelligence in Plain English</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Short, Punchy Suggested Chips */}
        <div className="px-3 py-2 bg-black/30 border-b border-white/[0.04] overflow-x-auto flex gap-1.5 no-scrollbar">
          {SHORT_PROMPT_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(chip)}
              className="text-[10.5px] font-medium text-slate-300 bg-white/[0.04] hover:bg-purple-500/20 hover:text-purple-200 border border-white/[0.06] hover:border-purple-500/40 px-2.5 py-1 rounded-full whitespace-nowrap transition-all flex-shrink-0"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Stream Area */}
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3 font-sans text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[88%] rounded-2xl p-3 relative group ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-[#131a29] border border-white/[0.08] text-slate-200 shadow-md'
                }`}
              >
                {/* AI Header Badge */}
                {msg.sender === 'ai' && msg.metrics && (
                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 border-b border-white/[0.06] pb-1 mb-1.5">
                    <span className="text-purple-300 font-bold uppercase">{msg.metrics.verdict}</span>
                    <span className={msg.metrics.riskScore > 50 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                      DANGER: {msg.metrics.riskScore}/100
                    </span>
                  </div>
                )}

                {/* Formatted Text (Zero raw asterisks) */}
                <div className="text-[11.5px]">
                  {renderFormattedText(msg.text)}
                </div>

                {/* Action Button */}
                {msg.suggestedAction && (
                  <div className="mt-2.5 pt-2 border-t border-white/[0.08]">
                    <button
                      onClick={() => {
                        onExecuteRemediation(msg.suggestedAction!.actionName, msg.suggestedAction!.payload);
                      }}
                      className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500/20 to-purple-500/20 border border-rose-500/40 hover:border-rose-400 text-rose-200 text-[11px] font-bold transition-all shadow-sm group/btn"
                    >
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-rose-400 animate-pulse" />
                        <span>{msg.suggestedAction.label}</span>
                      </span>
                      <ArrowRight className="w-3 h-3 text-rose-300 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Message Footer */}
                <div className="flex items-center justify-between text-[8.5px] font-mono text-slate-500 mt-1.5 pt-1 border-t border-white/[0.04]">
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
                <div className="w-6 h-6 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-300 flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isThinking && (
            <div className="flex gap-2 justify-start">
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300 flex-shrink-0">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="bg-[#131a29] border border-white/[0.08] rounded-2xl p-2.5 flex items-center gap-2 text-slate-400 text-xs">
                <RefreshCw className="w-3 h-3 animate-spin text-purple-400" />
                <span>Thinking...</span>
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
              placeholder="Ask SentryCopilot in plain English..."
              className="flex-1 bg-transparent px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isThinking}
              className="w-7 h-7 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 disabled:hover:bg-purple-600 text-white flex items-center justify-center transition-all flex-shrink-0"
            >
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
