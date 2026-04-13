import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from './RevealText';

const FAQS = [
  {
    q: '\u00bfCu\u00e1nto tiempo toma tener mi web lista?',
    a: 'Depende del tipo de proyecto. Una landing page puede estar lista en 5-7 d\u00edas. Un sitio multi-p\u00e1gina completo toma entre 2 y 4 semanas. Siempre ves el progreso en tiempo real.',
  },
  {
    q: '\u00bfIncluyen dominio y hosting?',
    a: 'S\u00ed. Configuramos tu dominio personalizado y el hosting por el primer a\u00f1o. Despu\u00e9s del primer a\u00f1o, el costo de renovaci\u00f3n es m\u00ednimo y te ayudamos con el proceso.',
  },
  {
    q: '\u00bfPuedo hacer cambios despu\u00e9s del lanzamiento?',
    a: 'Por supuesto. Todos nuestros planes incluyen soporte post-lanzamiento de 30 d\u00edas para ajustes. Despu\u00e9s de ese per\u00edodo, ofrecemos planes de mantenimiento accesibles.',
  },
  {
    q: '\u00bfQu\u00e9 pasa si no me gusta el dise\u00f1o?',
    a: 'Trabajamos contigo en cada etapa. Apruebas el concepto visual antes de que empecemos a desarrollar. Si algo no te convence, lo ajustamos sin costo adicional hasta que quedes satisfecho.',
  },
  {
    q: '\u00bfTrabajan con negocios fuera de Rep\u00fablica Dominicana?',
    a: 'S\u00ed. Atendemos clientes en RD y mercados internacionales, incluyendo Espa\u00f1a e Islas Canarias. Todo el proceso se maneja de forma remota por WhatsApp y videollamadas.',
  },
  {
    q: '\u00bfQu\u00e9 es la automatizaci\u00f3n con IA?',
    a: 'Son sistemas inteligentes que hacen trabajo repetitivo por ti: responder mensajes de WhatsApp, agendar citas, enviar correos, generar reportes. Funciona 24/7 sin que t\u00fa hagas nada.',
  },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: typeof FAQS[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`faq__item ${isOpen ? 'faq__item--open' : ''}`}>
      <button className="faq__question" onClick={onToggle} aria-expanded={isOpen}>
        <span>{faq.q}</span>
        <svg
          className={`faq__chevron ${isOpen ? 'faq__chevron--open' : ''}`}
          width="20" height="20" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq__answer-wrapper"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          >
            <p className="faq__answer">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="faq__header">
          <RevealText tag="h2" className="faq__title">
            Preguntas Frecuentes
          </RevealText>
          <motion.p
            className="faq__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Todo lo que necesitas saber antes de empezar.
          </motion.p>
        </div>

        <motion.div
          className="faq__list"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
