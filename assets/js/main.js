// BASE_PATH y CURRENT_PAGE se definen inline en cada página antes de cargar este script.
(function () {
  "use strict";

  var basePath = typeof BASE_PATH !== "undefined" ? BASE_PATH : "";
  var currentPage = typeof CURRENT_PAGE !== "undefined" ? CURRENT_PAGE : "home";

  function findPage(id) {
    for (var c = 0; c < SITE.categories.length; c++) {
      var cat = SITE.categories[c];
      for (var p = 0; p < cat.pages.length; p++) {
        if (cat.pages[p].id === id) return { category: cat, page: cat.pages[p] };
      }
    }
    return null;
  }

  function flatPages() {
    var flat = [];
    SITE.categories.forEach(function (cat) {
      cat.pages.forEach(function (p) { flat.push(p); });
    });
    return flat;
  }

  // ---------- Sidebar ----------
  function buildSidebarHTML() {
    var html = "";
    html += '<a class="side-home-link' + (currentPage === "home" ? " active" : "") + '" href="' + basePath + 'index.html"><i class="bi bi-house-door"></i> Inicio</a>';
    (SITE.extras || []).forEach(function (ex) {
      var active = ex.id === currentPage ? " active" : "";
      html += '<a class="side-home-link' + active + '" href="' + basePath + ex.href + '"><i class="bi ' + ex.icon + '"></i> ' + ex.title + "</a>";
    });
    SITE.categories.forEach(function (cat) {
      if (cat.separator) html += '<hr class="side-divider">';
      var hasActive = cat.pages.some(function (p) { return p.id === currentPage; });
      html += '<details class="side-group" data-cat="' + cat.color + '"' + (hasActive ? " open" : "") + '>';
      html += '<summary><i class="bi ' + cat.icon + ' side-icon"></i> ' + cat.name + ' <i class="bi bi-chevron-down side-chevron"></i></summary>';
      html += '<ul class="side-list">';
      cat.pages.forEach(function (p) {
        var active = p.id === currentPage ? " active" : "";
        html += '<li><a class="side-link' + active + '" data-title="' + p.title.toLowerCase() + '" href="' + basePath + p.href + '">' + p.title + "</a></li>";
      });
      html += "</ul></details>";
    });
    return html;
  }

  function renderSidebars() {
    var html = buildSidebarHTML();
    ["sidebar-nav", "sidebar-nav-mobile"].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.innerHTML = html;
    });
  }

  // ---------- Breadcrumb ----------
  function renderBreadcrumb() {
    var el = document.getElementById("breadcrumb");
    if (!el) return;
    if (currentPage === "home") {
      el.innerHTML = '<li class="breadcrumb-item active" aria-current="page">Inicio</li>';
      return;
    }
    var extra = (SITE.extras || []).find(function (e) { return e.id === currentPage; });
    if (extra) {
      el.innerHTML =
        '<li class="breadcrumb-item"><a href="' + basePath + 'index.html">Inicio</a></li>' +
        '<li class="breadcrumb-item active" aria-current="page">' + extra.title + "</li>";
      return;
    }
    var found = findPage(currentPage);
    if (!found) return;
    el.innerHTML =
      '<li class="breadcrumb-item"><a href="' + basePath + 'index.html">Inicio</a></li>' +
      '<li class="breadcrumb-item">' + found.category.name + "</li>" +
      '<li class="breadcrumb-item active" aria-current="page">' + found.page.title + "</li>";
  }

  // ---------- Enlace a PDF de origen ----------
  function wirePdfLink() {
    var el = document.getElementById("pdf-link");
    if (!el) return;
    var found = findPage(currentPage);
    if (!found) return;
    el.href = encodeURI(basePath + found.page.pdf);
  }

  // ---------- "On this page" (TOC + scrollspy) ----------
  function renderTOC() {
    if (currentPage === "home") return; // la home construye su propio TOC de categorías
    var nav = document.getElementById("toc-nav");
    var content = document.getElementById("page-content");
    if (!nav || !content) return;
    var headings = content.querySelectorAll("h2[id]");
    if (!headings.length) {
      var aside = document.getElementById("toc-aside");
      if (aside) aside.classList.add("d-none");
      return;
    }
    var html = "";
    headings.forEach(function (h) {
      html += '<a class="toc-link" href="#' + h.id + '">' + h.textContent + "</a>";
    });
    nav.innerHTML = html;

    initScrollSpy();
  }

  // ---------- Términos relacionados (sidebar, a partir del glosario) ----------
  function renderRelatedTerms() {
    var terms = SITE.relatedTerms && SITE.relatedTerms[currentPage];
    if (!terms || !terms.length) return;
    var tocInner = document.querySelector(".toc-inner");
    if (!tocInner) return;

    var box = document.createElement("div");
    box.className = "toc-related";

    var heading = document.createElement("h6");
    heading.textContent = "Términos relacionados";

    var list = document.createElement("div");
    list.className = "related-terms";
    terms.forEach(function (t) {
      var a = document.createElement("a");
      a.className = "related-term-chip";
      a.href = basePath + "pages/glosario.html#" + t.letterId;
      a.textContent = t.term;
      list.appendChild(a);
    });

    box.appendChild(heading);
    box.appendChild(list);
    tocInner.appendChild(box);
  }

  // ---------- ¿Te ha sido útil? (sidebar) ----------
  function wireFeedback() {
    if (currentPage === "home" || currentPage === "glosario") return;
    var tocInner = document.querySelector(".toc-inner");
    if (!tocInner) return;

    var box = document.createElement("div");
    box.className = "toc-feedback";
    box.innerHTML =
      "<h6>¿Te ha sido útil?</h6>" +
      '<div class="feedback-buttons">' +
      '<button type="button" class="feedback-btn" data-vote="up" aria-label="Sí, me ha sido útil"><i class="bi bi-hand-thumbs-up"></i></button>' +
      '<button type="button" class="feedback-btn" data-vote="down" aria-label="No me ha sido útil"><i class="bi bi-hand-thumbs-down"></i></button>' +
      "</div>" +
      '<p class="feedback-thanks d-none">¡Gracias por tu feedback!</p>';
    tocInner.appendChild(box);

    var key = "feedback:" + currentPage;
    var saved = null;
    try { saved = localStorage.getItem(key); } catch (e) {}

    var buttons = box.querySelectorAll(".feedback-btn");
    var thanks = box.querySelector(".feedback-thanks");

    function select(vote) {
      buttons.forEach(function (b) { b.classList.toggle("selected", b.dataset.vote === vote); });
      thanks.classList.remove("d-none");
    }

    if (saved) select(saved);

    buttons.forEach(function (b) {
      b.addEventListener("click", function () {
        select(b.dataset.vote);
        try { localStorage.setItem(key, b.dataset.vote); } catch (e) {}
      });
    });
  }

  // ---------- Temas recientes (localStorage, por visitante) ----------
  var RECENT_KEY = "recentPages";
  var RECENT_MAX = 6;

  function recordRecentPage() {
    if (currentPage === "home") return;
    var found = findPage(currentPage);
    var extra = (SITE.extras || []).find(function (e) { return e.id === currentPage; });
    if (!found && !extra) return;

    var list = [];
    try { list = JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) {}
    list = list.filter(function (id) { return id !== currentPage; });
    list.unshift(currentPage);
    list = list.slice(0, RECENT_MAX);
    try { localStorage.setItem(RECENT_KEY, JSON.stringify(list)); } catch (e) {}
  }

  function renderRecentPages() {
    var section = document.getElementById("recent-pages");
    if (!section) return;

    var list = [];
    try { list = JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) {}
    if (!list.length) return;

    var html = "";
    list.forEach(function (id) {
      var found = findPage(id);
      var extra = (SITE.extras || []).find(function (e) { return e.id === id; });
      if (!found && !extra) return;
      var title = found ? found.page.title : extra.title;
      var href = found ? found.page.href : extra.href;
      var catName = found ? found.category.name : "Glosario";
      var catColor = found ? found.category.color : "";
      html += '<a class="recent-item" href="' + href + '">' +
        '<span class="badge-cat' + (catColor ? " " + catColor : "") + '">' + catName + "</span>" +
        '<span class="recent-title">' + title + "</span>" +
        '<i class="bi bi-arrow-right"></i>' +
        "</a>";
    });
    if (!html) return;

    section.querySelector(".recent-list").innerHTML = html;
    section.classList.remove("d-none");
  }

  function initScrollSpy() {
    if (window.bootstrap && window.bootstrap.ScrollSpy) {
      var existing = window.bootstrap.ScrollSpy.getInstance(document.body);
      if (existing) existing.dispose();
      new window.bootstrap.ScrollSpy(document.body, {
        target: "#toc-nav",
        rootMargin: "0px 0px -50% 0px"
      });
    }
  }
  window.__initScrollSpy = initScrollSpy;

  // ---------- Anterior / siguiente tema ----------
  function renderPrevNext() {
    var el = document.getElementById("prev-next");
    if (!el || currentPage === "home") return;
    var flat = flatPages();
    var index = flat.findIndex(function (p) { return p.id === currentPage; });
    if (index === -1) return;
    var prev = index > 0 ? flat[index - 1] : null;
    var next = index < flat.length - 1 ? flat[index + 1] : null;

    var html = '<div class="prev-next-nav">';
    html += prev
      ? '<a class="prev-next-link prev" href="' + basePath + prev.href + '"><span class="pn-label"><i class="bi bi-arrow-left"></i> Anterior</span><span class="pn-title">' + prev.title + '</span></a>'
      : '<span></span>';
    html += next
      ? '<a class="prev-next-link next" href="' + basePath + next.href + '"><span class="pn-label">Siguiente <i class="bi bi-arrow-right"></i></span><span class="pn-title">' + next.title + '</span></a>'
      : '<span></span>';
    html += "</div>";
    el.innerHTML = html;
  }

  // ---------- Buscador por contenido real ----------
  function normalize(s) {
    return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function highlight(text, q) {
    var idx = normalize(text).indexOf(q);
    if (idx === -1) return escapeHtml(text);
    var before = escapeHtml(text.slice(0, idx));
    var match = escapeHtml(text.slice(idx, idx + q.length));
    var after = escapeHtml(text.slice(idx + q.length));
    return before + "<mark>" + match + "</mark>" + after;
  }

  function wireSearch() {
    var index = (typeof SITE !== "undefined" && SITE.searchIndex) ? SITE.searchIndex : [];
    document.querySelectorAll(".topbar-search").forEach(function (wrap) {
      var input = wrap.querySelector(".search-input");
      var results = wrap.querySelector(".search-results");
      if (!input || !results) return;

      function render(q) {
        if (!q) {
          results.classList.remove("show");
          results.innerHTML = "";
          return;
        }
        var nq = normalize(q);
        var titleHits = [];
        var keywordHits = [];
        index.forEach(function (e) {
          if (normalize(e.unitTitle).indexOf(nq) !== -1 || normalize(e.pageTitle).indexOf(nq) !== -1) {
            titleHits.push({ e: e });
            return;
          }
          var kw = (e.keywords || []).find(function (k) { return normalize(k).indexOf(nq) !== -1; });
          if (kw) keywordHits.push({ e: e, kw: kw });
        });
        var matches = titleHits.concat(keywordHits).slice(0, 12);

        if (!matches.length) {
          results.innerHTML = '<p class="search-empty">Sin resultados para "' + escapeHtml(q) + '"</p>';
          results.classList.add("show");
          return;
        }

        var resultPrefix = basePath === "" ? "pages/" : "";
        results.innerHTML = matches.map(function (m) {
          var e = m.e;
          var href = resultPrefix + e.href + "#" + e.unitId;
          return '<a class="search-result" href="' + href + '">' +
            '<span class="sr-page">' + escapeHtml(e.pageTitle) + '</span>' +
            '<span class="sr-title">' + highlight(e.unitTitle, nq) + "</span>" +
            (m.kw ? '<span class="sr-kw">Menciona: ' + highlight(m.kw, nq) + "</span>" : "") +
            "</a>";
        }).join("");
        results.classList.add("show");
      }

      input.addEventListener("input", function () { render(input.value.trim()); });
      input.addEventListener("focus", function () { if (input.value.trim()) render(input.value.trim()); });
      document.addEventListener("click", function (ev) {
        if (!wrap.contains(ev.target)) results.classList.remove("show");
      });
      input.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape") { results.classList.remove("show"); input.blur(); }
      });
    });
  }

  // ---------- Tema claro/oscuro ----------
  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem("theme"); } catch (e) {}
    var theme = stored || "dark";
    document.documentElement.setAttribute("data-bs-theme", theme);
    updateThemeIcon(theme);

    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-bs-theme");
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-bs-theme", next);
        updateThemeIcon(next);
        try { localStorage.setItem("theme", next); } catch (e) {}
      });
    });
  }

  function updateThemeIcon(theme) {
    document.querySelectorAll(".theme-toggle i").forEach(function (icon) {
      icon.className = theme === "dark" ? "bi bi-moon-stars" : "bi bi-sun";
    });
  }

  // ---------- Volver arriba ----------
  function wireBackToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 400);
    });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderSidebars();
    renderBreadcrumb();
    wirePdfLink();
    renderTOC();
    renderRelatedTerms();
    wireFeedback();
    renderPrevNext();
    recordRecentPage();
    renderRecentPages();
    wireSearch();
    initTheme();
    wireBackToTop();
  });
})();
