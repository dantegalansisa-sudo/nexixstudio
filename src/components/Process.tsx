import { motion } from 'framer-motion';
import RevealText from './RevealText';

const STEPS = [
  { num: '01', icon: '\uD83D\uDCAC', title: 'Conversamos', desc: 'Entendemos tu negocio, tus metas y lo que necesitas. Sin tecnicismos.' },
  { num: '02', icon: '\uD83C\uDFA8', title: 'Dise\u00f1amos', desc: 'Creamos el concepto visual y la estructura. T\u00fa apruebas antes de continuar.' },
  { num: '03', icon: '\u26A1', title: 'Construimos', desc: 'Desarrollo \u00e1gil con actualizaciones constantes. Ves el progreso en tiempo real.' },
  { num: '04', icon: '\uD83D\uDE80', title: 'Lanzamos', desc: 'Entrega, dominio, hosting y soporte post-lanzamiento incluido.' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
};

export default function Process() {
  return (
    <section className="process" id="proceso">
      <div className="container">
        <div className="process__header">
          <RevealText tag="h2" className="process__title">
            Tu Proyecto, Paso a Paso
          </RevealText>
          <motion.p
            className="process__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Un proceso claro, sin sorpresas. Sabes exactamente qu&eacute; pasa y cu&aacute;ndo.
          </motion.p>
        </div>

        <motion.div
          className="process__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STEPS.map((step, i) => (
            <motion.div key={i} className="process__step" variants={stepVariants}>
              <span className="process__step-bg-num">{step.num}</span>
              <span className="process__step-icon">{step.icon}</span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-desc">{step.desc}</p>
              {i < STEPS.length - 1 && <div className="process__connector" />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
