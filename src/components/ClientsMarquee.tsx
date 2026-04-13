import { motion } from 'framer-motion';

const CLIENTS = [
  'Centro Odontol\u00f3gico Dimado',
  'Elite Dental Care',
  'El Panda Restaurante',
  'MYJ Travels',
  'Grupo Financiero MYJ',
  'Oliujs Inmobiliaria',
  'Hotel Montemar',
  'Caf\u00e9 Man\u00e1',
  'NativeArt55',
  'Mentol Motors',
];

export default function ClientsMarquee() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="marquee-section">
      <motion.p
        className="marquee-section__label"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Negocios que conf&iacute;an en NEXIX
      </motion.p>
      <div className="marquee">
        <div className="marquee__track">
          {doubled.map((client, i) => (
            <span key={i} className="marquee__item">
              {client}
              <span className="marquee__dot">&bull;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
