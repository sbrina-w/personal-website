import React, { useEffect, useRef, useState } from 'react';
import '../styles/sections.css';

export interface SectionContent {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const sectionContent: SectionContent[] = [
  {
    id: 'experience',
    title: 'Experience',
    description: `My professional journey has been filled with exciting opportunities to grow and contribute. I've worked with innovative teams on projects that challenged me to expand my skills in full-stack development, system design, and team collaboration.

Throughout my career, I've developed expertise in building scalable web applications, optimizing performance, and mentoring junior developers. I'm passionate about writing clean, maintainable code and continuously learning new technologies.

Key achievements include:
• Led the development of a real-time data visualization platform
• Mentored 3 junior developers on React and Node.js best practices
• Reduced database query time by 40% through optimization
• Presented technical talks on modern web architecture`,
    image: '/illustrations/cake4.png',
  },
  {
    id: 'projects',
    title: 'Projects',
    description: `I love turning creative ideas into functional applications. My projects span from small utilities to full-featured platforms, each teaching me something new about problem-solving and user experience design.

Current projects showcase my ability to:
• Design intuitive user interfaces
• Build performant backend systems
• Implement complex algorithms and data structures
• Create responsive, accessible web experiences

Notable projects include:
• A collaborative music production platform with real-time sync
• An AI-powered content recommendation engine
• A mobile-responsive e-commerce application
• Several open-source contributions to popular libraries

Each project is a reflection of my commitment to quality and continuous improvement.`,
    image: '/illustrations/cake5.png',
  },
  {
    id: 'about',
    title: 'About',
    description: `Hi! I'm a passionate software engineering student with a love for creating beautiful, functional digital experiences. My journey into tech started with curiosity about how things work, which evolved into a career dedicated to building solutions that matter.

I believe great software is a blend of:
• Strong technical fundamentals
• Creative problem-solving
• User-centric design thinking
• Continuous learning and adaptation

Outside of coding, I'm an artist and coffee enthusiast who believes that attention to detail in code mirrors the care required in other creative pursuits. I'm always excited to explore new technologies, collaborate with talented people, and work on projects that make a positive impact.

Let's connect and create something amazing together!`,
    image: '/illustrations/cake6.png',
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

I believe that good design is invisible—it serves the user without demanding attention. My goal is to create interfaces that are not only functional but also bring joy to the people using them.

Art and code are two sides of the same creative coin for me.`,
    image: '/illustrations/cake7.png',
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    description: `Beyond coding and design, I have a wide range of interests that fuel my creativity and keep me balanced:

☕ Coffee Enthusiast
I'm passionate about coffee—exploring different brewing methods, roasting profiles, and flavor notes. There's something meditative about the craft of making great coffee.

🎨 Digital Art & Illustration
I love creating digital art, from character design to environmental concepts. It's my way of exploring visual storytelling.

🎮 Gaming
I'm fascinated by game design, mechanics, and narrative. I enjoy indie games that push creative boundaries.

📚 Reading
I'm an avid reader who loves science fiction, design thinking books, and technical documentation (yes, really!).

🚴 Outdoor Activities
When I'm not at my computer, you'll find me cycling, hiking, or exploring nature—it's where I get my best ideas.

🎵 Music
I produce electronic music as a hobby and love the intersection of code and sound design.`,
    image: '/illustrations/cake8.png',
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
            <img src={section.image} alt={section.title} className="content-image" />
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
      {sections.slice(0, 5).map((section, index) => (
        <ContentSection key={section.id} section={section} index={index} />
      ))}
    </>
  );
};
