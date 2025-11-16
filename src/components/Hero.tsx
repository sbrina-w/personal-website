import React, { useEffect, useState } from 'react';
import '../styles/hero.css';

interface HeroProps {
  onScroll: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScroll }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrollY(y);
      if (y > 100) {
        onScroll();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onScroll]);

  return (
    <section className="hero">
      <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <h1 className="hero-title">Welcome to My Cafe</h1>
        <p className="hero-subtitle">A creative journey served fresh</p>
      </div>

      <div className="hero-scroll-indicator" style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)' }}>
        <span>Scroll to explore</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};
