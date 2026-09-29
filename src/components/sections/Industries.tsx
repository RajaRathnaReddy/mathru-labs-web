'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SECTION_IDS } from '@/lib/constants';
import { useLanguage } from '@/providers/LanguageProvider';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import {
  INDUSTRIES,
  INDUSTRY_CATEGORIES,
  type Industry,
} from '@/data/industries';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hospital,
  FlaskConical,
  Pill,
  Dumbbell,
  Sparkles,
  Store,
  ShoppingCart,
  Tv,
  Gem,
  Car,
  Landmark,
  ShieldCheck,
  Gavel,
  Calculator,
  Home,
  Building2,
  Ruler,
  School,
  BookOpen,
  HeartHandshake,
  Hotel,
  UtensilsCrossed,
  CalendarDays,
  Truck,
  Factory,
  Search,
  X,
  ArrowRight,
  HelpCircle,
  Cpu,
  Layers,
  CheckCircle2,
  Workflow,
  Server,
  Zap,
  Play,
} from 'lucide-react';
import { getSimulationForIndustry } from '@/data/industrySimulations';
import { WhatsAppSimulator } from '@/components/ui/WhatsAppSimulator';

// Explicit Icon Mapping for all 25 industries (supporting kebab-case and aliases)
const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  // Healthcare & Wellness
  'building-hospital': Hospital,
  'Hospital': Hospital,
  'flask': FlaskConical,
  'FlaskConical': FlaskConical,
  'pill': Pill,
  'Pill': Pill,
  'barbell': Dumbbell,
  'Dumbbell': Dumbbell,
  'sparkles': Sparkles,
  'Sparkles': Sparkles,

  // Retail & Commerce
  'building-store': Store,
  'Store': Store,
  'ShoppingBag': Store,
  'shopping-cart': ShoppingCart,
  'ShoppingCart': ShoppingCart,
  'device-tv': Tv,
  'Tv': Tv,
  'diamond': Gem,
  'Gem': Gem,
  'car': Car,
  'Car': Car,

  // Finance & Professional
  'building-bank': Landmark,
  'Landmark': Landmark,
  'shield': ShieldCheck,
  'ShieldCheck': ShieldCheck,
  'gavel': Gavel,
  'Gavel': Gavel,
  'calculator': Calculator,
  'Calculator': Calculator,

  // Real Estate & Construction
  'home': Home,
  'Home': Home,
  'building-community': Building2,
  'Building2': Building2,
  'ruler-2': Ruler,
  'Ruler': Ruler,

  // Education & Community
  'school': School,
  'School': School,
  'book': BookOpen,
  'BookOpen': BookOpen,
  'heart-handshake': HeartHandshake,
  'HeartHandshake': HeartHandshake,

  // Hospitality & Food
  'building': Hotel,
  'Hotel': Hotel,
  'tools-kitchen-2': UtensilsCrossed,
  'UtensilsCrossed': UtensilsCrossed,
  'calendar-event': CalendarDays,
  'CalendarDays': CalendarDays,

  // Logistics & Manufacturing
  'truck': Truck,
  'Truck': Truck,
  'factory': Factory,
  'Factory': Factory,
};

