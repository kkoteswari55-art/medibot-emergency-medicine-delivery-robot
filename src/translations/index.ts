import { LanguageCode, LanguageInfo } from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', locale: 'en-IN', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', locale: 'te-IN', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', locale: 'hi-IN', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', locale: 'ta-IN', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', locale: 'kn-IN', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', locale: 'ml-IN', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', locale: 'mr-IN', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', locale: 'bn-IN', flag: '🇮🇳' },
];

export interface TranslationDictionary {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  campusTag: string;
  systemOnline: string;
  systemOffline: string;
  simulatedMode: string;
  voiceAssistant: string;
  speakerOn: string;
  speakerMuted: string;
  emergencyStop: string;
  resetEStop: string;

  // Tabs / Navigation
  navDashboard: string;
  navLiveTracking: string;
  navNewDelivery: string;
  navControls: string;
  navHistory: string;
  navHardware: string;
  navAIAssistant: string;

  // Telemetry Cards
  robotStatus: string;
  batteryLevel: string;
  currentLocation: string;
  destination: string;
  deliveryStatus: string;
  temperatures: string;
  obstacleStatus: string;
  connectionStatus: string;
  emergencyAlertStatus: string;
  coldChainTemp: string;
  chassisTemp: string;
  radarClear: string;
  obstacleWarning: string;
  obstacleDetected: string;
  estimatedArrival: string;
  distanceRemaining: string;

  // Delivery Status Names
  statusIdle: string;
  statusLoading: string;
  statusEnRoute: string;
  statusArrived: string;
  statusDispensing: string;
  statusComplete: string;
  statusReturning: string;
  statusDocked: string;
  statusEmergency: string;
  statusObstaclePaused: string;

  // New Delivery
  newDeliveryTitle: string;
  newDeliveryDesc: string;
  medicineName: string;
  medicinePlaceholder: string;
  quantity: string;
  pickupLocation: string;
  destinationRoom: string;
  priorityLevel: string;
  priorityNormal: string;
  priorityUrgent: string;
  priorityCritical: string;
  receiverName: string;
  receiverPlaceholder: string;
  securityPin: string;
  sendRobot: string;
  confirmDelivery: string;
  cancel: string;
  quickMedicinePicks: string;
  safetyNotice: string;
  deliveryStartedConfirmation: string;

  // Live Tracking
  floorPlanTitle: string;
  baseStation: string;
  simulateObstacle: string;
  clearObstacle: string;
  recalculatingRoute: string;
  pathRoute: string;
  speed: string;

  // Robot Controls
  robotControlsTitle: string;
  autonomousOperations: string;
  testingModeLabel: string;
  testingModeDesc: string;
  btnStart: string;
  btnStop: string;
  btnPause: string;
  btnResume: string;
  btnReturnBase: string;
  btnManualTesting: string;
  manualForward: string;
  manualBackward: string;
  manualLeft: string;
  manualRight: string;
  manualRotate: string;
  compartmentControl: string;
  compartmentLocked: string;
  compartmentUnlocked: string;
  unlockHatch: string;
  lockHatch: string;

  // Voice Section
  voiceCommandTitle: string;
  voiceStepCommand: string;
  voiceStepRecognized: string;
  voiceStepAction: string;
  listeningNow: string;
  pressToSpeak: string;
  trySpeaking: string;
  sampleCommands: string[];
  noVoiceRecognized: string;
  voiceActionDispatched: string;

  // Emergency Banner & Alerts
  emergencyStopActivated: string;
  emergencyStopDesc: string;
  resumeRobot: string;
  warningLowBattery: string;
  warningHighTemp: string;
  warningObstacle: string;
  warningCommsFail: string;
  warningDeliveryFail: string;

  // Delivery History
  historyTitle: string;
  historySubtitle: string;
  searchPlaceholder: string;
  filterAll: string;
  colDeliveryId: string;
  colMedicine: string;
  colDestination: string;
  colPriority: string;
  colDateTime: string;
  colStatus: string;
  colActions: string;
  receiptTitle: string;
  exportCsv: string;

  // AI Assistant
  aiAssistantTitle: string;
  aiWelcome: string;
  aiInputPlaceholder: string;
  aiSuggestedQuestions: string[];
  aiDisclaimer: string;

  // Hardware
  hardwareTitle: string;
  hardwareSubtitle: string;
  esp32Pinout: string;
  telemetryStream: string;
  connectPhysicalRobot: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  // 1. English
  en: {
    appTitle: 'MediBot',
    appSubtitle: 'Emergency Medicine Delivery Robot',
    campusTag: 'Apollo Smart Healthcare & AIIMS Campus System',
    systemOnline: 'Online',
    systemOffline: 'Offline',
    simulatedMode: 'Simulation Active',
    voiceAssistant: 'Voice Control',
    speakerOn: 'Speech Audio Enabled',
    speakerMuted: 'Muted',
    emergencyStop: 'EMERGENCY STOP',
    resetEStop: 'Resume System',

    navDashboard: 'Dashboard',
    navLiveTracking: 'Live Tracking',
    navNewDelivery: 'New Delivery',
    navControls: 'Robot Controls',
    navHistory: 'Delivery History',
    navHardware: 'Hardware Bridge',
    navAIAssistant: 'MediBot AI',

    robotStatus: 'Robot Status',
    batteryLevel: 'Battery Level',
    currentLocation: 'Current Location',
    destination: 'Destination',
    deliveryStatus: 'Delivery Status',
    temperatures: 'System Temperatures',
    obstacleStatus: 'Obstacle Sensor Radar',
    connectionStatus: 'ESP32 Wi-Fi Telemetry',
    emergencyAlertStatus: 'Emergency Protocol',
    coldChainTemp: 'Medicine Cold-Box',
    chassisTemp: 'Chassis Core',
    radarClear: 'Path Clear (> 100cm)',
    obstacleWarning: 'Caution Obstacle (< 50cm)',
    obstacleDetected: 'Obstacle Detected! Stopping',
    estimatedArrival: 'ETA',
    distanceRemaining: 'Remaining Distance',

    statusIdle: 'Idle at Station',
    statusLoading: 'Loading Medicine',
    statusEnRoute: 'Travelling to Destination',
    statusArrived: 'Arrived at Destination',
    statusDispensing: 'Compartment Unlocked',
    statusComplete: 'Delivery Completed',
    statusReturning: 'Returning to Base Station',
    statusDocked: 'Docked & Charging',
    statusEmergency: 'Emergency Stop Active',
    statusObstaclePaused: 'Paused – Obstacle Avoidance',

    newDeliveryTitle: 'Dispatch Emergency Medicine',
    newDeliveryDesc: 'Select target hospital room or ward to dispatch MediBot autonomously.',
    medicineName: 'Medicine / Medical Item',
    medicinePlaceholder: 'e.g. Adrenaline Inj, Insulin, Paracetamol IV',
    quantity: 'Quantity & Units',
    pickupLocation: 'Pickup Location',
    destinationRoom: 'Destination Room / Ward',
    priorityLevel: 'Urgency Priority',
    priorityNormal: 'Normal Delivery',
    priorityUrgent: 'Urgent Care',
    priorityCritical: 'Critical / Code Blue',
    receiverName: 'Recipient / Nurse In-Charge',
    receiverPlaceholder: 'e.g. Dr. Priya Sharma / Staff Nurse ICU',
    securityPin: '4-Digit Compartment PIN',
    sendRobot: 'Send Robot',
    confirmDelivery: 'Confirm & Dispatch',
    cancel: 'Cancel',
    quickMedicinePicks: 'Emergency Quick Picks',
    safetyNotice: 'Notice: MediBot is for medicine transport only. The robot does NOT prescribe or recommend dosages.',
    deliveryStartedConfirmation: 'Medicine delivery started. MediBot is travelling to {dest}.',

    floorPlanTitle: 'Hospital Floor Telemetry & Live Path',
    baseStation: 'Central Pharmacy Base Dock',
    simulateObstacle: 'Simulate Obstacle in Corridor',
    clearObstacle: 'Clear Obstacle & Resume',
    recalculatingRoute: 'Rerouting around obstacle...',
    pathRoute: 'Base Station → Robot → Destination',
    speed: 'Velocity',

    robotControlsTitle: 'Robot Autonomous & Manual Controls',
    autonomousOperations: 'Autonomous Mission Control',
    testingModeLabel: 'Testing Mode (Manual Override)',
    testingModeDesc: 'Direct motor PWM control for maintenance, expo demos, and obstacle testing.',
    btnStart: 'Start Mission',
    btnStop: 'Stop',
    btnPause: 'Pause',
    btnResume: 'Resume',
    btnReturnBase: 'Return to Base',
    btnManualTesting: 'Toggle Testing Mode',
    manualForward: 'Forward',
    manualBackward: 'Reverse',
    manualLeft: 'Left Turn',
    manualRight: 'Right Turn',
    manualRotate: 'Rotate 360°',
    compartmentControl: 'Secure Compartment Hatch',
    compartmentLocked: 'LOCKED',
    compartmentUnlocked: 'UNLOCKED',
    unlockHatch: 'Unlock Compartment',
    lockHatch: 'Lock Compartment',

    voiceCommandTitle: 'Indian Multilingual Voice Assistant',
    voiceStepCommand: 'Voice Command',
    voiceStepRecognized: 'Recognized Text',
    voiceStepAction: 'Action Taken',
    listeningNow: 'Listening... Speak your command in English or selected Indian language',
    pressToSpeak: 'Press Microphone & Speak',
    trySpeaking: 'Or tap a predefined command to test immediately:',
    sampleCommands: [
      'Send medicine to Room 101',
      'Where is the robot?',
      'Robot status',
      'Return to base',
      'Emergency stop'
    ],
    noVoiceRecognized: 'No speech recognized. Please try again or tap a sample command.',
    voiceActionDispatched: 'Command recognized and executed successfully.',

    emergencyStopActivated: 'EMERGENCY STOP ACTIVATED',
    emergencyStopDesc: 'All motor drives disengaged and emergency brakes engaged. Safe clearance required before resume.',
    resumeRobot: 'Clear Emergency & Resume Normal Operation',
    warningLowBattery: 'Warning: Battery low (< 20%). Robot returning to base for fast recharge.',
    warningHighTemp: 'Warning: Medicine cold storage temperature exceeded threshold!',
    warningObstacle: 'Obstacle detected directly in forward path (< 30cm).',
    warningCommsFail: 'ESP32 Wi-Fi telemetry ping latency elevated.',
    warningDeliveryFail: 'Compartment timeout: Recipient has not entered PIN.',

    historyTitle: 'Hospital Delivery Audit Trail',
    historySubtitle: 'Verifiable records of all emergency medicine transports.',
    searchPlaceholder: 'Search by medicine, room, receiver, or ID...',
    filterAll: 'All Deliveries',
    colDeliveryId: 'Delivery ID',
    colMedicine: 'Medicine & Qty',
    colDestination: 'Destination',
    colPriority: 'Priority',
    colDateTime: 'Dispatched At',
    colStatus: 'Status',
    colActions: 'Receipt',
    receiptTitle: 'Official Hospital Dispatch Receipt',
    exportCsv: 'Export Log (CSV)',

    aiAssistantTitle: 'MediBot AI Assistant',
    aiWelcome: 'Hello! I am MediBot AI Assistant. I can check robot location, battery levels, delivery status, and handle dispatch commands in all 8 Indian languages.',
    aiInputPlaceholder: 'Ask in English, Telugu, Hindi, etc... (e.g., "Where is MediBot?")',
    aiSuggestedQuestions: [
      'Where is the robot right now?',
      'What is the current battery level?',
      'Tell me the status of the current delivery',
      'How does obstacle avoidance work?'
    ],
    aiDisclaimer: 'Safety Rule: MediBot AI transports predefined items only and strictly does not provide medical diagnoses or dosage advice.',

    hardwareTitle: 'ESP32 & Arduino Hardware Architecture',
    hardwareSubtitle: 'Robotics pinout, sensor telemetry payload, and serial data bridge.',
    esp32Pinout: 'Microcontroller & Sensor Pin Configuration',
    telemetryStream: 'Live Serial / Telemetry Stream (JSON 115200 Baud)',
    connectPhysicalRobot: 'Switch to Physical Hardware Bridge (WebSocket / Serial)',
  },

