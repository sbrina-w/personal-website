import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections.css';
import { PixelatedImage } from './PixelatedImage';

interface SectionContent {
  id: string;
  title: string;
  description: string;
  image: string;
}

const sectionContent: SectionContent[] = [
  {
    id: 'about',
    title: 'About',
    description: `Hi! I'm Sabrina, a passionate Software Engineering student at the University of Waterloo with a love for creating beautiful, functional digital experiences. My journey into tech started with curiosity about how things work, which evolved into building solutions that matter.

I believe great software is a blend of strong technical fundamentals, creative problem-solving, user-centric design thinking, and continuous learning. I'm particularly interested in full-stack development, AI applications, and building tools that enhance creativity and productivity.

My experience spans across various domains—from e-commerce platforms at Loblaw Digital serving millions of customers, to data visualization tools at CIGI, to traffic management systems at Miovision. Each role has taught me the importance of writing clean, maintainable code and collaborating effectively with cross-functional teams.

Outside of coding, I'm an artist and coffee enthusiast who believes that attention to detail in code mirrors the care required in other creative pursuits. I'm always excited to explore new technologies, collaborate with talented people, and work on projects that make a positive impact.

Let's connect and create something amazing together!`,
    image: '/illustrations/fig-cake.png',
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
    image: '/illustrations/roll-cake.png',
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
            <PixelatedImage
              src={section.image}
              alt={section.title}
              className="content-image"
            />
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
