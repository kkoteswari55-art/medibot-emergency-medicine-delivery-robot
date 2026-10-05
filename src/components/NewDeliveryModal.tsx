import React, { useState, useEffect } from 'react';
import { useRobot } from '../context/RobotContext';
import { HOSPITAL_LOCATIONS, EMERGENCY_MEDICINES } from '../data/hospitalMap';
import { LocationPoint, DeliveryPriority } from '../types';
import {
  X,
  Send,
  Package,
  ShieldAlert,
  AlertCircle,
  Lock,
  Building2,
  User,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

interface NewDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedRoom?: LocationPoint | null;
}

export const NewDeliveryModal: React.FC<NewDeliveryModalProps> = ({
  isOpen,
  onClose,
  preselectedRoom,
}) => {
  const { t, dispatchDelivery, language } = useRobot();

  const [medicineName, setMedicineName] = useState('');
  const [quantity, setQuantity] = useState('2 Ampoules');
  const [pickupLocation, setPickupLocation] = useState('Central Pharmacy Base Dock 01');
  const [destinationId, setDestinationId] = useState(
    preselectedRoom ? preselectedRoom.id : 'room-101'
  );
  const [priority, setPriority] = useState<DeliveryPriority>('urgent');
  const [recipientName, setRecipientName] = useState('Nurse Priya / Staff In-Charge');
  const [passcode, setPasscode] = useState('1234');
  const [notes, setNotes] = useState('');
  const [confirmedNotice, setConfirmedNotice] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedRoom) {
      setDestinationId(preselectedRoom.id);
    }
  }, [preselectedRoom]);

  if (!isOpen) return null;

  const handleSelectQuickPick = (item: (typeof EMERGENCY_MEDICINES)[0]) => {
    setMedicineName(item.name);
    setQuantity(item.defaultQty);
    setPriority(item.standardPriority);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!medicineName.trim()) {
      setErrorMsg('Please specify the emergency medicine or supply name.');
      return;
    }
    if (!recipientName.trim()) {
      setErrorMsg('Please enter the recipient nurse or doctor in-charge.');
      return;
    }

    const result = dispatchDelivery({
      medicineName,
      quantity,
      pickupLocation,
      destinationId,
      priority,
      recipientName,
      passcode,
      notes,
    });

    if (result.success) {
      setSuccessBanner(result.message);
      setTimeout(() => {
        setSuccessBanner(null);
        onClose();
      }, 1800);
    } else {
      setErrorMsg(result.message);
    }
  };

  const deliveryRooms = HOSPITAL_LOCATIONS.filter((l) => l.type !== 'base');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white font-sans">{t.newDeliveryTitle}</h3>
            <p className="text-xs text-slate-400">{t.newDeliveryDesc}</p>
          </div>
        </div>

        {/* Success Banner */}
        {successBanner && (
          <div className="mb-5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 p-4 text-emerald-200 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
            <div className="text-sm font-semibold">{successBanner}</div>
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 rounded-xl bg-rose-500/20 border border-rose-500/40 p-3 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Quick Emergency Medicine Picks */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-teal-400" />
            <span>{t.quickMedicinePicks}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {EMERGENCY_MEDICINES.slice(0, 6).map((med, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectQuickPick(med)}
                className="text-left rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 transition-all hover:border-teal-500/50"
              >
                <span className="font-medium">{med.name.split(' ')[0]}</span>{' '}
                <span className="text-[10px] text-slate-400">({med.category.split('/')[0].trim()})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Medicine Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.medicineName} *
              </label>
              <input
                type="text"
                required
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
                placeholder={t.medicinePlaceholder}
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.quantity} *
              </label>
              <input
                type="text"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 5 Vials, 1 Strip, 500 mL"
                className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Pickup Location */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.pickupLocation}
              </label>
              <div className="flex items-center rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-slate-300">
                <Building2 className="h-4 w-4 text-teal-400 mr-2 shrink-0" />
                <span className="truncate">{pickupLocation}</span>
              </div>
            </div>

            {/* Destination Room */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.destinationRoom} *
              </label>
              <select
                value={destinationId}
                onChange={(e) => setDestinationId(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-teal-500 focus:outline-none cursor-pointer"
              >
                {deliveryRooms.map((room) => (
                  <option key={room.id} value={room.id} className="bg-slate-900 text-slate-100">
                    {room.name} ({room.floor})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Priority Selection (Segmented buttons) */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {t.priorityLevel}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPriority('normal')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  priority === 'normal'
                    ? 'bg-slate-700/80 border-slate-500 text-white'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.priorityNormal}
              </button>
              <button
                type="button"
                onClick={() => setPriority('urgent')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  priority === 'urgent'
                    ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.priorityUrgent}
              </button>
              <button
                type="button"
                onClick={() => setPriority('critical')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  priority === 'critical'
                    ? 'bg-rose-500/20 border-rose-500/60 text-rose-300 shadow-md shadow-rose-950'
                    : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t.priorityCritical}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Recipient Name */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.receiverName} *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder={t.receiverPlaceholder}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-teal-500 focus:outline-none pl-9"
                />
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>

            {/* 4-Digit Security PIN */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {t.securityPin}
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={4}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white font-mono tracking-widest focus:border-teal-500 focus:outline-none pl-9"
                />
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Safety Rule Notice */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-3 flex items-start gap-2.5 text-xs text-amber-300/90">
            <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Medical Protocol Adherence:</span> {t.safetyNotice}
            </div>
          </div>

          {/* Submit / Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-2.5 text-sm font-extrabold shadow-lg shadow-teal-500/20 transition-all active:scale-95 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>{t.sendRobot}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
