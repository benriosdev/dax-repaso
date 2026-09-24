<div align="center">

# DAX Repaso

**Apuntes claros para DAM y DAW.**
Resúmenes por asignatura, glosario con flashcards y guías de herramientas de desarrollo, en un sitio estático rápido y sin dependencias.

[**Ver el sitio →**](https://benrios.dev/dax-repaso/)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![No build](https://img.shields.io/badge/build-none-lightgrey?style=flat-square)

</div>

---

## Características

- **Buscador instantáneo** por título, unidad y palabras clave, disponible desde cualquier página.
- **Navegación por categorías** con barra lateral, migas de pan y tabla de contenidos con seguimiento del scroll.
- **Para profundizar**: en cada asignatura, una sección de ampliación diferenciada, con contenido adicional contrastado con fuentes oficiales enlazadas.
- **Glosario con modo flashcards** para repasar términos.
- **Herramientas de referencia**: Git, GitHub, Docker, MySQL Workbench y Supabase.
- **Temas recientes**: recuerda, en tu propio navegador y sin analítica ni servidor, las últimas páginas que visitaste.
- **Modo claro y oscuro**, con la preferencia guardada.
- **URLs limpias**, del estilo `/programacion-a/`, sin reglas de servidor.

## Stack

| | |
|---|---|
| Lenguaje | HTML, CSS y JavaScript vanilla |
| UI | Bootstrap 5.3.8 y Bootstrap Icons 1.11.3, auto-alojados (sin CDN) |
| Build | Ninguno: el sitio se sirve tal cual |
| Índice de búsqueda | Generado con un script de Python |

## Estructura

```
site/                              Todo lo que se publica
├── index.html                     Portada
├── <id>/index.html                Una carpeta por asignatura, herramienta y el glosario
└── assets/
    ├── css/style.css              Estilos propios
    ├── js/
    │   ├── nav-data.js            Fuente única de navegación (categorías, páginas y rutas)
    │   ├── search-index.js        Índice de búsqueda (generado)
    │   └── main.js                Sidebar, migas de pan, TOC, búsqueda, tema
    └── vendor/                    Bootstrap y Bootstrap Icons
scripts/
└── build-search-index.py          Regenera el índice de búsqueda
```

## Empezar

No hay nada que instalar. Sirve la carpeta `site/` con cualquier servidor HTTP:

```bash
python3 -m http.server 8743 -d site
```

Y abre <http://localhost:8743>.

## Desarrollo

**Buscador.** El buscador lee un índice precalculado, no las páginas. Tras cambiar el contenido de cualquier página, regenéralo:

```bash
python3 scripts/build-search-index.py
```

**Añadir una página.** Crea una carpeta `<id>/` con su `index.html` dentro de `site/` y regístrala en `site/assets/js/nav-data.js` con `href: "<id>/"`. El menú, las migas de pan y los botones anterior/siguiente se generan solos a partir de ese archivo.

## Despliegue

Sube el **contenido** de `site/` (no la carpeta `site/` en sí) a la ruta del servidor donde vaya a vivir el sitio. Al ser 100 % estático, sirve cualquier alojamiento de archivos.
