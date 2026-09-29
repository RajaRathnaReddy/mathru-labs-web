'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Bot,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Stethoscope,
  ShoppingCart,
  Truck,
  MessageSquare,
  Clock,
  TrendingUp,
} from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  badge: string;
  incomingEvent: {
    source: string;
    sourceIcon: string;
    time: string;
    title: string;
    detail: string;
    meta: string;
  };
  agentSteps: {
    agent: string;
    action: string;
    status: 'completed' | 'processing' | 'queued';
    time: string;
  }[];
  telemetry: {
    accuracy: string;
    latency: string;
    impact: string;
    mode: string;
  };
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'healthcare',
    name: 'Healthcare & Diagnostics',
    category: 'Diagnostic LIS + AI OS',
    icon: Stethoscope,
    accent: '#00D26A',
    badge: 'LIS PIPELINE ENGINE',
    incomingEvent: {
      source: 'WhatsApp & LIS Ingestion',
      sourceIcon: '🏥',
      time: 'Just now',
      title: 'Sample Collected: Barcode #LAB-89421',
      detail: 'Complete Blood Picture + Lipid Profile · Branch 03 (Jubilee Hills)',
      meta: 'Patient: Rajesh V. · Auto-tagged urgent',
    },
    agentSteps: [
      {
        agent: 'Analyzer Telemetry Agent',
        action: 'Ingested raw biochemical values from Beckman Coulter analyzer via HL7 protocol',
        status: 'completed',
        time: '0.12s',
      },
      {
        agent: 'Pathologist Copilot',
        action: 'Flagged HbA1c elevation (7.4%) with historical trend comparison & smart note',
        status: 'completed',
        time: '0.24s',
      },
      {
        agent: 'Multilingual Dispatch Bot',
        action: 'Generated secure PDF report & sent via WhatsApp with doctor appointment CTA',
        status: 'completed',
        time: '0.38s',
      },
    ],
    telemetry: {
      accuracy: '99.98%',
      latency: '0.38s',
      impact: '-85% TAT',
      mode: 'Zero Manual Dispatch',
    },
  },
  {
    id: 'retail',
    name: 'Retail & Supermarkets',
    category: 'Omnichannel POS + AI OS',
    icon: ShoppingCart,
    accent: '#38BDF8',
    badge: 'SMART REORDER & INVENTORY',
    incomingEvent: {
      source: 'POS & WhatsApp Catalog',
      sourceIcon: '🛒',
      time: 'Just now',
      title: 'Threshold Breach: Cold-Pressed Oils',
      detail: 'SKU #CO-902 stock dropped below 15 units across 4 outlets',
      meta: 'Demand spike detected: +34% weekend velocity',
    },
    agentSteps: [
      {
        agent: 'Inventory Predictor Agent',
        action: 'Calculated 7-day velocity and automatically generated Purchase Order #PO-4410',
        status: 'completed',
        time: '0.09s',
      },
      {
        agent: 'Supplier Negotiation Bot',
        action: 'Dispatched RFQ to 3 verified distributors via WhatsApp API with volume pricing request',
        status: 'completed',
        time: '0.21s',
      },
      {
        agent: 'Loyalty Trigger Engine',
        action: 'Pushed personalized restock alert to top 240 loyalty customers via SMS/WhatsApp',
        status: 'completed',
        time: '0.35s',
      },
    ],
    telemetry: {
      accuracy: '99.4%',
      latency: '0.35s',
      impact: '0 Stockouts',
      mode: 'Autonomous Reordering',
    },
  },
  {
    id: 'realestate',
    name: 'Real Estate & Builders',
    category: 'High-Ticket CRM + AI OS',
    icon: Building2,
    accent: '#FF6B00',
    badge: 'LEAD-TO-SITE-VISIT ENGINE',
    incomingEvent: {
      source: 'Ad Campaign & WhatsApp Inbound',
      sourceIcon: '🏢',
      time: 'Just now',
      title: 'Inbound Lead: 3BHK Luxury Tower B',
      detail: 'Buyer qualification: Budget ₹2.4 Cr · Ready to register within 30 days',
      meta: 'Source: Google Ads · High-intent buyer scored 94/100',
    },
    agentSteps: [
      {
        agent: 'Conversational Lead Qualifier',
        action: 'Engaged buyer on WhatsApp within 12 seconds in Telugu & English; gathered preferences',
        status: 'completed',
        time: '0.14s',
      },
      {
        agent: 'Smart Schedule Coordinator',
        action: 'Booked Saturday 11:30 AM VIP site walkthrough; assigned Relationship Manager Arun',
        status: 'completed',
        time: '0.28s',
      },
      {
        agent: 'Brochure & CRM Syncer',
        action: 'Sent interactive floor plans with payment schedule; logged in Salesforce/HubSpot',
        status: 'completed',
        time: '0.42s',
      },
    ],
    telemetry: {
      accuracy: '98.9%',
      latency: '0.42s',
      impact: '3.4x Visits',
      mode: 'Sub-Minute Followup',
    },
  },
  {
    id: 'logistics',
    name: 'Logistics & Fleet',
    category: 'Dispatch & Telematics OS',
    icon: Truck,
    accent: '#A855F7',
    badge: 'ROUTE & DISPATCH AUTOMATION',
    incomingEvent: {
      source: 'Fleet IoT & Consignment System',
      sourceIcon: '🚚',
      time: 'Just now',
      title: 'Truck Breakdown: Route HYD-BLR (NH44)',
      detail: 'Vehicle AP28-TU-4491 · 18 Tons temperature-sensitive cargo (Pharma cold chain)',
      meta: 'Alert: Coolant temp anomaly · ETA at risk by 3.5 hrs',
    },
    agentSteps: [
      {
        agent: 'Telematics Anomaly Sentinel',
        action: 'Detected IoT telemetry alert; flagged cargo temperature preservation threshold',
        status: 'completed',
        time: '0.08s',
      },
      {
        agent: 'Dynamic Dispatch Re-router',
        action: 'Located backup refrigerated vehicle 14km away in Kurnool; dispatched recovery driver',
        status: 'completed',
        time: '0.19s',
      },
      {
        agent: 'Client Consignment Relay',
        action: 'Updated consignee dashboard and dispatched live GPS tracking link with revised ETA',
        status: 'completed',
        time: '0.31s',
      },
    ],
    telemetry: {
      accuracy: '99.9%',
      latency: '0.31s',
      impact: '0 Spoilage',
      mode: 'Autonomous Reroute',
    },
  },
];