  // 2. Telugu (తెలుగు) - Highly detailed per prompt specifications!
  te: {
    appTitle: 'మెడిబోట్ (MediBot)',
    appSubtitle: 'ఎమర్జెన్సీ ఔషధ డెలివరీ రోబోట్',
    campusTag: 'భారతీయ ఆసుపత్రులు & కాలేజ్ క్యాంపస్ రోబోటిక్స్ సిస్టమ్',
    systemOnline: 'ఆన్‌లైన్',
    systemOffline: 'ఆఫ్‌లైన్',
    simulatedMode: 'సిమ్యులేషన్ మోడ్ యాక్టివ్',
    voiceAssistant: 'వాయిస్ కమాండ్',
    speakerOn: 'వాయిస్ స్పీకర్ ఆన్',
    speakerMuted: 'మ్యూట్ చేయబడింది',
    emergencyStop: 'ఎమర్జెన్సీ స్టాప్',
    resetEStop: 'రోబోట్ రీస్టార్ట్ చేయండి',

    navDashboard: 'డ్యాష్‌బోర్డ్',
    navLiveTracking: 'లైవ్ ట్రాకింగ్',
    navNewDelivery: 'కొత్త డెలివరీ',
    navControls: 'రోబోట్ నియంత్రణలు',
    navHistory: 'డెలివరీ చరిత్ర',
    navHardware: 'హార్డ్‌వేర్ బ్రిడ్జ్',
    navAIAssistant: 'మెడిబోట్ AI అసిస్టెంట్',

    robotStatus: 'రోబోట్ స్థితి',
    batteryLevel: 'బ్యాటరీ శాతం',
    currentLocation: 'ప్రస్తుత ప్రదేశం',
    destination: 'చేరవలసిన గమ్యం',
    deliveryStatus: 'డెలివరీ స్థితి',
    temperatures: 'ఉష్ణోగ్రత',
    obstacleStatus: 'అడ్డంకి సెన్సార్ (Obstacle Sensor)',
    connectionStatus: 'ESP32 వైఫై సిగ్నల్',
    emergencyAlertStatus: 'ఎమర్జెన్సీ హెచ్చరిక స్థితి',
    coldChainTemp: 'మందుల బాక్స్ ఉష్ణోగ్రత',
    chassisTemp: 'రోబోట్ ఛాసిస్',
    radarClear: 'దారి క్లియర్ గా ఉంది (> 100సెం.మీ)',
    obstacleWarning: 'హెచ్చరిక: అడ్డంకి సమీపంలో ఉంది (< 50సెం.మీ)',
    obstacleDetected: 'అడ్డంకి గుర్తించబడింది! రోబోట్ ఆగింది',
    estimatedArrival: 'చేరుకునే సమయం',
    distanceRemaining: 'మిగిలిన దూరం',

    statusIdle: 'బేస్ స్టేషన్ వద్ద సిద్ధంగా ఉంది',
    statusLoading: 'మందులు లోడ్ చేయబడుతున్నాయి',
    statusEnRoute: 'గమ్యానికి ప్రయాణిస్తోంది',
    statusArrived: 'గది వద్దకు చేరుకుంది',
    statusDispensing: 'కంపార్ట్‌మెంట్ అన్‌లాక్ అయింది',
    statusComplete: 'మందులు విజయవంతంగా అందజేయబడ్డాయి',
    statusReturning: 'బేస్ స్టేషన్‌కు తిరిగి వస్తోంది',
    statusDocked: 'ఛార్జింగ్ స్టేషన్‌లో ఉంది',
    statusEmergency: 'ఎమర్జెన్సీ స్టాప్ యాక్టివేట్ అయింది',
    statusObstaclePaused: 'అడ్డంకి కారణంగా ఆగింది',

    newDeliveryTitle: 'కొత్త ఔషధ డెలివరీ అభ్యర్థన',
    newDeliveryDesc: 'అత్యవసర మందులను సంబంధిత వార్డ్ లేదా గదికి పంపడానికి క్రింది వివరాలను పూరించండి.',
    medicineName: 'మందు / ఐటమ్ పేరు',
    medicinePlaceholder: 'ఉదా: అడ్రినాలిన్, ఇన్సులిన్, పారాసిటమాల్',
    quantity: 'పరిమాణం & యూనిట్లు',
    pickupLocation: 'పికప్ లొకేషన్',
    destinationRoom: 'చేరవలసిన రూమ్ / వార్డ్ నంబర్',
    priorityLevel: 'ప్రాధాన్యత',
    priorityNormal: 'సాధారణం (Normal)',
    priorityUrgent: 'అత్యవసరం (Urgent)',
    priorityCritical: 'చాలా అత్యవసరం (Critical / Code Blue)',
    receiverName: 'స్వీకర్త / నర్సు పేరు',
    receiverPlaceholder: 'ఉదా: డాక్టర్ రమేష్ / నర్స్ ప్రియ',
    securityPin: '4-అంకెల సెక్యూరిటీ పిన్',
    sendRobot: 'రోబోట్ పంపించండి (Send Robot)',
    confirmDelivery: 'డెలివరీ నిర్ధారించండి',
    cancel: 'రద్దు చేయండి',
    quickMedicinePicks: 'త్వరిత అత్యవసర మందులు',
    safetyNotice: 'ముఖ్య గమనిక: మెడిబోట్ మందుల రవాణాకు మాత్రమే. ఇది మందులను లేదా మోతాదులను సిఫారసు చేయదు.',
    deliveryStartedConfirmation: 'మందుల డెలివరీ ప్రారంభమైంది. మెడిబోట్ {dest} కి ప్రయాణిస్తోంది.',

    floorPlanTitle: 'హాస్పిటల్ మ్యాప్ & లైవ్ రోబోట్ ట్రాకింగ్',
    baseStation: 'సెంట్రల్ ఫార్మసీ బేస్ డాక్',
    simulateObstacle: 'దారిలో అడ్డంకిని సృష్టించండి',
    clearObstacle: 'అడ్డంకిని తొలగించి కొనసాగించండి',
    recalculatingRoute: 'ప్రత్యామ్నాయ దారిని గణిస్తోంది...',
    pathRoute: 'బేస్ స్టేషన్ → రోబోట్ → గమ్యం',
    speed: 'వేగం',

    robotControlsTitle: 'రోబోట్ కంట్రోల్స్ & టెస్టింగ్ మోడ్',
    autonomousOperations: 'స్వయంప్రతిపత్తి ఆపరేషన్స్ (Autonomous)',
    testingModeLabel: 'టెస్టింగ్ మోడ్ (Testing Mode)',
    testingModeDesc: 'మోటార్ల మాన్యువల్ పరీక్ష కోసం మాత్రమే ఈ నియంత్రణలను ఉపయోగించండి.',
    btnStart: 'ప్రారంభించు (Start)',
    btnStop: 'ఆపు (Stop)',
    btnPause: 'పాజ్ చేయి (Pause)',
    btnResume: 'కొనసాగించు (Resume)',
    btnReturnBase: 'బేస్ కు తిరిగి వెళ్ళు (Return to Base)',
    btnManualTesting: 'టెస్టింగ్ మోడ్ ఆన్/ఆఫ్',
    manualForward: 'ముందుకు (Forward ⬆️)',
    manualBackward: 'వెనుకకు (Backward ⬇️)',
    manualLeft: 'ఎడమవైపు (Left ⬅️)',
    manualRight: 'కుడివైపు (Right ➡️)',
    manualRotate: 'చుట్టూ తిరుగు (Rotate)',
    compartmentControl: 'సెక్యూర్ మెడిసిన్ కంపార్ట్‌మెంట్',
    compartmentLocked: 'లాక్ చేయబడింది',
    compartmentUnlocked: 'అన్‌లాక్ చేయబడింది',
    unlockHatch: 'కంపార్ట్‌మెంట్ తెరవండి',
    lockHatch: 'కంపార్ట్‌మెంట్ లాక్ చేయండి',

    voiceCommandTitle: 'తెలుగు వాయిస్ అసిస్టెంట్ (Voice Assistant)',
    voiceStepCommand: 'వాయిస్ కమాండ్ (Voice Command)',
    voiceStepRecognized: 'గుర్తించిన మాటలు (Recognized Text)',
    voiceStepAction: 'తీసుకున్న చర్య (Action)',
    listeningNow: 'వినబడుతోంది... తెలుగు లేదా ఇంగ్లీషులో స్పష్టంగా మాట్లాడండి',
    pressToSpeak: 'మైక్రోఫోన్ నొక్కి మాట్లాడండి',
    trySpeaking: 'లేదా వెంటనే పరీక్షించడానికి ఈ కమాండ్‌పై క్లిక్ చేయండి:',
    sampleCommands: [
      'రోగికి మందులు Room 101 కి పంపించు',
      'రోబోట్ స్టేటస్ చెప్పు',
      'రోబోట్ ఎక్కడ ఉంది?',
      'బేస్ స్టేషన్‌కు తిరిగి వెళ్ళు',
      'ఎమర్జెన్సీ స్టాప్'
    ],
    noVoiceRecognized: 'మాటలు గుర్తించబడలేదు. దయచేసి మళ్లీ మాట్లాడండి లేదా కింద ఉన్న బటన్‌ను నొక్కండి.',
    voiceActionDispatched: 'కమాండ్ విజయవంతంగా గ్రహించబడింది మరియు అమలు చేయబడుతోంది.',

    emergencyStopActivated: 'ఎమర్జెన్సీ స్టాప్ యాక్టివేట్ చేయబడింది (Emergency Stop Activated)',
    emergencyStopDesc: 'రోబోట్ యొక్క అన్ని మోటార్లు తక్షణమే ఆపబడ్డాయి. భద్రతా తనిఖీ తర్వాత మాత్రమే కొనసాగించండి.',
    resumeRobot: 'ఎమర్జెన్సీని తొలగించి రోబోట్‌ను పునఃప్రారంభించండి',
    warningLowBattery: 'హెచ్చరిక: బ్యాటరీ తక్కువగా ఉంది (< 20%). రోబోట్ బేస్‌కు తిరిగి వస్తోంది.',
    warningHighTemp: 'హెచ్చరిక: మందుల కంపార్ట్‌మెంట్‌లో ఉష్ణోగ్రత పరిమితి దాటింది!',
    warningObstacle: 'రోబోట్ ముందు మార్గంలో అడ్డంకి గుర్తించబడింది (< 30 సెం.మీ).',
    warningCommsFail: 'ESP32 నెట్‌వర్క్ కనెక్షన్ లోపం లేదా ఆలస్యం గుర్తించబడింది.',
    warningDeliveryFail: 'డెలివరీ సమయం ముగిసింది: రిసీవర్ పిన్ ఇంకా నమోదు చేయలేదు.',

    historyTitle: 'ఔషధ డెలివరీ రికార్డులు & ఆడిట్',
    historySubtitle: 'ఆసుపత్రిలో జరిగిన అన్ని రోబోటిక్ డెలివరీల పూర్తి వివరాలు.',
    searchPlaceholder: 'మందు పేరు, రూమ్ నంబర్, లేదా ID తో వెతకండి...',
    filterAll: 'అన్ని డెలివరీలు',
    colDeliveryId: 'డెలివరీ ID',
    colMedicine: 'మందు & పరిమాణం',
    colDestination: 'గమ్యం (Room)',
    colPriority: 'ప్రాధాన్యత',
    colDateTime: 'తేదీ & సమయం',
    colStatus: 'స్థితి (Status)',
    colActions: 'రసీదు',
    receiptTitle: 'అధికారిక ఆసుపత్రి డెలివరీ రసీదు',
    exportCsv: 'CSV డౌన్‌లోడ్',

    aiAssistantTitle: 'మెడిబోట్ AI అసిస్టెంట్',
    aiWelcome: 'నమస్కారం! నేను మెడిబోట్ AI సహాయకుడిని. రోబోట్ ఉన్న ప్రదేశం, బ్యాటరీ స్థితి, డెలివరీ పురోగతి మరియు వాయిస్ ఆదేశాలలో మీకు సహాయం చేయగలను.',
    aiInputPlaceholder: 'తెలుగు లేదా ఇంగ్లీషులో అడగండి... (ఉదా: "రోబోట్ ఎక్కడ ఉంది?")',
    aiSuggestedQuestions: [
      'రోబోట్ ప్రస్తుతం ఎక్కడ ఉంది?',
      'బ్యాటరీ ఎంత శాతం ఉంది?',
      'ప్రస్తుత డెలివరీ స్థితి ఏమిటి?',
      'అడ్డంకి సెన్సార్ ఎలా పనిచేస్తుంది?'
    ],
    aiDisclaimer: 'భద్రతా నియమం: మెడిబోట్ కేవలం మందుల రవాణాకు మాత్రమే. వైద్య సలహాలు లేదా డోసేజ్ సిఫార్సులు చేయదు.',

    hardwareTitle: 'ESP32 & ఆర్డుయినో హార్డ్‌వేర్ ఆర్కిటెక్చర్',
    hardwareSubtitle: 'సెన్సార్లు, మోటార్ డ్రైవర్ పిన్‌ఔట్ మరియు లైవ్ టెలిమెట్రీ డేటా.',
    esp32Pinout: 'మైక్రోకంట్రోలర్ పిన్ కనెక్షన్ల వివరణ',
    telemetryStream: 'లైవ్ సీరియల్ టెలిమెట్రీ స్ట్రీమ్ (JSON 115200 Baud)',
    connectPhysicalRobot: 'నిజమైన రోబోట్ హార్డ్‌వేర్‌కు కనెక్ట్ చేయండి',
  },

