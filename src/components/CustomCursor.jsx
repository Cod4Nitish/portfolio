import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const isHovering = useRef(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    let animFrame;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    // Show cursors
    dot.style.opacity = '1';
    ring.style.opacity = '1';

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const checkHover = (e) => {
      const target = e.target;
      const clickable = target.closest('a, button, input, textarea, [data-cursor-hover]');
      isHovering.current = !!clickable;
    };

    const animate = () => {
      // Dot follows instantly
      dotX = mouseX;
      dotY = mouseY;

      // Ring follows with lag (lerp)
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dot) {
        dot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }

      if (ring) {
        const scale = isHovering.current ? 1.8 : 1;
        ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px) scale(${scale})`;
        ring.style.borderColor = isHovering.current ? 'var(--accent)' : 'rgba(255,255,255,0.6)';
        ring.style.background = isHovering.current ? 'var(--accent-bg)' : 'transparent';
      }

      animFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', checkHover);
    animFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', checkHover);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <>
      {/* Tiny solid dot - no lag */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#fff',
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: 0,
          transition: 'background 0.2s ease',
          willChange: 'transform',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={cursorRingRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.6)',
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: 0,
          transition: 'border-color 0.3s ease, background 0.3s ease',
          willChange: 'transform',
          backdropFilter: 'none',
        }}
      />
    </>
  );
};

export default CustomCursor;
