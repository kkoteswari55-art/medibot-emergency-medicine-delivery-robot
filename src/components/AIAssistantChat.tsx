import React, { useState, useRef, useEffect } from 'react';
import { useRobot } from '../context/RobotContext';
import { GoogleGenAI } from '@google/genai';
import {
  Bot,
  Send,
  Sparkles,
  ShieldAlert,
  Volume2,
  User,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIAssistantChat: React.FC = () => {
  const { t, robotState, deliveries, language, speakText } = useRobot();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      text: t.aiWelcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Offline intelligent domain responder
  const generateOfflineResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Safety Rule Enforcer: Reject medical recommendations or dosages
    if (
      q.includes('dosage') ||
      q.includes('dose') ||
      q.includes('recommend medicine') ||
      q.includes('prescribe') ||
      q.includes('which medicine') ||
      q.includes('what medicine should i give') ||
      q.includes('treatment for') ||
      q.includes('మందుల మోతాదు') ||
      q.includes('మందు సూచించు')
    ) {
      if (language === 'te') {
        return 'భద్రతా హెచ్చరిక: మెడిబోట్ కేవలం అధికారిక సిబ్బంది నమోదు చేసిన ముందస్తు నిర్ణీత ఔషధాలను రవాణా చేయడానికి మాత్రమే. ఇది ఎటువంటి వైద్య చికిత్సలు, మందులు లేదా మోతాదులను సిఫారసు చేయదు.';
      }
      return 'SAFETY PROTOCOL: MediBot is strictly an autonomous transportation robot. It does NOT prescribe medications, determine dosages, or recommend medical treatments. Please consult an authorized physician or pharmacist.';
    }

    // Where is the robot? / Location
    if (
      q.includes('where is') ||
      q.includes('location') ||
      q.includes('ఎక్కడ') ||
      q.includes('ఎక్కడుంది') ||
      q.includes('कहां') ||
      q.includes('எங்கே')
    ) {
      if (language === 'te') {
        return `మెడిబోట్ ప్రస్తుతం ${robotState.currentLocationName} వద్ద ఉంది (${robotState.currentPosition.x.toFixed(1)}%, ${robotState.currentPosition.y.toFixed(1)}%). హెడ్డింగ్: ${robotState.headingDeg} డిగ్రీలు.`;
      }
      return `MediBot is currently at ${robotState.currentLocationName} (X: ${robotState.currentPosition.x.toFixed(1)}%, Y: ${robotState.currentPosition.y.toFixed(1)}%) facing ${robotState.headingDeg}° with speed ${robotState.sensors.speedMps.toFixed(2)} m/s.`;
    }

    // Battery Query
    if (
      q.includes('battery') ||
      q.includes('charge') ||
      q.includes('బ్యాటరీ') ||
      q.includes('बैटरी') ||
      q.includes('பேட்டரி')
    ) {
      if (language === 'te') {
        return `రోబోట్ బ్యాటరీ ప్రస్తుతం ${Math.round(robotState.batteryPercentage)}% వద్ద ఉంది (${robotState.sensors.voltageV.toFixed(1)}V LiFePO4). ${robotState.isCharging ? 'ప్రస్తుతం బేస్ డాక్ వద్ద ఛార్జ్ అవుతోంది.' : 'కారిడార్లలో సాధారణ బ్యాటరీ వినియోగంలో ఉంది.'}`;
      }
      return `Current battery level is ${Math.round(robotState.batteryPercentage)}% (${robotState.sensors.voltageV.toFixed(1)}V LiFePO4 cell). ${robotState.isCharging ? 'It is actively charging at the Central Pharmacy dock.' : 'Nominal discharge rate: ~2.8A.'}`;
    }

    // Delivery Status Query
    if (
      q.includes('delivery') ||
      q.includes('status') ||
      q.includes('డెలివరీ') ||
      q.includes('స్థితి') ||
      q.includes('स्थिति') ||
      q.includes('நிலை')
    ) {
      if (robotState.activeDelivery) {
        if (language === 'te') {
          return `ప్రస్తుత డెలివరీ స్థితి: ${robotState.activeDelivery.medicineName} (${robotState.activeDelivery.quantity}) ను ${robotState.activeDelivery.destinationName} కు తీసుకెళ్తోంది. ప్రాధాన్యత: ${robotState.activeDelivery.priority}.`;
        }
        return `Active Mission: MediBot is delivering ${robotState.activeDelivery.medicineName} (${robotState.activeDelivery.quantity}) to ${robotState.activeDelivery.destinationName} with ${robotState.activeDelivery.priority} priority. Telemetry state: ${robotState.deliveryStatus}.`;
      }
      if (language === 'te') {
        return `ప్రస్తుతం ఎటువంటి సక్రియ డెలివరీ లేదు. రోబోట్ ${robotState.currentLocationName} వద్ద తదుపరి ఆదేశాల కోసం సిద్ధంగా ఉంది.`;
      }
      return `MediBot is currently in ${robotState.deliveryStatus} state at ${robotState.currentLocationName}. Standby for new dispatch orders.`;
    }

    // Obstacle avoidance
    if (
      q.includes('obstacle') ||
      q.includes('avoidance') ||
      q.includes('sensor') ||
      q.includes('అడ్డంకి') ||
      q.includes('సెన్సార్') ||
      q.includes('बाधा')
    ) {
      if (language === 'te') {
        return `మెడిబోట్ ముందువైపు HC-SR04 అల్ట్రాసోనిక్ సెన్సార్లు మరియు 2D LiDAR అమర్చబడి ఉన్నాయి. ఏదైనా అడ్డంకి 30 సెం.మీ కంటే తక్కువగా వచ్చినప్పుడు, రోబోట్ వెంటనే ఆగి హెచ్చరిక మోగిస్తుంది.`;
      }
      return `MediBot uses 4-way HC-SR04 ultrasonic sensors (Front: ${robotState.sensors.ultrasonicFrontCm}cm, Left: ${robotState.sensors.ultrasonicLeftCm}cm, Right: ${robotState.sensors.ultrasonicRightCm}cm) and a front LiDAR arc. Obstacles within 30cm trigger an automatic safety stop.`;
    }

    // Previous Deliveries / History
    if (
      q.includes('previous') ||
      q.includes('history') ||
      q.includes('చరిత్ర') ||
      q.includes('గత') ||
      q.includes('रिकॉर्ड')
    ) {
      const count = deliveries.length;
      const last = deliveries[0];
      if (language === 'te') {
        return `మొత్తం ${count} డెలివరీలు రికార్డ్ చేయబడ్డాయి. ఇటీవలి డెలివరీ: ${last.medicineName} ${last.destinationName} కు విజయవంతంగా చేరింది.`;
      }
      return `System has recorded ${count} deliveries. Most recent: ${last.medicineName} to ${last.destinationName} (Status: ${last.status}). Check the Delivery History tab for verifiable audit receipts.`;
    }

    // Fallback general assistance
    if (language === 'te') {
      return `నేను రోబోట్ ఉన్న ప్రదేశం, బ్యాటరీ శాతం, డెలివరీ పురోగతి మరియు అడ్డంకుల స్థితి గురించి సమాచారం అందించగలను. మీకు ఏ వివరాలు కావాలి?`;
    }
    return `MediBot is online and ready. You can ask me about robot position, battery percentage, active medicine manifests, obstacle telemetry, or voice command assistance.`;
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isTyping) return;

    const userText = inputQuery.trim();
    setInputQuery('');

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Check if GEMINI_API_KEY is available in browser environment
      const apiKey =
        typeof process !== 'undefined' && process.env?.GEMINI_API_KEY
          ? process.env.GEMINI_API_KEY
          : (import.meta as any).env?.VITE_GEMINI_API_KEY;

      if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
        const ai = new GoogleGenAI({ apiKey });
        const systemInstruction = `You are "MediBot AI Assistant", the AI controller for an autonomous emergency medicine delivery robot in an Indian hospital (Apollo-AIIMS Campus).
Current Telemetry:
- Location: ${robotState.currentLocationName} (X: ${robotState.currentPosition.x}%, Y: ${robotState.currentPosition.y}%)
- Battery: ${robotState.batteryPercentage}%
- Delivery Status: ${robotState.deliveryStatus}
- Active Medicine: ${robotState.activeDelivery ? robotState.activeDelivery.medicineName : 'None'}
- Destination: ${robotState.targetDestination ? robotState.targetDestination.name : 'None'}
- Language requested: ${language}

CRITICAL SAFETY RULE: You are a transportation assistant ONLY. You must STRICTLY REFUSE to recommend medicines, dosages, or treatments. Only assist with robot telemetry, navigation, battery, delivery status, and safety features. Answer concisely in the language requested.`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: userText,
          config: {
            systemInstruction,
            temperature: 0.3,
            maxOutputTokens: 250,
          },
        });

        const reply = response.text || generateOfflineResponse(userText);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'assistant',
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        speakText(reply);
      } else {
        // Fast, deterministic rule-based response
        setTimeout(() => {
          const reply = generateOfflineResponse(userText);
          setMessages((prev) => [
            ...prev,
            {
              id: `ai-${Date.now()}`,
              sender: 'assistant',
              text: reply,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ]);
          speakText(reply);
        }, 400);
      }
    } catch (err) {
      // Fallback seamlessly on any error
      const reply = generateOfflineResponse(userText);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      speakText(reply);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestedClick = (question: string) => {
    setInputQuery(question);
  };

  return (
    <div className="flex flex-col h-[650px] rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* AI Assistant Header */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-slate-950 font-bold shadow-md">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-sans">{t.aiAssistantTitle}</h3>
            <p className="text-xs text-slate-400">
              Multilingual Natural Language Telemetry Query Engine
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: `msg-${Date.now()}`,
                sender: 'assistant',
                text: t.aiWelcome,
                timestamp: new Date().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                }),
              },
            ])
          }
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear</span>
        </button>
      </div>

      {/* Safety Banner */}
      <div className="border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-[11px] text-amber-300 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 shrink-0 text-amber-400" />
        <span>{t.aiDisclaimer}</span>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/20 text-teal-300 shrink-0">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-2xl p-3.5 text-xs shadow-md ${
                msg.sender === 'user'
                  ? 'bg-teal-500 text-slate-950 font-medium rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-none'
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>
              <div
                className={`mt-1.5 flex items-center justify-between text-[10px] ${
                  msg.sender === 'user' ? 'text-slate-900/70' : 'text-slate-500'
                }`}
              >
                <span>{msg.timestamp}</span>
                {msg.sender === 'assistant' && (
                  <button
                    onClick={() => speakText(msg.text)}
                    className="hover:text-cyan-300 ml-2"
                    title="Read aloud"
                  >
                    <Volume2 className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 shrink-0">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-teal-400">
            <Bot className="h-4 w-4 animate-bounce" />
            <span>MediBot AI is analyzing robot sensors...</span>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Questions */}
      <div className="border-t border-slate-800 bg-slate-950/40 p-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] text-slate-500 shrink-0 font-medium">Try asking:</span>
          {t.aiSuggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestedClick(q)}
              className="shrink-0 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 text-[11px] text-slate-300 hover:text-white transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSend} className="border-t border-slate-800 bg-slate-950 p-3">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder={t.aiInputPlaceholder}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