  // 3. Hindi (हिन्दी)
  hi: {
    appTitle: 'मेडीबॉट (MediBot)',
    appSubtitle: 'इमरजेंसी मेडिसिन डिलीवरी रोबोट',
    campusTag: 'भारतीय अस्पताल एवं कॉलेज परिसर रोबोटिक्स',
    systemOnline: 'ऑनलाइन',
    systemOffline: 'ऑफलाइन',
    simulatedMode: 'सिमुलेशन सक्रिय',
    voiceAssistant: 'वॉयस असिस्टेंट',
    speakerOn: 'ऑडियो चालू',
    speakerMuted: 'म्यूट',
    emergencyStop: 'आपातकालीन रोक (EMERGENCY STOP)',
    resetEStop: 'सिस्टम पुनः चालू करें',

    navDashboard: 'डैशबोर्ड',
    navLiveTracking: 'लाइव ट्रैकिंग',
    navNewDelivery: 'नई डिलीवरी',
    navControls: 'रोबोट नियंत्रण',
    navHistory: 'डिलीवरी इतिहास',
    navHardware: 'हार्डवेयर ब्रिज',
    navAIAssistant: 'मेडीबॉट AI',

    robotStatus: 'रोबोट स्थिति',
    batteryLevel: 'बैटरी स्तर',
    currentLocation: 'वर्तमान स्थान',
    destination: 'गंतव्य',
    deliveryStatus: 'डिलीवरी स्थिति',
    temperatures: 'तापमान',
    obstacleStatus: 'बाधा संवेदक (Obstacle Sensor)',
    connectionStatus: 'ESP32 वाई-फाई सिग्नल',
    emergencyAlertStatus: 'आपातकालीन चेतावनी',
    coldChainTemp: 'दवा कक्ष तापमान',
    chassisTemp: 'चेसिस तापमान',
    radarClear: 'रास्ता साफ है (> 100 सेमी)',
    obstacleWarning: 'सावधान: बाधा निकट है (< 50 सेमी)',
    obstacleDetected: 'बाधा का पता चला! रोबोट रुक गया',
    estimatedArrival: 'पहुंचने का समय',
    distanceRemaining: 'शेष दूरी',

    statusIdle: 'बेस स्टेशन पर उपलब्ध',
    statusLoading: 'दवाएं लोड हो रही हैं',
    statusEnRoute: 'गंतव्य की ओर अग्रसर',
    statusArrived: 'कमरे पर पहुंच गया',
    statusDispensing: 'कंपार्टमेंट अनलॉक हुआ',
    statusComplete: 'दवा सफलतापूर्वक पहुंचाई गई',
    statusReturning: 'बेस स्टेशन पर वापस आ रहा है',
    statusDocked: 'चार्जिंग डॉक पर है',
    statusEmergency: 'आपातकालीन रोक सक्रिय',
    statusObstaclePaused: 'बाधा के कारण रुका हुआ',

    newDeliveryTitle: 'आपातकालीन दवा प्रेषण',
    newDeliveryDesc: 'मेडीबॉट को स्वायत्त रूप से भेजने के लिए विवरण भरें।',
    medicineName: 'दवा / सामग्री का नाम',
    medicinePlaceholder: 'उदा. एड्रेनालाईन, इंसुलिन, पैरासिटामोल',
    quantity: 'मात्रा और इकाई',
    pickupLocation: 'पिकअप स्थान',
    destinationRoom: 'गंतव्य कमरा / वार्ड संख्या',
    priorityLevel: 'प्राथमिकता',
    priorityNormal: 'सामान्य (Normal)',
    priorityUrgent: 'अति आवश्यक (Urgent)',
    priorityCritical: 'गंभीर (Critical / Code Blue)',
    receiverName: 'प्राप्तकर्ता / नर्स का नाम',
    receiverPlaceholder: 'उदा. डॉ. शर्मा / स्टाफ नर्स आईसीयू',
    securityPin: '4-अंकीय सुरक्षा पिन',
    sendRobot: 'रोबोट भेजें (Send Robot)',
    confirmDelivery: 'डिलीवरी की पुष्टि करें',
    cancel: 'रद्द करें',
    quickMedicinePicks: 'त्वरित आपातकालीन दवाएं',
    safetyNotice: 'सूचना: मेडीबॉट केवल दवा परिवहन के लिए है। यह दवाओं या खुराक की सिफारिश नहीं करता है।',
    deliveryStartedConfirmation: 'दवा वितरण शुरू हो गया है। मेडीबॉट {dest} की ओर जा रहा है।',

    floorPlanTitle: 'अस्पताल नक्शा एवं लाइव रोबोट ट्रैकिंग',
    baseStation: 'सेंट्रल फार्मेसी बेस डॉक',
    simulateObstacle: 'गलियारे में बाधा उत्पन्न करें',
    clearObstacle: 'बाधा हटाएं और आगे बढ़ें',
    recalculatingRoute: 'नया मार्ग खोज रहा है...',
    pathRoute: 'बेस स्टेशन → रोबोट → गंतव्य',
    speed: 'गति',

    robotControlsTitle: 'रोबोट नियंत्रण एवं परीक्षण मोड',
    autonomousOperations: 'स्वायत्त मिशन नियंत्रण',
    testingModeLabel: 'परीक्षण मोड (Testing Mode)',
    testingModeDesc: 'मोटर और सेंसर परीक्षण के लिए मैनुअल नियंत्रण।',
    btnStart: 'शुरू करें (Start)',
    btnStop: 'रोकें (Stop)',
    btnPause: 'विराम (Pause)',
    btnResume: 'पुनः शुरू (Resume)',
    btnReturnBase: 'बेस पर लौटें (Return to Base)',
    btnManualTesting: 'परीक्षण मोड चालू/बंद',
    manualForward: 'आगे (Forward ⬆️)',
    manualBackward: 'पीछे (Backward ⬇️)',
    manualLeft: 'बाएं (Left ⬅️)',
    manualRight: 'दाएं (Right ➡️)',
    manualRotate: 'घूमें (Rotate)',
    compartmentControl: 'सुरक्षित दवा कम्पार्टमेंट',
    compartmentLocked: 'लॉक',
    compartmentUnlocked: 'अनलॉक',
    unlockHatch: 'कम्पार्टमेंट खोलें',
    lockHatch: 'कम्पार्टमेंट बंद करें',

    voiceCommandTitle: 'भारतीय बहुभाषी वॉयस असिस्टेंट',
    voiceStepCommand: 'आवाज आदेश (Voice Command)',
    voiceStepRecognized: 'पहचाना गया पाठ (Recognized Text)',
    voiceStepAction: 'की गई कार्रवाई (Action)',
    listeningNow: 'सुन रहा हूं... हिंदी या अंग्रेजी में अपना आदेश बोलें',
    pressToSpeak: 'माइक दबाएं और बोलें',
    trySpeaking: 'या तुरंत परीक्षण के लिए क्लिक करें:',
    sampleCommands: [
      'कमरा 101 में दवा भेजो',
      'रोबोट की स्थिति बताओ',
      'रोबोट कहां है?',
      'बेस स्टेशन पर वापस जाओ',
      'इमरजेंसी स्टॉप'
    ],
    noVoiceRecognized: 'आवाज पहचानी नहीं गई। कृपया पुनः प्रयास करें।',
    voiceActionDispatched: 'कमांड को सफलतापूर्वक निष्पादित किया गया।',

    emergencyStopActivated: 'आपातकालीन रोक सक्रिय (Emergency Stop Activated)',
    emergencyStopDesc: 'सभी मोटर तुरंत बंद कर दिए गए हैं। सुरक्षा जांच के बाद ही आगे बढ़ें।',
    resumeRobot: 'आपातकाल हटाकर पुनः आरंभ करें',
    warningLowBattery: 'चेतावनी: बैटरी कम है (< 20%)। रोबोट बेस पर लौट रहा है।',
    warningHighTemp: 'चेतावनी: दवा कम्पार्टमेंट का तापमान बढ़ गया है!',
    warningObstacle: 'रोबोट के सामने बाधा पाई गई है (< 30 सेमी)।',
    warningCommsFail: 'ESP32 वायरलेस सिग्नल में रुकावट आई है।',
    warningDeliveryFail: 'डिलीवरी समय समाप्त: पिन दर्ज नहीं किया गया।',

    historyTitle: 'अस्पताल वितरण लेखा-जोखा',
    historySubtitle: 'सभी आपातकालीन दवा यात्राओं का रिकॉर्ड।',
    searchPlaceholder: 'दवा, कमरे, प्राप्तकर्ता या आईडी से खोजें...',
    filterAll: 'सभी रिकॉर्ड',
    colDeliveryId: 'डिलीवरी आईडी',
    colMedicine: 'दवा एवं मात्रा',
    colDestination: 'गंतव्य',
    colPriority: 'प्राथमिकता',
    colDateTime: 'दिनांक एवं समय',
    colStatus: 'स्थिति',
    colActions: 'रसीद',
    receiptTitle: 'अस्पताल वितरण आधिकारिक रसीद',
    exportCsv: 'CSV निर्यात करें',

    aiAssistantTitle: 'मेडीबॉट AI सहायक',
    aiWelcome: 'नमस्ते! मैं मेडीबॉट AI सहायक हूं। मैं रोबोट का स्थान, बैटरी स्तर और वितरण में सहायता कर सकता हूं।',
    aiInputPlaceholder: 'हिंदी या अंग्रेजी में पूछें... (उदा. "रोबोट कहां है?")',
    aiSuggestedQuestions: [
      'रोबोट इस समय कहां है?',
      'वर्तमान बैटरी प्रतिशत कितना है?',
      'चालू डिलीवरी की स्थिति क्या है?',
      'अड़चन बचाव कैसे कार्य करता है?'
    ],
    aiDisclaimer: 'सुरक्षा नियम: मेडीबॉट केवल पूर्व-निर्धारित दवाओं का परिवहन करता है और चिकित्सा परामर्श नहीं देता है।',

    hardwareTitle: 'ESP32 और आर्डुइनो हार्डवेयर संरचना',
    hardwareSubtitle: 'सेंसर पिनआउट और लाइव टेलीमेट्री डेटा।',
    esp32Pinout: 'माइक्रोकंट्रोलर पिन कनेक्शन विवरण',
    telemetryStream: 'लाइव सीरियल टेलीमेट्री (JSON 115200 Baud)',
    connectPhysicalRobot: 'भौतिक रोबोट हार्डवेयर से कनेक्ट करें',
  },

