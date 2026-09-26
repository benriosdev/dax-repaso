# Cómo contribuir a DAX Repaso

Gracias por querer mejorar el proyecto. Cualquier aportación es bienvenida, desde corregir una errata hasta añadir una chuleta nueva.

## Qué se acepta

- Correcciones de errores, erratas y enlaces rotos.
- Mejoras de redacción o de ejemplos que hagan un apunte más claro.
- Apartados nuevos en una asignatura, o chuletas y guías nuevas, siempre con fuentes oficiales enlazadas.
- Mejoras de accesibilidad, rendimiento o diseño que respeten la estructura actual.

Si el cambio es grande (una página nueva, un rediseño, una funcionalidad), abre antes un **issue** para comentarlo. Así nadie pierde tiempo con algo que no encaje.

## Requisitos

No hay nada que instalar. Solo necesitas `git` y `python3`.

## Flujo de trabajo

1. Haz un **fork** del repositorio desde GitHub.
2. Clona tu fork y crea una rama con un nombre descriptivo, por ejemplo `corrige-join-bd-b` o `chuleta-regex`.
3. Haz tus cambios dentro de `site/`.
4. Pruébalos en local.

   ```bash
   python3 -m http.server 8743 -d site
   ```

   Abre `http://localhost:8743/` y revisa el resultado en tema claro y oscuro, y a distintos anchos de pantalla.

5. Si has cambiado el contenido de alguna página, regenera el índice del buscador.

   ```bash
   python3 scripts/build-search-index.py
   ```

6. Haz commit, sube la rama a tu fork y abre un **Pull Request** contra `main`. Rellena la plantilla que aparece.

El repositorio protege `main` con reglas, así que todos los cambios entran por Pull Request.

## Reglas de contenido

- **Palabras propias.** No copies textos de otras fuentes. Explica las ideas con tus palabras.
- **Datos verificados.** Todo dato debe poder comprobarse en una fuente oficial, y esa fuente se enlaza al final de la sección. No se añade nada que no sea seguro.
- **Nada que caduque.** Evita cifras, versiones o plazos que dejen de ser ciertos con el tiempo, salvo que estén contrastados y fechados.
- **Sin repetir.** Antes de añadir un tema, busca en `site/` que no exista ya en otra página.
- **Profundidad media.** Cada subtema tiene una explicación real, con como mucho un ejemplo de código por unidad. Las chuletas son referencias cortas, sin teoría larga.

## Reglas técnicas

- El sitio es HTML, CSS y JavaScript sin más. No se aceptan frameworks, herramientas de build ni dependencias nuevas.
- Bootstrap y Bootstrap Icons están incluidos en `site/assets/vendor/`. No los edites.
- `site/assets/js/search-index.js` es un archivo generado. No lo edites a mano, regenéralo con el script.
- Los números de las estadísticas de la portada se calculan solos. No los escribas a mano.
- El menú lateral, las migas de pan y los botones anterior y siguiente salen de `site/assets/js/nav-data.js`.

## Añadir una página

Una página nueva es una carpeta dentro de `site/` con su `index.html`, por ejemplo `site/mi-tema/index.html`. Después se registra en `site/assets/js/nav-data.js` con `href: "mi-tema/"`. Copia la estructura de una página existente y mantén el mismo esquema de secciones. El README explica el resto.

## Mensajes de commit

Escríbelos en imperativo y en español, con un resumen corto en la primera línea. Por ejemplo, `Corrige el ejemplo de LEFT JOIN` o `Añade la chuleta de expresiones regulares`. Si hace falta, explica en el cuerpo el motivo del cambio.

## Dudas

Abre un issue y lo hablamos.