function IndustryIcon({
  name,
  className,
  style,
}: {
  name: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const Component = ICON_MAP[name] || Layers;
  return <Component className={className} style={style} />;
}

export function Industries() {
  const { t } = useLanguage();
  const { prefersReducedMotion } = useDeviceCapability();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeIndustry, setActiveIndustry] = useState<Industry | null>(null);
  const [modalTab, setModalTab] = useState<'architecture' | 'simulation'>('architecture');

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeIndustry) {
        setActiveIndustry(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndustry]);

  // Lock body scroll, pause Lenis, and isolate wheel events when modal is open
  useEffect(() => {
    if (!activeIndustry) return;

    document.body.style.overflow = 'hidden';
    document.body.classList.add('overflow-hidden');

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();

    const handleWindowWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target?.closest('.modal-scroll-body')) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWindowWheel, { passive: false });

    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('overflow-hidden');
      lenis?.start();
      window.removeEventListener('wheel', handleWindowWheel);
    };
  }, [activeIndustry]);

  // Filtered industries
  const filteredIndustries = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return INDUSTRIES.filter((ind) => {
      const matchesCategory =
        selectedCategory === 'All' || ind.category === selectedCategory;
      const matchesSearch =
        !query ||
        ind.name.toLowerCase().includes(query) ||
        ind.category.toLowerCase().includes(query) ||
        ind.badge.toLowerCase().includes(query) ||
        ind.tagline.toLowerCase().includes(query) ||
        ind.stats.some((s) => s.toLowerCase().includes(query)) ||
        ind.coreModules.some((mod) => mod.toLowerCase().includes(query)) ||
        ind.workflowTitle.toLowerCase().includes(query) ||
        ind.workflow.some(
          (step) =>
            step.step.toLowerCase().includes(query) ||
            step.sublabel.toLowerCase().includes(query) ||
            step.description.toLowerCase().includes(query)
        );

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Scroll to contact form with pre-filled business info
  const handleContactPrefill = (businessName: string, prefillMessage?: string) => {
    setActiveIndustry(null);
    const contactSection = document.getElementById(SECTION_IDS.contact);
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });

      // Pre-fill business field
      const businessInput = document.getElementById(
        'contact-business'
      ) as HTMLInputElement | null;
      if (businessInput) {
        businessInput.value = businessName;
        businessInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      // Pre-fill message field
      const messageInput = document.getElementById(
        'contact-message'
      ) as HTMLTextAreaElement | null;
      if (messageInput) {
        messageInput.value =
          prefillMessage ||
          `Hello! I want to deploy a ${businessName} system for our organization.`;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <SectionWrapper id={SECTION_IDS.industries} className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block mb-3 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 rounded-full">
            Enterprise Directory
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-text-heading sm:text-4xl lg:text-5xl leading-tight">
            We Work With Every Industry
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-base text-text-muted sm:text-lg">
            We develop bespoke tools, custom software, CRMs, and autonomous AI operating systems for 25+ business sectors. If your specific industry isn&apos;t listed, we engineer a custom solution from scratch.
          </p>
        </div>

        {/* Search Box */}
        <div className="mx-auto max-w-2xl mb-8">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-text-muted">
              <Search className="h-5 w-5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your business type (e.g. Hospital, Diagnostic, Pharmacy, CA Firm, Real Estate)..."
              aria-label="Search your business type"
              className="w-full rounded-2xl border border-border-subtle bg-indigo/30 py-4 pl-12 pr-12 text-sm text-text-soft placeholder-text-muted/60 backdrop-blur-md transition-all focus:border-amber/60 focus:bg-indigo/50 focus:outline-none focus:ring-2 focus:ring-amber/20"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-text-muted hover:text-text-soft transition-colors"
                aria-label="Clear search query"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Search Result Counter */}
          <div className="mt-2.5 flex items-center justify-between px-2 text-xs text-text-muted">
            <span>
              Showing {filteredIndustries.length} of {INDUSTRIES.length} business sectors
            </span>
            {searchQuery && (
              <span>
                Filtered by &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              selectedCategory === 'All'
                ? 'bg-amber text-ink shadow-lg shadow-amber/20 scale-105'
                : 'border border-border-subtle bg-indigo/30 text-text-muted hover:border-amber/40 hover:text-text-soft'
            }`}
          >
            All Industries ({INDUSTRIES.length})
          </button>
          {INDUSTRY_CATEGORIES.map((cat) => {
            const count = INDUSTRIES.filter((ind) => ind.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-teal text-ink shadow-lg shadow-teal/20 scale-105'
                    : 'border border-border-subtle bg-indigo/30 text-text-muted hover:border-teal/40 hover:text-text-soft'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Zero Results View */}
        {filteredIndustries.length === 0 ? (
          <div className="mx-auto max-w-xl py-12 text-center">
            <div className="rounded-3xl border-2 border-dashed border-amber/40 bg-gradient-to-b from-indigo/40 via-indigo/20 to-ink p-8 sm:p-12 backdrop-blur-md shadow-2xl shadow-amber/5">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber/15 text-amber">
                <HelpCircle className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-heading mb-2">
                Don&apos;t see your business here?
              </h3>
              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                No exact match found for &ldquo;<span className="text-amber font-medium">{searchQuery}</span>&rdquo;, but we build custom intelligent automation systems for <strong>any business</strong>. Tell us what repetitive manual work you do, and we&apos;ll engineer the solution.
              </p>
              <button
                onClick={() =>
                  handleContactPrefill(
                    searchQuery ? searchQuery : 'Other',
                    `I run a ${searchQuery || 'custom'} business and want to automate our manual processes.`
                  )
                }
                className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3 text-sm font-semibold text-ink shadow-lg shadow-amber/25 transition-all hover:bg-amber-dim active:scale-95"
              >
                Tell us what you do
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Grid of Industry Cards */
          <motion.div
            layout={!prefersReducedMotion}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          >
            <AnimatePresence mode="popLayout">
              {filteredIndustries.map((industry) => {
                const colorHex = `hsl(${industry.accentHue}, 85%, 55%)`;
                const bgTint = `hsla(${industry.accentHue}, 85%, 55%, 0.12)`;
                const borderTint = `hsla(${industry.accentHue}, 85%, 55%, 0.28)`;

                return (
                  <motion.div
                    key={industry.id}
                    layout={!prefersReducedMotion}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-b from-indigo/40 via-indigo/20 to-ink p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber/40 hover:shadow-xl hover:shadow-amber/5"
                  >
                    {/* Top ambient glow */}
                    <div
                      className="absolute -top-10 -right-10 h-28 w-28 rounded-full blur-2xl opacity-20 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none"
                      style={{ backgroundColor: colorHex }}
                    />

                    <div>
                      {/* Top Row: Icon + Platform Badge */}
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: bgTint,
                            color: colorHex,
                            border: `1px solid ${borderTint}`,
                          }}
                        >
                          <IndustryIcon name={industry.icon} className="h-6 w-6" />
                        </div>

                        {/* Platform Badge */}
                        <span
                          className="rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase shadow-sm"
                          style={{
                            backgroundColor: bgTint,
                            color: colorHex,
                            border: `1px solid ${borderTint}`,
                          }}
                        >
                          {industry.badge}
                        </span>
                      </div>

                      {/* Name & Category */}
                      <div className="mb-2">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted/70">
                          {industry.category}
                        </span>
                        <h3 className="text-xl font-bold text-text-heading group-hover:text-amber transition-colors">
                          {industry.name}
                        </h3>
                      </div>

                      {/* Stats Row format: [module count] · AI-powered · [scale tag] */}
                      <div className="mb-3.5 flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                        <span className="text-text-soft font-semibold">{industry.stats[0]}</span>
                        <span className="text-amber">·</span>
                        <span className="inline-flex items-center gap-1 text-teal font-semibold">
                          <Zap className="h-3 w-3" />
                          {industry.stats[1]}
                        </span>
                        <span className="text-amber">·</span>
                        <span className="text-text-soft font-semibold">{industry.stats[2]}</span>
                      </div>

                      {/* Tagline */}
                      <p className="text-xs leading-relaxed text-text-muted line-clamp-2">
                        {industry.tagline}
                      </p>

                      {/* Core Modules List (5 modules) */}
                      <div className="mt-4 pt-3.5 border-t border-border-subtle/40">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted/80 mb-2">
                          Core Modules Included:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {industry.coreModules.map((moduleName, mIdx) => (
                            <span
                              key={mIdx}
                              className="inline-flex items-center gap-1 rounded-md bg-white/[0.04] border border-white/[0.05] px-2 py-0.5 text-[11px] font-medium text-text-soft transition-colors group-hover:border-white/10"
                            >
                              <span
                                className="h-1.5 w-1.5 rounded-full shrink-0"
                                style={{ backgroundColor: colorHex }}
                              />
                              <span className="truncate max-w-[140px]">{moduleName}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="mt-6 pt-4 border-t border-border-subtle/40 flex items-center justify-between">
                      <span className="text-[11px] text-text-muted/70 truncate max-w-[170px]" title={industry.workflowTitle}>
                        {industry.workflowTitle}
                      </span>
                      <button
                        onClick={() => {
                          setActiveIndustry(industry);
                          setModalTab('architecture');
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
                        style={{ color: colorHex }}
                      >
                        <span>See how it works</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* ALWAYS SHOW: "Don't see your business here?" card at end of grid */}
              <motion.div
                key="catch-all-card"
                layout={!prefersReducedMotion}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed border-amber/40 bg-gradient-to-b from-amber/5 via-indigo/20 to-ink p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber hover:shadow-xl hover:shadow-amber/10"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/20 text-amber">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-amber/15 border border-amber/30 px-3 py-1 text-[11px] font-bold text-amber">
                      Tailored Architecture
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-heading group-hover:text-amber transition-colors">
                    Don&apos;t see your business here?
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-text-muted">
                    We build custom AI Operating Systems for <strong>any business</strong>. Tell us what you do, and our engineering team will architect a tailored CRM &amp; autonomous pipeline.
                  </p>

                  <div className="mt-4 pt-3 border-t border-border-subtle/50">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber mb-2">
                      Custom Capabilities:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-text-soft">
                        Custom Webhooks
                      </span>
                      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-text-soft">
                        Multi-Database Sync
                      </span>
                      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-text-soft">
                        WhatsApp Agents
                      </span>
                      <span className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] text-text-soft">
                        Live KPI Dashboards
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-subtle/50">
                  <button
                    onClick={() =>
                      handleContactPrefill(
                        'Other',
                        'I have a custom business workflow requirement for our organization.'
                      )
                    }
                    className="w-full rounded-full bg-amber/15 border border-amber/30 py-3 text-xs font-bold text-amber transition-all hover:bg-amber hover:text-ink active:scale-95 shadow-md"
                  >
                    Tell us what you do →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Interactive Workflow Diagram & Architecture Modal */}
      <AnimatePresence>
        {activeIndustry && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-industry-title"
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto overscroll-contain"
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveIndustry(null)}
              className="fixed inset-0 bg-ink/80 backdrop-blur-md"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.25 }}
              data-lenis-prevent="true"
              className="modal-scroll-body relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl border border-border-subtle bg-ink-light p-6 sm:p-8 shadow-2xl shadow-indigo/40 z-10 my-8"
              style={{
                borderColor: `hsla(${activeIndustry.accentHue}, 85%, 55%, 0.35)`,
                overscrollBehavior: 'contain',
              }}
              onWheel={(e) => {
                e.stopPropagation();
                const el = e.currentTarget;
                const isTop = el.scrollTop <= 0 && e.deltaY < 0;
                const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1 && e.deltaY > 0;
                if (isTop || isBottom) {
                  e.preventDefault();
                }
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveIndustry(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-text-muted hover:bg-white/10 hover:text-text-soft transition-colors"
                aria-label="Close workflow details"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="flex h-13 w-13 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `hsla(${activeIndustry.accentHue}, 85%, 55%, 0.15)`,
                      color: `hsl(${activeIndustry.accentHue}, 85%, 55%)`,
                      border: `1px solid hsla(${activeIndustry.accentHue}, 85%, 55%, 0.3)`,
                    }}
                  >
                    <IndustryIcon name={activeIndustry.icon} className="h-7 w-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      {activeIndustry.category}
                    </span>
                    <h3
                      id="modal-industry-title"
                      className="text-2xl sm:text-3xl font-bold text-text-heading"
                    >
                      {activeIndustry.name}
                    </h3>
                  </div>
                </div>

                <span
                  className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `hsla(${activeIndustry.accentHue}, 85%, 55%, 0.15)`,
                    color: `hsl(${activeIndustry.accentHue}, 85%, 55%)`,
                    border: `1px solid hsla(${activeIndustry.accentHue}, 85%, 55%, 0.35)`,
                  }}
                >
                  {activeIndustry.badge}
                </span>
              </div>

              {/* Stats Bar */}
              <div className="mb-6 flex flex-wrap items-center gap-2 sm:gap-3 rounded-xl border border-border-subtle bg-indigo/30 px-4 py-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-soft">
                  <Cpu className="h-3.5 w-3.5 text-amber" />
                  <span>{activeIndustry.stats[0]}</span>
                </div>
                <span className="text-text-muted/40">|</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-teal">
                  <Zap className="h-3.5 w-3.5" />
                  <span>{activeIndustry.stats[1]}</span>
                </div>
                <span className="text-text-muted/40">|</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-soft">
                  <Server className="h-3.5 w-3.5 text-amber" />
                  <span>{activeIndustry.stats[2]}</span>
                </div>
              </div>

              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                {activeIndustry.tagline}
              </p>

              {/* Tab Selector */}
              <div className="mb-6 flex items-center justify-center gap-2 border-b border-border-subtle/60 pb-4">
                <button
                  type="button"
                  onClick={() => setModalTab('architecture')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    modalTab === 'architecture'
                      ? 'bg-amber text-ink shadow-md shadow-amber/20 scale-102'
                      : 'bg-indigo/30 text-text-muted hover:text-text-soft border border-border-subtle'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5" />
                  <span>5 Modules &amp; Tailored Workflow</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModalTab('simulation')}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                    modalTab === 'simulation'
                      ? 'bg-teal text-ink shadow-md shadow-teal/20 scale-102'
                      : 'bg-indigo/30 text-text-muted hover:text-text-soft border border-border-subtle'
                  }`}
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  <span>Live WhatsApp Journey Demo</span>
                </button>
              </div>

              {/* View 1: Architecture & Tailored Workflow */}
              {modalTab === 'architecture' ? (
                <div>
                  {/* 5 Core Enterprise Modules */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading flex items-center gap-1.5">
                        <Layers className="h-3.5 w-3.5 text-amber" />
                        5 Enterprise Core Modules
                      </h4>
                      <span className="text-[11px] text-text-muted">Real CRM / AI OS Architecture</span>
                    </div>

                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {activeIndustry.coreModules.map((mod, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 rounded-xl border border-border-subtle bg-indigo/25 p-3 backdrop-blur-sm transition-colors hover:border-amber/30"
                        >
                          <div
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold"
                            style={{
                              backgroundColor: `hsla(${activeIndustry.accentHue}, 85%, 55%, 0.15)`,
                              color: `hsl(${activeIndustry.accentHue}, 85%, 55%)`,
                            }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-xs font-semibold text-text-soft">
                            {mod}
                          </span>
                        </div>
                      ))}
                      {/* Summary tile */}
                      <div className="flex items-center gap-2 rounded-xl border border-teal/20 bg-teal/5 p-3 text-xs text-teal font-medium sm:col-span-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-teal" />
                        <span>Includes 24/7 autonomous monitoring &amp; automated database backups</span>
                      </div>
                    </div>
                  </div>

                  {/* Animated Tailored Node-and-Pulse Workflow Diagram */}
                  <div className="mb-8 rounded-2xl border border-border-subtle bg-indigo/30 p-5 sm:p-7 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <div className="flex items-center gap-2">
                        <Workflow
                          className="h-4 w-4"
                          style={{ color: `hsl(${activeIndustry.accentHue}, 85%, 55%)` }}
                        />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-text-heading">
                          {activeIndustry.workflowTitle}
                        </h4>
                      </div>
                      <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-medium text-text-muted">
                        Tailored Operational Pipeline
                      </span>
                    </div>

                    {/* Workflow Steps with pulsing connectors */}
                    <div className="relative grid gap-4 sm:grid-cols-4">
                      {activeIndustry.workflow.map((stepItem, idx) => (
                        <div key={idx} className="relative flex flex-col items-center text-center">
                          {/* Node Circle */}
                          <div
                            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl font-bold text-sm text-ink shadow-lg transition-transform duration-300 hover:scale-110"
                            style={{
                              backgroundColor: `hsl(${activeIndustry.accentHue}, 85%, 55%)`,
                              boxShadow: `0 0 20px hsla(${activeIndustry.accentHue}, 85%, 55%, 0.4)`,
                            }}
                          >
                            0{idx + 1}
                          </div>

                          {/* Step Name */}
                          <p className="mt-3 text-xs font-bold text-text-heading">
                            {stepItem.step}
                          </p>
                          <span
                            className="mt-1 inline-block rounded-md px-2 py-0.5 text-[10px] font-semibold"
                            style={{
                              backgroundColor: `hsla(${activeIndustry.accentHue}, 85%, 55%, 0.12)`,
                              color: `hsl(${activeIndustry.accentHue}, 85%, 55%)`,
                            }}
                          >
                            {stepItem.sublabel}
                          </span>
                          <p className="mt-2 text-[11px] leading-relaxed text-text-muted text-center">
                            {stepItem.description}
                          </p>

                          {/* Connecting Line on Desktop between nodes */}
                          {idx < activeIndustry.workflow.length - 1 && (
                            <div
                              className="hidden sm:block absolute top-6 left-[60%] w-[80%] h-0.5 pointer-events-none"
                              style={{
                                background: `linear-gradient(90deg, hsl(${activeIndustry.accentHue}, 85%, 55%), transparent)`,
                              }}
                            >
                              {/* Animated Data Pulse dot */}
                              <motion.div
                                animate={{ x: [0, 80, 0] }}
                                transition={{
                                  duration: 2.5,
                                  repeat: Infinity,
                                  ease: 'easeInOut',
                                  delay: idx * 0.4,
                                }}
                                className="h-1.5 w-1.5 -top-0.5 absolute rounded-full bg-white shadow-md"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* View 2: Live WhatsApp Journey Simulation */
                <div className="mb-8">
                  <div className="mb-4 text-center">
                    <h4 className="text-sm font-bold text-text-heading">
                      Watch how a client interacts with {activeIndustry.name}
                    </h4>
                    <p className="text-xs text-text-muted mt-1">
                      Simulated autonomous WhatsApp interaction, ticket routing, and instant document generation.
                    </p>
                  </div>
                  <WhatsAppSimulator
                    simulation={getSimulationForIndustry(activeIndustry.id, activeIndustry.name)}
                    compact={true}
                    autoPlay={true}
                  />
                </div>
              )}

              {/* Modal Footer / Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-subtle/50 pt-5">
                <span className="text-xs text-text-muted">
                  Full multi-branch &amp; multi-tenant deployment available.
                </span>
                <button
                  onClick={() =>
                    handleContactPrefill(
                      activeIndustry.name,
                      `Hello! I want to deploy the ${activeIndustry.badge} (${activeIndustry.coreModules.join(', ')}) for our ${activeIndustry.name} business.`
                    )
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold text-ink shadow-lg transition-all hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: `hsl(${activeIndustry.accentHue}, 85%, 55%)`,
                  }}
                >
                  Deploy this OS for our business
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  );
}
