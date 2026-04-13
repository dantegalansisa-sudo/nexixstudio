# CLAUDE.md — NEXIX Tech Studio (Web Oficial de la Agencia)
> Generado por Claude Chat · NEXIX Tech Studio · Dante Galán Sisa

---

## ⚠️ INSTRUCCIÓN #1 — LEER EL SKILL PRIMERO

Antes de escribir UNA SOLA línea de código, ejecuta:

```bash
curl -sL https://github.com/Leonxlnx/taste-skill/raw/main/SKILL.md | head -200
```

Este proyecto activa los **5 niveles completos** del NEXIX Taste Skill:
- ✅ CustomCursor magnético
- ✅ RevealText en todos los H1 y H2
- ✅ Parallax real en imágenes y hero
- ✅ MagneticButton en todos los CTAs
- ✅ Stagger grid en cards de servicios y equipo
- ✅ AnimatedCounter en stats

---

## ⚠️ INSTRUCCIÓN #2 — CHECKPOINT OBLIGATORIO

**Construye SOLO el Hero primero. Detente. Espera aprobación antes de continuar.**

---

## 🚫 REGLA ANTI-OSCURIDAD

- **PROHIBIDO** usar fondos `#000000` o negros puros en secciones de contenido
- **PROHIBIDO** usar `background: #111`, `#0d0d0d` o similares en secciones medias
- El Hero y el Footer SÍ pueden ser oscuros (navy profundo)
- Todas las secciones de contenido usan: `#FFFFFF`, `#F4F6FF`, `#F8FAFF`
- Las cards siempre sobre fondo blanco o crema muy claro

---

## 🏢 IDENTIDAD DE MARCA

**Nombre:** NEXIX Tech Studio  
**Tagline:** *El futuro digital de tu negocio comienza aquí*  
**Tagline alternativo:** *Websites que conquistan. Automatización que libera.*  
**Servicios core:** Desarrollo Web · Automatización con IA  
**Ubicación:** Santo Domingo / Azua, República Dominicana  
**Mercados:** RD + Internacional (Islas Canarias, España)  
**WhatsApp:** 829-523-4738  
**Instagram:** @nexixstudio  
**Dominio:** nexixstudio.com

---

## 🎨 PALETA DE COLORES

```css
:root {
  /* Fondos */
  --bg-dark:        #070B14;   /* Hero, Footer — negro profundo con tinte azul */
  --bg-dark-2:      #0D1525;   /* Secciones oscuras alternativas */
  --bg-light:       #FFFFFF;   /* Secciones principales de contenido */
  --bg-off:         #F4F7FF;   /* Secciones alternadas claras */
  --bg-card:        #FFFFFF;   /* Cards */

  /* Acento principal — Electric Blue */
  --primary:        #3B82F6;   /* Azul eléctrico principal */
  --primary-glow:   #3B82F620; /* Para glows y fondos sutiles */
  --primary-dark:   #1D4ED8;   /* Hover states */
  --primary-rgb:    59, 130, 246;

  /* Acento secundario — Cyan */
  --cyan:           #06B6D4;
  --cyan-glow:      #06B6D415;

  /* Texto */
  --text-on-dark:   #FFFFFF;
  --text-muted-dark:#94A3B8;   /* Párrafos sobre fondo oscuro */
  --text-on-light:  #0F172A;   /* Texto principal sobre fondo claro */
  --text-muted:     #64748B;   /* Párrafos sobre fondo claro */

  /* UI */
  --border-dark:    rgba(255,255,255,0.08);
  --border-light:   rgba(15,23,42,0.08);
  --radius-card:    20px;
  --radius-btn:     50px;
}
```

---

## 🔤 TIPOGRAFÍA

