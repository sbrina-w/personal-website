import React, { useEffect, useRef, useState } from 'react';

interface WatercolorImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const WatercolorImage: React.FC<WatercolorImageProps> = ({ src, alt, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textureRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const currentRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const texture = textureRef.current;
    const container = containerRef.current;

    if (!canvas || !image || !container || !isLoaded) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        mouseRef.current = {
          x: (touch.clientX - rect.left) / rect.width,
          y: (touch.clientY - rect.top) / rect.height,
        };
      }
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const draw = () => {
      // Smooth interpolation
      currentRef.current.x = lerp(currentRef.current.x, mouseRef.current.x, 0.08);
      currentRef.current.y = lerp(currentRef.current.y, mouseRef.current.y, 0.08);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate displacement
      const displaceX = (currentRef.current.x - 0.5) * 40;
      const displaceY = (currentRef.current.y - 0.5) * 40;

      // Calculate image dimensions and position
      let imgX = 0, imgY = 0, imgWidth = 0, imgHeight = 0;
      if (image.naturalWidth >= image.naturalHeight) {
        const ratio = image.naturalWidth / image.naturalHeight;
        imgHeight = canvas.height;
        imgWidth = imgHeight * ratio;
        imgX = (canvas.width - imgWidth) / 2;
        imgY = 0;
      } else {
        const ratio = image.naturalHeight / image.naturalWidth;
        imgWidth = canvas.width;
        imgHeight = imgWidth * ratio;
        imgX = 0;
        imgY = (canvas.height - imgHeight) / 2;
      }

      // Draw image with displacement
      ctx.save();
      ctx.translate(displaceX, displaceY);
      ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight);
      ctx.restore();

      // Apply watercolor-like texture overlay ONLY on the image area
      if (texture && textureLoaded) {
        ctx.save();
        ctx.translate(displaceX, displaceY);
        
        // Clip to image bounds
        ctx.beginPath();
        ctx.rect(imgX, imgY, imgWidth, imgHeight);
        ctx.clip();
        
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.2;
        
        // Draw texture only within the clipped area
        const pattern = ctx.createPattern(texture, 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(imgX, imgY, imgWidth, imgHeight);
        }
        
        ctx.restore();
      }

      // Add subtle color shift based on mouse position (also only on image)
      ctx.save();
      ctx.translate(displaceX, displaceY);
      ctx.beginPath();
      ctx.rect(imgX, imgY, imgWidth, imgHeight);
      ctx.clip();
      
      const hueShift = (currentRef.current.x - 0.5) * 10;
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = `hsl(${200 + hueShift}, 70%, 60%)`;
      ctx.fillRect(imgX, imgY, imgWidth, imgHeight);
      ctx.restore();

      animationRef.current = requestAnimationFrame(draw);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    
    draw();

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded, textureLoaded]);

  return (
    <div 
      ref={containerRef}
      className={`watercolor-image-container ${className}`} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: 'none' }}
      />
      <img
        ref={textureRef}
        src="/assets/texture/noise.jpeg"
        alt=""
        onLoad={() => setTextureLoaded(true)}
        style={{ display: 'none' }}
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          cursor: 'default',
        }}
      />
    </div>
  );
};
