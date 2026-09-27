import type { ReactNode } from "react";

/**
 * Servicios NEXIX — used by the home carousel (ServiciosNX) and by each
 * service page at /servicios/<slug> (ServicePage). Edit copy here.
 */

export type ServicePageContent = {
  /** SEO <title> and meta description */
  metaTitle: string;
  metaDescription: string;
  /** Hero heading: first part ink, second part blue */
  heading: [string, string];
  lead: string;
  includes: { title: string; text: string }[];
  benefits: { title: string; text: string }[];
  idealFor: string[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Portfolio slugs to show as examples (optional) */
  projects?: string[];
};

export type Service = {
  key: string;
  slug: string;
  title: [string, string];
  service: string; // name used in the WhatsApp message
  description: string;
  image: string;
  crop: { zoom: number; x: number; y: number }; // zoom + origin (%) that frames the device, not the baked-in text panel
  icon: ReactNode;
  accent?: boolean;
  page: ServicePageContent;
};

const stroke = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;

// Visual order follows the mockup: Automatización sits in the center.
export const SERVICES: Service[] = [
  {
    key: "estrategia",
    slug: "estrategia-digital",
    title: ["Estrategia", "digital"],
    service: "Estrategia digital",
    description: "Planificación para impulsar tu presencia y alcanzar tus objetivos.",
    image: "/images/servicio-estrategia-digital.webp",
    crop: { zoom: 2, x: 100, y: 45 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" {...stroke} />
        <circle cx="12" cy="12" r="4.5" {...stroke} />
        <path d="M12 12 20 4m-3 0h3v3" {...stroke} />
      </svg>
    ),
    page: {
      metaTitle: "Estrategia digital para negocios en República Dominicana | NEXIX Studio",
      metaDescription:
        "Definimos contigo un plan digital claro: objetivos, canales, captación de clientes por WhatsApp y redes, y métricas para medir resultados.",
      heading: ["Un plan claro para", "crecer en digital"],
      lead: "Definimos contigo qué hacer, en qué orden y cómo medirlo: tu presencia en línea, la captación de clientes y los canales que mejor funcionan para tu negocio.",
      includes: [
        { title: "Diagnóstico digital", text: "Revisamos tu web, redes y canales actuales para saber dónde estás hoy." },
        { title: "Objetivos y cliente ideal", text: "Aterrizamos metas concretas y a quién le estás vendiendo." },
        { title: "Plan de acción por etapas", text: "Qué hacer primero, qué después y con qué recursos." },
        { title: "Captación por WhatsApp y redes", text: "Cómo convertir seguidores y visitas en conversaciones de venta." },
        { title: "Contenido y anuncios", text: "Recomendaciones de mensajes, formatos y campañas para tu público." },
        { title: "Métricas y seguimiento", text: "Indicadores simples para saber si la estrategia está funcionando." },
      ],
      benefits: [
        { title: "Inviertes con dirección", text: "Cada peso en marketing tiene un propósito y un objetivo medible." },
        { title: "Prioridades claras", text: "Dejas de hacer de todo un poco y te enfocas en lo que da resultados." },
        { title: "Decisiones con datos", text: "Sabes qué funciona y qué ajustar, sin adivinar." },
      ],
      idealFor: [
        "Negocios que empiezan en digital",
        "Empresas que invierten en anuncios sin resultados claros",
        "Marcas que quieren conseguir más clientes",
        "Emprendedores que buscan orden y enfoque",
        "Negocios con redes activas pero pocas ventas",
      ],
      steps: [
        { title: "Diagnóstico", text: "Conocemos tu negocio y analizamos tu presencia actual." },
        { title: "Objetivos", text: "Definimos metas, público y presupuesto." },
        { title: "Plan de acción", text: "Te entregamos el plan por etapas, claro y accionable." },
        { title: "Seguimiento", text: "Revisamos resultados y ajustamos el rumbo contigo." },
      ],
      faqs: [
        {
          q: "¿La estrategia incluye manejar mis redes o anuncios?",
          a: "La estrategia define qué hacer y cómo medirlo. Si lo necesitas, también te acompañamos en la ejecución de campañas y anuncios.",
        },
        {
          q: "¿Sirve si mi negocio es pequeño?",
          a: "Sí. Adaptamos el plan a tu tamaño y presupuesto; muchas veces los mejores resultados vienen de hacer pocas cosas bien.",
        },
        {
          q: "¿Cada cuánto revisamos los resultados?",
          a: "Acordamos contigo revisiones periódicas para ver las métricas y decidir los siguientes pasos.",
        },
      ],
    },
  },
  {
    key: "web",
    slug: "pagina-web",
    title: ["Páginas web", "profesionales"],
    service: "Página web",
    description: "Sitios modernos, rápidos y diseñados para convertir visitantes en clientes.",
    image: "/images/servicio-pagina-web.webp",
    crop: { zoom: 1.7, x: 92, y: 45 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="12.5" rx="1.6" {...stroke} />
        <path d="M9 20h6M12 16.5V20M7 8.5h6M7 11.5h4" {...stroke} />
      </svg>
    ),
    page: {
      metaTitle: "Diseño de páginas web profesionales en República Dominicana | NEXIX Studio",
      metaDescription:
        "Diseñamos páginas web modernas, rápidas y optimizadas para convertir visitas en clientes. Dominio, hosting, SSL y botón de WhatsApp incluidos.",
      heading: ["Páginas web que", "convierten visitas en clientes"],
      lead: "Diseñamos y desarrollamos sitios web modernos, rápidos y pensados para vender. Tu negocio con una presencia profesional que genera confianza desde el primer clic.",
      includes: [
        { title: "Diseño a la medida", text: "Una web única con la identidad de tu marca, nada de plantillas genéricas." },
        { title: "Adaptada a celulares", text: "Se ve y funciona perfecto en móviles, tablets y computadoras." },
        { title: "Rápida y optimizada", text: "Carga en segundos para que tus clientes no se vayan." },
        { title: "SEO básico incluido", text: "Estructura, títulos y velocidad listos para que Google te encuentre." },
        { title: "WhatsApp y formularios", text: "Botones y formularios para que te escriban con un solo toque." },
        { title: "Dominio, hosting y SSL", text: "Nos encargamos de la parte técnica para que tu web esté siempre en línea y segura." },
      ],
      benefits: [
        { title: "Más confianza", text: "Una web profesional hace que los clientes te tomen en serio." },
        { title: "Más contactos", text: "Llamadas a la acción claras que llevan al cliente a escribirte." },
        { title: "Abierta 24/7", text: "Tu negocio informa y recibe solicitudes aunque estés cerrado." },
      ],
      idealFor: [
        "Clínicas y consultorios",
        "Restaurantes",
        "Inmobiliarias y proyectos",
        "Tours y agencias de viaje",
        "Financieras",
        "Profesionales independientes",
      ],
      steps: [
        { title: "Conversamos", text: "Entendemos tu negocio, tu cliente y lo que quieres lograr." },
        { title: "Diseñamos", text: "Te mostramos el concepto visual y lo ajustamos contigo." },
        { title: "Desarrollamos", text: "Construimos la web con tu contenido y la optimizamos." },
        { title: "Lanzamos", text: "Publicamos tu web y te acompañamos después del lanzamiento." },
      ],
      faqs: [
        {
          q: "¿Cuánto tiempo toma tener mi página web?",
          a: "En la mayoría de los casos entregamos en un plazo de 2 a 4 semanas. Desde el inicio te damos un cronograma claro.",
        },
        {
          q: "¿Mi web aparecerá en Google?",
          a: "Configuramos el SEO básico (títulos, descripciones, velocidad y estructura) para que Google pueda encontrarla. Llegar a los primeros lugares depende también del contenido y la competencia.",
        },
        {
          q: "¿Necesito tener fotos y textos listos?",
          a: "Si los tienes, los usamos. Si no, te ayudamos a organizar el contenido y a conseguir imágenes adecuadas para tu marca.",
        },
        {
          q: "¿Puedo pedir cambios después?",
          a: "Sí. Puedes pedirnos ajustes de textos, imágenes o precios. Para nuevas secciones o funciones te damos una cotización clara antes.",
        },
      ],
      projects: ["brisas-romana-green", "dimado", "el-panda"],
    },
  },
  {
    key: "automatizacion",
    slug: "automatizacion-de-procesos",
    title: ["Automatización", "de procesos"],
    service: "Automatización de procesos",
    description: "Soluciones inteligentes que ahorran tiempo y aumentan la productividad.",
    image: "/images/servicio-automatizacion.webp",
    crop: { zoom: 1.08, x: 40, y: 50 },
    accent: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8Z" {...stroke} />
      </svg>
    ),
    page: {
      metaTitle: "Automatización de procesos con IA en República Dominicana | NEXIX Studio",
      metaDescription:
        "Automatizamos tu negocio con inteligencia artificial: agentes de WhatsApp 24/7, agenda de citas, seguimiento de clientes y reportes automáticos.",
      heading: ["Automatiza lo repetitivo,", "enfócate en crecer"],
      lead: "Conectamos tus herramientas y usamos inteligencia artificial para que las tareas manuales se hagan solas: responder clientes, agendar citas, dar seguimiento y generar reportes.",
      includes: [
        { title: "Agentes de IA para WhatsApp", text: "Responden preguntas, califican clientes y envían información las 24 horas." },
        { title: "Citas y recordatorios", text: "Agenda automática con confirmaciones y recordatorios para reducir ausencias." },
        { title: "Seguimiento de clientes", text: "Mensajes y tareas de seguimiento para que ninguna venta se quede en el aire." },
        { title: "Integración de herramientas", text: "Conectamos WhatsApp, correo, hojas de cálculo, calendarios y tu CRM." },
        { title: "Reportes automáticos", text: "Recibe los números de tu negocio sin armar reportes a mano." },
        { title: "Flujos a tu medida", text: "Diseñamos cada automatización según cómo trabaja tu equipo." },
      ],
      benefits: [
        { title: "Ahorras horas cada semana", text: "Tu equipo deja de copiar, pegar y responder lo mismo una y otra vez." },
        { title: "Respuestas al instante", text: "Tus clientes reciben atención inmediata, incluso fuera de horario." },
        { title: "Menos errores", text: "Los procesos automáticos siguen siempre los mismos pasos." },
      ],
      idealFor: [
        "Negocios con muchos mensajes de WhatsApp",
        "Clínicas y consultorios con citas",
        "Equipos de ventas y cotizaciones",
        "Agencias de viaje y tours",
        "Financieras y solicitudes",
        "Áreas administrativas",
      ],
      steps: [
        { title: "Analizamos", text: "Revisamos tus procesos y detectamos qué se puede automatizar." },
        { title: "Diseñamos el flujo", text: "Te mostramos cómo funcionará antes de construirlo." },
        { title: "Implementamos", text: "Conectamos las herramientas y probamos con casos reales." },
        { title: "Mejoramos", text: "Medimos resultados y ajustamos para sacarle más provecho." },
      ],
      faqs: [
        {
          q: "¿Necesito conocimientos técnicos?",
          a: "No. Nosotros nos encargamos de todo lo técnico y te explicamos cómo usarlo con palabras simples.",
        },
        {
          q: "¿La IA reemplaza a mi equipo?",
          a: "No. Se encarga de lo repetitivo para que tu equipo se enfoque en cerrar ventas y atender mejor a los clientes.",
        },
        {
          q: "¿Con qué herramientas se conecta?",
          a: "WhatsApp Business, correo, Google Sheets, calendarios, CRM y muchas más. Primero revisamos las que ya usas.",
        },
        {
          q: "¿Cuánto tarda en estar lista?",
          a: "Depende de la complejidad. Las automatizaciones sencillas pueden estar listas en pocos días; los sistemas más completos se entregan por etapas con un cronograma claro.",
        },
      ],
    },
  },
  {
    key: "medida",
    slug: "soluciones-a-la-medida",
    title: ["Soluciones digitales", "a la medida"],
    service: "Soluciones digitales a la medida",
    description: "Desarrollos personalizados para las necesidades específicas de tu negocio.",
    image: "/images/servicio-soluciones-medida.webp",
    crop: { zoom: 1.06, x: 72, y: 50 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="12" width="4" height="8" rx="1" {...stroke} />
        <rect x="10" y="8" width="4" height="12" rx="1" {...stroke} />
        <rect x="16" y="4" width="4" height="16" rx="1" {...stroke} />
      </svg>
    ),
    page: {
      metaTitle: "Desarrollo de software a la medida en República Dominicana | NEXIX Studio",
      metaDescription:
        "Desarrollamos sistemas de reservas, cotizadores, paneles administrativos y plataformas web hechas exactamente para cómo trabaja tu negocio.",
      heading: ["Software hecho", "a la medida de tu negocio"],
      lead: "Cuando las herramientas genéricas no alcanzan, desarrollamos la solución exacta que tu operación necesita: sistemas de reservas, cotizadores, paneles de gestión y plataformas web.",
      includes: [
        { title: "Sistemas de reservas", text: "Reservas de citas, tours, traslados o espacios con disponibilidad en tiempo real." },
        { title: "Cotizadores en línea", text: "Tus clientes calculan precios y solicitan cotizaciones sin esperar." },
        { title: "Paneles administrativos", text: "Controla pedidos, clientes y reportes desde un solo lugar." },
        { title: "Portales para clientes", text: "Espacios privados para que tus clientes consulten y gestionen lo suyo." },
        { title: "Integraciones", text: "Conexión con pagos, WhatsApp, correo y otros servicios externos." },
        { title: "Crece por etapas", text: "Empezamos con lo esencial y agregamos funciones según avances." },
      ],
      benefits: [
        { title: "Hecho para tu forma de trabajar", text: "El sistema se adapta a tu negocio, no al revés." },
        { title: "Todo en un solo lugar", text: "Menos hojas sueltas y herramientas desconectadas." },
        { title: "Crece contigo", text: "Una base sólida para sumar funciones cuando las necesites." },
      ],
      idealFor: [
        "Tours, excursiones y traslados",
        "Financieras y solicitudes en línea",
        "Agencias de viaje",
        "Inmobiliarias y catálogos",
        "Clínicas y centros de servicios",
        "Comercios con procesos propios",
      ],
      steps: [
        { title: "Levantamiento", text: "Entendemos a fondo tu operación y lo que el sistema debe resolver." },
        { title: "Prototipo", text: "Validamos pantallas y flujos contigo antes de programar." },
        { title: "Desarrollo por etapas", text: "Entregas parciales para que veas el avance real." },
        { title: "Entrega y soporte", text: "Lanzamos, capacitamos a tu equipo y te acompañamos." },
      ],
      faqs: [
        {
          q: "¿En qué se diferencia de una página web?",
          a: "Una página web informa y genera contactos. Una solución a la medida hace trabajo por ti: reservas, cotizaciones, gestión de clientes o procesos internos.",
        },
        {
          q: "¿Puedo empezar con algo pequeño?",
          a: "Sí. Recomendamos empezar con lo esencial, validar que funciona y agregar funciones por etapas.",
        },
        {
          q: "¿Funciona en el celular?",
          a: "Sí. Todo lo que desarrollamos funciona en computadoras, tablets y celulares.",
        },
      ],
      projects: ["dominican-routes", "grupo-myj", "myj-travels"],
    },
  },
  {
    key: "consultoria",
    slug: "consultoria-tecnologica",
    title: ["Consultoría", "tecnológica"],
    service: "Consultoría tecnológica",
    description: "Te acompañamos en cada etapa para tomar las mejores decisiones digitales.",
    image: "/images/servicio-consultoria.webp",
    crop: { zoom: 1.12, x: 60, y: 45 },
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M10 3.5c.5 3.9 2.6 6 6.5 6.5-3.9.5-6 2.6-6.5 6.5-.5-3.9-2.6-6-6.5-6.5 3.9-.5 6-2.6 6.5-6.5Z" {...stroke} />
        <path d="M18 14.5c.25 1.9 1.1 2.75 3 3-1.9.25-2.75 1.1-3 3-.25-1.9-1.1-2.75-3-3 1.9-.25 2.75-1.1 3-3Z" {...stroke} />
      </svg>
    ),
    page: {
      metaTitle: "Consultoría tecnológica para empresas en República Dominicana | NEXIX Studio",
      metaDescription:
        "Te ayudamos a elegir las herramientas correctas, ordenar tus procesos y digitalizar tu negocio sin gastos innecesarios. Asesoría clara, sin tecnicismos.",
      heading: ["Toma mejores", "decisiones tecnológicas"],
      lead: "Te acompañamos a elegir las herramientas correctas, ordenar tus procesos y evitar gastos innecesarios en tecnología. Hablamos claro, sin tecnicismos.",
      includes: [
        { title: "Evaluación de tu tecnología", text: "Revisamos las herramientas y sistemas que usas hoy y cómo se conectan." },
        { title: "Recomendación de herramientas", text: "Te decimos qué software conviene a tu negocio y cuál no vale la pena." },
        { title: "Hoja de ruta digital", text: "Un plan por etapas para digitalizar tu operación con orden." },
        { title: "Acompañamiento", text: "Te guiamos durante la implementación para que todo salga bien." },
        { title: "Seguridad y respaldo", text: "Buenas prácticas para proteger tu información y tus cuentas." },
        { title: "Capacitación del equipo", text: "Enseñamos a tu equipo a sacarle provecho a cada herramienta." },
      ],
      benefits: [
        { title: "Evitas gastos innecesarios", text: "Inviertes solo en la tecnología que de verdad necesitas." },
        { title: "Decisiones con información", text: "Comparas opciones con criterios claros antes de comprometerte." },
        { title: "Un aliado técnico", text: "Tienes a quién preguntar cuando surge una duda tecnológica." },
      ],
      idealFor: [
        "Empresas que quieren digitalizarse",
        "Negocios con herramientas desconectadas",
        "Dueños sin equipo técnico propio",
        "Equipos que van a cambiar de sistema",
        "Negocios en crecimiento",
      ],
      steps: [
        { title: "Conversación inicial", text: "Nos cuentas tus retos y lo que quieres mejorar." },
        { title: "Evaluación", text: "Analizamos tus herramientas, procesos y costos actuales." },
        { title: "Recomendaciones", text: "Te entregamos opciones claras con pros, contras y prioridades." },
        { title: "Acompañamiento", text: "Te ayudamos a implementar y a medir los resultados." },
      ],
      faqs: [
        {
          q: "¿Necesito saber de tecnología para la consultoría?",
          a: "No. Nuestro trabajo es explicarte cada opción con palabras simples para que decidas con confianza.",
        },
        {
          q: "¿La consultoría incluye implementar las soluciones?",
          a: "Podemos quedarnos solo en la asesoría o acompañarte en la implementación; tú decides el alcance.",
        },
        {
          q: "¿Trabajan con empresas fuera de República Dominicana?",
          a: "Sí. La consultoría se puede hacer de forma remota por videollamada, WhatsApp y correo.",
        },
      ],
    },
  },
];

export function getServiceBySlug(slug: string | undefined) {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicePath(s: Service) {
  return `/servicios/${s.slug}`;
}
