import { LocationPoint } from '../types';

export const HOSPITAL_LOCATIONS: LocationPoint[] = [
  {
    id: 'base-dock-01',
    name: 'Central Pharmacy Base Dock 01',
    code: 'BASE',
    x: 12,
    y: 82,
    floor: 'Ground Floor',
    type: 'base',
    description: 'Autonomous charging dock & medical payload loading station'
  },
  {
    id: 'room-101',
    name: 'Room 101 – Emergency Ward',
    code: 'RM-101',
    x: 26,
    y: 22,
    floor: 'Ground Floor - North Wing',
    type: 'room',
    description: 'Emergency acute observation unit & triage bed 1-4'
  },
  {
    id: 'room-102',
    name: 'Room 102 – Intensive Care Unit (ICU-1)',
    code: 'ICU-102',
    x: 48,
    y: 22,
    floor: 'Ground Floor - North Wing',
    type: 'icu',
    description: 'High-dependency intensive critical care bay'
  },
  {
    id: 'room-103',
    name: 'Room 103 – Cardiology CCU',
    code: 'CCU-103',
    x: 70,
    y: 22,
    floor: 'Ground Floor - North Wing',
    type: 'room',
    description: 'Cardiac care telemetry & defibrillator unit'
  },
  {
    id: 'room-104',
    name: 'Room 104 – Trauma Resuscitation',
    code: 'TR-104',
    x: 88,
    y: 22,
    floor: 'Ground Floor - North Wing',
    type: 'room',
    description: 'Emergency polytrauma intervention bay'
  },
  {
    id: 'room-201',
    name: 'Room 201 – Pediatric Care Ward',
    code: 'PED-201',
    x: 34,
    y: 64,
    floor: 'Ground Floor - South Wing',
    type: 'ward',
    description: 'Neonatal & pediatric emergency observation'
  },
  {
    id: 'room-202',
    name: 'Room 202 – Emergency Operation Theater 1',
    code: 'EOT-202',
    x: 58,
    y: 64,
    floor: 'Ground Floor - South Wing',
    type: 'room',
    description: 'Sterile surgical emergency suite'
  },
  {
    id: 'room-203',
    name: 'Room 203 – General Medical Ward',
    code: 'GEN-203',
    x: 78,
    y: 64,
    floor: 'Ground Floor - South Wing',
    type: 'ward',
    description: 'Inpatient recovery & post-op monitoring'
  },
  {
    id: 'lab-blood-bank',
    name: 'Emergency Pathology & Blood Bank',
    code: 'LAB-01',
    x: 88,
    y: 82,
    floor: 'Ground Floor - East Wing',
    type: 'lab',
    description: 'Cross-match blood units & STAT toxicology lab'
  }
];

export const CORRIDOR_NETWORK = {
  // Main spine corridor at y: 44%
  centralSpineY: 44,
  corridorMinX: 12,
  corridorMaxX: 88,
  baseCorridorX: 12,
  bloodBankX: 88,
};

export interface EmergencyMedicineTemplate {
  name: string;
  category: string;
  defaultQty: string;
  standardPriority: 'normal' | 'urgent' | 'critical';
  coldChainRequired: boolean;
  idealTempC: number;
}

export const EMERGENCY_MEDICINES: EmergencyMedicineTemplate[] = [
  {
    name: 'Adrenaline (Epinephrine) 1:1000 Inj',
    category: 'Anaphylaxis / Cardiac Arrest',
    defaultQty: '5 Ampoules (1mg/mL)',
    standardPriority: 'critical',
    coldChainRequired: false,
    idealTempC: 22.0
  },
  {
    name: 'Insulin Glargine Regular 100 IU/mL',
    category: 'Diabetic Ketoacidosis',
    defaultQty: '2 Vials (10mL)',
    standardPriority: 'urgent',
    coldChainRequired: true,
    idealTempC: 4.5
  },
  {
    name: 'Paracetamol IV Infusion 1000mg/100mL',
    category: 'Acute Hyperpyrexia / Analgesic',
    defaultQty: '4 Bottles (100mL)',
    standardPriority: 'normal',
    coldChainRequired: false,
    idealTempC: 23.5
  },
  {
    name: 'Polyvalent Anti-Snake Venom Serum',
    category: 'Toxicology / Emergency Antidote',
    defaultQty: '10 Vials (Lyophilized)',
    standardPriority: 'critical',
    coldChainRequired: true,
    idealTempC: 5.0
  },
  {
    name: 'Nitroglycerin Sublingual Spray 0.4mg',
    category: 'Acute Angina / Myocardial Infarction',
    defaultQty: '1 Metered Canister',
    standardPriority: 'urgent',
    coldChainRequired: false,
    idealTempC: 21.0
  },
  {
    name: 'Atropine Sulfate Inj 0.6mg/mL',
    category: 'Severe Bradycardia / Poisoning',
    defaultQty: '10 Ampoules',
    standardPriority: 'critical',
    coldChainRequired: false,
    idealTempC: 22.0
  },
  {
    name: 'Emergency Trauma Dressing & Hemostatic Gauze',
    category: 'Severe Hemorrhage / Trauma Bay',
    defaultQty: '3 Combat Gauze Packs',
    standardPriority: 'critical',
    coldChainRequired: false,
    idealTempC: 24.0
  },
  {
    name: 'Normal Saline (0.9% NaCl) 500mL IV',
    category: 'Hypovolemic Shock Resuscitation',
    defaultQty: '4 Infusion Bags (500mL)',
    standardPriority: 'urgent',
    coldChainRequired: false,
    idealTempC: 23.0
  }
];