export function HeroCommandCockpit() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('healthcare');
  const [pulseKey, setPulseKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'cockpit' | 'metrics'>('cockpit');

  const currentScenario =
    SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0];

  // Auto-cycle through industry scenarios every 8 seconds if user doesn't click
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto mt-12 w-full max-w-6xl">
      {/* Outer Luminous Glow Aura */}
      <div
        className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-40 blur-2xl transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${currentScenario.accent}44 0%, rgba(0, 102, 255, 0.2) 40%, transparent 75%)`,
        }}
      />

      {/* Main Glassmorphic Hardware Enclosure */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0A0F1E]/90 shadow-2xl backdrop-blur-2xl">
        {/* Cockpit Window Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0E1528]/80 px-4 py-3 sm:px-6">
          {/* Left: Window Controls + Live Pulse */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]/80" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]/80" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]/80" />
            </div>

            <div className="hidden h-4 w-px bg-white/15 sm:block" />

            <div className="flex items-center gap-2 text-xs font-mono text-white/90">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                  style={{ backgroundColor: currentScenario.accent }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ backgroundColor: currentScenario.accent }}
                />
              </span>
              <span className="font-semibold uppercase tracking-wider text-white">
                Mathru AI Autonomous Engine
              </span>
              <span className="hidden text-white/40 md:inline">·</span>
              <span className="hidden text-white/60 md:inline font-sans">
                Real-Time Multi-Agent Orchestration
              </span>
            </div>
          </div>

          {/* Right: Live Telemetry Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11px] font-mono text-white/80 border border-white/10">
              <Cpu className="h-3.5 w-3.5 text-[#38BDF8]" />
              <span>LATENCY: {currentScenario.telemetry.latency}</span>
            </span>
            <span className="hidden items-center gap-1.5 rounded-full bg-[#00D26A]/10 px-2.5 py-1 text-[11px] font-mono text-[#00D26A] border border-[#00D26A]/20 sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>ON-PREM / CLOUD SOVEREIGN</span>
            </span>
          </div>
        </div>

        {/* Industry Scenario Switcher Tabs */}
        <div className="flex overflow-x-auto border-b border-white/10 bg-[#080C16]/90 p-1.5 scrollbar-none">
          <div className="flex min-w-full gap-1.5 px-2">
            {SCENARIOS.map((sc) => {
              const Icon = sc.icon;
              const isActive = sc.id === activeScenarioId;
              return (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenarioId(sc.id)}
                  className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-white/15 text-white shadow-lg border border-white/20'
                      : 'text-white/60 hover:bg-white/[0.04] hover:text-white/90 border border-transparent'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? `0 0 20px ${sc.accent}25, inset 0 1px 0 rgba(255,255,255,0.15)`
                      : undefined,
                  }}
                >
                  <Icon
                    className="h-4 w-4 shrink-0 transition-transform duration-300"
                    style={{ color: isActive ? sc.accent : 'currentColor' }}
                  />
                  <span>{sc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cockpit Interior — Interactive Neural View */}
        <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-12">
          {/* Left Column: Live Ingestion Stream (4 Cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-[#0D1426]/90 p-4 lg:col-span-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
                <span className="flex items-center gap-1.5 text-white/90 font-semibold uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" />
                  1. Live Ingestion Stream
                </span>
                <span className="text-[11px] text-[#38BDF8]">{currentScenario.incomingEvent.time}</span>
              </div>

              {/* Event Card */}
              <div className="rounded-lg border border-white/15 bg-white/[0.03] p-3.5 shadow-inner">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-lg shadow-sm">
                    {currentScenario.incomingEvent.sourceIcon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                      {currentScenario.incomingEvent.source}
                    </div>
                    <div className="mt-0.5 text-sm font-bold text-white leading-snug">
                      {currentScenario.incomingEvent.title}
                    </div>
                    <p className="mt-1 text-xs text-white/70 leading-relaxed">
                      {currentScenario.incomingEvent.detail}
                    </p>
                    <div className="mt-2.5 inline-block rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-mono text-white/80 border border-white/10">
                      {currentScenario.incomingEvent.meta}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status Gauge */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60 font-mono">Payload Validation:</span>
              <span className="flex items-center gap-1 font-semibold text-[#00D26A]">
                <CheckCircle2 className="h-3.5 w-3.5" /> 100% Verified
              </span>
            </div>
          </div>

          {/* Center Column: Autonomous Agent Pipeline (5 Cols) */}
          <div className="rounded-xl border border-white/10 bg-[#0D1426]/90 p-4 lg:col-span-5">
            <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3">
              <span className="flex items-center gap-1.5 text-white/90 font-semibold uppercase tracking-wider">
                <Bot className="h-3.5 w-3.5 text-[#00D26A]" />
                2. Autonomous Agent Execution
              </span>
              <span className="rounded bg-[#00D26A]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#00D26A]">
                ACTIVE
              </span>
            </div>

            <div className="space-y-3">
              {currentScenario.agentSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative rounded-lg border border-white/10 bg-white/[0.02] p-3 transition-colors hover:bg-white/[0.05]"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold text-white">
                      <span
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
                        style={{
                          backgroundColor: `${currentScenario.accent}20`,
                          color: currentScenario.accent,
                          border: `1px solid ${currentScenario.accent}50`,
                        }}
                      >
                        {idx + 1}
                      </span>
                      {step.agent}
                    </span>
                    <span className="font-mono text-[10px] text-white/40">{step.time}</span>
                  </div>
                  <p className="mt-1.5 pl-7 text-xs text-white/70 leading-relaxed font-sans">
                    {step.action}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Telemetry & Business Impact HUD (3 Cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-gradient-to-b from-[#101A33] to-[#0A0F1E] p-4 lg:col-span-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-white/90 font-semibold uppercase tracking-wider mb-3">
                <TrendingUp className="h-3.5 w-3.5 text-[#FF6B00]" />
                3. Business Impact
              </div>

              <div className="space-y-3">
                {/* Metric 1 */}
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Execution Mode
                  </div>
                  <div className="mt-1 text-sm font-bold text-white">
                    {currentScenario.telemetry.mode}
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Operational Shift
                  </div>
                  <div
                    className="mt-1 text-2xl font-black font-mono tracking-tight"
                    style={{ color: currentScenario.accent }}
                  >
                    {currentScenario.telemetry.impact}
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                    Accuracy SLA
                  </div>
                  <div className="mt-1 text-lg font-bold font-mono text-white">
                    {currentScenario.telemetry.accuracy}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA inside Cockpit */}
            <a
              href="#industries"
              className="mt-4 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: `linear-gradient(135deg, ${currentScenario.accent}dd 0%, #0066FF 100%)`,
                boxShadow: `0 4px 16px ${currentScenario.accent}40`,
              }}
            >
              <span>Explore {currentScenario.name}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Ticker Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-[#080C16] px-5 py-2.5 text-[11px] font-mono text-white/60">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00D26A] animate-pulse" />
            <span>25 Industry Systems Online</span>
            <span className="text-white/20">|</span>
            <span className="text-white/80">Deployable in 48 Hours</span>
          </div>

          <div className="flex items-center gap-3">
            <span>WHATSAPP · TELEGRAM · REST API · HL7 · ERP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
