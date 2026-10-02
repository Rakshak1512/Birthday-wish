import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface NavbarProps {
  onCelebrate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onCelebrate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Make a Wish', href: '#cake' },
    { name: 'Birthday Letter', href: '#letter' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const triggerMiniBurst = () => {
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.15 },
      colors: ['#F8C8DC', '#DCD6FF', '#E8C98A'],
    });
    onCelebrate();
  };

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-300 px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          scrolled
            ? 'glass-panel shadow-[0_10px_30px_rgba(73,51,79,0.08)] bg-white/80'
            : 'bg-white/45 backdrop-blur-md border border-white/50 shadow-sm'
        }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('#hero');
          }}
          className="flex items-center gap-1.5 font-serif text-lg sm:text-xl font-medium tracking-wider text-[#49334F] hover:text-[#E99AB5] transition-colors"
        >
          <span>Shamitha</span>
          <Heart className="w-3.5 h-3.5 fill-[#F8C8DC] text-[#E99AB5]" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-[#49334F]/80 font-medium">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleLinkClick(link.href)}
              className="hover:text-[#E99AB5] transition-colors cursor-pointer py-1 relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#E99AB5] rounded-full transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={triggerMiniBurst}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm rounded-full bg-gradient-to-r from-[#F8C8DC] to-[#DCD6FF] text-[#49334F] font-medium shadow-sm hover:shadow-md transition-all cursor-pointer"
            title="Celebrate Shamitha"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E8C98A]" />
            <span className="hidden sm:inline">Celebrate</span>
            <span>🌸</span>
          </motion.button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#49334F] hover:text-[#E99AB5] rounded-full hover:bg-black/5 transition"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto absolute top-16 inset-x-6 sm:inset-x-auto sm:w-80 glass-panel rounded-2xl p-5 shadow-xl md:hidden z-50 flex flex-col gap-3"
          >
            <div className="text-xs uppercase tracking-wider font-semibold text-[#49334F]/50 px-2">
              Explore Sections
            </div>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-left px-3 py-2 text-sm rounded-xl hover:bg-[#F8C8DC]/30 text-[#49334F] transition font-medium"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