```css
/* Google Fonts — importar en index.html */
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

:root {
  --font-display: 'Syne', sans-serif;   /* Headings, nav, botones — personalidad */
  --font-body:    'Inter', sans-serif;  /* Cuerpo de texto — legibilidad */
}

h1 { font-family: var(--font-display); font-size: clamp(3.2rem, 6vw, 6.5rem); font-weight: 800; line-height: 1.05; }
h2 { font-family: var(--font-display); font-size: clamp(2.2rem, 4vw, 3.8rem); font-weight: 700; line-height: 1.1; }
h3 { font-family: var(--font-display); font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 600; }
p  { font-family: var(--font-body);    font-size: 1.05rem; line-height: 1.75; }
```

---

## 📐 LAYOUT BASE

```css
section { padding: 120px 0; }
.container { max-width: 1320px; margin: 0 auto; padding: 0 64px; }

@media (max-width: 768px) {
  section { padding: 80px 0; }
  .container { padding: 0 24px; }
}
```

---

## 🧱 STACK TÉCNICO

```
React + TypeScript + Vite + Framer Motion + Vanilla CSS
```

- **NUNCA usar Tailwind CSS**
- **NUNCA usar CSS Modules** — todo en archivos `.css` planos
- Framer Motion v10+ para todas las animaciones
- React Router v6 para rutas (si se necesitan páginas internas)

---

## 📁 ESTRUCTURA DEL PROYECTO

```
nexix-studio/
├── public/
│   ├── favicon.ico
│   └── og-image.jpg
├── src/
│   ├── components/
│   │   ├── CustomCursor.tsx        ← NIVEL 1 del Skill
│   │   ├── RevealText.tsx          ← NIVEL 2 del Skill
│   │   ├── MagneticButton.tsx      ← NIVEL 4 del Skill
│   │   ├── AnimatedCounter.tsx     ← BONUS del Skill
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Team.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   └── WhatsAppFAB.tsx
│   ├── hooks/
│   │   └── useParallax.ts          ← NIVEL 3 del Skill
│   ├── utils/
│   │   └── easings.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
└── tsconfig.json
```

---

## 🗂️ SECCIONES — ESPECIFICACIÓN COMPLETA

---

### 1. NAVBAR

**Fondo:** Transparente sobre el hero → blur glass al hacer scroll  
**Altura:** 72px  
**Comportamiento scroll:** `backdrop-filter: blur(20px)` + `background: rgba(7,11,20,0.85)` al scrollear más de 60px  

**Logo:**
- Texto: **NEXIX** en `Syne 800` color `var(--primary)`
- Subtext pequeño: **TECH STUDIO** en `Inter 500` color `var(--text-muted-dark)` letra espaciada
- O usar el logo SVG si Dante lo provee

**Links de navegación** (centrados):
- Servicios · Proceso · Portafolio · Equipo · Contacto

**CTA Button** (derecha):
- Texto: "Iniciar Proyecto →"
- Estilo: `background: var(--primary)` · `border-radius: 50px` · `padding: 10px 24px`
- Usa `<MagneticButton>`

**Mobile:** Hamburger menu con panel lateral que slide desde la derecha

---

### 2. HERO ← CONSTRUIR PRIMERO · DETENTE AQUÍ

**Fondo:** `var(--bg-dark)` con efecto de **grid de puntos animados** (CSS grid pattern con partículas sutiles)  
**Layout:** Full viewport height (100vh) · Contenido centrado vertical y horizontalmente  

**Efecto de fondo — Grid Animado:**
```css
.hero {
  background-color: var(--bg-dark);
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(59,130,246,0.12) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(6,182,212,0.08) 0%, transparent 40%),
    radial-gradient(rgba(59,130,246,0.15) 1px, transparent 1px);
  background-size: auto, auto, 40px 40px;
}
```

**Contenido del Hero (columna centrada):**

1. **Badge pill** (anima primero, antes del H1):
   ```
   ⚡ Agencia Digital en República Dominicana
   ```
   Estilo: border `1px solid rgba(59,130,246,0.4)` · `background: rgba(59,130,246,0.08)` · `border-radius: 50px` · `padding: 6px 18px` · color `var(--primary)`

