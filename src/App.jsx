import { useEffect, useState } from "react";
import NetworkCanvas from "./components/NetworkCanvas";
import { projects } from "./data/projects";

const NAV = [
  { id: "perfil", label: "Perfil" },
  { id: "experiencia", label: "Experiencia" },
  { id: "liderazgo", label: "Liderazgo" },
  { id: "proyectos", label: "Proyectos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contacto", label: "Contacto" },
];

const ROLE_WORDS = ["Sistemas de Información", "Ciberseguridad", "Product Management"];

function useTypewriter(words, { typeSpeed = 55, deleteSpeed = 30, pause = 1600 } = {}) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText((t) =>
          deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)
        );
      }, deleting ? deleteSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}

function SectionEyebrow({ children }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400/80 mb-3">
      {children}
    </p>
  );
}

function StatusBadge({ status }) {
  const map = {
    live: { label: "Activo", color: "text-cyan-300 border-cyan-400/40 bg-cyan-400/10" },
    building: { label: "En construcción", color: "text-amber-300 border-amber-400/40 bg-amber-400/10" },
    archived: { label: "Archivado", color: "text-slate-400 border-slate-500/40 bg-slate-500/10" },
  };
  const s = map[status] || map.live;
  return (
    <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${s.color}`}>
      {s.label}
    </span>
  );
}

export default function App() {
  const typed = useTypewriter(ROLE_WORDS);
  const [activeSection, setActiveSection] = useState("perfil");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-ink text-text selection:bg-cyan-400 selection:text-ink">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="font-display font-semibold tracking-tight text-lg">
            diego<span className="text-cyan-400">.</span>godoy
          </a>
          <nav className="hidden md:flex items-center gap-1 font-mono text-xs uppercase tracking-wider">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`px-3 py-2 rounded-md transition-colors ${
                  activeSection === n.id
                    ? "text-cyan-300 bg-cyan-400/10"
                    : "text-muted hover:text-text"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden font-mono text-xs border border-line px-3 py-1.5 rounded-md text-muted"
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
          >
            {menuOpen ? "cerrar" : "menú"}
          </button>
        </div>
        {menuOpen && (
          <nav className="md:hidden border-t border-line px-6 py-3 flex flex-col gap-1 font-mono text-sm uppercase tracking-wider">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-muted hover:text-text"
              >
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden border-b border-line">
        <div className="absolute inset-0 grid-fade" />
        <div className="absolute inset-0">
          <NetworkCanvas />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <p className="reveal font-mono text-sm text-cyan-400 mb-5">$ whoami</p>
          <h1 className="reveal font-display text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Diego Godoy
          </h1>
          <div className="reveal mt-5 h-8 md:h-10">
            <p className="font-mono text-base md:text-xl text-muted">
              <span className="text-text">{typed}</span>
              <span className="cursor-blink text-cyan-400">▍</span>
            </p>
          </div>
          <p className="reveal mt-7 max-w-xl text-muted text-base md:text-lg leading-relaxed">
            Estudiante de Sistemas de Información en UTEC. Construyo puentes entre
            seguridad de sistemas y estrategia de producto — desde asegurar redes
            hasta decidir qué se construye y por qué.
          </p>
          <div className="reveal mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#proyectos"
              className="font-mono text-sm px-5 py-3 rounded-md bg-cyan-400 text-ink font-medium hover:bg-cyan-300 transition-colors"
            >
              Ver proyectos →
            </a>
            <a
              href="#contacto"
              className="font-mono text-sm px-5 py-3 rounded-md border border-line text-text hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
            >
              Contactar
            </a>
          </div>
        </div>
      </section>

      <main>
        {/* PROFILE */}
        <section id="perfil" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-b border-line">
          <SectionEyebrow>01 · Perfil</SectionEyebrow>
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight">
              Interés en seguridad,
              <br />
              criterio de producto.
            </h2>
            <div className="space-y-5 text-muted leading-relaxed text-base md:text-lg">
              <p>
                Estudiante de <span className="text-text">Sistemas de Información</span> en{" "}
                <span className="text-text">UTEC</span>, con experiencia liderando iniciativas
                técnicas, emprendedoras y organizacionales. Me interesa cómo se protegen
                los sistemas y, en paralelo, cómo se deciden las prioridades de un producto:
                dos caras de la misma pregunta lo qué merece confianza y qué merece construirse.
              </p>
              <p>
                Actualmente lidero la comunidad de ciberseguridad de mi universidad y
                participo como asistente de cátedra y en proyectos que combinan investigación
                aplicada con impacto directo en la comunidad estudiantil.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["UTEC — Lima, Perú", "Sistemas de Información", "2025 — Presente"].map((t) => (
                  <span key={t} className="font-mono text-xs px-3 py-1.5 rounded-full border border-line text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experiencia" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-b border-line">
          <SectionEyebrow>02 · Experiencia</SectionEyebrow>
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-14">Trayectoria</h2>

          <div className="relative pl-8 md:pl-10">
            <div className="absolute left-[7px] md:left-[9px] top-2 bottom-2 w-px bg-line" />

            {[
              {
                title: "Asistente de Enseñanza y Laboratorio",
                org: "UTEC",
                date: "2026 — Presente",
                desc: "Contribuí al desarrollo de OPECIA para el evento ICOA, dirigido a estudiantes de secundaria.",
                extra:
                  "Participé en el desarrollo de AI Insights 2026, iniciativa en colaboración entre UTEC y PwC.",
              },
              {
                title: "Co - Fundador — Larita BOT",
                org: "Proyecto colaborativo",
                date: "2026 — En desarrollo",
                desc: "Bot de Discord todo-en-uno: anotaciones, música, resúmenes automáticos y utilidades de comunidad en una sola herramienta.",
              },
              {
                title: "Fundador — Dot Company",
                org: "Negocio de retail",
                date: "2022 — 2023",
                desc: "Gestión de inventario, sourcing de productos, estrategia de marketing y operaciones de venta.",
              },
              {
                title: "Fundador — Servicio Técnico de Computadoras",
                org: "Independiente",
                date: "2020 — 2022",
                desc: "Diagnóstico de hardware, instalación de sistemas operativos, troubleshooting y gestión directa de clientes.",
              },
              {
                title: "Gestión de Proyectos",
                org: "Proyectos técnicos y organizacionales",
                date: "Continuo",
                desc: "Planificación de flujos de trabajo, coordinación de equipos y ejecución de proyectos de principio a fin.",
              },
            ].map((item) => (
              <div key={item.title} className="relative pb-12 last:pb-0">
                <div className="absolute -left-8 md:-left-10 top-1.5 h-3 w-3 rounded-full bg-cyan-400 node-glow" />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg md:text-xl font-medium">{item.title}</h3>
                  <span className="font-mono text-xs text-cyan-400/80 whitespace-nowrap">{item.date}</span>
                </div>
                <p className="text-sm text-muted/80 font-mono mt-0.5">{item.org}</p>
                <p className="mt-2 text-muted leading-relaxed max-w-2xl">{item.desc}</p>
                {item.extra && (
                  <p className="mt-2 text-muted leading-relaxed max-w-2xl border-l-2 border-amber-400/40 pl-3">
                    {item.extra}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP */}
        <section id="liderazgo" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-b border-line">
          <SectionEyebrow>03 · Liderazgo</SectionEyebrow>
          <div className="rounded-2xl border border-line bg-surface/40 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
            <p className="font-mono text-xs uppercase tracking-wider text-amber-400 mb-4">Presidente</p>
            <h3 className="font-display text-2xl md:text-3xl font-semibold mb-4">
              Cyber Security Hub (CSH) — UTEC
            </h3>
            <p className="text-muted max-w-2xl leading-relaxed text-base md:text-lg">
              Lidero la organización estudiantil de ciberseguridad de UTEC, organizando
              eventos técnicos y desarrollando la comunidad universitaria de seguridad
              informática desde 2025.
            </p>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="proyectos" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-b border-line">
          <SectionEyebrow>04 · Proyectos</SectionEyebrow>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">Cosas que construyo</h2>
            
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => (
              <a
                key={p.title}
                href={p.link || "#"}
                target={p.link ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex flex-col rounded-xl border border-line bg-surface/40 p-6 hover:border-cyan-400/50 hover:bg-surface/70 transition-colors"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-display text-lg font-medium leading-snug">{p.title}</h3>
                  <StatusBadge status={p.status} />
                </div>
                <p className="font-mono text-[11px] text-muted mb-3">{p.period}</p>
                <p className="text-sm text-muted leading-relaxed flex-1">{p.summary}</p>
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {p.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-1 rounded border border-line text-muted">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <span className="mt-5 font-mono text-xs text-cyan-400 group-hover:translate-x-1 transition-transform inline-block">
                    Ver enlace →
                  </span>
                )}
              </a>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="habilidades" className="max-w-6xl mx-auto px-6 py-20 md:py-28 border-b border-line">
          <SectionEyebrow>05 · Habilidades</SectionEyebrow>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display text-xl font-medium mb-5">Competencias</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Liderazgo",
                  "Gestión de Proyectos",
                  "Ciberseguridad",
                  "Networking",
                  "Product Management",
                  "Resolución de Problemas",
                  "Comunicación",
                ].map((s) => (
                  <span key={s} className="font-mono text-xs px-3 py-1.5 rounded-full border border-line text-text hover:border-cyan-400/50 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium mb-5">Formación y Certificaciones</h3>
              <ul className="space-y-3">
                {[
                  ["Sistemas de Información", "UTEC · 2025 — Presente"],
                  ["Inglés avanzado", "PUCP · 2022 — 2025"],
                  ["Cybersecurity Fundamentals", "Certificación"],
                  ["Introduction to CCNA", "Certificación"],
                ].map(([title, sub]) => (
                  <li key={title} className="flex items-start gap-3 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <div>
                      <p className="text-text">{title}</p>
                      <p className="text-muted font-mono text-xs">{sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contacto" className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <SectionEyebrow>06 · Contacto</SectionEyebrow>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight max-w-lg">
                Hablemos de sistemas, seguridad o producto.
              </h2>
              <p className="text-muted mt-4 max-w-md">Disponible para proyectos y colaboraciones.</p>
            </div>
            <div className="flex flex-col gap-3 font-mono text-sm">
              <a href="mailto:diego.godoy.torres12@gmail.com" className="flex items-center gap-2 text-text hover:text-cyan-300 transition-colors">
                diego.godoy.torres12@gmail.com →
              </a>
              <a href="https://github.com/SirCloudzUTEC" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text hover:text-cyan-300 transition-colors">
                github.com/SirCloudzUTEC →
              </a>
              <a href="https://linkedin.com/in/diego-godoy-torres" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-text hover:text-cyan-300 transition-colors">
                linkedin.com/in/diego-godoy-torres →
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-muted">
          <p>© {new Date().getFullYear()} Diego Godoy</p>
          <p>Lima, Perú</p>
        </div>
      </footer>
    </div>
  );
}
