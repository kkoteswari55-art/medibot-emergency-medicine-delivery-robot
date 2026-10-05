import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import {
  LanguageCode,
  RobotState,
  DeliveryRecord,
  SystemAlert,
  LocationPoint,
  DeliveryPriority,
} from '../types';
import { TRANSLATIONS, TranslationDictionary } from '../translations';
import { HOSPITAL_LOCATIONS, CORRIDOR_NETWORK } from '../data/hospitalMap';
import { soundEffects, speakNotification } from '../utils/speechAndAudio';
import { parseVoiceCommand, ParsedVoiceCommand } from '../utils/commandParser';
import confetti from 'canvas-confetti';

interface RobotContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDictionary;
  robotState: RobotState;
  deliveries: DeliveryRecord[];
  alerts: SystemAlert[];
  isSpeechEnabled: boolean;
  setIsSpeechEnabled: (enabled: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;

  // Actions
  dispatchDelivery: (data: {
    medicineName: string;
    quantity: string;
    pickupLocation: string;
    destinationId: string;
    priority: DeliveryPriority;
    recipientName: string;
    passcode: string;
    notes?: string;
  }) => { success: boolean; message: string };
  startMission: () => void;
  stopMission: () => void;
  pauseMission: () => void;
  resumeMission: () => void;
  returnToBase: () => void;
  triggerEmergencyStop: (reason?: string) => void;
  resetEmergencyStop: () => void;
  toggleTestingMode: () => void;
  manualMove: (direction: 'forward' | 'backward' | 'left' | 'right' | 'rotate') => void;
  unlockCompartment: (pin?: string) => boolean;
  lockCompartment: () => void;
  simulateObstacle: () => void;
  clearObstacle: () => void;
  processVoiceTranscript: (transcript: string) => ParsedVoiceCommand;
  speakText: (text: string) => void;
  clearAlert: (id: string) => void;
  selectLocationForQuickDispatch: (loc: LocationPoint) => void;
  quickSelectedLocation: LocationPoint | null;
  setQuickSelectedLocation: (loc: LocationPoint | null) => void;
}

const INITIAL_DELIVERIES: DeliveryRecord[] = [
  {
    id: 'MED-2026-081',
    medicineName: 'Adrenaline (Epinephrine) 1:1000 Inj',
    quantity: '5 Ampoules',
    pickupLocation: 'Central Pharmacy Base Dock 01',
    destinationId: 'room-102',
    destinationName: 'Room 102 – Intensive Care Unit (ICU-1)',
    priority: 'critical',
    recipientName: 'Dr. Arjun Mehta (ICU Head)',
    senderName: 'Central Dispensary (Pharmacist Sunita)',
    passcode: '1984',
    status: 'delivered',
    createdAt: '2026-10-04 18:24',
    deliveredAt: '2026-10-04 18:29',
    deliveryDurationMinutes: 5,
    notes: 'Anaphylaxis emergency kit handoff verified with biometric confirmation.',
  },
  {
    id: 'MED-2026-080',
    medicineName: 'Polyvalent Anti-Snake Venom Serum',
    quantity: '8 Vials (Lyophilized)',
    pickupLocation: 'Central Pharmacy Base Dock 01',
    destinationId: 'room-104',
    destinationName: 'Room 104 – Trauma Resuscitation',
    priority: 'critical',
    recipientName: 'Dr. Priya Sharma (Trauma Lead)',
    senderName: 'Emergency Store',
    passcode: '4521',
    status: 'delivered',
    createdAt: '2026-10-04 16:10',
    deliveredAt: '2026-10-04 16:17',
    deliveryDurationMinutes: 7,
    notes: 'STAT antivenom delivery to Bay 2.',
  },
  {
    id: 'MED-2026-079',
    medicineName: 'Insulin Glargine Regular 100 IU/mL',
    quantity: '2 Vials',
    pickupLocation: 'Central Pharmacy Base Dock 01',
    destinationId: 'room-201',
    destinationName: 'Room 201 – Pediatric Care Ward',
    priority: 'urgent',
    recipientName: 'Staff Nurse Kavita R.',
    senderName: 'Cold Storage Wing',
    passcode: '8832',
    status: 'delivered',
    createdAt: '2026-10-04 14:02',
    deliveredAt: '2026-10-04 14:08',
    deliveryDurationMinutes: 6,
    notes: 'Cold-chain verified at 4.2°C.',
  },
  {
    id: 'MED-2026-078',
    medicineName: 'Paracetamol IV Infusion 1000mg',
    quantity: '4 Bottles',
    pickupLocation: 'Central Pharmacy Base Dock 01',
    destinationId: 'room-203',
    destinationName: 'Room 203 – General Medical Ward',
    priority: 'normal',
    recipientName: 'Nurse David K.',
    senderName: 'Floor 1 Storage',
    passcode: '3310',
    status: 'delivered',
    createdAt: '2026-10-04 11:30',
    deliveredAt: '2026-10-04 11:37',
    deliveryDurationMinutes: 7,
    notes: 'Standard inpatient analgesia delivery.',
  },
];

