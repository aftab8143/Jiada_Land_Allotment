import React, { useCallback, useRef, useState } from 'react';

interface InteractiveGlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const MAX_TILT_DEG = 8;

/*
 * Mouse-tracked 3D tilt + glare for glass cards. Skips the transform under
 * prefers-reduced-motion but still shows the glass surface/content.
 */
const InteractiveGlassCard: React.FC<InteractiveGlassCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * MAX_TILT_DEG;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -MAX_TILT_DEG;

    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)');
    setGlare((g) => ({ ...g, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`relative overflow-hidden transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.35), transparent 55%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default InteractiveGlassCard;
