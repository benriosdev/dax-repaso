// Fuente única de navegación: categorías, asignaturas y rutas.
// Las rutas (href) son relativas a la raíz del proyecto; main.js les añade BASE_PATH.
// updated: fecha (AAAA-MM-DD) de la última revisión del contenido de la página.
// related: ids de 2 a 4 páginas relacionadas, que se muestran al final de la página.
const SITE = {
  categories: [
    {
      name: "Programación",
      icon: "bi-code-slash",
      color: "prog",
      pages: [
        {
          id: "programacion-a",
          title: "Programación A",
          href: "programacion-a/",
          card: "De cero a la POO: algoritmos, estructuras de control, depuración y las bases de la programación orientada a objetos en Java.",
          updated: "2026-09-26",
          related: ["programacion-b", "fundamentos-java", "chuleta-java"]
        },
        {
          id: "programacion-b",
          title: "Programación B",
          href: "programacion-b/",
          card: "Continúa la POO (herencia, polimorfismo), estructuras de datos y conexión de programas Java con bases de datos (CRUD).",
          updated: "2026-09-26",
          related: ["programacion-a", "chuleta-java", "bases-datos-b"]
        },
        {
          id: "fundamentos-java",
          title: "Fundamentos de Java",
          href: "fundamentos-java/",
          card: "Guía práctica y compacta de Java: instalación del JDK, sintaxis básica, POO, colecciones y modificadores de acceso.",
          updated: "2026-09-26",
          related: ["programacion-a", "chuleta-java"]
        },
        {
          id: "entornos-desarrollo",
          title: "Entornos de Desarrollo",
          href: "entornos-desarrollo/",
          card: "Ciclo de vida del software, IDEs, pruebas y depuración, control de versiones y modelado UML.",
          updated: "2026-09-26",
          related: ["git", "github", "chuleta-git"]
        }
      ]
    },
    {
      name: "Bases de Datos",
      icon: "bi-database",
      color: "bbdd",
      pages: [
        {
          id: "bases-datos-a",
          title: "Bases de Datos A",
          href: "bases-datos-a/",
          card: "Fundamentos de BBDD, modelo entidad-relación, modelo relacional, normalización y primeros pasos con Oracle y SQL.",
          updated: "2026-09-26",
          related: ["anexo-entidad-relacion", "chuleta-sql", "mysql-workbench"]
        },
        {
          id: "bases-datos-b",
          title: "Bases de Datos B",
          href: "bases-datos-b/",
          card: "DML avanzado, transacciones y concurrencia, programación en BBDD (PL/SQL) y una introducción a las BBDD no relacionales.",
          updated: "2026-09-26",
          related: ["bases-datos-a", "chuleta-sql", "supabase"]
        },
        {
          id: "anexo-entidad-relacion",
          title: "Anexo: Modelo Entidad-Relación",
          href: "anexo-entidad-relacion/",
          card: "Chuleta visual de la notación entidad-relación: entidades, atributos, relaciones y cardinalidades.",
          updated: "2026-09-26",
          related: ["bases-datos-a", "mysql-workbench"]
        }
      ]
    },
    {
      name: "Sistemas y Redes",
      icon: "bi-hdd-network",
      color: "sist",
      pages: [
        {
          id: "sistemas-informaticos",
          title: "Sistemas Informáticos",
          href: "sistemas-informaticos/",
          card: "Arquitectura de equipos, sistemas operativos, gestión de la información, redes y aplicaciones de propósito general.",
          updated: "2026-09-26",
          related: ["chuleta-linux", "docker"]
        },
        {
          id: "digitalizacion",
          title: "Digitalización",
          href: "digitalizacion/",
          card: "Transformación digital de empresas: tecnologías habilitadoras, cloud, inteligencia artificial y análisis de datos.",
          updated: "2026-09-26",
          related: ["sostenibilidad", "lenguaje-marcas"]
        },
        {
          id: "lenguaje-marcas",
          title: "Lenguaje de Marcas",
          href: "lenguaje-marcas/",
          card: "HTML, CSS, XML, JavaScript y sistemas de gestión empresarial (ERP/CRM) con Odoo.",
          updated: "2026-09-26",
          related: ["chuleta-http", "digitalizacion"]
        }
      ]
    },
    {
      name: "Inglés",
      icon: "bi-translate",
      color: "ing",
      pages: [
        {
          id: "ingles-material",
          title: "Inglés — Unidades",
          href: "ingles-material/",
          card: "10 unidades de inglés profesional: tiempos verbales, redacción de emails/CV, cultura anglosajona y vocabulario técnico.",
          updated: "2026-09-26",
          related: ["ingles-diapositivas", "vocabulary"]
        },
        {
          id: "ingles-diapositivas",
          title: "Inglés — Gramática y destrezas",
          href: "ingles-diapositivas/",
          card: "Mapa de las cinco destrezas del inglés profesional y del bloque de gramática asociado a cada una.",
          updated: "2026-09-26",
          related: ["ingles-material", "vocabulary"]
        },
        {
          id: "vocabulary",
          title: "Vocabulary DAM-DAW-ASIR",
          href: "vocabulary/",
          card: "Glosario de vocabulario técnico en inglés: desarrollo de apps, metodologías, arquitectura, despliegue y seguridad.",
          updated: "2026-09-26",
          related: ["ingles-material", "ingles-diapositivas"]
        }
      ]
    },
    {
      name: "Transversales",
      icon: "bi-people",
      color: "trans",
      pages: [
        {
          id: "ipe1",
          title: "IPE I",
          href: "ipe1/",
          card: "Sector productivo, prevención de riesgos laborales, condiciones de trabajo y orientación profesional.",
          updated: "2026-09-26",
          related: ["sostenibilidad", "digitalizacion"]
        },
        {
          id: "sostenibilidad",
          title: "Sostenibilidad",
          href: "sostenibilidad/",
          card: "Retos ambientales y sociales, ODS, economía circular y elaboración de un plan de sostenibilidad empresarial.",
          updated: "2026-09-26",
          related: ["ipe1", "digitalizacion"]
        }
      ]
    },
    {
      name: "Herramientas",
      icon: "bi-tools",
      color: "herr",
      separator: true,
      pages: [
        {
          id: "git",
          title: "Git",
          href: "git/",
          card: "Control de versiones: commits, ramas, merges y el flujo de trabajo diario con Git, sin depender de ninguna plataforma concreta.",
          updated: "2026-09-26",
          related: ["chuleta-git", "github", "entornos-desarrollo"]
        },
        {
          id: "github",
          title: "GitHub",
          href: "github/",
          card: "Repositorios remotos, pull requests, issues y Actions: cómo se colabora en Git a través de GitHub.",
          updated: "2026-09-26",
          related: ["git", "chuleta-git"]
        },
        {
          id: "docker",
          title: "Docker",
          href: "docker/",
          card: "Contenedores: imágenes, Dockerfile, volúmenes y redes para ejecutar aplicaciones de forma aislada y reproducible.",
          updated: "2026-09-26",
          related: ["chuleta-linux", "sistemas-informaticos"]
        },
        {
          id: "mysql-workbench",
          title: "MySQL Workbench",
          href: "mysql-workbench/",
          card: "Gestión visual de bases de datos MySQL: modelado ER, ejecución de consultas y administración de conexiones.",
          updated: "2026-09-26",
          related: ["chuleta-sql", "bases-datos-a", "anexo-entidad-relacion"]
        },
        {
          id: "supabase",
          title: "Supabase",
          href: "supabase/",
          card: "Backend as a Service sobre PostgreSQL: base de datos, autenticación, almacenamiento y APIs generadas automáticamente.",
          updated: "2026-09-26",
          related: ["chuleta-sql", "bases-datos-b", "chuleta-http"]
        }
      ]
    },
    {
      name: "Chuletas",
      icon: "bi-lightning-charge",
      color: "chul",
      pages: [
        {
          id: "chuleta-sql",
          title: "SQL",
          href: "chuleta-sql/",
          card: "Referencia rápida: SELECT, filtros, INSERT/UPDATE/DELETE, agregaciones, JOIN y errores frecuentes.",
          updated: "2026-09-26",
          related: ["bases-datos-a", "bases-datos-b", "mysql-workbench"]
        },
        {
          id: "chuleta-git",
          title: "Comandos de Git",
          href: "chuleta-git/",
          card: "Referencia rápida: ciclo diario, ramas, deshacer cambios (restore, reset, revert, stash) y remotos.",
          updated: "2026-09-26",
          related: ["git", "github"]
        },
        {
          id: "chuleta-java",
          title: "Sintaxis de Java",
          href: "chuleta-java/",
          card: "Referencia rápida: tipos, control de flujo, Strings, arrays y colecciones, clases, herencia y excepciones.",
          updated: "2026-09-26",
          related: ["fundamentos-java", "programacion-a", "programacion-b"]
        },
        {
          id: "chuleta-linux",
          title: "Comandos de Linux",
          href: "chuleta-linux/",
          card: "Referencia rápida: navegación, archivos, búsqueda, permisos (chmod), procesos, redirecciones y errores frecuentes.",
          updated: "2026-09-26",
          related: ["sistemas-informaticos", "docker"]
        },
        {
          id: "chuleta-http",
          title: "HTTP",
          href: "chuleta-http/",
          card: "Referencia rápida: peticiones y respuestas, métodos, códigos de estado, cabeceras y una API REST de ejemplo.",
          updated: "2026-09-26",
          related: ["lenguaje-marcas", "supabase"]
        }
      ]
    }
  ],
  extras: [
    { id: "glosario", title: "Glosario", href: "glosario/", icon: "bi-journal-text", color: "glos" }
  ]
};
