import React, { useEffect, useState } from 'react';
import '../styles/hero.css';

interface HeroProps {
  onScroll: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScroll }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure layout is ready before showing scroll indicator
    const timer = setTimeout(() => setIsReady(true), 100);
    
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > 100) {
        onScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [onScroll]);

  // Only show scroll indicator on hero section
  const opacity = scrollY > 50 ? Math.max(0, 1 - scrollY / 200) : 1;
  const finalOpacity = isReady ? opacity : 0;

  return (
    <section className="hero">
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <h1 className="hero-title">Welcome to My Cafe</h1>
        <p className="hero-subtitle">A creative journey served fresh</p>
      </div>

      <div 
        className="hero-scroll-indicator"
        style={{ 
          opacity: finalOpacity,
          pointerEvents: finalOpacity === 0 ? 'none' : 'auto',
          visibility: isReady ? 'visible' : 'hidden'
        }}
      >
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};
