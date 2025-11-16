import {
  Mesh,
  PlaneGeometry,
  RawShaderMaterial,
  Vector3,
  Texture,
} from 'three';
import Config from './MotionNoiseConfig';

const vertexShader = `
precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform sampler2D grainTex;
uniform sampler2D blurTex;
uniform float time;
uniform float seed;
uniform vec3 back;
uniform float style;
uniform float param1;
uniform float param2;
uniform float param3;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Create circular mask centered at top-right (3/4 visible)
  vec2 center = vec2(-0.35, -0.35);
  float dist = distance(uv, center);
  float radius = 1.5;
  float circleMask = 1.0 - smoothstep(radius - 0.5, radius, dist);
  
  // If circle mask is too low, we won't see anything
  if (circleMask < 0.01) discard;
  
  // Tile the grain texture many times for fine noise
  float scale = 15.0;
  vec2 tiledUv = uv * scale;
  
  // Slow animated movement
  float t = time * 0.0002;
  vec2 offset = vec2(t * 8.0, t * 5.0);
  
  // Sample grain texture with tiling and movement
  vec4 grainColor = texture2D(grainTex, tiledUv + offset);
  
  // Add subtle wave distortion for motion
  float wave = sin(uv.x * 30.0 + t * 80.0) * cos(uv.y * 30.0 + t * 60.0);
  vec2 distortion = vec2(wave * param2);
  vec4 distortedGrain = texture2D(grainTex, tiledUv + offset + distortion);
  
  // Mix grain samples
  vec4 finalGrain = mix(grainColor, distortedGrain, 0.4);
  
  // More contrast - darken the grain
  vec3 darkGrain = finalGrain.rgb * 0.7;
  
  // Blend with background color
  vec3 color = mix(darkGrain, back, 1.0 - (param3 * circleMask));
  
  // Apply monochrome if needed
  if (style > 0.5) {
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = vec3(gray);
  }
  
  // Output with strong alpha for visibility
  gl_FragColor = vec4(color, circleMask * 0.9);
}
`;

interface CircleProps {
  grain: Texture;
  blur: Texture;
}

export class Circle extends Mesh {
  constructor({ grain, blur }: CircleProps) {
    super();

    // Larger plane to ensure coverage
    this.geometry = new PlaneGeometry(10, 10);
    this.material = new RawShaderMaterial({
      uniforms: {
        grainTex: { value: grain },
        blurTex: { value: blur },
        time: { value: 0.0 },
        seed: { value: Math.random() * 100.0 },
        back: { value: new Vector3(0.96, 0.95, 0.91) },
        style: { value: 0 },
        param1: { value: 0.5 },
        param2: { value: 0.003 }, // Subtle distortion
        param3: { value: 0.8 },   // Visibility amount - INCREASED
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    });

    // Position in top-right area - adjusted to be within camera view
    // Camera is roughly -1.7 to 1.7 on x, -2 to 2 on y
    this.position.x = -0.8;
    this.position.y = -1.0;
    this.position.z = 0;
  }

  changeStyle(style: number) {
    (this.material as RawShaderMaterial).uniforms.style.value = style;
  }

  update(time: number) {
    const material = this.material as RawShaderMaterial;
    material.uniforms.time.value = time;
    material.uniforms.back.value.x = Config.backColor.r;
    material.uniforms.back.value.y = Config.backColor.g;
    material.uniforms.back.value.z = Config.backColor.b;
    material.uniforms.param1.value = Config.params.param1;
    material.uniforms.param2.value = Config.params.param2;
    material.uniforms.param3.value = Config.params.param3;
  }
}
