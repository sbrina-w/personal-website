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
  images?: string[];
}

const projects: Project[] = [
  {
    name: 'Yelp Analysis',
    year: '2024',
    description: 'Analytics platform transforming thousands of Yelp reviews into actionable business insights through a hybrid ML/LLM pipeline with semantic search, sentiment analysis, and automated topic clustering.',
    fullDescription: 'An analytics platform that transforms thousands of Yelp reviews into actionable business insights through a hybrid ML/LLM pipeline. The system processes review data end-to-end from ingestion and preprocessing to semantic search, sentiment analysis, and automated topic clustering—enabling restaurant owners to discover root causes, prioritize fixes, and monitor impact without reading every review manually.',
    detailedAccomplishments: [
      'Engineered semantic search and embeddings pipeline using SentenceTransformers and ChromaDB with persistent vector storage, enabling sub-second natural-language retrieval across 5,000+ reviews with sentiment and location filters',
      'Implemented hybrid NLP architecture combining local HuggingFace models for sentiment classification and summarization with LangChain/OpenAI chains for structured review analysis (issue type, priority, actionable summaries)',
      'Built automated topic clustering system using KMeans, PCA visualization, and GPT-based cluster labeling to surface recurring themes by restaurant, city, and time, reducing manual topic analysis effort by 90%',
      'Designed multi-persona Streamlit interface (Restaurant Explorer, Business Owner, Data Analyst) with interactive dashboards, Folium maps, trend charts, and priority issue triage workflows to drive faster operational decisions',
      'Added robustness features including Streamlit caching for instant re-renders, retry/fallback logic for LLM calls, seeded reproducible clustering, and concurrent batch processing for scalable analysis'
    ],
    techStack: ['Streamlit', 'LangChain', 'OpenAI', 'HuggingFace', 'ChromaDB', 'Python', 'Pandas', 'Plotly'],
    github: 'https://github.com/sbrina-w/yelp-analysis',
    liveLink: 'https://yelp-analysis.streamlit.app/',
    images: [
      '/assets/project-visuals/yelp1.png',
      '/assets/project-visuals/yelp2.png',
      '/assets/project-visuals/yelp3.png',
      '/assets/project-visuals/yelp4.png',
      '/assets/project-visuals/yelp5.png',
      '/assets/project-visuals/yelp6.png'
    ]
  },
  {
    name: 'PokePlants',
    year: '2024',
    description: 'Interactive mixed-reality prototype bridging web, hardware, and AI to create a Pokémon-style plant care game. Won 1st place at Hack the 6ix 2024, Toronto\'s largest summer hackathon.',
    fullDescription: 'An interactive mixed-reality prototype that bridges web, hardware, and AI to create a Pokémon-style plant care game. Players interact through a polished React frontend while physical Arduino sensors and computer vision influence game state in real-time, demonstrating full-stack IoT engineering and modular AI/vision components suitable for robotics, interactive installations, or automated systems.',
    detailedAccomplishments: [
      'Built real-time multiplayer game architecture using React frontend with WebSocket-based communication to Python/Flask backend, enabling sub-second synchronization for responsive local and multiplayer gameplay',
      'Integrated Arduino sensor pipeline with serial data ingestion (read_serial.py) and webcam capture (webcam.py) to stream moisture levels, light exposure, and visual plant health data into game mechanics',
      'Implemented computer vision and AI orchestration using OpenCV for image processing and OpenAI/LangChain for plant identification and deficiency detection, with modular agent.py for extensible automation behaviors',
      'Won 1st place at Hack the 6ix 2024, Toronto\'s largest summer hackathon, by demonstrating a compelling mixed-reality experience that combines physical interactions with digital gameplay',
      'Designed modular architecture with reusable vision pipeline and agent components that can be repurposed for autonomous gameplay, gesture recognition, or interactive prototyping platforms'
    ],
    techStack: ['React', 'Python', 'Flask', 'MongoDB', 'OpenAI', 'OpenCV', 'Arduino', 'Socket.io', 'WebSockets'],
    github: 'https://github.com/FO214/ht6',
    devpost: 'https://devpost.com/software/pokeplants',
    images: [
      '/assets/project-visuals/pokeplants-cover.png',
      '/assets/project-visuals/pokeplants-battle.png',
      '/assets/project-visuals/pokeplants-plantdex.png',
      '/assets/project-visuals/pokeplants-tech.png'
    ]
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
    devpost: 'https://devpost.com/software/chroma-q3wshr',
    images: [
      '/assets/project-visuals/chroma-get-color.mp4',
      '/assets/project-visuals/chroma-calculate.mp4',
      '/assets/project-visuals/chroma-verify.mp4',
      '/assets/project-visuals/chroma-verify2.mp4'
    ]
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
    liveLink: 'https://dorahacks.io/buidl/21709',
    images: [
      '/assets/project-visuals/nudge-happy.gif',
      '/assets/project-visuals/nudge-angry.gif'
    ]
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
    liveLink: 'https://chromewebstore.google.com/detail/moodminder/iobpegidgaikaooclpomdpplcffiablb',
    images: [
      '/assets/project-visuals/moodminder-demo.mov',
      '/assets/project-visuals/moodminder-blur.png',
      '/assets/project-visuals/moodminder-hide.png',
      '/assets/project-visuals/moodminder-off.png'
    ]
  },
  {
    name: 'Mini C (WLP4) Compiler',
    year: '2024',
    description: 'A multi-stage code generator that translates WLP4 (a subset of C) parse trees into executable MIPS assembly.',
    fullDescription: 'A multi-stage code generator that translates WLP4 (a subset of C) parse trees into executable MIPS assembly. The compiler handles procedure calls, pointer operations, control flow, and dynamic memory allocation while interfacing with external runtime libraries.',
    detailedAccomplishments: [
      'Designed stack frame layout with calling conventions for multi-procedure programs, managing register preservation, parameter passing, and return values across function boundaries',
      'Implemented type-aware expression code generation supporting integer and pointer semantics, including pointer arithmetic with automatic word-size scaling, address-of/dereference operators, and array indexing',
      'Built control flow generation for if/else and while constructs using generated labels and conditional branches, ensuring correct jump targets and loop behavior',
      'Integrated external MERL libraries (alloc.merl, print.merl) through proper linking and calling conventions, handling edge cases like NULL dereference crashes, failed allocations, and NULL-safe delete operations'
    ],
    techStack: ['C++', 'MIPS Assembly'],
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
    github: 'https://github.com/pahu2353/TungTung',
    images: [
      '/assets/project-visuals/tungtung-intro.png',
      '/assets/project-visuals/tungtung-listings.png',
      '/assets/project-visuals/tungtung-graph.png',
      '/assets/project-visuals/tungtung-profile.png'
    ]
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
    images: ['/assets/project-visuals/raiinet-gameplay.png']
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  gradient?: { x: number; y: number; prevX: number; prevY: number };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isExpanded, onToggleExpand, gradient }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const expandedContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const projectImages = project.images || [];

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
    if (isExpanded && projectImages.length > 1) {
      const currentMedia = projectImages[currentImageIndex];
      const isVideo = currentMedia.endsWith('.mp4') || currentMedia.endsWith('.mov');
      
      if (isVideo && videoRef.current) {
        const video = videoRef.current;
        
        const startAutoAdvance = () => {
          const duration = (video.duration * 1000) || 5000; // Fallback to 5 seconds
          const timeout = setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
          }, duration);
          
          return timeout;
        };
        
        // Wait for metadata to be loaded
        if (video.duration) {
          const timeout = startAutoAdvance();
          return () => clearTimeout(timeout);
        } else {
          const handleLoadedMetadata = () => {
            const timeout = startAutoAdvance();
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
          };
          video.addEventListener('loadedmetadata', handleLoadedMetadata);
          
          return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
          };
        }
      } else {
        // For images and gifs, use 3 second interval
        const timeout = setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
        }, 3000);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [isExpanded, projectImages.length, currentImageIndex, projectImages]);

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

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const handleImageClick = (e: React.MouseEvent, imageUrl: string) => {
    e.stopPropagation();
    window.open(imageUrl, '_blank', 'noopener,noreferrer');
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
      style={gradient && !isExpanded ? {
        backgroundImage: `
          radial-gradient(
            circle 300px at ${gradient.x}% ${gradient.y}%,
            var(--gradient-warm-1) 0%,
            var(--gradient-warm-2) 40%,
            var(--gradient-warm-3) 100%
          )
        `,
      } : {}}
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
            {projectImages.length > 0 && (
              <div className="project-expanded-left">
                <span className="project-decorative-text">⟢ ⟢ ⟢ ⟢ ⟢ ⟢</span>
                <span className="project-decorative-slashes">/ / / / / / / /</span>
                <div className="image-carousel">
                  {projectImages[currentImageIndex].endsWith('.mp4') || projectImages[currentImageIndex].endsWith('.mov') ? (
                    <video 
                      ref={videoRef}
                      src={projectImages[currentImageIndex]} 
                      className="carousel-image"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onClick={(e) => handleImageClick(e, projectImages[currentImageIndex])}
                    />
                  ) : projectImages[currentImageIndex].endsWith('.gif') ? (
                    <img 
                      src={projectImages[currentImageIndex]} 
                      alt={`${project.name} preview ${currentImageIndex + 1}`}
                      className="carousel-image"
                      onClick={(e) => handleImageClick(e, projectImages[currentImageIndex])}
                    />
                  ) : (
                    <img 
                      src={projectImages[currentImageIndex]} 
                      alt={`${project.name} preview ${currentImageIndex + 1}`}
                      className="carousel-image"
                      onClick={(e) => handleImageClick(e, projectImages[currentImageIndex])}
                    />
                  )}
                  {projectImages.length > 1 && (
                    <>
                      <button 
                        className="carousel-arrow carousel-arrow-left" 
                        onClick={handlePrevImage}
                        aria-label="Previous image"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 18l-6-6 6-6"/>
                        </svg>
                      </button>
                      <button 
                        className="carousel-arrow carousel-arrow-right" 
                        onClick={handleNextImage}
                        aria-label="Next image"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </button>
                    </>
                  )}
                  <div className="carousel-dots">
                    {projectImages.map((_, i) => (
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
            )}
            
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
                      className="project-link-expanded"
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
                      className="project-link-expanded"
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
                      className="project-link-expanded"
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [cardGradients, setCardGradients] = useState<Record<number, { x: number; y: number; prevX: number; prevY: number }>>({});
  const prevGradientsRef = useRef<Record<number, { x: number; y: number }>>({});
  const [scrollY, setScrollY] = useState(0);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = section.querySelectorAll('.project-card');
      const newGradients: Record<number, { x: number; y: number; prevX: number; prevY: number }> = {};
      
      cards.forEach((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const x = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const y = ((e.clientY - cardRect.top) / cardRect.height) * 100;
        
        const prev = prevGradientsRef.current[index];
        newGradients[index] = { 
          x, 
          y,
          prevX: prev?.x ?? x,
          prevY: prev?.y ?? y
        };
        
        prevGradientsRef.current[index] = { x, y };
      });
      
      setCardGradients(newGradients);
    };

    const handleScroll = () => {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress relative to section visibility
      const scrollProgress = (windowHeight - sectionTop) / (windowHeight + sectionHeight);
      setScrollY(scrollProgress);
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
    <section ref={sectionRef} className="projects-section" id="projects">
      <PixelatedImage
        src="/illustrations/drink2.png"
        alt="Cake Decoration Left"
        className="dessert-decoration"
        style={{ 
          position: 'absolute', 
          width: '500px', 
          height: '500px', 
          right: '5%', 
          bottom: '10%', 
          transform: `rotate(15deg) translate(${scrollY * 30}px, ${scrollY * -200}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      <PixelatedImage
        src="/illustrations/matcha-cookie.png"
        alt="Cake Decoration Right"
        className="dessert-decoration"
        style={{ 
          position: 'absolute', 
          width: '600px', 
          height: '600px', 
          left: '0%', 
          top: '20%',
          transform: `translate(${scrollY * -30}px, ${scrollY * -250}px)`,
          transition: 'transform 0.1s ease-out'
        }}
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
                gradient={cardGradients[item.originalIndex]}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
};
