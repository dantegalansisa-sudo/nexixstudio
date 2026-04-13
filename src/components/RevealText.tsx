import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

const PREMIUM_EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function RevealText({
  children,
  className = '',
  delay = 0,
  tag: Tag = 'h1',
}: RevealTextProps) {
  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return <Tag className={className}>{children}</Tag>;
  }

  const words = text.split(' ');

  return (
    <Tag className={className} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', rotate: 2 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.07,
              ease: PREMIUM_EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
