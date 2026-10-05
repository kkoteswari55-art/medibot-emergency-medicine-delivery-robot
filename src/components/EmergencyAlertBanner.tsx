import React from 'react';
import { useRobot } from '../context/RobotContext';
import {
  AlertOctagon,
  AlertTriangle,
  BatteryLow,
  ThermometerSnowflake,
  WifiOff,
  ClockAlert,
  ShieldCheck,
  X,
  Bell,
} from 'lucide-react';

export const EmergencyAlertBanner: React.FC = () => {
  const {
    t,
    robotState,
    resetEmergencyStop,
    triggerEmergencyStop,
    alerts,
    clearAlert,
    simulateObstacle,
  } = useRobot();

  // Test emergency triggers for Expo / Demonstration
  const triggerLowBatterySimulation = () => {
    triggerEmergencyStop('Battery Critical (< 12%)');
  };

  const triggerHighTempSimulation = () => {
    triggerEmergencyStop('Cold-Chain Temperature Spike (38.5°C)');
  };

  const triggerCommsFailureSimulation = () => {
    triggerEmergencyStop('ESP32 Wi-Fi Mesh Telemetry Loss');
  };

  const triggerDeliveryTimeoutSimulation = () => {
    triggerEmergencyStop('Recipient Verification Timeout');
  };

  return (
    <div className="space-y-4">
      {/* Critical Emergency Stop Banner */}
      {robotState.emergencyStopActivated && (
        <div className="relative overflow-hidden rounded-2xl border-2 border-rose-500 bg-rose-950/90 p-5 shadow-2xl shadow-rose-950/60 animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-600 text-white shrink-0 shadow-lg">
                <AlertOctagon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-white tracking-wide font-sans">
                  {t.emergencyStopActivated}
                </h3>
                <p className="text-xs text-rose-200 mt-1 max-w-xl">
                  {robotState.emergencyReason
                    ? `Trigger: ${robotState.emergencyReason}. `
                    : ''}
                  {t.emergencyStopDesc}
                </p>
              </div>
            </div>

            <button
              onClick={resetEmergencyStop}
              className="flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-rose-950 px-5 py-2.5 text-xs font-black shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>{t.resumeRobot}</span>
            </button>
          </div>
        </div>
      )}

      {/* Emergency Scenarios Test Strip (For College Tech Expo Judges) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3.5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <Bell className="h-4 w-4 text-teal-400" />
            <span>Emergency Hazard Simulator (Tech Expo Testing Rig)</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Simulate safety interrupts to verify autonomous protection logic
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            onClick={triggerLowBatterySimulation}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 p-2 text-[11px] text-slate-300 transition-colors text-left"
          >
            <BatteryLow className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Low Battery (&lt;20%)</span>
          </button>

          <button
            onClick={simulateObstacle}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 p-2 text-[11px] text-slate-300 transition-colors text-left"
          >
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0" />
            <span>Obstacle Hazard</span>
          </button>

          <button
            onClick={triggerHighTempSimulation}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 p-2 text-[11px] text-slate-300 transition-colors text-left"
          >
            <ThermometerSnowflake className="h-3.5 w-3.5 text-rose-400 shrink-0" />
            <span>High Box Temp</span>
          </button>

          <button
            onClick={triggerCommsFailureSimulation}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 p-2 text-[11px] text-slate-300 transition-colors text-left"
          >
            <WifiOff className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span>ESP32 Comms Fail</span>
          </button>

          <button
            onClick={triggerDeliveryTimeoutSimulation}
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950/60 hover:bg-slate-800 p-2 text-[11px] text-slate-300 transition-colors text-left"
          >
            <ClockAlert className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span>Delivery Timeout</span>
          </button>
        </div>
      </div>

      {/* Active Non-critical Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.slice(0, 3).map((alert) => (
            <div
              key={alert.id}
              className={`flex items-center justify-between rounded-xl border p-3 text-xs backdrop-blur-sm transition-all ${
                alert.type === 'critical'
                  ? 'border-rose-500/40 bg-rose-950/40 text-rose-200'
                  : alert.type === 'warning'
                  ? 'border-amber-500/40 bg-amber-950/40 text-amber-200'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                {alert.type === 'critical' ? (
                  <AlertOctagon className="h-4 w-4 text-rose-400 shrink-0" />
                ) : alert.type === 'warning' ? (
                  <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                ) : (
                  <Bell className="h-4 w-4 text-teal-400 shrink-0" />
                )}
                <div className="truncate">
                  <strong className="font-semibold text-white mr-1.5">{alert.title}:</strong>
                  <span>{alert.message}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 ml-2">
                <span className="text-[10px] text-slate-500 font-mono">{alert.timestamp}</span>
                <button
                  onClick={() => clearAlert(alert.id)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
