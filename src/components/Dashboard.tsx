import React from 'react';
import { useRobot } from '../context/RobotContext';
import {
  Activity,
  Battery,
  BatteryCharging,
  Compass,
  MapPin,
  Thermometer,
  Radio,
  Wifi,
  AlertTriangle,
  CheckCircle2,
  Package,
  ArrowRight,
  ShieldAlert,
  Clock,
  Zap,
} from 'lucide-react';

interface DashboardProps {
  onOpenNewDelivery: () => void;
  onOpenVoiceModal: () => void;
  onNavigateToTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onOpenNewDelivery,
  onOpenVoiceModal,
  onNavigateToTab,
}) => {
  const { t, robotState, simulateObstacle, clearObstacle, unlockCompartment, lockCompartment } = useRobot();

  const getStatusLabel = () => {
    switch (robotState.deliveryStatus) {
      case 'idle':
        return t.statusIdle;
      case 'loading':
        return t.statusLoading;
      case 'en_route_delivery':
        return t.statusEnRoute;
      case 'arrived_destination':
        return t.statusArrived;
      case 'dispensing':
        return t.statusDispensing;
      case 'delivery_complete':
        return t.statusComplete;
      case 'returning_to_base':
        return t.statusReturning;
      case 'docked_charging':
        return t.statusDocked;
      case 'emergency_stopped':
        return t.statusEmergency;
      case 'obstacle_paused':
        return t.statusObstaclePaused;
      default:
        return 'Operating';
    }
  };

  const getStatusColor = () => {
    if (robotState.emergencyStopActivated) return 'text-rose-400';
    if (robotState.obstacleDetected) return 'text-amber-400';
    if (robotState.deliveryStatus === 'en_route_delivery') return 'text-teal-400';
    if (robotState.deliveryStatus === 'arrived_destination') return 'text-emerald-400';
    return 'text-cyan-400';
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Quick Status Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-teal-950/30 p-5 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Activity className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider text-teal-400">{t.deliveryStatus}</span>
              <span aria-hidden="true">·</span>
              <span>LiFePO4 24V Autonomous Rig</span>
              <span aria-hidden="true">·</span>
              <span>ESP32-WROOM Node #01</span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <h2 className={`text-xl font-bold font-sans ${getStatusColor()}`}>
                {getStatusLabel()}
              </h2>
              {robotState.isCharging && (
                <span className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                  <Zap className="h-3.5 w-3.5 fill-current" /> Charging
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewDelivery}
            className="flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 text-sm font-bold shadow-md shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
          >
            <Package className="h-4 w-4" />
            <span>{t.newDeliveryTitle}</span>
          </button>
          <button
            onClick={() => onNavigateToTab('map')}
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 px-3.5 py-2 text-sm font-medium text-slate-200 transition-colors"
          >
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>{t.navLiveTracking}</span>
          </button>
        </div>
      </div>

      {/* Grid of Telemetry Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Battery Telemetry */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.batteryLevel}</span>
            {robotState.isCharging ? (
              <BatteryCharging className="h-4 w-4 text-amber-400 animate-pulse" />
            ) : (
              <Battery className="h-4 w-4 text-emerald-400" />
            )}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-white font-mono">
              {Math.round(robotState.batteryPercentage)}%
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {robotState.sensors.voltageV.toFixed(1)} V
            </span>
          </div>

          {/* Battery progress bar */}
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className={`h-full transition-all duration-500 ${
                robotState.batteryPercentage > 50
                  ? 'bg-emerald-400'
                  : robotState.batteryPercentage > 20
                  ? 'bg-amber-400'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${robotState.batteryPercentage}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Cell Temp: 28.4°C</span>
            <span>Drain: {robotState.sensors.currentDrawA.toFixed(1)} A</span>
          </div>
        </div>

        {/* Card 2: Current Location */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.currentLocation}</span>
            <MapPin className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="truncate text-base font-semibold text-white">
            {robotState.currentLocationName}
          </div>
          <div className="mt-1 flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>X: {robotState.currentPosition.x.toFixed(1)}%</span>
            <span aria-hidden="true">·</span>
            <span>Y: {robotState.currentPosition.y.toFixed(1)}%</span>
            <span aria-hidden="true">·</span>
            <span>{robotState.headingDeg}° N</span>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Velocity:</span>
            <span className="font-mono text-cyan-300 font-semibold">
              {robotState.sensors.speedMps.toFixed(2)} m/s
            </span>
          </div>
        </div>

        {/* Card 3: Destination & Active Mission */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.destination}</span>
            <ArrowRight className="h-4 w-4 text-teal-400" />
          </div>
          <div className="truncate text-base font-semibold text-white">
            {robotState.targetDestination ? robotState.targetDestination.name : t.statusIdle}
          </div>
          <div className="mt-1 text-xs text-slate-400 truncate">
            {robotState.activeDelivery
              ? `${robotState.activeDelivery.medicineName} (${robotState.activeDelivery.quantity})`
              : 'Standby for next requisition'}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Priority:</span>
            <span
              className={`font-semibold uppercase ${
                robotState.activeDelivery?.priority === 'critical'
                  ? 'text-rose-400'
                  : robotState.activeDelivery?.priority === 'urgent'
                  ? 'text-amber-400'
                  : 'text-slate-300'
              }`}
            >
              {robotState.activeDelivery ? robotState.activeDelivery.priority : 'Normal'}
            </span>
          </div>
        </div>

        {/* Card 4: Temperature & Cold Chain */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{t.temperatures}</span>
            <Thermometer className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-2xl font-extrabold text-teal-300 font-mono">
                {robotState.sensors.medicineBoxTempC.toFixed(1)}°C
              </div>
              <span className="text-[11px] text-slate-400">{t.coldChainTemp}</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-slate-300 font-mono">
                {robotState.sensors.chassisTempC.toFixed(1)}°C
              </div>
              <span className="text-[11px] text-slate-400">{t.chassisTemp}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
            <span>Cold-Chain Seal:</span>
            <span className="text-emerald-400 font-medium">Nominal (2°C - 8°C)</span>
          </div>
        </div>
      </div>

      {/* Row 2: Radar Obstacle Sensor & Connectivity Telemetry */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Obstacle Radar Sensor */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Radio className="h-5 w-5 text-teal-400" />
              <div>
                <h3 className="text-sm font-bold text-white font-sans">{t.obstacleStatus}</h3>
                <p className="text-xs text-slate-400">Ultrasonic HC-SR04 & Front 2D LiDAR Range</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {robotState.obstacleDetected ? (
                <button
                  onClick={clearObstacle}
                  className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors"
                >
                  {t.clearObstacle}
                </button>
              ) : (
                <button
                  onClick={simulateObstacle}
                  className="rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300 hover:bg-amber-500/20 transition-colors"
                >
                  {t.simulateObstacle}
                </button>
              )}
            </div>
          </div>

          {/* Sensor Readings Display */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="text-xs text-slate-400">Front Sonar</span>
              <div
                className={`text-xl font-bold font-mono ${
                  robotState.sensors.ultrasonicFrontCm < 30
                    ? 'text-rose-400'
                    : robotState.sensors.ultrasonicFrontCm < 60
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {robotState.sensors.ultrasonicFrontCm} cm
              </div>
              <span className="text-[10px] text-slate-400">
                {robotState.sensors.ultrasonicFrontCm < 30 ? 'CRITICAL STOP' : 'Clear Corridor'}
              </span>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="text-xs text-slate-400">Left Sonar</span>
              <div className="text-xl font-bold font-mono text-cyan-300">
                {robotState.sensors.ultrasonicLeftCm} cm
              </div>
              <span className="text-[10px] text-slate-400">Hallway Clearance</span>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="text-xs text-slate-400">Right Sonar</span>
              <div className="text-xl font-bold font-mono text-cyan-300">
                {robotState.sensors.ultrasonicRightCm} cm
              </div>
              <span className="text-[10px] text-slate-400">Hallway Clearance</span>
            </div>

            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
              <span className="text-xs text-slate-400">Rear Sonar</span>
              <div className="text-xl font-bold font-mono text-slate-300">
                {robotState.sensors.ultrasonicRearCm} cm
              </div>
              <span className="text-[10px] text-slate-400">Dock Proximity</span>
            </div>
          </div>

          {/* Visual Radar Sensor Cone Bar */}
          <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  robotState.obstacleDetected ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'
                }`}
              />
              {robotState.obstacleDetected ? t.obstacleDetected : t.radarClear}
            </span>
            <span className="font-mono text-slate-400">
              LiDAR Scanning Arc: 180° FOV · 20Hz Update
            </span>
          </div>
        </div>

        {/* Secure Compartment & Hardware Telemetry */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white font-sans">{t.compartmentControl}</h3>
              <span
                className={`text-xs font-bold ${
                  robotState.sensors.compartmentLocked ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {robotState.sensors.compartmentLocked ? t.compartmentLocked : t.compartmentUnlocked}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Micro-servo security latch with PIN verification. Protects cold-chain pharmaceuticals during transit.
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span>Hatch Door:</span>
                <span className="font-semibold text-white">
                  {robotState.sensors.compartmentDoorOpen ? 'Open / Accessible' : 'Closed & Sealed'}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/80">
                <span>Payload Manifest:</span>
                <span className="font-mono text-teal-300 truncate max-w-[140px]">
                  {robotState.activeDelivery ? robotState.activeDelivery.medicineName : 'Empty'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
            {robotState.sensors.compartmentLocked ? (
              <button
                onClick={() => unlockCompartment()}
                className="w-full py-2 rounded-xl bg-teal-500/20 border border-teal-500/40 text-teal-300 hover:bg-teal-500/30 text-xs font-bold transition-colors"
              >
                {t.unlockHatch}
              </button>
            ) : (
              <button
                onClick={lockCompartment}
                className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors"
              >
                {t.lockHatch}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