2. **H1** — `<RevealText>` con stagger por palabra:
   ```
   Construimos el Futuro Digital de tu Negocio
   ```
   Color: `var(--text-on-dark)`  
   Palabra(s) "Futuro Digital" en `var(--primary)` o con `background-clip: text` degradado azul→cyan

3. **Párrafo subtítulo** (fade in después del H1):
   ```
   Webs que conquistan mercados. Automatización con IA que elimina el trabajo repetitivo.
   Somos el equipo tech que tu empresa necesitaba.
   ```
   Color: `var(--text-muted-dark)` · max-width: 560px · centrado

4. **Botones CTA** (stagger entrada):
   - `<MagneticButton>` primario: "Quiero mi Web →" → enlaza a WhatsApp
   - `<MagneticButton>` secundario (outline): "Ver Portafolio" → scroll a #portafolio
   
   Gap entre botones: 16px

5. **Social proof pills** (debajo de los botones, separados por `·`):
   ```
   ✓ +15 proyectos entregados  ·  ✓ RD y España  ·  ✓ Respuesta en 24h
   ```
   Texto pequeño, color `var(--text-muted-dark)`

**Scroll Indicator** (bottom del hero):
- Chevron animado rebotando hacia abajo
- Texto: "Scroll" en `Inter 400` pequeño

**Parallax:** El contenido del hero hace `y: useTransform(scrollYProgress, [0,0.4], [0, 80])` y `opacity` fade al scrollear

---

### 3. STATS (Contadores)

**Fondo:** `var(--bg-dark)` (continúa desde el hero, sin quiebre visual) con línea divisora sutil  
**Layout:** Fila horizontal de 4 stats, centrados, con separadores verticales  

**Los 4 stats:**

| Número | Sufijo | Label |
|--------|--------|-------|
| 15 | + | Proyectos Entregados |
| 2 | | Países Atendidos |
| 100 | % | Clientes Satisfechos |
| 24 | h | Tiempo de Respuesta |

Cada stat:
- Número: `Syne 800` · `clamp(2.5rem, 5vw, 4rem)` · color `var(--primary)`
- Sufijo: mismo tamaño · color `var(--cyan)`
- Label: `Inter 400` · `0.95rem` · color `var(--text-muted-dark)`

Usa `<AnimatedCounter>` para los números.  
Separadores verticales: `1px solid var(--border-dark)` entre cada stat.

---

### 4. SERVICIOS

**Fondo:** `var(--bg-light)` → blanco puro  
**Título de sección:**
```
<RevealText tag="h2">Lo Que Construimos Para Ti</RevealText>
```
Subtítulo: "Dos servicios. Un solo objetivo: que tu negocio domine su mercado."

**Layout:** 2 cards grandes tipo "feature card" en fila (no grid pequeño)

#### Card A — Desarrollo Web
**Icono:** SVG de monitor/código · color `var(--primary)`  
**Título:** "Sitios Web de Alto Impacto"  
**Descripción:**  
"Diseñamos y desarrollamos webs que no solo se ven increíbles — convierten visitantes en clientes. Restaurantes, clínicas, negocios locales, tiendas online. Si lo imaginas, lo construimos."

**Lista de bullets:**
- ✦ Landing pages & sitios corporativos
- ✦ E-commerce y tiendas online
- ✦ Portafolios profesionales
- ✦ SEO técnico incluido
- ✦ Dominio + hosting configurado

**CTA:** "Empezar mi Web →"

**Estilo card:**
- `background: var(--bg-card)` · `border: 1px solid var(--border-light)`
- `border-radius: var(--radius-card)` · `padding: 56px 48px`
- Hover: `border-color: var(--primary)` + sutil glow `box-shadow: 0 0 40px rgba(59,130,246,0.1)`
- Línea decorativa en el top de la card: `4px solid var(--primary)` o degradado azul→cyan

