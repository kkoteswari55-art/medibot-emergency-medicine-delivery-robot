import React, { useState } from 'react';
import { useRobot } from '../context/RobotContext';
import { HOSPITAL_LOCATIONS, CORRIDOR_NETWORK } from '../data/hospitalMap';
import { LocationPoint } from '../types';
import {
  Compass,
  MapPin,
  Bot,
  AlertTriangle,
  Send,
  Radio,
  Maximize2,
  Navigation,
  ShieldAlert,
  RotateCcw,
} from 'lucide-react';

interface LiveTrackingMapProps {
  onOpenNewDeliveryWithRoom?: (room: LocationPoint) => void;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({ onOpenNewDeliveryWithRoom }) => {
  const {
    t,
    robotState,
    simulateObstacle,
    clearObstacle,
    returnToBase,
    selectLocationForQuickDispatch,
  } = useRobot();

  const [selectedRoom, setSelectedRoom] = useState<LocationPoint | null>(null);

  // Calculate distance between robot and destination
  const destX = robotState.targetDestination?.x ?? HOSPITAL_LOCATIONS[0].x;
  const destY = robotState.targetDestination?.y ?? HOSPITAL_LOCATIONS[0].y;
  const currentX = robotState.currentPosition.x;
  const currentY = robotState.currentPosition.y;

  const dx = destX - currentX;
  const dy = destY - currentY;
  const estimatedDistMeters = +(Math.sqrt(dx * dx + dy * dy) * 0.45).toFixed(1);

  // Delivery progress percentage
  let progressPct = 0;
  if (robotState.deliveryStatus === 'docked_charging' || robotState.deliveryStatus === 'idle') {
    progressPct = 0;
  } else if (robotState.deliveryStatus === 'arrived_destination' || robotState.deliveryStatus === 'dispensing') {
    progressPct = 100;
  } else if (robotState.deliveryStatus === 'returning_to_base') {
    progressPct = 85;
  } else if (robotState.deliveryStatus === 'en_route_delivery') {
    const totalDist = 45; // baseline scale
    progressPct = Math.min(95, Math.max(5, Math.round(((totalDist - estimatedDistMeters) / totalDist) * 100)));
  }

  const handleRoomClick = (loc: LocationPoint) => {
    setSelectedRoom(loc);
    selectLocationForQuickDispatch(loc);
  };

  return (
    <div className="space-y-6">
      {/* Route Header Status Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-slate-900/80 p-4 border border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400">
            {t.pathRoute}
          </span>
          <div className="flex items-center gap-2 mt-1 text-sm font-bold text-white flex-wrap">
            <span className="text-slate-300">Central Base Dock</span>
            <span className="text-teal-400">→</span>
            <span className="text-cyan-300">
              MediBot ({currentX.toFixed(0)}%, {currentY.toFixed(0)}%)
            </span>
            <span className="text-teal-400">→</span>
            <span className="text-emerald-400">
              {robotState.targetDestination ? robotState.targetDestination.name : 'Standby'}
            </span>
          </div>
        </div>

        {/* Real-time metrics */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 px-3 py-1.5">
            <span className="text-slate-400 block text-[10px]">EST. DISTANCE</span>
            <span className="text-sm font-bold text-teal-300">{estimatedDistMeters} meters</span>
          </div>
          <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 px-3 py-1.5">
            <span className="text-slate-400 block text-[10px]">ROUTE PROGRESS</span>
            <span className="text-sm font-bold text-cyan-300">{progressPct}%</span>
          </div>
        </div>
      </div>

      {/* Main Floor Plan Canvas/SVG Container */}
      <div className="relative rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
        {/* Map Header / Controls Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto rounded-xl bg-slate-900/90 border border-slate-800 px-3 py-1.5 backdrop-blur-md text-xs font-medium text-slate-300">
            <span>Apollo-AIIMS Campus · Ground Floor Emergency Wing</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            {robotState.obstacleDetected ? (
              <button
                onClick={clearObstacle}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors"
              >
                <ShieldAlert className="h-3.5 w-3.5" />
                <span>{t.clearObstacle}</span>
              </button>
            ) : (
              <button
                onClick={simulateObstacle}
                className="flex items-center gap-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500/30 backdrop-blur-md transition-colors"
              >
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                <span>{t.simulateObstacle}</span>
              </button>
            )}

            <button
              onClick={returnToBase}
              title="Return to Base"
              className="flex items-center gap-1 rounded-xl bg-slate-900/90 border border-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white backdrop-blur-md transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">{t.btnReturnBase}</span>
            </button>
          </div>
        </div>

        {/* SVG Hospital Floor Plan */}
        <div className="w-full aspect-[16/9] min-h-[440px] relative select-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid Pattern */}
            <defs>
              <pattern id="grid" width="4" height="4" patternUnits="userSpaceOnUse">
                <path d="M 4 0 L 0 0 0 4" fill="none" stroke="rgba(51, 65, 85, 0.2)" strokeWidth="0.2" />
              </pattern>
              {/* Radar pulse gradient */}
              <radialGradient id="sensorCone" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(45, 212, 191, 0.3)" />
                <stop offset="100%" stopColor="rgba(45, 212, 191, 0.0)" />
              </radialGradient>
            </defs>

            <rect width="100" height="100" fill="#030712" />
            <rect width="100" height="100" fill="url(#grid)" />

            {/* Central Hallway Corridors (Spine and Wings) */}
            {/* Main Spine Corridor */}
            <rect x="8" y="38" width="84" height="12" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
            {/* Base Vertical Connector */}
            <rect x="8" y="38" width="8" height="48" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />
            {/* East Wing Connector */}
            <rect x="84" y="38" width="8" height="48" rx="2" fill="#0f172a" stroke="#1e293b" strokeWidth="0.5" />

            {/* Corridor Centerline dashed path */}
            <path
              d="M 12 82 L 12 44 L 88 44 L 88 82"
              fill="none"
              stroke="#334155"
              strokeWidth="0.6"
              strokeDasharray="1.5, 1.5"
            />

            {/* Active Navigation Trajectory Route (Base -> Robot -> Destination) */}
            {robotState.targetDestination && (
              <polyline
                points={`12,82 12,44 ${robotState.targetDestination.x},44 ${robotState.targetDestination.x},${robotState.targetDestination.y}`}
                fill="none"
                stroke={robotState.obstacleDetected ? '#f59e0b' : '#2dd4bf'}
                strokeWidth="1.2"
                strokeDasharray="2, 2"
                className="animate-pulse"
              />
            )}

            {/* Simulated Obstacle Graphic on corridor if detected */}
            {robotState.obstacleDetected && (
              <g transform="translate(48, 41)">
                <circle cx="3" cy="3" r="3" fill="#ef4444" opacity="0.3" className="animate-ping" />
                <rect x="1" y="1" width="4" height="4" rx="0.8" fill="#ef4444" stroke="#fca5a5" strokeWidth="0.4" />
                <text x="3" y="3.8" fill="#ffffff" fontSize="2.2" fontWeight="bold" textAnchor="middle">
                  !
                </text>
              </g>
            )}

            {/* Room Boxes and Waypoints */}
            {HOSPITAL_LOCATIONS.map((loc) => {
              const isBase = loc.type === 'base';
              const isTarget = robotState.targetDestination?.id === loc.id;
              const isSelected = selectedRoom?.id === loc.id;

              return (
                <g
                  key={loc.id}
                  onClick={() => handleRoomClick(loc)}
                  className="cursor-pointer transition-all hover:opacity-90"
                >
                  {/* Room Boundary Rect */}
                  <rect
                    x={loc.x - 7}
                    y={loc.y - 7}
                    width="14"
                    height="14"
                    rx="1.5"
                    fill={
                      isBase
                        ? '#042f2e'
                        : isTarget
                        ? '#134e4a'
                        : isSelected
                        ? '#1e293b'
                        : '#090d16'
                    }
                    stroke={
                      isTarget
                        ? '#2dd4bf'
                        : isBase
                        ? '#14b8a6'
                        : isSelected
                        ? '#38bdf8'
                        : '#1e293b'
                    }
                    strokeWidth={isTarget || isSelected ? '0.8' : '0.4'}
                  />

                  {/* Room Label Code */}
                  <text
                    x={loc.x}
                    y={loc.y - 1.5}
                    fill={isTarget ? '#5eead4' : isBase ? '#2dd4bf' : '#94a3b8'}
                    fontSize="2.4"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {loc.code}
                  </text>

                  {/* Room Type Subtitle */}
                  <text
                    x={loc.x}
                    y={loc.y + 2.5}
                    fill="#64748b"
                    fontSize="1.5"
                    textAnchor="middle"
                  >
                    {loc.type.toUpperCase()}
                  </text>

                  {/* Target Beacon if robot heading here */}
                  {isTarget && (
                    <circle
                      cx={loc.x}
                      cy={loc.y}
                      r="8"
                      fill="none"
                      stroke="#2dd4bf"
                      strokeWidth="0.4"
                      opacity="0.6"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}

            {/* LIVE MOVING ROBOT ICON & SENSOR CONE */}
            <g
              transform={`translate(${currentX}, ${currentY}) rotate(${robotState.headingDeg})`}
              className="transition-transform duration-300"
            >
              {/* Lidar Scan Arc */}
              <path
                d="M 0 0 L -6 -12 A 12 12 0 0 1 6 -12 Z"
                fill="url(#sensorCone)"
                opacity="0.8"
              />

              {/* Robot Body Shadow */}
              <circle cx="0" cy="0" r="3.2" fill="#000000" opacity="0.6" />

              {/* Robot Chassis Base */}
              <rect
                x="-2.2"
                y="-2.8"
                width="4.4"
                height="5.6"
                rx="1"
                fill={robotState.obstacleDetected ? '#b91c1c' : '#0d9488'}
                stroke="#5eead4"
                strokeWidth="0.4"
              />

              {/* Directional Front Indicator */}
              <polygon points="0,-3.4 -1.2,-2.2 1.2,-2.2" fill="#ffffff" />

              {/* Wheels */}
              <rect x="-2.6" y="-2" width="0.6" height="1.6" rx="0.3" fill="#334155" />
              <rect x="2.0" y="-2" width="0.6" height="1.6" rx="0.3" fill="#334155" />
              <rect x="-2.6" y="0.8" width="0.6" height="1.6" rx="0.3" fill="#334155" />
              <rect x="2.0" y="0.8" width="0.6" height="1.6" rx="0.3" fill="#334155" />

              {/* Center Status LED */}
              <circle
                cx="0"
                cy="0"
                r="0.8"
                fill={robotState.obstacleDetected ? '#ef4444' : '#38bdf8'}
                className="animate-pulse"
              />
            </g>
          </svg>
        </div>

        {/* Map Legend Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-slate-950/90 px-4 py-3 text-xs text-slate-400">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-teal-500" />
              Base Station
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-cyan-500" />
              MediBot
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
              Target Room
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" />
              Obstacle Zone
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            *Click any room on the map to inspect or dispatch
          </div>
        </div>
      </div>

      {/* Selected Room Inspector Panel */}
      {selectedRoom && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-teal-400">{selectedRoom.code}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <h4 className="text-sm font-bold text-white">{selectedRoom.name}</h4>
            </div>
            <p className="text-xs text-slate-400 mt-1">{selectedRoom.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenNewDeliveryWithRoom && onOpenNewDeliveryWithRoom(selectedRoom)}
              className="flex items-center gap-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 text-xs font-bold transition-colors cursor-pointer"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Dispatch Medicine Here</span>
            </button>
            <button
              onClick={() => setSelectedRoom(null)}
              className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
