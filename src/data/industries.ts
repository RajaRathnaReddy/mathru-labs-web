export type WorkflowStep = {
  step: string;
  sublabel: string;
  description: string;
};

export type Industry = {
  id: string;
  name: string;
  category: string;
  accentHue: number;
  icon: string;
  tagline: string;
  badge: string;
  stats: [string, string, string]; // [module count, 'AI-powered', scale tag]
  coreModules: string[];           // 5 core modules
  workflowTitle: string;           // Custom operational workflow name
  workflow: WorkflowStep[];        // 4 tailored, high-impact operational steps
};

export const INDUSTRY_CATEGORIES = [
  'Healthcare & Wellness',
  'Retail & Commerce',
  'Finance & Professional',
  'Real Estate & Construction',
  'Education & Community',
  'Hospitality & Food',
  'Logistics & Manufacturing',
] as const;

export type IndustryCategory = (typeof INDUSTRY_CATEGORIES)[number];

export const INDUSTRIES: Industry[] = [
  // ── HEALTHCARE & WELLNESS ──
  {
    id: 'hospitals-clinics',
    name: 'Hospitals & Clinics',
    category: 'Healthcare & Wellness',
    accentHue: 174,
    icon: 'building-hospital',
    tagline: 'Connect appointment booking, patient queue alerts, and automated follow-ups.',
    badge: 'Full CRM + AI OS',
    stats: ['12 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Patient 360 CRM',
      'Smart Queue & Scheduling',
      'AI Follow-up Agent',
      'Doctor Command Center',
      'Billing & Insurance Engine',
    ],
    workflowTitle: 'Clinical Care & OPD Patient Journey',
    workflow: [
      {
        step: 'Specialty Slot & Triage',
        sublabel: 'WhatsApp OPD Intake',
        description: 'Patient selects specialty; AI triages symptom urgency and locks available doctor slot.',
      },
      {
        step: 'Pre-Visit EHR Sync',
        sublabel: 'Checklist & History',
        description: 'Auto-collects past medical history and sends pre-visit fasting or preparation instructions.',
      },
      {
        step: 'Live Token Queue Push',
        sublabel: 'Real-Time OPD Alerts',
        description: 'Live WhatsApp queue token alerts so patients only step into the clinic when the doctor is ready.',
      },
      {
        step: 'Digital Rx & Care Follow-up',
        sublabel: 'Care Adherence',
        description: 'Automated prescription delivery, post-care check-ins, and scheduled review visit reminders.',
      },
    ],
  },
  {
    id: 'diagnostic-labs',
    name: 'Diagnostic Centres & Labs',
    category: 'Healthcare & Wellness',
    accentHue: 168,
    icon: 'flask',
    tagline: 'Instant lab scheduling, barcode tracking, and automated PDF test report delivery on WhatsApp.',
    badge: 'Full LIS + AI OS',
    stats: ['14 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Patient 360 CRM',
      'Barcode Sample Tracking',
      'LIS Pipeline Dashboard',
      'AI Report Delivery Engine',
      'TAT Command Center',
    ],
    workflowTitle: 'Sample-to-Report Autonomous LIS Pipeline',
    workflow: [
      {
        step: 'Home Sample Booking',
        sublabel: 'Phlebotomist Dispatch',
        description: 'Patient reserves test slot; system optimizes phlebotomist GPS route and sends fasting instructions.',
      },
      {
        step: 'Barcode Vial Ingestion',
        sublabel: 'Analyzer Handshake',
        description: 'Barcoded specimen tubes scanned at accessioning; bidirectional analyzer test runs initiated.',
      },
      {
        step: 'Pathologist Digital Sign-off',
        sublabel: 'QC & Verification',
        description: 'Pathologist reviews flagged values on web command center; approves cryptographically signed PDF.',
      },
      {
        step: 'Automated PDF Delivery',
        sublabel: 'Report & Recall',
        description: 'Secure PDF delivered via WhatsApp in under 4 hours; critical value alerts routed to physician.',
      },
    ],
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    category: 'Healthcare & Wellness',
    accentHue: 155,
    icon: 'pill',
    tagline: 'Automate recurring chronic medication refills, stock checks, and delivery dispatch pings.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-outlet'],
    coreModules: [
      'Prescription & Refill CRM',
      'Stock & Expiry Tracker',
      'AI Reorder Alerts',
      'Delivery Dispatch Dashboard',
      'Loyalty & Offers Engine',
    ],
    workflowTitle: 'Prescription-to-Refill Closed Loop',
    workflow: [
      {
        step: 'Prescription Photo Intake',
        sublabel: 'Digital Rx Upload',
        description: 'Patient sends handwritten prescription photo on WhatsApp; OCR extracts medicine names.',
      },
      {
        step: 'Formulary Stock Check',
        sublabel: 'Inventory & Expiry Audit',
        description: 'Instant warehouse inventory check for batch availability, substitutes, and price calculation.',
      },
      {
        step: 'Rider Delivery Dispatch',
        sublabel: 'Rider ETA Tracking',
        description: 'Delivery rider dispatched with OTP-secured medicine package; live GPS ETA pinged to customer.',
      },
      {
        step: 'Chronic Refill Recall',
        sublabel: '30-Day Automated Reorder',
        description: 'Smart timer alerts patient 5 days before doses run out for seamless one-tap refill confirmation.',
      },
    ],
  },
  {
    id: 'gyms-fitness',
    name: 'Gyms & Fitness Centers',
    category: 'Healthcare & Wellness',
    accentHue: 38,
    icon: 'barbell',
    tagline: 'Streamline member signups, QR attendance, membership renewal alerts, and feedback.',
    badge: 'Full CRM + AI OS',
    stats: ['8 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Member 360 CRM',
      'Attendance & Access Tracker',
      'Renewal Automation Engine',
      'AI Retention Agent',
      'Performance Dashboard',
    ],
    workflowTitle: 'Member Onboarding & Retention Lifecycle',
    workflow: [
      {
        step: 'VIP Trial & Coach Match',
        sublabel: 'Goal Intake',
        description: 'Prospect selects fitness goals; automated scheduling assigns specialized strength/cardio trainer.',
      },
      {
        step: 'Digital QR Turnstile Pass',
        sublabel: 'Biometric Check-in',
        description: 'Member gets a digital WhatsApp QR pass synced with front-desk turnstiles for frictionless entry.',
      },
      {
        step: 'Nutrition & Workout Push',
        sublabel: 'Personalized Coaching',
        description: 'AI sends personalized diet plans, calorie trackers, and weekly workout progression charts.',
      },
      {
        step: 'Automated Renewal Ping',
        sublabel: 'Churn Prevention',
        description: 'Detects attendance drops before membership expiry and triggers tailored renewal incentives.',
      },
    ],
  },
  {
    id: 'salons-spas',
    name: 'Salons & Spas',
    category: 'Healthcare & Wellness',
    accentHue: 320,
    icon: 'sparkles',
    tagline: 'Frictionless stylist slot booking, WhatsApp reminder alerts, and tailored loyalty offers.',
    badge: 'Full CRM + AI OS',
    stats: ['8 modules', 'AI-powered', 'Multi-outlet'],
    coreModules: [
      'Client 360 CRM',
      'Stylist Booking Engine',
      'Service History Tracker',
      'Loyalty & Offers Engine',
      'AI No-show Predictor',
    ],
    workflowTitle: 'Stylist Scheduling & VIP Re-engagement',
    workflow: [
      {
        step: 'Stylist & Service Booking',
        sublabel: 'Interactive Catalog',
        description: 'Client picks favorite stylist and service package through an interactive WhatsApp salon menu.',
      },
      {
        step: 'Chair & Buffer Allocation',
        sublabel: 'Queue Management',
        description: 'Locks salon chair with calculated service buffer times to eliminate customer waiting times.',
      },
      {
        step: 'Smart Reminder & Map PIN',
        sublabel: 'No-Show Reduction',
        description: 'Sends 3-hour pre-service reminder with directions, reducing appointment no-shows by 78%.',
      },
      {
        step: 'Post-Care & Retouch Credits',
        sublabel: 'VIP Loyalty',
        description: 'Sends hair/skin maintenance instructions and invites client for periodic retouch with reward credits.',
      },
    ],
  },

  // ── RETAIL & COMMERCE ──
  {
    id: 'shopping-malls',
    name: 'Shopping Malls',
    category: 'Retail & Commerce',
    accentHue: 45,
    icon: 'building-store',
    tagline: 'Coordinate weekend event promotions, tenant store offers, and automated digital loyalty points.',
    badge: 'Full CRM + AI OS',
    stats: ['10 modules', 'AI-powered', 'Multi-tenant'],
    coreModules: [
      'Visitor CRM',
      'Tenant & Footfall Dashboard',
      'Loyalty & Offers Engine',
      'Event Promotion Automation',
      'AI Foot-traffic Insights',
    ],
    workflowTitle: 'Footfall Engagement & Tenant Loyalty Loop',
    workflow: [
      {
        step: 'Mall Directory & Map QR',
        sublabel: 'Visitor Concierge',
        description: 'Shoppers scan QR at entrance to get store floor maps, parking locator, and brand deals.',
      },
      {
        step: 'Event & Deal Broadcast',
        sublabel: 'Targeted Push Alerts',
        description: 'Automated broadcast alerts for weekend food festivals, seasonal sales, and movie premiers.',
      },
      {
        step: 'Receipt Upload Loyalty',
        sublabel: 'Tenant POS Sync',
        description: 'Shoppers upload store receipts on WhatsApp to claim unified mall rewards and food court coupons.',
      },
      {
        step: 'Feedback & Return Voucher',
        sublabel: 'Post-Visit Incentive',
        description: 'Gathers visitor experience ratings and sends personalized parking vouchers for next weekend.',
      },
    ],
  },
  {
    id: 'supermarkets-grocery',
    name: 'Supermarkets & Grocery',
    category: 'Retail & Commerce',
    accentHue: 142,
    icon: 'shopping-cart',
    tagline: 'Enable WhatsApp grocery ordering, ERP inventory synchronization, and dispatch alerts.',
    badge: 'Full CRM + AI OS',
    stats: ['10 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Customer CRM',
      'Inventory Sync Engine',
      'AI Restock Alerts',
      'Delivery Dispatch Dashboard',
      'Loyalty Points Engine',
    ],
    workflowTitle: 'WhatsApp Grocery Ordering & Fast Dispatch',
    workflow: [
      {
        step: 'Audio/Text List Intake',
        sublabel: 'Smart Cart Parsing',
        description: 'Customer texts or voice-notes grocery list; NLP translates items into exact store inventory SKUs.',
      },
      {
        step: 'Real-Time Inventory Check',
        sublabel: 'Stock & Price Lock',
        description: 'System verifies shelf availability, suggests fresh alternatives for out-of-stock items, and locks prices.',
      },
      {
        step: 'Aisle-Routed Order Picking',
        sublabel: 'Warehouse Batching',
        description: 'Store picker app organizes items by aisle sequence for rapid 10-minute cart packing.',
      },
      {
        step: 'Live Dispatch & Restock Ping',
        sublabel: 'Repeat Basket Trigger',
        description: 'Delivers order with live delivery tracking; prompts automated weekly milk/staple reorder reminders.',
      },
    ],
  },
  {
    id: 'electronics-stores',
    name: 'Electronics & Appliance Stores',
    category: 'Retail & Commerce',
    accentHue: 210,
    icon: 'device-tv',
    tagline: 'Instant product quotation PDFs, purchase confirmations, and annual warranty renewal alerts.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Lead-to-Sale CRM',
      'Quotation & Inventory Engine',
      'AI Warranty Reminder Agent',
      'Service Ticket Dashboard',
      'Sales Command Center',
    ],
    workflowTitle: 'Quotation-to-Warranty Lifecycle',
    workflow: [
      {
        step: 'Instant Catalog Inquiry',
        sublabel: 'Spec & Price Comparison',
        description: 'Customer inquires about appliances; bot delivers comparison sheets, specs, and price quotes.',
      },
      {
        step: '0% EMI Pre-Approval',
        sublabel: 'Instant Financing Check',
        description: 'Automated pre-approval for 0% EMI financing plans with instant digital KYC document upload.',
      },
      {
        step: 'Delivery & Technician Dispatch',
        sublabel: 'Installation Booking',
        description: 'Coordinates appliance delivery and assigns certified installation technician with time slots.',
      },
      {
        step: 'Warranty & AMC Renewal Alert',
        sublabel: 'Post-Sale Service',
        description: 'Sends reminders before warranty expiration with one-click extended AMC renewal booking.',
      },
    ],
  },
  {
    id: 'jewellery-stores',
    name: 'Jewellery Stores',
    category: 'Retail & Commerce',
    accentHue: 42,
    icon: 'diamond',
    tagline: 'Private showroom appointment booking, live gold rate updates, and festive VIP promotions.',
    badge: 'Full CRM + AI OS',
    stats: ['8 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Client 360 CRM',
      'Appointment & Inventory Engine',
      'Festival Offer Automation',
      'AI Anniversary Reminder Agent',
      'Sales Command Center',
    ],
    workflowTitle: 'VIP Lounge Appointment & Gold Advisory',
    workflow: [
      {
        step: 'VIP Lounge Suite Booking',
        sublabel: 'Concierge Scheduling',
        description: 'Client books private showroom suite; selects bridal or everyday collection focus.',
      },
      {
        step: 'Daily Bullion Rate Broadcast',
        sublabel: 'Live Gold Alert',
        description: 'Automated morning WhatsApp broadcast of certified 22K/24K hallmark bullion rates to subscribers.',
      },
      {
        step: '3D CAD Design Approval',
        sublabel: 'Custom Order Tracking',
        description: 'Shares 3D jewellery design renders, hallmarking certificates, and gold weight breakdown.',
      },
      {
        step: 'Anniversary VIP Gifting',
        sublabel: 'Relationship Management',
        description: 'Tracks family celebration dates to deliver personalized curated festive offers and bonus gold coins.',
      },
    ],
  },
  {
    id: 'automobile-dealers',
    name: 'Automobile Dealerships & Service Centers',
    category: 'Retail & Commerce',
    accentHue: 25,
    icon: 'car',
    tagline: 'Automate periodic vehicle service bookings, job-card status updates, and customer feedback.',
    badge: 'Full CRM + AI OS',
    stats: ['10 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Customer 360 CRM',
      'Service Booking Engine',
      'AI Service Reminder Agent',
      'Parts Inventory Tracker',
      'Revenue Command Center',
    ],
    workflowTitle: 'Showroom-to-Workshop Vehicle Lifecycle',
    workflow: [
      {
        step: 'Periodic Service Alert',
        sublabel: 'Pickup Booking Intake',
        description: 'Proactively triggers service due alert based on odometer run; schedules doorstep pickup.',
      },
      {
        step: 'Digital Job Card & Task Allocation',
        sublabel: 'DMS Workshop Sync',
        description: 'Automated vehicle inspection logging, technician task assignment, and parts availability check.',
      },
      {
        step: 'Photo/Video Parts Approval',
        sublabel: 'Transparent WhatsApp Sign-off',
        description: 'Technician shares video of worn brake pads; owner approves repair with one WhatsApp tap.',
      },
      {
        step: 'UPI Invoice & Digital Gatepass',
        sublabel: 'Delivery & Feedback',
        description: 'Automated invoice generation, instant payment link, digital gatepass, and CSI feedback capture.',
      },
    ],
  },

  // ── FINANCE & PROFESSIONAL SERVICES ──
  {
    id: 'banks-nbfcs',
    name: 'Banks, NBFCs & Finance Companies',
    category: 'Finance & Professional',
    accentHue: 220,
    icon: 'building-bank',
    tagline: 'Streamline lead intake, secure digital KYC document collection, and instant loan approvals.',
    badge: 'Full CRM + AI OS',
    stats: ['13 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Lead-to-Approval CRM',
      'Document AI Verification',
      'EMI Automation Engine',
      'Risk & Compliance Dashboard',
      'Collections Command Center',
    ],
    workflowTitle: 'Instant Lead Intake & Underwriting Funnel',
    workflow: [
      {
        step: 'Conversational Loan Eligibility',
        sublabel: 'Instant Rule Engine',
        description: 'Applicant inputs loan needs; AI evaluates credit policy rules and bureau score in 60s.',
      },
      {
        step: 'Document AI & KYC Intake',
        sublabel: 'Verification Pipeline',
        description: 'Collects PAN, Aadhaar, and 6-month bank statements via WhatsApp; parses banking income ratios.',
      },
      {
        step: 'Pre-Approved Sanction Letter',
        sublabel: 'Risk Scoring Engine',
        description: 'Generates cryptographically signed loan sanction letter with transparent interest & EMI schedule.',
      },
      {
        step: 'Disbursal & e-NACH Mandate',
        sublabel: 'Collection Command',
        description: 'Coordinates e-NACH mandate registration, loan disbursal pings, and monthly payment receipts.',
      },
    ],
  },
  {
    id: 'insurance-agencies',
    name: 'Insurance Agencies',
    category: 'Finance & Professional',
    accentHue: 200,
    icon: 'shield',
    tagline: 'Timely policy renewal alerts, payment links, and real-time claim status tracking.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-agent'],
    coreModules: [
      'Policyholder CRM',
      'Renewal Automation Engine',
      'AI Claims Assistant',
      'Policy Document Tracker',
      'Agent Performance Dashboard',
    ],
    workflowTitle: 'Policy Lifecycle & Instant Claim Desk',
    workflow: [
      {
        step: 'Premium Comparison Intake',
        sublabel: 'Instant Quotation',
        description: 'Customer enters vehicle or health details; gets multi-insurer premium comparison tables in seconds.',
      },
      {
        step: 'Digital Proposal & Instant KYC',
        sublabel: 'Automated Issuance',
        description: 'Pre-fills proposal forms, collects KYC documents, and routes instant payment link.',
      },
      {
        step: 'Proactive Renewal Radar',
        sublabel: '30-Day Expiry Pings',
        description: 'Sends proactive renewal pings at 30, 15, and 3 days before lapse to prevent coverage gaps.',
      },
      {
        step: 'WhatsApp Photo Claim Desk',
        sublabel: 'Surveyor Assignment',
        description: 'Customer uploads accident photos on WhatsApp; AI opens claim docket and alerts surveyor.',
      },
    ],
  },
  {
    id: 'legal-firms',
    name: 'Legal Firms',
    category: 'Finance & Professional',
    accentHue: 260,
    icon: 'gavel',
    tagline: 'Structured client intake, court hearing schedule reminders, and automated document tracking.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-practice'],
    coreModules: [
      'Client Intake CRM',
      'Case Status Tracker',
      'Document Automation Engine',
      'AI Reminder Agent',
      'Billing & Time Tracking Dashboard',
    ],
    workflowTitle: 'Client Retainer & Case Docket Pipeline',
    workflow: [
      {
        step: 'Confidential Client Intake',
        sublabel: 'Conflict-of-Interest Check',
        description: 'Prospective client completes structured intake questionnaire; automatic conflict check run.',
      },
      {
        step: 'Retainer & Digital Signature',
        sublabel: 'Agreement Engine',
        description: 'Generates custom engagement letters, fee agreements, and collects secure digital signatures.',
      },
      {
        step: 'Hearing Causelist Tracker',
        sublabel: 'Court Calendar Sync',
        description: 'Syncs with court causelists and sends upcoming hearing alerts and evidence checklists to client.',
      },
      {
        step: 'Milestone Legal Billing',
        sublabel: 'Trust Accounting',
        description: 'Delivers detailed case status reports and monthly transparent trust billing statements.',
      },
    ],
  },
  {
    id: 'accounting-ca-firms',
    name: 'Accounting & CA Firms',
    category: 'Finance & Professional',
    accentHue: 185,
    icon: 'calculator',
    tagline: 'Automate GST and tax filing document collection, compliance deadlines, and billing updates.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-client'],
    coreModules: [
      'Client 360 CRM',
      'Filing Deadline Tracker',
      'Document Collection Engine',
      'AI Compliance Alerts',
      'Practice Command Center',
    ],
    workflowTitle: 'GST & Income Tax Compliance Engine',
    workflow: [
      {
        step: 'Structured Document Checklist',
        sublabel: 'Tax Intake Engine',
        description: 'Client receives customized tax document checklist tailored to their business entity structure.',
      },
      {
        step: 'WhatsApp Bill OCR & ERP Sync',
        sublabel: 'Invoice Extraction',
        description: 'Clients upload monthly purchase/sales invoices; OCR extracts tax values and syncs to accounting.',
      },
      {
        step: 'Filing Deadline Countdown',
        sublabel: 'Statutory Reminders',
        description: 'Automated countdown reminders for GSTR-1, GSTR-3B, TDS, and advance tax payment deadlines.',
      },
      {
        step: 'Challan & Ack Delivery',
        sublabel: 'Filing Verification',
        description: 'Delivers verified tax payment challans, filed return acknowledgements, and advisory letters.',
      },
    ],
  },

  // ── REAL ESTATE & CONSTRUCTION ──
  {
    id: 'real-estate-agencies',
    name: 'Real Estate Agencies',
    category: 'Real Estate & Construction',
    accentHue: 35,
    icon: 'home',
    tagline: 'Aggregate inbound portal inquiries, schedule agent site visits, and automate buyer follow-ups.',
    badge: 'Full CRM + AI OS',
    stats: ['11 modules', 'AI-powered', 'Multi-project'],
    coreModules: [
      'Client 360 CRM',
      'Site Visit & Inventory Manager',
      'Payment Schedule Engine',
      'AI Sales Command Center',
      'Agreement Tracker',
    ],
    workflowTitle: 'Lead-to-Site Visit Conversion Pipeline',
    workflow: [
      {
        step: 'Instant Ad Lead Ingestion',
        sublabel: '15-Second AI Triage',
        description: 'Captures ad leads in 15 seconds; qualifies budget, preferred locality, and move-in timeline.',
      },
      {
        step: 'Interactive 3D Brochure Share',
        sublabel: 'Digital Collateral',
        description: 'Delivers high-resolution project PDFs, virtual walk-through videos, and pricing tier sheets.',
      },
      {
        step: 'Site Visit Booking & Map PIN',
        sublabel: 'Agent Calendar Sync',
        description: 'Books visit slot on sales manager calendar; sends Google Maps driving pin and visitor gatepass.',
      },
      {
        step: 'Custom Cost Sheet & Token',
        sublabel: 'Closing & Agreement',
        description: 'Gathers site visit feedback, issues customized unit cost sheet, and facilitates token deposit.',
      },
    ],
  },
  {
    id: 'builders-construction',
    name: 'Builders & Construction Firms',
    category: 'Real Estate & Construction',
    accentHue: 28,
    icon: 'building-community',
    tagline: 'Construction milestone payment reminders, buyer progress photo updates, and possession handovers.',
    badge: 'Full CRM + AI OS',
    stats: ['11 modules', 'AI-powered', 'Multi-project'],
    coreModules: [
      'Buyer CRM',
      'Project Milestone Tracker',
      'Payment Schedule Engine',
      'AI Handover Assistant',
      'Site Progress Dashboard',
    ],
    workflowTitle: 'Construction Milestone & Buyer Handover Loop',
    workflow: [
      {
        step: 'Builder-Buyer Agreement Pre-Fill',
        sublabel: 'RERA Compliance',
        description: 'Pre-fills builder-buyer agreement with customized payment plans and RERA compliance clauses.',
      },
      {
        step: 'Slab-Level Photo/Video Broadcast',
        sublabel: 'Site Progress Updates',
        description: 'Sends verified architect progress certificates and monthly site photo updates to all buyers.',
      },
      {
        step: 'Milestone Demand Note Link',
        sublabel: 'Automated Collections',
        description: 'Generates demand notices tied to civil engineering milestones with direct online payment links.',
      },
      {
        step: 'Snagging Audit & Key Handover',
        sublabel: 'Possession Protocol',
        description: 'Allows buyers to log pre-possession snagging items digitally and schedules ceremonial key handover.',
      },
    ],
  },
  {
    id: 'interior-designers',
    name: 'Interior Designers',
    category: 'Real Estate & Construction',
    accentHue: 280,
    icon: 'ruler-2',
    tagline: 'Client consultation booking, design milestone sign-offs, and staged payment schedules.',
    badge: 'Full CRM + AI OS',
    stats: ['8 modules', 'AI-powered', 'Multi-project'],
    coreModules: [
      'Client 360 CRM',
      'Project Timeline Tracker',
      'Design Approval Engine',
      'AI Update Agent',
      'Vendor Coordination Dashboard',
    ],
    workflowTitle: 'Design Consultation & Project Sign-off Flow',
    workflow: [
      {
        step: 'Design Brief & Floor Plan Quiz',
        sublabel: 'Client Style Intake',
        description: 'Homeowner shares architectural floor plans and style preferences through an interactive quiz.',
      },
      {
        step: '3D Renders & BOQ Estimate',
        sublabel: 'Presentation Approval',
        description: 'Shares 3D renders, material moodboards, and itemized bill of quantities (BOQ) with version tracking.',
      },
      {
        step: 'Carpentry & Execution Log',
        sublabel: 'Live Photo Updates',
        description: 'Live WhatsApp photo logs of modular carpentry, electrical wiring, and false ceiling progress.',
      },
      {
        step: 'Handover & Warranty Pack',
        sublabel: 'Defect Sign-off',
        description: 'Conducts digital defect inspection checklist and delivers hardware warranty certificates.',
      },
    ],
  },

  // ── EDUCATION & COMMUNITY ──
  {
    id: 'schools',
    name: 'Schools',
    category: 'Education & Community',
    accentHue: 215,
    icon: 'school',
    tagline: 'Admission inquiries, automated tuition fee notices, report card distribution, and PTM booking.',
    badge: 'Full CRM + AI OS',
    stats: ['12 modules', 'AI-powered', 'Multi-branch'],
    coreModules: [
      'Student & Parent CRM',
      'Admission Pipeline Tracker',
      'Fee Automation Engine',
      'AI Result Notification Agent',
      'Attendance Command Center',
    ],
    workflowTitle: 'Student Admission & Parent Communication Hub',
    workflow: [
      {
        step: 'Admission Inquiry & Campus Tour',
        sublabel: 'Parent Intake',
        description: 'Prospective parents explore grade curriculum, fee structure, and book Saturday campus walk.',
      },
      {
        step: 'Document Upload & Tuition Link',
        sublabel: 'Enrollment Engine',
        description: 'Automates birth certificate/transfer certificate uploads and generates quarterly tuition fee link.',
      },
      {
        step: 'Bus GPS & Attendance Alert',
        sublabel: 'Student Safety Sync',
        description: 'Notifies parents when student boards school bus with live GPS bus tracker link.',
      },
      {
        step: 'Report Card & PTM Time Slots',
        sublabel: 'Academic Progress',
        description: 'Delivers term exam report cards and lets parents book 10-minute one-on-one teacher meeting slots.',
      },
    ],
  },
  {
    id: 'coaching-centers',
    name: 'Coaching Centers',
    category: 'Education & Community',
    accentHue: 195,
    icon: 'book',
    tagline: 'Student test score broadcasting, parent attendance alerts, and batch renewal reminders.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-batch'],
    coreModules: [
      'Student CRM',
      'Batch & Attendance Tracker',
      'Fee Reminder Engine',
      'AI Performance Insights',
      'Parent Communication Dashboard',
    ],
    workflowTitle: 'Batch Management & Student Score Radar',
    workflow: [
      {
        step: 'Entrance Test Registration',
        sublabel: 'Student Enrollment',
        description: 'Aspirants register for entrance tests, receive hall tickets, and lock branch batch timings.',
      },
      {
        step: 'Daily Lecture Attendance Alert',
        sublabel: 'Parent Accountability',
        description: 'Automated SMS/WhatsApp notification to parents if a student misses morning lecture.',
      },
      {
        step: 'Mock Exam Scorecard Broadcast',
        sublabel: 'Performance Tracker',
        description: 'Generates personalized scorecard showing subject-wise strengths, percentiles, and improvement tips.',
      },
      {
        step: 'Semester Renewal & Crash Course',
        sublabel: 'Course Retention',
        description: 'Notifies parents before course semester renewal with early-bird discounts and revision schedules.',
      },
    ],
  },
  {
    id: 'ngos-trusts',
    name: 'NGOs & Community Trusts',
    category: 'Education & Community',
    accentHue: 340,
    icon: 'heart-handshake',
    tagline: 'High-volume member records, automated welfare follow-ups, 80G tax receipts, and scheduled broadcasts.',
    badge: 'Scale Tested (700K+ Users)',
    stats: ['8 modules', 'AI-powered', '700K+ Records'],
    coreModules: [
      'Member & Donor 360 CRM',
      'High-Volume Follow-up Engine',
      'Care Request & Prayer Pipeline',
      'Milestone & Birthday Dispatcher',
      'Volunteer Coordination Dashboard',
    ],
    workflowTitle: 'Large-Scale Member Engagement & Follow-up Flow',
    workflow: [
      {
        step: 'Member Enrollment & Records Sync',
        sublabel: 'Centralized Intake',
        description: 'Enrolls community members via web and mobile into a high-capacity database with automatic profile linking.',
      },
      {
        step: 'Automated Daily Follow-up Queue',
        sublabel: 'Scheduled Outreach',
        description: 'Dispatches automated daily follow-ups, birthday/anniversary greetings, and welfare assistance requests.',
      },
      {
        step: 'Instant 80G Tax Certificate',
        sublabel: 'Statutory Compliance',
        description: 'Automatically generates income tax 80G deduction certificate and PAN receipt within 60 seconds.',
      },
      {
        step: 'Field Impact Story & Video',
        sublabel: 'Transparency Digest',
        description: 'Monthly video updates showing how contributions built water facilities, schools, or animal shelters.',
      },
      {
        step: 'Monthly Pledge & Annual Gala',
        sublabel: 'Donor Retention',
        description: 'Manages automated recurring SIP donations and sends invitations to donor appreciation events.',
      },
    ],
  },

  // ── HOSPITALITY & FOOD ──
  {
    id: 'hotels-resorts',
    name: 'Hotels & Resorts',
    category: 'Hospitality & Food',
    accentHue: 48,
    icon: 'building',
    tagline: 'Pre-arrival guest information collection, automated mobile check-in, and post-stay feedback.',
    badge: 'Full CRM + AI OS',
    stats: ['11 modules', 'AI-powered', 'Multi-property'],
    coreModules: [
      'Guest 360 CRM',
      'Booking & Room Inventory Engine',
      'AI Concierge Agent',
      'Feedback & Loyalty Dashboard',
      'Revenue Command Center',
    ],
    workflowTitle: 'Guest Pre-Arrival & Mobile Concierge Flow',
    workflow: [
      {
        step: 'Booking Itinerary & Upsell',
        sublabel: 'Reservation Engine',
        description: 'Sends confirmed itinerary, room upgrade options, and airport transfer pickup booking.',
      },
      {
        step: 'Mobile Check-in & ID Upload',
        sublabel: 'Skip-the-Desk Protocol',
        description: 'Guest submits ID proofs and estimated arrival time on WhatsApp to skip reception check-in lines.',
      },
      {
        step: 'In-Stay AI Concierge Service',
        sublabel: 'Guest Services',
        description: 'Allows guests to request extra amenities, order in-room dining, and book spa slots via chat.',
      },
      {
        step: 'Express Checkout & Review',
        sublabel: 'Post-Stay Engagement',
        description: 'Automates digital folio billing, contactless key drop, and triggers verified 5-star review requests.',
      },
    ],
  },
  {
    id: 'restaurants-cafes',
    name: 'Restaurants & Cafes',
    category: 'Hospitality & Food',
    accentHue: 15,
    icon: 'tools-kitchen-2',
    tagline: 'Table reservation automation, takeout updates, and automatic Google review generation.',
    badge: 'Full CRM + AI OS',
    stats: ['9 modules', 'AI-powered', 'Multi-outlet'],
    coreModules: [
      'Customer CRM',
      'Reservation & Table Engine',
      'Order & Delivery Dashboard',
      'AI Feedback Agent',
      'Loyalty Points Engine',
    ],
    workflowTitle: 'Table Booking & Delivery Loyalty Pipeline',
    workflow: [
      {
        step: 'Table Reservation & Party Size',
        sublabel: 'Host Desk Sync',
        description: 'Guests book tables; system allocates floor zones and sends WhatsApp calendar confirmations.',
      },
      {
        step: 'Pre-Order Digital Menus',
        sublabel: 'Kitchen Display Sync',
        description: 'Guests view digital menu, note food allergies, or pre-order chef tasting courses.',
      },
      {
        step: 'Zero-Commission Takeout Order',
        sublabel: 'Direct Channel',
        description: 'Direct zero-commission WhatsApp takeout ordering with live kitchen-to-doorstep updates.',
      },
      {
        step: 'Google Review & Loyalty Reward',
        sublabel: 'Repeat Diner Engine',
        description: 'Invites happy diners to post Google reviews in exchange for 15% discount on their next dinner.',
      },
    ],
  },
  {
    id: 'event-management',
    name: 'Event Management',
    category: 'Hospitality & Food',
    accentHue: 295,
    icon: 'calendar-event',
    tagline: 'Vendor coordination checklists, guest RSVP tracking, and automated schedule reminders.',
    badge: 'Full CRM + AI OS',
    stats: ['8 modules', 'AI-powered', 'Multi-event'],
    coreModules: [
      'Client 360 CRM',
      'Booking & Vendor Coordination Engine',
      'Event Timeline Tracker',
      'AI Reminder Agent',
      'Post-event Feedback Dashboard',
    ],
    workflowTitle: 'Client Briefing & Vendor Coordination Engine',
    workflow: [
      {
        step: 'Event Scope & Date Reservation',
        sublabel: 'Client Intake',
        description: 'Captures guest count, venue preferences, catering themes, and date holds.',
      },
      {
        step: 'Automated Multi-Vendor RFPs',
        sublabel: 'Vendor Management',
        description: 'Dispatches structured setup briefs to sound, lighting, decorators, and catering vendors.',
      },
      {
        step: 'One-Tap WhatsApp Guest RSVPs',
        sublabel: 'Digital QR Passes',
        description: 'Sends customized wedding/corporate event invites with one-tap RSVP and digital gate passes.',
      },
      {
        step: 'Live Run-Sheet & Photo Album',
        sublabel: 'Execution Control',
        description: 'Sends hour-by-hour operational run-sheets to coordinators; delivers client photo albums.',
      },
    ],
  },

  // ── LOGISTICS & MANUFACTURING ──
  {
    id: 'logistics-transport',
    name: 'Logistics & Transport',
    category: 'Logistics & Manufacturing',
    accentHue: 190,
    icon: 'truck',
    tagline: 'Consignment booking alerts, live GPS tracking links, and instant WhatsApp proof of delivery.',
    badge: 'Full CRM + AI OS',
    stats: ['10 modules', 'AI-powered', 'Multi-fleet'],
    coreModules: [
      'Shipment CRM',
      'Live Tracking Dashboard',
      'Dispatch Automation Engine',
      'AI ETA Predictor',
      'Proof-of-Delivery Tracker',
    ],
    workflowTitle: 'Consignment-to-POD Real-Time Telematics',
    workflow: [
      {
        step: 'Freight Booking & E-Way Bill',
        sublabel: 'Docket Generation',
        description: 'Instant booking of full or part truckload with automatic E-Way bill validation.',
      },
      {
        step: 'Route Optimization & Driver Dispatch',
        sublabel: 'Telematics Assignment',
        description: 'Assigns nearest vetted truck driver with optimized fuel-efficient highway routing.',
      },
      {
        step: 'Live GPS Telematics Link',
        sublabel: 'En-Route Monitoring',
        description: 'Provides consignee and shipper with live satellite tracking link and toll milestone checkpoints.',
      },
      {
        step: 'Signed Digital POD Receipt',
        sublabel: 'Delivery Sign-off',
        description: 'Driver captures receiver signature and stamped consignment note; instant automated freight invoice.',
      },
    ],
  },
  {
    id: 'manufacturing-msme',
    name: 'Manufacturing & MSME',
    category: 'Logistics & Manufacturing',
    accentHue: 240,
    icon: 'factory',
    tagline: 'B2B purchase order logging, raw material stock alerts, and production dispatch notices.',
    badge: 'Full CRM + AI OS',
    stats: ['10 modules', 'AI-powered', 'Multi-unit'],
    coreModules: [
      'Order & Client CRM',
      'Production Status Tracker',
      'Inventory & Stock Engine',
      'AI Dispatch Alerts',
      'Revenue Command Center',
    ],
    workflowTitle: 'B2B Purchase Order to Production Dispatch',
    workflow: [
      {
        step: 'B2B Purchase Order Ingestion',
        sublabel: 'Sales Order Sync',
        description: 'Parses buyer purchase order (PO); validates technical drawings and payment terms automatically.',
      },
      {
        step: 'BOM & Raw Material Check',
        sublabel: 'Inventory Radar',
        description: 'Audits warehouse raw material inventory; triggers automatic supplier PO if stock falls below threshold.',
      },
      {
        step: 'Shopfloor Job Card & Inspection',
        sublabel: 'QC Milestones',
        description: 'Tracks job cards across CNC machining, assembly, and testing; logs quality inspection parameters.',
      },
      {
        step: 'GST E-Invoice & Truck Dispatch',
        sublabel: 'Logistics Handover',
        description: 'Generates government-compliant GST E-Invoice, packing slips, and notifies buyer of truck dispatch.',
      },
    ],
  },
];