#### Card B — Automatización con IA
**Icono:** SVG de robot/circuito/brain · color `var(--cyan)`  
**Título:** "Automatización Inteligente con IA"  
**Descripción:**  
"Agentes de IA y flujos de trabajo automáticos que hacen en segundos lo que te toma horas. WhatsApp, correos, CRM, reservas — automatizados y corriendo 24/7 sin que tú hagas nada."

**Lista de bullets:**
- ✦ Chatbots con IA para WhatsApp
- ✦ Flujos de respuesta automática
- ✦ Agentes de ventas digitales
- ✦ Integración con CRMs y APIs
- ✦ Notificaciones y reportes automáticos

**CTA:** "Automatizar mi Negocio →"

**Estilo card:** Igual que Card A pero con acento `var(--cyan)` en la línea del top y el hover glow.

**Animación:** `containerVariants` + `cardVariants` del Skill Nivel 5.

---

### 5. PROCESO ("Cómo Trabajamos")

**Fondo:** `var(--bg-off)` — `#F4F7FF`  
**Título:**
```
<RevealText tag="h2">Tu Proyecto, Paso a Paso</RevealText>
```
Subtítulo: "Un proceso claro, sin sorpresas. Sabes exactamente qué pasa y cuándo."

**Layout:** 4 pasos en línea horizontal con línea conectora entre ellos (desktop). Stack vertical en mobile.

**Los 4 pasos:**

| # | Ícono | Título | Descripción |
|---|-------|--------|-------------|
| 01 | 💬 | Conversamos | Entendemos tu negocio, tus metas y lo que necesitas. Sin tecnicismos. |
| 02 | 🎨 | Diseñamos | Creamos el concepto visual y la estructura. Tú apruebas antes de continuar. |
| 03 | ⚡ | Construimos | Desarrollo ágil con actualizaciones constantes. Ves el progreso en tiempo real. |
| 04 | 🚀 | Lanzamos | Entrega, dominio, hosting y soporte post-lanzamiento incluido. |

Cada paso:
- Número `01`, `02`, etc. en grande · `Syne 700` · color `var(--primary)` semi-transparente (opacity 0.15) de fondo
- Ícono encima del número
- Título en `Syne 600`
- Descripción en `Inter 400` · color `var(--text-muted)`
- Línea conectora horizontal entre pasos: `2px dashed rgba(59,130,246,0.3)`

**Animación:** Stagger entrada con `containerVariants`.

---

### 6. PORTAFOLIO

**Fondo:** `var(--bg-light)`  
**Título:**
```
<RevealText tag="h2">Trabajo Que Habla Por Sí Solo</RevealText>
```
Subtítulo: "Proyectos reales para negocios reales — en República Dominicana y más allá."

**Layout:** Grid de 3 columnas · 2 filas (6 proyectos iniciales)

**Los 6 proyectos a mostrar:**

| Proyecto | Tipo | Descripción corta |
|----------|------|-------------------|
| El Panda Restaurante | 🍽️ Restaurante | Web completa con menú y reservas |
| Centro Odontológico Dimado | 🦷 Clínica Dental | Primer cliente NEXIX — diseño profesional |
| Elite Dental Care | 🦷 Clínica Dental | Web premium con equipo médico destacado |
| Hotel Montemar Azua | 🏨 Hotelería | Presencia digital para turismo local |
| Mentol Motors | 🚗 Automotriz | Vitrina digital para venta de vehículos |
| Lavandería Lava Fácil | 🧺 Servicios | Web simple y efectiva para negocio local |

**Card de proyecto:**
- Imagen placeholder (Pexels): foto representativa de la industria
- Overlay oscuro al hover con:
  - Nombre del proyecto
  - Tipo de negocio
  - Botón "Ver Proyecto →" 
- `border-radius: 16px` · `overflow: hidden`
- Efecto: `scale(1.03)` + overlay aparece en hover
- ClipPath reveal entrada (Skill NIVEL 3 bonus)

**Filtro de categorías** (encima del grid):
Chips filtrables: Todos · Web · Clínicas · Restaurantes · Servicios

