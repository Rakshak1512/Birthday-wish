import React from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayContent';

interface FinalCelebrationProps {
  onRestartExperience: () => void;
}

export const FinalCelebration: React.FC<FinalCelebrationProps> = ({ onRestartExperience }) => {
  const data = BIRTHDAY_DATA.finalCelebration;

  const triggerGrandCelebration = () => {
    // Grand multi-angle confetti explosion
    const end = Date.now() + 2 * 1000;
    const colors = ['#F8C8DC', '#DCD6FF', '#FFE1D6', '#E8C98A', '#E99AB5', '#FFF9FD'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    onRestartExperience();
  };

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-between pt-24 pb-12 px-4 text-center overflow-hidden bg-gradient-to-t from-[#DCD6FF]/40 via-[#F8C8DC]/30 to-transparent">
      {/* Ambient Sunset Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-gradient-to-t from-[#FFE1D6]/40 via-[#F8C8DC]/40 to-transparent blur-3xl" />
        
        {/* Floating golden sparkle stars */}
        {[...Array(14)].map((_, i) => (
          <div
            key={`final-star-${i}`}
            className="absolute text-amber-200/80 animate-twinkle"
            style={{
              top: `${(i * 19) % 85}%`,
              left: `${(i * 27) % 92}%`,
              fontSize: `${10 + (i % 3) * 6}px`,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl w-full mx-auto my-auto flex flex-col items-center">
        {/* Delicate Heart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-white/80 border border-[#F8C8DC] shadow-md flex items-center justify-center text-[#E99AB5] mb-6"
        >
          <Heart className="w-8 h-8 fill-[#F8C8DC] text-[#E99AB5] animate-pulse-glow" />
        </motion.div>

        {/* Prelude */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif italic text-lg sm:text-xl text-[#49334F]/80 mb-3"
        >
          {data.prelude}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#49334F] font-normal tracking-wide mb-6"
        >
          {data.heading}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-base sm:text-xl text-[#49334F]/85 font-light leading-relaxed max-w-lg mb-10 font-sans"
        >
          {data.subtext}
        </motion.p>

        {/* Celebrate Again Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={triggerGrandCelebration}
            className="px-8 py-4 rounded-full font-medium text-base text-white bg-gradient-to-r from-[#E99AB5] via-[#E8C98A] to-[#DCD6FF] shadow-[0_10px_30px_rgba(233,154,181,0.4)] hover:shadow-[0_15px_35px_rgba(233,154,181,0.55)] transition-all flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white" />
            <span>{data.buttonText}</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full pt-16 border-t border-[#49334F]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#49334F]/60 max-w-5xl mx-auto gap-3">
        <p className="font-serif italic text-sm">
          {data.footer}
        </p>
        <p className="flex items-center gap-1.5 font-sans">
          <span>Wishing you happiness & wonder today and always</span>
          <span>♡</span>
        </p>
      </footer>
    </section>
  );
};
