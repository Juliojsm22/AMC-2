/**
 * UNI — AMC2 | Unidad 6: Sistema de Memoria
 * Módulo de Evaluación Académica Interactiva (Quiz Oficial con Puntaje y Resumen Completo)
 */

(function () {
  "use strict";

  /* ========================================================================
     1. Metadatos de los 6 Capítulos para el Diagnóstico de Dominio
     ======================================================================== */
  const CHAPTERS_META = {
    1: { code: "Cap. 01", name: "Almacenamiento y Jerarquía", slides: "Diap. 1–7", href: "#cap1" },
    2: { code: "Cap. 02", name: "Caracterización de la Memoria", slides: "Diap. 8–15", href: "#cap2" },
    3: { code: "Cap. 03", name: "Organización Principal (DRAM/MAR)", slides: "Diap. 16–22", href: "#cap3" },
    4: { code: "Cap. 04", name: "Memoria Caché y Localidad", slides: "Diap. 23–28", href: "#cap4" },
    5: { code: "Cap. 05", name: "Funciones de Correspondencia", slides: "Diap. 29–43", href: "#cap5" },
    6: { code: "Cap. 06", name: "Sustitución y Políticas de Escritura", slides: "Diap. 44–49", href: "#cap6" }
  };

  /* ========================================================================
     2. Banco Oficial de 18 Preguntas Rigurosas (3 por cada Capítulo)
     ======================================================================== */
  const QUESTION_BANK = [
    /* --- CAPÍTULO 01 (Diapositivas 1–7) --- */
    {
      id: "q1",
      chapter: 1,
      slides: "Diap. 3",
      sectionHref: "#cap1-metricas",
      prompt: "En una memoria de acceso aleatorio (RAM), ¿qué magnitud define la suma del tiempo de acceso más el tiempo adicional requerido de estabilización o regeneración antes de poder iniciar un segundo acceso consecutivo?",
      options: [
        "Tiempo de ciclo de memoria (tc)",
        "Latencia rotacional media",
        "Ancho de banda externo de bloque",
        "Tiempo de búsqueda secuencial"
      ],
      correctIndex: 0,
      explanation: "El tiempo de ciclo de memoria (tc) aplica a memorias de acceso aleatorio y equivale al tiempo de acceso (latencia) más el tiempo transitorio necesario para que las líneas y celdas se estabilicen (o restaurar la carga en DRAM) antes del siguiente acceso; de él deriva Vt = 1 / tc."
    },
    {
      id: "q2",
      chapter: 1,
      slides: "Diap. 4–6",
      sectionHref: "#cap1-piramide",
      prompt: "Al descender desde la cúspide (Registros L0) hacia la base (Memoria Secundaria L3) en la pirámide de la jerarquía de memoria, ¿qué conjunto de relaciones se cumple simultáneamente?",
      options: [
        "Disminuye el coste por bit, aumenta la capacidad, aumenta el tiempo de acceso y disminuye la frecuencia de acceso del CPU",
        "Aumenta el coste por bit, aumenta la capacidad y disminuye la latencia de acceso",
        "Disminuye la capacidad, disminuye el tiempo de acceso y aumenta la frecuencia de acceso del CPU",
        "Se mantiene constante el tiempo de acceso mientras aumenta linealmente el coste por bit"
      ],
      correctIndex: 0,
      explanation: "Al bajar en la jerarquía (+t, +C en la Diapositiva 4), las tecnologías empleadas ofrecen mayor capacidad (+C) y menor coste por bit, a cambio de mayor tiempo de acceso (+t). El éxito del diseño exige que la frecuencia de acceso del procesador a los niveles lentos sea cada vez menor."
    },
    {
      id: "q3",
      chapter: 1,
      slides: "Diap. 7",
      sectionHref: "#cap1-ejecutable",
      prompt: "De acuerdo con la clasificación funcional de la jerarquía (Diapositiva 7), ¿qué niveles integran la denominada «Memoria Primaria o Ejecutable»?",
      options: [
        "Los Registros del CPU, los niveles de Memoria Caché (L1/L2) y la Memoria Principal (RAM)",
        "Únicamente los discos magnéticos rotativos y las unidades de estado sólido (SSD)",
        "La Memoria Principal junto con la Memoria Óptica y las cintas de respaldo",
        "Exclusivamente los registros internos de la ALU sin incluir la RAM"
      ],
      correctIndex: 0,
      explanation: "La Memoria Primaria (Ejecutable) abarca los registros del procesador, la caché y la Memoria Principal, pues la CPU se comunica con ella mediante direccionamiento nativo de instrucciones máquina; la Memoria Secundaria (discos, óptica, cintas) se gestiona mediante módulos de E/S."
    },

    /* --- CAPÍTULO 02 (Diapositivas 8–15) --- */
    {
      id: "q4",
      chapter: 2,
      slides: "Diap. 9 y 11",
      sectionHref: "#cap2-operacion",
      prompt: "Dentro de la familia de memorias semiconductoras no volátiles, ¿qué diferencia fundamental distingue a la memoria FLASH frente a una EEPROM tradicional y a una EPROM?",
      options: [
        "Permite borrado eléctrico rápido por bloques o sectores alcanzando alta densidad como la EPROM, sin requerir luz UV ni borrado byte a byte costoso",
        "Requiere exposición de 20 minutos a radiación ultravioleta (UV) a través de una ventana de cuarzo para borrar cada bloque",
        "Su contenido se graba por máscara en fábrica y solo admite una única programación por fusibles",
        "Está construida con celdas capacitivas MOS volátiles que exigen contador de refresco continuo"
      ],
      correctIndex: 0,
      explanation: "Según la Diapositiva 11, la EPROM se borra con luz UV íntegramente y la EEPROM permite borrado eléctrico a nivel de byte (menor densidad y mayor coste). La memoria FLASH surge como alternativa intermedia que borra eléctricamente bloques enteros logrando alta densidad y operaciones prácticas de lectura/escritura."
    },
    {
      id: "q5",
      chapter: 2,
      slides: "Diap. 12",
      sectionHref: "#cap2-acceso",
      prompt: "¿Cómo se clasifica el método de acceso empleado por las unidades de disco magnético u óptico y en qué consiste su mecanismo?",
      options: [
        "Acceso directo (o semisecuencial): posicionamiento directo a la vecindad general (pista) seguido de búsqueda secuencial y espera rotacional",
        "Acceso puramente aleatorio (RAM): tiempo de acceso idéntico e independiente de la ubicación previa del cabezal",
        "Acceso estrictamente secuencial: recorrido obligatorio desde el primer sector del disco en cada lectura",
        "Acceso asociativo por contenido: comparación simultánea en paralelo de todos los sectores del plato"
      ],
      correctIndex: 0,
      explanation: "En la Diapositiva 12 se distinguen tres métodos clásicos: Aleatorio (RAM semiconductora), Secuencial (cintas) y Directo o semisecuencial (unidades de disco), donde el cabezal salta directamente al cilindro/pista deseado y luego aguarda secuencialmente el paso del sector."
    },
    {
      id: "q6",
      chapter: 2,
      slides: "Diap. 13 y 15",
      sectionHref: "#cap2-direccionamiento",
      prompt: "¿Qué caracteriza a una memoria direccionable por contenido (memoria asociativa) frente al direccionamiento convencional por posición?",
      options: [
        "Almacena pares Etiqueta + Datos (Tag + Data) e identifica la localidad comparando parte de su contenido en todas las celdas simultáneamente",
        "Calcula la coordenada física sumando un desplazamiento fijo al contador de refresco de filas",
        "Solo puede direccionar bloques externos múltiplos del tamaño de un sector magnético",
        "Utiliza exclusivamente un decodificador lineal 1 entre N sin almacenar etiquetas"
      ],
      correctIndex: 0,
      explanation: "Como detalla la Diapositiva 13, las memorias asociativas localizan un dato a partir de un subconjunto de su propio contenido (Etiqueta/Tag), efectuando una búsqueda hardware simultánea en todas las celdas a la vez."
    },

    /* --- CAPÍTULO 03 (Diapositivas 16–22) --- */
    {
      id: "q7",
      chapter: 3,
      slides: "Diap. 17",
      sectionHref: "#cap3-chips",
      prompt: "En una memoria DRAM con direccionamiento multiplexado de filas y columnas (RAS/CAS), ¿qué efecto tiene sobre la capacidad total añadir 1 terminal (pin) adicional al bus de direcciones del chip?",
      options: [
        "La capacidad total del chip se multiplica por cuatro (×4), al duplicarse tanto el número de filas como el de columnas",
        "La capacidad total se incrementa únicamente en un 50% manteniendo constante el número de columnas",
        "La capacidad se duplica (×2) exactamente igual que en una memoria EPROM no multiplexada",
        "No altera la capacidad en bits, sino únicamente la anchura de palabra del registro MBR"
      ],
      correctIndex: 0,
      explanation: "Por la ley cuadrática destacada en la Diapositiva 17: como cada terminal de dirección se reutiliza tanto para la dirección de fila como para la de columna, 1 pin adicional multiplica por 2 las filas y por 2 las columnas (2 × 2 = 4), cuadruplicando la capacidad."
    },
    {
      id: "q8",
      chapter: 3,
      slides: "Diap. 18 y 19",
      sectionHref: "#cap3-dram16m",
      prompt: "En la DRAM típica de 16 Mbits organizada como 4M × 4 (cuatro matrices de 2048 × 2048), ¿cuántas terminales de dirección A0…An necesita el encapsulado y cuál es la función del MUX interno?",
      options: [
        "11 terminales de dirección (A0–A10, pues 2¹¹ = 2048); el MUX conmuta entre el buffer de dirección de fila y el contador de refresco",
        "22 terminales dedicadas (A0–A21); el MUX selecciona cuál de los 4 pines de datos D1–D4 está activo",
        "14 terminales de dirección (A0–A13); el MUX convierte palabras de 8 bits en palabras de 32 bits",
        "20 terminales de dirección y un pin Vpp de alta tensión para programación por ráfagas"
      ],
      correctIndex: 0,
      explanation: "Dado que 2¹¹ = 2,048, bastan 11 terminales (A0–A10) para suministrar primero los 11 bits de fila (RAS) y luego los 11 bits de columna (CAS). El MUX interno (Diap. 19, Fig. 4.4) selecciona entre la dirección de fila externa o el índice generado por el Contador de Refresco."
    },
    {
      id: "q9",
      chapter: 3,
      slides: "Diap. 20 y 21",
      sectionHref: "#cap3-modulos",
      prompt: "Si disponemos de chips de 512 × 512 × 1 bit (256 Kbits por chip), ¿cuántos chips y cuántos bits en el registro MAR se requieren para construir un módulo de 1 MByte con palabras de 8 bits?",
      options: [
        "32 chips organizados en 4 grupos de 8 chips cada uno, con un MAR de 20 bits (9 de fila + 9 de columna + 2 de selección de grupo)",
        "8 chips en un único banco paralelo, con un MAR de 18 bits (9 de fila + 9 de columna)",
        "16 chips organizados en 2 grupos, con un MAR de 24 bits y un MBR de 16 bits",
        "64 chips en serie con un MAR de 16 bits sin necesidad de habilitación de grupo"
      ],
      correctIndex: 0,
      explanation: "Un grupo de 8 chips en paralelo entrega palabras de 8 bits y cubre 256 KB (MAR de 9+9 = 18 bits, Diap. 20). Para alcanzar 1 MB (4 × 256 KB, Diap. 21) se disponen 4 grupos de 8 chips (= 32 chips) y se agregan 2 bits al MAR (total 20 bits) para seleccionar 1 de entre los 4 grupos."
    },

    /* --- CAPÍTULO 04 (Diapositivas 23–28) --- */
    {
      id: "q10",
      chapter: 4,
      slides: "Diap. 23 y 24",
      sectionHref: "#cap4-concepto",
      prompt: "¿Cómo difiere la unidad de transferencia en las dos interfaces de la memoria caché y qué ocurre exactamente ante un fallo de lectura (Cache Miss)?",
      options: [
        "Entre CPU y Caché se transfieren palabras, mientras que entre Caché y Memoria Principal se transfieren bloques completos; ante un fallo se carga el bloque requerido con su etiqueta en caché y se entrega la palabra al CPU",
        "Ambas interfaces transfieren únicamente bytes individuales sin almacenar etiquetas en la caché",
        "Entre CPU y Caché se transfieren páginas de disco y ante un fallo se invalida toda la memoria principal",
        "Ante un fallo la CPU lee directamente de la RAM omitiendo cargar el bloque en la memoria caché"
      ],
      correctIndex: 0,
      explanation: "Según las Diapositivas 23 y 24, la interfaz CPU↔Caché opera por palabras rápidas, mientras Caché↔Memoria Principal transfiere bloques (líneas) completos para aprovechar la localidad espacial, almacenando la Etiqueta (Tag) identificadora junto con los datos."
    },
    {
      id: "q11",
      chapter: 4,
      slides: "Diap. 25",
      sectionHref: "#cap4-localidad",
      prompt: "Según la Diapositiva 25, ¿qué relación existe entre la «Conjetura 90–10», la arquitectura ASPA y las dos componentes del Principio de Localidad de Referencia?",
      options: [
        "Los programas pasan ~90% del tiempo en ~10% del código; la localidad espacial refleja el acceso a ubicaciones contiguas (vectores/secuencialidad ASPA) y la localidad temporal refleja la reutilización próxima de una misma dirección (bucles y rutinas modulares)",
        "El 90% de la memoria caché es ROM y el 10% es SRAM; la localidad espacial solo ocurre en saltos incondicionales",
        "La localidad temporal depende exclusivamente del ancho del bus de direcciones y la espacial del contador de refresco",
        "El 90% de los accesos a caché resultan en fallo en arquitecturas secuenciales de programa almacenado"
      ],
      correctIndex: 0,
      explanation: "El éxito estadístico de las cachés se apoya en la regla empírica 90–10 y en la naturaleza secuencial ASPA: la localidad espacial aprovecha la contigüidad física de instrucciones y arreglos, mientras la localidad temporal aprovecha ciclos e invocaciones repetidas."
    },
    {
      id: "q12",
      chapter: 4,
      slides: "Diap. 27 y 28",
      sectionHref: "#cap4-ejemplo-base",
      prompt: "En el sistema base de estudio de la cátedra (Memoria Principal de 16 MBytes direccionable por byte, Caché de 64 KBytes y tamaño de bloque de 4 bytes), ¿cuántos bits tiene la dirección física y cuántas líneas posee la caché?",
      options: [
        "Dirección de 24 bits (2²⁴ = 16M) y caché de 16K líneas (2¹⁴ = 16,384 líneas de 4 bytes)",
        "Dirección de 20 bits y caché de 64K líneas de 1 byte",
        "Dirección de 32 bits y caché de 4K líneas de 16 bytes",
        "Dirección de 22 bits y caché de 8K líneas de 8 bytes"
      ],
      correctIndex: 0,
      explanation: "Como establece la Diapositiva 28: 16 MB = 2²⁴ bytes ⇒ dirección de 24 bits. Al dividir la caché de 64 KB (2¹⁶ bytes) entre bloques de 4 bytes (2² bytes), resultan 2¹⁶ / 2² = 2¹⁴ = 16K (16,384) líneas."
    },

    /* --- CAPÍTULO 05 (Diapositivas 29–43) --- */
    {
      id: "q13",
      chapter: 5,
      slides: "Diap. 31–33",
      sectionHref: "#cap5-directa",
      prompt: "Bajo Correspondencia Directa en el sistema de 16 MB RAM / 64 KB Caché (bloques de 4 B), ¿cómo se reparten los 24 bits de la dirección y a qué etiqueta y línea mapea la dirección hexadecimal 0x16339C?",
      options: [
        "8 bits de Etiqueta, 14 bits de Línea y 2 bits de Palabra; para 0x16339C la Etiqueta es 0x16 y la Línea es 0x0CE7",
        "14 bits de Etiqueta, 8 bits de Línea y 2 bits de Palabra; para 0x16339C la Etiqueta es 0x339C y la Línea es 0x16",
        "22 bits de Etiqueta y 2 bits de Palabra; para 0x16339C la Línea fija es 0x3FFF",
        "9 bits de Etiqueta, 13 bits de Línea y 2 bits de Palabra; para 0x16339C la Etiqueta es 0x16 y la Línea es 0x339C"
      ],
      correctIndex: 0,
      explanation: "En Correspondencia Directa (Diap. 31 y 33): w = 2 bits, b = 14 bits (16K líneas) y t = 24 − 14 − 2 = 8 bits. En 0x16339C: el byte superior es Etiqueta = 0x16, y 0x339C = 0011 0011 1001 11(00)₂ cuyos 14 bits superiores de línea equivalen a 00 1100 1110 0111₂ = 0x0CE7."
    },
    {
      id: "q14",
      chapter: 5,
      slides: "Diap. 34–38",
      sectionHref: "#cap5-asociativa",
      prompt: "¿Qué problema clásico de la Correspondencia Directa resuelve la Correspondencia Totalmente Asociativa (22 bits de Etiqueta + 2 bits de Palabra), y cuál es su principal penalización de diseño?",
      options: [
        "Elimina la expulsión mutua repetitiva (thrashing) de bloques que compiten por una misma línea fija, pero exige lógica comparadora simultánea muy costosa en todas las líneas",
        "Elimina la necesidad de almacenar etiquetas en la caché, pero triplica el tamaño del campo de palabra w",
        "Reduce a un solo comparador de 8 bits toda la caché, pero impide usar algoritmos de sustitución LRU",
        "Duplica la capacidad efectiva de la Memoria Principal sin usar comparadores en paralelo"
      ],
      correctIndex: 0,
      explanation: "En Correspondencia Directa dos bloques activos con igual índice de línea se desalojan continuamente (Diap. 34). La caché Totalmente Asociativa permite alojar cualquier bloque en cualquier línea libre, pero comparar 22 bits simultáneamente en 16,384 líneas encarece enormemente el hardware (Diap. 35)."
    },
    {
      id: "q15",
      chapter: 5,
      slides: "Diap. 39–43",
      sectionHref: "#cap5-conjuntos",
      prompt: "Si la misma caché de 64 KB (16K líneas de 4 bytes) se organiza como Asociativa por Conjuntos de 2 vías (Bs = 2 líneas por conjunto) con RAM de 16 MB, ¿cuál es el formato exacto de la dirección de 24 bits?",
      options: [
        "Etiqueta = 9 bits | Conjunto = 13 bits | Palabra = 2 bits (8,192 conjuntos de 2 vías cada uno)",
        "Etiqueta = 8 bits | Conjunto = 14 bits | Palabra = 2 bits (16,384 conjuntos de 2 vías)",
        "Etiqueta = 10 bits | Conjunto = 12 bits | Palabra = 2 bits (4,096 conjuntos de 2 vías)",
        "Etiqueta = 7 bits | Conjunto = 15 bits | Palabra = 2 bits (32,768 conjuntos)"
      ],
      correctIndex: 0,
      explanation: "Al agrupar 16,384 líneas de 2 en 2 resultan Sc = 16,384 / 2 = 8,192 = 2¹³ conjuntos ⇒ d = 13 bits de Conjunto, w = 2 bits de Palabra y t = 24 − 13 − 2 = 9 bits de Etiqueta (Diapositivas 40 y 41). Además, solo se requieren 2 comparadores de 9 bits."
    },

    /* --- CAPÍTULO 06 (Diapositivas 44–49) --- */
    {
      id: "q16",
      chapter: 6,
      slides: "Diap. 44 y 45",
      sectionHref: "#cap6-sustitucion",
      prompt: "Respecto a los algoritmos de sustitución en caché, ¿por qué deben implementarse en hardware y cómo resuelve eficientemente LRU la elección en una caché asociativa por conjuntos de 2 vías?",
      options: [
        "Se implementan en hardware para no degradar la velocidad del ciclo de acceso; en 2 vías basta 1 bit USE por línea que se pone a 1 al referenciarse y pone a 0 el de la otra vía",
        "Se ejecutan mediante interrupciones del sistema operativo cada vez que ocurre un acierto de lectura",
        "En Correspondencia Directa se requiere un contador LFU de 16 bits para elegir entre las 4 vías posibles",
        "FIFO sustituye siempre el bloque con menor número de referencias acumuladas mediante contadores de frecuencia"
      ],
      correctIndex: 0,
      explanation: "Como señala la Diapositiva 45, cualquier gestión por software anularía la ganancia de velocidad de la caché. En asociativa de 2 vías, LRU es óptimo y trivial: un único bit de uso identifica cuál de las dos líneas fue referenciada más recientemente y cuál lleva más tiempo sin usarse."
    },
    {
      id: "q17",
      chapter: 6,
      slides: "Diap. 46 y 47",
      sectionHref: "#cap6-writethrough",
      prompt: "¿Cuál es el principio operativo, la ventaja clave en multiprocesadores y el principal inconveniente de la política de escritura inmediata (Write-Through)?",
      options: [
        "Toda escritura se efectúa tanto en caché como en Memoria Principal; permite a otras CPUs vigilar (snooping) el tráfico del bus para mantener coherencia, pero genera alto tráfico y cuellos de botella",
        "Escribe únicamente en la caché activando el dirty bit y nunca utiliza el bus del sistema hasta apagar el equipo",
        "Impide que existan múltiples procesadores en un mismo bus compartido al deshabilitar las lecturas de RAM",
        "Solo actualiza la Memoria Principal e invalida permanentemente la caché en cada instrucción de lectura"
      ],
      correctIndex: 0,
      explanation: "En Write-Through (Diapositiva 47), cada escritura atraviesa la caché hacia la Memoria Principal garantizando su vigencia inmediata y facilitando el monitoreo del bus por otras CPUs, a costa de un elevado tráfico de memoria y mayor latencia de escritura."
    },
    {
      id: "q18",
      chapter: 6,
      slides: "Diap. 48",
      sectionHref: "#cap6-writeback",
      prompt: "En la política de post-escritura (Write-Back), ¿qué función cumple el bit de actualización («dirty bit») y qué precaución exige para los módulos de Entrada/Salida?",
      options: [
        "Indica si la línea en caché fue modificada; solo si está activo al momento de sustituir el bloque se escribe primero a Memoria Principal, obligando a coordinar los accesos de E/S a través de la caché o protocolos de coherencia",
        "Bloquea permanentemente la línea en caché para que ningún algoritmo de sustitución pueda reemplazarla jamás",
        "Indica un error de paridad en el contador de refresco de la memoria secundaria óptica",
        "Fuerza la escritura inmediata en disco duro cada vez que el procesador lee un registro interno L0"
      ],
      correctIndex: 0,
      explanation: "Según la Diapositiva 48, Write-Back actualiza inicialmente solo la caché y activa el dirty bit. Al desalojar la línea, solo se vuelca a RAM si el dirty bit vale 1, reduciendo drásticamente el tráfico del bus, pero exigiendo protocolos de coherencia multicaché y control estricto sobre DMA/E-S."
    }
  ];

  /* ========================================================================
     3. Estado Reactivo del Motor de Evaluación
     ======================================================================== */
  let state = {
    mode: "all",          // "all" | "quick10" | "cap1".."cap6" | "retry_wrong"
    shuffle: false,
    questions: [],        // Array de preguntas activas en este intento (con opciones permutadas si shuffle=true)
    currentIndex: 0,
    answers: {},          // { [questionId]: selectedDisplayIndex }
    startedAt: Date.now(),
    elapsedSec: 0,
    timerId: null,
    finished: false,
    reviewFilter: "all"   // "all" | "wrong" | "ok"
  };

  /* Referencias DOM */
  const els = {
    modeSelect: document.getElementById("quiz-mode-select"),
    shuffleCheck: document.getElementById("quiz-shuffle-check"),
    restartBtn: document.getElementById("quiz-restart-top-btn"),

    activeView: document.getElementById("quiz-active-view"),
    summaryView: document.getElementById("quiz-summary-view"),

    hudProgress: document.getElementById("hud-progress"),
    hudScore: document.getElementById("hud-score"),
    hudHits: document.getElementById("hud-hits"),
    hudTimer: document.getElementById("hud-timer"),

    stepper: document.getElementById("quiz-stepper"),
    qChapter: document.getElementById("quiz-q-chapter"),
    qSlides: document.getElementById("quiz-q-slides"),
    qCounterLabel: document.getElementById("quiz-q-counter-label"),
    qPrompt: document.getElementById("quiz-q-prompt"),
    optionsList: document.getElementById("quiz-options-list"),

    feedbackBox: document.getElementById("quiz-feedback-box"),
    feedbackHead: document.getElementById("quiz-feedback-head"),
    feedbackBody: document.getElementById("quiz-feedback-body"),
    feedbackLink: document.getElementById("quiz-feedback-link"),

    prevBtn: document.getElementById("quiz-prev-btn"),
    nextBtn: document.getElementById("quiz-next-btn"),
    finishBtn: document.getElementById("quiz-finish-btn"),

    /* Resumen */
    ringCircle: document.getElementById("summary-ring-circle"),
    ringScoreText: document.getElementById("summary-ring-score"),
    gradeBadge: document.getElementById("summary-grade-badge"),
    summaryHeadline: document.getElementById("summary-headline"),
    summarySubtext: document.getElementById("summary-subtext"),
    kpiCorrect: document.getElementById("kpi-correct"),
    kpiWrong: document.getElementById("kpi-wrong"),
    kpiTime: document.getElementById("kpi-time"),
    kpiBest: document.getElementById("kpi-best"),

    retryAllBtn: document.getElementById("summary-retry-all-btn"),
    retryWrongBtn: document.getElementById("summary-retry-wrong-btn"),
    printSummaryBtn: document.getElementById("summary-print-btn"),

    masteryGrid: document.getElementById("chapter-mastery-grid"),
    reviewList: document.getElementById("quiz-review-list"),
    filterAllBtn: document.getElementById("rev-filter-all"),
    filterWrongBtn: document.getElementById("rev-filter-wrong"),
    filterOkBtn: document.getElementById("rev-filter-ok")
  };

  if (!els.activeView) return;

  /* ========================================================================
     4. Utilidades de Selección, Barajado y Cronómetro
     ======================================================================== */
  function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function formatTime(totalSec) {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return String(mins).padStart(2, "0") + ":" + String(secs).padStart(2, "0");
  }

  function prepareQuestionInstance(q, shouldShuffleOpts) {
    const indexedOpts = q.options.map((text, idx) => ({
      text: text,
      isCorrect: idx === q.correctIndex
    }));
    const finalOpts = shouldShuffleOpts ? shuffleArray(indexedOpts) : indexedOpts;
    return {
      id: q.id,
      chapter: q.chapter,
      slides: q.slides,
      sectionHref: q.sectionHref,
      prompt: q.prompt,
      options: finalOpts,
      correctDisplayIndex: finalOpts.findIndex((o) => o.isCorrect),
      explanation: q.explanation
    };
  }

  function startTimer() {
    stopTimer();
    state.startedAt = Date.now() - state.elapsedSec * 1000;
    state.timerId = window.setInterval(function () {
      if (state.finished) return;
      state.elapsedSec = Math.floor((Date.now() - state.startedAt) / 1000);
      if (els.hudTimer) els.hudTimer.textContent = formatTime(state.elapsedSec);
    }, 1000);
  }

  function stopTimer() {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  /* ========================================================================
     5. Inicialización de un Intento de Evaluación
     ======================================================================== */
  function startQuiz(customBaseQuestions) {
    const mode = els.modeSelect ? els.modeSelect.value : "all";
    const shouldShuffle = els.shuffleCheck ? els.shuffleCheck.checked : false;

    let pool = [];
    if (Array.isArray(customBaseQuestions) && customBaseQuestions.length > 0) {
      pool = customBaseQuestions.slice();
      state.mode = "retry_wrong";
    } else {
      state.mode = mode;
      if (mode === "all") {
        pool = QUESTION_BANK.slice();
      } else if (mode === "quick10") {
        pool = shuffleArray(QUESTION_BANK).slice(0, 10);
      } else if (mode.startsWith("cap")) {
        const capNum = parseInt(mode.replace("cap", ""), 10);
        pool = QUESTION_BANK.filter((q) => q.chapter === capNum);
      } else {
        pool = QUESTION_BANK.slice();
      }
    }

    if (shouldShuffle && mode !== "quick10") {
      pool = shuffleArray(pool);
    }

    // Siempre barajar el orden de las 4 opciones si el usuario marcó Mezclar,
    // o también ligeramente cuando reintenta para evitar memorización mecánica:
    state.shuffle = shouldShuffle;
    state.questions = pool.map((q) => prepareQuestionInstance(q, shouldShuffle));
    state.currentIndex = 0;
    state.answers = {};
    state.elapsedSec = 0;
    state.finished = false;
    state.reviewFilter = "all";

    els.summaryView.classList.remove("active");
    els.activeView.style.display = "block";
    if (els.hudTimer) els.hudTimer.textContent = "00:00";

    startTimer();
    renderActiveQuestion();
  }

  /* ========================================================================
     6. Cálculo de Puntaje en Vivo y Renderizado de Pregunta Activa
     ======================================================================== */
  function computeStats() {
    const total = state.questions.length;
    let answered = 0;
    let correct = 0;
    let wrong = 0;

    state.questions.forEach((q) => {
      if (Object.prototype.hasOwnProperty.call(state.answers, q.id)) {
        answered++;
        if (state.answers[q.id] === q.correctDisplayIndex) {
          correct++;
        } else {
          wrong++;
        }
      }
    });

    const score100 = total > 0 ? Math.round((correct / total) * 100) : 0;
    return { total, answered, correct, wrong, unanswered: total - answered, score100 };
  }

  function renderHudAndStepper() {
    const stats = computeStats();
    if (els.hudProgress) {
      els.hudProgress.textContent = stats.answered + " / " + stats.total;
    }
    if (els.hudScore) {
      els.hudScore.textContent = stats.score100 + " / 100 pts";
    }
    if (els.hudHits) {
      els.hudHits.textContent = stats.correct + " ✓ · " + stats.wrong + " ✗";
    }

    if (els.stepper) {
      els.stepper.innerHTML = state.questions
        .map((q, idx) => {
          const hasAns = Object.prototype.hasOwnProperty.call(state.answers, q.id);
          let cls = "step-dot";
          if (idx === state.currentIndex) cls += " current";
          if (hasAns) {
            cls += state.answers[q.id] === q.correctDisplayIndex ? " correct" : " wrong";
          }
          return (
            '<button type="button" class="' +
            cls +
            '" data-step="' +
            idx +
            '" title="Ir a la pregunta ' +
            (idx + 1) +
            '">' +
            (idx + 1) +
            "</button>"
          );
        })
        .join("");
    }
  }

  function renderActiveQuestion() {
    renderHudAndStepper();
    const q = state.questions[state.currentIndex];
    if (!q) return;

    const chMeta = CHAPTERS_META[q.chapter];
    const hasAnswered = Object.prototype.hasOwnProperty.call(state.answers, q.id);
    const chosenIdx = hasAnswered ? state.answers[q.id] : -1;

    if (els.qChapter) els.qChapter.textContent = chMeta.code + " · " + chMeta.name;
    if (els.qSlides) els.qSlides.textContent = q.slides;
    if (els.qCounterLabel) {
      els.qCounterLabel.textContent =
        "Pregunta " + (state.currentIndex + 1) + " de " + state.questions.length;
    }
    if (els.qPrompt) els.qPrompt.textContent = q.prompt;

    const letters = ["A", "B", "C", "D"];
    els.optionsList.innerHTML = q.options
      .map((opt, idx) => {
        let cls = "quiz-option-btn";
        if (hasAnswered) {
          if (idx === q.correctDisplayIndex) {
            cls += " is-correct";
          } else if (idx === chosenIdx) {
            cls += " is-wrong";
          } else {
            cls += " dimmed";
          }
        }
        return (
          '<button type="button" class="' +
          cls +
          '" data-opt-idx="' +
          idx +
          '" ' +
          (hasAnswered ? "disabled" : "") +
          ">" +
          '<span class="opt-letter">' +
          letters[idx] +
          "</span>" +
          "<span>" +
          opt.text +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    // Retroalimentación inmediata
    if (hasAnswered) {
      const isOk = chosenIdx === q.correctDisplayIndex;
      els.feedbackBox.classList.add("visible");
      els.feedbackBox.classList.toggle("wrong", !isOk);
      els.feedbackHead.textContent = isOk
        ? "¡Respuesta Correcta! (+ " + (100 / state.questions.length).toFixed(1) + " pts)"
        : "Respuesta Incorrecta · La opción correcta es la " + letters[q.correctDisplayIndex];
      els.feedbackBody.textContent = q.explanation;
      els.feedbackLink.href = q.sectionHref;
      els.feedbackLink.textContent = "Repasar teoría en " + chMeta.code + " (" + q.slides + ") →";
    } else {
      els.feedbackBox.classList.remove("visible", "wrong");
    }

    // Botones inferior Anterior / Siguiente / Finalizar
    if (els.prevBtn) {
      els.prevBtn.disabled = state.currentIndex === 0;
      els.prevBtn.style.opacity = state.currentIndex === 0 ? "0.45" : "1";
    }
    if (els.nextBtn) {
      const isLast = state.currentIndex === state.questions.length - 1;
      els.nextBtn.style.display = isLast ? "none" : "inline-flex";
    }
  }

  /* Eventos de respuesta y navegación */
  els.optionsList.addEventListener("click", function (e) {
    const btn = e.target.closest(".quiz-option-btn");
    if (!btn || btn.disabled) return;
    const q = state.questions[state.currentIndex];
    const optIdx = parseInt(btn.dataset.optIdx, 10);
    state.answers[q.id] = optIdx;
    renderActiveQuestion();
  });

  els.stepper.addEventListener("click", function (e) {
    const dot = e.target.closest(".step-dot");
    if (!dot) return;
    state.currentIndex = parseInt(dot.dataset.step, 10);
    renderActiveQuestion();
  });

  if (els.prevBtn) {
    els.prevBtn.addEventListener("click", function () {
      if (state.currentIndex > 0) {
        state.currentIndex--;
        renderActiveQuestion();
      }
    });
  }

  if (els.nextBtn) {
    els.nextBtn.addEventListener("click", function () {
      if (state.currentIndex < state.questions.length - 1) {
        state.currentIndex++;
        renderActiveQuestion();
      }
    });
  }

  /* ========================================================================
     7. Finalización y Generación del Resumen Analítico Completo
     ======================================================================== */
  function finishAndShowSummary() {
    const stats = computeStats();
    if (stats.unanswered > 0) {
      const proceed = window.confirm(
        "Aún tienes " +
          stats.unanswered +
          " pregunta(s) sin responder (contarán como incorrectas en el puntaje final). ¿Deseas finalizar y ver el resumen completo ahora?"
      );
      if (!proceed) return;
    }

    state.finished = true;
    stopTimer();

    // Guardar récord histórico en localStorage
    let bestScore = stats.score100;
    try {
      const prevBest = parseInt(localStorage.getItem("uni_amc2_u6_best_score") || "0", 10);
      if (stats.score100 > prevBest) {
        localStorage.setItem("uni_amc2_u6_best_score", String(stats.score100));
      } else {
        bestScore = prevBest;
      }
    } catch (_) {}

    els.activeView.style.display = "none";
    els.summaryView.classList.add("active");

    // Configurar anillo SVG (radio = 68 => circunferencia = 2 * pi * 68 ≈ 427.26)
    const circumference = 427.26;
    const offset = circumference - (stats.score100 / 100) * circumference;
    if (els.ringCircle) {
      els.ringCircle.style.strokeDasharray = String(circumference);
      els.ringCircle.style.strokeDashoffset = String(offset);
      if (stats.score100 >= 80) els.ringCircle.setAttribute("stroke", "var(--svg-green)");
      else if (stats.score100 >= 60) els.ringCircle.setAttribute("stroke", "var(--svg-gold)");
      else els.ringCircle.setAttribute("stroke", "var(--svg-rose)");
    }
    if (els.ringScoreText) els.ringScoreText.textContent = stats.score100;

    // Calificación cualitativa académica
    let gradeLabel = "";
    let headline = "";
    let subtext = "";
    if (stats.score100 >= 90) {
      gradeLabel = "Excelente · Dominio Sobresaliente";
      headline = "¡Dominio sobresaliente del Sistema de Memoria!";
      subtext = "Manejas con rigor tanto la física y modularidad DRAM como las funciones de correspondencia y políticas de coherencia.";
    } else if (stats.score100 >= 80) {
      gradeLabel = "Muy Bueno · Aprobado con Solvencia";
      headline = "¡Muy buen desempeño académico en la Unidad 6!";
      subtext = "Tienes bases sólidas en casi todos los capítulos. Revisa abajo los detalles puntuales para alcanzar el 100%.";
    } else if (stats.score100 >= 70) {
      gradeLabel = "Bueno · Aprobado";
      headline = "Evaluación aprobada satisfactoriamente";
      subtext = "Comprendes los conceptos esenciales, aunque conviene reforzar los capítulos con menor porcentaje en el diagnóstico inferior.";
    } else if (stats.score100 >= 60) {
      gradeLabel = "Suficiente · En Umbral de Aprobación";
      headline = "Aprobación ajustada: se recomienda repaso focalizado";
      subtext = "Utiliza el botón «Practicar Solo Preguntas Falladas» y consulta las diapositivas señaladas en cada explicación.";
    } else {
      gradeLabel = "Requiere Refuerzo Académico";
      headline = "Es momento de repasar los diagramas y ejemplos clave";
      subtext = "Revisa el desglose completo pregunta por pregunta abajo para consolidar los conceptos de la Unidad 6 antes del examen.";
    }

    if (els.gradeBadge) els.gradeBadge.textContent = gradeLabel;
    if (els.summaryHeadline) els.summaryHeadline.textContent = headline;
    if (els.summarySubtext) els.summarySubtext.textContent = subtext;

    if (els.kpiCorrect) els.kpiCorrect.textContent = stats.correct + " / " + stats.total;
    if (els.kpiWrong) els.kpiWrong.textContent = stats.wrong + stats.unanswered;
    if (els.kpiTime) els.kpiTime.textContent = formatTime(state.elapsedSec);
    if (els.kpiBest) els.kpiBest.textContent = bestScore + " / 100";

    // Mostrar/ocultar botón de practicar solo falladas
    const failedCount = stats.wrong + stats.unanswered;
    if (els.retryWrongBtn) {
      els.retryWrongBtn.style.display = failedCount > 0 ? "inline-flex" : "none";
      els.retryWrongBtn.textContent = "Practicar Solo Falladas (" + failedCount + ")";
    }

    renderChapterMastery();
    renderDetailedReview("all");
  }

  function renderChapterMastery() {
    if (!els.masteryGrid) return;
    const cardsHtml = Object.keys(CHAPTERS_META)
      .map((chKey) => {
        const chNum = parseInt(chKey, 10);
        const meta = CHAPTERS_META[chNum];
        const chQuestions = state.questions.filter((q) => q.chapter === chNum);
        if (chQuestions.length === 0) return "";

        let hits = 0;
        chQuestions.forEach((q) => {
          if (state.answers[q.id] === q.correctDisplayIndex) hits++;
        });
        const pct = Math.round((hits / chQuestions.length) * 100);
        let barColor = "var(--accent-emerald)";
        let statusText = "Dominado";
        if (pct < 50) {
          barColor = "var(--accent-rose)";
          statusText = "Prioridad de repaso";
        } else if (pct < 90) {
          barColor = "var(--accent-amber)";
          statusText = "En consolidación";
        }

        return (
          '<div class="mastery-card">' +
          '<div class="mastery-top">' +
          "<span>" + meta.code + ": " + meta.name + "</span>" +
          '<span class="mono">' + hits + "/" + chQuestions.length + " (" + pct + "%)</span>" +
          "</div>" +
          '<div class="mastery-bar-track">' +
          '<div class="mastery-bar-fill" style="width:' + pct + "%; background:" + barColor + '"></div>' +
          "</div>" +
          '<div class="mastery-foot">' +
          "<span>" + statusText + " · " + meta.slides + "</span>" +
          '<a href="' + meta.href + '">Ir al capítulo →</a>' +
          "</div>" +
          "</div>"
        );
      })
      .join("");

    els.masteryGrid.innerHTML = cardsHtml;
  }

  function renderDetailedReview(filter) {
    state.reviewFilter = filter;
    if (els.filterAllBtn) els.filterAllBtn.classList.toggle("active", filter === "all");
    if (els.filterWrongBtn) els.filterWrongBtn.classList.toggle("active", filter === "wrong");
    if (els.filterOkBtn) els.filterOkBtn.classList.toggle("active", filter === "ok");

    const letters = ["A", "B", "C", "D"];
    const items = state.questions.filter((q) => {
      const isOk = state.answers[q.id] === q.correctDisplayIndex;
      if (filter === "ok") return isOk;
      if (filter === "wrong") return !isOk;
      return true;
    });

    if (items.length === 0) {
      els.reviewList.innerHTML =
        '<div class="callout emerald"><div class="callout-title">Sin elementos en este filtro</div><p>No hay preguntas que coincidan con el filtro seleccionado.</p></div>';
      return;
    }

    els.reviewList.innerHTML = items
      .map((q) => {
        const origIdx = state.questions.indexOf(q) + 1;
        const hasAns = Object.prototype.hasOwnProperty.call(state.answers, q.id);
        const userIdx = hasAns ? state.answers[q.id] : -1;
        const isOk = userIdx === q.correctDisplayIndex;
        const meta = CHAPTERS_META[q.chapter];

        const userText = hasAns
          ? letters[userIdx] + ") " + q.options[userIdx].text
          : "Sin responder (en blanco)";
        const correctText =
          letters[q.correctDisplayIndex] + ") " + q.options[q.correctDisplayIndex].text;

        return (
          '<div class="review-item ' + (isOk ? "ok" : "fail") + '">' +
          '<div class="review-item-head">' +
          "<span>Pregunta #" + origIdx + " · " + meta.code + " (" + q.slides + ")</span>" +
          '<span class="review-status-chip ' + (isOk ? "ok" : "fail") + '">' +
          (isOk ? "✓ Correcta" : hasAns ? "✗ Incorrecta" : "— En blanco") +
          "</span>" +
          "</div>" +
          '<div class="review-q-title">' + q.prompt + "</div>" +
          '<div class="review-answers-compare">' +
          '<div class="review-ans-box">' +
          '<div style="font-size:0.74rem; font-weight:700; color:var(--text-muted)">TU RESPUESTA:</div>' +
          '<div style="color:' + (isOk ? "var(--accent-emerald)" : "var(--accent-rose)") + '; font-weight:600">' +
          userText +
          "</div>" +
          "</div>" +
          '<div class="review-ans-box">' +
          '<div style="font-size:0.74rem; font-weight:700; color:var(--text-muted)">RESPUESTA CORRECTA OFICIAL:</div>' +
          '<div style="color:var(--accent-emerald); font-weight:600">' +
          correctText +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="review-expl"><strong>Fundamento académico:</strong> ' +
          q.explanation +
          ' <a href="' + q.sectionHref + '" style="font-weight:700; margin-left:0.35rem">Ver en el portal →</a></div>' +
          "</div>"
        );
      })
      .join("");
  }

  /* Controles del Resumen y Configuración */
  if (els.finishBtn) {
    els.finishBtn.addEventListener("click", finishAndShowSummary);
  }
  if (els.restartBtn) {
    els.restartBtn.addEventListener("click", function () {
      startQuiz();
    });
  }
  if (els.modeSelect) {
    els.modeSelect.addEventListener("change", function () {
      startQuiz();
    });
  }
  if (els.shuffleCheck) {
    els.shuffleCheck.addEventListener("change", function () {
      startQuiz();
    });
  }
  if (els.retryAllBtn) {
    els.retryAllBtn.addEventListener("click", function () {
      if (els.shuffleCheck) els.shuffleCheck.checked = true;
      startQuiz();
      document.getElementById("quiz-evaluacion").scrollIntoView({ behavior: "smooth" });
    });
  }
  if (els.retryWrongBtn) {
    els.retryWrongBtn.addEventListener("click", function () {
      const wrongIds = state.questions
        .filter((q) => state.answers[q.id] !== q.correctDisplayIndex)
        .map((q) => q.id);
      const baseSubset = QUESTION_BANK.filter((bq) => wrongIds.includes(bq.id));
      startQuiz(baseSubset);
      document.getElementById("quiz-evaluacion").scrollIntoView({ behavior: "smooth" });
    });
  }
  if (els.printSummaryBtn) {
    els.printSummaryBtn.addEventListener("click", function () {
      window.print();
    });
  }
  if (els.filterAllBtn) {
    els.filterAllBtn.addEventListener("click", function () {
      renderDetailedReview("all");
    });
  }
  if (els.filterWrongBtn) {
    els.filterWrongBtn.addEventListener("click", function () {
      renderDetailedReview("wrong");
    });
  }
  if (els.filterOkBtn) {
    els.filterOkBtn.addEventListener("click", function () {
      renderDetailedReview("ok");
    });
  }

  /* Arrancar el Quiz por defecto listo para contestar */
  startQuiz();
})();

