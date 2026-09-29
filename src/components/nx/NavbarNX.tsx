import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { whatsappLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/analytics";

const links = [
  { to: "/", label: "Inicio", section: "inicio" },
  { to: "/#servicios", label: "Servicios", section: "servicios" },
  { to: "/#portafolio", label: "Portafolio", section: "portafolio" },
  { to: "/#proceso", label: "Proceso", section: "proceso" },
  { to: "/#preguntas", label: "Preguntas", section: "preguntas" },
  { to: "/#contacto", label: "Contacto", section: "contacto" },
];

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function NavbarNX() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the home section currently in view
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = ["inicio", "servicios", "portafolio", "proceso", "preguntas", "contacto"];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveSection(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    const t = window.setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }, 400);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  function isActive(l: (typeof links)[number]) {
    if (l.section === "servicios" && pathname.startsWith("/servicios/")) return true;
    if (l.section) return pathname === "/" && activeSection === l.section;
    return pathname === l.to;
  }

  return (
    <>
      <header className={`nx-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nx-container nx-nav__inner">
          <Link to="/" className="nx-nav__logo" aria-label="NEXIX Studio — Inicio">
            <img src="/images/logo-nx.webp" alt="" width="46" height="33" />
            <span>NEXIX</span>
          </Link>

          <nav className="nx-nav__links" aria-label="Principal">
            {links.map((l) => (
              <Link key={l.label} to={l.to} className={`nx-nav__link ${isActive(l) ? "is-active" : ""}`}>
                {l.label}
                {isActive(l) && (
                  <motion.span
                    layoutId="nx-nav-underline"
                    className="nx-nav__underline"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <MagneticNX className="nx-nav__cta-wrap" strength={0.25}>
            <a href={whatsappLink("Hola, quiero hablar sobre un proyecto con NEXIX")} onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn--dark nx-btn--sm">
              Hablemos
              <ArrowRight />
            </a>
          </MagneticNX>

          <button
            type="button"
            className={`nx-nav__burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nx-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="nx-menu__links" aria-label="Menú móvil">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={l.to} onClick={() => setOpen(false)} className={isActive(l) ? "is-active" : ""}>
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <a href={whatsappLink("Hola, quiero hablar sobre un proyecto con NEXIX")} onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn--dark">
              Hablemos por WhatsApp
              <ArrowRight />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
