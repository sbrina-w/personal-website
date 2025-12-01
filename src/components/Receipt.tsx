import React, { useState } from 'react';
import '../styles/receipt.css';

export const Receipt: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thanks for your message! I\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="receipt-section" id="contact">
      <div className="receipt-container">
        <div className="receipt-paper">
          {/* Receipt Header */}
          <div className="receipt-header">
            <h2>Contact Information</h2>
            <p className="receipt-tagline">Order #39</p>
            <p className="receipt-date">{new Date().toLocaleDateString()} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>

          {/* Receipt Divider */}
          <div className="receipt-divider"></div>

          {/* Receipt Items */}
          <div className="receipt-content">
            <div className="receipt-order-items">
              <div className="receipt-item">
                <span className="receipt-item-name">1x Fig Cake</span>
                <span className="receipt-item-dots"></span>
                <span className="receipt-item-price">Experiences</span>
              </div>
              <div className="receipt-item">
                <span className="receipt-item-name">1x Raspberry Roll Cake</span>
                <span className="receipt-item-dots"></span>
                <span className="receipt-item-price">Projects</span>
              </div>
              <div className="receipt-item">
                <span className="receipt-item-name">1x Strawberry Tart</span>
                <span className="receipt-item-dots"></span>
                <span className="receipt-item-price">About Me</span>
              </div>
              <div className="receipt-item">
                <span className="receipt-item-name">1x Matcha Basque Cheesecake</span>
                <span className="receipt-item-dots"></span>
                <span className="receipt-item-price">Art</span>
              </div>
              <div className="receipt-item">
                <span className="receipt-item-name">1x Summer 2026 Internship</span>
                <span className="receipt-item-dots"></span>
                <span className="receipt-item-price">Seeking</span>
              </div>
            </div>

            <div className="receipt-divider-dashed"></div>

            {/* Contact Section */}
            <div className="receipt-contact">              
              <div className="receipt-contact-item">
                <span className="receipt-contact-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--grey-yellow)" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  Email:
                </span>
                <a href="mailto:sabrina.wang1@uwaterloo.ca" className="receipt-contact-value">
                  sabrina.wang1@uwaterloo.ca
                </a>
              </div>

              <div className="receipt-contact-item">
                <span className="receipt-contact-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--grey-yellow)" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn:
                </span>
                <a href="https://www.linkedin.com/in/sabrina-wang39/" target="_blank" rel="noopener noreferrer" className="receipt-contact-value">
                  linkedin.com/in/sabrina-wang39
                </a>
              </div>

              <div className="receipt-contact-item">
                <span className="receipt-contact-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--grey-yellow)" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub:
                </span>
                <a href="https://github.com/sbrina-w" target="_blank" rel="noopener noreferrer" className="receipt-contact-value">
                  github.com/sbrina-w
                </a>
              </div>

              <div className="receipt-contact-item">
                <span className="receipt-contact-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--grey-yellow)" style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                    <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853z"/>
                  </svg>
                  DevPost:
                </span>
                <a href="https://devpost.com/sbrina-w" target="_blank" rel="noopener noreferrer" className="receipt-contact-value">
                  devpost.com/sbrina-w
                </a>
              </div>
            </div>

            <div className="receipt-divider-dashed"></div>

            {/* Message Form */}
            <div className="receipt-message-form">
              <h3 className="receipt-section-title">Leave a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Let's connect! Share your thoughts..."
                    rows={4}
                    required
                  />
                </div>

                <button type="submit" className="receipt-submit-btn">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="receipt-footer">
            <div className="receipt-divider"></div>
            <p className="receipt-thank-you">Thank you for visiting!</p>
          </div>
        </div>
      </div>
    </section>
  );
};