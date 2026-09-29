'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SECTION_IDS } from '@/lib/constants';
import {
  INDUSTRY_SIMULATIONS,
  IndustrySimulation,
} from '@/data/industrySimulations';
import { TELUGU_INDUSTRY_SIMULATIONS } from '@/data/teluguSimulations';
import { WhatsAppSimulator } from '@/components/ui/WhatsAppSimulator';
import {
  FlaskConical,
  Building2,
  Home,
  Landmark,
  Car,
  Dumbbell,
  Pill,
  Truck,
} from 'lucide-react';

const FEATURED_SIMULATIONS = [
  {
    id: 'diagnostic-labs',
    label: 'Diagnostic Labs',
    icon: FlaskConical,
  },
  {
    id: 'hospitals-clinics',
    label: 'Hospitals & Clinics',
    icon: Building2,
  },
  {
    id: 'real-estate-agencies',
    label: 'Real Estate',
    icon: Home,
  },
  {
    id: 'banks-nbfcs',
    label: 'Finance & Loans',
    icon: Landmark,
  },
  {
    id: 'automobile-dealers',
    label: 'Automobile Service',
    icon: Car,
  },
  {
    id: 'gyms-fitness',
    label: 'Gyms & Fitness',
    icon: Dumbbell,
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy',
    icon: Pill,
  },
  {
    id: 'logistics-transport',
    label: 'Logistics',
    icon: Truck,
  },
];

export function MiniDemo() {
  const { t, language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('diagnostic-labs');
  
  const simulationBank = language === 'te' ? TELUGU_INDUSTRY_SIMULATIONS : INDUSTRY_SIMULATIONS;
  const currentSimulation: IndustrySimulation =
    simulationBank[selectedId] ||
    simulationBank['diagnostic-labs'] ||
    INDUSTRY_SIMULATIONS['diagnostic-labs'];

  return (
    <SectionWrapper id={SECTION_IDS.miniDemo}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dynamic Section Heading based on Selected Industry */}
        <SectionHeading
          badge={t.miniDemo.badge}
          title={currentSimulation.title}
          description={currentSimulation.subtitle}
        />

        {/* Industry Selector Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {FEATURED_SIMULATIONS.map((item) => {
            const isSelected = selectedId === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber text-ink shadow-lg shadow-amber/25 scale-105'
                    : 'border border-border-subtle bg-indigo/30 text-text-muted hover:border-amber/40 hover:text-text-soft'
                }`}
                aria-pressed={isSelected}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{t.miniDemo.tabLabels?.[item.id as keyof typeof t.miniDemo.tabLabels] || item.label}</span>
              </button>
            );
          })}
        </div>

        {/* WhatsApp Simulator Frame */}
        <div className="mx-auto max-w-xl">
          <WhatsAppSimulator
            key={currentSimulation.id}
            simulation={currentSimulation}
            autoPlay={false}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
