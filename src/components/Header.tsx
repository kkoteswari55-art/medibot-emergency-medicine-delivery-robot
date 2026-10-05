import React from 'react';
import { useRobot } from '../context/RobotContext';
import { SUPPORTED_LANGUAGES } from '../translations';
import {
  Bot,
  Volume2,
  VolumeX,
  Mic,
  Sun,
  Moon,
  AlertOctagon,
  Languages,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface HeaderProps {
  onOpenVoiceModal: () => void;
  onOpenNewDeliveryModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenVoiceModal, onOpenNewDeliveryModal }) => {
  const {
    language,
    setLanguage,
    t,
    robotState,
    isSpeechEnabled,
    setIsSpeechEnabled,
    isDarkMode,
    setIsDarkMode,
    triggerEmergencyStop,
    resetEmergencyStop,
  } = useRobot();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 light:bg-white/95 light:border-slate-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-700 text-white shadow-lg shadow-teal-500/20">
            <Bot className="h-6 w-6 animate-pulse" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className={`inline-flex h-full w-full rounded-full ${robotState.systemStatus === 'online' ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white dark:text-white light:text-slate-900 font-sans">
                {t.appTitle}
              </h1>
              <span className="text-xs text-teal-400 dark:text-teal-400 light:text-teal-700 font-medium">
                Autonomous AI
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-400 light:text-slate-600 truncate max-w-[280px] sm:max-w-md">
              {t.appSubtitle} · <span className="text-slate-400">{t.campusTag}</span>
            </p>
          </div>
        </div>

        {/* Right Action Controls: Voice, Speaker, Theme, Language Selector, E-Stop */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Voice Assistant Button */}
          <button
            onClick={onOpenVoiceModal}
            aria-label="Open Voice Assistant"
            className="flex items-center gap-2 rounded-lg bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 text-xs font-medium text-teal-300 hover:bg-teal-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            <Mic className="h-4 w-4 text-teal-400 animate-bounce" />
            <span className="hidden md:inline">{t.voiceAssistant}</span>
          </button>

          {/* Speaker TTS Read Aloud Toggle */}
          <button
            onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
            title={isSpeechEnabled ? t.speakerOn : t.speakerMuted}
            aria-label={isSpeechEnabled ? 'Mute Speech' : 'Enable Speech'}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
              isSpeechEnabled
                ? 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-500 hover:text-slate-300'
            }`}
          >
            {isSpeechEnabled ? <Volume2 className="h-4 w-4 text-cyan-400" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle Theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-100 transition-colors"
          >
            {isDarkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
          </button>

          {/* Language Selector (Indian Languages: Telugu, Hindi, Tamil, Kannada, Malayalam, Marathi, Bengali, English) */}
          <div className="relative flex items-center">
            <label htmlFor="language-select" className="sr-only">
              Select Language
            </label>
            <div className="flex items-center rounded-lg border border-slate-800 bg-slate-900/80 px-2 py-1 text-slate-200">
              <Languages className="mr-1.5 h-3.5 w-3.5 text-teal-400" />
              <select
                id="language-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-slate-100 focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-slate-900 text-slate-100">
                    {lang.flag} {lang.nativeName} ({lang.name})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Emergency Stop / Resume Quick Toggle */}
          {robotState.emergencyStopActivated ? (
            <button
              onClick={() => resetEmergencyStop()}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition-transform active:scale-95 animate-pulse"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>{t.resetEStop}</span>
            </button>
          ) : (
            <button
              onClick={() => triggerEmergencyStop('Header Manual Action')}
              className="flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-extrabold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-500 transition-transform active:scale-95"
            >
              <AlertOctagon className="h-4 w-4" />
              <span className="hidden sm:inline">{t.emergencyStop}</span>
              <span className="sm:hidden">E-STOP</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
