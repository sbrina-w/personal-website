varying vec2 vUv;
varying float vDistort;

uniform float uTime;
uniform float uHue;
uniform float uAlpha;
uniform sampler2D uBlurTexture;
uniform sampler2D uGrainTexture;
uniform float uIsDarkMode;

// Random function for grain/noise
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// Noise function
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  float distort = vDistort * 3.5;
  
  // Background is transparent
  vec3 bgColor = vec3(0.0);
  
  // Create noise pattern
  float noiseScale = 4.0 + abs(distort) * 1.5;
  float noiseValue = noise(vUv * noiseScale);
  
  // Create soft, fading edges with wide smooth transition
  float threshold = 0.5 - abs(distort) * 0.2;
  float elementMask = smoothstep(threshold - 0.35, threshold + 0.35, noiseValue);
  
  vec2 grainUv = vUv * 60.0;
  vec4 grainSample = texture2D(uGrainTexture, grainUv);
  float grainPattern = grainSample.r;
  
  // Create dotted pattern with soft threshold for fade effect
  float dottedPattern = smoothstep(0.45, 0.55, grainPattern);
  
  // Apply soft fade to grain based on element mask
  float softGrain = dottedPattern * elementMask;
  
  // Add additional fade at the edges of the strips
  float edgeFade = smoothstep(0.0, 0.3, elementMask) * smoothstep(1.0, 0.7, elementMask);
  softGrain *= edgeFade;
  
  // Light mode color (warm beige/cream)
  vec3 lightModeColor = vec3(0.823529, 0.827451, 0.694118);
  
  // Dark mode color (darker, more muted warm tone)
  vec3 darkModeColor = vec3(0.45, 0.42, 0.38);
  
  // Interpolate between light and dark mode colors
  vec3 elementColor = mix(lightModeColor, darkModeColor, uIsDarkMode);
  
  // Mix with softer alpha for more transparency
  vec3 color = elementColor;
  
  // Alpha channel with soft, fading edges
  float alpha = softGrain * uAlpha * 0.85;

  gl_FragColor = vec4(color, alpha);
}