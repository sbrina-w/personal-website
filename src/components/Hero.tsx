import React, { useEffect, useState } from 'react';
import '../styles/hero.css';

interface HeroProps {
  onScroll: () => void;
  onMenuItemClick: (itemId: string) => void;
}

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

const heroMenuItems: MenuItem[] = [
  {
    id: 'about',
    title: 'About',
    subtitle: 'Strawberry Tart',
    description: 'Get to know me\nbetter',
    image: '/illustrations/strawberry-tart-cropped.png',
  },
  {
    id: 'experience',
    title: 'Experience',
    subtitle: 'Fig Cake',
    description: 'My professional\njourney and roles',
    image: '/illustrations/fig-cake-cropped.png',
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Raspberry Roll Cake',
    description: 'Work and creations\nI\'m proud of',
    image: '/illustrations/roll-cake-cropped.png',
  },
  {
    id: 'art',
    title: 'Art',
    subtitle: 'Matcha Basque\nCheesecake',
    description: 'My artistic\nexplorations',
    image: '/illustrations/matcha-basque-cropped.png',
  },
];

export const Hero: React.FC<HeroProps> = ({ onScroll, onMenuItemClick }) => {
  const [scrollY, setScrollY] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
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

  const opacity = scrollY > 50 ? Math.max(0, 1 - scrollY / 200) : 1;
  const finalOpacity = isReady ? opacity : 0;

  return (
    <section className="hero">
      <div className="hero-wrapper">
        {/* Left Column */}
        <div className="hero-left">
          <div>
            <h1 className="hero-main-title">Sabrina Wang</h1>
            <div className="hero-sidebar">
              <p className="hero-label">Portfolio</p>
              <p className="hero-tagline">Welcome<br />to my<br />digital<br />café</p>
            </div>
          </div>
          
          <div className="hero-footer-left">
            <span>
              <p className="hero-decorative-text">/ / / / / / / / </p>
              <p className="hero-footer-text"> Software Engineering @University of Waterloo</p>
            </span>
            
          </div>
        </div>

        {/* Center Column */}
        <div className="hero-center">
          {/* Menu Title Section */}
          <div className="hero-menu-title-section">
            <h2 className="hero-menu-title">Order Menu</h2>
            <div className="hero-menu-divider"></div>
          </div>

          {/* Menu Content */}
          <div className="hero-menu-grid">
            {/* Top Row */}
            <div className="hero-menu-row">
              {heroMenuItems.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="hero-menu-card"
                  onClick={() => onMenuItemClick(item.id)}
                >
                  <div className="hero-menu-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="hero-menu-card-text">
                    <h3 className="hero-menu-card-title">{item.title}</h3>
                    <p className="hero-menu-card-subtitle">{item.subtitle}</p>
                    <p className="hero-menu-card-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="hero-menu-row">
              {heroMenuItems.slice(2, 4).map((item) => (
                <div
                  key={item.id}
                  className="hero-menu-card"
                  onClick={() => onMenuItemClick(item.id)}
                >
                  <div className="hero-menu-card-image">
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div className="hero-menu-card-text">
                    <h3 className="hero-menu-card-title">{item.title}</h3>
                    <p className="hero-menu-card-subtitle">{item.subtitle}</p>
                    <p className="hero-menu-card-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="hero-footer-center">
            <div className="hero-scroll-arrow-container">
              <p className="hero-scroll-text">Scroll to explore</p>
              <div className="scroll-arrow"></div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="hero-right">
          <div className="hero-decorative-elements">
            <span className="hero-plus">⟢ ⟢ ⟢ ⟢ ⟢ ⟢</span>
          </div>
          
          <div className="hero-footer-right">
            <p className="hero-footer-text">Last updated: 11.30.2025</p>
          </div>
        </div>
      </div>
    </section>
  );
};