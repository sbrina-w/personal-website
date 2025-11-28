import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections.css';
import { PixelatedImage } from './PixelatedImage';
import { WatercolorImage } from './WatercolorImage';

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const sectionContent: SectionContent[] = [
  {
    id: 'about',
    title: 'About',
    description: `Hi! I'm Sabrina, a passionate Software Engineering student at the University of Waterloo with a love for creating beautiful, functional digital experiences. My journey into tech started with curiosity about how things work, which evolved into building solutions that matter.

I believe great software is a blend of strong technical fundamentals, creative problem-solving, user-centric design thinking, and continuous learning. I'm particularly interested in full-stack development, AI applications, and building tools that enhance creativity and productivity.

My experience spans across various domains—from e-commerce platforms at Loblaw Digital serving millions of customers, to data visualization tools at CIGI, to traffic management systems at Miovision. Each role has taught me the importance of writing clean, maintainable code and collaborating effectively with cross-functional teams.

Outside of coding, I'm an artist and coffee enthusiast who believes that attention to detail in code mirrors the care required in other creative pursuits. I'm always excited to explore new technologies, collaborate with talented people, and work on projects that make a positive impact.

Let's connect and create something amazing together!`,
    image: '/illustrations/desserts1.png',
  },
  {
    id: 'art',
    title: 'Art',
    description: `Art and design are integral parts of my creative process. I explore various mediums including digital illustration, UI/UX design, and creative coding to express ideas and push the boundaries of what's possible in web design.

My artistic interests include:
• Digital illustration and graphic design
• Creative coding and generative art
• UI/UX design exploring beautiful interactions
• Motion graphics and animation
• Interactive installations and experiences

I believe that good design is invisible—it serves the user without demanding attention. My goal is to create interfaces that are not only functional but also bring joy to the people using them. The intersection of art and technology is where I find the most inspiration.

Whether it's designing a user interface, creating a visual identity, or building an interactive experience, I approach each project with an artist's eye for detail and a developer's mindset for functionality.

Art and code are two sides of the same creative coin for me.`,
    image: '/illustrations/desserts2.png',
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    description: `Beyond coding and design, I have a wide range of interests that fuel my creativity and keep me balanced:

☕ Coffee Enthusiast
I'm passionate about coffee—exploring different brewing methods, roasting profiles, and flavor notes. There's something meditative about the craft of making great coffee. I love experimenting with pour-overs, espresso, and cold brew.

🎨 Digital Art & Illustration
I love creating digital art, from character design to environmental concepts. It's my way of exploring visual storytelling and bringing imaginary worlds to life.

🎮 Gaming
I'm fascinated by game design, mechanics, and narrative. I enjoy indie games that push creative boundaries and experiment with new gameplay concepts.

📚 Reading
I'm an avid reader who loves science fiction, design thinking books, and technical documentation (yes, really!). Currently exploring books on system design and creative coding.

🚴 Outdoor Activities
When I'm not at my computer, you'll find me cycling, hiking, or exploring nature—it's where I get my best ideas and reset my mind.

🎵 Music
I produce electronic music as a hobby and love the intersection of code and sound design. Music production has taught me a lot about pattern recognition and creative problem-solving.`,
    image: '/illustrations/desserts3.png',
  },
];

interface SectionProps {
  section: SectionContent;
  index: number;
}

const ContentSection: React.FC<SectionProps> = ({ section, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

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

  const isEvenIndex = index % 2 === 0;
  const usePixelatedEffect = index % 2 === 0;

  return (
    <section
      ref={containerRef}
      className={`content-section ${isEvenIndex ? 'even' : 'odd'}`}
      id={section.id}
    >
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
        </div>

        <div
          className="content-image-wrapper"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        >
          <div className="content-image-container">
            {usePixelatedEffect ? (
              <PixelatedImage 
                src={section.image} 
                alt={section.title}
                className="content-image"
              />
            ) : (
              <PixelatedImage
                src={section.image}
                alt={section.title}
                className="content-image"
              />
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
