'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  enableGlare?: boolean;
  glareColor?: string;
  scaleOnHover?: number;
  onClick?: () => void;
}

export const Tilt3DCard: React.FC<Tilt3DCardProps> = ({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000,
  enableGlare = true,
  glareColor = 'rgba(255, 255, 255, 0.25)',
  scaleOnHover = 1.02,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values (-0.5 to 0.5 range)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based spring transforms
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Calculate 3D rotations based on cursor
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const scale = useTransform(smoothMouseX, [-0.5, 0, 0.5], [scaleOnHover, 1, scaleOnHover]);

  // Glare position calculation
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const xFromCenter = (e.clientX - rect.left) / width - 0.5;
    const yFromCenter = (e.clientY - rect.top) / height - 0.5;

    mouseX.set(xFromCenter);
    mouseY.set(yFromCenter);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className="inline-block w-full"
    >
      <motion.div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale: isHovered ? scaleOnHover : 1,
          transformStyle: 'preserve-3d',
        }}
        className={`relative transition-shadow duration-300 ${className}`}
      >
        {/* Child Content with preserved 3D child planes */}
        <div className="w-full h-full preserve-3d">
          {children}
        </div>

        {/* Dynamic Specular Light Glare Overlay */}
        {enableGlare && isHovered && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, ${glareColor} 0%, rgba(255,255,255,0) 65%)`,
            }}
            className="absolute inset-0 pointer-events-none rounded-[inherit] z-30 transition-opacity duration-300"
          />
        )}
      </motion.div>
    </div>
  );
};
