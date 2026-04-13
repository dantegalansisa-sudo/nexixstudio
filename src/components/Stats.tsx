import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedCounter from './AnimatedCounter';

const STATS = [
  { number: 15, suffix: '+', label: 'Proyectos Entregados' },
  { number: 2, suffix: '', label: 'Pa\u00edses Atendidos' },
  { number: 100, suffix: '%', label: 'Clientes Satisfechos' },
  { number: 24, suffix: 'h', label: 'Tiempo de Respuesta' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="stats" ref={ref}>
      <div className="container">
        <div className="stats__grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stats__item">
              <div className="stats__number">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="stats__label">{stat.label}</div>
            </div>
          ))}
        </div>
        <motion.div
          className="stats__progress-bar"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
    </section>
  );
}
