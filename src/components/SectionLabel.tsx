import { motion } from 'framer-motion';

interface SectionLabelProps {
  children: string;
  delay?: number;
  className?: string;
}

const PREMIUM_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * AIS-style section label: "— ABOUT US"
 * Used at top of every major section for cinematic structure.
 */
export default function SectionLabel({ children, delay = 0, className = '' }: SectionLabelProps) {
  return (
    <motion.div
      className={`section-label ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.6, delay, ease: PREMIUM_EASE }}
    >
      <span className="section-label__dash" />
      <span className="section-label__text">{children}</span>
    </motion.div>
  );
}
