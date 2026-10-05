export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  locale: string;
  flag: string;
}

export type RobotSystemStatus = 'online' | 'offline' | 'simulated';

export type DeliveryStatus =
  | 'idle'
  | 'loading'
  | 'en_route_delivery'
  | 'arrived_destination'
  | 'dispensing'
  | 'delivery_complete'
  | 'returning_to_base'
  | 'docked_charging'
  | 'emergency_stopped'
  | 'obstacle_paused';

export type DeliveryPriority = 'normal' | 'urgent' | 'critical';

export interface LocationPoint {
  id: string;
  name: string;
  code: string;
  x: number; // percentage in floor plan (0-100)
  y: number; // percentage in floor plan (0-100)
  floor: string;
  type: 'base' | 'icu' | 'room' | 'ward' | 'lab' | 'pharmacy';
  description: string;
}

export interface DeliveryRecord {
  id: string;
  medicineName: string;
  quantity: string;
  pickupLocation: string;
  destinationId: string;
  destinationName: string;
  priority: DeliveryPriority;
  recipientName: string;
  recipientRole?: string;
  senderName: string;
  passcode: string;
  status: 'pending' | 'in_progress' | 'delivered' | 'failed' | 'cancelled';
  notes?: string;
  createdAt: string;
  deliveredAt?: string;
  deliveryDurationMinutes?: number;
}

export interface SensorData {
  ultrasonicFrontCm: number;
  ultrasonicLeftCm: number;
  ultrasonicRightCm: number;
  ultrasonicRearCm: number;
  lidarDistanceM: number;
  chassisTempC: number;
  medicineBoxTempC: number;
  voltageV: number;
  currentDrawA: number;
  speedMps: number;
  headingDeg: number;
  wifiSignalDbm: number;
  obstacleDetected: boolean;
  obstacleDistanceCm?: number;
  compartmentLocked: boolean;
  compartmentDoorOpen: boolean;
}

export interface RobotState {
  systemStatus: RobotSystemStatus;
  deliveryStatus: DeliveryStatus;
  batteryPercentage: number;
  isCharging: boolean;
  currentPosition: { x: number; y: number };
  headingDeg: number;
  currentLocationName: string;
  targetDestination: LocationPoint | null;
  activeDelivery: DeliveryRecord | null;
  sensors: SensorData;
  isTestingMode: boolean;
  emergencyStopActivated: boolean;
  emergencyReason: string | null;
  obstacleDetected: boolean;
  lastCommand: {
    rawVoice?: string;
    recognizedText?: string;
    actionTaken?: string;
    timestamp: string;
    language: LanguageCode;
  } | null;
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  cleared: boolean;
  code: string;
}
