'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/providers/LanguageProvider';
import { IndustrySimulation } from '@/data/industrySimulations';
import { RotateCcw, Play, Pause, FileText, CheckCheck, ShieldCheck } from 'lucide-react';

interface WhatsAppSimulatorProps {
  simulation: IndustrySimulation;
  compact?: boolean;
  autoPlay?: boolean;
  onSelectAnother?: () => void;
}

export function WhatsAppSimulator({
  simulation,
  compact = false,
  autoPlay = false,
}: WhatsAppSimulatorProps) {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  const messages = simulation.messages || [];

  // Reset when simulation changes
  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(autoPlay);
    setIsTyping(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, [simulation.id, autoPlay]);

  // Auto-scroll chat to bottom as new messages arrive
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [currentStep, isTyping]);

  // Step progression logic
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (currentStep >= messages.length) {
      setIsPlaying(false);
      setIsTyping(false);
      return;
    }

    const nextMsg = messages[currentStep];
    const isBot = nextMsg.from === 'ai' || nextMsg.from === 'system';

    if (isBot) {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setIsTyping(false);
        setCurrentStep((prev) => prev + 1);
      }, 1200);
    } else {
      setIsTyping(false);
      timerRef.current = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, 900);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStep, messages]);

  const handlePlayToggle = () => {
    if (currentStep >= messages.length) {
      setCurrentStep(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setIsTyping(false);
    setCurrentStep(0);
  };

  const handleJumpToStep = (stepIndex: number) => {
    setIsPlaying(false);
    setIsTyping(false);
    setCurrentStep(stepIndex + 1);
  };

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border-subtle bg-indigo/30 px-4 py-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePlayToggle}
            className="inline-flex items-center gap-1.5 rounded-full bg-amber px-4 py-1.5 text-xs font-semibold text-ink shadow-md transition-all hover:bg-amber-dim active:scale-95"
          >
            {currentStep >= messages.length ? (
              <>
                <RotateCcw className="h-3.5 w-3.5" />
                <span>{language === 'te' ? 'మళ్లీ చూడండి' : 'Replay'}</span>
              </>
            ) : isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>{language === 'te' ? 'ఆపండి' : 'Pause'}</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>{language === 'te' ? 'డెమో ప్రారంభించండి' : 'Play Journey'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="rounded-full border border-border-subtle px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-text-muted hover:text-text-soft"
          >
            {language === 'te' ? 'రీసెట్' : 'Reset'}
          </button>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center gap-1.5">
          {messages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleJumpToStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx < currentStep
                  ? 'w-4 sm:w-5 bg-teal'
                  : idx === currentStep
                  ? 'w-3 bg-amber animate-pulse'
                  : 'w-1.5 sm:w-2 bg-white/20'
              }`}
              aria-label={`Jump to message ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Phone Mockup Frame */}
      <div
        className={`relative mx-auto rounded-[2.2rem] border-[3px] border-border-subtle/80 bg-ink p-2.5 sm:p-3 shadow-2xl shadow-indigo/20 ${
          compact ? 'max-w-md' : 'max-w-xl'
        }`}
      >
        {/* Phone Notch */}
        <div className="mx-auto mb-2 h-3.5 w-24 rounded-full bg-indigo/80 flex items-center justify-center">
          <div className="h-1 w-10 rounded-full bg-border-subtle/50" />
        </div>

        {/* Phone Screen */}
        <div className="overflow-hidden rounded-[1.8rem] border border-border-subtle/50 bg-[#0B141A]">
          {/* WhatsApp Chat Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-[#1F2C34] px-3.5 py-2.5 text-white">
            <div className="flex items-center gap-2.5">
              <div
                className={`relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr ${simulation.avatarGradient} font-bold text-ink text-xs shadow-sm`}
              >
                {simulation.brandInitials}
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-[#1F2C34] bg-teal" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs sm:text-sm font-semibold text-text-heading">
                    {simulation.brandName}
                  </p>
                  <svg className="h-3.5 w-3.5 text-teal shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="text-[10px] text-teal">
                  {isTyping
                    ? (language === 'te' ? 'టైప్ చేస్తున్నారు...' : 'typing...')
                    : (language === 'te' ? 'ఆటోమేటెడ్ అసిస్టెంట్ • ఆన్‌లైన్' : 'Automated Assistant • Online')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-text-muted">
              <ShieldCheck className="h-4 w-4 text-teal/80" />
            </div>
          </div>

          {/* Chat Message Stream */}
          <div
            ref={chatScrollRef}
            className={`${
              compact ? 'h-[300px]' : 'h-[350px]'
            } overflow-y-auto p-3.5 space-y-2.5 scroll-smooth bg-[radial-gradient(#1f2c34_1px,transparent_1px)] [background-size:16px_16px]`}
          >
            {/* Security notice */}
            <div className="mx-auto my-1 max-w-[280px] rounded-lg bg-[#182229] px-2.5 py-1 text-center text-[10px] text-[#ffd279] shadow-sm">
              {simulation.securityNotice || (language === 'te' ? '🔒 ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్టెడ్ ఆటోమేటెడ్ సెషన్.' : '🔒 End-to-end encrypted autonomous session.')}
            </div>

            {/* Visible messages */}
            {messages.slice(0, currentStep).map((msg, index) => {
              const isCustomer = msg.from === 'customer';
              const showAttachment =
                simulation.attachment &&
                index === simulation.attachment.attachAtStepIndex;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`relative max-w-[85%] rounded-2xl px-3.5 py-2 shadow-sm text-xs leading-relaxed ${
                      isCustomer
                        ? 'bg-[#005C4B] text-white rounded-tr-none'
                        : 'bg-[#202C33] text-text-soft rounded-tl-none border border-white/5'
                    }`}
                  >
                    {/* Dynamic Attachment Card */}
                    {showAttachment && simulation.attachment && (
                      <div className="mb-2 flex items-center gap-2.5 rounded-xl bg-[#111B21] p-2 border border-white/10">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-red-400 font-bold text-xs">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <p className="truncate text-xs font-semibold text-text-heading">
                            {simulation.attachment.name}
                          </p>
                          <p className="text-[10px] text-text-muted">
                            {simulation.attachment.size}
                          </p>
                        </div>
                        <div className="rounded-full bg-teal/15 px-2 py-0.5 text-[10px] font-bold text-teal">
                          {simulation.attachment.badge}
                        </div>
                      </div>
                    )}

                    <p>{msg.text}</p>

                    <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-text-muted">
                      <span>{msg.time}</span>
                      {isCustomer && (
                        <CheckCheck className="h-3 w-3 text-[#53bdeb]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Animated Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-none bg-[#202C33] px-3.5 py-2 border border-white/5">
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}

            {/* Initial empty state */}
            {currentStep === 0 && !isTyping && (
              <div className="flex h-full min-h-[190px] flex-col items-center justify-center text-center p-4">
                <button
                  onClick={handlePlayToggle}
                  className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-amber/15 text-amber transition-transform hover:scale-110 active:scale-95"
                  aria-label="Start demo"
                >
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </button>
                <p className="text-xs font-semibold text-text-heading">
                  {language === 'te'
                    ? 'డెమో చూడటానికి “ప్రారంభించండి” క్లిక్ చేయండి'
                    : 'Click “Play Journey” to simulate'}
                </p>
                <p className="mt-0.5 text-[11px] text-text-muted max-w-[240px]">
                  {language === 'te'
                    ? 'రియల్-టైమ్ ఆటోమేటెడ్ కస్టమర్ సంభాషణ & డాక్యుమెంట్ డెలివరీని చూడండి'
                    : 'Watch real-time autonomous client interaction & document delivery'}
                </p>
              </div>
            )}
          </div>

          {/* Chat Input Bar Mock */}
          <div className="flex items-center gap-2 border-t border-white/5 bg-[#202C33] p-2 text-text-muted">
            <div className="flex-1 rounded-full bg-[#2A3942] px-3.5 py-1 text-xs text-text-muted flex items-center justify-between">
              <span className="text-[11px]">
                {language === 'te' ? 'సమాధానం టైప్ చేయండి...' : 'Type a response...'}
              </span>
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal text-ink">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