  // 4. Tamil (தமிழ்)
  ta: {
    appTitle: 'மெடிபாட் (MediBot)',
    appSubtitle: 'அவசர மருந்து விநியோக ரோபோ',
    campusTag: 'இந்திய மருத்துவமனைகள் & கல்லூரி வளாக ரோபோடிக்ஸ்',
    systemOnline: 'ஆன்லைன்',
    systemOffline: 'ஆஃப்லைன்',
    simulatedMode: 'சிமுலேஷன் இயங்குகிறது',
    voiceAssistant: 'குரல் கட்டளை',
    speakerOn: 'ஆடியோ இயக்கப்பட்டது',
    speakerMuted: 'ஒலி முடக்கப்பட்டது',
    emergencyStop: 'அவசர நிறுத்தம் (EMERGENCY STOP)',
    resetEStop: 'மீண்டும் இயக்கு',

    navDashboard: 'டாஷ்போர்டு',
    navLiveTracking: 'நேரலை கண்காணிப்பு',
    navNewDelivery: 'புதிய டெலிவரி',
    navControls: 'ரோபோ கட்டுப்பாடுகள்',
    navHistory: 'டெலிவரி வரலாறு',
    navHardware: 'ஹார்டுவேர் இணைப்பு',
    navAIAssistant: 'மெடிபாட் AI',

    robotStatus: 'ரோபோ நிலை',
    batteryLevel: 'பேட்டரி அளவு',
    currentLocation: 'தற்போதைய இடம்',
    destination: 'சேருமிடம்',
    deliveryStatus: 'விநியோக நிலை',
    temperatures: 'வெப்பநிலை',
    obstacleStatus: 'தடை கண்டறிதல் சென்சார்',
    connectionStatus: 'ESP32 வைஃபை சிக்னல்',
    emergencyAlertStatus: 'அவசர எச்சரிக்கை',
    coldChainTemp: 'மருந்து பெட்டி வெப்பநிலை',
    chassisTemp: 'ரோபோ உடல் வெப்பநிலை',
    radarClear: 'பாதை தெளிவாக உள்ளது (> 100செ.மீ)',
    obstacleWarning: 'எச்சரிக்கை: தடை அருகில் உள்ளது (< 50செ.மீ)',
    obstacleDetected: 'தடை கண்டறியப்பட்டது! ரோபோ நின்றது',
    estimatedArrival: 'வந்துசேரும் நேரம்',
    distanceRemaining: 'மீதமுள்ள தூரம்',

    statusIdle: 'நிலையத்தில் தயார்',
    statusLoading: 'மருந்துகள் ஏற்றப்படுகின்றன',
    statusEnRoute: 'நோக்கி செல்கிறது',
    statusArrived: 'அறைக்கு வந்துவிட்டது',
    statusDispensing: 'பெட்டி திறக்கப்பட்டது',
    statusComplete: 'விநியோகம் முடிந்தது',
    statusReturning: 'நிலையம் திரும்புகிறது',
    statusDocked: 'சார்ஜ் ஆகிறது',
    statusEmergency: 'அவசர நிறுத்தம் செய்யப்பட்டுள்ளது',
    statusObstaclePaused: 'தடையால் தாமதம்',

    newDeliveryTitle: 'அவசர மருந்து அனுப்புதல்',
    newDeliveryDesc: 'ரோபோவை அனுப்ப தேவையான விவரங்களை உள்ளிடவும்.',
    medicineName: 'மருந்தின் பெயர்',
    medicinePlaceholder: 'எ.கா. அட்ரினலின், இன்சுலின்',
    quantity: 'அளவு & அலகுகள்',
    pickupLocation: 'எடுக்கும் இடம்',
    destinationRoom: 'சேருமிடம் / அறை எண்',
    priorityLevel: 'முன்னுரிமை',
    priorityNormal: 'சாதாரண (Normal)',
    priorityUrgent: 'அவசரம் (Urgent)',
    priorityCritical: 'அதி அவசரம் (Critical / Code Blue)',
    receiverName: 'பெறுநர் / செவிலியர் பெயர்',
    receiverPlaceholder: 'எ.கா. டாக்டர் பிரியா / செவிலியர்',
    securityPin: '4-இலக்க பாதுகாப்பு பின்',
    sendRobot: 'ரோபோவை அனுப்பு (Send Robot)',
    confirmDelivery: 'உறுதி செய்',
    cancel: 'ரத்து செய்',
    quickMedicinePicks: 'அவசர மருந்துகள் பட்டியல்',
    safetyNotice: 'குறிப்பு: மெடிபாட் மருந்துகளை கொண்டு செல்ல மட்டுமே. மருந்துகளை பரிந்துரைக்காது.',
    deliveryStartedConfirmation: 'மருந்து விநியோகம் தொடங்கியது. மெடிபாட் {dest} நோக்கி செல்கிறது.',

    floorPlanTitle: 'மருத்துவமனை வரைபடம் & நேரலை கண்காணிப்பு',
    baseStation: 'மைய மருந்தக தளம்',
    simulateObstacle: 'பாதையில் தடையை உருவாக்கு',
    clearObstacle: 'தடையை நீக்கு',
    recalculatingRoute: 'மாற்றுப் பாதையை கணக்கிடுகிறது...',
    pathRoute: 'நிலையம் → ரோபோ → சேருமிடம்',
    speed: 'வேகம்',

    robotControlsTitle: 'ரோபோ கட்டுப்பாடுகள் & சோதனை முறை',
    autonomousOperations: 'தானியங்கி செயல்பாடு',
    testingModeLabel: 'சோதனை முறை (Testing Mode)',
    testingModeDesc: 'மோட்டார் சோதனைக்கான கைமுறை கட்டுப்பாடுகள்.',
    btnStart: 'தொடங்கு (Start)',
    btnStop: 'நிறுத்து (Stop)',
    btnPause: 'இடைநிறுத்து (Pause)',
    btnResume: 'தொடர் (Resume)',
    btnReturnBase: 'நிலையம் திரும்பு (Return to Base)',
    btnManualTesting: 'சோதனை முறை ஆன்/ஆஃப்',
    manualForward: 'முன்னோக்கி ⬆️',
    manualBackward: 'பின்னோக்கி ⬇️',
    manualLeft: 'இடது ⬅️',
    manualRight: 'வலது ➡️',
    manualRotate: 'சுழலு',
    compartmentControl: 'மருந்து பாதுகாப்பு பெட்டி',
    compartmentLocked: 'பூட்டப்பட்டது',
    compartmentUnlocked: 'திறக்கப்பட்டது',
    unlockHatch: 'பெட்டியை திற',
    lockHatch: 'பெட்டியை பூட்டு',

    voiceCommandTitle: 'குரல் உதவியாளர் (Voice Assistant)',
    voiceStepCommand: 'குரல் கட்டளை (Voice Command)',
    voiceStepRecognized: 'அறியப்பட்ட உரை (Recognized Text)',
    voiceStepAction: 'செயல்பாடு (Action)',
    listeningNow: 'கேட்கிறது... தமிழில் அல்லது ஆங்கிலத்தில் பேசுங்கள்',
    pressToSpeak: 'மைக்கை அழுத்தி பேசுங்கள்',
    trySpeaking: 'அல்லது உடனடி சோதனைக்கு கிளிக் செய்யவும்:',
    sampleCommands: [
      'அறை 101 க்கு மருந்து அனுப்பு',
      'ரோபோ எங்கே இருக்கிறது?',
      'ரோபோ நிலை சொல்',
      'நிலையம் திரும்பு',
      'அவசர நிறுத்தம்'
    ],
    noVoiceRecognized: 'குரல் கண்டறியப்படவில்லை. மீண்டும் முயற்சிக்கவும்.',
    voiceActionDispatched: 'கட்டளை வெற்றிகரமாக நிறைவேற்றப்பட்டது.',

    emergencyStopActivated: 'அவசர நிறுத்தம் இயக்கப்பட்டது (Emergency Stop Activated)',
    emergencyStopDesc: 'அனைத்து மோட்டார்களும் உடனே நிறுத்தப்பட்டன.',
    resumeRobot: 'மீண்டும் இயக்குக',
    warningLowBattery: 'எச்சரிக்கை: பேட்டரி குறைவு (< 20%). ரோபோ திரும்புகிறது.',
    warningHighTemp: 'எச்சரிக்கை: மருந்து பெட்டி வெப்பநிலை அதிகரித்துள்ளது!',
    warningObstacle: 'முன்னால் தடை உள்ளது (< 30செ.மீ).',
    warningCommsFail: 'ESP32 சிக்னல் குறைவு கண்டறியப்பட்டது.',
    warningDeliveryFail: 'நேரம் முடிந்தது: பாதுகாப்பு பின் உள்ளிடப்படவில்லை.',

    historyTitle: 'மருந்து விநியோக பதிவுகள்',
    historySubtitle: 'அனைத்து அவசர விநியோகங்களின் முழு விவரங்கள்.',
    searchPlaceholder: 'மருந்து, அறை, நபர் அல்லது ஐடி மூலம் தேடுங்கள்...',
    filterAll: 'அனைத்து பதிவுகள்',
    colDeliveryId: 'டெலிவரி ஐடி',
    colMedicine: 'மருந்து & அளவு',
    colDestination: 'சேருமிடம்',
    colPriority: 'முன்னுரிமை',
    colDateTime: 'தேதி & நேரம்',
    colStatus: 'நிலை',
    colActions: 'ரசீது',
    receiptTitle: 'மருத்துவமனை விநியோக ரசீது',
    exportCsv: 'CSV பதிவிறக்கம்',

    aiAssistantTitle: 'மெடிபாட் AI உதவியாளர்',
    aiWelcome: 'வணக்கம்! நான் மெடிபாட் AI உதவியாளர். ரோபோ இருப்பிடம் மற்றும் விநியோக தகவல்களில் உதவ முடியும்.',
    aiInputPlaceholder: 'தமிழில் அல்லது ஆங்கிலத்தில் கேளுங்கள்...',
    aiSuggestedQuestions: [
      'ரோபோ இப்போது எங்கே உள்ளது?',
      'பேட்டரி சதவீதம் எவ்வளவு?',
      'தற்போதைய விநியோக நிலை என்ன?',
      'தடை சென்சார் எப்படி வேலை செய்கிறது?'
    ],
    aiDisclaimer: 'பாதுகாப்பு விதி: மெடிபாட் மருந்துகளை மட்டுமே கொண்டு செல்லும். மருத்துவ ஆலோசனை வழங்காது.',

    hardwareTitle: 'ESP32 & ஆர்டுயினோ கட்டமைப்பு',
    hardwareSubtitle: 'சென்சார் மற்றும் மோட்டார் விவரங்கள்.',
    esp32Pinout: 'மைக்ரோகண்ட்ரோலர் பின் இணைப்புகள்',
    telemetryStream: 'நேரலை டெலிமெட்ரி ஸ்ட்ரீம் (JSON 115200 Baud)',
    connectPhysicalRobot: 'ரோபோ ஹார்டுவேருடன் இணைக்கவும்',
  },

