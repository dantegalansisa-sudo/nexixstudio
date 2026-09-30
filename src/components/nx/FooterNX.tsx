import { Link } from "react-router-dom";
import MagneticNX from "./MagneticNX";
import { whatsappLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/analytics";
import { WhatsAppGlyph } from "./ContactoNX";
import { SERVICES, servicePath } from "../../data/services";
import { MOBILE_QUERY, useMediaQuery } from "../../hooks/useMediaQuery";

// Footer lists services in order of importance
const FOOTER_SERVICES = ["web", "automatizacion", "medida", "estrategia", "consultoria"].map(
  (k) => SERVICES.find((s) => s.key === k)!
);

const NAV = [
  { to: "/#servicios", label: "Servicios" },
  { to: "/#portafolio", label: "Portafolio" },
  { to: "/#proceso", label: "Proceso" },
  { to: "/#preguntas", label: "Preguntas frecuentes" },
  { to: "/#contacto", label: "Contacto" },
];


export default function FooterNX() {
  const year = new Date().getFullYear();
  // On phones the link lists collapse into accordions to keep the footer short
  const isPhone = useMediaQuery(MOBILE_QUERY);

  return (
    <footer className="nx-footer">
      <div className="nx-footer__glow" aria-hidden="true" />
      <div className="nx-container">
        <div className="nx-footer__top">
          <div className="nx-footer__brand">
            <Link to="/" className="nx-footer-logo" aria-label="NEXIX Studio — Inicio">
              <img src="/images/logo-nx.webp" alt="" width="46" height="33" />
              <span>NEXIX</span>
            </Link>
            <p>
              Diseño web y automatización con inteligencia artificial para negocios en República
              Dominicana.
            </p>
            <MagneticNX strength={0.25}>
              <a
                className="nx-btn nx-btn--light"
                href={whatsappLink("Hola, quiero hablar sobre un proyecto con NEXIX")} onClick={trackWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppGlyph className="nx-btn__wa" />
                Escríbenos por WhatsApp
              </a>
            </MagneticNX>
          </div>

          <details className="nx-footer__col nx-footer__acc" open={!isPhone} key={`nav-${isPhone}`}>
            <summary>
              <h3>Navegación</h3>
            </summary>
            <nav className="nx-footer__links" aria-label="Navegación del pie de página">
              {NAV.map((l) => (
                <Link key={l.to} to={l.to}>
                  {l.label}
                </Link>
              ))}
            </nav>
          </details>

          <details className="nx-footer__col nx-footer__acc" open={!isPhone} key={`svc-${isPhone}`}>
            <summary>
              <h3>Servicios</h3>
            </summary>
            <div className="nx-footer__links">
              {FOOTER_SERVICES.map((s) => (
                <Link key={s.slug} to={servicePath(s)}>
                  {s.title.join(" ")}
                </Link>
              ))}
            </div>
          </details>

          <div className="nx-footer__col nx-footer__contact">
            <h3>Contacto</h3>
            <a href={whatsappLink()} onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer">
              +1 (829) 523-4738
            </a>
            <a href="mailto:nexixstudio@gmail.com">nexixstudio@gmail.com</a>
            <span>Santo Domingo, República Dominicana</span>
          </div>
        </div>

        <div className="nx-footer__bottom">
          <p>© {year} NEXIX Studio. Todos los derechos reservados.</p>
          <nav className="nx-footer__legal" aria-label="Legal">
            <Link to="/politica-de-privacidad">Política de privacidad</Link>
            <Link to="/terminos-y-condiciones">Términos y condiciones</Link>
          </nav>
          <a
            href="#inicio"
            className="nx-footer__top-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Volver arriba
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 15.5V4.5m0 0-4.5 4.5M10 4.5 14.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
