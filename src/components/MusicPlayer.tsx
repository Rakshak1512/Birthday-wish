import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { dreamyAudio } from '../utils/audioSynth';

interface MusicPlayerProps {
  autoPlayTriggered?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTriggered = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useFallbackSynth, setUseFallbackSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio('/audio/birthday-music.mp3');
    audio.loop = true;
    audio.preload = 'none';

    audio.addEventListener('error', () => {
      // Graceful fallback to our dreamy synthesizer engine if audio file is not found
      setUseFallbackSynth(true);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      dreamyAudio.stop();
    };
  }, []);

  // When user enters site via opening button, start playing if requested
  useEffect(() => {
    if (autoPlayTriggered && !isPlaying) {
      startMusic();
    }
  }, [autoPlayTriggered]);

  const startMusic = async () => {
    if (useFallbackSynth) {
      dreamyAudio.start();
      setIsPlaying(true);
      return;
    }

    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        // Fallback to web audio synth if audio tag playback failed
        setUseFallbackSynth(true);
        dreamyAudio.start();
        setIsPlaying(true);
      }
    } else {
      dreamyAudio.start();
      setIsPlaying(true);
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    dreamyAudio.stop();
    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="glass-panel rounded-full p-2 pl-3 pr-4 shadow-[0_8px_30px_rgba(73,51,79,0.12)] border border-[#F8C8DC] flex items-center gap-3 backdrop-blur-xl"
      >
        {/* Toggle Button */}
        <button
          onClick={toggleMusic}
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E99AB5] to-[#DCD6FF] text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition cursor-pointer"
          aria-label={isPlaying ? 'Pause birthday music' : 'Play birthday music'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
        </button>

        {/* Music Status Details */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-[#49334F]">
              {isPlaying ? 'Dreamy Melody' : 'Play Music'}
            </span>
            {isPlaying && (
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-[#E99AB5] animate-pulse" />
                <span className="w-0.5 h-2 bg-[#E99AB5] animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 h-3 bg-[#E99AB5] animate-pulse" style={{ animationDelay: '0.4s' }} />
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#49334F]/60">
            {isPlaying ? 'Soft Birthday Chimes 🌸' : 'Click to listen'}
          </span>
        </div>

        {/* Subtle Icon Indicator */}
        <button
          onClick={toggleMusic}
          className="text-[#49334F]/60 hover:text-[#E99AB5] p-1 transition cursor-pointer"
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </motion.div>
    </div>
  );
};
