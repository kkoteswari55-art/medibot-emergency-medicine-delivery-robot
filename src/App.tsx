import React, { useState } from 'react';
import { RobotProvider, useRobot } from './context/RobotContext';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { LiveTrackingMap } from './components/LiveTrackingMap';
import { RobotControls } from './components/RobotControls';
import { DeliveryHistory } from './components/DeliveryHistory';
import { AIAssistantChat } from './components/AIAssistantChat';
import { HardwareIntegrationModal } from './components/HardwareIntegrationModal';
import { EmergencyAlertBanner } from './components/EmergencyAlertBanner';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { NewDeliveryModal } from './components/NewDeliveryModal';
import { LocationPoint } from './types';
import {
  LayoutDashboard,
  MapPin,
  PackagePlus,
  Gamepad2,
  History,
  Bot,
  Cpu,
  Mic,
  ShieldAlert,
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { t, activeTab, setActiveTab, robotState } = useRobot();

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isNewDeliveryModalOpen, setIsNewDeliveryModalOpen] = useState(false);
  const [selectedRoomForDelivery, setSelectedRoomForDelivery] = useState<LocationPoint | null>(null);

  const handleOpenDeliveryWithRoom = (room: LocationPoint) => {
    setSelectedRoomForDelivery(room);
    setIsNewDeliveryModalOpen(true);
  };

  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'map', label: t.navLiveTracking, icon: MapPin },
    { id: 'controls', label: t.navControls, icon: Gamepad2 },
    { id: 'history', label: t.navHistory, icon: History },
    { id: 'ai', label: t.navAIAssistant, icon: Bot },
    { id: 'hardware', label: t.navHardware, icon: Cpu },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header */}
      <Header
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenNewDeliveryModal={() => setIsNewDeliveryModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0" aria-label="Tabs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Dispatch CTA Button */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                setSelectedRoomForDelivery(null);
                setIsNewDeliveryModalOpen(true);
              }}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 px-4 py-2 text-xs font-extrabold shadow-lg shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <PackagePlus className="h-4 w-4" />
              <span>{t.newDeliveryTitle}</span>
            </button>
          </div>
        </div>

        {/* Emergency Alert & Hazard System Banner */}
        <EmergencyAlertBanner />

        {/* Dynamic Tab Views */}
        <div>
          {activeTab === 'dashboard' && (
            <Dashboard
              onOpenNewDelivery={() => setIsNewDeliveryModalOpen(true)}
              onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
              onNavigateToTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'map' && (
            <LiveTrackingMap onOpenNewDeliveryWithRoom={handleOpenDeliveryWithRoom} />
          )}

          {activeTab === 'controls' && <RobotControls />}

          {activeTab === 'history' && <DeliveryHistory />}

          {activeTab === 'ai' && <AIAssistantChat />}

          {activeTab === 'hardware' && <HardwareIntegrationModal />}
        </div>
      </main>

      {/* Floating Microphone Quick-Launch Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-slate-950 shadow-2xl shadow-teal-500/50 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          title="Open Multilingual Voice Command Assistant"
        >
          <Mic className="h-7 w-7 animate-pulse" />
          <span className="sr-only">Voice Commands</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>MediBot</strong> – AI-Powered Emergency Medicine Delivery Robot · Tech Expo Demonstration Prototype
          </div>
          <div className="text-[11px] text-slate-400">
            Compliant with Indian Healthcare Logistics & Predefined Medication Safety Protocols
          </div>
        </div>
      </footer>

      {/* Modals */}
      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

      <NewDeliveryModal
        isOpen={isNewDeliveryModalOpen}
        onClose={() => setIsNewDeliveryModalOpen(false)}
        preselectedRoom={selectedRoomForDelivery}
      />
    </div>
  );
};

export default function App() {
  return (
    <RobotProvider>
      <MainAppContent />
    </RobotProvider>
  );
}
