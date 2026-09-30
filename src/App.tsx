import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { MOBILE_QUERY, useMediaQuery } from "./hooks/useMediaQuery";
import NavbarNX from "./components/nx/NavbarNX";
import FooterNX from "./components/nx/FooterNX";
import { WhatsAppGlyph } from "./components/nx/ContactoNX";
import Home from "./pages/Home";
// Secondary pages load on demand so the home page stays light
const ServicePage = lazy(() => import("./pages/ServicePage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
import { whatsappLink } from "./lib/whatsapp";
import { trackWhatsAppClick } from "./lib/analytics";

function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Wait for the section to mount before scrolling to it
    let frame = 0;
    let tries = 0;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else if (tries++ < 300) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

/** On phones, the floating WhatsApp button waits until the home hero is scrolled past. */
function useHideFloat() {
  const { pathname } = useLocation();
  const isPhone = useMediaQuery(MOBILE_QUERY);
  const active = isPhone && pathname === "/";
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    if (!active) return;
    const on = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [active]);
  return active && !pastHero;
}

export default function App() {
  const hideFloat = useHideFloat();
  return (
    <>
      <ScrollManager />
      <NavbarNX />
      <main>
        <Suspense fallback={<div className="nx-route-fallback" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Old multi-page URLs now live as sections of the home page */}
          <Route path="/servicios" element={<Navigate to="/#servicios" replace />} />
          <Route path="/servicios/:slug" element={<ServicePage />} />
          <Route path="/politica-de-privacidad" element={<LegalPage slug="politica-de-privacidad" />} />
          <Route path="/terminos-y-condiciones" element={<LegalPage slug="terminos-y-condiciones" />} />
          <Route path="/nosotros" element={<Navigate to="/#proceso" replace />} />
          <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </Suspense>
      </main>
      <FooterNX />
      <a
        href={whatsappLink()} onClick={trackWhatsAppClick}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className={`nx-wa-float ${hideFloat ? "is-hidden" : ""}`}
        aria-hidden={hideFloat || undefined}
        tabIndex={hideFloat ? -1 : undefined}
      >
        <WhatsAppGlyph />
      </a>
    </>
  );
}
