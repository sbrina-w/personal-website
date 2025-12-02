import React, { useRef, useEffect, useState } from 'react';
import '../styles/carousel.css';

interface InfiniteCarouselProps {
  images: string[];
}

export const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ images }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef(0);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const scroller = scrollerRef.current;
    const inner = innerRef.current;
    if (!scroller || !inner) return;

    // Duplicate the images for seamless infinite scroll
    const scrollerContent = Array.from(inner.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute('aria-hidden', 'true');
      
      // Add click handler to duplicated item
      const imgSrc = duplicatedItem.querySelector('img')?.src;
      if (imgSrc) {
        duplicatedItem.addEventListener('click', () => window.open(imgSrc, '_blank'));
      }
      
      inner.appendChild(duplicatedItem);
    });

    // Calculate total width
    const totalWidth = inner.scrollWidth / 2;

    const animate = () => {
      const now = Date.now();
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Speed: pixels per second (adjust base speed here)
      const baseSpeed = totalWidth / 80; // 40 seconds for full scroll
      const speed = isHoveredRef.current ? baseSpeed / 2 : baseSpeed;
      
      positionRef.current -= (speed * delta) / 1000;
      
      // Reset position for infinite loop
      if (Math.abs(positionRef.current) >= totalWidth) {
        positionRef.current = 0;
      }

      if (inner) {
        inner.style.transform = `translateX(${positionRef.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div 
      className="infinite-carousel" 
      ref={scrollerRef}
      onMouseEnter={() => isHoveredRef.current = true}
      onMouseLeave={() => isHoveredRef.current = false}
    >
      <div className="carousel-scroller-inner" ref={innerRef}>
        {images.map((image, index) => (
          <div 
            key={index} 
            className="carousel-item-infinite"
            onClick={() => window.open(image, '_blank')}
          >
            <img src={image} alt={`Art ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
