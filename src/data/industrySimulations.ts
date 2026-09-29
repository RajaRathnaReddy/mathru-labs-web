export type SimulationMessage = {
  from: 'customer' | 'ai' | 'system';
  text: string;
  time: string;
};

export type SimulationAttachment = {
  type: 'pdf' | 'image';
  name: string;
  size: string;
  badge: string;
  downloadLabel?: string;
  attachAtStepIndex: number;
};

export type IndustrySimulation = {
  id: string;
  industryName: string;
  category: string;
  title: string;
  subtitle: string;
  brandName: string;
  brandInitials: string;
  brandColor: string;
  accentHue: number;
  avatarGradient: string;
  messages: SimulationMessage[];
  attachment?: SimulationAttachment;
  securityNotice?: string;
};

export const INDUSTRY_SIMULATIONS: Record<string, IndustrySimulation> = {
  'diagnostic-labs': {
    id: 'diagnostic-labs',
    industryName: 'Diagnostic Centres & Labs',
    category: 'Healthcare & Wellness',
    title: 'A patient journey, automated',
    subtitle: 'Watch how a simple WhatsApp message triggers an entire workflow — from home booking to automated LIS report delivery.',
    brandName: 'Sunrise Diagnostics',
    brandInitials: 'SD',
    brandColor: '#14b8a6',
    accentHue: 168,
    avatarGradient: 'from-teal to-emerald-400',
    securityNotice: '🔒 Encrypted LIS session. No real patient data is used in this demo.',
    messages: [
      {
        from: 'customer',
        text: "Hi, I'd like to book a Complete Blood Count (CBC) home test for tomorrow morning.",
        time: '9:02 AM',
      },
      {
        from: 'ai',
        text: 'Good morning! I have reserved your home sample collection for tomorrow at 8:30 AM with Sunrise Diagnostics. Please fast for 8-10 hours before the test. Reply OK to confirm.',
        time: '9:02 AM',
      },
      {
        from: 'customer',
        text: 'OK, confirmed.',
        time: '9:03 AM',
      },
      {
        from: 'ai',
        text: 'Confirmed! Phlebotomist Ramesh K. is assigned with Barcode kit #SR-8842. You will receive a reminder tonight at 9 PM.',
        time: '9:03 AM',
      },
      {
        from: 'system',
        text: '⏰ Reminder: Phlebotomist arrives tomorrow at 8:30 AM. Fasting begins at midnight. — Sunrise Diagnostics',
        time: '9:00 PM',
      },
      {
        from: 'system',
        text: 'Sample collected & verified at central lab. Your CBC report is ready and verified by Dr. Arisetti. Full digital report attached below.',
        time: '1:15 PM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'CBC_Report_Sunrise_SR8842.pdf',
      size: '142 KB • 2 pages',
      badge: 'PDF',
      downloadLabel: 'Verified Lab Report',
      attachAtStepIndex: 5,
    },
  },

  'hospitals-clinics': {
    id: 'hospitals-clinics',
    industryName: 'Hospitals & Clinics',
    category: 'Healthcare & Wellness',
    title: 'An OPD patient journey, automated',
    subtitle: 'See how appointment booking, doctor queue live tokens, and digital prescriptions flow seamlessly without waiting in line.',
    brandName: 'CarePoint Multi-Specialty',
    brandInitials: 'CP',
    brandColor: '#06b6d4',
    accentHue: 174,
    avatarGradient: 'from-cyan-400 to-blue-500',
    securityNotice: '🔒 HIPAA & ABDM Compliant EHR Data Sync.',
    messages: [
      {
        from: 'customer',
        text: 'Hello, I need an appointment with Cardiologist Dr. Rao this Thursday afternoon.',
        time: '10:15 AM',
      },
      {
        from: 'ai',
        text: 'Hello! Dr. Rao has open consultation slots on Thursday at 3:30 PM and 4:15 PM at OPD Tower B. Which slot works best for you?',
        time: '10:15 AM',
      },
      {
        from: 'customer',
        text: '3:30 PM please.',
        time: '10:16 AM',
      },
      {
        from: 'ai',
        text: 'Slot confirmed! Your live OPD Token is #14. You will get live queue updates so you can arrive 10 mins before your turn.',
        time: '10:16 AM',
      },
      {
        from: 'system',
        text: '🚦 Live Queue Alert: Token #12 is currently in consultation with Dr. Rao. Please proceed to Room 204.',
        time: '3:20 PM',
      },
      {
        from: 'system',
        text: 'Consultation completed. Dr. Rao has issued your digital prescription and follow-up guidance. Full prescription attached below.',
        time: '3:55 PM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'DrRao_Prescription_CarePoint.pdf',
      size: '198 KB • Signed',
      badge: 'Rx',
      downloadLabel: 'Digital Prescription',
      attachAtStepIndex: 5,
    },
  },

  'real-estate-agencies': {
    id: 'real-estate-agencies',
    industryName: 'Real Estate & Properties',
    category: 'Real Estate & Construction',
    title: 'A homebuyer journey, automated',
    subtitle: 'Watch how an inbound ad inquiry is instantly qualified, scheduled for an agent site visit, and delivered a 3D brochure.',
    brandName: 'Apex Living & Realty',
    brandInitials: 'AL',
    brandColor: '#f59e0b',
    accentHue: 35,
    avatarGradient: 'from-amber-400 to-orange-500',
    securityNotice: '🔒 Verified RERA Agent CRM Integration.',
    messages: [
      {
        from: 'customer',
        text: 'Hi, I saw your Instagram ad for the 3 BHK luxury residences at Emerald Heights. Are units still available?',
        time: '11:20 AM',
      },
      {
        from: 'ai',
        text: 'Hello! Yes, Phase 2 east-facing 3 BHK units (1,850 sq.ft) are currently available starting at ₹1.45 Cr. Would you like to view the floor plans and schedule a private site visit this weekend?',
        time: '11:20 AM',
      },
      {
        from: 'customer',
        text: 'Yes, Sunday at 11 AM works for my family.',
        time: '11:22 AM',
      },
      {
        from: 'ai',
        text: 'Wonderful! Site visit booked for Sunday 11:00 AM with Senior Relationship Manager Mr. Vikram. We have sent the location PIN and digital brochure.',
        time: '11:22 AM',
      },
      {
        from: 'system',
        text: '📍 Site Visit Pass Confirmed: Gate Access Code #EH-992. Valet parking reserved for your vehicle.',
        time: '11:23 AM',
      },
      {
        from: 'system',
        text: 'Here is the complete project walkthrough, floor plans, and festive payment schedule breakdown.',
        time: '11:24 AM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'Emerald_Heights_3BHK_Brochure.pdf',
      size: '3.4 MB • 12 pages',
      badge: 'PDF',
      downloadLabel: 'Project Brochure & Plans',
      attachAtStepIndex: 5,
    },
  },

  'banks-nbfcs': {
    id: 'banks-nbfcs',
    industryName: 'Banks, NBFCs & Lending',
    category: 'Finance & Professional',
    title: 'A loan applicant journey, automated',
    subtitle: 'See instant WhatsApp eligibility checks, automated document collection, and rapid pre-approved sanction letter generation.',
    brandName: 'BlueRock Capital',
    brandInitials: 'BC',
    brandColor: '#3b82f6',
    accentHue: 220,
    avatarGradient: 'from-blue-500 to-indigo-600',
    securityNotice: '🔒 Bank-grade 256-bit encryption. RBI & NBFC regulatory compliance.',
    messages: [
      {
        from: 'customer',
        text: 'Hi, I want to check my eligibility for a ₹25 Lakh business expansion loan.',
        time: '2:10 PM',
      },
      {
        from: 'ai',
        text: 'Hello! We can evaluate your business loan eligibility in under 2 minutes. Please share your registered business GSTIN or PAN to begin.',
        time: '2:10 PM',
      },
      {
        from: 'customer',
        text: '36AABCU9603R1ZM',
        time: '2:11 PM',
      },
      {
        from: 'ai',
        text: 'Great news! Based on your GST filing history and bureau score, your enterprise is pre-approved for up to ₹32,00,000 at 9.85% p.a. for a 36-month tenure. Would you like to review the sanction terms?',
        time: '2:12 PM',
      },
      {
        from: 'customer',
        text: 'Yes please send sanction terms.',
        time: '2:13 PM',
      },
      {
        from: 'system',
        text: '🎉 Congratulations! Your pre-approved loan sanction letter is ready. Review the disbursal schedule and interest rate breakdown attached below.',
        time: '2:14 PM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'BlueRock_Loan_Sanction_Letter.pdf',
      size: '220 KB • Pre-Approved',
      badge: 'PDF',
      downloadLabel: 'Sanction Letter',
      attachAtStepIndex: 5,
    },
  },

  'automobile-dealers': {
    id: 'automobile-dealers',
    industryName: 'Automobile & Service Centers',
    category: 'Retail & Commerce',
    title: 'A vehicle service journey, automated',
    subtitle: 'From automated periodic service alerts to digital job cards, real-time parts approval, and contactless gatepass delivery.',
    brandName: 'DriveLine Motors',
    brandInitials: 'DL',
    brandColor: '#ea580c',
    accentHue: 25,
    avatarGradient: 'from-orange-500 to-red-500',
    securityNotice: '🔒 Authorized OEM Service DMS Integration.',
    messages: [
      {
        from: 'system',
        text: '🚗 Periodic Service Due: Your Hyundai Creta (TS 09 EZ 4022) is due for its 20,000 km general service. Reply 1 to book doorstep pickup, or 2 for service center drop.',
        time: '9:30 AM',
      },
      {
        from: 'customer',
        text: '1',
        time: '9:32 AM',
      },
      {
        from: 'ai',
        text: 'Doorstep pickup scheduled for tomorrow at 9:00 AM. Driver Suresh will arrive with digital inspection checklist. Any specific issues you want inspected?',
        time: '9:33 AM',
      },
      {
        from: 'customer',
        text: 'Slight brake squeal at low speed.',
        time: '9:34 AM',
      },
      {
        from: 'ai',
        text: 'Noted! Added to digital job card #DL-4819. Technician will inspect brake pads and send photos for your approval.',
        time: '9:35 AM',
      },
      {
        from: 'system',
        text: '✅ Service completed & water wash done. Brake pads cleaned. Your digital gatepass & invoice are ready below. Car is en route to your home.',
        time: '4:45 PM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'Service_Invoice_Gatepass_DL4819.pdf',
      size: '280 KB • Paid',
      badge: 'PDF',
      downloadLabel: 'Invoice & Gatepass',
      attachAtStepIndex: 5,
    },
  },

  'gyms-fitness': {
    id: 'gyms-fitness',
    industryName: 'Gyms & Fitness Centers',
    category: 'Healthcare & Wellness',
    title: 'A fitness member journey, automated',
    subtitle: 'Watch automated trial booking, instant digital QR access pass generation, workout plan delivery, and renewal alerts.',
    brandName: 'FitLife Studio',
    brandInitials: 'FL',
    brandColor: '#f97316',
    accentHue: 38,
    avatarGradient: 'from-amber-500 to-rose-500',
    securityNotice: '🔒 Biometric & Turnstile Access API Sync.',
    messages: [
      {
        from: 'customer',
        text: 'Hi, I want to take a trial workout session tomorrow evening for strength training.',
        time: '4:00 PM',
      },
      {
        from: 'ai',
        text: 'Awesome! We have a complimentary 1-day VIP pass for tomorrow at 6:30 PM with Senior Trainer Karan. Would you like to confirm?',
        time: '4:01 PM',
      },
      {
        from: 'customer',
        text: 'Yes please, 6:30 PM is perfect.',
        time: '4:01 PM',
      },
      {
        from: 'ai',
        text: 'You are all set! Your temporary QR turnstile pass is generated below. Simply scan this at the reception turnstiles on arrival.',
        time: '4:02 PM',
      },
      {
        from: 'system',
        text: '🏋️ Workout Completed: Great session with Coach Karan! Your biometric metrics: 540 kcal burned. Attached is your starter nutrition guide.',
        time: '7:45 PM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'FitLife_Starter_Nutrition_Plan.pdf',
      size: '1.2 MB • High Protein',
      badge: 'PDF',
      downloadLabel: 'Nutrition & Workout Plan',
      attachAtStepIndex: 4,
    },
  },

  'pharmacy': {
    id: 'pharmacy',
    industryName: 'Retail & Chain Pharmacies',
    category: 'Healthcare & Wellness',
    title: 'A pharmacy refill journey, automated',
    subtitle: 'From WhatsApp prescription photo upload to automated stock reservation, rider dispatch, and chronic refill recall.',
    brandName: 'MediQuick Care',
    brandInitials: 'MQ',
    brandColor: '#10b981',
    accentHue: 155,
    avatarGradient: 'from-emerald-400 to-teal-600',
    securityNotice: '🔒 Scheduled Drug & Pharmacist Verification Protocol.',
    messages: [
      {
        from: 'customer',
        text: 'Hi, I need my monthly refill for Telmisartan 40mg and Glycomet GP1 (30 tablets each).',
        time: '11:00 AM',
      },
      {
        from: 'ai',
        text: 'Hello! Both medicines are in stock at our Jubilee Hills branch. Total amount is ₹480 (including 15% chronic refill discount). Would you like doorstep delivery?',
        time: '11:01 AM',
      },
      {
        from: 'customer',
        text: 'Yes, deliver to Flat 402, Green Meadows.',
        time: '11:02 AM',
      },
      {
        from: 'ai',
        text: 'Confirmed! Delivery Rider Anil is dispatched with tamper-evident packaging. ETA: 35 minutes.',
        time: '11:02 AM',
      },
      {
        from: 'system',
        text: '📦 Delivered successfully! We have automatically scheduled your next monthly refill reminder for the 28th of next month.',
        time: '11:42 AM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'MediQuick_Invoice_RefillSchedule.pdf',
      size: '160 KB • GST Compliant',
      badge: 'PDF',
      downloadLabel: 'Tax Invoice & Refill Pass',
      attachAtStepIndex: 4,
    },
  },

  'logistics-transport': {
    id: 'logistics-transport',
    industryName: 'Logistics & Fleet Transport',
    category: 'Logistics & Manufacturing',
    title: 'A freight booking journey, automated',
    subtitle: 'Watch instant docket generation, live GPS truck tracking alerts, and automated digital proof of delivery (POD).',
    brandName: 'SwiftFreight Express',
    brandInitials: 'SF',
    brandColor: '#0ea5e9',
    accentHue: 190,
    avatarGradient: 'from-sky-400 to-blue-600',
    securityNotice: '🔒 GPS Telematics & E-Way Bill API sync.',
    messages: [
      {
        from: 'customer',
        text: 'Docket #SF-9042: Has the 14-pallet industrial shipment departed Mumbai hub for Bengaluru?',
        time: '8:45 AM',
      },
      {
        from: 'ai',
        text: 'Yes! Truck NL-01-A-8821 departed Mumbai terminal at 6:15 AM today. Current location: Pune Expressway (KM 84). Estimated arrival in Bengaluru is tomorrow 5:30 AM.',
        time: '8:46 AM',
      },
      {
        from: 'customer',
        text: 'Please share the live GPS tracking link.',
        time: '8:47 AM',
      },
      {
        from: 'ai',
        text: 'Here is your encrypted telematics link: track.swiftfreight.com/live/SF-9042. Temperature sensors indicate cargo hold is stable at 22°C.',
        time: '8:47 AM',
      },
      {
        from: 'system',
        text: '✅ Consignment delivered at Bengaluru Distribution Warehouse. Receiver signature and stamped Proof of Delivery (POD) attached below.',
        time: '6:02 AM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: 'Proof_Of_Delivery_POD_SF9042.pdf',
      size: '310 KB • Signed & Stamped',
      badge: 'POD',
      downloadLabel: 'Signed Proof of Delivery',
      attachAtStepIndex: 4,
    },
  },
};

/**
 * Returns a simulation for an industry ID, or a smart synthesized industry simulation
 * for any of the 25 industries so that EVERY industry has an authentic interactive journey.
 */
export function getSimulationForIndustry(industryId: string, fallbackName?: string): IndustrySimulation {
  if (INDUSTRY_SIMULATIONS[industryId]) {
    return INDUSTRY_SIMULATIONS[industryId];
  }

  // Synthesize tailored simulation for any other industry
  const name = fallbackName || 'Custom Business';
  return {
    id: industryId,
    industryName: name,
    category: 'Business Operations',
    title: `A ${name.toLowerCase()} journey, automated`,
    subtitle: `Experience how WhatsApp automation streamlines client intake, operational scheduling, and outcome delivery for ${name}.`,
    brandName: `${name.split(' ')[0]} AI Assistant`,
    brandInitials: name.slice(0, 2).toUpperCase(),
    brandColor: '#14b8a6',
    accentHue: 170,
    avatarGradient: 'from-amber to-teal',
    securityNotice: '🔒 Enterprise End-to-End Encryption.',
    messages: [
      {
        from: 'customer',
        text: `Hi, I want to inquire about services for ${name} and get a quick quotation.`,
        time: '10:00 AM',
      },
      {
        from: 'ai',
        text: `Hello! Welcome to our automated assistant. We have recorded your service request. Let me gather a few quick details to prepare your custom solution.`,
        time: '10:01 AM',
      },
      {
        from: 'customer',
        text: 'Great, please proceed with standard onboarding.',
        time: '10:02 AM',
      },
      {
        from: 'ai',
        text: `Confirmed! Your workflow ticket #ML-${Math.floor(1000 + Math.random() * 9000)} has been generated and assigned to our operations team.`,
        time: '10:03 AM',
      },
      {
        from: 'system',
        text: `Your service documentation and operational milestone confirmation are attached below.`,
        time: '10:15 AM',
      },
    ],
    attachment: {
      type: 'pdf',
      name: `${name.replace(/\s+/g, '_')}_Service_Docket.pdf`,
      size: '185 KB • Verified',
      badge: 'PDF',
      downloadLabel: 'Service Docket',
      attachAtStepIndex: 4,
    },
  };
}
