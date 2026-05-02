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
  ['Construimos', 'el', 'Futuro'],
  ['Digital', 'de', 'tu', 'Negocio'],
];
const HIGHLIGHT_WORDS = ['Futuro', 'Digital'];

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect | null>(null);

  // Vanta NET background — lazy load
  useEffect(() => {
    if (vantaEffect || !vantaRef.current) return;

    // Respect prefers-reduced-motion — skip animated background
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
        backgroundColor: 0x050510,
        points: 12.0,
        maxDistance: 24.0,
        spacing: 18.0,
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
        {/* Badge pill — cyan glow */}
        <motion.div
          className="hero-cinematic__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
        >
          <span className="hero-cinematic__badge-dot" />
          Agencia Digital en Rep&uacute;blica Dominicana
        </motion.div>

        {/* H1 — Massive title with line-by-line reveal mask */}
        <h1 className="hero-cinematic__title">
          {TITLE_LINES.map((line, lineIdx) => (
            <span key={lineIdx} className="hero-cinematic__title-line">
              {line.map((word, wordIdx) => {
                const totalDelay = 0.3 + (lineIdx * line.length + wordIdx) * 0.08;
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
                        duration: 1,
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

        {/* Subtitle */}
        <motion.p
          className="hero-cinematic__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4, ease: PREMIUM_EASE }}
        >
          Webs que conquistan mercados. Automatizaci&oacute;n con IA que elimina el trabajo repetitivo.
          Somos el equipo tech que tu empresa necesitaba.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="hero-cinematic__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6, ease: PREMIUM_EASE }}
        >
          <MagneticButton
            href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20mi%20web"
            className="btn-cinematic btn-cinematic--primary"
          >
            <span>Quiero mi Web</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </MagneticButton>
          <MagneticButton href="#portafolio" className="btn-cinematic btn-cinematic--ghost">
            <span>Ver Portafolio</span>
          </MagneticButton>
        </motion.div>

        {/* Social proof */}
        <motion.div
          className="hero-cinematic__proof"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.9, ease: PREMIUM_EASE }}
        >
          <span className="hero-cinematic__proof-item">
            <span className="hero-cinematic__proof-check">&#10003;</span> +15 proyectos entregados
          </span>
          <span className="hero-cinematic__proof-divider" />
          <span className="hero-cinematic__proof-item">
            <span className="hero-cinematic__proof-check">&#10003;</span> RD y Espa&ntilde;a
          </span>
          <span className="hero-cinematic__proof-divider" />
          <span className="hero-cinematic__proof-item">
            <span className="hero-cinematic__proof-check">&#10003;</span> Respuesta en 24h
          </span>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-cinematic__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <span>Scroll</span>
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
