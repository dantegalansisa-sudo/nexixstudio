import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { headline, features } from "./HeroNX";
import { whatsappLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/analytics";

/**
 * Hero video (phones only). Replace these files with recordings of our own
 * projects: 16:9-ish, no audio, < 2 MB each. Keep the poster = first frame.
 */
export const HERO_VIDEO = {
  webm: "/videos/hero-web.webm",
  mp4: "/videos/hero-web.mp4",
  poster: "/videos/hero-web-poster.webp",
  width: 612,
  height: 340,
};

const EASE = [0.22, 1, 0.36, 1] as const;

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Keeps the hero video looping everywhere. iOS Safari only autoplays when the
 * `muted` *attribute* is present (React sets just the property), and some
 * browsers can stall at the end of a loop or pause the video when the tab is
 * backgrounded — so we restart it ourselves when that happens.
 */
function useLoopingVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const play = () => {
      v.play().catch(() => {
        /* autoplay blocked (e.g. Low Power Mode): the poster stays visible */
      });
    };
    const restart = () => {
      v.currentTime = 0;
      play();
    };
    const resumeIfVisible = () => {
      if (document.visibilityState === "visible" && v.paused) play();
    };

    v.addEventListener("ended", restart);
    v.addEventListener("pause", resumeIfVisible);
    document.addEventListener("visibilitychange", resumeIfVisible);
    play();
    return () => {
      v.removeEventListener("ended", restart);
      v.removeEventListener("pause", resumeIfVisible);
      document.removeEventListener("visibilitychange", resumeIfVisible);
    };
  }, []);
  return ref;
}

export default function HeroMobileNX() {
  const reduce = !!useReducedMotion();
  const videoRef = useLoopingVideo();

  function goToServices(e: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById("servicios");
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", "#servicios");
  }

  return (
    <>
      <section id="inicio" className="nx-mhero" aria-label="Inicio">
        <div className="nx-mhero__glow" aria-hidden="true" />

        <h1 className="nx-mhero__title" aria-label="Ideas digitales en resultados reales">
          {headline.map((line, i) => (
            <span key={line.text} className="nx-mask" aria-hidden="true">
              <motion.span
                className={`nx-mask__line nx-hero__line--${line.tone}`}
                initial={reduce ? false : { y: "108%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE }}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="nx-mhero__sub"
          initial={reduce ? false : { y: 8 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          Webs que venden y automatización con IA para tu negocio.
        </motion.p>

        <motion.div
          className="nx-mhero__screen"
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
        >
          <div className="nx-mhero__bar" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="nx-mhero__video" style={{ aspectRatio: `${HERO_VIDEO.width} / ${HERO_VIDEO.height}` }}>
            {reduce ? (
              <img src={HERO_VIDEO.poster} alt="" width={HERO_VIDEO.width} height={HERO_VIDEO.height} fetchPriority="high" />
            ) : (
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={HERO_VIDEO.poster}
                width={HERO_VIDEO.width}
                height={HERO_VIDEO.height}
                aria-hidden="true"
                tabIndex={-1}
              >
                {/* MP4 first: H.264 loops reliably on iOS Safari; others fall back to WebM */}
                <source src={HERO_VIDEO.mp4} type="video/mp4" />
                <source src={HERO_VIDEO.webm} type="video/webm" />
              </video>
            )}
          </div>
        </motion.div>

        <motion.div
          className="nx-mhero__ctas"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
        >
          <a
            href={whatsappLink("Hola, quiero cotizar un proyecto con NEXIX")}
            onClick={trackWhatsAppClick}
            target="_blank"
            rel="noopener noreferrer"
            className="nx-btn nx-btn--dark nx-btn--lg nx-mhero__cta"
          >
            Cotiza tu proyecto
            <ArrowRight />
          </a>
          <a href="#servicios" onClick={goToServices} className="nx-mhero__link">
            Ver servicios
          </a>
        </motion.div>
      </section>

      {/* Moved out of the first screen: eyebrow, long description and features */}
      <section className="nx-mintro" aria-label="Qué hacemos">
        <motion.div
          className="nx-container"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="nx-eyebrow">Tecnología que impulsa tu negocio</p>
          <p className="nx-mintro__lead">
            Diseñamos, desarrollamos y automatizamos soluciones digitales a la medida de tu negocio,
            combinando diseño, tecnología e inteligencia artificial.
          </p>
          <ul className="nx-hero__features nx-mintro__features">
            {features.map((f) => (
              <li key={f.label[0]}>
                <span className="nx-hero__feature-icon">{f.icon}</span>
                <span>
                  {f.label[0]}
                  <br />
                  {f.label[1]}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>
    </>
  );
}