  // 5. Kannada (ಕನ್ನಡ)
  kn: {
    appTitle: 'ಮೆಡಿಬಾಟ್ (MediBot)',
    appSubtitle: 'ತುರ್ತು ಔಷಧಿ ವಿತರಣಾ ರೋಬೋಟ್',
    campusTag: 'ಭಾರತೀಯ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಕ್ಯಾಂಪಸ್ ವ್ಯವಸ್ಥೆ',
    systemOnline: 'ಆನ್‌ಲೈನ್',
    systemOffline: 'ಆಫ್‌ಲೈನ್',
    simulatedMode: 'ಸಿಮ್ಯುಲೇಶನ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    voiceAssistant: 'ಧ್ವನಿ ನಿಯಂತ್ರಣ',
    speakerOn: 'ಧ್ವನಿ ಸಕ್ರಿಯ',
    speakerMuted: 'ಮ್ಯೂಟ್',
    emergencyStop: 'ತುರ್ತು ನಿಲುಗಡೆ (EMERGENCY STOP)',
    resetEStop: 'ಪುನರಾರಂಭಿಸಿ',

    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navLiveTracking: 'ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    navNewDelivery: 'ಹೊಸ ವಿತರಣೆ',
    navControls: 'ರೋಬೋಟ್ ನಿಯಂತ್ರಣ',
    navHistory: 'ವಿತರಣಾ ಇತಿಹಾಸ',
    navHardware: 'ಹಾರ್ಡ್‌ವೇರ್ ಬ್ರಿಡ್ಜ್',
    navAIAssistant: 'ಮೆಡಿಬಾಟ್ AI',

    robotStatus: 'ರೋಬೋಟ್ ಸ್ಥಿತಿ',
    batteryLevel: 'ಬ್ಯಾಟರಿ ಮಟ್ಟ',
    currentLocation: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ',
    destination: 'ತಲುಪಬೇಕಾದ ಸ್ಥಳ',
    deliveryStatus: 'ವಿತರಣಾ ಸ್ಥಿತಿ',
    temperatures: 'ತಾಪಮಾನ',
    obstacleStatus: 'ಅಡೆತಡೆ ಸಂವೇದಕ',
    connectionStatus: 'ESP32 ವೈ-ಫೈ ಸಿಗ್ನಲ್',
    emergencyAlertStatus: 'ತುರ್ತು ಎಚ್ಚರಿಕೆ',
    coldChainTemp: 'ಔಷಧಿ ಪೆಟ್ಟಿಗೆ ತಾಪಮಾನ',
    chassisTemp: 'ಚಾಸಿಸ್ ತಾಪಮಾನ',
    radarClear: 'ಮಾರ್ಗ ಸ್ವಚ್ಛವಾಗಿದೆ (> 100cm)',
    obstacleWarning: 'ಎಚ್ಚರಿಕೆ: ಅಡೆತಡೆ ಹತ್ತಿರದಲ್ಲಿದೆ (< 50cm)',
    obstacleDetected: 'ಅಡೆತಡೆ ಪತ್ತೆಯಾಗಿದೆ! ರೋಬೋಟ್ ನಿಂತಿದೆ',
    estimatedArrival: 'ತಲುಪುವ ಸಮಯ',
    distanceRemaining: 'ಉಳಿದಿರುವ ದೂರ',

    statusIdle: 'ನಿಲ್ದಾಣದಲ್ಲಿ ಸಿದ್ಧವಾಗಿದೆ',
    statusLoading: 'ಔಷಧಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ',
    statusEnRoute: 'ಗಮ್ಯಸ್ಥಾನಕ್ಕೆ ಹೊರಟಿದೆ',
    statusArrived: 'ಕೋಣೆಗೆ ತಲುಪಿದೆ',
    statusDispensing: 'ಪೆಟ್ಟಿಗೆ ಅನ್‌ಲಾಕ್ ಆಗಿದೆ',
    statusComplete: 'ವಿತರಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
    statusReturning: 'ನಿಲ್ದಾಣಕ್ಕೆ ಮರಳುತ್ತಿದೆ',
    statusDocked: 'ಚಾರ್ಜಿಂಗ್ ಡಾಕ್‌ನಲ್ಲಿದೆ',
    statusEmergency: 'ತುರ್ತು ನಿಲುಗಡೆ ಸಕ್ರಿಯವಾಗಿದೆ',
    statusObstaclePaused: 'ಅಡೆತಡೆಯಿಂದಾಗಿ ನಿಂತಿದೆ',

    newDeliveryTitle: 'ತುರ್ತು ಔಷಧಿ ರವಾನೆ',
    newDeliveryDesc: 'ರೋಬೋಟ್ ಕಳುಹಿಸಲು ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ.',
    medicineName: 'ಔಷಧಿ ಹೆಸರು',
    medicinePlaceholder: 'ಉದಾ: ಅಡ್ರಿನಾಲಿನ್, ಇನ್ಸುಲಿನ್',
    quantity: 'ಪ್ರಮಾಣ ಮತ್ತು ಘಟಕಗಳು',
    pickupLocation: 'ಪಡೆಯುವ ಸ್ಥಳ',
    destinationRoom: 'ತಲುಪಬೇಕಾದ ಕೋಣೆ / ವಾರ್ಡ್ ಸಂಖ್ಯೆ',
    priorityLevel: 'ಆದ್ಯತೆ',
    priorityNormal: 'ಸಾಮಾನ್ಯ (Normal)',
    priorityUrgent: 'ತುರ್ತು (Urgent)',
    priorityCritical: 'ಅತ್ಯಂತ ತುರ್ತು (Critical)',
    receiverName: 'ಸ್ವೀಕರಿಸುವವರ ಹೆಸರು',
    receiverPlaceholder: 'ಉದಾ: ಡಾ. ರಮೇಶ್ / ನರ್ಸ್',
    securityPin: '4-ಅಂಕಿಯ ಪಿನ್',
    sendRobot: 'ರೋಬೋಟ್ ಕಳುಹಿಸಿ (Send Robot)',
    confirmDelivery: 'ಖಚಿತಪಡಿಸಿ',
    cancel: 'ರದ್ದುಮಾಡಿ',
    quickMedicinePicks: 'ತ್ವರಿತ ತುರ್ತು ಔಷಧಿಗಳು',
    safetyNotice: 'ಸೂಚನೆ: ಮೆಡಿಬಾಟ್ ಔಷಧಿ ಸಾಗಣೆಗೆ ಮಾತ್ರ. ಔಷಧಿ ಅಥವಾ ಪ್ರಮಾಣವನ್ನು ಶಿಫಾರಸು ಮಾಡುವುದಿಲ್ಲ.',
    deliveryStartedConfirmation: 'ಔಷಧಿ ವಿತರಣೆ ಪ್ರಾರಂಭವಾಗಿದೆ. ಮೆಡಿಬಾಟ್ {dest} ಕಡೆಗೆ ಚಲಿಸುತ್ತಿದೆ.',

    floorPlanTitle: 'ಆಸ್ಪತ್ರೆ ನಕ್ಷೆ ಮತ್ತು ಲೈವ್ ಟ್ರ್ಯಾಕಿಂಗ್',
    baseStation: 'ಸೆಂಟ್ರಲ್ ಫಾರ್ಮಸಿ ಬೇಸ್ ಡಾಕ್',
    simulateObstacle: 'ಅಡೆತಡೆ ಸೃಷ್ಟಿಸಿ',
    clearObstacle: 'ಅಡೆತಡೆ ತೆರವುಗೊಳಿಸಿ',
    recalculatingRoute: 'ಹೊಸ ಮಾರ್ಗ ಹುಡುಕುತ್ತಿದೆ...',
    pathRoute: 'ಬೇಸ್ → ರೋಬೋಟ್ → ಗಮ್ಯಸ್ಥಾನ',
    speed: 'ವೇಗ',

    robotControlsTitle: 'ರೋಬೋಟ್ ನಿಯಂತ್ರಣಗಳು ಮತ್ತು ಪರೀಕ್ಷಾ ಮೋಡ್',
    autonomousOperations: 'ಸ್ವಾಯತ್ತ ಕಾರ್ಯಾಚರಣೆ',
    testingModeLabel: 'ಪರೀಕ್ಷಾ ಮೋಡ್ (Testing Mode)',
    testingModeDesc: 'ಮೋಟಾರ್ ಪರೀಕ್ಷೆಗಾಗಿ ಮ್ಯಾನುಯಲ್ ನಿಯಂತ್ರಣಗಳು.',
    btnStart: 'ಪ್ರಾರಂಭಿಸಿ (Start)',
    btnStop: 'ನಿಲ್ಲಿಸಿ (Stop)',
    btnPause: 'ವಿರಾಮ (Pause)',
    btnResume: 'ಮುಂದುವರಿಸಿ (Resume)',
    btnReturnBase: 'ಬೇಸ್‌ಗೆ ಮರಳಿ (Return to Base)',
    btnManualTesting: 'ಪರೀಕ್ಷಾ ಮೋಡ್ ಆನ್/ಆಫ್',
    manualForward: 'ಮುಂದೆ ⬆️',
    manualBackward: 'ಹಿಂದೆ ⬇️',
    manualLeft: 'ಎಡ ⬅️',
    manualRight: 'ಬಲ ➡️',
    manualRotate: 'ತಿರುಗಿ',
    compartmentControl: 'ಔಷಧಿ ಪೆಟ್ಟಿಗೆ ನಿಯಂತ್ರಣ',
    compartmentLocked: 'ಲಾಕ್ ಆಗಿದೆ',
    compartmentUnlocked: 'ಅನ್‌ಲಾಕ್ ಆಗಿದೆ',
    unlockHatch: 'ಪೆಟ್ಟಿಗೆ ತೆರೆಯಿರಿ',
    lockHatch: 'ಪೆಟ್ಟಿಗೆ ಲಾಕ್ ಮಾಡಿ',

    voiceCommandTitle: 'ಧ್ವನಿ ಸಹಾಯಕ (Voice Assistant)',
    voiceStepCommand: 'ಧ್ವನಿ ಆದೇಶ (Voice Command)',
    voiceStepRecognized: 'ಗುರುತಿಸಲಾದ ಪಠ್ಯ (Recognized Text)',
    voiceStepAction: 'ಕ್ರಮ (Action)',
    listeningNow: 'ಕೇಳುತ್ತಿದೆ... ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ',
    pressToSpeak: 'ಮೈಕ್ ಒತ್ತಿ ಮಾತನಾಡಿ',
    trySpeaking: 'ಅಥವಾ ತಕ್ಷಣ ಪರೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ:',
    sampleCommands: [
      'ಕೋಣೆ 101 ಕ್ಕೆ ಔಷಧಿ ಕಳುಹಿಸಿ',
      'ರೋಬೋಟ್ ಎಲ್ಲಿದೆ?',
      'ರೋಬೋಟ್ ಸ್ಥಿತಿ ತಿಳಿಸಿ',
      'ಬೇಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಮರಳಿ',
      'ಎಮರ್ಜೆನ್ಸಿ ಸ್ಟಾಪ್'
    ],
    noVoiceRecognized: 'ಧ್ವನಿ ಗುರುತಿಸಲಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.',
    voiceActionDispatched: 'ಆದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಜಾರಿಯಾಗಿದೆ.',

    emergencyStopActivated: 'ತುರ್ತು ನಿಲುಗಡೆ ಸಕ್ರಿಯಗೊಂಡಿದೆ (Emergency Stop Activated)',
    emergencyStopDesc: 'ಎಲ್ಲಾ ಮೋಟಾರ್‌ಗಳು ತಕ್ಷಣ ನಿಂತಿವೆ.',
    resumeRobot: 'ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ',
    warningLowBattery: 'ಎಚ್ಚರಿಕೆ: ಬ್ಯಾಟರಿ ಕಡಿಮೆಯಾಗಿದೆ (< 20%). ರೋಬೋಟ್ ಮರಳುತ್ತಿದೆ.',
    warningHighTemp: 'ಎಚ್ಚರಿಕೆ: ಔಷಧಿ ಪೆಟ್ಟಿಗೆಯ ಉಷ್ಣಾಂಶ ಹೆಚ್ಚಾಗಿದೆ!',
    warningObstacle: 'ಮುಂದೆ ಅಡೆತಡೆ ಇದೆ (< 30cm).',
    warningCommsFail: 'ESP32 ಸಿಗ್ನಲ್ ದೋಷ ಕಂಡುಬಂದಿದೆ.',
    warningDeliveryFail: 'ಸಮಯ ಮುಗಿದಿದೆ: ಪಿನ್ ನಮೂದಿಸಲಾಗಿಲ್ಲ.',

    historyTitle: 'ವಿತರಣಾ ದಾಖಲೆಗಳು',
    historySubtitle: 'ಎಲ್ಲಾ ತುರ್ತು ವಿತರಣೆಗಳ ವಿವರಗಳು.',
    searchPlaceholder: 'ಔಷಧಿ, ಕೋಣೆ ಅಥವಾ ಐಡಿ ಮೂಲಕ ಹುಡುಕಿ...',
    filterAll: 'ಎಲ್ಲಾ ದಾಖಲೆಗಳು',
    colDeliveryId: 'ಡೆಲಿವರಿ ಐಡಿ',
    colMedicine: 'ಔಷಧಿ & ಪ್ರಮಾಣ',
    colDestination: 'ಗಮ್ಯಸ್ಥಾನ',
    colPriority: 'ಆದ್ಯತೆ',
    colDateTime: 'ದಿನಾಂಕ & ಸಮಯ',
    colStatus: 'ಸ್ಥಿತಿ',
    colActions: 'ರಶೀದಿ',
    receiptTitle: 'ಆಸ್ಪತ್ರೆ ವಿತರಣಾ ರಶೀದಿ',
    exportCsv: 'CSV ಡೌನ್‌ಲೋಡ್',

    aiAssistantTitle: 'ಮೆಡಿಬಾಟ್ AI ಸಹಾಯಕ',
    aiWelcome: 'ನಮಸ್ಕಾರ! ನಾನು ಮೆಡಿಬಾಟ್ AI ಸಹಾಯಕ. ರೋಬೋಟ್ ಮಾಹಿತಿ ಮತ್ತು ವಿತರಣೆಯಲ್ಲಿ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ.',
    aiInputPlaceholder: 'ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಕೇಳಿ...',
    aiSuggestedQuestions: [
      'ರೋಬೋಟ್ ಈಗ ಎಲ್ಲಿದೆ?',
      'ಬ್ಯಾಟರಿ ಶೇಕಡಾವಾರು ಎಷ್ಟು?',
      'ಪ್ರಸ್ತುತ ವಿತರಣಾ ಸ್ಥಿತಿ ಏನು?',
      'ಅಡೆತಡೆ ಸಂವೇದಕ ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ?'
    ],
    aiDisclaimer: 'ಸುರಕ್ಷತಾ ನಿಯಮ: ಮೆಡಿಬಾಟ್ ಔಷಧಿ ಸಾಗಣೆಗೆ ಮಾತ್ರ ಮತ್ತು ವೈದ್ಯಕೀಯ ಸಲಹೆ ನೀಡುವುದಿಲ್ಲ.',

    hardwareTitle: 'ESP32 ಮತ್ತು ಆರ್ಡುಯಿನೋ ಹಾರ್ಡ್‌ವೇರ್',
    hardwareSubtitle: 'ಸೆನ್ಸಾರ್ ಮತ್ತು ಮೋಟಾರ್ ವಿವರಣೆ.',
    esp32Pinout: 'ಮೈಕ್ರೋಕಂಟ್ರೋಲರ್ ಪಿನ್ ಸಂಪರ್ಕಗಳು',
    telemetryStream: 'ಲೈವ್ ಟೆಲಿಮೆಟ್ರಿ ಸ್ಟ್ರೀಮ್ (JSON 115200 Baud)',
    connectPhysicalRobot: 'ಹಾರ್ಡ್‌ವೇರ್ ಸಂಪರ್ಕಿಸಿ',
  },

