import React, { useState, useEffect } from 'react';
import { useRobot } from '../context/RobotContext';
import {
  Cpu,
  Radio,
  Terminal,
  Layers,
  CheckCircle,
  Copy,
  Wifi,
  Zap,
  Cable,
} from 'lucide-react';

export const HardwareIntegrationModal: React.FC = () => {
  const { t, robotState } = useRobot();
  const [logs, setLogs] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Simulate realistic 115200 Baud ESP32 Serial Telemetry Stream
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toISOString().substring(11, 23);
      const jsonTelemetry = JSON.stringify({
        ts: timestamp,
        node: 'ESP32_WROOM_32D',
        x: +robotState.currentPosition.x.toFixed(1),
        y: +robotState.currentPosition.y.toFixed(1),
        heading: robotState.headingDeg,
        sonar_f: robotState.sensors.ultrasonicFrontCm,
        sonar_l: robotState.sensors.ultrasonicLeftCm,
        sonar_r: robotState.sensors.ultrasonicRightCm,
        temp_c: robotState.sensors.medicineBoxTempC,
        batt_pct: Math.round(robotState.batteryPercentage),
        v_in: robotState.sensors.voltageV,
        status: robotState.deliveryStatus,
        estop: robotState.emergencyStopActivated ? 1 : 0,
        door_lock: robotState.sensors.compartmentLocked ? 1 : 0,
      });

      setLogs((prev) => [
        `[UART0:115200] ${jsonTelemetry}`,
        ...prev.slice(0, 19),
      ]);
    }, 1500);

    return () => clearInterval(interval);
  }, [robotState]);

  const copySampleArduinoSketch = () => {
    const sketch = `// MediBot ESP32 Hardware Firmware (Tech Expo Prototype)
#include <WiFi.h>
#include <ESP32Servo.h>

#define TRIG_PIN 5
#define ECHO_PIN 18
#define MOTOR_ENA 14
#define MOTOR_IN1 27
#define MOTOR_IN2 26
#define MOTOR_ENB 32
#define MOTOR_IN3 25
#define MOTOR_IN4 33
#define SERVO_PIN 19
#define BATTERY_ADC 34

Servo hatchLock;

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(MOTOR_ENA, OUTPUT);
  pinMode(MOTOR_IN1, OUTPUT);
  pinMode(MOTOR_IN2, OUTPUT);
  hatchLock.attach(SERVO_PIN);
  hatchLock.write(0); // Locked
  Serial.println("MediBot ESP32 Initialized. Ready for telemetry.");
}

void loop() {
  // Ultrasonic pulse
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  long dur = pulseIn(ECHO_PIN, HIGH, 30000);
  int distCm = dur * 0.034 / 2;
  
  if (distCm > 0 && distCm < 30) {
    // Collision Stop
    analogWrite(MOTOR_ENA, 0);
    analogWrite(MOTOR_ENB, 0);
    Serial.println("{\\"alert\\":\\"OBSTACLE\\",\\"dist\\":" + String(distCm) + "}");
  }
  delay(100);
}`;
    navigator.clipboard.writeText(sketch);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <Cpu className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-sans">{t.hardwareTitle}</h3>
              <p className="text-xs text-slate-400">{t.hardwareSubtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Simulation Mode ACTIVE</span>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Pinout Architecture & Serial Monitor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architecture & Pinout Reference */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cable className="h-4 w-4 text-teal-400" />
              <h4 className="text-sm font-bold text-white font-sans">{t.esp32Pinout}</h4>
            </div>
            <button
              onClick={copySampleArduinoSketch}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
            >
              <Copy className="h-3 w-3" />
              <span>{isCopied ? 'Copied Sketch!' : 'Copy Arduino C++'}</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Component 1 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">ESP32-WROOM-32D (Main Compute Node)</span>
                <span className="font-mono text-cyan-300">240MHz Dual-Core</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Handles Wi-Fi WebSockets, path integration, radar filtering, and PWM actuation.
              </p>
            </div>

            {/* Component 2 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">L298N Dual H-Bridge Motor Driver</span>
                <span className="font-mono text-amber-300">GPIO 14, 27, 26, 25, 33, 32</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Drives two 12V-24V high-torque planetary geared DC motors with optical encoders.
              </p>
            </div>

            {/* Component 3 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">HC-SR04 Ultrasonic + VL53L0X LiDAR</span>
                <span className="font-mono text-emerald-300">GPIO 5 (Trig), 18 (Echo), I2C</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Provides 360° collision envelope with real-time distance stopping within &lt;30cm.
              </p>
            </div>

            {/* Component 4 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">SG90 / MG996R Medicine Latch Servo</span>
                <span className="font-mono text-indigo-300">GPIO 19 (PWM Timer 0)</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Electronic lock keeping temperature-sensitive pharmaceuticals sealed until verified.
              </p>
            </div>

            {/* Component 5 */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white">LiFePO4 24V Battery & DS18B20 Temp</span>
                <span className="font-mono text-teal-300">GPIO 34 (ADC1), GPIO 4 (OneWire)</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                Monitors cold-chain vaccine/insulin refrigeration temperature between 2°C and 8°C.
              </p>
            </div>
          </div>
        </div>

        {/* Live Serial / Telemetry Stream Monitor */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white font-sans">{t.telemetryStream}</h4>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE RX/TX</span>
            </div>
          </div>

          <div className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-3 font-mono text-[11px] text-slate-300 overflow-y-auto max-h-[360px] space-y-1.5">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('ESTOP:1') || log.includes('OBSTACLE')
                    ? 'text-rose-400'
                    : idx === 0
                    ? 'text-cyan-300'
                    : 'text-slate-400'
                }
              >
                {log}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Baud Rate: 115200</span>
            <span>Protocol: WebSocket JSON Stream</span>
            <span>Port: /dev/ttyUSB0 (ESP32)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