**CTA debajo del grid:**
"¿Tu negocio podría ser el próximo? → Hablemos" (link a WhatsApp)

---

### 7. EQUIPO

**Fondo:** `var(--bg-off)` — `#F4F7FF`  
**Título:**
```
<RevealText tag="h2">Las Personas Detrás de NEXIX</RevealText>
```
Subtítulo: "Un equipo pequeño, enfocado y muy bueno en lo que hace."

**Layout:** 4 cards en fila (2x2 en tablet, 1 columna en mobile)

**Los 4 miembros:**

| Foto | Nombre | Rol | Descripción |
|------|--------|-----|-------------|
| 📸 Foto Dante | Dante Galán Sisa | Fundador & CEO | Arquitecto de experiencias digitales. Convierte ideas de negocio en productos web que funcionan. |
| 📸 Foto Paola | Paola Torres | Operaciones | Mantiene los proyectos en tiempo, los clientes informados y el equipo enfocado. |
| 📸 Foto Carlos | Carlos Cordero | Negocios Internacionales | Expansión de NEXIX hacia mercados europeos. Relaciones y prospección en Canarias. |
| 📸 Foto Rony | Rony Geraldo | Marketing | La voz de NEXIX en redes. Estrategia de contenido y presencia de marca digital. |

**Card de equipo:**
- Foto circular o cuadrada con `border-radius: 16px`
- Nombre en `Syne 700`
- Rol en `var(--primary)` · `Inter 500`
- Descripción en `Inter 400` · color `var(--text-muted)` · pequeño
- Hover: card sube `y: -8px` + sutil sombra

**Animación:** `containerVariants` + `cardVariants` (Skill NIVEL 5)

---

### 8. TESTIMONIALES

**Fondo:** `var(--bg-dark-2)` — `#0D1525` (sección oscura para contraste emocional)  
**Título:**
```
<RevealText tag="h2">Lo Que Dicen Nuestros Clientes</RevealText>
```

**Layout:** Slider horizontal (3 testimonios visibles, con arrows y dots)

**3 Testimonios iniciales (placeholder real):**

1. **Edward Santana** — Café Maná, San José de Ocoa  
   *"NEXIX entendió nuestra esencia desde el primer día. La web de Café Maná refleja exactamente lo que somos. Nuestros clientes la aman."*

2. **Dr. (placeholder)** — Centro Odontológico Dimado  
   *"Desde que lanzamos la web hemos recibido más consultas por WhatsApp. El equipo de NEXIX fue profesional y muy ágil con los cambios."*

3. **Roosevelt Méndez** — NativeArt55 Artesanía  
   *"Crearon algo hermoso que representa el trabajo artesanal dominicano con dignidad. Gracias NEXIX por elevar nuestra marca."*

**Card de testimonio:**
- Quote grande `"` decorativo · color `var(--primary)` opacidad 0.3
- Texto en `Inter 400` italic · color `var(--text-muted-dark)`
- Nombre en `Syne 600` · color `var(--text-on-dark)`
- Empresa/Negocio en `var(--primary)` pequeño
- Avatar (iniciales en círculo si no hay foto)
- `background: rgba(255,255,255,0.04)` · `border: 1px solid var(--border-dark)` · `border-radius: 20px`

---

### 9. CTA FINAL ("Empieza Tu Proyecto")

**Fondo:** Degradado: `linear-gradient(135deg, #1D4ED8 0%, #06B6D4 100%)`  
**Layout:** Centrado · Padding: `120px 0`

**Contenido:**
```
¿Listo para que tu negocio  
tenga la presencia digital que merece?
```
H2 en blanco puro · `Syne 800`

Párrafo:
"Hablemos hoy. Sin compromisos. Cuéntanos tu idea y te decimos exactamente cómo podemos ayudarte."

**2 botones:**
- `<MagneticButton>` blanco sólido: "WhatsApp → Chatear Ahora" (link directo)
- `<MagneticButton>` outline blanco: "Instagram @nexixstudio"

