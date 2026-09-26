import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NavbarNX from "./components/nx/NavbarNX";
import FooterNX from "./components/nx/FooterNX";
import { WhatsAppGlyph } from "./components/nx/ContactoNX";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import { whatsappLink } from "./lib/whatsapp";

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
      else if (tries++ < 90) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <NavbarNX />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Old multi-page URLs now live as sections of the home page */}
          <Route path="/servicios" element={<Navigate to="/#servicios" replace />} />
          <Route path="/servicios/:slug" element={<ServicePage />} />
          <Route path="/nosotros" element={<Navigate to="/#proceso" replace />} />
          <Route path="/contacto" element={<Navigate to="/#contacto" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <FooterNX />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="nx-wa-float"
      >
        <WhatsAppGlyph />
      </a>
    </>
  );
}
