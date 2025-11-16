import React, { useEffect, useRef } from 'react';
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  TextureLoader,
  NearestFilter,
  RepeatWrapping,
} from 'three';
import Config from './MotionNoiseConfig';
import { Circle } from './CircleMesh';

const BackgroundEffect: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<Circle | null>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<OrthographicCamera | null>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Set initial config
    const container = mountRef.current;
    const rect = container.getBoundingClientRect();
    Config.dpr = Math.min(window.devicePixelRatio, 1.5);
    Config.width = rect.width;
    Config.height = rect.height;
    Config.halfWidth = Config.width / 2;
    Config.halfHeight = Config.height / 2;
    Config.aspectRatio = Config.width / Config.height;

    // Create scene
    const scene = new Scene();
    sceneRef.current = scene;

    // Create camera
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10000);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Create renderer
    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(Config.width, Config.height);
    renderer.setPixelRatio(Config.dpr);
    rendererRef.current = renderer;
    container.appendChild(canvas);

    // Load textures and initialize
    const loader = new TextureLoader();
    Promise.all([
      loader.loadAsync('/assets/texture/grain.webp'),
      loader.loadAsync('/assets/texture/blur.webp'),
    ])
      .then((textures) => {
        // Set textures to repeat/tile instead of stretch
        textures[0].wrapS = textures[0].wrapT = RepeatWrapping;
        textures[0].minFilter = NearestFilter;
        textures[0].magFilter = NearestFilter;
        textures[0].generateMipmaps = false;
        
        textures[1].wrapS = textures[1].wrapT = RepeatWrapping;
        textures[1].minFilter = NearestFilter;
        textures[1].magFilter = NearestFilter;
        textures[1].generateMipmaps = false;

        const circle = new Circle({
          grain: textures[0],
          blur: textures[1],
        });
        circleRef.current = circle;
        scene.add(circle);

        resizeScene();
        isReadyRef.current = true;
        console.log('Textures loaded and circle added to scene');
        console.log('Circle position:', circle.position);
        console.log('Camera:', camera.left, camera.right, camera.top, camera.bottom);
      })
      .catch((error) => {
        console.error('Error loading textures:', error);
        console.log('Texture paths:', '/assets/texture/grain.webp', '/assets/texture/blur.webp');
      });

    // Resize scene
    const resizeScene = () => {
      const rect = container.getBoundingClientRect();
      Config.dpr = Math.min(window.devicePixelRatio, 1.5);
      Config.width = rect.width;
      Config.height = rect.height;
      Config.halfWidth = Config.width / 2;
      Config.halfHeight = Config.height / 2;
      Config.aspectRatio = Config.width / Config.height;

      // Always cover the full viewport
      const scale = Math.max(Config.aspectRatio, 1 / Config.aspectRatio) * 1.5;
      camera.left = -scale;
      camera.right = scale;
      camera.top = scale / Config.aspectRatio;
      camera.bottom = -scale / Config.aspectRatio;
      
      Config.sceneWidth = scale * 2;
      Config.sceneHeight = (scale * 2) / Config.aspectRatio;

      camera.updateProjectionMatrix();
      renderer.setSize(Config.width, Config.height);
    };

    // Animation loop
    let frameId: number;
    let startTime = Date.now();

    const animate = () => {
      const time = (Date.now() - startTime) * 0.001;

      if (isReadyRef.current && circleRef.current) {
        circleRef.current.update(time);
        renderer.render(scene, camera);
      } else {
        // Clear to a visible color to test rendering
        renderer.setClearColor(0x000000, 0);
        renderer.render(scene, camera);
      }

      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      resizeScene();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      if (container && canvas.parentNode === container) {
        container.removeChild(canvas);
      }
      if (circleRef.current) {
        circleRef.current.geometry.dispose();
        const material = circleRef.current.material;
        if (Array.isArray(material)) {
          material.forEach(m => m.dispose());
        } else {
          material.dispose();
        }
      }
      renderer.dispose();
    };
  }, []);



  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default BackgroundEffect;