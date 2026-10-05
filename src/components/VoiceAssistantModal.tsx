import React, { useState, useEffect, useRef } from 'react';
import { useRobot } from '../context/RobotContext';
import { ParsedVoiceCommand } from '../utils/commandParser';
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({ isOpen, onClose }) => {
  const { language, t, processVoiceTranscript, speakText, robotState } = useRobot();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastPipelineResult, setLastPipelineResult] = useState<ParsedVoiceCommand | null>(null);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API Recognition
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRec) {
      const rec = new SpeechRec();
      rec.continuous = false;
      rec.interimResults = false;

      // Locale mapping
      const localeMap: Record<string, string> = {
        en: 'en-IN',
        te: 'te-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        kn: 'kn-IN',
        ml: 'ml-IN',
        mr: 'mr-IN',
        bn: 'bn-IN',
      };
      rec.lang = localeMap[language] || 'en-IN';

      rec.onstart = () => {
        setIsListening(true);
        setRecognitionError(null);
      };

      rec.onresult = (event: any) => {
        const spoken = event.results[0][0].transcript;
        setTranscript(spoken);
        const result = processVoiceTranscript(spoken);
        setLastPipelineResult(result);
        setIsListening(false);
      };

      rec.onerror = (event: any) => {
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setRecognitionError(
            'Microphone access denied. You can still test with the predefined command chips below!'
          );
        } else {
          setRecognitionError(`Speech recognition: ${event.error}. Try predefined commands below.`);
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = rec;
    }
  }, [language, processVoiceTranscript]);

  if (!isOpen) return null;

  const startListening = () => {
    setRecognitionError(null);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // already started
        setIsListening(true);
      }
    } else {
      setRecognitionError(
        'Speech recognition is not supported in this browser. Please use the predefined voice command chips below.'
      );
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const handleTestCommand = (commandText: string) => {
    setTranscript(commandText);
    const result = processVoiceTranscript(commandText);
    setLastPipelineResult(result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 text-slate-950 shadow-md">
            <Mic className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">{t.voiceCommandTitle}</h3>
            <p className="text-xs text-slate-400">
              Speech-to-Text with Indian Multilingual Processing
            </p>
          </div>
        </div>

        {/* Big Interactive Microphone Hub */}
        <div className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 mb-6">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300 shadow-xl cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-rose-500/40 ring-4 ring-rose-500/30'
                : 'bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-teal-500/30 active:scale-95'
            }`}
          >
            {isListening ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </button>

          <div className="mt-4 text-center">
            <div className="text-sm font-bold text-white">
              {isListening ? t.listeningNow : t.pressToSpeak}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Supports Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, and English
            </p>
          </div>

          {recognitionError && (
            <div className="mt-3 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{recognitionError}</span>
            </div>
          )}
        </div>

        {/* Required Pipeline Display: Voice Command → Recognized Text → Action */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950/90 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-3 flex items-center justify-between">
            <span>Execution Pipeline</span>
            <span className="text-[11px] text-slate-500">Autonomous Intent Engine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-xs">
            {/* Step 1: Voice Command */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase">
                1. {t.voiceStepCommand}
              </span>
              <p className="font-mono text-slate-200 truncate">
                {lastPipelineResult ? lastPipelineResult.rawVoice : '“Send medicine...”'}
              </p>
            </div>

            {/* Step 2: Recognized Text */}
            <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3">
              <span className="text-[10px] text-slate-400 block mb-1 font-semibold uppercase">
                2. {t.voiceStepRecognized}
              </span>
              <p className="font-mono text-cyan-300 truncate">
                {lastPipelineResult ? lastPipelineResult.recognizedText : '“Room 101 dispatch”'}
              </p>
            </div>

            {/* Step 3: Action Taken */}
            <div className="rounded-xl border border-teal-500/30 bg-teal-950/30 p-3">
              <span className="text-[10px] text-teal-400 block mb-1 font-semibold uppercase flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                3. {t.voiceStepAction}
              </span>
              <p className="font-sans font-medium text-emerald-300 text-[11px] line-clamp-2">
                {lastPipelineResult
                  ? lastPipelineResult.actionTaken
                  : 'Validates & initiates route'}
              </p>
            </div>
          </div>

          {lastPipelineResult && (
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Action status:{' '}
                <strong className={lastPipelineResult.success ? 'text-emerald-400' : 'text-amber-400'}>
                  {lastPipelineResult.success ? 'Executed' : 'Pending verification'}
                </strong>
              </span>
              <button
                onClick={() => speakText(lastPipelineResult.actionTaken)}
                className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium"
              >
                <Volume2 className="h-3.5 w-3.5" />
                <span>Read aloud</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Click-to-Speak Predefined Commands */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-medium text-slate-300">{t.trySpeaking}</span>
            <span className="text-[11px] text-teal-400">Tap to execute instantly</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {t.sampleCommands.map((cmd, idx) => (
              <button
                key={idx}
                onClick={() => handleTestCommand(cmd)}
                className="rounded-xl border border-slate-800 bg-slate-800/60 hover:bg-slate-700/60 px-3 py-1.5 text-xs text-slate-200 hover:text-white transition-all text-left"
              >
                <span className="text-teal-400 mr-1.5">›</span>
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
