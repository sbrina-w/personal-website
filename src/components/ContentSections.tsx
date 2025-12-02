import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections.css';
import { PixelatedImage } from './PixelatedImage';
import { InfiniteCarousel } from './InfiniteCarousel';

interface SectionContent {
  id: string;
  title: string;
  description: string;
  image: string;
}

const artImages = [
  '/illustrations/art/birthday-card.png',
  '/illustrations/art/birthday-card3.png',
  '/illustrations/art/christmas-card.png',
  '/illustrations/art/christmas-card2.png',
  '/illustrations/art/hands.png',
  '/illustrations/art/pen1.png',
  '/illustrations/art/pen3.png',
  '/illustrations/art/pen4.png',
  '/illustrations/fig-cake.png',
  '/illustrations/roll-cake.png',
  '/illustrations/strawberry-tart.png',
  '/illustrations/matcha-basque.png',
  '/illustrations/matcha-cookie.png',
  '/illustrations/mochi-bunny.png',
];

const sectionContent: SectionContent[] = [
  {
    id: 'about',
    title: 'About',
    description: `Hi! I'm Sabrina, a passionate Software Engineering student at the University of Waterloo with a love for creating beautiful, functional digital experiences. My journey into tech started with curiosity about how things work, which evolved into building solutions that matter.

I believe great software is a blend of strong technical fundamentals, creative problem-solving, user-centric design thinking, and continuous learning. I'm particularly interested in full-stack development, AI applications, and building tools that enhance creativity and productivity.

My experience spans across various domains—from e-commerce platforms at Loblaw Digital serving millions of customers, to data visualization tools at CIGI, to traffic management systems at Miovision. Each role has taught me the importance of writing clean, maintainable code and collaborating effectively with cross-functional teams.

Outside of coding, I'm an artist and coffee enthusiast who believes that attention to detail in code mirrors the care required in other creative pursuits. I'm always excited to explore new technologies, collaborate with talented people, and work on projects that make a positive impact.

Let's connect and create something amazing together!`,
    image: '/illustrations/strawberry-tart-cropped.png',
  },
  {
    id: 'art',
    title: 'Art',
    description: `I love drawing in my free time and recently I've been exploring how to integrate it into software development. I've been really enjoying learning 
glsl and three.js to create interactive and animated graphics like the background you see right now! 

Below you will find some of my traditional and digital art works. Feel free to click on any piece to view it in full size :)
All the illustrations you see on this page are hand-drawn by me in clip studio paint. As a café lover and general dessert enthusiast + baker I had so much fun creating these (and also got very hungry). 

I love experimenting with new art mediums and I've tried many from oil painting, wood carving, sculpting to graphite but I always come back to watercolor. Recently I've been making watercolor cards for birthdays and holidays, especially after getting some metallic watercolors.
`,
    image: '/illustrations/matcha-basque-cropped.png',
  },
];

interface SectionProps {
  section: SectionContent;
  index: number;
}

const ContentSection: React.FC<SectionProps> = ({ section, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementScrolled = -rect.top;
      setScrollY(Math.max(0, elementScrolled));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (section.id !== 'art') return;
    
    hoverTimeoutRef.current = setTimeout(() => {
      setShowVideo(true);
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1000);
  };

  const handleMouseLeave = () => {
    if (section.id !== 'art') return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    setShowVideo(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const isEvenIndex = index % 2 === 0;

  return (
    <section
      ref={containerRef}
      className={`content-section ${isEvenIndex ? 'even' : 'odd'}`}
      id={section.id}
    >
      <div className="section-wrapper">
        <div className="content-container">
          <div
            className="content-text"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          >
            <h2 className="content-title">{section.title}</h2>
            <div className="content-body">
              {section.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
            {section.id === 'art' && (
              <InfiniteCarousel images={artImages} />
            )}
          </div>

          <div
            className="content-image-wrapper"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="content-image-container">
              <PixelatedImage
                src={section.image}
                alt={section.title}
                className="content-image"
              />
              {section.id === 'art' && (
                <video
                  ref={videoRef}
                  src="/illustrations/desserts-speedpaint.mp4"
                  className="content-video-overlay"
                  style={{ opacity: showVideo ? 1 : 0 }}
                  loop
                  muted
                  playsInline
                />
              )}
            </div>
            {section.id === 'art' && (
              <span className="hover-hint">⟢  ↑ hover over me! ⟢ </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ContentSectionsProps {
  sections?: SectionContent[];
}

export const ContentSections: React.FC<ContentSectionsProps> = ({ 
  sections = sectionContent 
}) => {
  return (
    <>
      {sections.map((section, index) => (
        <ContentSection key={section.id} section={section} index={index} />
      ))}
    </>
  );
};
