import React, { useEffect, useRef, useState } from 'react';

interface PixelatedImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const PixelatedImage: React.FC<PixelatedImageProps> = ({ src, alt, className = '', style }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const subCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const glitchRef = useRef(0);

  const hoverFactor = 0.08; // Even lower for more extreme pixelation
  const animationStep = 0.015; // Smoother, slower animation for unpixelation
  const factorRef = useRef(1);

  const draw = (ctx: CanvasRenderingContext2D, subCtx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, subCanvas: HTMLCanvasElement, image: HTMLImageElement) => {
    const factor = factorRef.current;
    
    const glitchAmount = factor < 0.3 ? (Math.random() * 0.01 - 0.005) : 0;
    const effectiveFactor = Math.max(0.05, factor + glitchAmount);
    
    subCanvas.width = canvas.width * effectiveFactor;
    subCanvas.height = canvas.height * effectiveFactor;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);

    if (image.naturalWidth >= image.naturalHeight) {
      const ratio = image.naturalWidth / image.naturalHeight;
      const yPadding = (subCanvas.height - subCanvas.width / ratio) / 2;
      subCtx.drawImage(image, 0, yPadding, subCanvas.width, subCanvas.width / ratio);
    } else {
      const ratio = image.naturalWidth / image.naturalHeight;
      const xPadding = (subCanvas.width - subCanvas.height * ratio) / 2;
      subCtx.drawImage(image, xPadding, 0, subCanvas.height * ratio, subCanvas.height);
    }

    // False for blocky pixel-art effect
    ctx.imageSmoothingEnabled = false;

    if (subCanvas.width === 0 || subCanvas.height === 0) {
      return;
    }

    // Draw scaled-up version to main canvas
    ctx.drawImage(
      subCanvas,
      0, 0, subCanvas.width, subCanvas.height,
      0, 0, canvas.width, canvas.height
    );

    // Add chromatic aberration effect when pixelated (less pronounced during unpixelation)
    if (factor < 0.2) {
      ctx.globalCompositeOperation = 'screen';
      ctx.globalAlpha = 0.08;
      
      // Red channel offset
      ctx.drawImage(
        subCanvas,
        0, 0, subCanvas.width, subCanvas.height,
        -1, 0, canvas.width, canvas.height
      );
      
      // Blue channel offset
      ctx.globalAlpha = 0.08;
      ctx.drawImage(
        subCanvas,
        0, 0, subCanvas.width, subCanvas.height,
        1, 0, canvas.width, canvas.height
      );
      
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    }

    // Instant toggle - show pixelated canvas or original image
    if (factor >= 0.95) {
      canvas.style.opacity = '0';
      image.style.opacity = '1';
    } else {
      canvas.style.opacity = '1';
      image.style.opacity = '0';
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const subCanvas = subCanvasRef.current;
    const image = imageRef.current;

    if (!canvas || !subCanvas || !image || !isLoaded) return;

    const ctx = canvas.getContext('2d');
    const subCtx = subCanvas.getContext('2d');

    if (!ctx || !subCtx) return;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    let isAnimating = false;
    let target = 1;

    const animate = () => {
      if (target > factorRef.current) {
        factorRef.current = Math.min(factorRef.current + animationStep, target);
      } else {
        factorRef.current = Math.max(factorRef.current - animationStep, target);
      }

      draw(ctx, subCtx, canvas, subCanvas, image);

      if (Math.abs(target - factorRef.current) < animationStep) {
        factorRef.current = target;
        draw(ctx, subCtx, canvas, subCanvas, image);
        isAnimating = false;
        return;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const onStart = () => {
      target = hoverFactor;
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    const onEnd = () => {
      target = 1;
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
    };

    canvas.addEventListener('mouseenter', onStart);
    canvas.addEventListener('mouseleave', onEnd);
    canvas.addEventListener('touchstart', onStart);
    canvas.addEventListener('touchend', onEnd);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    subCtx.clearRect(0, 0, subCanvas.width, subCanvas.height);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'source-over';

    // Initial draw
    factorRef.current = 1; 
    draw(ctx, subCtx, canvas, subCanvas, image);

    return () => {
      canvas.removeEventListener('mouseenter', onStart);
      canvas.removeEventListener('mouseleave', onEnd);
      canvas.removeEventListener('touchstart', onStart);
      canvas.removeEventListener('touchend', onEnd);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isLoaded]);

  return (
    <div className={`pixelated-image-container ${className}`} style={{ position: 'relative', width: '100%', height: '100%' , ...style }}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          transform: 'none', // Ensure no scaling occurs
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          cursor: 'default', // Ensure no hover effect
        }}
      />
      <canvas
        ref={subCanvasRef}
        style={{ display: 'none' }}
      />
    </div>
  );
};
