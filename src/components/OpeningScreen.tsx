import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayContent';

interface OpeningScreenProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onOpen, isOpen }) => {
  const handleOpenClick = () => {
    // Gentle pastel confetti and sparkles burst
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F8C8DC', '#DCD6FF', '#FFE1D6', '#E8C98A', '#FFF9FD'],
      scalar: 1.1,
      shapes: ['circle'],
    });

    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#F8C8DC', '#E99AB5', '#DCD6FF'],
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFE1D6', '#E8C98A', '#F8C8DC'],
      });
    }, 200);

    onOpen();
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          key="opening-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8C8DC]/80 via-[#DCD6FF]/60 to-[#FFF9FD] backdrop-blur-xl"
        >
          {/* Drifting Clouds & Pastel Horizon */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ambient cloud orbs */}
            <div className="absolute top-10 left-1/4 w-80 h-36 bg-white/40 rounded-full blur-2xl animate-cloud-drift" />
            <div className="absolute bottom-20 right-1/4 w-96 h-48 bg-white/50 rounded-full blur-3xl animate-cloud-drift" style={{ animationDelay: '-12s' }} />

            {/* Floating Stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={`open-star-${i}`}
                className="absolute text-amber-200/80 animate-twinkle"
                style={{
                  top: `${(i * 17) % 92}%`,
                  left: `${(i * 21) % 95}%`,
                  fontSize: `${10 + (i % 3) * 5}px`,
                  animationDelay: `${i * 0.3}s`,
                }}
              >
                ✦
              </div>
            ))}

            {/* Floating Rose Petals */}
            {[...Array(12)].map((_, i) => (
              <div
                key={`open-petal-${i}`}
                className="absolute rounded-full opacity-70"
                style={{
                  top: `${(i * 15) % 90}%`,
                  left: `${(i * 25 + 10) % 90}%`,
                  width: `${14 + (i % 3) * 4}px`,
                  height: `${18 + (i % 2) * 5}px`,
                  background: 'linear-gradient(135deg, #F8C8DC, #E99AB5)',
                  borderRadius: '60% 40% 60% 40%',
                  animation: `floatSlow ${5 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.5}s`,
                  boxShadow: '0 4px 10px rgba(233,154,181,0.25)',
                }}
              />
            ))}
          </div>

          {/* Central Card & Content */}
          <div className="relative z-10 max-w-xl mx-4 p-8 sm:p-12 text-center flex flex-col items-center">
            {/* Glowing Heart in the center */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="relative mb-6 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[#E99AB5] rounded-full blur-xl opacity-50 animate-pulse-glow" />
              <div className="relative w-16 h-16 rounded-full bg-white/80 border border-[#F8C8DC] shadow-lg flex items-center justify-center text-[#E99AB5]">
                <Heart className="w-8 h-8 fill-[#F8C8DC] stroke-[#E99AB5]" />
              </div>
            </motion.div>

            {/* Staggered Text 1: Prelude quote */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="font-serif italic text-lg sm:text-xl text-[#49334F]/80 mb-6 tracking-wide max-w-md font-light"
            >
              &ldquo;Some people make life a little brighter just by being themselves...&rdquo;
            </motion.p>

            {/* Staggered Text 2: For Someone Truly Special */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 border border-[#E8C98A]/50 text-xs sm:text-sm font-medium text-[#49334F]/90 mb-4 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8C98A]" />
              <span>{BIRTHDAY_DATA.titleHonorific}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#E8C98A]" />
            </motion.div>

            {/* Staggered Text 3: Recipient Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.1, duration: 1 }}
              className="text-4xl sm:text-6xl font-serif font-normal tracking-[0.2em] text-[#49334F] uppercase mb-3 drop-shadow-sm"
              style={{
                textShadow: '0 0 20px rgba(248, 200, 220, 0.8), 0 2px 4px rgba(73, 51, 79, 0.1)',
              }}
            >
              {BIRTHDAY_DATA.recipientName}
            </motion.h1>

            {/* Staggered Text 4: Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.8 }}
              className="font-script text-2xl sm:text-3xl text-[#E99AB5] mb-8 font-semibold"
            >
              {BIRTHDAY_DATA.tagline}
            </motion.p>

            {/* Animated Glass Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.4, duration: 0.8 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(233,154,181,0.45)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleOpenClick}
                className="group relative px-8 py-4 rounded-full font-medium text-base sm:text-lg text-[#49334F] bg-white/80 hover:bg-white border border-[#E99AB5]/60 shadow-[0_8px_25px_rgba(248,200,220,0.5)] backdrop-blur-md transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Open Your Birthday Surprise 🌸
                </span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8C8DC]/30 via-[#DCD6FF]/30 to-[#FFE1D6]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
