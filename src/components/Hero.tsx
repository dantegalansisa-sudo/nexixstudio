import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import MagneticButton from './MagneticButton';

const PREMIUM_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

interface VantaEffect {
  destroy: () => void;
}

// Title broken into lines for proper reveal mask animation
const TITLE_LINES = [
  ['CONSTRUIMOS', 'EL'],
  ['FUTURO', 'DIGITAL'],
];
const HIGHLIGHT_WORDS = ['FUTURO', 'DIGITAL'];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  // Vanta NET background — lazy load, intensified
  useEffect(() => {
    if (vantaEffect || !vantaRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let cancelled = false;
    let effectInstance: VantaEffect | null = null;

    import('vanta/dist/vanta.net.min').then(({ default: NET }) => {
      if (cancelled || !vantaRef.current) return;

      effectInstance = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00d4ff,
        backgroundColor: 0x05050f,
        points: 16.0,
        maxDistance: 22.0,
        spacing: 14.0,
        showDots: true,
      });

      setVantaEffect(effectInstance);
    });

    return () => {
      cancelled = true;
      if (effectInstance) effectInstance.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="hero-cinematic" id="hero">
      {/* Vanta NET animated 3D background */}
      <div ref={vantaRef} className="hero-cinematic__vanta" />

      {/* Vignette overlay for legibility */}
      <div className="hero-cinematic__vignette" />

      {/* Bottom fade for smooth transition to next section */}
      <div className="hero-cinematic__fade-bottom" />

      <motion.div className="hero-cinematic__content" style={{ y, opacity }}>
        {/* Section label AIS-style */}
        <motion.div
          className="section-label section-label--hero"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        >
          <span className="section-label__dash" />
          <span className="section-label__text">STUDIO DIGITAL &middot; SANTO DOMINGO, RD</span>
        </motion.div>

        {/* H1 — Brutal massive title with line-by-line reveal mask */}
        <h1 className="hero-cinematic__title">
          {TITLE_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="hero-cinematic__title-line">
              {line.map((word, wordIdx) => {
                const totalDelay = 0.35 + (lineIdx * line.length + wordIdx) * 0.09;
                const isHighlight = HIGHLIGHT_WORDS.includes(word);
                return (
                  <span key={wordIdx} className="hero-cinematic__title-mask">
                    <motion.span
                      className={`hero-cinematic__title-word ${
                        isHighlight ? 'hero-cinematic__title-word--highlight' : ''
                      }`}
                      initial={{ y: '110%' }}
                      animate={{ y: '0%' }}
                      transition={{
                        duration: 1.1,
                        delay: totalDelay,
                        ease: PREMIUM_EASE,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle — minimal cinematic */}
        <motion.p
          className="hero-cinematic__subtitle"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: PREMIUM_EASE }}
        >
          Webs de alto impacto y automatizaci&oacute;n con IA para negocios
          que no pueden permitirse parecer peque&ntilde;os.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-cinematic__buttons"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: PREMIUM_EASE }}
        >
          <MagneticButton
            href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20mi%20web"
            className="btn-cinematic btn-cinematic--primary"
          >
            <span>QUIERO MI WEB</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#portafolio" className="btn-cinematic btn-cinematic--ghost">
            <span>VER PORTAFOLIO</span>
          </MagneticButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="hero-cinematic__proof"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1, ease: PREMIUM_EASE }}
        >
          <span className="hero-cinematic__proof-item">
            <span className="hero-cinematic__proof-check">&#10003;</span> +15 PROYECTOS ENTREGADOS
          </span>
          <span className="hero-cinematic__proof-divider" />
          <span className="hero-cinematic__proof-item">
            <span className="hero-cinematic__proof-check">&#10003;</span> RD &amp; ESPA&Ntilde;A
          </span>
          <span className="hero-cinematic__proof-divider" />
          <span className="hero-cinematic__proof-item">
            <span className="hero-cinematic__proof-check">&#10003;</span> RESPUESTA EN 24H
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-cinematic__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.8 }}
      >
        <span>SCROLL</span>
        <span className="hero-cinematic__scroll-line">
          <motion.span
            className="hero-cinematic__scroll-line-fill"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  );
}
