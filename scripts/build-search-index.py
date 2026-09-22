#!/usr/bin/env python3
"""Genera assets/js/search-index.js a partir del contenido de las páginas.

Indexa:
  - los <h2 id> de #page-content de cada asignatura (menos "Ponte a prueba" y "Para saber más"),
  - los <h3 id> (subapartados de "One more thing…"),
  - como palabras clave de cada apartado, sus subtítulos <h3> sin id y el texto en <strong>, <code> y <em>,
  - los términos (<dt>) del glosario.

También genera SITE.relatedTerms (mismo archivo): para cada asignatura, los términos del
glosario que la etiquetan como fuente, a partir de la anotación "(Asignatura A, Asignatura B)"
de cada <dt>. Se usa para el widget "Términos relacionados" de la sidebar.

Uso (desde la raíz del proyecto):  python3 scripts/build-search-index.py
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SKIP_IDS = {"autoevaluacion", "para-saber-mas"}

# Las etiquetas de asignatura del glosario no siempre coinciden con el título de nav-data.js.
TAG_ALIASES = {
    "Vocabulary": "vocabulary",
    "Anexo E-R": "anexo-entidad-relacion",
}


def clean(html):
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html)).strip()


def subject_pages():
    nav = (ROOT / "assets/js/nav-data.js").read_text(encoding="utf-8")
    cats = nav.split("extras:")[0]
    return re.findall(r'id:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*href:\s*"pages/([^"]+)"', cats)


def entry(page_id, page_title, href, unit_id, unit_title, keywords=None):
    e = {"pageId": page_id, "pageTitle": page_title, "href": href,
         "unitId": unit_id, "unitTitle": unit_title}
    if keywords:
        e["keywords"] = keywords
    return e


def keywords_of(block):
    found = []
    for tag in ("h3", "strong", "code", "em"):
        for raw in re.findall(rf"<{tag}>(.*?)</{tag}>", block, re.S):
            k = clean(raw)
            if 2 <= len(k) <= 60 and k not in found:
                found.append(k)
    return found


def main():
    index = []
    pages = subject_pages()
    title_to_id = {title: pid for pid, title, _ in pages}
    title_to_id.update(TAG_ALIASES)

    for page_id, page_title, href in pages:
        html = (ROOT / "pages" / href).read_text(encoding="utf-8")
        body = re.search(r'<article id="page-content">(.*?)</article>', html, re.S)
        if not body:
            continue
        content = body.group(1)
        heads = list(re.finditer(r'<(h2|h3) id="([^"]+)">(.*?)</\1>', content, re.S))
        for i, h in enumerate(heads):
            uid, text = h.group(2), h.group(3)
            if uid in SKIP_IDS:
                continue
            end = heads[i + 1].start() if i + 1 < len(heads) else len(content)
            block = content[h.end():end]
            block = block.split('<section class="recap-box">')[0]
            title = page_title + " · One more thing" if uid.startswith("omt-") else page_title
            index.append(entry(page_id, title, href, uid, clean(text), keywords_of(block)))

    related_terms = {}
    glosario = (ROOT / "pages/glosario.html").read_text(encoding="utf-8")
    for letter_id, body in re.findall(r'<h2 id="(letra-[a-z])">.*?</h2>(.*?)</section>', glosario, re.S):
        for term, tags in re.findall(
            r'<dt><strong>([^<]+)</strong>\s*<span class="text-muted">\(([^)]+)\)</span></dt>', body
        ):
            index.append(entry("glosario", "Glosario", "glosario.html", letter_id, term.strip()))
            for tag in tags.split(","):
                pid = title_to_id.get(tag.strip())
                if not pid:
                    print(f"aviso: etiqueta de glosario sin asignatura: {tag.strip()!r}")
                    continue
                related_terms.setdefault(pid, []).append({"term": term.strip(), "letterId": letter_id})

    lines = ["SITE.searchIndex = ["]
    for e in index:
        lines.append("  " + json.dumps(e, ensure_ascii=False) + ",")
    lines.append("];")
    lines.append("")
    lines.append("SITE.relatedTerms = " + json.dumps(related_terms, ensure_ascii=False, indent=2) + ";")
    (ROOT / "assets/js/search-index.js").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"search-index.js: {len(index)} entradas, {sum(len(v) for v in related_terms.values())} términos relacionados")


if __name__ == "__main__":
    main()
