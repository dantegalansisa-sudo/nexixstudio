import { useId, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import MagneticNX from "../components/nx/MagneticNX";
import ContactoNX, { WhatsAppGlyph } from "../components/nx/ContactoNX";
import { ProjectCard } from "../components/nx/PortafolioNX";
import { SERVICES, getServiceBySlug, servicePath, type Service } from "../data/services";
import { PORTFOLIO } from "../data/portfolio";
import { whatsappLink } from "../lib/whatsapp";
import { trackWhatsAppClick } from "../lib/analytics";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const EASE = [0.22, 1, 0.36, 1] as const;

// Service key → option preselected in the contact form
const FORM_SERVICE: Record<string, string> = {
  web: "Sitio web profesional",
  automatizacion: "Automatización con IA",
  medida: "Soluciones a la medida",
  estrategia: "Estrategia y asesoría",
  consultoria: "Estrategia y asesoría",
};

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
} as const;

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="m5 10.5 3.2 3.2L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHead({ eyebrow, title, blue, lead }: { eyebrow: string; title: string; blue?: string; lead?: string }) {
  return (
    <motion.div className="nx-sp-head" {...reveal} transition={{ duration: 0.8, ease: EASE }}>
      <p className="nx-eyebrow nx-eyebrow--line">{eyebrow}</p>
      <h2 className="nx-sp-h2">
        {title} {blue && <span className="nx-hero__line--blue">{blue}</span>}
      </h2>
      {lead && <p className="nx-sp-lead">{lead}</p>}
    </motion.div>
  );
}

