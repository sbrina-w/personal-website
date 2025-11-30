import React, { useEffect, useRef, useState } from 'react';
import '../styles/menu.css';

interface MenuItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'experience',
    title: 'Experience',
    description: 'My professional journey and roles',
    image: '/illustrations/fig-cake.png',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: 'Work and creations I\'m proud of',
    image: '/illustrations/roll-cake.png',
  },
  {
    id: 'about',
    title: 'About',
    description: 'Get to know me better',
    image: '/illustrations/strawberry-tart.png',
  },
  {
    id: 'art',
    title: 'Art',
    description: 'My artistic explorations',
    image: '/illustrations/matcha-basque.png',
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    description: 'What I love doing in my free time',
    image: '/illustrations/matcha-cookie.png',
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Let\'s connect and chat',
    image: '/illustrations/drink3.png',
  },
];

interface MenuProps {
  onMenuItemClick: (itemId: string) => void;
  mouseX?: number;
  mouseY?: number;
}

export const Menu: React.FC<MenuProps> = ({ onMenuItemClick, mouseX = 0, mouseY = 0 }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [cardGradients, setCardGradients] = useState<Record<string, { x: number; y: number; prevX: number; prevY: number }>>({});
  const prevGradientsRef = useRef<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = menu.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angleX = ((e.clientY - centerY) / rect.height) * 1;
      const angleY = ((e.clientX - centerX) / rect.width) * -1;

      setRotateX(angleX);
      setRotateY(angleY);

      // Update gradient positions for all cards with trailing effect
      const cards = menu.querySelectorAll('.menu-item-inner');
      const newGradients: Record<string, { x: number; y: number; prevX: number; prevY: number }> = {};
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const x = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const y = ((e.clientY - cardRect.top) / cardRect.height) * 100;
        
        const prev = prevGradientsRef.current[menuItems[index].id];
        newGradients[menuItems[index].id] = { 
          x, 
          y,
          prevX: prev?.x ?? x,
          prevY: prev?.y ?? y
        };
        
        // Update ref with current position for next iteration
        prevGradientsRef.current[menuItems[index].id] = { x, y };
      });
      
      setCardGradients(newGradients);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    document.addEventListener('mousemove', handleMouseMove);
    menu.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      menu.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="menu-section">
      <div className="menu-container">
        <h2 className="menu-title">Our Menu</h2>

        <div
          ref={menuRef}
          className="menu-grid"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {menuItems.map((item, index) => {
            const gradient = cardGradients[item.id] || { x: 30, y: 40, prevX: 30, prevY: 40 };
            
            // Calculate angle for the tail effect
            const dx = gradient.x - gradient.prevX;
            const dy = gradient.y - gradient.prevY;
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);
            
            return (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => onMenuItemClick(item.id)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div 
                  className="menu-item-inner"
                  style={{
                    background: `
                      radial-gradient(
                        circle 300px at ${gradient.x}% ${gradient.y}%,
                        rgba(255, 230, 170, 0.45) 0%,
                        rgba(255, 240, 200, 0.28) 40%,
                        rgba(255, 255, 255, 0.08) 100%
                      ),
                      linear-gradient(
                        rgba(255, 230, 170, 0) 0%,
                        rgba(255, 230, 170, 0.12) 30%,
                        rgba(255, 240, 200, 0.06) 60%,
                        rgba(255, 255, 255, 0) 100%
                      )
                    `,
                  }}
                >
                  <div className="menu-item-front">
                    <div className="menu-item-image-wrapper">
                      <img src={item.image} alt={item.title} className="menu-item-image" />
                    </div>
                    <h3 className="menu-item-title">{item.title}</h3>
                    <p className="menu-item-description">{item.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
