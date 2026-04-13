export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__logo">
              <span className="footer__logo-name">NEXIX</span>
              <span className="footer__logo-sub">Tech Studio</span>
            </div>
            <p className="footer__tagline">Websites que conquistan. Automatizaci&oacute;n que libera.</p>
            <div className="footer__socials">
              <a href="https://instagram.com/nexixstudio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><path d="M17.5 6.5h.01" /></svg>
              </a>
              <a href="https://wa.me/18295234738" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785c-1.813 0-3.593-.487-5.145-1.41l-.369-.22-3.826 1.003 1.02-3.726-.24-.382A9.86 9.86 0 0 1 2.05 12.05C2.05 6.53 6.53 2.05 12.05 2.05c2.66 0 5.16 1.036 7.037 2.917A9.9 9.9 0 0 1 22 12.05c0 5.52-4.48 9.735-9.95 9.735zM12.05 0C5.431 0 .05 5.382.05 12c0 2.118.553 4.186 1.604 6.01L0 24l6.146-1.612A11.9 11.9 0 0 0 12.05 24c6.619 0 12-5.382 12-12S18.669 0 12.05 0z" /></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Servicios</h4>
            <ul>
              <li><a href="#servicios">Desarrollo Web</a></li>
              <li><a href="#servicios">Automatizaci&oacute;n con IA</a></li>
              <li><a href="#servicios">Consultor&iacute;a Digital</a></li>
              <li><a href="#servicios">SEO y Posicionamiento</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Empresa</h4>
            <ul>
              <li><a href="#hero">Sobre NEXIX</a></li>
              <li><a href="#portafolio">Portafolio</a></li>
              <li><a href="#equipo">Equipo</a></li>
              <li><a href="#">Blog (pr&oacute;ximamente)</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__col-title">Contacto</h4>
            <ul>
              <li>&#128241; 829-523-4738</li>
              <li>&#128248; @nexixstudio</li>
              <li>&#127760; nexixstudio.com</li>
              <li>&#128205; Santo Domingo, RD</li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; 2025 NEXIX Tech Studio &middot; Todos los derechos reservados &middot; Hecho con &#10084;&#65039; en Rep&uacute;blica Dominicana</p>
        </div>
      </div>
    </footer>
  );
}
