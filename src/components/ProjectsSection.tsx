import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import '../styles/projects.css';
import { PixelatedImage } from './PixelatedImage';

interface Project {
  name: string;
  year: string;
  description: string;
  fullDescription?: string;
  detailedAccomplishments?: string[];
  techStack: string[];
  github?: string;
  devpost?: string;
  liveLink?: string;
  image?: string;
}

const projects: Project[] = [
  {
    name: 'Yelp Analysis',
    year: '2024',
    description: 'Production-ready analytics platform transforming thousands of Yelp reviews into actionable business insights through a hybrid ML/LLM pipeline with semantic search, sentiment analysis, and automated topic clustering.',
    fullDescription: 'A production-ready analytics platform that transforms thousands of Yelp reviews into actionable business insights through a hybrid ML/LLM pipeline. The system processes review data end-to-end—from ingestion and preprocessing to semantic search, sentiment analysis, and automated topic clustering—enabling restaurant owners to discover root causes, prioritize fixes, and monitor impact without reading every review manually.',
    detailedAccomplishments: [
      'Engineered semantic search and embeddings pipeline using SentenceTransformers and ChromaDB with persistent vector storage, enabling sub-second natural-language retrieval across 5,000+ reviews with sentiment and location filters',
      'Implemented hybrid NLP architecture combining local HuggingFace models for sentiment classification and summarization with LangChain/OpenAI chains for structured review analysis (issue type, priority, actionable summaries)',
      'Built automated topic clustering system using KMeans, PCA visualization, and GPT-based cluster labeling to surface recurring themes by restaurant, city, and time, reducing manual topic analysis effort by 90%',
      'Designed multi-persona Streamlit interface (Restaurant Explorer, Business Owner, Data Analyst) with interactive dashboards, Folium maps, trend charts, and priority issue triage workflows to drive faster operational decisions',
      'Added robustness features including Streamlit caching for instant re-renders, retry/fallback logic for LLM calls, seeded reproducible clustering, and concurrent batch processing for scalable analysis'
    ],
    techStack: ['Streamlit', 'LangChain', 'OpenAI', 'HuggingFace', 'ChromaDB', 'Python', 'Pandas', 'Plotly'],
    github: 'https://github.com/sbrina-w/yelp-analysis',
    liveLink: 'https://yelp-analysis.streamlit.app/'
  },
  {
    name: 'PokePlants',
    year: '2024',
    description: 'Interactive mixed-reality prototype bridging web, hardware, and AI to create a Pokémon-style plant care game. Won 1st place at Hack the 6ix 2024, Toronto\'s largest hackathon.',
    fullDescription: 'An interactive mixed-reality prototype that bridges web, hardware, and AI to create a Pokémon-style plant care game. Players interact through a polished React frontend while physical Arduino sensors and computer vision influence game state in real-time, demonstrating full-stack IoT engineering and modular AI/vision components suitable for robotics, interactive installations, or automated systems.',
    detailedAccomplishments: [
      'Built real-time multiplayer game architecture using React frontend with WebSocket-based communication to Python/Flask backend, enabling sub-second synchronization for responsive local and multiplayer gameplay',
      'Integrated Arduino sensor pipeline with serial data ingestion (read_serial.py) and webcam capture (webcam.py) to stream moisture levels, light exposure, and visual plant health data into game mechanics',
      'Implemented computer vision and AI orchestration using OpenCV for image processing and OpenAI/LangChain for plant identification and deficiency detection, with modular agent.py for extensible automation behaviors',
      'Won 1st place at Hack the 6ix 2024, Toronto\'s largest hackathon, by demonstrating a compelling mixed-reality experience that combines physical interactions with digital gameplay',
      'Designed modular architecture with reusable vision pipeline and agent components that can be repurposed for autonomous gameplay, gesture recognition, or interactive prototyping platforms'
    ],
    techStack: ['React', 'Python', 'Flask', 'MongoDB', 'OpenAI', 'OpenCV', 'Arduino', 'Socket.io', 'WebSockets'],
    github: 'https://github.com/FO214/ht6',
    devpost: 'https://devpost.com/software/pokeplants'
  },
  {
    name: 'Chroma',
    year: '2024',
    description: 'Cross-platform color assistant helping artists extract colors from photos and compute optimal paint mixing ratios. Won 2 awards at WaffleHacks 2024.',
    fullDescription: 'A cross-platform color assistant that helps artists extract colors from photos or swatches and compute optimal paint mixing ratios to reproduce target colors. The Flutter app handles camera workflows and palette management, while the Flask backend performs OpenCV-based image segmentation and SciPy-based numerical optimization to calculate precise mixing formulas.',
    detailedAccomplishments: [
      'Engineered computer vision pipeline using OpenCV for adaptive thresholding, contour detection, and mean RGB extraction from color swatches, enabling accurate palette digitization from photos or uploaded images',
      'Implemented constrained optimization solver using SciPy\'s minimize function to compute optimal paint mixing ratios with non-negative constraints, achieving 99% accuracy when validated against online color mixers',
      'Built full-stack architecture with Flutter frontend (iOS, Android, Windows, Linux, macOS) communicating with Flask backend via REST APIs for image upload and mixing calculations',
      'Designed persistent palette system using SharedPreferences for local storage, flutter_colorpicker for interactive editing, and backend color extraction endpoints to support custom user workflows',
      'Won 2 awards at WaffleHacks 2024, including recognition for technical implementation and practical utility for artists and designers'
    ],
    techStack: ['Flutter', 'Dart', 'Python', 'Flask', 'OpenCV', 'SciPy', 'AWS EC2'],
    github: 'https://github.com/sbrina-w/Chroma',
    devpost: 'https://devpost.com/software/chroma-q3wshr'
  },
  {
    name: 'Nudge',
    year: '2024',
    description: 'Chrome extension inspired by The Stanley Parable that gamifies productivity through an AI-powered narrator that monitors user activity, delivers witty spoken narration, and enforces focus through intelligent redirects.',
    fullDescription: 'A Chrome extension inspired by The Stanley Parable that gamifies productivity through an AI-powered narrator that monitors user activity, delivers witty spoken narration, and enforces focus through intelligent redirects. The system combines real-time behavior tracking, screenshot analysis via LLMs, and voice synthesis to create a compelling productivity experience with personality.',
    detailedAccomplishments: [
      'Built Chrome extension with Manifest V3 featuring background service worker for task orchestration, content script for mascot injection and activity monitoring (inactivity, typing, profanity detection), and SPA-aware navigation tracking using MutationObserver and history API overrides',
      'Engineered AI analysis pipeline using Flask backend that receives screenshots and behavioral data, processes context through OpenAI LLMs to generate narrative responses, and produces spoken audio via ElevenLabs TTS with emotion-matched voice delivery',
      'Implemented behavioral tracking system monitoring LeetCode usage patterns (problem pages, solution viewing, submissions), enforcing smart redirects from distraction sites (Instagram, YouTube, Reddit), and maintaining a "disobedience counter" that drives narrator personality shifts',
      'Designed animated mascot system with emotion-based state management (neutral, happy, angry, super-angry) using PNG sequence animations synchronized with spoken narration and user actions',
      'Built React analytics dashboards displaying productivity scores, achievements, recent activity, weekly stats, and todo lists by consuming MongoDB-stored logs from the backend analytics engine'
    ],
    techStack: ['Python', 'JavaScript', 'HTML/CSS', 'Flask', 'OpenAI', 'LangChain', 'ElevenLabs', 'MongoDB', 'Chrome Extension API', 'React', 'Vite'],
    github: 'https://github.com/sbrina-w/uofthacks12',
    liveLink: 'https://dorahacks.io/buidl/21709'
  },
  {
    name: 'MoodMinder',
    year: '2024',
    description: 'Chrome extension that enhances Reddit browsing by filtering negative comments using NLP-based sentiment analysis. Published to Chrome Web Store with ~70% reduction in negative content exposure.',
    fullDescription: 'A Chrome extension that enhances Reddit browsing by filtering negative comments using NLP-based sentiment analysis. The tool leverages VADER to evaluate emotional tone and offers flexible filtering modes (blur or hide), promoting healthier online interactions while prioritizing user privacy through local processing.',
    detailedAccomplishments: [
      'Implemented real-time sentiment analysis using VADER library via Flask backend, scoring Reddit comments for toxicity and flagging negative content for user-configurable filtering',
      'Built dynamic content monitoring system using MutationObserver to detect new comments as they load, extract text content, and apply filtering rules without page refreshes',
      'Designed user-friendly popup interface with toggle controls for blur/hide modes, persistent state management via Chrome Storage API, and browser notifications to encourage consistent usage',
      'Achieved ~70% reduction in negative content exposure based on sentiment threshold tuning, improving browsing experience for users seeking more mindful online engagement',
      'Published to Chrome Web Store with Manifest V3 compliance, deployed Flask API on AWS for scalable sentiment processing, and maintained privacy-focused architecture with no external data sharing'
    ],
    techStack: ['Python', 'JavaScript', 'HTML/CSS', 'Flask', 'VADER Sentiment', 'Chrome Extension API', 'AWS'],
    github: 'https://github.com/rubylu-05/moodminder',
    liveLink: 'https://chromewebstore.google.com/detail/moodminder/iobpegidgaikaooclpomdpplcffiablb'
  },
  {
    name: 'Mini C (WLP4) Compiler',
    year: '2024',
    description: 'Single-pass code generator translating WLP4 (simplified C-like language) parse trees into executable MIPS assembly with stack-managed function frames and expression evaluation.',
    fullDescription: 'A single-pass code generator that translates WLP4 (a simplified C-like language) parse trees into executable MIPS assembly. The compiler implements stack-managed function frames, expression evaluation with correct pointer/integer semantics, control flow generation, dynamic memory allocation, and runtime support for I/O operations.',
    detailedAccomplishments: [
      'Designed stack frame layout and symbol table mapping to produce correct addressing for function parameters, local variables, and temporary values across nested scopes',
      'Implemented expression code generation including binary operations, pointer arithmetic, array indexing, dynamic allocation (new/delete), and function call conventions with proper register usage',
      'Built control flow generation for if/else and while constructs using generated labels and conditional branches, ensuring correct jump targets and loop behavior',
      'Integrated runtime support hooks for heap allocation (alloc.merl), I/O operations (print.merl), and error handling for allocation failures and invalid memory operations',
      'Validated compiler correctness by testing against reference MIPS outputs, iterating until behavior matched expected semantics for all language features'
    ],
    techStack: ['C++', 'MIPS Assembly', 'Unix Toolchain'],
  },
  {
    name: 'TungTung',
    year: '2025',
    description: 'Full-stack service marketplace platform connecting users with local service providers. Features authentication, multi-category listings, task assignment workflows, and review systems.',
    fullDescription: 'A full-stack service marketplace platform connecting users with local service providers. The application features user authentication, multi-category service listings, task assignment workflows, review systems, and a modern responsive frontend powered by a robust Spring Boot REST API.',
    detailedAccomplishments: [
      'Built scalable backend architecture using Java 17 Spring Boot with RESTful APIs for user management, service listings, task assignments, reviews, and earnings tracking',
      'Designed MySQL database schema supporting users, categories, listings, assignments, and reviews, with JavaFaker-based data generation for realistic testing across diverse user behaviors',
      'Implemented multi-category filtering system allowing users to search and filter service listings by multiple criteria simultaneously, improving discoverability and user experience',
      'Developed real-time status tracking for task assignments (Taken, Completed) with automated workflows for task claiming, completion verification, and review submission',
      'Created modern Next.js frontend with TypeScript, modular component architecture, and responsive design patterns for seamless cross-device experience'
    ],
    techStack: ['Next.js', 'TypeScript', 'Java 17', 'Spring Boot', 'MySQL'],
    github: 'https://github.com/pahu2353/TungTung'
  },
  {
    name: 'RaiiNet',
    year: '2025',
    description: 'Stratego-like strategy game implementing link movement, battles, and special abilities with both text-based and X11 graphical interfaces using advanced C++ design patterns.',
    fullDescription: 'A network/board strategy game implementing link movement, battles, and special abilities with both text-based and X11 graphical interfaces. The project demonstrates advanced C++ design patterns, low-level graphics integration on Linux, and clean separation of concerns through MVC architecture.',
    detailedAccomplishments: [
      'Implemented MVC architecture with GameModel for state/rules enforcement, GameController for CLI command parsing and execution, and GraphicsDisplay as Observer for X11 rendering',
      'Built Observer/Subject pattern to propagate game state changes (GameStart, LinkMoved, DownloadOccurred, TurnEnded, GameOver, AbilityUsed) from model to view layer',
      'Designed pluggable ability system supporting 8+ ability types (LinkBoost, Firewall, Download, Scan, Polarize, Exchange, GoLater, Hijack) with usage tracking and validation',
      'Integrated X11 graphics rendering using Xwindow wrapper with off-screen Pixmaps for double buffering and per-player perspectives to hide opponent information',
      'Added scriptable gameplay support through sequence files for automated testing, with command history logging and nested sequence execution'
    ],
    techStack: ['C++', 'X11/Xwindow', 'Observer Pattern', 'MVC Architecture'],
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isExpanded, onToggleExpand }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const placeholderImages = [
    '/assets/texture/blur.webp',
    '/assets/texture/grain.webp',
    '/assets/texture/noise.jpeg'
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isExpanded) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % placeholderImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isExpanded, placeholderImages.length]);

  // Auto-scroll to center the expanded card
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }, 100);
    }
  }, [isExpanded]);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't toggle if clicking on a link
    if ((e.target as HTMLElement).closest('a')) {
      return;
    }
    onToggleExpand();
  };

  return (
    <motion.div 
      ref={cardRef}
      layout
      transition={{
        layout: { 
          type: 'spring', 
          stiffness: 350, 
          damping: 35,
          mass: 0.8
        }
      }}
      className={`project-card ${isVisible ? 'visible' : ''} ${isExpanded ? 'expanded' : ''}`}
      onClick={handleCardClick}
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.div
            key="collapsed"
            className="card-inner collapsed-wrapper"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            transition={{
              layout: { 
                type: 'tween',
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
          >
            <div className="project-content">
              <div className="project-card-header">
                <div className="project-title-group">
                  <h3 className="project-name">{project.name}</h3>
                  <span className="project-year">{project.year}</span>
                </div>
                
                <div className="project-links">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label="GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.devpost && (
                    <a 
                      href={project.devpost} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label="Devpost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853z"/>
                      </svg>
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-tech-stack">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="expand-hint">Click to expand</div>
          </motion.div>
        ) : (
          <motion.div 
            key="expanded"
            ref={expandedContentRef} 
            className="project-expanded-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layout
            transition={{
              layout: { 
                type: 'tween',
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1]
              }
            }}
          >
            <div className="project-expanded-left">
              <div className="image-carousel">
                <img 
                  src={placeholderImages[currentImageIndex]} 
                  alt={`${project.name} preview ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
                <div className="carousel-dots">
                  {placeholderImages.map((_, i) => (
                    <button
                      key={i}
                      className={`carousel-dot ${i === currentImageIndex ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(i);
                      }}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="project-expanded-right">
              <div className="project-expanded-header">
                <div>
                  <h3 className="project-name-expanded">{project.name}</h3>
                  <span className="project-year-expanded">{project.year}</span>
                </div>
                
                <div className="project-links-expanded">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label="GitHub"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {project.devpost && (
                    <a 
                      href={project.devpost} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label="Devpost"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853z"/>
                      </svg>
                    </a>
                  )}
                  {project.liveLink && (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link"
                      aria-label="Live Demo"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              
              <p className="project-full-description">{project.fullDescription || project.description}</p>
              
              {project.detailedAccomplishments && project.detailedAccomplishments.length > 0 && (
                <ul className="project-accomplishments">
                  {project.detailedAccomplishments.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
              
              <div className="project-tech-stack-expanded">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              <div className="collapse-hint">Click to collapse</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export const ProjectsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Create display order: fill rows with non-expanded projects, insert expanded at next available row
  const renderOrder = () => {
    if (expandedIndex === null) {
      return projects.map((project, index) => ({ 
        project, 
        originalIndex: index, 
        isExpanded: false,
        key: `project-${index}`
      }));
    }

    const items = [];
    const rowSize = 3;
    
    // Calculate which row the expanded project should appear in
    // It should appear after the row containing the clicked project
    const expandedRow = Math.floor(expandedIndex / rowSize);
    const insertPosition = (expandedRow + 1) * rowSize;
    
    // Add all non-expanded projects, inserting expanded project at the right position
    let nonExpandedCount = 0;
    
    for (let i = 0; i < projects.length; i++) {
      if (i === expandedIndex) {
        continue; // Skip the expanded project in the first pass
      }
      
      // Check if we've reached the insert position
      if (nonExpandedCount === insertPosition) {
        items.push({ 
          project: projects[expandedIndex], 
          originalIndex: expandedIndex, 
          isExpanded: true,
          key: `project-${expandedIndex}-expanded`
        });
      }
      
      items.push({ 
        project: projects[i], 
        originalIndex: i, 
        isExpanded: false,
        key: `project-${i}`
      });
      nonExpandedCount++;
    }
    
    // If we haven't inserted the expanded project yet, add it at the end
    if (nonExpandedCount <= insertPosition) {
      items.push({ 
        project: projects[expandedIndex], 
        originalIndex: expandedIndex, 
        isExpanded: true,
        key: `project-${expandedIndex}-expanded`
      });
    }
    
    return items;
  };

  const orderedItems = renderOrder();

  return (
    <section className="projects-section" id="projects">
      <PixelatedImage
        src="/illustrations/drink2.png"
        alt="Cake Decoration Left"
        className="dessert-decoration"
        style={{ position: 'absolute', width: '500px', height: '500px', right: '5%', bottom: '10%', transform: 'rotate(15deg)'}}
      />
      <PixelatedImage
        src="/illustrations/cake7.png"
        alt="Cake Decoration Right"
        className="dessert-decoration"
        style={{ position: 'absolute', width: '500px', height: '500px', left: '3%', top: '20%'}}
      />
      <div className="projects-container">
        <h2 className="projects-section-title">Projects</h2>
        
        <LayoutGroup>
          <motion.div 
            className="projects-grid"
            layout
          >
            {orderedItems.map((item) => (
              <ProjectCard 
                key={item.key}
                project={item.project} 
                index={item.originalIndex}
                isExpanded={item.isExpanded}
                onToggleExpand={() => handleToggleExpand(item.originalIndex)}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};
