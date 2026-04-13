import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function CTA() {
  return (
    <section className="cta-final" id="contacto">
      <div className="cta-final__shapes">
        <motion.div
          className="cta-final__circle cta-final__circle--1"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="cta-final__circle cta-final__circle--2"
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="cta-final__line cta-final__line--1"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="container cta-final__content">
        <motion.h2
          className="cta-final__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          &iquest;Listo para que tu negocio<br />tenga la presencia digital que merece?
        </motion.h2>
        <motion.p
          className="cta-final__desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Hablemos hoy. Sin compromisos. Cu&eacute;ntanos tu idea y te decimos exactamente c&oacute;mo podemos ayudarte.
        </motion.p>
        <motion.div
          className="cta-final__buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <MagneticButton
            href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20información%20sobre%20sus%20servicios"
            className="btn-white"
          >
            WhatsApp &rarr; Chatear Ahora
          </MagneticButton>
          <MagneticButton
            href="https://instagram.com/nexixstudio"
            className="btn-white-outline"
          >
            Instagram @nexixstudio
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
