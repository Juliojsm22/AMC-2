/**
 * UNI — AMC2 | Unidad 6: Sistema de Memoria
 * Lógica interactiva académica (Modo Claro/Oscuro, Navegación, Buscador,
 * Mapa de las 49 Diapositivas y Explorador de Direcciones de 24 bits).
 */

(function () {
  "use strict";

  /* ========================================================================
     1. Catálogo Oficial de las 49 Diapositivas (Unidad6.pptx)
     ======================================================================== */
  const SLIDES_DIRECTORY = [
    { num: 1,  title: "Portada: UNI — AMC2, Unidad 6: Sistema de Memoria", target: "#inicio" },
    { num: 2,  title: "La Función de Almacenamiento (Registros, Principal, Secundaria)", target: "#cap1-almacenamiento" },
    { num: 3,  title: "Operaciones (Lectura/Escritura) y Prestaciones/Métricas", target: "#cap1-metricas" },
    { num: 4,  title: "Jerarquía de Memoria: Esquema L0, Caché, L1 y L3 (-t/-C vs +t/+C)", target: "#cap1-jerarquia" },
    { num: 5,  title: "Jerarquía de Memoria: Relación Velocidad, Tamaño y Coste", target: "#cap1-piramide" },
    { num: 6,  title: "Jerarquía de Memoria: Pirámide Simplificada por Niveles", target: "#cap1-piramide" },
    { num: 7,  title: "Jerarquía de Memoria: Primaria (Ejecutable) vs Secundaria", target: "#cap1-ejecutable" },
    { num: 8,  title: "Caracterización: Por el nivel de la función", target: "#cap2-funcion" },
    { num: 9,  title: "Caracterización: Por la tecnología de construcción", target: "#cap2-tecnologia" },
    { num: 10, title: "Caracterización: Por la capacidad de retención del dato", target: "#cap2-retencion" },
    { num: 11, title: "Caracterización: Por la operación soportada (RW, ROM, PROM, EPROM, EEPROM, Flash)", target: "#cap2-operacion" },
    { num: 12, title: "Caracterización: Método de acceso (Aleatorio, Secuencial, Directo)", target: "#cap2-acceso" },
    { num: 13, title: "Caracterización: Modo de direccionamiento (Posición vs Contenido/Asociativa)", target: "#cap2-direccionamiento" },
    { num: 14, title: "Caracterización: Otros criterios (Coste por bit, Tamaño, Organización)", target: "#cap2-transferencia" },
    { num: 15, title: "Unidad de transferencia (Interna, Externa y Unidad direccionable)", target: "#cap2-transferencia" },
    { num: 16, title: "Organización de la Memoria Principal (Chips n×m vs n×1, matrices r×c)", target: "#cap3-chips" },
    { num: 17, title: "Organización interna: Chip de 16 Mbits y multiplexación de direcciones", target: "#cap3-chips" },
    { num: 18, title: "Chip encapsulado de memoria: EPROM 8 Mbits vs DRAM 16 Mbits (DIP)", target: "#cap3-encapsulado" },
    { num: 19, title: "Arquitectura interna de una DRAM típica de 16 Mb (4M × 4)", target: "#cap3-dram16m" },
    { num: 20, title: "Organización en módulos (1): Memoria de 256 KB con MAR y MBR", target: "#cap3-modulos" },
    { num: 21, title: "Organización en módulos (2): Expansión a 1 MB en 4 grupos de chips", target: "#cap3-modulos-1mb" },
    { num: 22, title: "Proceso de Refresco en memorias dinámicas (DRAM)", target: "#cap3-refresco" },
    { num: 23, title: "Memoria intermedia o Caché: Transferencia de palabras y de bloques", target: "#cap4-concepto" },
    { num: 24, title: "Operación de la caché: Resumen del flujo de lectura/escritura", target: "#cap4-operacion" },
    { num: 25, title: "Principio de localidad de referencia (90-10, ASPA, Espacial y Temporal)", target: "#cap4-localidad" },
    { num: 26, title: "Parámetros de diseño de la memoria caché", target: "#cap4-diseno" },
    { num: 27, title: "Organización típica de un sistema con caché y buses", target: "#cap4-diseno" },
    { num: 28, title: "Caso de Estudio: Sistema con Caché de 64 KB y Memoria Principal de 16 MB", target: "#cap4-ejemplo-base" },
    { num: 29, title: "A) Correspondencia Directa: Principios y campos t, b, w", target: "#cap5-directa" },
    { num: 30, title: "Tabla de asignación de bloques a líneas de caché (módulo m)", target: "#cap5-directa" },
    { num: 31, title: "Correspondencia Directa: Estructura de la dirección de 24 bits (8-14-2)", target: "#cap5-directa" },
    { num: 32, title: "Correspondencia Directa: Diagrama de organización y comparación", target: "#cap5-directa-fig" },
    { num: 33, title: "Ejemplo práctico de Correspondencia Directa (16 MB / 16K líneas)", target: "#cap5-directa-ej" },
    { num: 34, title: "Correspondencia Directa: Ventajas y desventajas (conflicto de línea)", target: "#cap5-directa-pros" },
    { num: 35, title: "B) Correspondencia Asociativa: Principios y campos t, w", target: "#cap5-asociativa" },
    { num: 36, title: "Organización de caché totalmente asociativa (búsqueda simultánea)", target: "#cap5-asociativa" },
    { num: 37, title: "Ejemplo práctico de Correspondencia Asociativa", target: "#cap5-asociativa-ej" },
    { num: 38, title: "Correspondencia Asociativa: Estructura de la dirección (22-2 bits)", target: "#cap5-asociativa-ej" },
    { num: 39, title: "C) Correspondencia por Conjuntos Asociativos (Sc conjuntos × Bs líneas)", target: "#cap5-conjuntos" },
    { num: 40, title: "Correspondencia Asociativa por Conjuntos: Ejemplo módulo 2^13", target: "#cap5-conjuntos" },
    { num: 41, title: "Asociativa por Conjuntos: Estructura de la dirección (9-13-2 bits)", target: "#cap5-conjuntos" },
    { num: 42, title: "Estructura de caché asociativa por conjuntos (Comparación por vías)", target: "#cap5-conjuntos-fig" },
    { num: 43, title: "Ejemplo de Correspondencia Asociativa por Conjuntos de 2 vías", target: "#cap5-conjuntos-ej" },
    { num: 44, title: "Algoritmos de sustitución (1): Caso de Correspondencia Directa", target: "#cap6-sustitucion" },
    { num: 45, title: "Algoritmos de sustitución (2): LRU, FIFO, LFU y Aleatoria en hardware", target: "#cap6-sustitucion" },
    { num: 46, title: "Política de escritura: Desactualización y riesgos de incoherencia", target: "#cap6-escritura" },
    { num: 47, title: "Write Through (Escritura inmediata): Operación, snooping y tráfico", target: "#cap6-writethrough" },
    { num: 48, title: "Write Back (Post-escritura): Bit de actualización (dirty bit) y coherencia", target: "#cap6-writeback" },
    { num: 49, title: "Cierre de la Unidad 6 y Síntesis Académica", target: "#sintesis-final" }
  ];

  /* ========================================================================
     2. Gestión de Tema Claro / Oscuro
     ======================================================================== */
  const rootEl = document.documentElement;
  const themeBtn = document.getElementById("theme-toggle-btn");
  const themeLabel = document.getElementById("theme-toggle-label");
  const themeIconSun = document.getElementById("icon-sun");
  const themeIconMoon = document.getElementById("icon-moon");

  function applyTheme(theme) {
    rootEl.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("uni_amc2_u6_theme", theme);
    } catch (_) {}
    if (theme === "dark") {
      if (themeLabel) themeLabel.textContent = "Claro";
      if (themeIconSun) themeIconSun.style.display = "block";
      if (themeIconMoon) themeIconMoon.style.display = "none";
    } else {
      if (themeLabel) themeLabel.textContent = "Oscuro";
      if (themeIconSun) themeIconSun.style.display = "none";
      if (themeIconMoon) themeIconMoon.style.display = "block";
    }
  }

  (function initTheme() {
    let saved = null;
    try {
      saved = localStorage.getItem("uni_amc2_u6_theme");
    } catch (_) {}
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  })();

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      const current = rootEl.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  }

  /* ========================================================================
     3. Barra de Progreso de Lectura y Scroll-Spy en Índice Lateral
     ======================================================================== */
  const progressBar = document.getElementById("reading-progress-bar");
  const tocLinks = Array.from(document.querySelectorAll(".toc-link"));
  const sections = tocLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  function onScrollUpdate() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && docHeight > 0) {
      const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.width = pct.toFixed(1) + "%";
    }

    let currentIndex = 0;
    const triggerOffset = window.scrollY + 140;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= triggerOffset) {
        currentIndex = i;
      }
    }
    tocLinks.forEach((link, idx) => {
      link.classList.toggle("active", idx === currentIndex);
    });
  }

  window.addEventListener("scroll", onScrollUpdate, { passive: true });
  onScrollUpdate();

  /* Menú lateral en móvil */
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const tocSidebar = document.getElementById("toc-sidebar");

  if (mobileMenuBtn && tocSidebar) {
    mobileMenuBtn.addEventListener("click", function () {
      tocSidebar.classList.toggle("mobile-open");
    });
    tocSidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        tocSidebar.classList.remove("mobile-open");
      }
    });
  }

  /* ========================================================================
     4. Pestañas de Funciones de Correspondencia (Capítulo 5)
     ======================================================================== */
  const tabButtons = Array.from(document.querySelectorAll(".mapping-tab-btn"));
  const tabPanels = Array.from(document.querySelectorAll(".mapping-panel"));

  function activateMappingTab(tabId) {
    tabButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
    });
    if (tabId === "all") {
      tabPanels.forEach((panel) => panel.classList.add("active"));
    } else {
      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === "panel-" + tabId);
      });
    }
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      activateMappingTab(btn.dataset.tab);
    });
  });

  /* Si el usuario navega a un ancla dentro de un panel oculto, mostrar el panel correspondiente */
  function revealPanelForHash(hash) {
    if (!hash) return;
    if (hash.includes("directa")) activateMappingTab("directa");
    else if (hash.includes("asociativa") && !hash.includes("conjuntos")) activateMappingTab("asociativa");
    else if (hash.includes("conjuntos")) activateMappingTab("conjuntos");
  }

  window.addEventListener("hashchange", function () {
    revealPanelForHash(window.location.hash);
  });
  if (window.location.hash) {
    revealPanelForHash(window.location.hash);
  }

  /* ========================================================================
     5. Explorador Interactivo de Direcciones de 24 bits (Caso Stallings)
        Memoria Principal: 16 MB (24 bits) | Bloque: 4 B | Caché: 64 KB (16K líneas)
     ======================================================================== */
  const hexInput = document.getElementById("stallings-hex-input");
  const presetBtns = Array.from(document.querySelectorAll(".preset-btn"));

  function padHex(num, digits) {
    return (num >>> 0).toString(16).toUpperCase().padStart(digits, "0");
  }

  function padBin(num, bits) {
    return (num >>> 0).toString(2).padStart(bits, "0");
  }

  function updateAddressExplorer(rawHex) {
    const clean = (rawHex || "").replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
    const val = clean.length > 0 ? parseInt(clean, 16) : 0;
    const hex6 = padHex(val, 6);
    const bin24 = padBin(val, 24);

    // Agrupar binario de 4 en 4 para lectura cómoda
    const binGrouped = bin24.match(/.{1,4}/g).join(" ");
    const binEl = document.getElementById("lab-binary-full");
    const decBlockEl = document.getElementById("lab-block-num");
    if (binEl) binEl.textContent = binGrouped;

    const wordOffset = val & 0x3; // 2 bits menos significativos (w)
    const blockNumber = (val >>> 2) & 0x3fffff; // 22 bits superiores (s)
    if (decBlockEl) {
      decBlockEl.textContent = "Bloque j = " + blockNumber.toLocaleString("es-NI") + " (0x" + padHex(blockNumber, 6) + ")";
    }

    // A) Correspondencia Directa: [Tag: 8b | Línea: 14b | Palabra: 2b]
    const dirTag = (val >>> 16) & 0xff;
    const dirLine = (val >>> 2) & 0x3fff;
    setText("dir-tag-val", "0x" + padHex(dirTag, 2) + " (" + padBin(dirTag, 8) + ")");
    setText("dir-line-val", "0x" + padHex(dirLine, 4) + " (Línea " + dirLine.toLocaleString("es-NI") + ")");
    setText("dir-word-val", padBin(wordOffset, 2) + " (Byte " + wordOffset + ")");

    // B) Totalmente Asociativa: [Tag: 22b | Palabra: 2b]
    const assocTag = (val >>> 2) & 0x3fffff;
    setText("assoc-tag-val", "0x" + padHex(assocTag, 6) + " (22 bits)");
    setText("assoc-line-val", "Cualquiera (0x0000 – 0x3FFF)");
    setText("assoc-word-val", padBin(wordOffset, 2) + " (Byte " + wordOffset + ")");

    // C) Asociativa por Conjuntos de 2 vías: [Tag: 9b | Conjunto: 13b | Palabra: 2b]
    const setTag = (val >>> 15) & 0x1ff;
    const setIdx = (val >>> 2) & 0x1fff;
    const setPlusWord15 = val & 0x7fff;
    setText("set-tag-val", "0x" + padHex(setTag, 3) + " (" + padBin(setTag, 9) + ")");
    setText("set-idx-val", "0x" + padHex(setIdx, 4) + " (Conj. " + setIdx.toLocaleString("es-NI") + ", Vía 0 ó 1)");
    setText("set-stallings-val", padHex(setTag, 3) + " " + padHex(setPlusWord15, 4) + " (Notación Diap. 41)");

    presetBtns.forEach((b) => {
      b.classList.toggle("active", b.dataset.hex === hex6);
    });
  }

  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  if (hexInput) {
    hexInput.addEventListener("input", function () {
      updateAddressExplorer(hexInput.value);
    });
    presetBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        hexInput.value = btn.dataset.hex;
        updateAddressExplorer(btn.dataset.hex);
      });
    });
    updateAddressExplorer(hexInput.value || "16339C");
  }

  /* ========================================================================
     6. Modal del Mapa Completo de las 49 Diapositivas
     ======================================================================== */
  const slidesModal = document.getElementById("slides-modal");
  const openSlidesBtn = document.getElementById("open-slides-map-btn");
  const closeSlidesBtn = document.getElementById("close-slides-modal-btn");
  const slidesGrid = document.getElementById("slides-map-grid");

  if (slidesGrid) {
    slidesGrid.innerHTML = SLIDES_DIRECTORY.map(function (s) {
      return (
        '<a class="slide-map-item" href="' + s.target + '" data-slide-target="' + s.target + '">' +
        '<span class="slide-num-pill">#' + String(s.num).padStart(2, "0") + "</span>" +
        '<span class="slide-map-text">' + s.title + "</span>" +
        "</a>"
      );
    }).join("");

    slidesGrid.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (!link) return;
      const target = link.getAttribute("data-slide-target");
      revealPanelForHash(target);
      slidesModal.classList.remove("open");
    });
  }

  const footerSlidesLink = document.getElementById("footer-slides-map-link");
  if (openSlidesBtn && slidesModal) {
    openSlidesBtn.addEventListener("click", function () {
      slidesModal.classList.add("open");
    });
  }
  if (footerSlidesLink && slidesModal) {
    footerSlidesLink.addEventListener("click", function (e) {
      e.preventDefault();
      slidesModal.classList.add("open");
    });
  }
  if (closeSlidesBtn && slidesModal) {
    closeSlidesBtn.addEventListener("click", function () {
      slidesModal.classList.remove("open");
    });
  }
  if (slidesModal) {
    slidesModal.addEventListener("click", function (e) {
      if (e.target === slidesModal) slidesModal.classList.remove("open");
    });
  }

  /* ========================================================================
     7. Buscador Instantáneo Académico (Conceptos y N.º de Diapositiva)
     ======================================================================== */
  const searchInput = document.getElementById("global-search-input");
  const searchDropdown = document.getElementById("search-results-dropdown");

  // Construir índice combinando secciones del DOM y catálogo de diapositivas
  const searchIndex = [];
  document.querySelectorAll(".chapter-card, .subsection").forEach(function (sec) {
    if (!sec.id) return;
    const heading = sec.querySelector("h2, h3");
    if (!heading) return;
    const textContent = sec.textContent.replace(/\s+/g, " ").trim();
    searchIndex.push({
      title: heading.textContent.trim(),
      snippet: textContent.slice(0, 145) + "…",
      haystack: textContent.toLowerCase(),
      href: "#" + sec.id
    });
  });

  SLIDES_DIRECTORY.forEach(function (s) {
    searchIndex.push({
      title: "Diapositiva " + s.num + ": " + s.title,
      snippet: "Ir al desarrollo teórico y diagrama correspondiente en el portal.",
      haystack: ("diapositiva " + s.num + " slide " + s.num + " " + s.title).toLowerCase(),
      href: s.target
    });
  });

  if (searchInput && searchDropdown) {
    searchInput.addEventListener("input", function () {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length < 2) {
        searchDropdown.classList.remove("open");
        searchDropdown.innerHTML = "";
        return;
      }
      const matches = searchIndex.filter((item) => item.haystack.includes(q)).slice(0, 8);
      if (matches.length === 0) {
        searchDropdown.innerHTML =
          '<div class="search-hit"><div class="search-hit-snippet">No se encontraron coincidencias para "' +
          q.replace(/[<>&"]/g, "") +
          '".</div></div>';
      } else {
        searchDropdown.innerHTML = matches
          .map(
            (m) =>
              '<a class="search-hit" href="' +
              m.href +
              '">' +
              '<div class="search-hit-title">' +
              m.title +
              "</div>" +
              '<div class="search-hit-snippet">' +
              m.snippet.slice(0, 110) +
              "</div></a>"
          )
          .join("");
      }
      searchDropdown.classList.add("open");
    });

    searchDropdown.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (link) {
        revealPanelForHash(link.getAttribute("href"));
        searchDropdown.classList.remove("open");
      }
    });

    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-box")) {
        searchDropdown.classList.remove("open");
      }
    });

    document.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInput.focus();
      } else if (e.key === "Escape") {
        searchDropdown.classList.remove("open");
        if (slidesModal) slidesModal.classList.remove("open");
      }
    });
  }
})();