**Detalle visual:** Formas geométricas abstractas animadas (círculos y líneas) como fondo decorativo, muy sutiles, con `opacity: 0.1`

---

### 10. FOOTER

**Fondo:** `var(--bg-dark)` — `#070B14`  
**Layout:** Grid de 4 columnas en desktop, 2 en tablet, 1 en mobile

**Columna 1 — Logo + tagline:**
- Logo NEXIX grande
- "Websites que conquistan. Automatización que libera."
- Íconos sociales: Instagram, WhatsApp

**Columna 2 — Servicios:**
- Desarrollo Web
- Automatización con IA
- Consultoría Digital
- SEO y Posicionamiento

**Columna 3 — Empresa:**
- Sobre NEXIX
- Portafolio
- Equipo
- Blog (próximamente)

**Columna 4 — Contacto:**
- 📱 829-523-4738
- 📸 @nexixstudio
- 🌐 nexixstudio.com
- 📍 Santo Domingo, República Dominicana

**Línea inferior:**
```
© 2025 NEXIX Tech Studio · Todos los derechos reservados · Hecho con ❤️ en República Dominicana
```

Color: `var(--text-muted-dark)` · `border-top: 1px solid var(--border-dark)`

---

### 11. WHATSAPP FAB

```tsx
// Posición: fixed · bottom: 28px · right: 28px · z-index: 9000
// Botón circular 60x60px · background: #25D366
// Ícono WhatsApp SVG blanco
// Pulse animation: anillo verde que se expande cada 3s
// Link: https://wa.me/18295234738?text=Hola%20NEXIX%2C%20quiero%20información%20sobre%20sus%20servicios
// Tooltip al hover: "Chatea con nosotros"
// Entrada: slide desde bottom-right al cargar la página (delay 2s)
```

---

## 📸 INVENTARIO DE FOTOS REQUERIDAS

> Usar Pexels como placeholder hasta que Dante provea fotos reales.

| # | Foto | Dónde se usa | Pexels query sugerida |
|---|------|--------------|----------------------|
| 1 | Foto Dante | Team card | — (foto real del CEO) |
| 2 | Foto Paola Torres | Team card | — (foto real) |
| 3 | Foto Carlos Cordero | Team card | — (foto real) |
| 4 | Foto Rony Geraldo | Team card | — (foto real) |
| 5 | El Panda Restaurante | Portfolio card | "restaurant interior dominican" |
| 6 | Odontológico Dimado | Portfolio card | "dental clinic modern" |
| 7 | Elite Dental Care | Portfolio card | "dentist office clean blue" |
| 8 | Hotel Montemar | Portfolio card | "hotel lobby dominican republic" |
| 9 | Mentol Motors | Portfolio card | "car dealership modern" |
| 10 | Lava Fácil | Portfolio card | "laundry service clean" |
| 11 | Hero background opcional | Hero section | — (fondo es CSS puro, no foto) |

---

## 🎯 ANIMACIONES ESPECÍFICAS DE NEXIX STUDIO

### Hero — Partícula flotante de código
Elemento decorativo en la esquina derecha del hero: código TypeScript o HTML que "flota" con animación de typing, en una ventana estilo VS Code. Muy sutil, opacity 0.6. Altura ~220px, ancho ~320px. Usa `whileInView` con efecto de escritura progresiva.

### Services — Hover 3D card tilt
Las cards de servicios responden al movimiento del mouse con un sutil efecto 3D tilt (rotateX, rotateY máximo ±8°). Implementar con `useMotionValue` + `useTransform`.

### Portfolio — Número de proyecto grande de fondo
En la card de portfolio al hover, aparece el número del proyecto (`01`, `02`, etc.) en enorme (200px) como watermark de fondo, color primario muy transparente.

### Stats — Línea progresiva
Al entrar en viewport, una línea azul progresa de 0% a 100% del ancho de la sección (debajo del row de stats) — tipo "loading bar" de logro.

