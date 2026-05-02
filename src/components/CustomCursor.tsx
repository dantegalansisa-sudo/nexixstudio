import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring smoothing for ring
  const springConfig = { damping: 25, stiffness: 280 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const handleHoverIn = () => setHovering(true);
    const handleHoverOut = () => setHovering(false);

    window.addEventListener('mousemove', moveCursor);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const interactiveSelector =
      'a, button, [role="button"], .service-card, .team-card, input, textarea, select, .portfolio__sticky-card, .portfolio__filter-chip, .testimonials__arrow, .testimonials__dot, .faq__question, .navbar__hamburger';

    const attachListeners = () => {
      const els = document.querySelectorAll<HTMLElement>(interactiveSelector);
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleHoverIn);
        el.addEventListener('mouseleave', handleHoverOut);
      });
      return els;
    };

    let interactives = attachListeners();
    // Re-attach after a short delay to catch dynamically rendered elements
    const reattachTimer = window.setTimeout(() => {
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
      interactives = attachListeners();
    }, 1500);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      window.clearTimeout(reattachTimer);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverIn);
        el.removeEventListener('mouseleave', handleHoverOut);
      });
    };
  }, [cursorX, cursorY, visible]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: hovering ? 0 : 1,
        }}
        transition={{ scale: { duration: 0.2 } }}
      />
      <motion.div
        className={`cursor-ring ${hovering ? 'cursor-ring--hover' : ''}`}
        style={{
          x: springX,
          y: springY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: hovering ? 1.6 : 1,
        }}
        transition={{ scale: { duration: 0.25 } }}
      />
    </>
  );
}
