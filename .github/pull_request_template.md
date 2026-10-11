## Qué cambia y por qué

<!-- Una o dos frases con el cambio y su motivo. Si resuelve un issue, escribe "Cierra #número". -->

## Tipo de cambio

- [ ] Corrección (error, errata o enlace roto)
- [ ] Mejora o contenido nuevo
- [ ] Cambio técnico o de diseño

## Cómo revisarlo

<!-- Páginas que cambian (por ejemplo /dax-repaso/programacion-a/) y qué mirar en ellas. Si el cambio se ve, añade una captura de antes y después. -->

## Comprobaciones

**Contenido**
- [ ] Escrito con mis palabras, con los datos verificados y la fuente oficial enlazada
- [ ] Sin cifras, versiones ni plazos que vayan a caducar
- [ ] El tema no está ya cubierto en otra página (lo he buscado en `site/`)
- [ ] He actualizado el `updated` de la página en `nav-data.js` (y, si es nueva, su `related` y `sitemap.xml`)

**Técnicas**
- [ ] Probado en local en claro y oscuro, en móvil y en escritorio
- [ ] Índice del buscador regenerado (`python3 scripts/build-search-index.py`)
- [ ] Sin dependencias, sin build y sin JavaScript dentro del HTML; los JS que toco pasan `node --check`
