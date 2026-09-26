/**
 * Portafolio NEXIX — edit this file to add or reorder projects.
 * The first project is the featured one (large card + "Proyecto destacado").
 *
 * Screenshots live in /public/images/portafolio/<slug>-{desktop,desktop-tall,mobile}.webp
 * (desktop 1440×900 above the fold, desktop-tall = first ~2700px for the hover scroll,
 * mobile 390×844).
 */

export type PortfolioCategory = "salud" | "turismo" | "gastronomia" | "finanzas" | "inmobiliaria";

export type PortfolioProject = {
  slug: string;
  name: string;
  client?: string;
  sector: string; // label shown on the card
  category: PortfolioCategory; // filter tab
  url: string;
  description: string;
  images: {
    desktop: string;
    desktopTall: string;
    mobile: string;
  };
};

export const PORTFOLIO_FILTERS: { key: "todos" | PortfolioCategory; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "salud", label: "Salud" },
  { key: "turismo", label: "Turismo y Viajes" },
  { key: "gastronomia", label: "Gastronomía" },
  { key: "finanzas", label: "Finanzas" },
  { key: "inmobiliaria", label: "Inmobiliaria" },
];

const shots = (slug: string) => ({
  desktop: `/images/portafolio/${slug}-desktop.webp`,
  desktopTall: `/images/portafolio/${slug}-desktop-tall.webp`,
  mobile: `/images/portafolio/${slug}-mobile.webp`,
});

export const PORTFOLIO: PortfolioProject[] = [
  {
    slug: "dominican-routes",
    name: "Dominican Routes",
    sector: "Turismo · Excursiones y traslados",
    category: "turismo",
    url: "https://dominicanroutes.com",
    description: "Traslados y excursiones en Punta Cana con reserva en línea.",
    images: shots("dominican-routes"),
  },
  {
    slug: "grupo-myj",
    name: "Grupo Financiero MYJ",
    sector: "Finanzas",
    category: "finanzas",
    url: "https://grupofinancieromyj.com",
    description: "Plataforma de préstamos con solicitud en línea y aprobación rápida.",
    images: shots("grupo-myj"),
  },
  {
    slug: "brisas-romana-green",
    name: "Brisas de Romana Green",
    client: "Oliujs Inmobiliaria",
    sector: "Inmobiliaria",
    category: "inmobiliaria",
    url: "https://www.brisasderomanagreen.com",
    description: "Proyecto residencial en La Romana con galería, amenidades y precios.",
    images: shots("brisas-romana-green"),
  },
  {
    slug: "dimado",
    name: "Centro Odontológico Dimado",
    sector: "Salud",
    category: "salud",
    url: "https://www.dimadocentro.com",
    description: "Web para clínica dental con agenda de citas y perfiles de especialistas.",
    images: shots("dimado"),
  },
  {
    slug: "elite-dental",
    name: "Elite Dental Care",
    sector: "Salud",
    category: "salud",
    url: "https://elitedentalcarerd.com",
    description: "Sitio de ortodoncia con servicios, reseñas y agendamiento directo.",
    images: shots("elite-dental"),
  },
  {
    slug: "taveras-de-lama",
    name: "Centro Odontológico Taveras de Lama",
    sector: "Salud",
    category: "salud",
    url: "https://www.odontotavedlama.com",
    description: "Centro odontológico familiar con reservas, equipo y eventos.",
    images: shots("taveras-de-lama"),
  },
  {
    slug: "el-panda",
    name: "El Panda Restaurante",
    sector: "Gastronomía",
    category: "gastronomia",
    url: "https://elpandarestaurante.com",
    description: "Restaurante de mariscos en Azua con menú digital y reservas por WhatsApp.",
    images: shots("el-panda"),
  },
  {
    slug: "myj-travels",
    name: "MYJ Travels",
    sector: "Viajes",
    category: "turismo",
    url: "https://myjtravels.com",
    description: "Agencia de viajes con cotizador de vuelos, hoteles y paquetes.",
    images: shots("myj-travels"),
  },
  {
    slug: "waooo-tours",
    name: "WAOOO Tours",
    sector: "Turismo · Excursiones",
    category: "turismo",
    url: "https://waoootoursrd.com",
    description: "Excursiones en Punta Cana con catálogo, filtros y reserva rápida.",
    images: shots("waooo-tours"),
  },
];

/** Hostname for the fake browser address bar. */
export function displayHost(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}
