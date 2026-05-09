<div align="center">


# 🌿 Sutura del Eco en Bolognía

**Plataforma web interactiva de documentación arquitectónica y urbana**

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![Model Viewer](https://img.shields.io/badge/Model_Viewer-3.4.0-4CAF50?style=for-the-badge&logo=google&logoColor=white)](https://modelviewer.dev/)

[![Estado](https://img.shields.io/badge/Estado-En_Desarrollo-orange?style=flat-square)]()
[![Curso](https://img.shields.io/badge/Curso-Urbanismo_UT302-7c5cbf?style=flat-square)]()
[![Facultad](https://img.shields.io/badge/FAADU-Arquitectura-9e5447?style=flat-square)]()
[![Animales](https://img.shields.io/badge/Fauna_Documentada-20_Especies-8faa5c?style=flat-square)]()

</div>

---

## 📖 Descripción del Proyecto

**Eco en Bolognía** es una plataforma web de presentación arquitectónica desarrollada para el curso **Urbanismo UT302** de la Facultad de Arquitectura, Artes, Diseño y Urbanismo (FAADU) de la **Universidad Mayor de San Andrés (UMSA)**, La Paz, Bolivia.

El proyecto propone una **estrategia de acupuntura urbana** que combate la desmembración del barrio de Bolognía mediante intervenciones que articulan el tejido urbano con el área natural protegida. La plataforma web sirve como documento digital interactivo que permite explorar:

- El modelo 3D del área de intervención
- La fauna nativa del ecosistema de Bolognía
- Las propuestas de intervención moradas y amarillas
- Los paneles gráficos de diagnóstico y propuesta

> *"Una arteria amarilla de losetas podotáctiles y arte que rehabilita plazas, parques y el Pasaje de la Queñua, cosiendo el tejido vecinal con el área protegida."*

---

## ✨ Características

### 🗺️ Modelo 3D Interactivo
- Visualización del modelo urbano en formato **`.glb`** mediante **Google Model Viewer 3.4**
- **Hotspots dinámicos** posicionados en coordenadas 3D reales del modelo
- Escala adaptativa de los hotspots en función de la distancia de la cámara
- Sistema de **leyenda por color** para categorizar los puntos de información:
  - 🟢 **Verde** → Fauna local
  - 🟣 **Morado** → Proyectos de intervención
  - 🟡 **Amarillo** → Tejido podotáctil
  - 🔴 **Rojo** → Áreas intervenidas

### 🦜 Catálogo de Fauna
- **20 especies documentadas** de la fauna nativa del área protegida de Bolognía
- Cards interactivas con foto circular, nombre común y nombre científico
- **Reproductor de audio** integrado para escuchar el canto de cada especie
- Sistema de audio singleton (solo se reproduce un audio a la vez)

### 🏗️ Propuestas Urbanas
Sistema de dos tipos de intervención con modales detallados:

| Tipo | Color | Descripción |
|------|-------|-------------|
| **Intervención Morada** | 🟣 `#7c5cbf` | Mejora de plazas, parques y espacios públicos |
| **Intervención Amarilla** | 🟡 `#e6b800` | Seguridad y accesibilidad vial / podotáctil |

- Galería con **9 sub-intervenciones moradas** documentadas con imagen y descripción
- Modal de zoom con soporte para **rueda del ratón, drag y pinch táctil**

### 📄 Visor de Paneles
- Visualización de paneles gráficos en formato **PDF e imagen**
- Controles de zoom: `+` / `-` / `↺` reset
- Navegación por teclado: `←` `→` `Esc`
- Soporte completo para **gestos táctiles** (pinch zoom + arrastre)

---

## 🗂️ Estructura del Proyecto

```
eco-en-bologna/
│
├── index.html              # Página principal (single-page)
│
├── css/
│   └── styles.css          # Estilos globales (variables, componentes, modales)
│
├── js/
│   ├── animales.js         # 📋 Base de datos de las 36 especies (EDITABLE)
│   ├── propuestas.js       # 📋 Datos de intervenciones moradas/amarillas (EDITABLE)
│   ├── fauna.js            # Poblado dinámico de cards de fauna en el modelo
│   ├── hotspots.js         # Lógica de hotspots 3D, modales y zoom
│   ├── audio.js            # Reproductores de audio (modelo + cards fauna)
│   ├── menu.js             # Hamburger menu y navegación
│   └── paneles.js          # Visor de paneles con zoom/drag/touch
│
├── fotos/                  # Fotos circulares de cada especie (ej: 1.jpeg, 2.jpg...)
├── audios/                 # Archivos de audio de cantos (ej: 1.mp3, 2.mp3...)
├── propuestas/             # Imágenes de las intervenciones
├── paneles/                # PDFs e imágenes preview de los paneles gráficos
│
├── Bolognia.glb            # Modelo 3D del área de intervención
└── Bolognia.skp            # Archivo fuente SketchUp del modelo
```

---

## 🚀 Instalación y Uso

### Requisitos
- Navegador moderno con soporte WebGL (Chrome, Firefox, Edge, Safari)
- **No requiere** backend ni dependencias npm — es 100% estático

### Ejecución local

```bash
# Opción 1: Con VS Code Live Server (recomendado)
# Instala la extensión "Live Server" y haz clic derecho → "Open with Live Server"

# Opción 2: Con Python
python -m http.server 8080

# Opción 3: Con Node.js
npx serve .

# Luego abre: http://localhost:8080
```

> ⚠️ **Importante:** El modelo `.glb` requiere un servidor HTTP para cargarse. Abrir `index.html` directamente desde el explorador de archivos (`file://`) bloqueará la carga por restricciones CORS.

---

## 🦉 Agregar o Editar Fauna

El archivo **`js/animales.js`** es la única fuente de datos de las especies. Cada entrada sigue esta estructura:

```js
'animal-01': {
  nombre:     'Colibrí Cometa',          // Nombre común
  cientifico: 'Sappho Sparganurus',      // Nombre científico (aparece en cursiva)
  emoji:      '🐦',                      // Fallback si no hay imagen
  imagen:     'fotos/1.jpeg',            // Ruta a la foto (null si no disponible)
  color:      '#8faa5c',                 // Color de acento del card
  audio:      'audios/1.mp3',            // Ruta al audio (null si no disponible)
},
```

**Colores de acento disponibles en el proyecto:**

| Color | Hex | Uso sugerido |
|-------|-----|--------------|
| 🟢 Verde oliva | `#8faa5c` | Aves de follaje |
| 🟤 Tierra | `#b09c85` | Aves terrestres |
| 🔴 Terracota | `#9e5447` | Aves rapaces |
| 🟠 Durazno | `#d4906e` | Aves de altura |

---

## 🏛️ Intervenciones Documentadas

### 🟣 Intervenciones Moradas — Espacio Público

| N° | Intervención | Descripción |
|----|-------------|-------------|
| 1 | **Plaza de los Leones** | Recuperación del rol central con mejoras de iluminación y activación cultural |
| 2 | **Plaza de la Piedra** | Redesign con mobiliario en piedra local y arbolado nativo |
| 3 | **Parque Integral** | Áreas de juego, descanso, vegetación y arte urbano |
| 4 | **Área de recreación** | Murales, caminos ecológicos y vegetación nativa |
| 5 | **Ascenso al Eco de Bolognía** | Recorrido con murales, miradores y espacios de contemplación |
| 6 | **Ingreso al Bosque de Bolognía** | Muro de tapia pisada y gaviones de transición |
| 7 | **Mural del Área de Recreación** | Mural artístico con fauna nativa andina |
| 8 | **Mural por la Plaza de la Piedra** | Identidad cultural del espacio público |
| 9 | **Mural por los Callejones** | Arte mural en el tejido urbano del barrio |

### 🟡 Intervenciones Amarillas — Accesibilidad

Seguridad y accesibilidad en calles y veredas mediante **losetas con relieve táctil**, iluminación y señalización para personas no videntes.

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
--verde:   #8faa5c;   /* Fauna, naturaleza */
--crema:   #b09c85;   /* Elementos neutros */
--terr:    #9e5447;   /* Acento tierra */
--durazno: #d4906e;   /* Acento cálido */
--morado:  #7c5cbf;   /* Intervenciones moradas */
--amarillo:#e6b800;   /* Tejido podotáctil */
--oscuro:  #16100a;   /* Fondo principal */
```

### Tipografía

| Fuente | Uso |
|--------|-----|
| **League Gothic** | Títulos y headings de impacto |
| **Lato Light** | Cuerpo de texto y UI |

---

## 📁 Módulos JavaScript

| Archivo | Responsabilidad |
|---------|----------------|
| `animales.js` | Base de datos de especies (datos puros, sin lógica) |
| `propuestas.js` | Datos de intervenciones + lógica de modales morado/amarillo/rojo |
| `fauna.js` | Inyecta datos de `ANIMALES` en los hotspots del DOM al cargar |
| `hotspots.js` | Escala dinámica de hotspots, toggle de cards, modal de zoom con pan/pinch |
| `audio.js` | Dos instancias de audio: una para el modelo 3D, otra para las cards de fauna |
| `menu.js` | Toggle del hamburger menu y scroll suave al modelo |
| `paneles.js` | Visor de paneles (PDF + imagen) con zoom por rueda, drag y pinch táctil |

---

## 🌍 Contexto Académico

| Campo | Detalle |
|-------|---------|
| **Universidad** | Universidad Mayor de San Andrés (UMSA) |
| **Facultad** | FAADU — Arquitectura, Artes, Diseño y Urbanismo |
| **Materia** | Urbanismo UT302 |
| **Alumna** | Mayra Huancollo Choque |
| **Ubicación** | Barrio Bolognía, La Paz, Bolivia |
| **Área de estudio** | Zona de Bolognía y su área natural protegida |

### 💻 Colaborador Web

| Campo | Detalle |
|-------|---------|
| **Universidad** | Universidad Mayor de San Andrés (UMSA) |
| **Facultad** | FCPN — Facultad de Ciencias Puras y Naturales |
| **Carrera** | Informática |
| **Colaborador** | Manuel Alejandro Fernandez Uzquiano |

---

## 🔮 Roadmap

- [x] Modelo 3D con hotspots interactivos
- [x] Catálogo de fauna con audio y fotos
- [x] Modal de propuestas moradas con galería
- [x] Visor de paneles PDF con zoom
- [ ] Completar las 36 especies en `animales.js`
- [ ] Agregar intervenciones amarillas en `propuestas.js`
- [ ] Optimización de carga del modelo `.glb`
- [ ] Versión mobile mejorada del visor de paneles

---

## 📄 Licencia

Este proyecto fue desarrollado con fines académicos para la **FAADU - UMSA**. Todos los derechos de las fotografías, audios y modelo 3D pertenecen a sus respectivos autores.

---

<div align="center">

**Hecho con 🌿 para el barrio de Bolognía**

*FAADU · Arquitectura · La Paz, Bolivia*

</div>
