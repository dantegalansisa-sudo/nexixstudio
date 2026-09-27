import { Link, Navigate } from "react-router-dom";
import { getLegalDoc, LEGAL_DOCS } from "../data/legal";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

function LegalContent({ slug }: { slug: string }) {
  const doc = getLegalDoc(slug)!;
  useDocumentMeta(`${doc.title} | NEXIX Studio`, doc.metaDescription);
  const other = LEGAL_DOCS.find((d) => d.slug !== slug);

  return (
    <article className="nx-legal">
      <div className="nx-container nx-legal__inner">
        <nav className="nx-breadcrumb" aria-label="Ruta de navegación">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{doc.title}</span>
        </nav>
        <h1 className="nx-legal__title">{doc.title}</h1>
        <p className="nx-legal__updated">Última actualización: {doc.updated}</p>
        <p className="nx-legal__intro">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.heading} className="nx-legal__section">
            <h2>{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        {other && (
          <p className="nx-legal__more">
            Consulta también nuestra <Link to={`/${other.slug}`}>{other.title.toLowerCase()}</Link>.
          </p>
        )}
      </div>
    </article>
  );
}

export default function LegalPage({ slug }: { slug: string }) {
  if (!getLegalDoc(slug)) return <Navigate to="/" replace />;
  return <LegalContent key={slug} slug={slug} />;
}
