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
    title: 'About Me',
    description: ``,
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

export const aboutSection = sectionContent.filter(s => s.id === 'about');
export const artSection = sectionContent.filter(s => s.id === 'art');

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
  const targetScrollYRef = useRef(0);
  const currentScrollYRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const elementScrolled = -rect.top;
      targetScrollYRef.current = Math.max(0, elementScrolled);
    };

    const smoothScroll = () => {
      // Lerp (linear interpolation) for smooth animation
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      currentScrollYRef.current = lerp(
        currentScrollYRef.current,
        targetScrollYRef.current,
        0.1 // Smoothing factor (0.1 = smooth, higher = faster)
      );

      setScrollY(currentScrollYRef.current);
      rafRef.current = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    rafRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
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
  const isOddLayout = section.id === 'art' ? true : !isEvenIndex;

  return (
    <section
      ref={containerRef}
      className={`content-section ${isOddLayout ? 'odd' : 'even'}`}
      id={section.id}
    >
      <div className="section-wrapper">
        <div className="content-container">
          <div className="content-text">
            <h2 className="content-title">{section.title}</h2>
            {section.id === 'about' ? (
              <div className="about-content">
                <div className="about-top">
                  <div className="about-polaroid">
                    <img src="/illustrations/polaroid.png" alt="Sabrina" />
                  </div>
                  <div className="about-top-text">
                    <p>Hi! I'm Sabrina, a passionate <strong><em>Software Engineering</em></strong> student at the <strong>University of Waterloo</strong> with a love for creating beautiful, functional digital experiences. My journey into tech started with curiosity about how things work, which evolved into building solutions that matter.</p>
                    <p>I love software engineering since there's always so many new things to learn and explore. Currently, I'm particularly interested in full-stack development, AI applications, and building tools that help people be more creative and productive. I'm also heading to <strong>Singapore</strong> this winter for an <strong>exchange</strong> term at SUTD to dive deeper into machine learning!</p>
                    <p>Thanks for checking out my portfolio :)</p>
                  </div>
                </div>
                <div className="about-bottom">
                  <p className="about-divider">⟢ ⟢ ⟢ ⟢ ⟢ ⟢</p>
                  <p className="about-section-title">Outside of coding, you'll find me:</p>
                  <ul className="about-list">
                    <li>drawing and painting (watercolor is my favorite medium)</li>
                    <li>baking and recipe testing (recent favorites: cherry cheesecake tarts, strawberry mochi, pistachio macarons)</li>
                    <li>cafe hopping and perfecting my home cafe setup</li>
                    <li>reading historical fiction, fantasy, asian literature and manga</li>
                    <li>planning my next travel adventure</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="content-body">
                {section.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
                <p className="divider" style={{fontSize: "1.2rem", color: "var(--grey-yellow)", letterSpacing: "0.3em"}}>⟢ ⟢ ⟢ ⟢ ⟢ ⟢</p>
              </div>
            )}
            {section.id === 'art' && (
              <InfiniteCarousel images={artImages} />
            )}
          </div>

          <div
            className="content-image-wrapper"
            style={{ transform: `translateY(${scrollY * -0.15}px)` }}
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
