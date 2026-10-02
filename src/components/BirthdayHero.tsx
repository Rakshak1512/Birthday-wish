import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, Mail } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayContent';

interface BirthdayHeroProps {
  onScrollToLetter: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({
  onScrollToLetter,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden"
    >
      {/* Decorative Floral Aura Behind Hero */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[22rem] sm:w-[32rem] md:w-[42rem] h-[22rem] sm:h-[32rem] md:h-[42rem] pointer-events-none">
        {/* Soft radial glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F8C8DC]/30 via-[#DCD6FF]/40 to-[#FFE1D6]/30 blur-3xl animate-pulse-glow" />
        
        {/* Circular Floral Ring SVG */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full opacity-40 animate-float-slow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="160"
            stroke="url(#floralGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />
          <circle
            cx="200"
            cy="200"
            r="185"
            stroke="url(#floralGrad2)"
            strokeWidth="1"
            strokeDasharray="2 12"
          />
          <defs>
            <linearGradient id="floralGrad" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E99AB5" />
              <stop offset="0.5" stopColor="#DCD6FF" />
              <stop offset="1" stopColor="#E8C98A" />
            </linearGradient>
            <linearGradient id="floralGrad2" x1="400" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F8C8DC" />
              <stop offset="1" stopColor="#DCD6FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Glass Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl w-full mx-auto p-8 sm:p-14 rounded-3xl glass-panel shadow-[0_20px_50px_rgba(73,51,79,0.06)] border border-[#F8C8DC]/60 backdrop-blur-xl flex flex-col items-center"
      >
        {/* Top delicate badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#E99AB5]/40 text-xs sm:text-sm font-medium text-[#49334F] shadow-sm mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8C98A]" />
          <span>A Special Celebration Just for You</span>
          <Heart className="w-3 h-3 fill-[#E99AB5] text-[#E99AB5]" />
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#49334F] leading-tight tracking-tight mb-4"
        >
          Happy Birthday,{' '}
          <span className="relative inline-block text-[#E99AB5] drop-shadow-sm font-normal">
            Shamitha!
            {/* Sparkles around her name */}
            <span className="absolute -top-3 -right-5 text-sm sm:text-base animate-twinkle text-[#E8C98A]">✦</span>
            <span className="absolute -bottom-2 -left-4 text-xs sm:text-sm animate-twinkle text-[#DCD6FF]" style={{ animationDelay: '1s' }}>✦</span>
          </span>{' '}
          <span className="inline-block animate-float-slow">🎂</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-base sm:text-xl md:text-2xl text-[#49334F]/85 font-light max-w-2xl leading-relaxed mb-8 sm:mb-10 font-sans"
        >
          {BIRTHDAY_DATA.hero.subtitle}
        </motion.p>

        {/* Single Button to Letter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex items-center justify-center w-full sm:w-auto"
        >
          <motion.button
            whileHover={{ scale: 1.05, translateY: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onScrollToLetter}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-medium text-base text-white bg-gradient-to-r from-[#E99AB5] via-[#E8C98A] to-[#DCD6FF] shadow-[0_8px_25px_rgba(233,154,181,0.35)] hover:shadow-[0_12px_30px_rgba(233,154,181,0.5)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>{BIRTHDAY_DATA.hero.ctaLetter}</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-12 sm:mt-16 flex flex-col items-center gap-2 text-xs sm:text-sm text-[#49334F]/60 cursor-pointer"
        onClick={() => {
          const el = document.getElementById('cake');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="tracking-widest uppercase font-serif text-[11px]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-[#E99AB5]" />
        </motion.div>
      </motion.div>
    </section>
  );
};
