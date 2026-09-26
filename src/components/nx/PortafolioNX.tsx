import { useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticNX from "./MagneticNX";
import { whatsappLink } from "../../lib/whatsapp";
import { PORTFOLIO, PORTFOLIO_FILTERS, displayHost, type PortfolioProject } from "../../data/portfolio";

const EASE = [0.22, 1, 0.36, 1] as const;
const COLLAPSED_COUNT = 6;

type FilterKey = (typeof PORTFOLIO_FILTERS)[number]["key"];

const SECTOR_COLORS: Record<PortfolioProject["category"], string> = {
  salud: "#3457ee",
  turismo: "#0ea5b7",
  gastronomia: "#f2a93b",
  finanzas: "#22b07d",
  inmobiliaria: "#8b5cf6",
};

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProjectCard({ p, index, variant }: { p: PortfolioProject; index: number; variant: "featured" | "wide" | "normal" }) {
  return (
    <article className={`nx-pcard nx-pcard--${variant}`}>
      <a className="nx-pcard__shot" href={p.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
        <div className="nx-browser">
          <div className="nx-browser__bar">
            <span className="nx-browser__dots">
              <i />
              <i />
              <i />
            </span>
            <span className="nx-browser__url">{displayHost(p.url)}</span>
          </div>
          <div className="nx-browser__viewport">
            <img src={p.images.desktopTall} alt="" loading="lazy" decoding="async" width="960" height="1800" />
          </div>
        </div>
        <div className="nx-phone">
          <img src={p.images.mobile} alt="" loading="lazy" decoding="async" width="420" height="909" />
        </div>
      </a>

      <div className="nx-pcard__body">
        <div className="nx-pcard__top">
          <span className="nx-pcard__num">{String(index + 1).padStart(2, "0")}</span>
          <span className="nx-pcard__ext" aria-hidden="true">
            <ExternalIcon />
          </span>
        </div>
        <span className="nx-pcard__sector">
          <i style={{ background: SECTOR_COLORS[p.category] }} />
          {p.sector}
        </span>
        <h3 className="nx-pcard__title">{p.name}</h3>
        {p.client && <p className="nx-pcard__client">{p.client}</p>}
        <p className="nx-pcard__text">{p.description}</p>
        <MagneticNX className="nx-pcard__cta-wrap" strength={0.25}>
          <a className="nx-pcard__cta" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver sitio de ${p.name} (se abre en otra pestaña)`}>
            <span className="nx-pcard__cta-icon">
              <LinkIcon />
            </span>
            Ver sitio
            <Arrow />
          </a>
        </MagneticNX>
      </div>
    </article>
  );
}

export default function PortafolioNX() {
  const ref = useRef<HTMLElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const reduce = !!useReducedMotion();
  const [filter, setFilter] = useState<FilterKey>("todos");
  const [expanded, setExpanded] = useState(false);

  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start end", "end start"] });
  const showcaseY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["6%", "-6%"]);

  const featured = PORTFOLIO[0];
  const filtered = useMemo(
    () => (filter === "todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter)),
    [filter]
  );
  const collapsible = filter === "todos" && PORTFOLIO.length > COLLAPSED_COUNT;
  const visible = collapsible && !expanded ? filtered.slice(0, COLLAPSED_COUNT) : filtered;

  function variantFor(i: number): "featured" | "wide" | "normal" {
    if (i !== 0) return "normal";
    return visible.length === 1 ? "wide" : "featured";
  }

  function showAll() {
    setFilter("todos");
    setExpanded(true);
  }

  const titleLines = [
    { text: "Proyectos que", tone: "ink" },
    { text: "ya están generando", tone: "blue" },
    { text: "resultados", tone: "ink" },
  ];

  return (
    <section ref={ref} id="portafolio" className="nx-portfolio">
      <div className="nx-portfolio__bg" aria-hidden="true" />
      <div className="nx-container">
        <div className="nx-portfolio__head">
          <div className="nx-portfolio__intro">
            <motion.p
              className="nx-eyebrow nx-eyebrow--line"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.7, ease: EASE }}
            >
              Portafolio
            </motion.p>
            <h2 className="nx-portfolio__title" aria-label="Proyectos que ya están generando resultados">
              {titleLines.map((l, i) => (
                <span key={l.text} className="nx-mask" aria-hidden="true">
                  <motion.span
                    className={`nx-mask__line nx-hero__line--${l.tone}`}
                    initial={reduce ? false : { y: "108%" }}
                    animate={inView ? { y: "0%" } : undefined}
                    transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: EASE }}
                  >
                    {l.text}
                  </motion.span>
                </span>
              ))}
            </h2>
            <motion.p
              className="nx-portfolio__lead"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            >
              Webs reales para negocios reales en República Dominicana.
            </motion.p>
          </div>

          <div ref={showcaseRef} className="nx-portfolio__showcase">
            <motion.img
              src="/images/portafolio-showcase.webp"
              alt=""
              loading="lazy"
              decoding="async"
              width="1672"
              height="941"
              style={{ y: showcaseY }}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            />
            <motion.a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="nx-featured"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            >
              <span className="nx-featured__icon">
                <LinkIcon />
              </span>
              <span className="nx-featured__label">Proyecto destacado</span>
              <span className="nx-featured__name">{featured.name}</span>
              <span className="nx-featured__text">{featured.description}</span>
              <span className="nx-featured__link">
                <span className="nx-featured__link-icon">
                  <LinkIcon />
                </span>
                Ver sitio web
                <Arrow />
              </span>
            </motion.a>
          </div>

          {(filter !== "todos" || (collapsible && !expanded)) && (
            <MagneticNX className="nx-portfolio__all" strength={0.2}>
              <button type="button" className="nx-btn nx-btn--dark" onClick={showAll}>
                Ver todos los proyectos
                <Arrow />
              </button>
            </MagneticNX>
          )}
        </div>

        <LayoutGroup>
          <motion.div
            className="nx-tabs"
            role="tablist"
            aria-label="Filtrar proyectos por sector"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
          >
            {PORTFOLIO_FILTERS.map((f) => {
              const active = f.key === filter;
              return (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  className={`nx-tab ${active ? "is-active" : ""}`}
                  onClick={() => setFilter(f.key)}
                >
                  {active && (
                    <motion.span
                      layoutId="nx-tab-pill"
                      className="nx-tab__pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="nx-tab__label">{f.label}</span>
                </button>
              );
            })}
          </motion.div>

          <motion.div layout className="nx-bento" role="tabpanel">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  className={`nx-bento__item nx-bento__item--${variantFor(i)}`}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                    delay: inView ? Math.min(i, 6) * 0.08 : 0,
                    layout: { duration: 0.6, ease: EASE },
                  }}
                >
                  <ProjectCard p={p} index={PORTFOLIO.indexOf(p)} variant={variantFor(i)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {collapsible && !expanded && (
          <div className="nx-portfolio__more">
            <button type="button" className="nx-btn nx-btn--glass" onClick={() => setExpanded(true)}>
              Ver {PORTFOLIO.length - COLLAPSED_COUNT} proyectos más
            </button>
          </div>
        )}

        <motion.div
          className="nx-portfolio__cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div>
            <h3>¿Tu negocio es el próximo?</h3>
            <p>Diseñamos tu web para atraer clientes y convertir visitas en ventas.</p>
          </div>
          <MagneticNX>
            <a
              href={whatsappLink("Hola, vi su portafolio y quiero una web para mi negocio")}
              target="_blank"
              rel="noopener noreferrer"
              className="nx-btn nx-btn--dark nx-btn--lg"
            >
              Cotiza tu proyecto
              <Arrow />
            </a>
          </MagneticNX>
        </motion.div>
      </div>
    </section>
  );
}
