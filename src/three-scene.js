// Three.js interactive 3D particle and atmospheric background
export function initThreeScene() {
  const container = document.getElementById('three-hero-container');
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 550;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Create subtle golden particles (dust & embers in sunset lighting)
  const particleCount = 180;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  const colorOptions = [
    new THREE.Color(0xfcb900), // JCB yellow
    new THREE.Color(0xf59e0b), // Amber
    new THREE.Color(0xffedd5), // Warm glow
    new THREE.Color(0xe08b00)  // Deep gold
  ];

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 140;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

    const chosenColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    colors[i * 3] = chosenColor.r;
    colors[i * 3 + 1] = chosenColor.g;
    colors[i * 3 + 2] = chosenColor.b;

    scales[i] = Math.random() * 2.5 + 0.5;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Canvas texture for circular glow particle
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(252, 185, 0, 0.8)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, Math.PI * 2);
  ctx.fill();

  const particleTexture = new THREE.CanvasTexture(canvas);

  const material = new THREE.PointsMaterial({
    size: 2.2,
    map: particleTexture,
    transparent: true,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.75
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  // Subtle interactive parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const onMouseMove = (event) => {
    const rect = container.getBoundingClientRect();
    if (event.clientY <= rect.bottom) {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    }
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Handle Resize
  const onResize = () => {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || 550;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  };
  window.addEventListener('resize', onResize);

  // Animation Loop with visibility check
  let isVisible = true;
  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(container);

  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Soft orbital drift
    particleSystem.rotation.y = elapsedTime * 0.03;
    particleSystem.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

    // Smooth camera mouse follow
    targetX += (mouseX - targetX) * 0.03;
    targetY += (mouseY - targetY) * 0.03;

    camera.position.x = targetX * 12;
    camera.position.y = -targetY * 8;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
}
