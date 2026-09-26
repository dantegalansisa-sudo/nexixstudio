import { useRef, type CSSProperties } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { useCoverFrame } from "./useCoverFrame";
import { whatsappLink } from "../../lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;
const BG_RATIO = 2073 / 758;

const stroke = { stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className={className}>
      <path
        d="M16.01 2.667A13.28 13.28 0 0 0 2.72 15.947a13.2 13.2 0 0 0 1.8 6.667L2.667 29.333l6.96-1.827a13.28 13.28 0 0 0 6.36 1.627h.013A13.34 13.34 0 0 0 16.01 2.667Zm0 24.32a11.01 11.01 0 0 1-5.613-1.533l-.4-.24-4.16 1.093 1.107-4.053-.267-.413A11.01 11.01 0 1 1 16.01 26.987Zm6.04-8.24c-.333-.167-1.96-.967-2.267-1.08-.293-.107-.52-.167-.733.167-.213.333-.84 1.08-1.033 1.293-.187.213-.38.24-.707.08-.333-.167-1.4-.517-2.667-1.647-.987-.88-1.653-1.96-1.847-2.293-.187-.333-.02-.513.147-.68.147-.147.333-.387.493-.58.167-.187.22-.333.333-.547.107-.22.053-.407-.027-.573-.08-.167-.733-1.773-.987-2.427-.267-.64-.533-.56-.733-.56h-.627c-.213 0-.56.08-.853.387-.293.307-1.12 1.093-1.12 2.667s1.147 3.093 1.307 3.307c.16.213 2.253 3.44 5.467 4.827.76.333 1.36.527 1.827.68.767.24 1.467.207 2.02.127.613-.093 1.96-.8 2.24-1.573.28-.773.28-1.44.193-1.573-.08-.14-.293-.227-.627-.387Z"
        fill="currentColor"
      />
    </svg>
  );
}

const PERKS = [
  {
    title: "Respuesta rápida",
    text: "Te atendemos en menos de 24 horas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Asesoría personalizada",
    text: "Hablamos de tu idea y te damos una propuesta.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.5 0 2.2 1 4.1 2.7 5.5L5.5 20l4-1.7c.8.2 1.6.2 2.5.2 4.7 0 8.5-3.3 8.5-7.5S16.7 3.5 12 3.5Z" {...stroke} />
        <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" {...stroke} strokeWidth={2.6} />
      </svg>
    ),
  },
  {
    title: "Sin compromiso",
    text: "Explora tus opciones con total libertad.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" {...stroke} />
        <path d="m8.8 12 2.2 2.2 4.2-4.4" {...stroke} />
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

export default function ContactoNX() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduce = !!useReducedMotion();
  const frame = useCoverFrame(ref, BG_RATIO, 0.62, 1);

  const frameStyle = {
    width: frame.width,
    height: frame.height,
    left: frame.left,
    top: frame.top,
    "--fw": frame.width,
  } as CSSProperties;

  return (
    <section ref={ref} id="contacto" className="nx-contact">
      <picture className="nx-contact__bg" aria-hidden="true">
        <source media="(max-width: 900px)" srcSet="/images/cta-bg-900.webp" />
        <img src="/images/cta-bg.webp" alt="" loading="lazy" decoding="async" />
      </picture>

      {/* Glass WhatsApp tile standing on the pedestal of the photo */}
      <div className="nx-contact__frame" style={frameStyle} aria-hidden="true">
        <motion.div
          className="nx-wa-tile"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -60, rotate: -6 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.5 }}
        >
          <div className="nx-wa-tile__inner">
            <WhatsAppGlyph />
          </div>
        </motion.div>
        <motion.div
          className="nx-wa-bubble"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
        >
          <span className="nx-wa-bubble__dot" />
          <strong>¡Hablemos!</strong>
          <span>Estamos listos para ayudarte.</span>
          <svg viewBox="0 0 24 24" fill="none" className="nx-wa-bubble__send">
            <path d="M20.5 3.5 3.5 10.5l6.5 2.5 2.5 6.5 8-16Z" {...stroke} />
            <path d="m10 13 4.5-4.5" {...stroke} />
          </svg>
        </motion.div>
      </div>

      <div className="nx-container">
        <motion.div
          className="nx-contact__panel"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="nx-eyebrow nx-eyebrow--line">Construyamos juntos</p>
          <h2 className="nx-contact__title" aria-label="¿Listo para llevar tu negocio al siguiente nivel?">
            <span className="nx-mask" aria-hidden="true">
              <motion.span
                className="nx-mask__line"
                initial={reduce ? false : { y: "108%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
              >
                ¿Listo para llevar tu negocio
              </motion.span>
            </span>
            <span className="nx-mask" aria-hidden="true">
              <motion.span
                className="nx-mask__line nx-hero__line--blue"
                initial={reduce ? false : { y: "108%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1, delay: 0.32, ease: EASE }}
              >
                al siguiente nivel?
              </motion.span>
            </span>
          </h2>
          <p className="nx-contact__lead">
            Hablemos hoy sin compromiso. Cuéntanos tu idea y recibe una asesoría personalizada para
            encontrar la mejor solución para tu negocio.
          </p>

          <div className="nx-contact__ctas">
            <MagneticNX>
              <a
                href={whatsappLink("Hola, quiero llevar mi negocio al siguiente nivel con NEXIX")}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn nx-btn--blue nx-btn--lg"
              >
                <WhatsAppGlyph className="nx-btn__wa" />
                Hablemos por WhatsApp
                <Arrow />
              </a>
            </MagneticNX>
            <MagneticNX>
              <a
                href={whatsappLink("Hola, quiero agendar una llamada con NEXIX. ¿Qué días tienen disponibles?")}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn nx-btn--glass nx-btn--lg"
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="nx-btn__cal">
                  <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" {...stroke} />
                  <path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" {...stroke} />
                </svg>
                Agendar una llamada
              </a>
            </MagneticNX>
          </div>

          <motion.ul
            className="nx-contact__perks"
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
          >
            {PERKS.map((p) => (
              <motion.li
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <span className="nx-contact__perk-icon">{p.icon}</span>
                <span>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}
