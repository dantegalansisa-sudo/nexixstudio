import { motion } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';

const PLANS = [
  {
    name: 'Starter',
    price: 'Desde $300',
    desc: 'Para negocios que necesitan presencia digital ya.',
    features: [
      'Landing page de 1-3 secciones',
      'Dise\u00f1o responsive',
      'Formulario de contacto / WhatsApp',
      'Dominio + hosting por 1 a\u00f1o',
      'Entrega en 5-7 d\u00edas',
    ],
    cta: 'Empezar con Starter',
    accent: 'light',
    popular: false,
  },
  {
    name: 'Premium',
    price: 'Desde $600',
    desc: 'La web completa que tu negocio merece. La m\u00e1s elegida.',
    features: [
      'Web multi-p\u00e1gina (hasta 8 secciones)',
      'Animaciones y micro-interacciones',
      'SEO t\u00e9cnico avanzado',
      'Panel admin / CMS si aplica',
      'Integraci\u00f3n Google Analytics',
      'Soporte 30 d\u00edas post-lanzamiento',
    ],
    cta: 'Elegir Premium',
    accent: 'primary',
    popular: true,
  },
  {
    name: 'Automatizaci\u00f3n IA',
    price: 'Desde $400',
    desc: 'Pon tu negocio en piloto autom\u00e1tico con IA.',
    features: [
      'Chatbot IA para WhatsApp',
      'Flujos de respuesta autom\u00e1tica',
      'Integraci\u00f3n con CRM / APIs',
      'Agente de ventas digital',
      'Dashboard de m\u00e9tricas',
      'Soporte y ajustes 30 d\u00edas',
    ],
    cta: 'Automatizar Ahora',
    accent: 'cyan',
    popular: false,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const } },
};

export default function Pricing() {
  return (
    <section className="pricing" id="planes">
      <div className="container">
        <div className="pricing__header">
          <RevealText tag="h2" className="pricing__title">
            Planes Que Se Adaptan a Tu Negocio
          </RevealText>
          <motion.p
            className="pricing__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Sin sorpresas. Sabes lo que obtienes desde el d&iacute;a uno.
          </motion.p>
        </div>

        <motion.div
          className="pricing__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''} pricing-card--${plan.accent}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
            >
              {plan.popular && <span className="pricing-card__badge">M&aacute;s elegido</span>}
              <h3 className="pricing-card__name">{plan.name}</h3>
              <div className="pricing-card__price">{plan.price}</div>
              <p className="pricing-card__desc">{plan.desc}</p>
              <ul className="pricing-card__features">
                {plan.features.map((f) => (
                  <li key={f}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <MagneticButton
                href={`https://wa.me/18295234738?text=Hola%20NEXIX%2C%20me%20interesa%20el%20plan%20${encodeURIComponent(plan.name)}`}
                className={`pricing-card__cta pricing-card__cta--${plan.accent}`}
              >
                {plan.cta} &rarr;
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="pricing__note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          &iquest;Necesitas algo personalizado? Escr&iacute;benos y armamos un plan a tu medida.
        </motion.p>
      </div>
    </section>
  );
}
