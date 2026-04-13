import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';

const PROJECTS = [
  { name: 'Centro Odontol\u00f3gico Dimado', type: 'Cl\u00ednica Dental', category: 'clinicas', img: '/imagenes/dimado.png', url: 'https://www.dimadocentro.com/' },
  { name: 'Elite Dental Care', type: 'Cl\u00ednica Dental', category: 'clinicas', img: '/imagenes/elitedental.png', url: 'https://www.elitedentalcarerd.com/' },
  { name: 'El Panda Restaurante', type: 'Restaurante', category: 'restaurantes', img: '/imagenes/panda.png', url: 'https://www.elpandarestaurante.com/' },
  { name: 'MYJ Travels', type: 'Agencia de Viajes', category: 'servicios', img: '/imagenes/myj travels.png', url: 'https://myjtravels.com/' },
  { name: 'Grupo Financiero MYJ', type: 'Financiera', category: 'servicios', img: '/imagenes/grupofinancieromyj.png', url: 'https://grupofinancieromyj.com/' },
  { name: 'Oliujs Inmobiliaria', type: 'Inmobiliaria', category: 'servicios', img: '/imagenes/inmobiliaria.png', url: 'https://oliujs-inmobiliaria.vercel.app' },
];

const FILTERS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Cl\u00ednicas', value: 'clinicas' },
  { label: 'Restaurantes', value: 'restaurantes' },
  { label: 'Servicios', value: 'servicios' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const } },
};

export default function Portfolio() {
  const [filter, setFilter] = useState('todos');
  const filtered = filter === 'todos' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section className="portfolio" id="portafolio">
      <div className="container">
        <div className="portfolio__header">
          <RevealText tag="h2" className="portfolio__title">
            Trabajo Que Habla Por S\u00ed Solo
          </RevealText>
          <motion.p
            className="portfolio__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Proyectos reales para negocios reales &mdash; en Rep&uacute;blica Dominicana y m&aacute;s all&aacute;.
          </motion.p>
        </div>

        <motion.div
          className="portfolio__filters"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {FILTERS.map((f) => (
            <button
              key={f.value}
              className={`portfolio__filter-chip ${filter === f.value ? 'portfolio__filter-chip--active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="portfolio__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.a
                key={project.name}
                className="portfolio__card"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <img src={project.img} alt={project.name} className="portfolio__card-img" loading="lazy" />
                <div className="portfolio__card-overlay">
                  <span className="portfolio__card-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="portfolio__card-name">{project.name}</h3>
                  <span className="portfolio__card-type">{project.type}</span>
                  <span className="portfolio__card-link">Ver Proyecto &rarr;</span>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="portfolio__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          &hellip; entre otros proyectos entregados para negocios en RD y el exterior.
        </motion.p>

        <motion.div
          className="portfolio__cta"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton
            href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20que%20mi%20negocio%20sea%20el%20pr%C3%B3ximo"
            className="btn-primary"
          >
            &iquest;Tu negocio podr&iacute;a ser el pr&oacute;ximo? &rarr; Hablemos
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
