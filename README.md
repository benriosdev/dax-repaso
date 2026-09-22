# DAX Repaso

Sitio web estático de repaso con apuntes propios de DAM/DAW: resúmenes por asignatura, glosario con modo flashcards y páginas de herramientas de desarrollo (Git, GitHub, Docker, MySQL Workbench, Supabase).

## Stack

HTML + CSS + JavaScript vanilla, sin build ni framework. Bootstrap 5.3.3 y Bootstrap Icons cargados por CDN.

## Estructura

```
index.html                 Portada: tarjetas por categoría
pages/*.html               Una página por asignatura o herramienta + glosario
assets/css/style.css       Estilos propios
assets/js/nav-data.js      Fuente única de navegación (categorías, páginas, rutas)
assets/js/search-index.js  Índice de búsqueda (generado)
assets/js/main.js          Sidebar, breadcrumbs, TOC, búsqueda, tema
scripts/build-search-index.py  Regenera el índice de búsqueda
```

## Ver en local

```bash
python3 -m http.server 8743
open http://localhost:8743/index.html
```

No abrir los archivos `.html` con doble clic (`file://`): el navegador bloquea los scripts y la sidebar, el TOC y el buscador no funcionan.

## Regenerar el índice de búsqueda

Después de cambiar el contenido de una página:

```bash
python3 scripts/build-search-index.py
```
