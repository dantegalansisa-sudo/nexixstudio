/**
 * Textos legales de nexixstudio.com. Plantilla general para República
 * Dominicana (Ley 172-13 de protección de datos personales); conviene que un
 * abogado la revise antes de considerarla definitiva.
 */

export type LegalDoc = {
  slug: string;
  title: string;
  metaDescription: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

const CONTACT = "nexixstudio@gmail.com";
const UPDATED = "27 de septiembre de 2026";

export const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "politica-de-privacidad",
    title: "Política de privacidad",
    metaDescription:
      "Cómo NEXIX Studio recopila, usa y protege los datos personales que compartes en nexixstudio.com.",
    updated: UPDATED,
    intro:
      "En NEXIX Studio respetamos tu privacidad. Esta política explica qué datos personales recopilamos a través de nexixstudio.com, para qué los usamos y cuáles son tus derechos, conforme a la Ley No. 172-13 sobre Protección de Datos de Carácter Personal de la República Dominicana.",
    sections: [
      {
        heading: "1. Responsable del tratamiento",
        body: [
          `NEXIX Studio, con domicilio en Santo Domingo, República Dominicana, es responsable de los datos que nos compartes. Puedes contactarnos en ${CONTACT} o por WhatsApp al +1 (829) 523-4738.`,
        ],
      },
      {
        heading: "2. Datos que recopilamos",
        body: [
          "Formulario de contacto: nombre, correo electrónico, número de WhatsApp (opcional), el servicio que te interesa y el mensaje que escribas.",
          "WhatsApp: si nos escribes por WhatsApp, recibimos tu número, tu nombre de perfil y el contenido de la conversación, sujetos también a las políticas de WhatsApp.",
          "Datos técnicos: nuestro proveedor de alojamiento puede registrar datos técnicos básicos (dirección IP, navegador, fecha y hora de la visita) para la seguridad y el funcionamiento del sitio.",
        ],
      },
      {
        heading: "3. Para qué usamos tus datos",
        body: [
          "Responder tus consultas y preparar cotizaciones o propuestas.",
          "Darte seguimiento sobre la solicitud que nos enviaste.",
          "Prestar los servicios que contrates y cumplir obligaciones legales.",
          "No vendemos ni alquilamos tus datos, y no te enviaremos publicidad sin tu consentimiento.",
        ],
      },
      {
        heading: "4. Base legal",
        body: [
          "Tratamos tus datos con tu consentimiento, que otorgas al enviar el formulario o escribirnos, y cuando es necesario para preparar o ejecutar un contrato de servicios contigo.",
        ],
      },
      {
        heading: "5. Con quién compartimos tus datos",
        body: [
          "Solo con proveedores que nos ayudan a operar el sitio y a comunicarnos contigo, como el servicio de alojamiento web (Vercel), el servicio de envío de correos (Resend) y WhatsApp. Estos proveedores pueden procesar los datos fuera de la República Dominicana y están obligados a protegerlos.",
          "También podemos compartirlos cuando lo exija la ley o una autoridad competente.",
        ],
      },
      {
        heading: "6. Cuánto tiempo los conservamos",
        body: [
          "Conservamos tus datos mientras sean necesarios para atender tu solicitud o la relación comercial y, después, durante el tiempo que exijan las obligaciones legales aplicables. Luego los eliminamos o anonimizamos.",
        ],
      },
      {
        heading: "7. Tus derechos",
        body: [
          `Puedes solicitar el acceso, la rectificación, la cancelación (eliminación) de tus datos u oponerte a su uso escribiéndonos a ${CONTACT}. Responderemos en un plazo razonable y conforme a la ley.`,
        ],
      },
      {
        heading: "8. Cookies y almacenamiento",
        body: [
          "Este sitio no utiliza cookies de publicidad ni de seguimiento de terceros. Solo pueden usarse elementos técnicos estrictamente necesarios para que el sitio funcione. Si en el futuro incorporamos herramientas de analítica, actualizaremos esta política y, cuando corresponda, te pediremos consentimiento.",
        ],
      },
      {
        heading: "9. Seguridad",
        body: [
          "Aplicamos medidas técnicas y organizativas razonables para proteger tus datos, como conexión cifrada (HTTPS) y acceso restringido. Ningún sistema es completamente infalible, pero trabajamos para mantener tu información segura.",
        ],
      },
      {
        heading: "10. Menores de edad",
        body: ["Nuestros servicios están dirigidos a empresas y personas adultas. No recopilamos de forma intencional datos de menores de edad."],
      },
      {
        heading: "11. Cambios a esta política",
        body: [
          "Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha de actualización.",
        ],
      },
    ],
  },
  {
    slug: "terminos-y-condiciones",
    title: "Términos y condiciones",
    metaDescription: "Condiciones de uso de nexixstudio.com y condiciones generales de los servicios de NEXIX Studio.",
    updated: UPDATED,
    intro:
      "Estos términos regulan el uso del sitio web nexixstudio.com y establecen las condiciones generales de los servicios de NEXIX Studio. Al usar el sitio aceptas estos términos.",
    sections: [
      {
        heading: "1. Sobre NEXIX Studio",
        body: [
          "NEXIX Studio ofrece servicios de diseño y desarrollo web, automatización de procesos con inteligencia artificial, soluciones digitales a la medida, estrategia digital y consultoría tecnológica, con base en Santo Domingo, República Dominicana.",
        ],
      },
      {
        heading: "2. Uso del sitio",
        body: [
          "El contenido del sitio es informativo. Te comprometes a usarlo de forma lícita y a no intentar dañar, sobrecargar ni acceder sin autorización a sus sistemas.",
          "La información que envíes a través del formulario debe ser veraz.",
        ],
      },
      {
        heading: "3. Cotizaciones y contratación",
        body: [
          "La información publicada en el sitio no constituye una oferta vinculante. Cada proyecto se cotiza de forma individual.",
          "El alcance, los entregables, los plazos, el precio y la forma de pago de cada servicio se acuerdan por escrito en una propuesta o contrato, que prevalece sobre estos términos en caso de diferencia.",
          "Los plazos de entrega son estimados y dependen de que el cliente entregue a tiempo el contenido, los accesos y las aprobaciones necesarias.",
        ],
      },
      {
        heading: "4. Obligaciones del cliente",
        body: [
          "Proporcionar información, textos, imágenes y accesos necesarios para el proyecto.",
          "Garantizar que tiene los derechos sobre el material que entrega (logos, fotos, textos) y que su uso no infringe derechos de terceros.",
          "Revisar y aprobar las entregas en los plazos acordados.",
        ],
      },
      {
        heading: "5. Propiedad intelectual",
        body: [
          "El diseño, textos, imágenes y código de nexixstudio.com pertenecen a NEXIX Studio o a sus licenciantes y no pueden copiarse sin autorización.",
          "Los derechos sobre los trabajos desarrollados para un cliente se transfieren según lo acordado en la propuesta o contrato, normalmente una vez completado el pago. NEXIX Studio puede mostrar el proyecto en su portafolio, salvo acuerdo de confidencialidad.",
        ],
      },
      {
        heading: "6. Servicios de terceros",
        body: [
          "Algunos servicios dependen de terceros (dominios, hosting, WhatsApp Business, plataformas de inteligencia artificial, pasarelas de pago, entre otros). Su disponibilidad, precios y condiciones son responsabilidad de esos proveedores.",
        ],
      },
      {
        heading: "7. Enlaces externos",
        body: [
          "El sitio incluye enlaces a sitios de clientes y de terceros. No somos responsables de su contenido ni de sus políticas.",
        ],
      },
      {
        heading: "8. Limitación de responsabilidad",
        body: [
          "Hacemos nuestro mejor esfuerzo para que el sitio funcione correctamente y su información sea precisa, pero no garantizamos que esté libre de errores o interrupciones. En la medida permitida por la ley, NEXIX Studio no será responsable por daños indirectos derivados del uso del sitio.",
        ],
      },
      {
        heading: "9. Privacidad",
        body: ["El tratamiento de tus datos personales se rige por nuestra Política de privacidad."],
      },
      {
        heading: "10. Ley aplicable",
        body: [
          "Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se someterá a los tribunales competentes de Santo Domingo, salvo que la ley disponga otra cosa.",
        ],
      },
      {
        heading: "11. Contacto",
        body: [`Si tienes preguntas sobre estos términos, escríbenos a ${CONTACT}.`],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return LEGAL_DOCS.find((d) => d.slug === slug);
}
