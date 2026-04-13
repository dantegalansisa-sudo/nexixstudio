import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Portafolio', href: '#portafolio' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a href="#" className="navbar__logo">
        <span className="navbar__logo-name">NEXIX</span>
        <span className="navbar__logo-sub">Tech Studio</span>
      </a>

      <div className="navbar__links">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="navbar__link">
            {link.label}
          </a>
        ))}
      </div>

      <div className="navbar__cta-wrapper">
        <MagneticButton
          href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20iniciar%20un%20proyecto"
          className="navbar__cta"
        >
          Iniciar Proyecto &rarr;
        </MagneticButton>
      </div>

      <div
        className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        role="button"
        tabIndex={0}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="navbar__mobile-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
            />
            <motion.div
              className="navbar__mobile-panel navbar__mobile-panel--open"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ right: 0 }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={closeMobile}
                >
                  {link.label}
                </a>
              ))}
              <MagneticButton
                href="https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20iniciar%20un%20proyecto"
                className="btn-primary"
              >
                Iniciar Proyecto &rarr;
              </MagneticButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
