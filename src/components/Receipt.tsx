import React, { useEffect, useState, useRef } from 'react';
import '../styles/receipt.css';

export const Receipt: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const contactItems = [
    { label: 'Email', value: 'sabrina@example.com', link: 'mailto:sabrina@example.com' },
    { label: 'LinkedIn', value: '/in/sabrina', link: 'https://linkedin.com' },
    { label: 'GitHub', value: 'github.com/sabrina', link: 'https://github.com' },
    { label: 'Twitter', value: '@sabrina_dev', link: 'https://twitter.com' },
  ];

  return (
    <section className="receipt-section" ref={receiptRef}>
      <div className="receipt-container">
        <div
          className="receipt-paper"
          style={{
            transform: `translateY(${scrollY * 0.2}px) rotateZ(${(scrollY * 0.01) % 360}deg)`,
          }}
        >
          {/* Receipt Header */}
          <div className="receipt-header">
            <div className="receipt-logo">☕</div>
            <h2>Thank You!</h2>
            <p className="receipt-tagline">Enjoy Your Visit to My Cafe</p>
          </div>

          {/* Receipt Divider */}
          <div className="receipt-divider"></div>

          {/* Contact Information */}
          <div className="receipt-content">
            <p className="receipt-message">
              Thanks for exploring my portfolio! Let's connect and create something amazing together.
            </p>

            <div className="receipt-items">
              {contactItems.map((item, index) => (
                <div key={index} className="receipt-item">
                  <span className="receipt-label">{item.label}</span>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="receipt-value">
                    {item.value}
                  </a>
                </div>
              ))}
            </div>

            <div className="receipt-divider receipt-divider-subtle"></div>

            <p className="receipt-closing">
              Remember: Great software is like good coffee—
              <br />
              it requires care, attention to detail, and the right blend of ingredients.
            </p>

            <p className="receipt-visit-date">
              Visit Date: {new Date().toLocaleDateString()}
              <br />
              Time: {new Date().toLocaleTimeString()}
            </p>
          </div>

          {/* Receipt Footer */}
          <div className="receipt-footer">
            <p>~ Sabrina's Dev Cafe ~</p>
            <p className="receipt-footer-text">
              Crafting code with coffee and creativity
            </p>
            <p className="receipt-footer-code">Code: THANKS-2024</p>
          </div>

          {/* Decorative elements */}
          <div className="receipt-tape receipt-tape-left"></div>
          <div className="receipt-tape receipt-tape-right"></div>
        </div>
      </div>

      {/* Background elements */}
      <div className="receipt-background-decoration">
        <div className="decoration-star">★</div>
        <div className="decoration-dot">●</div>
        <div className="decoration-dash">—</div>
      </div>
    </section>
  );
};
