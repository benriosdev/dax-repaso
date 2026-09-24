// Fuente única de navegación: categorías, asignaturas, rutas y PDFs de origen.
// Las rutas (href/pdf) son relativas a la raíz del proyecto; main.js les añade BASE_PATH.
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
          card: "De cero a la POO: algoritmos, estructuras de control, depuración y las bases de la programación orientada a objetos en Java."
        },
        {
          id: "programacion-b",
          title: "Programación B",
          href: "programacion-b/",
          card: "Continúa la POO (herencia, polimorfismo), estructuras de datos y conexión de programas Java con bases de datos (CRUD)."
        },
        {
          id: "fundamentos-java",
          title: "Fundamentos de Java",
          href: "fundamentos-java/",
          card: "Guía práctica y compacta de Java: instalación del JDK, sintaxis básica, POO, colecciones y modificadores de acceso."
        },
        {
          id: "entornos-desarrollo",
          title: "Entornos de Desarrollo",
          href: "entornos-desarrollo/",
          card: "Ciclo de vida del software, IDEs, pruebas y depuración, control de versiones y modelado UML."
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
          card: "Fundamentos de BBDD, modelo entidad-relación, modelo relacional, normalización y primeros pasos con Oracle y SQL."
        },
        {
          id: "bases-datos-b",
          title: "Bases de Datos B",
          href: "bases-datos-b/",
          card: "DML avanzado, transacciones y concurrencia, programación en BBDD (PL/SQL) y una introducción a las BBDD no relacionales."
        },
        {
          id: "anexo-entidad-relacion",
          title: "Anexo: Modelo Entidad-Relación",
          href: "anexo-entidad-relacion/",
          card: "Chuleta visual de la notación entidad-relación: entidades, atributos, relaciones y cardinalidades."
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
          card: "Arquitectura de equipos, sistemas operativos, gestión de la información, redes y aplicaciones de propósito general."
        },
        {
          id: "digitalizacion",
          title: "Digitalización",
          href: "digitalizacion/",
          card: "Transformación digital de empresas: tecnologías habilitadoras, cloud, inteligencia artificial y análisis de datos."
        },
        {
          id: "lenguaje-marcas",
          title: "Lenguaje de Marcas",
          href: "lenguaje-marcas/",
          card: "HTML, CSS, XML, JavaScript y sistemas de gestión empresarial (ERP/CRM) con Odoo."
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
          card: "10 unidades de inglés profesional: tiempos verbales, redacción de emails/CV, cultura anglosajona y vocabulario técnico."
        },
        {
          id: "ingles-diapositivas",
          title: "Inglés — clases",
          href: "ingles-diapositivas/",
          card: "Diapositivas de las clases: dinámica del curso, evaluación y gramática organizada por bloques (bloques 1 a 5)."
        },
        {
          id: "vocabulary",
          title: "Vocabulary DAM-DAW-ASIR",
          href: "vocabulary/",
          card: "Glosario de vocabulario técnico en inglés: desarrollo de apps, metodologías, arquitectura, despliegue y seguridad."
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
          card: "Sector productivo, prevención de riesgos laborales, condiciones de trabajo y orientación profesional."
        },
        {
          id: "sostenibilidad",
          title: "Sostenibilidad",
          href: "sostenibilidad/",
          card: "Retos ambientales y sociales, ODS, economía circular y elaboración de un plan de sostenibilidad empresarial."
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
          card: "Control de versiones: commits, ramas, merges y el flujo de trabajo diario con Git, sin depender de ninguna plataforma concreta."
        },
        {
          id: "github",
          title: "GitHub",
          href: "github/",
          card: "Repositorios remotos, pull requests, issues y Actions: cómo se colabora en Git a través de GitHub."
        },
        {
          id: "docker",
          title: "Docker",
          href: "docker/",
          card: "Contenedores: imágenes, Dockerfile, volúmenes y redes para ejecutar aplicaciones de forma aislada y reproducible."
        },
        {
          id: "mysql-workbench",
          title: "MySQL Workbench",
          href: "mysql-workbench/",
          card: "Gestión visual de bases de datos MySQL: modelado ER, ejecución de consultas y administración de conexiones."
        },
        {
          id: "supabase",
          title: "Supabase",
          href: "supabase/",
          card: "Backend as a Service sobre PostgreSQL: base de datos, autenticación, almacenamiento y APIs generadas automáticamente."
        }
      ]
    }
  ],
  extras: [
    { id: "glosario", title: "Glosario", href: "glosario/", icon: "bi-journal-text" }
  ]
};
