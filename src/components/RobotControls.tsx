import React, { useState } from 'react';
import { useRobot } from '../context/RobotContext';
import {
  Play,
  Square,
  Pause,
  RotateCcw,
  AlertOctagon,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Wrench,
  Lock,
  Unlock,
  Sliders,
  ShieldAlert,
  Gauge,
  Zap,
} from 'lucide-react';

export const RobotControls: React.FC = () => {
  const {
    t,
    robotState,
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
  } = useRobot();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const handleUnlockWithPin = () => {
    const success = unlockCompartment(pinInput);
    if (!success) {
      setPinError(true);
      setTimeout(() => setPinError(false), 2000);
    } else {
      setPinInput('');
    }
  };

  const isPaused = robotState.deliveryStatus === 'obstacle_paused';
  const isEnRoute =
    robotState.deliveryStatus === 'en_route_delivery' ||
    robotState.deliveryStatus === 'returning_to_base';

  return (
    <div className="space-y-6">
      {/* Autonomous Mission Controls Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white font-sans">{t.autonomousOperations}</h3>
            <p className="text-xs text-slate-400">High-level autonomous mission dispatch commands</p>
          </div>
          <span className="text-xs font-mono text-cyan-400">STATE: {robotState.deliveryStatus.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Start Mission */}
          <button
            onClick={startMission}
            disabled={robotState.emergencyStopActivated}
            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 p-4 text-xs font-bold text-teal-300 transition-colors disabled:opacity-40"
          >
            <Play className="h-5 w-5 text-teal-400 fill-teal-400/20" />
            <span>{t.btnStart}</span>
          </button>

          {/* Pause / Resume */}
          {isPaused ? (
            <button
              onClick={resumeMission}
              disabled={robotState.emergencyStopActivated}
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 p-4 text-xs font-bold text-cyan-300 transition-colors disabled:opacity-40"
            >
              <Play className="h-5 w-5 text-cyan-400" />
              <span>{t.btnResume}</span>
            </button>
          ) : (
            <button
              onClick={pauseMission}
              disabled={robotState.emergencyStopActivated || !isEnRoute}
              className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 p-4 text-xs font-bold text-slate-200 transition-colors disabled:opacity-40"
            >
              <Pause className="h-5 w-5 text-slate-300" />
              <span>{t.btnPause}</span>
            </button>
          )}

          {/* Stop */}
          <button
            onClick={stopMission}
            disabled={robotState.emergencyStopActivated}
            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 p-4 text-xs font-bold text-slate-200 transition-colors disabled:opacity-40"
          >
            <Square className="h-5 w-5 text-amber-400" />
            <span>{t.btnStop}</span>
          </button>

          {/* Return to Base */}
          <button
            onClick={returnToBase}
            disabled={robotState.emergencyStopActivated}
            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 p-4 text-xs font-bold text-indigo-300 transition-colors disabled:opacity-40"
          >
            <RotateCcw className="h-5 w-5 text-indigo-400" />
            <span>{t.btnReturnBase}</span>
          </button>

          {/* Emergency Stop / Resume */}
          {robotState.emergencyStopActivated ? (
            <button
              onClick={resetEmergencyStop}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 p-4 text-xs font-extrabold text-white shadow-lg transition-transform active:scale-95 animate-pulse"
            >
              <Zap className="h-5 w-5" />
              <span>{t.resetEStop}</span>
            </button>
          ) : (
            <button
              onClick={() => triggerEmergencyStop('Manual Control E-Stop')}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-500 p-4 text-xs font-extrabold text-white shadow-lg shadow-rose-950 transition-transform active:scale-95"
            >
              <AlertOctagon className="h-5 w-5 animate-bounce" />
              <span>{t.emergencyStop}</span>
            </button>
          )}
        </div>
      </div>

      {/* Manual Testing Mode (Clearly Labeled Testing Mode) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Directional Pad */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-amber-400" />
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{t.testingModeLabel}</h4>
                <p className="text-[11px] text-slate-400">{t.testingModeDesc}</p>
              </div>
            </div>

            <button
              onClick={toggleTestingMode}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${
                robotState.isTestingMode
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {robotState.isTestingMode ? 'TESTING ACTIVE' : 'ENABLE TESTING'}
            </button>
          </div>

          {/* D-Pad Layout */}
          <div className="flex flex-col items-center justify-center py-4">
            {/* Forward Button */}
            <button
              disabled={!robotState.isTestingMode || robotState.emergencyStopActivated}
              onClick={() => manualMove('forward')}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 shadow-md transition-all active:scale-95 disabled:opacity-30 mb-2 cursor-pointer"
              title={t.manualForward}
            >
              <ArrowUp className="h-6 w-6" />
            </button>

            {/* Left, Center Rotate, Right */}
            <div className="flex items-center gap-2">
              <button
                disabled={!robotState.isTestingMode || robotState.emergencyStopActivated}
                onClick={() => manualMove('left')}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 shadow-md transition-all active:scale-95 disabled:opacity-30 cursor-pointer"
                title={t.manualLeft}
              >
                <ArrowLeft className="h-6 w-6" />
              </button>

              <button
                disabled={!robotState.isTestingMode || robotState.emergencyStopActivated}
                onClick={() => manualMove('rotate')}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-700 hover:border-teal-400 text-teal-400 transition-all active:scale-95 disabled:opacity-30 cursor-pointer"
                title={t.manualRotate}
              >
                <RotateCw className="h-5 w-5" />
              </button>

              <button
                disabled={!robotState.isTestingMode || robotState.emergencyStopActivated}
                onClick={() => manualMove('right')}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 shadow-md transition-all active:scale-95 disabled:opacity-30 cursor-pointer"
                title={t.manualRight}
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </div>

            {/* Backward Button */}
            <button
              disabled={!robotState.isTestingMode || robotState.emergencyStopActivated}
              onClick={() => manualMove('backward')}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 hover:bg-teal-500 hover:text-slate-950 text-slate-200 shadow-md transition-all active:scale-95 disabled:opacity-30 mt-2 cursor-pointer"
              title={t.manualBackward}
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-2 text-center text-xs text-slate-500">
            {robotState.isTestingMode
              ? 'Testing Mode is ON. D-Pad sends manual PWM pulses to L298N motor drivers.'
              : 'Turn on testing mode to enable manual directional controls.'}
          </div>
        </div>

        {/* Medicine Compartment Hatch Security */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-white font-sans">{t.compartmentControl}</h4>
              <span
                className={`text-xs font-bold ${
                  robotState.sensors.compartmentLocked ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {robotState.sensors.compartmentLocked ? t.compartmentLocked : t.compartmentUnlocked}
              </span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Servo lock SG90 connected to ESP32 GPIO 18. Recipient enters 4-digit PIN to release
              hatch lock and collect medicine.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Recipient Security PIN
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter 4-digit PIN (default: 1234)"
                    className={`w-full rounded-xl border bg-slate-950/80 px-3.5 py-2 text-xs text-white tracking-widest font-mono focus:outline-none ${
                      pinError ? 'border-rose-500 text-rose-300' : 'border-slate-700 focus:border-teal-500'
                    }`}
                  />
                  <button
                    onClick={handleUnlockWithPin}
                    className="rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-4 py-2 text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Unlock
                  </button>
                </div>
                {pinError && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    Incorrect PIN. Please re-enter delivery passcode.
                  </p>
                )}
              </div>

              <div className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 text-xs text-slate-300 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Servo Latch Angle:</span>
                  <span className="font-mono text-cyan-300">
                    {robotState.sensors.compartmentLocked ? '0° (Locked)' : '90° (Released)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Door Reed Switch:</span>
                  <span className="font-mono text-white">
                    {robotState.sensors.compartmentDoorOpen ? 'HIGH (Opened)' : 'LOW (Closed)'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            <button
              onClick={lockCompartment}
              disabled={robotState.sensors.compartmentLocked}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors disabled:opacity-40"
            >
              {t.lockHatch}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
