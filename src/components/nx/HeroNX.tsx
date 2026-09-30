import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { useCoverFrame } from "./useCoverFrame";
import { whatsappLink } from "../../lib/whatsapp";
import { trackWhatsAppClick } from "../../lib/analytics";

const EASE = [0.22, 1, 0.36, 1] as const;
const HERO_RATIO = 1672 / 941;

// Secondary CTA target — switch to { label: "Ver portafolio", target: "portafolio" } to point it at the portfolio.
const SECONDARY_CTA = { label: "Ver servicios", target: "servicios" };

export const headline = [
  { text: "Ideas digitales", tone: "ink" },
  { text: "en resultados", tone: "blue" },
  { text: "reales", tone: "blue" },
];

export const features = [
  {
    label: ["Páginas web", "profesionales"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12.5" rx="1.6" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9 20h6M12 16.5V20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: ["Desarrollo de", "aplicaciones web"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m12 3 9 4.6-9 4.6-9-4.6L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m3 12 9 4.6 9-4.6M3 16.4 12 21l9-4.6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: ["Automatización", "con IA"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 3.5c.5 3.9 2.6 6 6.5 6.5-3.9.5-6 2.6-6.5 6.5-.5-3.9-2.6-6-6.5-6.5 3.9-.5 6-2.6 6.5-6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M18 14.5c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Labels placed over the glass panels baked into the photo (image-relative %). */
function PanelLabels({ reduce }: { reduce: boolean }) {
  const item = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.8, delay: 0.9 + i * 0.14, ease: EASE },
  });

  return (
    <>
      <motion.span className="nx-hero__tag nx-hero__tag--proyecto" style={{ rotate: -6 }} {...item(0)}>
        Proyecto
      </motion.span>
      <motion.div className="nx-hero__tag nx-hero__tag--growth" style={{ rotate: -4 }} {...item(1)}>
        <span className="nx-hero__tag-label">Crecimiento</span>
        <span className="nx-hero__tag-value">+150%</span>
      </motion.div>
      <motion.div className="nx-hero__tag nx-hero__tag--screen" style={{ rotate: -4, skewX: -8 }} {...item(2)}>
        <span className="nx-hero__screen-title">
          Soluciones
          <br />
          digitales
        </span>
        <span className="nx-hero__screen-sub">que impulsan tu negocio</span>
        <span className="nx-hero__screen-btn" />
      </motion.div>
      <motion.span className="nx-hero__tag nx-hero__tag--diseno" style={{ rotate: -3 }} {...item(3)}>
        Diseño
      </motion.span>
    </>
  );
}

export default function HeroNX() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const frame = useCoverFrame(mediaRef, HERO_RATIO, 1, 0.5);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "9%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-6%"]);

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  const frameStyle = {
    width: frame.width,
    height: frame.height,
    left: frame.left,
    top: frame.top,
    "--fw": frame.width,
  } as CSSProperties;

  return (
    <section ref={sectionRef} id="inicio" className="nx-hero">
      <div ref={mediaRef} className="nx-hero__media">
        <motion.div className="nx-hero__parallax" style={{ y: imgY }}>
          <motion.div
            className="nx-hero__frame"
            style={frameStyle}
            initial={reduce ? false : { scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: EASE }}
          >
            <img
              src="/images/hero.webp"
              srcSet="/images/hero-960.webp 960w, /images/hero.webp 1672w"
              sizes="(max-width: 900px) 100vw, 75vw"
              alt="Laptop sobre un escritorio frente a una vista de la ciudad, con paneles flotantes de diseño web y crecimiento"
              width="1672"
              height="941"
              fetchPriority="high"
            />
            {frame.width > 0 && <PanelLabels reduce={reduce} />}
          </motion.div>
        </motion.div>
        <div className="nx-hero__fade" aria-hidden="true" />
      </div>

      <motion.div className="nx-container nx-hero__inner" style={{ y: copyY }}>
        <div className="nx-hero__copy">
          <motion.p
            className="nx-eyebrow"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            Tecnología que impulsa tu negocio
          </motion.p>

          <h1 className="nx-hero__title" aria-label="Ideas digitales en resultados reales">
            {headline.map((line, i) => (
              <span key={line.text} className="nx-mask" aria-hidden="true">
                <motion.span
                  className={`nx-mask__line nx-hero__line--${line.tone}`}
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.05, delay: 0.25 + i * 0.12, ease: EASE }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="nx-hero__lead"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          >
            Diseñamos, desarrollamos y automatizamos soluciones digitales a la medida de tu negocio,
            combinando diseño, tecnología e inteligencia artificial.
          </motion.p>

          <motion.div
            className="nx-hero__ctas"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            <MagneticNX>
              <a
                href={whatsappLink("Hola, quiero cotizar un proyecto con NEXIX")} onClick={trackWhatsAppClick}
                target="_blank"
                rel="noopener noreferrer"
                className="nx-btn nx-btn--dark nx-btn--lg"
              >
                Cotiza tu proyecto
                <ArrowRight />
              </a>
            </MagneticNX>
            <MagneticNX>
              <a
                href={`#${SECONDARY_CTA.target}`}
                onClick={(e) => scrollToSection(e, SECONDARY_CTA.target)}
                className="nx-btn nx-btn--glass nx-btn--lg"
              >
                {SECONDARY_CTA.label}
              </a>
            </MagneticNX>
          </motion.div>

          <motion.ul
            className="nx-hero__features"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.1, delayChildren: 1.0 } } }}
          >
            {features.map((f) => (
              <motion.li
                key={f.label[0]}
                variants={{
                  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
              >
                <span className="nx-hero__feature-icon">{f.icon}</span>
                <span>
                  {f.label[0]}
                  <br />
                  {f.label[1]}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>

      <motion.a
        href="#servicios"
        onClick={(e) => scrollToSection(e, "servicios")}
        className="nx-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="nx-hero__scroll-line" aria-hidden="true" />
        <span>Desliza para explorar</span>
      </motion.a>
    </section>
  );
}