  // 6. Malayalam (മലയാളം)
  ml: {
    appTitle: 'മെഡിബോട്ട് (MediBot)',
    appSubtitle: 'അടിയന്തര മരുന്ന് വിതരണ റോബോട്ട്',
    campusTag: 'ഇന്ത്യൻ ആശുപത്രികൾ & കാമ്പസ് സിസ്റ്റം',
    systemOnline: 'ഓൺലൈൻ',
    systemOffline: 'ഓഫ്‌ലൈൻ',
    simulatedMode: 'സിമുലേഷൻ സജീവം',
    voiceAssistant: 'വോയ്‌സ് കമാൻഡ്',
    speakerOn: 'ഓഡിയോ ഓൺ',
    speakerMuted: 'മ്യൂട്ട്',
    emergencyStop: 'അടിയന്തര സ്റ്റോപ്പ് (EMERGENCY STOP)',
    resetEStop: 'പുനരാരംഭിക്കുക',

    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navLiveTracking: 'ലൈവ് ട്രാക്കിംഗ്',
    navNewDelivery: 'പുതിയ ഡെലിവറി',
    navControls: 'റോബോട്ട് നിയന്ത്രണം',
    navHistory: 'ഡെലിവറി ചരിത്രം',
    navHardware: 'ഹാർഡ്‌വെയർ ബ്രിഡ്ജ്',
    navAIAssistant: 'മെഡിബോട്ട് AI',

    robotStatus: 'റോബോട്ട് നില',
    batteryLevel: 'ബാറ്ററി ലെവൽ',
    currentLocation: 'നിലവിലെ സ്ഥാനം',
    destination: 'ലക്ഷ്യസ്ഥാനം',
    deliveryStatus: 'ഡെലിവറി നില',
    temperatures: 'താപനില',
    obstacleStatus: 'തടസ്സം കണ്ടെത്തൽ സെൻസർ',
    connectionStatus: 'ESP32 വൈ-ഫൈ സിഗ്നൽ',
    emergencyAlertStatus: 'അടിയന്തര മുന്നറിയിപ്പ്',
    coldChainTemp: 'മരുന്ന് ബോക്സ് താപനില',
    chassisTemp: 'ചേസിസ് താപനില',
    radarClear: 'പാത വ്യക്തമാണ് (> 100cm)',
    obstacleWarning: 'മുന്നറിയിപ്പ്: തടസ്സം അടുത്തെത്തി (< 50cm)',
    obstacleDetected: 'തടസ്സം കണ്ടെത്തി! റോബോട്ട് നിന്നു',
    estimatedArrival: 'എത്തിച്ചേരുന്ന സമയം',
    distanceRemaining: 'ബാക്കിയുള്ള ദൂരം',

    statusIdle: 'സ്റ്റേഷനിൽ സജ്ജമാണ്',
    statusLoading: 'മരുന്നുകൾ നിറയ്ക്കുന്നു',
    statusEnRoute: 'യാത്രയിലാണ്',
    statusArrived: 'റൂമിൽ എത്തി',
    statusDispensing: 'ബോക്സ് തുറന്നു',
    statusComplete: 'ഡെലിവറി പൂർത്തിയായി',
    statusReturning: 'തിരികെ വരുന്നു',
    statusDocked: 'ചാർജ്ജുചെയ്യുന്നു',
    statusEmergency: 'അടിയന്തര സ്റ്റോപ്പ് സജീവം',
    statusObstaclePaused: 'തടസ്സം കാരണം നിർത്തി',

    newDeliveryTitle: 'അടിയന്തര മരുന്ന് അയക്കുക',
    newDeliveryDesc: 'റോബോട്ടിനെ അയക്കാൻ വിവരങ്ങൾ നൽകുക.',
    medicineName: 'മരുന്നിന്റെ പേര്',
    medicinePlaceholder: 'ഉദാ: അഡ്രിനാലിൻ, ഇൻസുലിൻ',
    quantity: 'അളവും യൂണിറ്റും',
    pickupLocation: 'എടുക്കുന്ന സ്ഥലം',
    destinationRoom: 'റൂം / വാർഡ് നമ്പർ',
    priorityLevel: 'മുൻഗണന',
    priorityNormal: 'സാധാരണ (Normal)',
    priorityUrgent: 'അടിയന്തിരം (Urgent)',
    priorityCritical: 'അതിവേഗ അടിയന്തിരം (Critical)',
    receiverName: 'സ്വീകർത്താവിന്റെ പേര്',
    receiverPlaceholder: 'ഉദാ: ഡോ. പ്രിയ / നഴ്സ്',
    securityPin: '4-അക്ക പിൻ',
    sendRobot: 'റോബോട്ടിനെ അയക്കുക (Send Robot)',
    confirmDelivery: 'ഉറപ്പാക്കുക',
    cancel: 'റദ്ദാക്കുക',
    quickMedicinePicks: 'അടിയന്തര മരുന്നുകൾ',
    safetyNotice: 'ശ്രദ്ധിക്കുക: മെഡിബോട്ട് മരുന്ന് കൊണ്ടുപോകാൻ മാത്രമാണ്. മരുന്നുകൾ നിർദ്ദേശിക്കുന്നില്ല.',
    deliveryStartedConfirmation: 'മരുന്ന് വിതരണം ആരംഭിച്ചു. മെഡിബോട്ട് {dest} ലേക്ക് പോകുന്നു.',

    floorPlanTitle: 'ആശുപത്രി ഭൂപടവും ലൈവ് ട്രാക്കിംഗും',
    baseStation: 'സെൻട്രൽ ഫാർമസി ബേസ് ഡോക്ക്',
    simulateObstacle: 'തടസ്സം സൃഷ്ടിക്കുക',
    clearObstacle: 'തടസ്സം ഒഴിവാക്കുക',
    recalculatingRoute: 'പുതിയ വഴി കണ്ടെത്തുന്നു...',
    pathRoute: 'ബേസ് → റോബോട്ട് → ലക്ഷ്യസ്ഥാനം',
    speed: 'വേഗത',

    robotControlsTitle: 'റോബോട്ട് നിയന്ത്രണങ്ങളും ടെസ്റ്റിംഗ് മോഡും',
    autonomousOperations: 'സ്വയംപ്രവർത്തന നിയന്ത്രണം',
    testingModeLabel: 'ടെസ്റ്റിംഗ് മോഡ് (Testing Mode)',
    testingModeDesc: 'മോട്ടോർ പരിശോധനയ്ക്കുള്ള മാനുവൽ നിയന്ത്രണങ്ങൾ.',
    btnStart: 'ആരംഭിക്കുക (Start)',
    btnStop: 'നിർത്തുക (Stop)',
    btnPause: 'താൽക്കാലികമായി നിർത്തുക (Pause)',
    btnResume: 'തുടരുക (Resume)',
    btnReturnBase: 'ബേസിലേക്ക് മടങ്ങുക (Return to Base)',
    btnManualTesting: 'ടെസ്റ്റിംഗ് മോഡ് ഓൺ/ഓഫ്',
    manualForward: 'മുന്നോട്ട് ⬆️',
    manualBackward: 'പിന്നോട്ട് ⬇️',
    manualLeft: 'ഇടത്തോട്ട് ⬅️',
    manualRight: 'വലത്തോട്ട് ➡️',
    manualRotate: 'തിരിയുക',
    compartmentControl: 'മരുന്ന് ബോക്സ് നിയന്ത്രണം',
    compartmentLocked: 'ലോക്ക് ചെയ്തു',
    compartmentUnlocked: 'തുറന്നു',
    unlockHatch: 'ബോക്സ് തുറക്കുക',
    lockHatch: 'ബോക്സ് ലോക്ക് ചെയ്യുക',

    voiceCommandTitle: 'വോയ്‌സ് അസിസ്റ്റന്റ് (Voice Assistant)',
    voiceStepCommand: 'വോയ്‌സ് കമാൻഡ് (Voice Command)',
    voiceStepRecognized: 'തിരിച്ചറിഞ്ഞ വാചകം (Recognized Text)',
    voiceStepAction: 'നടപടി (Action)',
    listeningNow: 'കേൾക്കുന്നു... മലയാളത്തിലോ ഇംഗ്ലീഷിലോ സംസാരിക്കുക',
    pressToSpeak: 'മൈക്ക് അമർത്തി സംസാരിക്കുക',
    trySpeaking: 'അല്ലെങ്കിൽ ടെസ്റ്റ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക:',
    sampleCommands: [
      'റൂം 101 ലേക്ക് മരുന്ന് അയക്കുക',
      'റോബോട്ട് എവിടെയാണ്?',
      'റോബോട്ട് നില പറയൂ',
      'ബേസിലേക്ക് മടങ്ങുക',
      'അടിയന്തര സ്റ്റോപ്പ്'
    ],
    noVoiceRecognized: 'ശബ്ദം തിരിച്ചറിഞ്ഞില്ല. വീണ്ടും ശ്രമിക്കുക.',
    voiceActionDispatched: 'കമാൻഡ് വിജയകരമായി നടപ്പിലാക്കി.',

    emergencyStopActivated: 'അടിയന്തര സ്റ്റോപ്പ് സജീവമാക്കി (Emergency Stop Activated)',
    emergencyStopDesc: 'എല്ലാ മോട്ടോറുകളും ഉടൻ നിർത്തി.',
    resumeRobot: 'വീണ്ടും ആരംഭിക്കുക',
    warningLowBattery: 'മുന്നറിയിപ്പ്: ബാറ്ററി കുറവാണ് (< 20%). റോബോട്ട് മടങ്ങുന്നു.',
    warningHighTemp: 'മുന്നറിയിപ്പ്: മരുന്ന് ബോക്സ് താപനില ഉയർന്നു!',
    warningObstacle: 'മുന്നിൽ തടസ്സമുണ്ട് (< 30cm).',
    warningCommsFail: 'ESP32 കണക്ഷൻ തകരാർ.',
    warningDeliveryFail: 'സമയം കഴിഞ്ഞു: പിൻ നൽകിയില്ല.',

    historyTitle: 'ഡെലിവറി രേഖകൾ',
    historySubtitle: 'എല്ലാ അടിയന്തര വിതരണ വിവരങ്ങളും.',
    searchPlaceholder: 'മരുന്ന്, റൂം അല്ലെങ്കിൽ ഐഡി ഉപയോഗിച്ച് തിരയുക...',
    filterAll: 'എല്ലാ രേഖകളും',
    colDeliveryId: 'ഡെലിവറി ഐഡി',
    colMedicine: 'മരുന്ന് & അളവ്',
    colDestination: 'ലക്ഷ്യസ്ഥാനം',
    colPriority: 'മുൻഗണന',
    colDateTime: 'തീയതി & സമയം',
    colStatus: 'നില',
    colActions: 'രസീത്',
    receiptTitle: 'ആശുപത്രി ഡെലിവറി രസീത്',
    exportCsv: 'CSV ഡൗൺലോഡ്',

    aiAssistantTitle: 'മെഡിബോട്ട് AI സഹായി',
    aiWelcome: 'നമസ്കാരം! ഞാൻ മെഡിബോട്ട് AI സഹായിയാണ്. റോബോട്ട് വിവരങ്ങളിലും വിതരണത്തിലും സഹായിക്കാം.',
    aiInputPlaceholder: 'മലയാളത്തിലോ ഇംഗ്ലീഷിലോ ചോദിക്കൂ...',
    aiSuggestedQuestions: [
      'റോബോട്ട് ഇപ്പോൾ എവിടെയാണ്?',
      'ബാറ്ററി എത്ര ശതമാനമുണ്ട്?',
      'നിലവിലെ ഡെലിവറി വിവരങ്ങൾ എന്തൊക്കെ?',
      'തടസ്സം എങ്ങനെ ഒഴിവാക്കുന്നു?'
    ],
    aiDisclaimer: 'സുരക്ഷാ ചട്ടം: മെഡിബോട്ട് മരുന്ന് എത്തിക്കാൻ മാത്രമാണ്, ചികിത്സാ നിർദ്ദേശം നൽകില്ല.',

    hardwareTitle: 'ESP32 & ആർഡുയിനോ ഹാർഡ്‌വെയർ',
    hardwareSubtitle: 'സെൻസർ വിവരങ്ങളും ലൈവ് ഡാറ്റയും.',
    esp32Pinout: 'കൺട്രോളർ പിൻ കണക്ഷനുകൾ',
    telemetryStream: 'ലൈവ് ടെലിമെട്രി സ്ട്രീം (JSON 115200 Baud)',
    connectPhysicalRobot: 'ഹാർഡ്‌വെയർ ബന്ധിപ്പിക്കുക',
  },

