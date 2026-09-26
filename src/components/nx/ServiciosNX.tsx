import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion, type PanInfo } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { SERVICES, servicePath, type Service } from "../../data/services";

const EASE = [0.22, 1, 0.36, 1] as const;

const N = SERVICES.length;
const START = 2;

function Arrow({ dir = "right" }: { dir?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}>
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Signed circular distance from the active card, in the range -2..2 */
function offsetOf(i: number, active: number) {
  let d = (i - active) % N;
  if (d > N / 2) d -= N;
  if (d < -N / 2) d += N;
  return d;
}

function useIsDesktop() {
  const query = "(min-width: 1025px)";
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return match;
}

function ServiceCard({
  s,
  active,
  onActivate,
}: {
  s: Service;
  active: boolean;
  onActivate?: () => void;
}) {
  return (
    <article
      className={`nx-scard ${active ? "is-active" : ""} ${s.accent ? "is-accent" : ""}`}
      onClick={active ? undefined : onActivate}
    >
      <div className="nx-scard__media">
        <img src={s.image} alt="" loading="lazy" decoding="async" width="1200" height="800" style={{ "--zoom": s.crop.zoom, transformOrigin: `${s.crop.x}% ${s.crop.y}%` } as React.CSSProperties} />
      </div>
      <div className="nx-scard__body">
        <span className="nx-scard__icon">{s.icon}</span>
        <h3 className="nx-scard__title">
          {s.title[0]}
          <br />
          {s.title[1]}
        </h3>
        <p className="nx-scard__text">{s.description}</p>
        <div className="nx-scard__footer">
          <MagneticNX strength={0.3}>
            <Link
              className="nx-scard__cta"
              to={servicePath(s)}
              tabIndex={active ? 0 : -1}
              aria-label={`Conoce más sobre ${s.service}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="nx-scard__cta-label">Conoce más</span>
              <span className="nx-scard__cta-circle">
                <Arrow />
              </span>
            </Link>
          </MagneticNX>
        </div>
      </div>
    </article>
  );
}

function Coverflow({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const [active, setActive] = useState(START);
  const [revealed, setRevealed] = useState(false);
  const [cardW, setCardW] = useState(400);

  useEffect(() => {
    const size = () => setCardW(Math.round(Math.min(400, Math.max(320, window.innerWidth * 0.25))));
    size();
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  useEffect(() => {
    if (!inView || revealed) return;
    const t = window.setTimeout(() => setRevealed(true), 1100);
    return () => window.clearTimeout(t);
  }, [inView, revealed]);

  const go = (dir: number) => setActive((a) => (a + dir + N) % N);

  function onPanEnd(_: unknown, info: PanInfo) {
    if (Math.abs(info.offset.x) < 50) return;
    go(info.offset.x < 0 ? 1 : -1);
  }

  function pose(off: number) {
    const a = Math.abs(off);
    const x = off === 0 ? 0 : Math.sign(off) * (a === 1 ? cardW * 0.98 : cardW * 1.58);
    return {
      x,
      scale: a === 0 ? 1 : a === 1 ? 0.87 : 0.74,
      rotateY: off * 13,
      opacity: a === 2 ? 0.82 : 1,
      zIndex: 10 - a,
    };
  }

  return (
    <>
      <div className="nx-services__controls">
        <MagneticNX strength={0.3}>
          <button type="button" className="nx-round-btn" onClick={() => go(-1)} aria-label="Servicio anterior">
            <Arrow dir="left" />
          </button>
        </MagneticNX>
        <MagneticNX strength={0.3}>
          <button type="button" className="nx-round-btn nx-round-btn--primary" onClick={() => go(1)} aria-label="Siguiente servicio">
            <Arrow />
          </button>
        </MagneticNX>
      </div>

      <motion.div
        className="nx-cover"
        style={{ height: cardW * 1.36 + 60, "--card-w": `${cardW}px` } as React.CSSProperties}
        onPanEnd={onPanEnd}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Servicios"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
      >
        {SERVICES.map((s, i) => {
          const off = offsetOf(i, active);
          const p = pose(off);
          const hidden = !inView;
          return (
            <motion.div
              key={s.key}
              className="nx-cover__slot"
              style={{ zIndex: p.zIndex }}
              initial={false}
              animate={{
                x: p.x,
                scale: p.scale,
                rotateY: p.rotateY,
                opacity: hidden ? 0 : p.opacity,
                y: hidden && !reduce ? 90 : 0,
              }}
              transition={
                revealed
                  ? { duration: 0.75, ease: EASE }
                  : { duration: 1, ease: EASE, delay: 0.15 + Math.abs(off) * 0.12 }
              }
              aria-hidden={off !== 0}
            >
              <ServiceCard s={s} active={off === 0} onActivate={() => setActive(i)} />
            </motion.div>
          );
        })}
      </motion.div>

      <div className="nx-dots" role="tablist" aria-label="Elegir servicio">
        {SERVICES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.service}
            className={`nx-dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </>
  );
}

function SnapRow({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(START);

  // Start centered on the featured card
  useEffect(() => {
    const row = rowRef.current;
    const card = row?.children[START] as HTMLElement | undefined;
    if (row && card) row.scrollLeft = card.offsetLeft - (row.clientWidth - card.clientWidth) / 2;
  }, []);

  function onScroll() {
    const row = rowRef.current;
    if (!row) return;
    const center = row.scrollLeft + row.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(row.children).forEach((c, i) => {
      const el = c as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }

  function scrollToCard(i: number) {
    const row = rowRef.current;
    const card = row?.children[i] as HTMLElement | undefined;
    if (!row || !card) return;
    row.scrollTo({ left: card.offsetLeft - (row.clientWidth - card.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <>
      <div ref={rowRef} className="nx-snap" onScroll={onScroll}>
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.key}
            className="nx-snap__item"
            initial={false}
            animate={{ opacity: inView ? 1 : 0, y: inView || reduce ? 0 : 60 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 + Math.abs(i - START) * 0.1 }}
          >
            <ServiceCard s={s} active onActivate={() => scrollToCard(i)} />
          </motion.div>
        ))}
      </div>
      <div className="nx-dots" role="tablist" aria-label="Elegir servicio">
        {SERVICES.map((s, i) => (
          <button
            key={s.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={s.service}
            className={`nx-dot ${i === active ? "is-active" : ""}`}
            onClick={() => scrollToCard(i)}
          />
        ))}
      </div>
    </>
  );
}

export default function ServiciosNX() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = !!useReducedMotion();
  const isDesktop = useIsDesktop();

  const lines = [
    { text: "Soluciones digitales", tone: "ink" },
    { text: "para hacer crecer tu negocio", tone: "blue" },
  ];

  return (
    <section ref={ref} id="servicios" className="nx-services">
      <div className="nx-services__bg" aria-hidden="true" />
      <div className="nx-container nx-services__head">
        <motion.span
          className="nx-pill"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span className="nx-pill__dot" />
          Servicios
        </motion.span>

        <h2 className="nx-services__title" aria-label="Soluciones digitales para hacer crecer tu negocio">
          {lines.map((l, i) => (
            <span key={l.text} className="nx-mask" aria-hidden="true">
              <motion.span
                className={`nx-mask__line nx-hero__line--${l.tone}`}
                initial={reduce ? false : { y: "108%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                {l.text}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          className="nx-services__lead"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          Combinamos diseño, tecnología y automatización para crear soluciones a la medida de tus
          objetivos.
        </motion.p>
      </div>

      <div className="nx-container nx-services__stage">
        {isDesktop ? <Coverflow inView={inView} reduce={reduce} /> : <SnapRow inView={inView} reduce={reduce} />}
      </div>
    </section>
  );
}
