import { motion } from 'framer-motion';
import RevealText from './RevealText';

const SKILLS = [
  'Desarrollo Web',
  'React & TypeScript',
  'Automatizaci\u00f3n con IA',
  'Dise\u00f1o UI/UX',
  'SEO T\u00e9cnico',
  'Integraci\u00f3n de APIs',
];

export default function Team() {
  return (
    <section className="team" id="equipo">
      <div className="container">
        <div className="team__header">
          <RevealText tag="h2" className="team__title">
            Quien Esta Detras de NEXIX
          </RevealText>
          <motion.p
            className="team__subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Una sola persona. Toda la visi&oacute;n, la ejecuci&oacute;n y la obsesi&oacute;n por los detalles.
          </motion.p>
        </div>

        <motion.div
          className="team__founder"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }}
        >
          <div className="team__founder-avatar">
            <span>DG</span>
          </div>

          <div className="team__founder-info">
            <h3 className="team__founder-name">Dante Galan Sisa</h3>
            <span className="team__founder-role">Fundador &amp; CEO</span>
            <p className="team__founder-desc">
              Fundador y director de NEXIX Tech Studio. Lidera la visi&oacute;n de producto,
              la arquitectura t&eacute;cnica y la estrategia de crecimiento de la compa&ntilde;&iacute;a.
              Su enfoque combina ingenier&iacute;a de software con inteligencia artificial aplicada
              para construir soluciones digitales que generan impacto real en los negocios
              de sus clientes. Bajo su direcci&oacute;n, NEXIX ha escalado operaciones
              en Rep&uacute;blica Dominicana y mercados internacionales.
            </p>
            <div className="team__founder-skills">
              {SKILLS.map((skill) => (
                <span key={skill} className="team__founder-skill-tag">{skill}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