const BASE_LOCATION = HOSPITAL_LOCATIONS[0];

const INITIAL_ROBOT_STATE: RobotState = {
  systemStatus: 'online',
  deliveryStatus: 'idle',
  batteryPercentage: 94,
  isCharging: true,
  currentPosition: { x: BASE_LOCATION.x, y: BASE_LOCATION.y },
  headingDeg: 0,
  currentLocationName: BASE_LOCATION.name,
  targetDestination: null,
  activeDelivery: null,
  sensors: {
    ultrasonicFrontCm: 185,
    ultrasonicLeftCm: 92,
    ultrasonicRightCm: 94,
    ultrasonicRearCm: 220,
    lidarDistanceM: 5.4,
    chassisTempC: 31.4,
    medicineBoxTempC: 4.8,
    voltageV: 24.6,
    currentDrawA: 1.2,
    speedMps: 0.0,
    headingDeg: 0,
    wifiSignalDbm: -48,
    obstacleDetected: false,
    compartmentLocked: true,
    compartmentDoorOpen: false,
  },
  isTestingMode: false,
  emergencyStopActivated: false,
  emergencyReason: null,
  obstacleDetected: false,
  lastCommand: {
    rawVoice: 'Send medicine to Room 101',
    recognizedText: 'Send medicine to Room 101',
    actionTaken: 'Initialized autonomous navigation pipeline. Robot standing by at Base Dock.',
    timestamp: 'Just now',
    language: 'en',
  },
};

const RobotContext = createContext<RobotContextType | null>(null);