  // 7. Marathi (मराठी)
  mr: {
    appTitle: 'मेडीबॉट (MediBot)',
    appSubtitle: 'इमर्जन्सी मेडिसिन डिलिव्हरी रोबोट',
    campusTag: 'भारतीय रुग्णालय आणि कॅम्पस रोबोटिक्स',
    systemOnline: 'ऑनलाइन',
    systemOffline: 'ऑफलाइन',
    simulatedMode: 'सिम्युलेशन सक्रिय',
    voiceAssistant: 'व्हॉइस असिस्टंट',
    speakerOn: 'ऑडिओ चालू',
    speakerMuted: 'म्यूट',
    emergencyStop: 'आणीबाणी थांबा (EMERGENCY STOP)',
    resetEStop: 'पुन्हा सुरू करा',

    navDashboard: 'डॅशबोर्ड',
    navLiveTracking: 'लाइव्ह ट्रॅकिंग',
    navNewDelivery: 'नवीन डिलिव्हरी',
    navControls: 'रोबोट नियंत्रणे',
    navHistory: 'डिलिव्हरी इतिहास',
    navHardware: 'हार्डवेअर ब्रिज',
    navAIAssistant: 'मेडीबॉट AI',

    robotStatus: 'रोबोट स्थिती',
    batteryLevel: 'बॅटरी पातळी',
    currentLocation: 'सध्याचे स्थान',
    destination: 'गंतव्य स्थान',
    deliveryStatus: 'डिलिव्हरी स्थिती',
    temperatures: 'तापमान',
    obstacleStatus: 'अडथळा सेन्सर',
    connectionStatus: 'ESP32 वाय-फाय सिग्नल',
    emergencyAlertStatus: 'आणीबाणी इशारा',
    coldChainTemp: 'औषध बॉक्स तापमान',
    chassisTemp: 'चेसिस तापमान',
    radarClear: 'रस्ता मोकळा आहे (> 100cm)',
    obstacleWarning: 'सावधान: अडथळा जवळ आहे (< 50cm)',
    obstacleDetected: 'अडथळा आढळला! रोबोट थांबला',
    estimatedArrival: 'पोहोचण्याची वेळ',
    distanceRemaining: 'उरलेले अंतर',

    statusIdle: 'बेस स्टेशनवर सज्ज',
    statusLoading: 'औषधे लोड होत आहेत',
    statusEnRoute: 'गंतव्याकडे जात आहे',
    statusArrived: 'खोलीत पोहोचला',
    statusDispensing: 'कंपार्टमेंट उघडले',
    statusComplete: 'डिलिव्हरी पूर्ण झाली',
    statusReturning: 'बेसकडे परत येत आहे',
    statusDocked: 'चार्जिंग सुरू आहे',
    statusEmergency: 'आणीबाणी थांबा सक्रिय',
    statusObstaclePaused: 'अडथळ्यामुळे थांबला',

    newDeliveryTitle: 'तातडीची औषध डिलिव्हरी',
    newDeliveryDesc: 'रोबोट पाठवण्यासाठी खालील माहिती भरा.',
    medicineName: 'औषधाचे नाव',
    medicinePlaceholder: 'उदा. ॲड्रिनालिन, इन्सुलिन',
    quantity: 'प्रमाण आणि एकके',
    pickupLocation: 'पिकअप ठिकाण',
    destinationRoom: 'खोली / वॉर्ड क्रमांक',
    priorityLevel: 'प्राधान्य',
    priorityNormal: 'सामान्य (Normal)',
    priorityUrgent: 'तातडीचे (Urgent)',
    priorityCritical: 'अति तातडीचे (Critical)',
    receiverName: 'स्वीकारणाऱ्याचे नाव',
    receiverPlaceholder: 'उदा. डॉ. पाटील / नर्स',
    securityPin: '४-अंकी सुरक्षा पिन',
    sendRobot: 'रोबोट पाठवा (Send Robot)',
    confirmDelivery: 'नक्की करा',
    cancel: 'रद्द करा',
    quickMedicinePicks: 'तातडीची औषधे यादी',
    safetyNotice: 'सूचना: मेडीबॉट केवळ औषध वाहतुकीसाठी आहे. औषध किंवा डोस सुचवत नाही.',
    deliveryStartedConfirmation: 'औषध वितरण सुरू झाले. मेडीबॉट {dest} कडे जात आहे.',

    floorPlanTitle: 'रुग्णालय नकाशा आणि ट्रॅकिंग',
    baseStation: 'सेंट्रल फार्मसी बेस डॉक',
    simulateObstacle: 'अडथळा निर्माण करा',
    clearObstacle: 'अडथळा दूर करा',
    recalculatingRoute: 'नवीन मार्ग शोधत आहे...',
    pathRoute: 'बेस → रोबोट → गंतव्य',
    speed: 'वेग',

    robotControlsTitle: 'रोबोट नियंत्रणे आणि टेस्टिंग मोड',
    autonomousOperations: 'स्वायत्त नियंत्रण',
    testingModeLabel: 'टेस्टिंग मोड (Testing Mode)',
    testingModeDesc: 'मोटार चाचणीसाठी मॅन्युअल नियंत्रणे.',
    btnStart: 'सुरू करा (Start)',
    btnStop: 'थांबवा (Stop)',
    btnPause: 'विराम (Pause)',
    btnResume: 'पुढे सुरू करा (Resume)',
    btnReturnBase: 'बेसवर परता (Return to Base)',
    btnManualTesting: 'टेस्टिंग मोड चालू/बंद',
    manualForward: 'पुढे ⬆️',
    manualBackward: 'मागे ⬇️',
    manualLeft: 'डावीकडे ⬅️',
    manualRight: 'उजवीकडे ➡️',
    manualRotate: 'फिरा',
    compartmentControl: 'औषध कंपार्टमेंट नियंत्रण',
    compartmentLocked: 'लॉक केले',
    compartmentUnlocked: 'अनलॉक केले',
    unlockHatch: 'कंपार्टमेंट उघडा',
    lockHatch: 'कंपार्टमेंट बंद करा',

    voiceCommandTitle: 'व्हॉइस असिस्टंट (Voice Assistant)',
    voiceStepCommand: 'व्हॉइस कमांड (Voice Command)',
    voiceStepRecognized: 'ओळखलेला मजकूर (Recognized Text)',
    voiceStepAction: 'केलेली कृती (Action)',
    listeningNow: 'ऐकत आहे... मराठी किंवा इंग्रजीत बोला',
    pressToSpeak: 'माईक दाबून बोला',
    trySpeaking: 'किंवा चाचणीसाठी येथे क्लिक करा:',
    sampleCommands: [
      'रूम १०१ मध्ये औषध पाठवा',
      'रोबोट कुठे आहे?',
      'रोबोटची स्थिती सांगा',
      'बेसवर परत या',
      'इमर्जन्सी स्टॉप'
    ],
    noVoiceRecognized: 'आवाज ओळखता आला नाही. कृपया पुन्हा प्रयत्न करा.',
    voiceActionDispatched: 'कमांड यशस्वीरीत्या कार्यान्वित झाली.',

    emergencyStopActivated: 'आणीबाणी थांबा सक्रिय (Emergency Stop Activated)',
    emergencyStopDesc: 'सर्व मोटर्स तत्काळ थांबवण्यात आल्या आहेत.',
    resumeRobot: 'पुन्हा सुरू करा',
    warningLowBattery: 'इशारा: बॅटरी कमी आहे (< 20%). रोबोट परत येत आहे.',
    warningHighTemp: 'इशारा: औषध बॉक्सचे तापमान वाढले आहे!',
    warningObstacle: 'समोर अडथळा आढळला (< 30cm).',
    warningCommsFail: 'ESP32 सिग्नल समस्या आढळली.',
    warningDeliveryFail: 'वेळ संपली: पिन प्रविष्ट केला नाही.',

    historyTitle: 'डिलिव्हरी नोंदी आणि इतिहास',
    historySubtitle: 'सर्व आपत्कालीन डिलिव्हरीचा तपशील.',
    searchPlaceholder: 'औषध, खोली किंवा आयडी द्वारे शोधा...',
    filterAll: 'सर्व नोंदी',
    colDeliveryId: 'डिलिव्हरी आयडी',
    colMedicine: 'औषध व प्रमाण',
    colDestination: 'गंतव्य',
    colPriority: 'प्राधान्य',
    colDateTime: 'तारीख व वेळ',
    colStatus: 'स्थिती',
    colActions: 'पावती',
    receiptTitle: 'रुग्णालय डिलिव्हरी पावती',
    exportCsv: 'CSV डाउनलोड करा',

    aiAssistantTitle: 'मेडीबॉट AI सहाय्यक',
    aiWelcome: 'नमस्कार! मी मेडीबॉट AI सहाय्यक आहे. मी रोबोटची स्थिती आणि डिलिव्हरीमध्ये मदत करू शकतो.',
    aiInputPlaceholder: 'मराठी किंवा इंग्रजीत विचारा...',
    aiSuggestedQuestions: [
      'रोबोट सध्या कुठे आहे?',
      'बॅटरी किती टक्के आहे?',
      'सध्याच्या डिलिव्हरीची स्थिती काय आहे?',
      'अडथळा निवारण कसे कार्य करते?'
    ],
    aiDisclaimer: 'सुरक्षा नियम: मेडीबॉट फक्त औषध वाहतूक करतो, वैद्यकीय सल्ला देत नाही.',

    hardwareTitle: 'ESP32 व आर्डुइनो हार्डवेअर',
    hardwareSubtitle: 'सेन्सर्स आणि मोटर माहिती.',
    esp32Pinout: 'मायक्रोकंट्रोलर पिन जोडणी',
    telemetryStream: 'लाइव्ह टेलिमेट्री (JSON 115200 Baud)',
    connectPhysicalRobot: 'हार्डवेअर कनेक्ट करा',
  },