---

## 🔧 CONFIGURACIÓN TÉCNICA

### vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: { outDir: 'dist' },
})
```

### index.html — Meta tags SEO
```html
<title>NEXIX Tech Studio | Desarrollo Web & IA en República Dominicana</title>
<meta name="description" content="Agencia de desarrollo web y automatización con IA en Santo Domingo, RD. Construimos websites premium y agentes de IA para negocios locales e internacionales.">
<meta property="og:title" content="NEXIX Tech Studio">
<meta property="og:description" content="Websites que conquistan. Automatización que libera.">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://nexixstudio.com">
<link rel="canonical" href="https://nexixstudio.com">
```

---

## ✅ CHECKLIST FINAL ANTES DE ENTREGAR

### Nexix Taste Skill — 5 Niveles
- [ ] CustomCursor funcionando en desktop, desactivado en mobile
- [ ] RevealText en H1 del Hero
- [ ] RevealText en H2 de cada sección
- [ ] Parallax en el hero (scroll zoom)
- [ ] MagneticButton en todos los CTAs principales
- [ ] Stagger grid en cards de Servicios
- [ ] Stagger grid en cards de Portafolio
- [ ] Stagger grid en cards de Equipo
- [ ] AnimatedCounter en Stats

### Diseño
- [ ] Navbar transparente → blur al scrollear
- [ ] Hero con grid de puntos CSS y glows de color
- [ ] Badge pill animado antes del H1
- [ ] 2 cards grandes de servicios con hover glow
- [ ] 4 pasos del proceso con línea conectora
- [ ] Grid de 6 proyectos con hover overlay
- [ ] Filtros de categorías funcionales en Portafolio
- [ ] 4 cards del equipo
- [ ] Slider de testimoniales con arrows
- [ ] CTA final con degradado azul→cyan
- [ ] Footer completo con 4 columnas
- [ ] WhatsApp FAB con pulse animation

### Performance
- [ ] `npm run build` sin errores TypeScript
- [ ] Sin imágenes >500KB (comprimir con Pexels)
- [ ] Fuentes cargando de Google Fonts
- [ ] Sin `console.error` en la consola

### NO usar en ningún caso
- [ ] ❌ Tailwind CSS
- [ ] ❌ Fondo negro puro en secciones de contenido
- [ ] ❌ Componentes de UI externos (shadcn, chakra, etc.)
- [ ] ❌ `any` en TypeScript

---

## 🚀 PRIMER PROMPT PARA CLAUDE CODE

```
Lee el skill en https://github.com/Leonxlnx/taste-skill/raw/main/SKILL.md

Estás construyendo la web oficial de NEXIX Tech Studio, una agencia de desarrollo web y automatización con IA de República Dominicana. El CLAUDE.md está en el proyecto.

INSTRUCCIÓN: Construye ÚNICAMENTE la sección Hero primero. Luego detente y espera mi aprobación.

Stack: React + TypeScript + Vite + Framer Motion + Vanilla CSS (SIN Tailwind).

El Hero debe incluir:
1. Navbar transparente con logo NEXIX (Syne 800, color #3B82F6) + links + botón CTA magnético
2. Fondo #070B14 con grid de puntos CSS (radial-gradient) y 2 glows de color (azul y cyan)
3. Badge pill animado "⚡ Agencia Digital en República Dominicana"
4. H1 con RevealText: "Construimos el Futuro Digital de tu Negocio" (palabras "Futuro Digital" en color azul)
5. Párrafo subtítulo con fade-in
6. 2 botones MagneticButton (primario y outline)
7. Social proof pills debajo
8. CustomCursor activo
9. Scroll indicator con bounce

Fondo siempre oscuro SOLO en el hero. Las secciones de contenido son blancas.
```

---

*NEXIX Tech Studio · CLAUDE.md v1.0 · Generado por Claude Chat*  
*La web de la agencia — el proyecto más importante del portafolio*