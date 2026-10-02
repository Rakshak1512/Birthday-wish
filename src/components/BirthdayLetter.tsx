import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, MailOpen } from 'lucide-react';
import { BIRTHDAY_DATA } from '../data/birthdayContent';

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-[#49334F]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

export const BirthdayLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="relative py-20 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-[#F8C8DC] text-xs sm:text-sm font-medium text-[#49334F] shadow-sm mb-3"
        >
          <Mail className="w-3.5 h-3.5 text-[#E99AB5]" />
          <span>A Note of Genuine Gratitude & Care</span>
        </motion.div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#49334F] mb-3 text-center">
          {BIRTHDAY_DATA.letter.heading}
        </h2>
        <p className="text-sm sm:text-base text-[#49334F]/70 max-w-md text-center mb-8">
          A sincere message written from the heart, celebrating who you are.
        </p>

        {/* Envelope Trigger (when closed) */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md flex flex-col items-center cursor-pointer group"
            onClick={toggleOpen}
          >
            {/* Elegant Closed Envelope Illustration */}
            <div className="relative w-72 sm:w-80 h-48 rounded-xl bg-gradient-to-br from-[#FFF9FD] via-[#F8C8DC]/50 to-[#DCD6FF]/60 border border-[#E99AB5]/40 shadow-[0_15px_35px_rgba(73,51,79,0.08)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_45px_rgba(233,154,181,0.25)] group-hover:scale-[1.02]">
              {/* Envelope Flap Fold Lines */}
              <div className="absolute top-0 inset-x-0 h-24 border-b border-[#E99AB5]/30 bg-white/40"
                   style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />

              {/* Heart Wax Seal */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#E99AB5] to-[#F8C8DC] border-2 border-white shadow-md flex items-center justify-center text-white">
                <Heart className="w-6 h-6 fill-white" />
              </div>

              {/* Delicate Gold corner accents */}
              <span className="absolute top-2 left-2 text-[#E8C98A] text-xs">✦</span>
              <span className="absolute top-2 right-2 text-[#E8C98A] text-xs">✦</span>
              <span className="absolute bottom-2 left-2 text-[#E8C98A] text-xs">✦</span>
              <span className="absolute bottom-2 right-2 text-[#E8C98A] text-xs">✦</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="mt-6 px-8 py-3.5 rounded-full font-medium text-base text-white bg-gradient-to-r from-[#E99AB5] via-[#E8C98A] to-[#DCD6FF] shadow-[0_8px_25px_rgba(233,154,181,0.35)] flex items-center gap-2 cursor-pointer"
            >
              <span>{BIRTHDAY_DATA.letter.buttonText}</span>
              <MailOpen className="w-4 h-4 text-white" />
            </motion.button>
          </motion.div>
        )}

        {/* Opened Letter Paper */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl relative rounded-2xl bg-[#FFFDF9] border border-[#E8C98A]/50 shadow-[0_25px_60px_rgba(73,51,79,0.1)] p-6 sm:p-12 md:p-14 overflow-hidden"
            >
              {/* Delicate Floral Corner Accents */}
              <div className="absolute top-4 left-4 text-[#E8C98A]/60 text-lg select-none">❧</div>
              <div className="absolute top-4 right-4 text-[#E8C98A]/60 text-lg select-none">☙</div>
              <div className="absolute bottom-4 left-4 text-[#E8C98A]/60 text-lg select-none">☙</div>
              <div className="absolute bottom-4 right-4 text-[#E8C98A]/60 text-lg select-none">❧</div>

              {/* Gold decorative border inner frame */}
              <div className="absolute inset-3 pointer-events-none border border-[#E8C98A]/25 rounded-xl" />

              {/* Small lavender flower illustration badge */}
              <div className="flex justify-center mb-6">
                <div className="w-10 h-10 rounded-full bg-[#DCD6FF]/40 border border-[#DCD6FF] flex items-center justify-center text-sm shadow-xs">
                  🌸
                </div>
              </div>

              {/* Letter Paragraphs with Staggered Fade In */}
              <div className="space-y-4 sm:space-y-5 font-serif text-[#49334F] text-base sm:text-lg leading-relaxed relative z-10">
                {BIRTHDAY_DATA.letter.paragraphs.map((para, index) => {
                  const isGreeting = index === 0;

                  return (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + index * 0.06, duration: 0.5 }}
                      className={
                        isGreeting
                          ? 'text-2xl sm:text-3xl font-serif text-[#49334F] font-medium mb-3 sm:mb-4'
                          : 'text-[#49334F]/90 font-light leading-relaxed'
                      }
                    >
                      {renderFormattedText(para)}
                    </motion.p>
                  );
                })}
              </div>

              {/* Close / Fold Button */}
              <div className="mt-8 flex justify-center relative z-10">
                <button
                  onClick={toggleOpen}
                  className="text-xs text-[#49334F]/60 hover:text-[#E99AB5] flex items-center gap-1.5 transition cursor-pointer py-1 px-3 rounded-full hover:bg-[#F8C8DC]/20"
                >
                  <span>Close letter</span>
                  <span>✕</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
