'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCelebrationCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xc5a46d, 2.5, 50);
    pointLight1.position.set(10, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x236b51, 2.0, 50);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    // 3. 3D Floating Geometry 1: Golden Intertwined Ring (Celebration & Wedding Symbol)
    const ringGeo1 = new THREE.TorusGeometry(3.6, 0.22, 16, 64);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xc5a46d,
      metalness: 0.85,
      roughness: 0.25,
      emissive: 0x221a08,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.position.set(14, 5, -5);
    ring1.rotation.x = Math.PI / 4;
    scene.add(ring1);

    // 3D Floating Geometry 2: Second Interlocking Ring
    const ringGeo2 = new THREE.TorusGeometry(3.6, 0.22, 16, 64);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xe8d5a8,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x332810,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.position.set(16, 3, -4);
    ring2.rotation.y = Math.PI / 3;
    scene.add(ring2);

    // 3D Floating Geometry 3: Luxury Emerald Diamond Gem (Left Side)
    const gemGeo = new THREE.IcosahedronGeometry(2.8, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x2e8b57,
      metalness: 0.6,
      roughness: 0.15,
      wireframe: false,
      transparent: true,
      opacity: 0.75,
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(-16, -2, -6);
    scene.add(gem);

    // Wireframe diamond outline overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd4b88a,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const gemWire = new THREE.Mesh(gemGeo, wireMat);
    gemWire.position.copy(gem.position);
    scene.add(gemWire);

    // 4. Floating 3D Sparkle Particles (140 golden celebration particles)
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      scales[i] = Math.random() * 2 + 0.5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xc5a46d,
      size: 0.35,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 5. Mouse Parallax Reaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetMouseX = (e.clientX / innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      camera.position.x = currentMouseX * 3;
      camera.position.y = -currentMouseY * 2;
      camera.lookAt(0, 0, 0);

      // Rotate Rings in 3D
      ring1.rotation.x = Math.PI / 4 + elapsedTime * 0.25;
      ring1.rotation.y = elapsedTime * 0.35;
      ring1.position.y = 5 + Math.sin(elapsedTime * 0.8) * 0.8;

      ring2.rotation.x = elapsedTime * 0.3;
      ring2.rotation.y = Math.PI / 3 + elapsedTime * 0.2;
      ring2.position.y = 3 + Math.cos(elapsedTime * 0.8) * 0.8;

      // Rotate Diamond Gem
      gem.rotation.x = elapsedTime * 0.2;
      gem.rotation.y = elapsedTime * 0.25;
      gem.position.y = -2 + Math.sin(elapsedTime * 0.7) * 0.6;
      gemWire.rotation.copy(gem.rotation);
      gemWire.position.copy(gem.position);

      // Rotate Particle Cloud
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = elapsedTime * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    />
  );
};
