import React, { useEffect, useState } from 'react';

interface ClickHeart {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const FloatingEffects: React.FC = () => {
  const [clickHearts, setClickHearts] = useState<ClickHeart[]>([]);

  // Subtle click heart reactions anywhere on screen
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicked on interactive elements that already trigger effects
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('input')) {
        return;
      }

      const colors = ['#F8C8DC', '#DCD6FF', '#E99AB5', '#FFE1D6', '#E8C98A'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newHeart: ClickHeart = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        color: randomColor,
      };

      setClickHearts((prev) => [...prev.slice(-12), newHeart]);

      setTimeout(() => {
        setClickHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 1200);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-20">
      {/* Soft Ambient Glowing Orbs */}
      <div 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F8C8DC 0%, rgba(255,249,253,0) 70%)' }}
      />
      <div 
        className="absolute top-1/3 -right-28 w-[30rem] h-[30rem] rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #DCD6FF 0%, rgba(255,249,253,0) 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #FFE1D6 0%, rgba(255,249,253,0) 70%)' }}
      />
      <div 
        className="absolute -bottom-20 right-1/4 w-96 h-96 rounded-full opacity-35 blur-3xl"
        style={{ background: 'radial-gradient(circle, #F8C8DC 0%, rgba(220,214,255,0) 70%)' }}
      />

      {/* Floating Rose Petals & Sparkling Stars */}
      <div className="absolute inset-0">
        {[...Array(14)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute rounded-full opacity-60"
            style={{
              top: `${(i * 13) % 95}%`,
              left: `${(i * 17) % 96}%`,
              width: `${12 + (i % 4) * 3}px`,
              height: `${16 + (i % 3) * 4}px`,
              backgroundColor: i % 2 === 0 ? '#F8C8DC' : '#E99AB5',
              borderRadius: '70% 30% 70% 30% / 60% 40% 60% 40%',
              transform: `rotate(${i * 25}deg)`,
              animation: `floatSlow ${5 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.7)}s`,
              boxShadow: '0 2px 8px rgba(233, 154, 181, 0.25)',
            }}
          />
        ))}

        {[...Array(18)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-twinkle text-amber-200"
            style={{
              top: `${(i * 19 + 5) % 90}%`,
              left: `${(i * 23 + 3) % 94}%`,
              animationDelay: `${(i * 0.4)}s`,
              animationDuration: `${2.5 + (i % 3)}s`,
              opacity: 0.55,
              fontSize: `${8 + (i % 3) * 4}px`,
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* Click Hearts Burst */}
      {clickHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute font-serif text-lg animate-ping select-none transition-all duration-1000 ease-out"
          style={{
            left: heart.x - 10,
            top: heart.y - 15,
            color: heart.color,
            textShadow: `0 0 10px ${heart.color}`,
          }}
        >
          ♡
        </span>
      ))}
    </div>
  );
};
