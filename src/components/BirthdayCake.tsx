import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Heart } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayContent';

export const BirthdayCake: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleMakeWish = () => {
    setCandlesLit(false);
    setWishMade(true);

    // Launch pastel confetti & stars burst
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#F8C8DC', '#DCD6FF', '#FFE1D6', '#E8C98A', '#FFF9FD', '#E99AB5'],
      scalar: 1.2,
    });

    setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 70,
        spread: 60,
        origin: { x: 0.2, y: 0.55 },
        colors: ['#F8C8DC', '#E99AB5'],
      });
      confetti({
        particleCount: 40,
        angle: 110,
        spread: 60,
        origin: { x: 0.8, y: 0.55 },
        colors: ['#DCD6FF', '#E8C98A'],
      });
    }, 250);
  };

  const handleRelight = () => {
    setCandlesLit(true);
  };

  return (
    <section id="cake" className="relative py-20 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto text-center flex flex-col items-center">
        {/* Section Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#DCD6FF] text-xs sm:text-sm font-medium text-[#49334F] shadow-sm mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#E8C98A]" />
          <span>Interactive Birthday Cake</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#49334F] mb-3">
          Blow the Candles & Make a Wish
        </h2>
        <p className="text-sm sm:text-base text-[#49334F]/70 max-w-lg mb-10">
          Close your eyes, think of your sweetest hope for this year, and blow out the candles.
        </p>

        {/* Illustrated 3-Tier Birthday Cake Container */}
        <div className="relative w-72 sm:w-84 md:w-96 h-80 flex flex-col items-center justify-end mb-8 select-none">
          {/* Subtle Ambient Cake Glow */}
          <div className="absolute -bottom-4 w-72 h-16 bg-[#F8C8DC]/40 rounded-full blur-xl pointer-events-none" />

          {/* Candle Flames & Wicks */}
          <div className="flex justify-center items-end gap-6 sm:gap-8 mb-[-4px] z-20">
            {[1, 2, 3].map((candleIndex) => (
              <div key={candleIndex} className="relative flex flex-col items-center">
                {/* Flame */}
                <AnimatePresence>
                  {candlesLit ? (
                    <motion.div
                      key={`flame-${candleIndex}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.2, opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-5 h-7 mb-1 flex items-center justify-center"
                    >
                      {/* Outer flame glow */}
                      <div className="absolute inset-0 bg-[#ffd066] rounded-full blur-[6px] opacity-70 animate-pulse-glow" />
                      {/* Core flame shape */}
                      <div
                        className="w-3.5 h-5 bg-gradient-to-t from-[#ff8c42] via-[#ffd066] to-[#fff4c2] rounded-[50%_50%_35%_35%] animate-flame shadow-[0_0_12px_#ffb300]"
                        style={{ animationDelay: `${candleIndex * 0.25}s` }}
                      />
                    </motion.div>
                  ) : (
                    /* Smoke puff when extinguished */
                    <motion.div
                      key={`smoke-${candleIndex}`}
                      initial={{ opacity: 0.8, y: 0, scale: 0.8 }}
                      animate={{ opacity: 0, y: -20, scale: 1.5 }}
                      transition={{ duration: 0.8 }}
                      className="w-2.5 h-4 bg-gray-300/60 rounded-full blur-xs mb-1"
                    />
                  )}
                </AnimatePresence>

                {/* Candle Wick */}
                <div className="w-0.5 h-2.5 bg-[#49334F]/70" />

                {/* Pastel Striped Candle Body */}
                <div
                  className="w-3 sm:w-3.5 h-12 rounded-t-sm shadow-sm relative overflow-hidden"
                  style={{
                    background:
                      candleIndex === 2
                        ? 'repeating-linear-gradient(45deg, #FFE1D6, #FFE1D6 4px, #F8C8DC 4px, #F8C8DC 8px)'
                        : 'repeating-linear-gradient(45deg, #DCD6FF, #DCD6FF 4px, #FFF9FD 4px, #FFF9FD 8px)',
                    border: '1px solid rgba(232, 201, 138, 0.4)',
                  }}
                />
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Layer) */}
          <div className="relative w-36 sm:w-44 h-14 rounded-t-2xl bg-gradient-to-b from-[#FFF9FD] to-[#F8C8DC] border border-[#F8C8DC] shadow-sm flex flex-col justify-between items-center overflow-hidden z-10">
            {/* White Cream Frosting Drops */}
            <div className="w-full flex justify-around">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-4 h-3 bg-white rounded-b-full shadow-xs -mt-0.5"
                />
              ))}
            </div>
            {/* Decorative Gold & Lavender Pearls */}
            <div className="flex gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E8C98A] shadow-xs" />
              <span className="w-2 h-2 rounded-full bg-[#DCD6FF]" />
              <span className="w-2 h-2 rounded-full bg-[#E99AB5]" />
              <span className="w-2 h-2 rounded-full bg-[#DCD6FF]" />
              <span className="w-2 h-2 rounded-full bg-[#E8C98A] shadow-xs" />
            </div>
          </div>

          {/* Tier 2 (Middle Layer) */}
          <div className="relative w-52 sm:w-60 h-16 rounded-t-xl bg-gradient-to-b from-[#FFF9FD] to-[#DCD6FF] border border-[#DCD6FF] shadow-sm flex flex-col justify-between items-center overflow-hidden z-8 -mt-1">
            {/* Frosting Scallops */}
            <div className="w-full flex justify-around">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-5 h-3.5 bg-white rounded-b-full shadow-xs -mt-0.5"
                />
              ))}
            </div>
            {/* Floral pattern / gold trim line */}
            <div className="w-full px-4 flex items-center justify-between mb-2 opacity-80">
              <span className="text-[10px] text-[#E8C98A]">✦</span>
              <span className="text-xs text-[#E99AB5]">🌸</span>
              <span className="text-[10px] text-[#E8C98A]">✦</span>
              <span className="text-xs text-[#E99AB5]">🌸</span>
              <span className="text-[10px] text-[#E8C98A]">✦</span>
            </div>
          </div>

          {/* Tier 3 (Bottom Layer) */}
          <div className="relative w-68 sm:w-76 md:w-80 h-20 rounded-t-xl bg-gradient-to-b from-[#FFF9FD] via-[#FFE1D6] to-[#F8C8DC] border border-[#F8C8DC] shadow-md flex flex-col justify-between items-center overflow-hidden z-6 -mt-1">
            {/* Frosting waves */}
            <div className="w-full flex justify-around">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="w-6 h-4 bg-white rounded-b-full shadow-xs -mt-0.5"
                />
              ))}
            </div>
            {/* Bottom pearl garland */}
            <div className="w-full px-6 flex justify-between items-center mb-2.5">
              {[...Array(9)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full shadow-xs ${
                    i % 2 === 0 ? 'bg-[#E8C98A]' : 'bg-[#DCD6FF]'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Cake Stand / Plate */}
          <div className="w-80 sm:w-92 h-4 rounded-full bg-gradient-to-r from-[#FFF9FD] via-[#E8C98A]/40 to-[#FFF9FD] border border-[#E8C98A]/50 shadow-md z-4 -mt-1 flex items-center justify-center">
            <div className="w-32 h-1 bg-[#E8C98A]/60 rounded-full" />
          </div>
          <div className="w-40 h-3 rounded-b-lg bg-[#FFF9FD] border-x border-b border-[#E8C98A]/40 shadow-sm z-3" />
        </div>

        {/* Buttons: Make a Wish / Relight */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {candlesLit ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleMakeWish}
              className="px-8 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-[#E99AB5] via-[#E8C98A] to-[#DCD6FF] shadow-[0_8px_25px_rgba(233,154,181,0.4)] hover:shadow-[0_12px_30px_rgba(233,154,181,0.55)] transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>{BIRTHDAY_DATA.cake.prompt}</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleRelight}
              className="px-7 py-3 rounded-full font-medium text-sm text-[#49334F] bg-white/90 hover:bg-white border border-[#E8C98A] shadow-sm hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#E8C98A]" />
              <span>{BIRTHDAY_DATA.cake.resetPrompt}</span>
            </motion.button>
          )}
        </div>

        {/* Revealed Wish Message Card */}
        <AnimatePresence>
          {wishMade && !candlesLit && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#E99AB5]/40 shadow-lg max-w-xl mx-auto text-center"
            >
              <div className="flex items-center justify-center gap-2 text-[#E99AB5] mb-3">
                <Heart className="w-4 h-4 fill-[#F8C8DC]" />
                <span className="text-xs font-semibold uppercase tracking-wider">Your Wish Has Been Sent Into The Sky</span>
                <Heart className="w-4 h-4 fill-[#F8C8DC]" />
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-[#49334F] leading-relaxed">
                &ldquo;{BIRTHDAY_DATA.cake.revealedWish}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
