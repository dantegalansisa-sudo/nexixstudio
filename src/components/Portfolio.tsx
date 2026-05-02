import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';

const PROJECTS = [
  {
    name: 'Centro Odontológico Dimado',
    type: 'Clínica Dental',
    img: '/imagenes/dimado.png',
    url: 'https://www.dimadocentro.com/',
    desc: 'Web profesional para una de las clínicas dentales más reconocidas de la zona. Diseño limpio, sección de servicios, equipo médico y contacto directo por WhatsApp.',
  },
  {
    name: 'Elite Dental Care',
    type: 'Clínica Dental',
    img: '/imagenes/elitedental.png',
    url: 'https://www.elitedentalcarerd.com/',
    desc: 'Sitio premium para clínica dental enfocada en una experiencia visual moderna. Galería de tratamientos, perfil del equipo y formulario de citas.',
  },
  {
    name: 'El Panda Restaurante',
    type: 'Restaurante',
    img: '/imagenes/panda.png',
    url: 'https://www.elpandarestaurante.com/',
    desc: 'Web completa para restaurante con menú interactivo, sección de reservas y galería. Diseñada para abrir el apetito desde el primer scroll.',
  },
  {
    name: 'MYJ Travels',
    type: 'Agencia de Viajes',
    img: '/imagenes/myj travels.png',
    url: 'https://myjtravels.com/',
    desc: 'Plataforma para agencia de viajes con paquetes destacados, destinos populares y formulario de cotización. Diseño que vende experiencias.',
  },
  {
    name: 'Grupo Financiero MYJ',
    type: 'Financiera',
    img: '/imagenes/grupofinancieromyj.png',
    url: 'https://grupofinancieromyj.com/',
    desc: 'Sitio corporativo para empresa financiera. Servicios, requisitos, proceso de solicitud y enfoque profesional que transmite confianza inmediata.',
  },
  {
    name: 'Oliujs Inmobiliaria',
    type: 'Inmobiliaria',
    img: '/imagenes/inmobiliaria.png',
    url: 'https://oliujs-inmobiliaria.vercel.app',
    desc: 'Web inmobiliaria con catálogo de propiedades, filtros por tipo y ubicación, y sección de contacto directo con asesores.',
  },
];

interface Project {
  name: string;
  type: string;
  img: string;
  url: string;
  desc: string;
}

function StickyCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={targetRef} className="portfolio__card-stack-container">
      <motion.div
        className="portfolio__sticky-card"
        style={{
          scale,
          top: `calc(100px + ${index * 28}px)`,
        }}
      >
        <div className="portfolio__sticky-card-info">
          <span className="portfolio__sticky-card-num">{String(index + 1).padStart(2, '0')}</span>
          <span className="portfolio__sticky-card-type">{project.type}</span>
          <h3 className="portfolio__sticky-card-name">{project.name}</h3>
          <p className="portfolio__sticky-card-desc">{project.desc}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__sticky-card-link"
          >
            Ver Sitio Live
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio__sticky-card-image-wrapper"
        >
          <img
            src={project.img}
            alt={project.name}
            className="portfolio__sticky-card-image"
            loading="lazy"
          />
        </a>
      </motion.div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section className="portfolio" id="portafolio">
      <div className="container portfolio__header-wrapper">
        <div className="portfolio__header">
          <RevealText tag="h2" className="portfolio__title">
            Trabajo Que Habla Por Sí Solo
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
      </div>

      <div className="portfolio__stack">
        {PROJECTS.map((project, i) => (
          <StickyCard
            key={project.name}
            project={project}
            index={i}
            total={PROJECTS.length}
          />
        ))}
      </div>

      <div className="container">
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
