import React, { useEffect, useRef, useState } from 'react';
import '../styles/experience.css';
import { PixelatedImage } from './PixelatedImage';

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  accomplishments: string[];
  logo?: string;
}

const experiences: Experience[] = [
  {
    company: 'Data Scientist, Advanced Analytics Team',
    role: 'Ontario Lottery and Gaming (OLG)',
    period: 'May 2025 - Aug 2025',
    description: 'Working on the Advanced Analytics team, developing machine learning models and GenAI applications to drive data-informed decision-making across OLG\'s operations.',
    accomplishments: [
      'Developed retailer clustering models using K-means and spatial data analysis to segment 10,000+ retailers by sales performance, demographics, and location features, enabling dynamic commission models and targeted sales strategies',
      'Built end-to-end RAG applications including a Cloudera documentation chatbot with full-stack development (data sourcing, embedding pipeline, and web interface) to accelerate internal team knowledge discovery',
      'Automated AML monitoring workflows using GenAI to parse police reports, extract suspect information, and perform fuzzy matching against OLG patron databases, reducing manual investigation time by 80%',
      'Maintained sequential recommender systems for internet casino apps, running monthly model validations and generating personalized recommendations to improve user engagement',
      'Engineered web scrapers to automate salary data collection for hundreds of occupations, eliminating manual research and saving 20+ hours per analysis cycle'
    ]
  },
  {
    company: 'Full-Stack Software Developer',
    role: 'BrainRidge Consulting',
    period: 'Jan 2025 - Apr 2025',
    description: 'Returned to BrainRidge Consulting to expand my technical scope beyond frontend, taking on full-stack responsibilities for the OneDashboard project. Led feature development from requirements gathering through deployment, working with databases, caching layers, and backend services while continuing to refine the user experience.',
    accomplishments: [
      'Led end-to-end development of a global search feature with filtered navigation, direct endpoint access, and error-focused queries, improving system navigation efficiency by 3x and reducing time-to-resolution for production issues',
      'Migrated environment configurations from frontend to database, implementing a dynamic DB-driven model with Oracle DB and building corresponding UI forms for real-time configurability',
      'Developed endpoint tracking and comparison tooling using Swagger diffing to detect API changes, monitor downstream service health, and maintain up-to-date documentation for 50+ microservice endpoints',
      'Contributed to AWS migration planning by participating in architecture discussions and learning cloud infrastructure design patterns for large-scale enterprise systems',
      'Built feature heatmap visualizations and created comprehensive Confluence documentation to communicate technical decisions and system architecture to cross-functional stakeholders'
    ]
  },
  {
    company: 'Frontend Software Developer',
    role: 'BrainRidge Consulting',
    period: 'May 2024 - Aug 2024',
    description: 'Joined BrainRidge as the sole frontend developer for OneDashboard, an internal monitoring platform for BMO US. Despite having no prior experience with Angular or NestJS, I quickly ramped up and took ownership of the entire frontend, redesigning the UI/UX from the ground up and transforming the project from a proof-of-concept into a production-ready application.',
    accomplishments: [
      'Designed and implemented the complete frontend architecture using Angular and TypeScript, creating an intuitive dashboard that monitors health checks, database connections, cache status, and 50+ microservice APIs across BMO US environments',
      'Earned AWS Cloud Practitioner certification in three days through self-directed learning, demonstrating rapid technical adaptability and commitment to expanding cloud infrastructure knowledge'
    ]
  }
];

