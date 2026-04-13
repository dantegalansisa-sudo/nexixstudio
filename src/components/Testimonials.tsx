import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from './RevealText';

const TESTIMONIALS = [
  {
    name: 'Edward Santana',
    business: 'Caf\u00e9 Man\u00e1, San Jos\u00e9 de Ocoa',
    quote: 'NEXIX entendi\u00f3 nuestra esencia desde el primer d\u00eda. La web de Caf\u00e9 Man\u00e1 refleja exactamente lo que somos. Nuestros clientes la aman.',
    initials: 'ES',
  },
  {
    name: 'Dr. Dimado',
    business: 'Centro Odontol\u00f3gico Dimado',
    quote: 'Desde que lanzamos la web hemos recibido m\u00e1s consultas por WhatsApp. El equipo de NEXIX fue profesional y muy \u00e1gil con los cambios.',
    initials: 'DD',
  },
  {
    name: 'Roosevelt M\u00e9ndez',
    business: 'NativeArt55 Artesan\u00eda',
    quote: 'Crearon algo hermoso que representa el trabajo artesanal dominicano con dignidad. Gracias NEXIX por elevar nuestra marca.',
    initials: 'RM',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? TESTIMONIALS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === TESTIMONIALS.length - 1 ? 0 : c + 1));

  return (
    <section className="testimonials" id="testimoniales">
      <div className="container">
        <RevealText tag="h2" className="testimonials__title">
          Lo Que Dicen Nuestros Clientes
        </RevealText>

        <div className="testimonials__slider">
          <button className="testimonials__arrow testimonials__arrow--prev" onClick={prev} aria-label="Anterior">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="testimonials__card-wrapper">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonials__card"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
              >
                <span className="testimonials__quote-mark">&ldquo;</span>
                <p className="testimonials__quote">{TESTIMONIALS[current].quote}</p>
                <div className="testimonials__author">
                  <div className="testimonials__avatar">
                    <span>{TESTIMONIALS[current].initials}</span>
                  </div>
                  <div>
                    <strong className="testimonials__name">{TESTIMONIALS[current].name}</strong>
                    <span className="testimonials__business">{TESTIMONIALS[current].business}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="testimonials__arrow testimonials__arrow--next" onClick={next} aria-label="Siguiente">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Testimonio ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