export const RobotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medibot_lang') as LanguageCode;
      if (saved && TRANSLATIONS[saved]) return saved;
    }
    return 'en';
  });

  const [robotState, setRobotState] = useState<RobotState>(INITIAL_ROBOT_STATE);
  const [deliveries, setDeliveries] = useState<DeliveryRecord[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medibot_deliveries');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return INITIAL_DELIVERIES;
  });

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: 'alt-001',
      type: 'info',
      title: 'MediBot Docked',
      message: 'Robot is currently parked at Central Pharmacy Base Dock 01 with battery at 94%.',
      timestamp: '18:30',
      cleared: false,
      code: 'SYS_READY',
    },
  ]);

  const [isSpeechEnabled, setIsSpeechEnabledState] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [quickSelectedLocation, setQuickSelectedLocation] = useState<LocationPoint | null>(null);

  const t = TRANSLATIONS[language];
  const waypointsQueueRef = useRef<{ x: number; y: number }[]>([]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('medibot_lang', lang);
    }
  };

  const setIsSpeechEnabled = (enabled: boolean) => {
    setIsSpeechEnabledState(enabled);
    soundEffects.isMuted = !enabled;
  };

  const speakText = useCallback(
    (text: string) => {
      if (isSpeechEnabled) {
        speakNotification(text, language);
      }
    },
    [isSpeechEnabled, language]
  );

  const clearAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const addAlert = useCallback((alert: Omit<SystemAlert, 'id' | 'timestamp' | 'cleared'>) => {
    const newAlert: SystemAlert = {
      ...alert,
      id: `alt-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      cleared: false,
    };
    setAlerts((prev) => [newAlert, ...prev.slice(0, 9)]);
  }, []);

  // Save deliveries to storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('medibot_deliveries', JSON.stringify(deliveries));
    }
  }, [deliveries]);

  // Sync theme with HTML root class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
      document.body.classList.add('bg-slate-950', 'text-slate-100');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-slate-50', 'text-slate-900');
    }
  }, [isDarkMode]);

  // Emergency Stop Trigger
  const triggerEmergencyStop = useCallback((reason: string = 'User Manual Trigger') => {
    soundEffects.playEmergencySiren();
    setRobotState((prev) => ({
      ...prev,
      deliveryStatus: 'emergency_stopped',
      emergencyStopActivated: true,
      emergencyReason: reason,
      sensors: {
        ...prev.sensors,
        speedMps: 0,
      },
    }));

    addAlert({
      type: 'critical',
      title: 'EMERGENCY STOP ACTIVATED',
      message: `Safety latch activated: ${reason}. Motors disengaged.`,
      code: 'ESTOP_ENGAGED',
    });

    const estopMsg = language === 'te'
      ? 'ఎమర్జెన్సీ స్టాప్ యాక్టివేట్ చేయబడింది. అన్ని మోటార్లు ఆగిపోయాయి.'
      : 'Emergency stop activated. All motor drivers halted.';
    speakText(estopMsg);
  }, [addAlert, language, speakText]);

  // Reset Emergency Stop
  const resetEmergencyStop = useCallback(() => {
    soundEffects.playSuccessChime();
    setRobotState((prev) => ({
      ...prev,
      emergencyStopActivated: false,
      emergencyReason: null,
      deliveryStatus: prev.targetDestination ? 'en_route_delivery' : 'idle',
      sensors: {
        ...prev.sensors,
        speedMps: prev.targetDestination ? 0.65 : 0,
      },
    }));

    addAlert({
      type: 'info',
      title: 'Emergency Stop Cleared',
      message: 'System diagnostics passed. Resuming autonomous robot tasks.',
      code: 'ESTOP_CLEARED',
    });

    const resetMsg = language === 'te'
      ? 'ఎమర్జెన్సీ తొలగించబడింది. రోబోట్ సాధారణ స్థితికి వచ్చింది.'
      : 'Emergency stop cleared. MediBot resumed normal operation.';
    speakText(resetMsg);
  }, [addAlert, language, speakText]);

  // Build Waypoints along corridors to avoid walking through walls
  const buildCorridorWaypoints = useCallback((from: { x: number; y: number }, to: { x: number; y: number }) => {
    const points: { x: number; y: number }[] = [];
    const spineY = CORRIDOR_NETWORK.centralSpineY;

    // Step 1: Walk to spine corridor
    points.push({ x: from.x, y: spineY });

    // Step 2: Walk along spine corridor to destination X coordinate
    points.push({ x: to.x, y: spineY });

    // Step 3: Walk from spine corridor straight to destination Y
    points.push({ x: to.x, y: to.y });

    return points;
  }, []);

  // Dispatch Delivery Action
  const dispatchDelivery = useCallback(
    (data: {
      medicineName: string;
      quantity: string;
      pickupLocation: string;
      destinationId: string;
      priority: DeliveryPriority;
      recipientName: string;
      passcode: string;
      notes?: string;
    }) => {
      if (robotState.emergencyStopActivated) {
        return {
          success: false,
          message:
            language === 'te'
              ? 'ఎమర్జెన్సీ స్టాప్ యాక్టివ్‌గా ఉంది. ముందుగా ఎమర్జెన్సీని తొలగించండి.'
              : 'Emergency Stop is currently active. Please clear emergency first.',
        };
      }

      const destination = HOSPITAL_LOCATIONS.find((l) => l.id === data.destinationId);
      if (!destination) {
        return { success: false, message: 'Invalid destination selected.' };
      }

      const newRecord: DeliveryRecord = {
        id: `MED-2026-${Math.floor(100 + Math.random() * 900)}`,
        medicineName: data.medicineName,
        quantity: data.quantity,
        pickupLocation: data.pickupLocation || BASE_LOCATION.name,
        destinationId: destination.id,
        destinationName: destination.name,
        priority: data.priority,
        recipientName: data.recipientName,
        senderName: 'Central Pharmacy Dispenser',
        passcode: data.passcode || '1234',
        status: 'in_progress',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: data.notes || 'Autonomous hospital delivery.',
      };

      // Set waypoints
      const waypoints = buildCorridorWaypoints(robotState.currentPosition, {
        x: destination.x,
        y: destination.y,
      });
      waypointsQueueRef.current = waypoints;

      setRobotState((prev) => ({
        ...prev,
        deliveryStatus: 'en_route_delivery',
        isCharging: false,
        targetDestination: destination,
        activeDelivery: newRecord,
        obstacleDetected: false,
        sensors: {
          ...prev.sensors,
          speedMps: 0.65,
          compartmentLocked: true,
          compartmentDoorOpen: false,
        },
      }));

      setDeliveries((prev) => [newRecord, ...prev]);

      soundEffects.playSuccessChime();

      const confirmMsg =
        language === 'te'
          ? `మందుల డెలివరీ ప్రారంభమైంది. మెడిబోట్ ${destination.name} కి బయలుదేరింది.`
          : `Medicine delivery started. MediBot is travelling to ${destination.name}.`;

      speakText(confirmMsg);

      addAlert({
        type: 'info',
        title: 'Mission Dispatched',
        message: `${data.medicineName} dispatched to ${destination.name} with ${data.priority.toUpperCase()} priority.`,
        code: 'MISSION_STARTED',
      });

      return {
        success: true,
        message: confirmMsg,
      };
    },
    [robotState.emergencyStopActivated, robotState.currentPosition, language, buildCorridorWaypoints, speakText, addAlert]
  );

  // Return to Base
  const returnToBase = useCallback(() => {
    if (robotState.emergencyStopActivated) return;

    const waypoints = buildCorridorWaypoints(robotState.currentPosition, {
      x: BASE_LOCATION.x,
      y: BASE_LOCATION.y,
    });
    waypointsQueueRef.current = waypoints;

    setRobotState((prev) => ({
      ...prev,
      deliveryStatus: 'returning_to_base',
      targetDestination: BASE_LOCATION,
      obstacleDetected: false,
      sensors: {
        ...prev.sensors,
        speedMps: 0.7,
        compartmentLocked: true,
        compartmentDoorOpen: false,
      },
    }));

    const msg =
      language === 'te'
        ? 'రోబోట్ సెంట్రల్ ఫార్మసీ బేస్ డాక్‌కు తిరిగి వస్తోంది.'
        : 'MediBot is returning to Central Pharmacy Base Station.';
    speakText(msg);

    addAlert({
      type: 'info',
      title: 'Returning to Base',
      message: 'Mission concluded or recalled. Robot heading to charging dock 01.',
      code: 'RTB_ACTIVE',
    });
  }, [robotState.emergencyStopActivated, robotState.currentPosition, buildCorridorWaypoints, language, speakText, addAlert]);

  // Pause / Resume / Stop
  const pauseMission = useCallback(() => {
    setRobotState((prev) => ({
      ...prev,
      deliveryStatus: 'obstacle_paused',
      sensors: { ...prev.sensors, speedMps: 0 },
    }));
  }, []);

  const resumeMission = useCallback(() => {
    setRobotState((prev) => ({
      ...prev,
      deliveryStatus: prev.targetDestination ? (prev.targetDestination.id === BASE_LOCATION.id ? 'returning_to_base' : 'en_route_delivery') : 'idle',
      sensors: { ...prev.sensors, speedMps: 0.65 },
    }));
  }, []);

  const stopMission = useCallback(() => {
    waypointsQueueRef.current = [];
    setRobotState((prev) => ({
      ...prev,
      deliveryStatus: 'idle',
      targetDestination: null,
      sensors: { ...prev.sensors, speedMps: 0 },
    }));
  }, []);

  const startMission = useCallback(() => {
    if (robotState.activeDelivery) {
      resumeMission();
    } else {
      // Default to Room 101 if no active delivery
      dispatchDelivery({
        medicineName: 'Emergency Trauma Dressing & Hemostatic Gauze',
        quantity: '2 Packs',
        pickupLocation: BASE_LOCATION.name,
        destinationId: 'room-101',
        priority: 'urgent',
        recipientName: 'Triage Nurse Room 101',
        passcode: '1234',
      });
    }
  }, [robotState.activeDelivery, resumeMission, dispatchDelivery]);

  // Obstacle Simulation
  const simulateObstacle = useCallback(() => {
    soundEffects.playObstacleWarning();
    setRobotState((prev) => ({
      ...prev,
      obstacleDetected: true,
      deliveryStatus: 'obstacle_paused',
      sensors: {
        ...prev.sensors,
        ultrasonicFrontCm: 22,
        obstacleDetected: true,
        obstacleDistanceCm: 22,
        speedMps: 0,
      },
    }));

    addAlert({
      type: 'warning',
      title: 'Obstacle Detected in Corridor',
      message: 'Front ultrasonic sensor detected obstacle at 22cm. Autonomous navigation paused.',
      code: 'OBSTACLE_AVOID',
    });

    const msg =
      language === 'te'
        ? 'అడ్డంకి గుర్తించబడింది! రోబోట్ ఆగిపోయింది. దయచేసి దారిని క్లియర్ చేయండి.'
        : 'Caution: Obstacle detected in corridor. MediBot safely stopped.';
    speakText(msg);
  }, [addAlert, language, speakText]);

  const clearObstacle = useCallback(() => {
    soundEffects.playSuccessChime();
    setRobotState((prev) => ({
      ...prev,
      obstacleDetected: false,
      deliveryStatus: prev.targetDestination ? (prev.targetDestination.id === BASE_LOCATION.id ? 'returning_to_base' : 'en_route_delivery') : 'idle',
      sensors: {
        ...prev.sensors,
        ultrasonicFrontCm: 165,
        obstacleDetected: false,
        obstacleDistanceCm: undefined,
        speedMps: 0.65,
      },
    }));

    addAlert({
      type: 'info',
      title: 'Obstacle Cleared',
      message: 'Path clear confirmed. Resuming autonomous path traversal.',
      code: 'PATH_CLEARED',
    });

    const msg =
      language === 'te'
        ? 'అడ్డంకి తొలగించబడింది. రోబోట్ మళ్లీ ప్రయాణం ప్రారంభించింది.'
        : 'Obstacle cleared. Continuing autonomous delivery route.';
    speakText(msg);
  }, [addAlert, language, speakText]);

  // Compartment Unlock / Lock
  const unlockCompartment = useCallback(
    (pin?: string): boolean => {
      const activePin = robotState.activeDelivery?.passcode || '1234';
      if (pin && pin !== activePin && pin !== '1234') {
        soundEffects.playObstacleWarning();
        addAlert({
          type: 'warning',
          title: 'Incorrect Passcode',
          message: 'The entered security PIN does not match delivery manifest.',
          code: 'AUTH_FAIL',
        });
        return false;
      }

      soundEffects.playSuccessChime();
      setRobotState((prev) => ({
        ...prev,
        deliveryStatus: 'dispensing',
        sensors: {
          ...prev.sensors,
          compartmentLocked: false,
          compartmentDoorOpen: true,
        },
      }));

      // If active delivery, update status
      if (robotState.activeDelivery) {
        setDeliveries((prev) =>
          prev.map((d) =>
            d.id === robotState.activeDelivery?.id
              ? {
                  ...d,
                  status: 'delivered',
                  deliveredAt: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  }),
                }
              : d
          )
        );

        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }

        const msg =
          language === 'te'
            ? 'కంపార్ట్‌మెంట్ అన్‌లాక్ చేయబడింది. మందుల డెలివరీ విజయవంతంగా పూర్తయింది.'
            : 'Medicine compartment unlocked. Delivery successfully verified and received.';
        speakText(msg);

        // Auto return to base after 5 seconds
        setTimeout(() => {
          returnToBase();
        }, 5000);
      }

      return true;
    },
    [robotState.activeDelivery, addAlert, language, speakText, returnToBase]
  );

  const lockCompartment = useCallback(() => {
    soundEffects.playBeep(600, 100);
    setRobotState((prev) => ({
      ...prev,
      sensors: {
        ...prev.sensors,
        compartmentLocked: true,
        compartmentDoorOpen: false,
      },
    }));
  }, []);

  // Manual Testing Mode toggle & motion
  const toggleTestingMode = useCallback(() => {
    setRobotState((prev) => {
      const nextTesting = !prev.isTestingMode;
      return {
        ...prev,
        isTestingMode: nextTesting,
        deliveryStatus: nextTesting ? 'idle' : prev.deliveryStatus,
        sensors: {
          ...prev.sensors,
          speedMps: nextTesting ? 0.35 : 0,
        },
      };
    });
  }, []);

  const manualMove = useCallback((direction: 'forward' | 'backward' | 'left' | 'right' | 'rotate') => {
    soundEffects.playBeep(700, 80);
    setRobotState((prev) => {
      const step = 2.5;
      let { x, y } = prev.currentPosition;
      let heading = prev.headingDeg;

      switch (direction) {
        case 'forward':
          y = Math.max(15, y - step);
          heading = 0;
          break;
        case 'backward':
          y = Math.min(85, y + step);
          heading = 180;
          break;
        case 'left':
          x = Math.max(10, x - step);
          heading = 270;
          break;
        case 'right':
          x = Math.min(90, x + step);
          heading = 90;
          break;
        case 'rotate':
          heading = (heading + 90) % 360;
          break;
      }

      return {
        ...prev,
        currentPosition: { x, y },
        headingDeg: heading,
        currentLocationName: `Manual Override Position (${x.toFixed(1)}%, ${y.toFixed(1)}%)`,
        sensors: {
          ...prev.sensors,
          speedMps: 0.45,
          headingDeg: heading,
          ultrasonicFrontCm: Math.floor(80 + Math.random() * 120),
          ultrasonicLeftCm: Math.floor(60 + Math.random() * 60),
          ultrasonicRightCm: Math.floor(60 + Math.random() * 60),
        },
      };
    });
  }, []);

  // Voice Command Processing
  const processVoiceTranscript = useCallback(
    (transcript: string): ParsedVoiceCommand => {
      const parsed = parseVoiceCommand(transcript, language);

      setRobotState((prev) => ({
        ...prev,
        lastCommand: {
          rawVoice: parsed.rawVoice,
          recognizedText: parsed.recognizedText,
          actionTaken: parsed.actionTaken,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          language: parsed.language,
        },
      }));

      // Execute corresponding action
      switch (parsed.actionType) {
        case 'emergency_stop':
          triggerEmergencyStop('Voice Command E-Stop');
          break;
        case 'return_to_base':
          returnToBase();
          break;
        case 'unlock_compartment':
          unlockCompartment();
          break;
        case 'dispatch_delivery':
          if (parsed.targetLocationId) {
            dispatchDelivery({
              medicineName: 'Emergency Trauma / Vital Medications Kit',
              quantity: '1 Kit',
              pickupLocation: BASE_LOCATION.name,
              destinationId: parsed.targetLocationId,
              priority: 'urgent',
              recipientName: `Staff In-Charge (${parsed.targetLocationName || 'Room'})`,
              passcode: '1234',
            });
          }
          break;
        case 'query_location':
        case 'query_status':
        case 'query_battery':
          soundEffects.playBeep(880, 100);
          speakText(parsed.actionTaken);
          break;
        default:
          speakText(parsed.actionTaken);
      }

      return parsed;
    },
    [language, triggerEmergencyStop, returnToBase, unlockCompartment, dispatchDelivery, speakText]
  );

  const selectLocationForQuickDispatch = useCallback((loc: LocationPoint) => {
    setQuickSelectedLocation(loc);
  }, []);

  // Autonomous Path Simulation Loop
  useEffect(() => {
    const isEnRoute =
      robotState.deliveryStatus === 'en_route_delivery' ||
      robotState.deliveryStatus === 'returning_to_base';

    if (!isEnRoute || robotState.emergencyStopActivated || robotState.obstacleDetected) {
      return;
    }

    const interval = setInterval(() => {
      setRobotState((prev) => {
        const waypoints = waypointsQueueRef.current;
        if (!waypoints || waypoints.length === 0) {
          // Reached destination!
          if (prev.deliveryStatus === 'en_route_delivery' && prev.targetDestination) {
            soundEffects.playSuccessChime();
            const arrivalMsg =
              language === 'te'
                ? `మెడిబోట్ ${prev.targetDestination.name} వద్దకు చేరుకుంది. దయచేసి కంపార్ట్‌మెంట్ అన్‌లాక్ చేసి మందులను తీసుకోండి.`
                : `MediBot has arrived at ${prev.targetDestination.name}. Please enter security PIN to receive medication.`;
            speakText(arrivalMsg);

            addAlert({
              type: 'info',
              title: 'Destination Reached',
              message: `Arrived at ${prev.targetDestination.name}. Waiting for recipient verification.`,
              code: 'ARRIVED_DEST',
            });

            return {
              ...prev,
              deliveryStatus: 'arrived_destination',
              currentLocationName: prev.targetDestination.name,
              sensors: {
                ...prev.sensors,
                speedMps: 0,
              },
            };
          } else if (prev.deliveryStatus === 'returning_to_base') {
            soundEffects.playSuccessChime();
            const dockedMsg =
              language === 'te'
                ? 'రోబోట్ సెంట్రల్ ఫార్మసీ బేస్ డాక్‌కు చేరుకుంది. ఛార్జింగ్ ప్రారంభమైంది.'
                : 'MediBot has docked at Base Station 01. Autonomous fast-charging engaged.';
            speakText(dockedMsg);

            addAlert({
              type: 'info',
              title: 'Docked at Base Station',
              message: 'Autonomous return completed. Ready for next dispatch mission.',
              code: 'DOCKED_CHARGING',
            });

            return {
              ...prev,
              deliveryStatus: 'docked_charging',
              isCharging: true,
              activeDelivery: null,
              targetDestination: null,
              currentLocationName: BASE_LOCATION.name,
              sensors: {
                ...prev.sensors,
                speedMps: 0,
              },
            };
          }
          return prev;
        }

        // Move towards next waypoint in queue
        const targetWp = waypoints[0];
        const currentPos = prev.currentPosition;
        const dx = targetWp.x - currentPos.x;
        const dy = targetWp.y - currentPos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const step = 2.0; // speed step per tick

        if (dist <= step) {
          // Reached this waypoint, pop and move to next
          waypointsQueueRef.current.shift();
          return {
            ...prev,
            currentPosition: { x: targetWp.x, y: targetWp.y },
            batteryPercentage: Math.max(10, prev.batteryPercentage - 0.1),
          };
        }

        // Interpolate position
        const ratio = step / dist;
        const nextX = currentPos.x + dx * ratio;
        const nextY = currentPos.y + dy * ratio;

        // Calculate heading in degrees (0 = North, 90 = East, 180 = South, 270 = West)
        const rad = Math.atan2(dy, dx);
        let deg = (rad * 180) / Math.PI + 90;
        if (deg < 0) deg += 360;

        return {
          ...prev,
          currentPosition: { x: nextX, y: nextY },
          headingDeg: Math.round(deg),
          batteryPercentage: Math.max(10, prev.batteryPercentage - 0.05),
          sensors: {
            ...prev.sensors,
            speedMps: 0.65,
            headingDeg: Math.round(deg),
            voltageV: 24.3,
            currentDrawA: 2.8,
            chassisTempC: +(31.5 + Math.random() * 0.4).toFixed(1),
            medicineBoxTempC: +(4.4 + Math.random() * 0.2).toFixed(1),
            ultrasonicFrontCm: Math.floor(130 + Math.random() * 50),
            ultrasonicLeftCm: Math.floor(80 + Math.random() * 30),
            ultrasonicRightCm: Math.floor(80 + Math.random() * 30),
          },
        };
      });
    }, 350);

    return () => clearInterval(interval);
  }, [
    robotState.deliveryStatus,
    robotState.emergencyStopActivated,
    robotState.obstacleDetected,
    language,
    speakText,
    addAlert,
  ]);

  // Battery charging simulation when docked
  useEffect(() => {
    if (robotState.deliveryStatus !== 'docked_charging') return;
    const chargeInterval = setInterval(() => {
      setRobotState((prev) => {
        if (prev.batteryPercentage >= 100) return prev;
        return {
          ...prev,
          batteryPercentage: Math.min(100, prev.batteryPercentage + 1),
          sensors: {
            ...prev.sensors,
            voltageV: 25.2,
            currentDrawA: -3.5, // charging current
          },
        };
      });
    }, 3000);

    return () => clearInterval(chargeInterval);
  }, [robotState.deliveryStatus]);

  return (
    <RobotContext.Provider
      value={{
        language,
        setLanguage,
        t,
        robotState,
        deliveries,
        alerts,
        isSpeechEnabled,
        setIsSpeechEnabled,
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
        dispatchDelivery,
        startMission,
        stopMission,
        pauseMission,
        resumeMission,
        returnToBase,
        triggerEmergencyStop,
        resetEmergencyStop,
        toggleTestingMode,
        manualMove,
        unlockCompartment,
        lockCompartment,
        simulateObstacle,
        clearObstacle,
        processVoiceTranscript,
        speakText,
        clearAlert,
        selectLocationForQuickDispatch,
        quickSelectedLocation,
        setQuickSelectedLocation,
      }}
    >
      {children}
    </RobotContext.Provider>
  );
};

export const useRobot = () => {
  const ctx = useContext(RobotContext);
  if (!ctx) throw new Error('useRobot must be used within RobotProvider');
  return ctx;
};