  // 8. Bengali (বাংলা)
  bn: {
    appTitle: 'মেডিবট (MediBot)',
    appSubtitle: 'জরুরি ওষুধ সরবরাহ রোবট',
    campusTag: 'ভারতীয় হাসপাতাল ও কলেজ ক্যাম্পাস রোবোটিক্স',
    systemOnline: 'অনলাইন',
    systemOffline: 'অফলাইন',
    simulatedMode: 'সিমুলেশন সক্রিয়',
    voiceAssistant: 'ভয়েস অ্যাসিস্ট্যান্ট',
    speakerOn: 'অডিও চালু',
    speakerMuted: 'মিউট',
    emergencyStop: 'জরুরি বিরতি (EMERGENCY STOP)',
    resetEStop: 'পুনরায় চালু করুন',

    navDashboard: 'ড্যাশবোর্ড',
    navLiveTracking: 'লাইভ ট্র্যাকিং',
    navNewDelivery: 'নতুন ডেলিভারি',
    navControls: 'রোবট নিয়ন্ত্রণ',
    navHistory: 'ডেলিভারি ইতিহাস',
    navHardware: 'হার্ডওয়্যার ব্রিজ',
    navAIAssistant: 'মেডিবট AI',

    robotStatus: 'রোবট অবস্থা',
    batteryLevel: 'ব্যাটারি লেভেল',
    currentLocation: 'বর্তমান অবস্থান',
    destination: 'গন্তব্য',
    deliveryStatus: 'ডেলিভারি অবস্থা',
    temperatures: 'তাপমাত্রা',
    obstacleStatus: 'বাধা সনাক্তকরণ সেন্সর',
    connectionStatus: 'ESP32 ওয়াই-ফাই সংকেত',
    emergencyAlertStatus: 'জরুরি সতর্কতা',
    coldChainTemp: 'ওষুধ বাক্সের তাপমাত্রা',
    chassisTemp: 'বডি তাপমাত্রা',
    radarClear: 'পথ পরিষ্কার (> 100cm)',
    obstacleWarning: 'সতর্কতা: বাধা কাছে রয়েছে (< 50cm)',
    obstacleDetected: 'বাধা সনাক্ত হয়েছে! রোবট থেমে গেছে',
    estimatedArrival: 'পৌঁছানোর সময়',
    distanceRemaining: 'বাকি দূরত্ব',

    statusIdle: 'স্টেশনে প্রস্তুত',
    statusLoading: 'ওষুধ লোড হচ্ছে',
    statusEnRoute: 'গন্তব্যের দিকে চলেছে',
    statusArrived: 'রুমে পৌঁছেছে',
    statusDispensing: 'বক্স আনলক হয়েছে',
    statusComplete: 'ডেলিভারি সম্পন্ন',
    statusReturning: 'বেস স্টেশনে ফিরছে',
    statusDocked: 'চার্জ হচ্ছে',
    statusEmergency: 'জরুরি স্টপ সক্রিয়',
    statusObstaclePaused: 'বাধার কারণে থামানো হয়েছে',

    newDeliveryTitle: 'জরুরি ওষুধ প্রেরণ',
    newDeliveryDesc: 'রোবট পাঠাতে বিবরণ লিখুন।',
    medicineName: 'ওষুধের নাম',
    medicinePlaceholder: 'যেমন: অ্যাড্রেনালিন, ইনসুলিন',
    quantity: 'পরিমাণ ও একক',
    pickupLocation: 'নেওয়ার স্থান',
    destinationRoom: 'রুম / ওয়ার্ড নম্বর',
    priorityLevel: 'অগ্রাধিকার',
    priorityNormal: 'সাধারণ (Normal)',
    priorityUrgent: 'জরুরি (Urgent)',
    priorityCritical: 'অত্যন্ত জরুরি (Critical)',
    receiverName: 'প্রাপকের নাম',
    receiverPlaceholder: 'যেমন: ডাঃ মুখার্জি / নার্স',
    securityPin: '৪-সংখ্যার সুরক্ষা পিন',
    sendRobot: 'রোবট পাঠান (Send Robot)',
    confirmDelivery: 'নিশ্চিত করুন',
    cancel: 'বাতিল করুন',
    quickMedicinePicks: 'জরুরি ওষুধ তালিকা',
    safetyNotice: 'বিজ্ঞপ্তি: মেডিবট কেবল ওষুধ পরিবহনের জন্য। এটি কোনও চিকিৎসার পরামর্শ বা ডোজ দেয় না।',
    deliveryStartedConfirmation: 'ওষুধ ডেলিভারি শুরু হয়েছে। মেডিবট {dest} এর দিকে যাচ্ছে।',

    floorPlanTitle: 'হাসপাতালের মানচিত্র ও লাইভ ট্র্যাকিং',
    baseStation: 'সেন্ট্রাল ফার্মেসি বেস ডক',
    simulateObstacle: 'করিডোরে বাধা তৈরি করুন',
    clearObstacle: 'বাধা সরিয়ে পুনরায় চালান',
    recalculatingRoute: 'নতুন রুট খুঁজছে...',
    pathRoute: 'বেস → রোবট → গন্তব্য',
    speed: 'গতি',

    robotControlsTitle: 'রোবট নিয়ন্ত্রণ ও টেস্টিং মোড',
    autonomousOperations: 'স্বয়ংক্রিয় নিয়ন্ত্রণ',
    testingModeLabel: 'টেস্টিং মোড (Testing Mode)',
    testingModeDesc: 'মোটর পরীক্ষার জন্য ম্যানুয়াল নিয়ন্ত্রণ।',
    btnStart: 'শুরু করুন (Start)',
    btnStop: 'থামুন (Stop)',
    btnPause: 'বিরতি (Pause)',
    btnResume: 'চালিয়ে যান (Resume)',
    btnReturnBase: 'বেসে ফিরুন (Return to Base)',
    btnManualTesting: 'টেস্টিং মোড অন/অফ',
    manualForward: 'সামনে ⬆️',
    manualBackward: 'পেছনে ⬇️',
    manualLeft: 'বামে ⬅️',
    manualRight: 'ডানে ➡️',
    manualRotate: 'ঘুরুন',
    compartmentControl: 'ওষুধের বক্স নিয়ন্ত্রণ',
    compartmentLocked: 'লক করা আছে',
    compartmentUnlocked: 'আনলক করা আছে',
    unlockHatch: 'বক্স খুলুন',
    lockHatch: 'বক্স লক করুন',

    voiceCommandTitle: 'ভয়েস অ্যাসিস্ট্যান্ট (Voice Assistant)',
    voiceStepCommand: 'ভয়েস কমান্ড (Voice Command)',
    voiceStepRecognized: 'সনাক্তকৃত বাক্য (Recognized Text)',
    voiceStepAction: 'গৃহীত পদক্ষেপ (Action)',
    listeningNow: 'শুনছি... বাংলায় বা ইংরেজিতে বলুন',
    pressToSpeak: 'মাইক চেপে কথা বলুন',
    trySpeaking: 'বা পরীক্ষার জন্য ক্লিক করুন:',
    sampleCommands: [
      'রুম ১০১ এ ওষুধ পাঠাও',
      'রোবট কোথায় আছে?',
      'রোবটের অবস্থা বলো',
      'বেস স্টেশনে ফিরে যাও',
      'জরুরি স্টপ'
    ],
    noVoiceRecognized: 'কণ্ঠস্বর সনাক্ত হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    voiceActionDispatched: 'কমান্ড সফলভাবে কার্যকর হয়েছে।',

    emergencyStopActivated: 'জরুরি স্টপ সক্রিয় করা হয়েছে (Emergency Stop Activated)',
    emergencyStopDesc: 'সব মোটর অবিলম্বে বন্ধ করা হয়েছে।',
    resumeRobot: 'পুনরায় চালু করুন',
    warningLowBattery: 'সতর্কতা: ব্যাটারি কম (< 20%)। রোবট ফিরে আসছে।',
    warningHighTemp: 'সতর্কতা: ওষুধ বাক্সের তাপমাত্রা বেড়েছে!',
    warningObstacle: 'সামনে বাধা রয়েছে (< 30cm)।',
    warningCommsFail: 'ESP32 সিগন্যালে সমস্যা রয়েছে।',
    warningDeliveryFail: 'সময় শেষ: পিন প্রবেশ করানো হয়নি।',

    historyTitle: 'ডেলিভারি রেকর্ড ও ইতিহাস',
    historySubtitle: 'সমস্ত জরুরি ওষুধ পরিবহনের তথ্য।',
    searchPlaceholder: 'ওষুধ, রুম বা আইডি দিয়ে খুঁজুন...',
    filterAll: 'সকল রেকর্ড',
    colDeliveryId: 'ডেলিভারি আইডি',
    colMedicine: 'ওষুধ ও পরিমাণ',
    colDestination: 'গন্তব্য',
    colPriority: 'অগ্রাধিকার',
    colDateTime: 'তারিখ ও সময়',
    colStatus: 'অবস্থা',
    colActions: 'রসিদ',
    receiptTitle: 'হাসপাতাল ডেলিভারি রসিদ',
    exportCsv: 'CSV ডাউনলোড',

    aiAssistantTitle: 'মেডিবট AI সহকারী',
    aiWelcome: 'নমস্কার! আমি মেডিবট AI সহকারী। রোবটের অবস্থান ও ডেলিভারি সংক্রান্ত তথ্যে সাহায্য করতে পারি।',
    aiInputPlaceholder: 'বাংলা বা ইংরেজিতে জিজ্ঞাসা করুন...',
    aiSuggestedQuestions: [
      'রোবট এখন কোথায় আছে?',
      'ব্যাটারি কত শতাংশ আছে?',
      'বর্তমান ডেলিভারির অবস্থা কি?',
      'বাধা সনাক্তকরণ কীভাবে কাজ করে?'
    ],
    aiDisclaimer: 'নিরাপত্তা বিধি: মেডিবট কেবল ওষুধ পরিবহনের জন্য এবং কোনো চিকিৎসকের পরামর্শ দেয় না।',

    hardwareTitle: 'ESP32 ও আর্ডুইনো হার্ডওয়্যার',
    hardwareSubtitle: 'সেন্সর ও মোটর সংযোগ বিবরণী।',
    esp32Pinout: 'মাইক্রোকন্ট্রোলার পিন কনফিগারেশন',
    telemetryStream: 'লাইভ টেলিমეტ্রি স্ট্রিম (JSON 115200 Baud)',
    connectPhysicalRobot: 'হার্ডওয়্যার সংযুক্ত করুন',
  }
};
