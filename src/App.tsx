import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { OpeningScreen } from './components/OpeningScreen';
import { FloatingEffects } from './components/FloatingEffects';
import { Navbar } from './components/Navbar';
import { BirthdayHero } from './components/BirthdayHero';
import { BirthdayCake } from './components/BirthdayCake';
import { BirthdayLetter } from './components/BirthdayLetter';
import { FinalCelebration } from './components/FinalCelebration';
import { MusicPlayer } from './components/MusicPlayer';
import { ScrollProgress } from './components/ScrollProgress';
import { BackToTop } from './components/BackToTop';

export const App: React.FC = () => {
  const [isSiteOpen, setIsSiteOpen] = useState(false);
  const [musicTriggered, setMusicTriggered] = useState(false);

  const handleOpenExperience = () => {
    setIsSiteOpen(true);
    setMusicTriggered(true);
  };

  const handleRestartExperience = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsSiteOpen(false);
    }, 600);
  };

  const handleScrollToLetter = () => {
    const el = document.getElementById('letter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCelebrate = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.2 },
      colors: ['#F8C8DC', '#DCD6FF', '#FFE1D6', '#E8C98A'],
    });
  };

  return (
    <div className="relative min-h-screen selection:bg-[#F8C8DC] selection:text-[#49334F] bg-[#FFF9FD]">
      {/* Top Reading Progress Line */}
      <ScrollProgress />

      {/* Floating Dreamy Atmosphere (Rose Petals, Glowing Orbs, Twinkling Stars, Click Hearts) */}
      <FloatingEffects />

      {/* Cinematic Opening Full-screen Experience */}
      <OpeningScreen
        isOpen={isSiteOpen}
        onOpen={handleOpenExperience}
      />

      {/* Persistent Floating Navbar */}
      <Navbar onCelebrate={handleCelebrate} />

      {/* Main Birthday Content Sections */}
      <main className="relative z-10 w-full overflow-hidden">
        {/* Section 1: Full-Screen Birthday Hero */}
        <BirthdayHero onScrollToLetter={handleScrollToLetter} />

        {/* Section 2: Interactive 3-Tier Birthday Cake with Make a Wish */}
        <BirthdayCake />

        {/* Section 3: Heartfelt Birthday Letter with Envelope Animation */}
        <BirthdayLetter />

        {/* Section 4: Final Birthday Celebration & Sunset Finale */}
        <FinalCelebration onRestartExperience={handleRestartExperience} />
      </main>

      {/* Floating Background Music Player */}
      <MusicPlayer autoPlayTriggered={musicTriggered} />

      {/* Back to Top Floating Button */}
      <BackToTop />
    </div>
  );
};

export default App;
