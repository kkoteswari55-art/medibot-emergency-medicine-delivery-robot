import { LanguageCode } from '../types';
import { HOSPITAL_LOCATIONS } from '../data/hospitalMap';

export interface ParsedVoiceCommand {
  rawVoice: string;
  recognizedText: string;
  actionTaken: string;
  actionType:
    | 'dispatch_delivery'
    | 'query_status'
    | 'query_location'
    | 'return_to_base'
    | 'emergency_stop'
    | 'unlock_compartment'
    | 'query_battery'
    | 'unknown';
  targetLocationId?: string;
  targetLocationName?: string;
  language: LanguageCode;
  success: boolean;
}

export const parseVoiceCommand = (
  transcript: string,
  currentLanguage: LanguageCode
): ParsedVoiceCommand => {
  const normalized = transcript.trim().toLowerCase();

  // 1. Emergency Stop Check
  if (
    normalized.includes('emergency stop') ||
    normalized.includes('ఆపు') ||
    normalized.includes('ఎమర్జెన్సీ') ||
    normalized.includes('స్టాప్') ||
    normalized.includes('आपातकालीन') ||
    normalized.includes('रोक') ||
    normalized.includes('நிறுத்து') ||
    normalized.includes('ನಿಲ್ಲಿಸಿ') ||
    normalized.includes('നിർത്തുക') ||
    normalized.includes('थांबा') ||
    normalized.includes('থামুন')
  ) {
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? 'ఎమర్జెన్సీ స్టాప్ యాక్టివేట్ చేయబడింది. అన్ని మోటార్లు ఆగిపోయాయి.'
          : 'Emergency Stop engaged immediately. All drive systems halted.',
      actionType: 'emergency_stop',
      language: currentLanguage,
      success: true,
    };
  }

  // 2. Return to Base
  if (
    normalized.includes('return to base') ||
    normalized.includes('go back') ||
    normalized.includes('base station') ||
    normalized.includes('బేస్') ||
    normalized.includes('తిరిగి') ||
    normalized.includes('తిప్పి') ||
    normalized.includes('वापस') ||
    normalized.includes('बेस') ||
    normalized.includes('நிலையம் திரும்பு') ||
    normalized.includes('ಬೇಸ್‌ಗೆ') ||
    normalized.includes('ബേസിലേക്ക്') ||
    normalized.includes('परता') ||
    normalized.includes('ফিরে যাও')
  ) {
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? 'రోబోట్ సెంట్రల్ ఫార్మసీ బేస్ డాక్‌కు తిరిగి ప్రయాణం ప్రారంభించింది.'
          : 'Routing MediBot back to Central Pharmacy Base Dock 01.',
      actionType: 'return_to_base',
      language: currentLanguage,
      success: true,
    };
  }

  // 3. Where is the robot? / Location Query
  if (
    normalized.includes('where is the robot') ||
    normalized.includes('where is') ||
    normalized.includes('location') ||
    normalized.includes('ఎక్కడ') ||
    normalized.includes('ఎక్కడుంది') ||
    normalized.includes('कहां') ||
    normalized.includes('கிடக்கிறது') ||
    normalized.includes('ಎಲ್ಲಿದೆ') ||
    normalized.includes('എവിടെ') ||
    normalized.includes('कुठे') ||
    normalized.includes('কোথায়')
  ) {
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? 'రోబోట్ ప్రస్తుత లొకేషన్ వివరాలు స్క్రీన్‌పై చూపించబడ్డాయి మరియు వాయిస్ ద్వారా చదవబడ్డాయి.'
          : 'Current GPS & indoor coordinates retrieved and displayed on live tracking floor plan.',
      actionType: 'query_location',
      language: currentLanguage,
      success: true,
    };
  }

  // 4. Robot Status
  if (
    normalized.includes('status') ||
    normalized.includes('cheppu') ||
    normalized.includes('స్టేటస్') ||
    normalized.includes('చెప్పు') ||
    normalized.includes('స్థితి') ||
    normalized.includes('स्थिति बताओ') ||
    normalized.includes('നില') ||
    normalized.includes('অবস্থা')
  ) {
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? 'రోబోట్ సిస్టమ్ ఆరోగ్యం, మోటార్లు మరియు సెన్సార్ల స్థితి సమాచారం పొందబడింది.'
          : 'Telemetry check executed: System Online, sensors operating normally.',
      actionType: 'query_status',
      language: currentLanguage,
      success: true,
    };
  }

  // 5. Battery Status
  if (
    normalized.includes('battery') ||
    normalized.includes('charge') ||
    normalized.includes('బ్యాటరీ') ||
    normalized.includes('बैटरी') ||
    normalized.includes('பேட்டரி') ||
    normalized.includes('ಬ್ಯಾಟರಿ') ||
    normalized.includes('ബാറ്ററി')
  ) {
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? 'బ్యాటరీ స్థాయి మరియు వోల్టేజ్ వివరాలు ప్రదర్శించబడ్డాయి.'
          : 'Battery capacity and cell telemetry readout displayed.',
      actionType: 'query_battery',
      language: currentLanguage,
      success: true,
    };
  }

  // 6. Unlock Compartment
  if (
    normalized.includes('unlock') ||
    normalized.includes('open') ||
    normalized.includes('కంపార్ట్మెంట్') ||
    normalized.includes('తెరువు') ||
    normalized.includes('खोलो') ||
    normalized.includes('திற') ||
    normalized.includes('ತೆರೆ') ||
    normalized.includes('തുറക്കുക') ||
    normalized.includes('उघडा') ||
    normalized.includes('খুলুন')
  ) {
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? 'మెడిసిన్ కంపార్ట్‌మెంట్ అన్‌లాక్ చేయబడింది. మందులను తీసుకోవచ్చు.'
          : 'Medicine hatch unlocked via secure servo latch release.',
      actionType: 'unlock_compartment',
      language: currentLanguage,
      success: true,
    };
  }

  // 7. Send Medicine to Room / Destination Dispatch
  // Detect room numbers: 101, 102, 103, 104, 201, 202, 203, icu, lab
  let matchedLocation = HOSPITAL_LOCATIONS.find(
    (loc) => loc.id !== 'base-dock-01' && normalized.includes(loc.code.toLowerCase())
  );

  if (!matchedLocation) {
    if (normalized.includes('101') || normalized.includes('room 101') || normalized.includes('రూమ్ 101')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-101');
    } else if (normalized.includes('102') || normalized.includes('icu')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-102');
    } else if (normalized.includes('103') || normalized.includes('cardio')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-103');
    } else if (normalized.includes('104') || normalized.includes('trauma')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-104');
    } else if (normalized.includes('201') || normalized.includes('pediatric')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-201');
    } else if (normalized.includes('202') || normalized.includes('ot') || normalized.includes('operation')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-202');
    } else if (normalized.includes('203') || normalized.includes('ward')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'room-203');
    } else if (normalized.includes('lab') || normalized.includes('blood')) {
      matchedLocation = HOSPITAL_LOCATIONS.find((l) => l.id === 'lab-blood-bank');
    }
  }

  if (
    matchedLocation ||
    normalized.includes('send') ||
    normalized.includes('పంపించు') ||
    normalized.includes('పంపు') ||
    normalized.includes('भेजो') ||
    normalized.includes('அனுப்பு') ||
    normalized.includes('ಕಳುಹಿಸಿ') ||
    normalized.includes('അയക്കുക') ||
    normalized.includes('पाठवा') ||
    normalized.includes('পাঠাও')
  ) {
    const target = matchedLocation || HOSPITAL_LOCATIONS[1]; // default to Room 101
    return {
      rawVoice: transcript,
      recognizedText: transcript,
      actionTaken:
        currentLanguage === 'te'
          ? `అత్యవసర ఔషధ డెలివరీ ప్రారంభమైంది. మెడిబోట్ ${target.name} కి బయలుదేరింది.`
          : `Medicine delivery initiated. MediBot dispatched to ${target.name}.`,
      actionType: 'dispatch_delivery',
      targetLocationId: target.id,
      targetLocationName: target.name,
      language: currentLanguage,
      success: true,
    };
  }

  // Fallback unrecognized command
  return {
    rawVoice: transcript,
    recognizedText: transcript,
    actionTaken:
      currentLanguage === 'te'
        ? 'కమాండ్ సరిగ్గా అర్థం కాలేదు. దయచేసి ముందే నిర్ణయించిన కమాండ్లను మాట్లాడండి.'
        : 'Command not recognized. Please use standard hospital dispatch or status commands.',
    actionType: 'unknown',
    language: currentLanguage,
    success: false,
  };
};