interface TimelineNodeProps {
  isActive: boolean;
  isPast: boolean;
  index: number;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({ isActive, isPast, index }) => {
  return (
    <div 
      className={`timeline-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}
    >
      <div className="timeline-circle">
        <div className="timeline-circle-inner" />
      </div>
    </div>
  );
};

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isVisible: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, index, isVisible, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className={`experience-card ${isVisible ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="experience-header">
        <div className="experience-title-group">
          <h3 className="experience-company">{experience.company}</h3>
          <p className="experience-role">{experience.role}</p>
        </div>
        <span className="experience-period">{experience.period}</span>
      </div>
      
      <p className="experience-description">{experience.description}</p>
      
      <ul className="experience-accomplishments">
        {experience.accomplishments.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export const ExperienceSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timelineNodesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section || cardRefs.current.length === 0) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const activationPoint = scrollY + windowHeight / 2;

      // Calculate parallax scroll progress relative to section visibility
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const parallaxProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
      setScrollY(parallaxProgress);

      // Calculate scroll-based progress for timeline first
      const firstCard = cardRefs.current[0];
      const lastCard = cardRefs.current[experiences.length - 1];
      
      if (firstCard && lastCard) {
        const firstCardCenter = firstCard.offsetTop + firstCard.offsetHeight / 2 + (section.offsetTop || 0);
        const lastCardCenter = lastCard.offsetTop + lastCard.offsetHeight / 2 + (section.offsetTop || 0);
        
        // Calculate how far the activation point has progressed through the timeline
        const progress = Math.max(0, Math.min(1, (activationPoint - firstCardCenter) / (lastCardCenter - firstCardCenter)));
        setScrollProgress(progress);
      }

      // Find which card is currently aligned with the timeline
      let newActiveIndex = 0;
      for (let i = 0; i < cardRefs.current.length; i++) {
        const card = cardRefs.current[i];
        if (card) {
          const cardTop = card.offsetTop + (section.offsetTop || 0);
          const cardMiddle = cardTop + card.offsetHeight / 2;
          
          if (activationPoint >= cardMiddle) {
            newActiveIndex = i;
          }
        }
      }
      
      setActiveIndex(newActiveIndex);

      // Make cards visible earlier - when they're 70% into the viewport
      const visibilityPoint = scrollY + windowHeight * 0.7;
      const newVisibleCards = new Set<number>();
      
      for (let i = 0; i < cardRefs.current.length; i++) {
        const card = cardRefs.current[i];
        if (card) {
          const cardTop = card.offsetTop + (section.offsetTop || 0);
          
          if (visibilityPoint >= cardTop) {
            newVisibleCards.add(i);
          }
        }
      }
      setVisibleCards(newVisibleCards);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  const setTimelineNodeRef = (index: number) => (el: HTMLDivElement | null) => {
    timelineNodesRefs.current[index] = el;
  };

  // Calculate total timeline height and progress
  const firstCard = cardRefs.current[0];
  const lastCard = cardRefs.current[experiences.length - 1];
  const firstCardCenter = firstCard ? firstCard.offsetTop + firstCard.offsetHeight / 2 : 0;
  const lastCardCenter = lastCard ? lastCard.offsetTop + lastCard.offsetHeight / 2 : 0;
  const totalTimelineHeight = lastCardCenter - firstCardCenter;
  
  // Use scroll-based progress instead of card index
  const progressHeight = totalTimelineHeight * scrollProgress;

  return (
    <section ref={sectionRef} className="experience-section" id="experience">
      <PixelatedImage
        src="/illustrations/cake5.png"
        alt="Cake Decoration Left"
        className="dessert-decoration"
        style={{ 
          position: 'absolute', 
          width: '400px', 
          height: '400px', 
          right: '5%', 
          bottom: '20%', 
          transform: `rotate(15deg) translate(${scrollY * 30}px, ${scrollY * -180}px)`,
          opacity: 0.2,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <PixelatedImage
        src="/illustrations/mochi-bunny.png"
        alt="Cake Decoration Right"
        className="dessert-decoration"
        style={{ 
          position: 'absolute', 
          width: '600px', 
          height: '600px', 
          left: '0%', 
          top: '20%', 
          transform: `rotate(-8deg) translate(${scrollY * -30}px, ${scrollY * -200}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <div className="experience-container">
        <h2 className="experience-section-title">Experience</h2>
        
        <div className="experience-content">
          <div className="timeline-wrapper" style={{ position: 'relative' }}>
            {/* Gradient fade-in line above first circle */}
            <div
              className="timeline-gradient timeline-gradient-top"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '200px',
                top: `${firstCardCenter - 210}px`,
                background: 'linear-gradient(to top, #d4a574, rgba(255, 255, 255, 0))',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
            {/* Timeline track */}
            <div
              className="timeline-track"
              style={{
                position: 'absolute',
                top: `${firstCardCenter}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                height: `${totalTimelineHeight}px`,
                width: '2px',
              }}
            />
            {/* Timeline progress */}
            <div
              className="timeline-progress"
              style={{
                position: 'absolute',
                top: `${firstCardCenter}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                height: `${progressHeight}px`,
                width: '2px',
              }}
            />
            {/* Timeline circles */}
            {experiences.map((_, index) => {
              const card = cardRefs.current[index];
              const cardTop = card ? card.offsetTop : 0;
              const cardHeight = card ? card.offsetHeight : 0;
              const cardCenter = cardTop + cardHeight / 2;
              
              return (
                <div
                  key={index}
                  ref={setTimelineNodeRef(index)}
                  style={{
                    position: 'absolute',
                    top: `${cardCenter}px`,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    transition: 'top 0.1s ease-out'
                  }}
                >
                  <TimelineNode
                    isActive={index === activeIndex}
                    isPast={index < activeIndex}
                    index={index}
                  />
                </div>
              );
            })}
            {/* Gradient fade-out line below last circle */}
            <div
              className="timeline-gradient timeline-gradient-bottom"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '2px',
                height: '200px',
                top: `${lastCardCenter + 10}px`,
                background: 'linear-gradient(to bottom, #d4a574, rgba(224, 213, 199, 0))',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
          </div>
          <div className="experiences-list">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={index}
                experience={exp}
                index={index}
                isVisible={visibleCards.has(index)}
                cardRef={setCardRef(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
