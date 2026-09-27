import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { whatsappLink } from "../../lib/whatsapp";

const EASE = [0.22, 1, 0.36, 1] as const;

export type ServiceOption = { value: string; icon?: ReactNode };

type Values = {
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  mensaje: string;
  consentimiento: boolean;
};
type Field = keyof Values;
type Status = "idle" | "sending" | "success" | "error";

const EMPTY: Values = { nombre: "", email: "", telefono: "", servicio: "", mensaje: "", consentimiento: false };

/** Mirrors the checks in api/contact.ts so people get instant feedback. */
function validate(v: Values): Partial<Record<Field, string>> {
  const e: Partial<Record<Field, string>> = {};
  if (v.nombre.trim().length < 2) e.nombre = "Escribe tu nombre.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Escribe un email válido.";
  if (v.telefono.trim() && !/^[+\d\s().-]{7,}$/.test(v.telefono.trim())) e.telefono = "Revisa el número.";
  if (v.mensaje.trim().length < 10) e.mensaje = "Cuéntanos un poco más (mínimo 10 caracteres).";
  if (!v.consentimiento) e.consentimiento = "Necesitamos tu autorización para responderte.";
  return e;
}

const ORDER: Field[] = ["nombre", "email", "telefono", "mensaje", "consentimiento"];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactFormNX({ options, defaultService = "" }: { options: ServiceOption[]; defaultService?: string }) {
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(Date.now());
  const [values, setValues] = useState<Values>({ ...EMPTY, servicio: defaultService });
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const errors = validate(values);
  const show = (f: Field) => (touched[f] ? errors[f] : undefined);

  function set<K extends Field>(field: K, value: Values[K]) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ nombre: true, email: true, telefono: true, mensaje: true, consentimiento: true });
    const first = ORDER.find((f) => errors[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(first))}`)?.focus();
      return;
    }

    setStatus("sending");
    setServerErrors([]);
    const website = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, t: startedAt.current }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setStatus("success");
        return;
      }
      setServerErrors(data?.errors?.length ? data.errors : ["No pudimos enviar tu mensaje. Intenta de nuevo."]);
      setStatus("error");
    } catch {
      setServerErrors(["No hay conexión en este momento. Intenta de nuevo o escríbenos por WhatsApp."]);
      setStatus("error");
    }
  }

  function reset() {
    setValues({ ...EMPTY, servicio: defaultService });
    setTouched({});
    setServerErrors([]);
    startedAt.current = Date.now();
    setStatus("idle");
  }

  const waFallback = whatsappLink(
    `Hola, soy ${values.nombre.trim() || "..."}. ${values.servicio ? `Me interesa: ${values.servicio}. ` : ""}${values.mensaje.trim()}`.trim()
  );

  return (
    <div className="nx-form-card">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="ok"
            className="nx-form-success"
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="nx-form-success__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <h3>¡Mensaje enviado!</h3>
            <p>
              Gracias, {values.nombre.trim().split(" ")[0]}. Te responderemos en menos de 24 horas por email
              {values.telefono ? " o WhatsApp" : ""}.
            </p>
            <button type="button" className="nx-btn nx-btn--glass" onClick={reset}>
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            className="nx-form"
            noValidate
            onSubmit={onSubmit}
            initial={false}
            exit={{ opacity: 0 }}
            aria-describedby={id("intro")}
          >
            <div className="nx-form__head">
              <p className="nx-eyebrow nx-eyebrow--line">Cuéntanos tu proyecto</p>
              <p id={id("intro")} className="nx-form__intro">
                Completa el formulario y te contactamos en menos de 24 horas.
              </p>
            </div>

            <fieldset className="nx-form__services">
              <legend>¿Qué necesitas?</legend>
              <div className="nx-chips">
                {options.map((o) => (
                  <label key={o.value} className={`nx-chip ${values.servicio === o.value ? "is-on" : ""}`}>
                    <input
                      type="radio"
                      name="servicio"
                      value={o.value}
                      checked={values.servicio === o.value}
                      onChange={() => set("servicio", o.value)}
                    />
                    {o.icon && <span className="nx-chip__icon">{o.icon}</span>}
                    {o.value}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="nx-form__row">
              <div className={`nx-field ${show("nombre") ? "is-invalid" : ""}`}>
                <label htmlFor={id("nombre")}>Nombre *</label>
                <input
                  id={id("nombre")}
                  name="nombre"
                  autoComplete="name"
                  value={values.nombre}
                  onChange={(e) => set("nombre", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
                  aria-invalid={!!show("nombre")}
                  aria-describedby={show("nombre") ? id("nombre-err") : undefined}
                  maxLength={100}
                  placeholder="Tu nombre"
                />
                {show("nombre") && <span id={id("nombre-err")} className="nx-field__err">{show("nombre")}</span>}
              </div>
              <div className={`nx-field ${show("email") ? "is-invalid" : ""}`}>
                <label htmlFor={id("email")}>Email *</label>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => set("email", e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  aria-invalid={!!show("email")}
                  aria-describedby={show("email") ? id("email-err") : undefined}
                  maxLength={150}
                  placeholder="tu@correo.com"
                />
                {show("email") && <span id={id("email-err")} className="nx-field__err">{show("email")}</span>}
              </div>
            </div>

            <div className={`nx-field ${show("telefono") ? "is-invalid" : ""}`}>
              <label htmlFor={id("telefono")}>
                WhatsApp <span className="nx-field__opt">(opcional)</span>
              </label>
              <input
                id={id("telefono")}
                name="telefono"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={values.telefono}
                onChange={(e) => set("telefono", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, telefono: true }))}
                aria-invalid={!!show("telefono")}
                aria-describedby={show("telefono") ? id("telefono-err") : undefined}
                maxLength={40}
                placeholder="+1 (809) 000-0000"
              />
              {show("telefono") && <span id={id("telefono-err")} className="nx-field__err">{show("telefono")}</span>}
            </div>

            <div className={`nx-field ${show("mensaje") ? "is-invalid" : ""}`}>
              <label htmlFor={id("mensaje")}>Mensaje *</label>
              <textarea
                id={id("mensaje")}
                name="mensaje"
                rows={4}
                value={values.mensaje}
                onChange={(e) => set("mensaje", e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, mensaje: true }))}
                aria-invalid={!!show("mensaje")}
                aria-describedby={show("mensaje") ? id("mensaje-err") : undefined}
                maxLength={3000}
                placeholder="Cuéntanos sobre tu negocio y lo que quieres lograr"
              />
              {show("mensaje") && <span id={id("mensaje-err")} className="nx-field__err">{show("mensaje")}</span>}
            </div>

            {/* Honeypot: invisible to people, bots tend to fill it */}
            <div className="nx-form__trap" aria-hidden="true">
              <label>
                Sitio web
                <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </label>
            </div>

            <div className={`nx-check ${show("consentimiento") ? "is-invalid" : ""}`}>
              <input
                id={id("consentimiento")}
                type="checkbox"
                checked={values.consentimiento}
                onChange={(e) => set("consentimiento", e.target.checked)}
                aria-invalid={!!show("consentimiento")}
                aria-describedby={show("consentimiento") ? id("consentimiento-err") : undefined}
              />
              <label htmlFor={id("consentimiento")}>
                Acepto la{" "}
                <Link to="/politica-de-privacidad" target="_blank">
                  política de privacidad
                </Link>{" "}
                y que NEXIX me contacte sobre mi solicitud.
              </label>
              {show("consentimiento") && (
                <span id={id("consentimiento-err")} className="nx-field__err">
                  {show("consentimiento")}
                </span>
              )}
            </div>

            <div aria-live="polite">
              {status === "error" && (
                <div className="nx-form__alert" role="alert">
                  {serverErrors.map((m) => (
                    <p key={m}>{m}</p>
                  ))}
                  <a href={waFallback} target="_blank" rel="noopener noreferrer">
                    Enviar por WhatsApp
                    <Arrow />
                  </a>
                </div>
              )}
            </div>

            <button type="submit" className="nx-btn nx-btn--dark nx-btn--lg nx-form__submit" disabled={status === "sending"}>
              {status === "sending" ? (
                <>
                  <span className="nx-spinner" aria-hidden="true" />
                  Enviando…
                </>
              ) : (
                <>
                  Enviar mensaje
                  <Arrow />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
