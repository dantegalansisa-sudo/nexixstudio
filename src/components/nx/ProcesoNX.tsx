import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { useCoverFrame } from "./useCoverFrame";

const EASE = [0.22, 1, 0.36, 1] as const;
const BG_RATIO = 1672 / 941;

const stroke = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

type Step = {
  title: string;
  text: string;
  icon: ReactNode;
  /** Pedestal position in the background photo (% of the image): x = center, y = top surface */
  x: number;
  y: number;
  /** Icon tile color, as in the mockup */
  tone: "orange" | "lime" | "blue";
};

const STEPS: Step[] = [
  {
    title: "Conversamos",
    text: "Entendemos tu negocio, tus metas y lo que necesitas, sin tecnicismos.",
    x: 15.5,
    y: 65.4,
    tone: "orange",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.5 0 2.2 1 4.1 2.7 5.5L5.5 20l4-1.7c.8.2 1.6.2 2.5.2 4.7 0 8.5-3.3 8.5-7.5S16.7 3.5 12 3.5Z" {...stroke} />
        <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" {...stroke} strokeWidth={2.6} />
      </svg>
    ),
  },
  {
    title: "Diseñamos",
    text: "Creamos el concepto visual y la estructura. Tú revisas y das tus comentarios antes de continuar.",
    x: 39.7,
    y: 70.7,
    tone: "lime",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m14.5 5.5 4 4M4 20l1-4.5L16 4.5a2.1 2.1 0 0 1 3 3L8 18.5 4 20Z" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Construimos",
    text: "Desarrollo ágil con actualizaciones constantes. Puedes ver el progreso en tiempo real.",
    x: 62.3,
    y: 73.3,
    tone: "blue",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Lanzamos",
    text: "Entrega, dominio, hosting y soporte post lanzamiento incluido.",
    x: 86.4,
    y: 69.6,
    tone: "orange",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 15.5 8.5 11c1.6-4.4 5.2-7.3 11-7.5-.2 5.8-3.1 9.4-7.5 11Z" {...stroke} />
        <path d="M8.5 11 5 10.5l2.5-3.5 4 .5M13 15.5l.5 3.5 3.5-2.5-.5-4M7 17c-1 .5-2 2-2 2s1.5-1 2-2Z" {...stroke} />
        <circle cx="15" cy="9" r="1.3" {...stroke} />
      </svg>
    ),
  },
];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProcesoNX() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = !!useReducedMotion();
  const frame = useCoverFrame(ref, BG_RATIO, 0.5, 0, "width");

  const frameStyle = {
    width: frame.width,
    height: frame.height,
    left: frame.left,
    top: frame.top,
    "--fw": frame.width,
  } as CSSProperties;

  function goToContact(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("contacto");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section ref={ref} id="proceso" className="nx-process">
      <picture className="nx-process__bg" aria-hidden="true">
        <source media="(max-width: 1100px)" srcSet="/images/proceso-bg-900.webp" />
        <img src="/images/proceso-bg.webp" alt="" loading="lazy" decoding="async" width="1672" height="941" />
      </picture>
      <div className="nx-process__veil" aria-hidden="true" />

      <div className="nx-container nx-process__head">
        <motion.p
          className="nx-eyebrow nx-eyebrow--lines"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Nuestro proceso
        </motion.p>
        <h2 className="nx-process__title" aria-label="Un proceso claro, sin sorpresas">
          <span className="nx-mask" aria-hidden="true">
            <motion.span
              className="nx-mask__line"
              initial={reduce ? false : { y: "108%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
            >
              Un proceso claro,
            </motion.span>
          </span>
          <span className="nx-mask" aria-hidden="true">
            <motion.span
              className="nx-mask__line nx-line--orange"
              initial={reduce ? false : { y: "108%" }}
              animate={inView ? { y: "0%" } : undefined}
              transition={{ duration: 1, delay: 0.22, ease: EASE }}
            >
              sin sorpresas
            </motion.span>
          </span>
        </h2>
        <motion.p
          className="nx-process__lead"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
        >
          Te acompañamos en cada etapa, con comunicación constante y total transparencia, para que
          sepas exactamente qué pasa y cuándo.
        </motion.p>
      </div>

      {/* On desktop the steps sit on the pedestals of the photo; below 1100px they stack */}
      <div className="nx-process__frame" style={frameStyle}>
        <ol className="nx-steps">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              className={`nx-step nx-step--${s.tone}`}
              style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--float-delay": `${i * -1.4}s` } as CSSProperties}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -40 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.45 + i * 0.15, ease: EASE }}
            >
              <div className="nx-step__card">
                <span className="nx-step__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="nx-step__icon">{s.icon}</span>
                <h3 className="nx-step__title">{s.title}</h3>
                <p className="nx-step__text">{s.text}</p>
                <MagneticNX className="nx-step__cta-wrap" strength={0.35}>
                  <a href="#contacto" onClick={goToContact} className="nx-step__cta" aria-label={`${s.title}: empecemos tu proyecto`}>
                    <Arrow />
                  </a>
                </MagneticNX>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

    </section>
  );
}