function Faqs({ items }: { items: Service["page"]["faqs"] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <ul className="nx-accordion">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q} className={`nx-acc ${isOpen ? "is-open" : ""}`}>
            <h3>
              <button
                id={`${baseId}-q${i}`}
                type="button"
                className="nx-acc__btn"
                aria-expanded={isOpen}
                aria-controls={`${baseId}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="nx-acc__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="nx-acc__q">{f.q}</span>
                <span className="nx-acc__toggle" aria-hidden="true">
                  <svg viewBox="0 0 20 20" fill="none">
                    <path d="M10 4.5v11M4.5 10h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${baseId}-a${i}`}
                  role="region"
                  aria-labelledby={`${baseId}-q${i}`}
                  className="nx-acc__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function ServiceContent({ s }: { s: Service }) {
  const reduce = !!useReducedMotion();
  const p = s.page;
  useDocumentMeta(p.metaTitle, p.metaDescription);

  const wa = whatsappLink(`Hola, me interesa el servicio de ${s.service}`);
  const projects = (p.projects ?? [])
    .map((slug) => PORTFOLIO.find((x) => x.slug === slug))
    .filter((x): x is (typeof PORTFOLIO)[number] => !!x);
  const others = SERVICES.filter((x) => x.slug !== s.slug);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      {/* ---------- Hero ---------- */}
      <section className="nx-sp-hero">
        <div className="nx-sp-hero__bg" aria-hidden="true" />
        <div className="nx-container nx-sp-hero__grid">
          <div>
            <nav className="nx-breadcrumb" aria-label="Ruta de navegación">
              <Link to="/">Inicio</Link>
              <span aria-hidden="true">/</span>
              <Link to="/#servicios">Servicios</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{s.service}</span>
            </nav>
            <motion.span
              className="nx-pill nx-sp-pill"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="nx-sp-pill__icon">{s.icon}</span>
              {s.service}
            </motion.span>
            <h1 className="nx-sp-title" aria-label={`${p.heading[0]} ${p.heading[1]}`}>
              {p.heading.map((line, i) => (
                <span key={line} className="nx-mask" aria-hidden="true">
                  <motion.span
                    className={`nx-mask__line ${i === 1 ? "nx-hero__line--blue" : ""}`}
                    initial={reduce ? false : { y: "108%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              className="nx-sp-hero__lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            >
              {p.lead}
            </motion.p>
            <motion.div
              className="nx-sp-hero__ctas"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            >
              <MagneticNX>
                <a href={wa} onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" className="nx-btn nx-btn--whatsapp nx-btn--lg">
                  <WhatsAppGlyph className="nx-btn__wa" />
                  Cotizar por WhatsApp
                  <Arrow />
                </a>
              </MagneticNX>
              <MagneticNX>
                <a href="#incluye" className="nx-btn nx-btn--glass nx-btn--lg">
                  Qué incluye
                </a>
              </MagneticNX>
            </motion.div>
          </div>

          <motion.div
            className="nx-sp-hero__media"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE }}
          >
            <div className="nx-sp-hero__frame">
              <img
                src={s.image}
                alt={`${s.service} — NEXIX Studio`}
                width="1200"
                height="800"
                fetchPriority="high"
                style={{ transform: `scale(${s.crop.zoom})`, transformOrigin: `${s.crop.x}% ${s.crop.y}%` }}
              />
            </div>
            <div className="nx-sp-hero__chip">
              <span className="nx-sp-hero__chip-icon">{s.icon}</span>
              <span>
                <strong>{s.title.join(" ")}</strong>
                <span>{s.description}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Qué incluye ---------- */}
      <section id="incluye" className="nx-sp-section">
        <div className="nx-container">
          <SectionHead eyebrow="Qué incluye" title="Todo lo que necesitas," blue="en un solo servicio" />
          <ul className="nx-sp-includes">
            {p.includes.map((it, i) => (
              <motion.li key={it.title} {...reveal} transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: EASE }}>
                <span className="nx-sp-includes__check">
                  <Check />
                </span>
                <strong>{it.title}</strong>
                <span>{it.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Beneficios + ideal para ---------- */}
      <section className="nx-sp-section nx-sp-section--tint">
        <div className="nx-container nx-sp-split">
          <div>
            <SectionHead eyebrow="Beneficios" title="Lo que gana" blue="tu negocio" />
            <ul className="nx-sp-benefits">
              {p.benefits.map((b, i) => (
                <motion.li key={b.title} {...reveal} transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}>
                  <span className="nx-sp-benefits__num">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{b.title}</strong>
                    <span>{b.text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.aside className="nx-sp-ideal" {...reveal} transition={{ duration: 0.8, delay: 0.1, ease: EASE }}>
            <p className="nx-eyebrow">Ideal para</p>
            <ul>
              {p.idealFor.map((t) => (
                <li key={t}>
                  <Check />
                  {t}
                </li>
              ))}
            </ul>
            <a href={wa} onClick={trackWhatsAppClick} target="_blank" rel="noopener noreferrer" className="nx-sp-ideal__link">
              ¿Tu negocio encaja? Escríbenos
              <Arrow />
            </a>
          </motion.aside>
        </div>
      </section>

      {/* ---------- Cómo trabajamos ---------- */}
      <section className="nx-sp-section">
        <div className="nx-container">
          <SectionHead eyebrow="Cómo trabajamos" title="Del primer mensaje" blue="al resultado" />
          <ol className="nx-sp-steps">
            {p.steps.map((st, i) => (
              <motion.li key={st.title} {...reveal} transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}>
                <span className="nx-sp-steps__num">{String(i + 1).padStart(2, "0")}</span>
                <strong>{st.title}</strong>
                <span>{st.text}</span>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Proyectos relacionados ---------- */}
      {projects.length > 0 && (
        <section className="nx-sp-section nx-sp-section--tint">
          <div className="nx-container">
            <SectionHead
              eyebrow="Proyectos reales"
              title="Así se ve"
              blue="en negocios reales"
              lead="Algunos proyectos de nuestro portafolio relacionados con este servicio."
            />
            <div className="nx-bento nx-sp-projects">
              {projects.map((pr, i) => (
                <motion.div key={pr.slug} className="nx-bento__item" {...reveal} transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}>
                  <ProjectCard p={pr} index={PORTFOLIO.indexOf(pr)} variant="normal" />
                </motion.div>
              ))}
            </div>
            <div className="nx-sp-center">
              <Link to="/#portafolio" className="nx-btn nx-btn--glass">
                Ver todo el portafolio
                <Arrow />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ---------- Preguntas ---------- */}
      <section className="nx-sp-section">
        <div className="nx-container nx-sp-faq">
          <SectionHead eyebrow="Preguntas frecuentes" title="Dudas sobre" blue={s.service.toLowerCase()} />
          <Faqs items={p.faqs} />
        </div>
      </section>

      {/* ---------- Otros servicios ---------- */}
      <section className="nx-sp-section nx-sp-section--tint nx-sp-others">
        <div className="nx-container">
          <SectionHead eyebrow="Otros servicios" title="Más formas de" blue="impulsar tu negocio" />
          <ul className="nx-sp-others__grid">
            {others.map((o, i) => (
              <motion.li key={o.slug} {...reveal} transition={{ duration: 0.6, delay: i * 0.06, ease: EASE }}>
                <Link to={servicePath(o)} className="nx-sp-other">
                  <span className="nx-sp-other__icon">{o.icon}</span>
                  <strong>{o.title.join(" ")}</strong>
                  <span>{o.description}</span>
                  <span className="nx-sp-other__go">
                    Ver servicio
                    <Arrow />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <ContactoNX defaultService={FORM_SERVICE[s.key] ?? ""} />
    </motion.div>
  );
}

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);
  if (!service) return <Navigate to="/#servicios" replace />;
  // key: remount (and replay entrance animations) when moving between services
  return <ServiceContent key={service.slug} s={service} />;
}
