import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { whatsappLink } from "../../lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

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

const TOPICS = [
  {
    title: "Sitio web profesional",
    text: "Tu negocio con una presencia digital moderna y efectiva.",
    service: "Página web",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12.5" rx="1.6" {...stroke} />
        <path d="M9 20h6M12 16.5V20" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Automatización",
    text: "Ahorra tiempo y enfócate en lo importante.",
    service: "Automatización de procesos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" {...stroke} />
        <path d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.5 5.5l-1.7 1.7M7.2 16.8l-1.7 1.7M18.5 18.5l-1.7-1.7M7.2 7.2 5.5 5.5" {...stroke} />
        <circle cx="12" cy="12" r="6.5" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Soluciones a medida",
    text: "Herramientas ajustadas a las necesidades de tu negocio.",
    service: "Soluciones digitales a la medida",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="12" width="4" height="8" rx="1" {...stroke} />
        <rect x="10" y="8" width="4" height="12" rx="1" {...stroke} />
        <rect x="16" y="4" width="4" height="16" rx="1" {...stroke} />
      </svg>
    ),
  },
  {
    title: "Asesoría y estrategia",
    text: "Te ayudamos a definir el mejor camino para tu proyecto.",
    service: "Consultoría tecnológica",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="3.5" {...stroke} />
        <path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5M15.5 5a3.5 3.5 0 0 1 0 6.5M18 14.8c1.6.8 2.6 2.4 3 4.7" {...stroke} />
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
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = !!useReducedMotion();

  return (
    <section ref={ref} id="contacto" className="nx-contact">
      <div className="nx-container nx-contact__grid">
        <div className="nx-contact__main">
          <motion.p
            className="nx-eyebrow nx-eyebrow--line"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Empecemos tu proyecto
          </motion.p>
          <h2 className="nx-contact__title" aria-label="¿Listo para llevar tu negocio al siguiente nivel?">
            <span className="nx-mask" aria-hidden="true">
              <motion.span
                className="nx-mask__line"
                initial={reduce ? false : { y: "108%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1, delay: 0.1, ease: EASE }}
              >
                ¿Listo para llevar
              </motion.span>
            </span>
            <span className="nx-mask" aria-hidden="true">
              <motion.span
                className="nx-mask__line"
                initial={reduce ? false : { y: "108%" }}
                animate={inView ? { y: "0%" } : undefined}
                transition={{ duration: 1, delay: 0.22, ease: EASE }}
              >
                <span className="nx-hero__line--blue">tu negocio</span> al siguiente nivel?
              </motion.span>
            </span>
          </h2>
          <motion.p
            className="nx-contact__lead"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Cuéntanos tu idea y recibe una asesoría personalizada, sin compromiso. Estamos aquí para
            ayudarte a convertir tus ideas en resultados.
          </motion.p>

          <motion.div
            className="nx-contact__ctas"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
          >
            <MagneticNX>
              <a
                href={whatsappLink("Hola, quiero llevar mi negocio al siguiente nivel con NEXIX")}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn nx-btn--whatsapp nx-btn--lg"
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
                  <path d="M3.5 10h17M8 3v4M16 3v4M9 15l2 2 4-4" {...stroke} />
                </svg>
                Agendar una llamada
              </a>
            </MagneticNX>
          </motion.div>

          <motion.ul
            className="nx-contact__perks"
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
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
        </div>

        <motion.div
          className="nx-topics"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          <p className="nx-eyebrow nx-eyebrow--line nx-topics__label">¿Sobre qué podemos hablar?</p>
          <ul className="nx-topics__grid">
            {TOPICS.map((t, i) => (
              <motion.li
                key={t.title}
                initial={{ opacity: 0, y: 18 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.7, delay: 0.35 + i * 0.08, ease: EASE }}
              >
                <a
                  className="nx-topic"
                  href={whatsappLink(`Hola, me interesa el servicio de ${t.service}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="nx-topic__icon">{t.icon}</span>
                  <strong>{t.title}</strong>
                  <span>{t.text}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
