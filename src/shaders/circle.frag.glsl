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

// Simple noise function
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D noise
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
  vec2 uv = vUv;
  
  // Create circular gradient
  vec2 center = vec2(0.5, 0.5);
  float dist = distance(uv, center);
  
  // Animated noise offset
  float t = time * 0.5;
  vec2 noiseCoord = uv * 3.0 + vec2(t * 0.2, t * 0.1);
  float n = noise(noiseCoord + seed);
  
  // Sample textures with animated offset
  vec2 grainCoord = uv + vec2(n * 0.1, n * 0.1);
  vec2 blurCoord = uv + vec2(sin(t) * 0.05, cos(t) * 0.05);
  
  vec4 grainColor = texture2D(grainTex, grainCoord);
  vec4 blurColor = texture2D(blurTex, blurCoord);
  
  // Create motion effect
  float motion = n * param1;
  vec2 distortUv = uv + vec2(
    sin(uv.y * 10.0 + t) * motion * param2,
    cos(uv.x * 10.0 + t) * motion * param2
  );
  
  // Combine textures
  vec4 combined = mix(grainColor, blurColor, 0.5);
  
  // Add circular vignette
  float circle = 1.0 - smoothstep(0.3, 0.8, dist);
  
  // Apply color mixing
  vec3 color = mix(back, combined.rgb, circle * param3);
  
  // Style switching (mono vs color)
  if (style > 0.5) {
    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = vec3(gray);
  }
  
  // Alpha based on distance and noise
  float alpha = circle * (0.7 + n * 0.3);
  
  gl_FragColor = vec4(color, alpha);
}
