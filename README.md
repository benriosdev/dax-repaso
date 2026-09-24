# DAX Repaso

Sitio web estático de repaso para **DAM y DAW**: resúmenes por asignatura, un glosario con modo flashcards, y páginas de referencia de herramientas de desarrollo.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5.3-7952B3?style=flat-square&logo=bootstrap&logoColor=white)
![No build](https://img.shields.io/badge/build-none-lightgrey?style=flat-square)

---

## Índice

- [Características](#características)
- [Stack](#stack)
- [Estructura](#estructura)
- [Ver en local](#ver-en-local)
- [Regenerar el índice de búsqueda](#regenerar-el-índice-de-búsqueda)

## Características

- **Buscador instantáneo** por título, unidad y palabras clave, disponible desde cualquier página.
- **Navegación por categorías** con sidebar, breadcrumbs y tabla de contenidos con scroll activo.
- **"Para profundizar"**: en cada asignatura, una sección de ampliación claramente diferenciada, con contenido adicional contrastado con fuentes oficiales enlazadas.
- **Glosario con modo flashcards** para repasar términos.
- **Temas recientes**: recuerda, en tu propio navegador y sin analítica ni servidor, las últimas páginas que visitaste.
- **Herramientas de referencia**: Git, GitHub, Docker, MySQL Workbench y Supabase, con la misma estructura que las asignaturas.
- **Modo claro/oscuro**, con preferencia guardada.
- **Cero dependencias de npm**: sin build, sin framework, sin bundler.

## Stack

| | |
|---|---|
| Lenguaje | HTML + CSS + JavaScript vanilla |
| UI | Bootstrap 5.3.8 y Bootstrap Icons 1.11.3, auto-alojados en `assets/vendor/` (sin CDN) |
| Build | Ninguno — se sirve tal cual |
| Índice de búsqueda | Generado con un script de Python (`scripts/build-search-index.py`) |

## Estructura

```
site/                              Todo lo que se publica
  index.html                       Portada: hero, buscador, estadísticas y tarjetas por categoría
  <id>/index.html                  Una carpeta por asignatura o herramienta + glosario/ (URLs limpias)
  assets/css/style.css             Estilos propios
  assets/js/nav-data.js            Fuente única de navegación (categorías, páginas, rutas)
  assets/js/search-index.js        Índice de búsqueda (generado)
  assets/js/main.js                Sidebar, breadcrumbs, TOC, búsqueda, tema, temas recientes
  assets/vendor/                   Bootstrap y Bootstrap Icons auto-alojados
scripts/build-search-index.py      Regenera el índice de búsqueda
```

## Ver en local

Al ser un sitio 100% estático, basta con servir la carpeta con cualquier servidor HTTP, por ejemplo:

```bash
python3 -m http.server 8743 -d site
```

Y abre `http://localhost:8743` en el navegador.

## Publicar

Sube el **contenido** de `site/` (no la carpeta `site/` en sí) a la ruta del servidor donde vaya a vivir el sitio.

## Regenerar el índice de búsqueda

Después de cambiar el contenido de una página:

```bash
python3 scripts/build-search-index.py
```
