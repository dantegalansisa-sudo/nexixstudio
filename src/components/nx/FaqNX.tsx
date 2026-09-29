import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { whatsappLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/analytics";

const EASE = [0.22, 1, 0.36, 1] as const;

const FAQS = [
  {
    q: "¿Cuánto tiempo toma terminar mi página web?",
    a: "Depende del tipo de proyecto, pero en la mayoría de los casos entregamos páginas web en un plazo de 2 a 4 semanas. Desde el inicio te damos un cronograma claro para que sepas exactamente qué esperar.",
  },
  {
    q: "¿Qué incluye el dominio y hosting?",
    a: "Nos encargamos de todo: registro de tu dominio, hosting rápido y seguro con certificado SSL, y la configuración inicial. Antes de empezar te explicamos qué incluye tu plan y cuándo se renueva.",
  },
  {
    q: "¿Puedo hacer cambios después del lanzamiento?",
    a: "Sí. Puedes pedirnos ajustes de textos, imágenes o precios cuando lo necesites. Si quieres agregar nuevas secciones o funciones, te damos una cotización clara antes de hacer cualquier cambio.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Antes de programar te mostramos el concepto visual y hacemos rondas de revisión contigo. No avanzamos a la siguiente etapa hasta que el diseño te convenza.",
  },
  {
    q: "¿Trabajan con negocios fuera de República Dominicana?",
    a: "Sí. Trabajamos de forma remota con clientes en otros países. Todo el proceso se coordina por WhatsApp, videollamada y correo, igual que con clientes locales.",
  },
  {
    q: "¿Qué es la automatización con IA?",
    a: "Es usar inteligencia artificial para que las tareas repetitivas se hagan solas: responder mensajes de WhatsApp, agendar citas, dar seguimiento a clientes o generar reportes. Así ahorras tiempo y no pierdes ventas.",
  },
  {
    q: "¿Ofrecen soporte técnico?",
    a: "Sí. Después del lanzamiento te acompañamos para resolver dudas, corregir errores y mantener tu web funcionando. Si necesitas acompañamiento continuo, acordamos un plan de mantenimiento a tu medida.",
  },
];

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5c-4.7 0-8.5 3.3-8.5 7.5 0 2.2 1 4.1 2.7 5.5L5.5 20l4-1.7c.8.2 1.6.2 2.5.2 4.7 0 8.5-3.3 8.5-7.5S16.7 3.5 12 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

export default function FaqNX() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = !!useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  const titleLines = [
    { text: "Todo lo que", tone: "ink" },
    { text: "necesitas saber", tone: "orange" },
    { text: "antes de empezar", tone: "ink" },
  ];

  return (
    <section ref={ref} id="preguntas" className="nx-faq">
      <picture className="nx-faq__bg" aria-hidden="true">
        <source media="(max-width: 900px)" srcSet="/images/faq-bg-900.webp" />
        <img src="/images/faq-bg.webp" alt="" loading="lazy" decoding="async" width="1672" height="941" />
      </picture>
      <div className="nx-faq__veil" aria-hidden="true" />

      <div className="nx-container nx-faq__grid">
        <div className="nx-faq__intro">
          <motion.p
            className="nx-eyebrow nx-eyebrow--line"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Preguntas frecuentes
          </motion.p>
          <h2 className="nx-faq__title" aria-label="Todo lo que necesitas saber antes de empezar">
            {titleLines.map((l, i) => (
              <span key={l.text} className="nx-mask" aria-hidden="true">
                <motion.span
                  className={`nx-mask__line ${l.tone === "orange" ? "nx-line--orange" : ""}`}
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
            className="nx-faq__lead"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            Respondemos las preguntas más comunes para que tengas total claridad y confianza en cada
            paso del proceso.
          </motion.p>

          <motion.div
            className="nx-faq__help"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <span className="nx-faq__help-icon">
              <ChatIcon />
            </span>
            <div>
              <p className="nx-faq__help-title">¿No encuentras tu pregunta?</p>
              <p className="nx-faq__help-text">Escríbenos y con gusto te ayudamos.</p>
              <MagneticNX strength={0.2}>
                <a
                  className="nx-faq__help-link"
                  href={whatsappLink("Hola, tengo una pregunta sobre sus servicios")} onClick={trackWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar ahora
                  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </MagneticNX>
            </div>
          </motion.div>
        </div>

        <ul className="nx-accordion">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <motion.li
                key={f.q}
                className={`nx-acc ${isOpen ? "is-open" : ""}`}
                initial={{ opacity: 0, x: reduce ? 0 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.07, ease: EASE }}
              >
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    className="nx-acc__btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className="nx-acc__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="nx-acc__q">{f.q}</span>
                    <span className="nx-acc__toggle" aria-hidden="true">
                      <svg viewBox="0 0 20 20" fill="none">
                        <path d="M4.5 10h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path className="nx-acc__plus" d="M10 4.5v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="nx-acc__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
