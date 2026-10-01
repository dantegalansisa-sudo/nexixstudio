import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

type Step = { title: string; text: string; icon: ReactNode; tone: "orange" | "lime" | "blue" };

function PinnedCard({ s, i, n, progress }: { s: Step; i: number; n: number; progress: MotionValue<number> }) {
  // 1 when this step is centered, fading/shrinking as it moves away
  const dist = useTransform(progress, (p) => Math.min(1, Math.abs(p * (n - 1) - i)));
  const scale = useTransform(dist, [0, 1], [1, 0.88]);
  const opacity = useTransform(dist, [0, 1], [1, 0.45]);
  const glow = useTransform(dist, [0, 1], [1, 0]);
  return (
    <motion.li className={`nx-pin-card nx-step--${s.tone}`} style={{ scale, opacity }}>
      <motion.span className="nx-pin-card__glow" style={{ opacity: glow }} aria-hidden="true" />
      <span className="nx-pin-card__num">{String(i + 1).padStart(2, "0")}</span>
      <span className="nx-pin-card__icon">{s.icon}</span>
      <h3>{s.title}</h3>
      <p>{s.text}</p>
    </motion.li>
  );
}

/**
 * Mobile/tablet Proceso: the section pins to the screen and vertical scrolling
 * drives the steps horizontally (GSAP ScrollTrigger "pin + scrub" pattern,
 * built with position: sticky + Framer Motion, no extra library).
 */
export default function ProcesoPinned({ steps, eyebrow, title }: { steps: Step[]; eyebrow: string; title: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = !!useReducedMotion();
  const n = steps.length;

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const maxShift = useMotionValue(0);
  const x = useTransform(() => -scrollYProgress.get() * maxShift.get());
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => setActive(Math.min(n - 1, Math.round(p * (n - 1)))));

  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      const tr = trackRef.current;
      if (vp && tr) maxShift.set(Math.max(0, tr.scrollWidth - vp.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, [maxShift]);

  // Reduced motion: plain vertical list, no pinning
  if (reduce) {
    return (
      <section id="proceso" className="nx-process nx-process--list">
        <div className="nx-process__veil" aria-hidden="true" />
        <div className="nx-container">
          <p className="nx-eyebrow nx-eyebrow--lines">{eyebrow}</p>
          <h2 className="nx-process__title">{title}</h2>
          <ol className="nx-pin-list">
            {steps.map((s, i) => (
              <li key={s.title} className={`nx-pin-card nx-step--${s.tone}`}>
                <span className="nx-pin-card__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="nx-pin-card__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="proceso" className="nx-process nx-process--pin" style={{ height: `${100 + (n - 1) * 60}svh` }}>
      <div className="nx-pin">
        <picture className="nx-process__bg" aria-hidden="true">
          <img src="/images/proceso-bg-900.webp" alt="" loading="lazy" decoding="async" width="900" height="506" />
        </picture>
        <div className="nx-process__veil" aria-hidden="true" />

        <div className="nx-container nx-pin__head">
          <p className="nx-eyebrow nx-eyebrow--lines">{eyebrow}</p>
          <h2 className="nx-process__title">{title}</h2>
        </div>

        <div ref={viewportRef} className="nx-pin__viewport">
          <motion.ol ref={trackRef} className="nx-pin__track" style={{ x }}>
            {steps.map((s, i) => (
              <PinnedCard key={s.title} s={s} i={i} n={n} progress={scrollYProgress} />
            ))}
          </motion.ol>
        </div>

        <div className="nx-container nx-pin__foot">
          <span className="nx-pin__count" aria-live="polite">
            <strong>{String(active + 1).padStart(2, "0")}</strong> / {String(n).padStart(2, "0")}
          </span>
          <span className="nx-pin__bar" aria-hidden="true">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </span>
          <span className="nx-pin__hint">Desliza</span>
        </div>
      </div>
    </section>
  );
}
