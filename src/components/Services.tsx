import { motion, useMotionValue, useTransform } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const },
  },
};

function TiltCard({ children, accent }: { children: React.ReactNode; accent: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="service-card"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        borderTopColor: accent,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  return (
    <section className="services" id="servicios">
      <div className="container">
        <div className="services__header">
          <RevealText tag="h2" className="services__title">
            Lo Que Construimos Para Ti
          </RevealText>
          <motion.p
            className="services__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Dos servicios. Un solo objetivo: que tu negocio domine su mercado.
          </motion.p>
        </div>

        <motion.div
          className="services__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <TiltCard accent="var(--primary)">
            <div className="service-card__icon service-card__icon--blue">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 21h8M12 17v4" />
                <path d="M7 8l3 3-3 3M13 14h4" />
              </svg>
            </div>
            <h3 className="service-card__title">Sitios Web de Alto Impacto</h3>
            <p className="service-card__desc">
              Dise&ntilde;amos y desarrollamos webs que no solo se ven incre&iacute;bles &mdash; convierten visitantes en clientes. Restaurantes, cl&iacute;nicas, negocios locales, tiendas online. Si lo imaginas, lo construimos.
            </p>
            <ul className="service-card__list">
              <li>&#10022; Landing pages &amp; sitios corporativos</li>
              <li>&#10022; E-commerce y tiendas online</li>
              <li>&#10022; Portafolios profesionales</li>
              <li>&#10022; SEO t&eacute;cnico incluido</li>
              <li>&#10022; Dominio + hosting configurado</li>
            </ul>
            <MagneticButton
              href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20mi%20web"
              className="btn-primary"
            >
              Empezar mi Web &rarr;
            </MagneticButton>
          </TiltCard>

          <TiltCard accent="var(--cyan)">
            <div className="service-card__icon service-card__icon--cyan">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a4 4 0 0 1 4 4c0 1.5-.8 2.8-2 3.5v1h-4v-1c-1.2-.7-2-2-2-3.5a4 4 0 0 1 4-4z" />
                <path d="M10 10.5v2M14 10.5v2" />
                <rect x="9" y="12.5" width="6" height="3" rx="1" />
                <path d="M10 15.5v1.5a2 2 0 0 0 4 0v-1.5" />
                <path d="M5 9.5C3.5 10.5 2 12 2 14c0 2.5 3 4 3 4M19 9.5c1.5 1 3 2.5 3 4.5 0 2.5-3 4-3 4" />
                <circle cx="7" cy="19" r="1" />
                <circle cx="17" cy="19" r="1" />
                <path d="M7 20v2M17 20v2" />
              </svg>
            </div>
            <h3 className="service-card__title">Automatizaci&oacute;n Inteligente con IA</h3>
            <p className="service-card__desc">
              Agentes de IA y flujos de trabajo autom&aacute;ticos que hacen en segundos lo que te toma horas. WhatsApp, correos, CRM, reservas &mdash; automatizados y corriendo 24/7 sin que t&uacute; hagas nada.
            </p>
            <ul className="service-card__list">
              <li>&#10022; Chatbots con IA para WhatsApp</li>
              <li>&#10022; Flujos de respuesta autom&aacute;tica</li>
              <li>&#10022; Agentes de ventas digitales</li>
              <li>&#10022; Integraci&oacute;n con CRMs y APIs</li>
              <li>&#10022; Notificaciones y reportes autom&aacute;ticos</li>
            </ul>
            <MagneticButton
              href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20automatizar%20mi%20negocio"
              className="btn-primary btn-primary--cyan"
            >
              Automatizar mi Negocio &rarr;
            </MagneticButton>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
