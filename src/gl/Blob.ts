import * as THREE from 'three';
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

export default class Blob extends THREE.Object3D {
  geometry: THREE.IcosahedronGeometry;
  material: THREE.ShaderMaterial;
  mesh: THREE.Mesh;

  constructor(size: number, speed: number, color: number, density: number, strength: number, offset: number) {
    super();

    this.geometry = new THREE.IcosahedronGeometry(size, 64);
    
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 512, 512);
    }
    
    const blurTexture = new THREE.CanvasTexture(canvas);
    blurTexture.wrapS = THREE.ClampToEdgeWrapping;
    blurTexture.wrapT = THREE.ClampToEdgeWrapping;
    
    // Create a noise texture as fallback for grain
    const grainCanvas = document.createElement('canvas');
    grainCanvas.width = 256;
    grainCanvas.height = 256;
    const grainCtx = grainCanvas.getContext('2d');
    if (grainCtx) {
      const imageData = grainCtx.createImageData(256, 256);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
      grainCtx.putImageData(imageData, 0, 0);
    }
    
    const grainTexture = new THREE.CanvasTexture(grainCanvas);
    grainTexture.wrapS = THREE.RepeatWrapping;
    grainTexture.wrapT = THREE.RepeatWrapping;
    
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: speed },
        uNoiseDensity: { value: density },
        uNoiseStrength: { value: strength },
        uFreq: { value: 3 },
        uAmp: { value: 6 },
        uHue: { value: color },
        uOffset: { value: offset },
        red: { value: 0 },
        green: { value: 0 },
        blue: { value: 0 },
        uAlpha: { value: 1.0 },
        uBlurTexture: { value: blurTexture },
        uGrainTexture: { value: grainTexture },
      },
      defines: {
        PI: Math.PI
      },
      transparent: true,
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.add(this.mesh);
    
    // Load actual textures
    this.loadBlurTexture();
    this.loadGrainTexture();
  }
  
  loadBlurTexture() {
    const textureLoader = new THREE.TextureLoader();
    
    const attempts = [
      '/assets/texture/blur.webp',
      '/assets/texture/blur.png',
    ];
    
    const tryLoad = (index: number): void => {
      if (index >= attempts.length) {
        console.warn('Could not load blur texture from any format');
        return;
      }
      
      textureLoader.load(
        attempts[index],
        (texture) => {
          console.log('Blur texture loaded successfully from:', attempts[index]);
          texture.wrapS = THREE.ClampToEdgeWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          this.material.uniforms.uBlurTexture.value = texture;
          this.material.needsUpdate = true;
        },
        undefined,
        (error) => {
          console.warn(`Could not load ${attempts[index]}, trying next format...`);
          tryLoad(index + 1);
        }
      );
    };
    
    tryLoad(0);
  }
  
  loadGrainTexture() {
    const textureLoader = new THREE.TextureLoader();
    
    textureLoader.load(
      '/assets/texture/grain.webp',
      (texture) => {
        console.log('Grain texture loaded successfully');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        this.material.uniforms.uGrainTexture.value = texture;
        this.material.needsUpdate = true;
      },
      undefined,
      (error) => {
        console.warn('Could not load grain texture, using fallback');
      }
    );
  }
}