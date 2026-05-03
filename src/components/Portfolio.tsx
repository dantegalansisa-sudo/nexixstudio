import { motion } from 'framer-motion';
import RevealText from './RevealText';
import SectionLabel from './SectionLabel';
import MagneticButton from './MagneticButton';

interface Project {
  name: string;
  type: string;
  img: string;
  url: string;
}

interface Category {
  label: string;
  projects: Project[];
}

const CATEGORIES: Category[] = [
  {
    label: 'SALUD',
    projects: [
      {
        name: 'Centro Odontológico Dimado',
        type: 'Clínica Dental',
        img: '/imagenes/dimado.png',
        url: 'https://www.dimadocentro.com/',
      },
      {
        name: 'Elite Dental Care',
        type: 'Clínica Dental Premium',
        img: '/imagenes/elitedental.png',
        url: 'https://www.elitedentalcarerd.com/',
      },
    ],
  },
  {
    label: 'GASTRONOMIA & TURISMO',
    projects: [
      {
        name: 'El Panda Restaurante',
        type: 'Restaurante',
        img: '/imagenes/panda.png',
        url: 'https://www.elpandarestaurante.com/',
      },
      {
        name: 'MYJ Travels',
        type: 'Agencia de Viajes',
        img: '/imagenes/myj travels.png',
        url: 'https://myjtravels.com/',
      },
    ],
  },
  {
    label: 'SERVICIOS & FINANZAS',
    projects: [
      {
        name: 'Grupo Financiero MYJ',
        type: 'Empresa Financiera',
        img: '/imagenes/grupofinancieromyj.png',
        url: 'https://grupofinancieromyj.com/',
      },
      {
        name: 'Oliujs Inmobiliaria',
        type: 'Inmobiliaria',
        img: '/imagenes/inmobiliaria.png',
        url: 'https://oliujs-inmobiliaria.vercel.app',
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="portfolio-card"
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      <div className="portfolio-card__image-wrapper">
        <img
          src={project.img}
          alt={project.name}
          className="portfolio-card__image"
          loading="lazy"
        />
        <div className="portfolio-card__overlay">
          <span className="portfolio-card__overlay-link">
            VISITAR SITIO
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </span>
        </div>
      </div>
      <div className="portfolio-card__info">
        <span className="portfolio-card__type">{project.type}</span>
        <h3 className="portfolio-card__name">{project.name}</h3>
      </div>
    </motion.a>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio" id="portafolio">
      <div className="container">
        <div className="portfolio__header">
          <SectionLabel>PORTAFOLIO</SectionLabel>
          <RevealText tag="h2" className="portfolio__title">
            Trabajo Que Habla Por Sí Solo
          </RevealText>
          <motion.p
            className="portfolio__subtitle"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Proyectos reales para negocios reales &mdash; en Rep&uacute;blica Dominicana y m&aacute;s all&aacute;.
          </motion.p>
        </div>

        {CATEGORIES.map((category, idx) => (
          <div key={category.label} className="portfolio__category">
            <motion.div
              className="portfolio__category-header"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="portfolio__category-num">
                0{idx + 1}
              </span>
              <span className="portfolio__category-divider" />
              <span className="portfolio__category-label">{category.label}</span>
            </motion.div>

            <motion.div
              className="portfolio__category-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {category.projects.map((project) => (
                <ProjectCard key={project.name} project={project} />
              ))}
            </motion.div>
          </div>
        ))}

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
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton
            href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20que%20mi%20negocio%20sea%20el%20pr%C3%B3ximo"
            className="btn-primary btn-primary--glow"
          >
            &iquest;Tu negocio podr&iacute;a ser el pr&oacute;ximo? &rarr; Hablemos
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
