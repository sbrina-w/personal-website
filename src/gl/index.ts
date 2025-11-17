import * as THREE from 'three';
import gsap from 'gsap';

class Gl {
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;
  clock: THREE.Clock;
  mouse: THREE.Vector2;
  mouseTarget: THREE.Vector2;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0xffffff, 0);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 18);

    this.scene = new THREE.Scene();

    this.clock = new THREE.Clock();

    this.mouse = new THREE.Vector2();
    this.mouseTarget = new THREE.Vector2();

    this.init();
    this.animate();
  }

  init() {
    this.addCanvas();
    this.addEvents();
  }

  addCanvas() {
    const canvas = this.renderer.domElement;
    canvas.classList.add('webgl');
    document.body.appendChild(canvas);
  }

  addEvents() {
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('mousemove', this.mouseMove.bind(this));
  }

  resize() {
    let width = window.innerWidth;
    let height = window.innerHeight;

    this.camera.aspect = width / height;
    this.renderer.setSize(width, height);

    this.camera.updateProjectionMatrix();
  }

  mouseMove(e: MouseEvent) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }

  render() {
    // Remove loading class when scene has objects
    if (this.scene.children.length > 0) {
      document.body.classList.remove('loading');
    }

    this.scene.children.forEach((mesh) => {
      if (mesh instanceof THREE.Object3D && 'material' in mesh) {
        const material = (mesh as any).material;
        if (material && material.uniforms && material.uniforms.uTime) {
          material.uniforms.uTime.value = this.clock.getElapsedTime();
        }
      }
    });

    this.mouseTarget.x = gsap.utils.interpolate(this.mouseTarget.x, this.mouse.x, 0.03);
    this.mouseTarget.y = gsap.utils.interpolate(this.mouseTarget.y, this.mouse.y, 0.03);

    // Rotate blob's internal mesh
    this.scene.children.forEach((child) => {
      if (child instanceof THREE.Object3D && child.children.length > 0) {
        const mesh = child.children[0];
        if (mesh) {
          mesh.rotation.set(
            this.mouseTarget.y * 0.25,
            this.mouseTarget.x * 0.25,
            0
          );
        }
      }
    });

    this.renderer.render(this.scene, this.camera);
  }
}

export default new Gl();