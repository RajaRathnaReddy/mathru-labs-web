import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { ProblemToSystem } from '@/components/sections/ProblemToSystem';
import { WhatWeBuild } from '@/components/sections/WhatWeBuild';
import { MiniDemo } from '@/components/sections/MiniDemo';
import { Industries } from '@/components/sections/Industries';
import { HowWeWork } from '@/components/sections/HowWeWork';
import { PilotProgram } from '@/components/sections/PilotProgram';
import { WhyMathru } from '@/components/sections/WhyMathru';
import { TrustPrivacy } from '@/components/sections/TrustPrivacy';
import { Contact } from '@/components/sections/Contact';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemToSystem />
        <WhatWeBuild />
        <MiniDemo />
        <Industries />
        <HowWeWork />
        <PilotProgram />
        <WhyMathru />
        <TrustPrivacy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
