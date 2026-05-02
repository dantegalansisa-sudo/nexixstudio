import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import MagneticButton from './MagneticButton';

const PREMIUM_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

const wordVariants = {
  hidden: { y: '110%', rotate: 2 },
  visible: (i: number) => ({
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.85,
      delay: 0.3 + i * 0.07,
      ease: PREMIUM_EASE,
    },
  }),
};

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // Cursor reactive glow
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width) * 100);
      mouseY.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const cursorGlowX = useTransform(springX, (v) => `${v}%`);
  const cursorGlowY = useTransform(springY, (v) => `${v}%`);

  const titleWords = ['Construimos', 'el', 'Futuro', 'Digital', 'de', 'tu', 'Negocio'];
  const highlightWords = ['Futuro', 'Digital'];

  return (
    <section className="hero" id="hero" ref={heroRef}>
      {/* Animated mesh gradient background — multi-layer 3D illusion */}
      <div className="hero__mesh">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />
        <div className="hero__blob hero__blob--4" />
      </div>

      {/* Cursor reactive glow */}
      <motion.div
        className="hero__cursor-glow"
        style={{
          left: cursorGlowX,
          top: cursorGlowY,
        }}
      />

      {/* Subtle grid overlay */}
      <div className="hero__grid-overlay" />

      <motion.div className="hero__content" style={{ y, opacity }}>
        {/* Badge pill */}
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: PREMIUM_EASE }}
        >
          <span className="hero__badge-dot" /> Agencia Digital en Rep&uacute;blica Dominicana
        </motion.div>

        {/* H1 — RevealText stagger by word */}
        <h1 className="hero__title" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em', justifyContent: 'center' }}>
          {titleWords.map((word, i) => (
            <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
              <motion.span
                style={{ display: 'inline-block' }}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className={highlightWords.includes(word) ? 'hero__title-highlight' : ''}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: PREMIUM_EASE }}
        >
          Webs que conquistan mercados. Automatizaci&oacute;n con IA que elimina el trabajo repetitivo.
          Somos el equipo tech que tu empresa necesitaba.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="hero__buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: PREMIUM_EASE }}
        >
          <MagneticButton
            href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20mi%20web"
            className="btn-primary btn-primary--glow"
          >
            Quiero mi Web &rarr;
          </MagneticButton>
          <MagneticButton
            href="#portafolio"
            className="btn-outline"
          >
            Ver Portafolio
          </MagneticButton>
        </motion.div>

        {/* Social proof pills */}
        <motion.div
          className="hero__proof"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5, ease: PREMIUM_EASE }}
        >
          <span className="hero__proof-item">
            <span className="hero__proof-check">&#10003;</span> +15 proyectos entregados
          </span>
          <span className="hero__proof-dot">&middot;</span>
          <span className="hero__proof-item">
            <span className="hero__proof-check">&#10003;</span> RD y Espa&ntilde;a
          </span>
          <span className="hero__proof-dot">&middot;</span>
          <span className="hero__proof-item">
            <span className="hero__proof-check">&#10003;</span> Respuesta en 24h
          </span>
        </motion.div>
      </motion.div>

      {/* Floating code element — glass card */}
      <motion.div
        className="hero__code-float"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 0.85, x: 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: PREMIUM_EASE }}
      >
        <div className="hero__code-dots">
          <span /><span /><span />
        </div>
        <span className="code-comment">{'// NEXIX Tech Studio'}</span><br />
        <span className="code-keyword">const</span> proyecto = {'{'}<br />
        &nbsp;&nbsp;cliente: <span className="code-string">"Tu Negocio"</span>,<br />
        &nbsp;&nbsp;stack: <span className="code-string">"React + IA"</span>,<br />
        &nbsp;&nbsp;estado: <span className="code-string">"&#128640; Lanzado"</span>,<br />
        {'}'}<br /><br />
        <span className="code-keyword">export default</span> proyecto
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span>Scroll</span>
        <motion.div
          className="hero__scroll-chevron"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
