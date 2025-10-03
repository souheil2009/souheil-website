import Image from "next/image";

export default function Home() {
  return (
    <div>
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/5 dark:border-white/10">
        <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">
            Souheil Abdelhedi
          </a>
          <ul className="hidden sm:flex items-center gap-6 text-sm text-foreground/80">
            <li><a className="hover:text-foreground" href="#about">About</a></li>
            <li><a className="hover:text-foreground" href="#skills">Skills</a></li>
            <li><a className="hover:text-foreground" href="#products">Products</a></li>
            <li><a className="hover:text-foreground" href="#projects">Projects</a></li>
            <li><a className="hover:text-foreground" href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main id="home" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-28 sm:pt-32 pb-16 sm:pb-24 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
              Hi, I'm <span className="underline decoration-foreground/30">Souheil Abdelhedi</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-foreground/70 max-w-prose">
              Next.js and UX expert — I help teams ship fast with elegant, accessible, and performant interfaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex h-11 items-center rounded-md bg-foreground text-background px-5 text-sm font-medium shadow-sm hover:opacity-90">
                View Projects
              </a>
              <a href="#contact" className="inline-flex h-11 items-center rounded-md border border-foreground/20 px-5 text-sm font-medium hover:bg-foreground/5">
                Contact Me
              </a>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/10 bg-gradient-to-br from-foreground/5 to-transparent">
            <Image src="/next.svg" alt="Decorative" fill className="object-contain p-8 opacity-70 dark:invert" />
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16 border-t border-foreground/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">About</h2>
            </div>
            <div className="md:col-span-2 text-foreground/80 leading-relaxed">
              <p>
                I’m a software engineer focused on modern front‑end (React/Next.js) and UX. I design elegant,
                accessible, and fast interfaces, and optimize both performance and developer experience.
                I work end‑to‑end: design systems, integration, testing, CI/CD, and deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-16 border-t border-foreground/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
            </div>
            <div className="md:col-span-2">
              <ul className="flex flex-wrap gap-2">
                {[
                  "System Commissioning",
                  "VoIP System Integration",
                  "Technical Support",
                  "Assisted Services",
                  "Solution Architect",
                ].map((s) => (
                  <li
                    key={s}
                    className="text-sm rounded-full border border-foreground/15 px-3 py-1 bg-foreground/5"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-16 border-t border-foreground/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Products</h2>
            </div>
            <div className="md:col-span-2">
              <ul className="flex flex-wrap gap-2">
                {[
                  "SBCs",
                  "Soft switches",
                  "Intelligent Routing Engine",
                  "Media gateways",
                ].map((p) => (
                  <li
                    key={p}
                    className="text-sm rounded-full border border-foreground/15 px-3 py-1 bg-foreground/5"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-16 border-t border-foreground/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Projects</h2>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Dashboard Analytics",
                  desc:
                    "Real-time analytics platform with interactive charts, advanced filtering, and export.",
                  tech: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
                  link: "https://github.com/souheil/dashboard-analytics",
                },
                {
                  title: "Design System \"Atlas\"",
                  desc:
                    "Reusable component library with light/dark themes, docs, and a playground.",
                  tech: ["React", "Storybook", "Tailwind", "Radix UI"],
                  link: "https://souheil.dev/atlas",
                },
                {
                  title: "Web Performance Optimization",
                  desc:
                    "Lighthouse audit and smart caching to cut TTFB and LCP by half.",
                  tech: ["Next.js", "Edge Caching", "Web Vitals"],
                  link: "https://souheil.dev/perf-case-study",
                },
              ].map((p) => (
                <article key={p.title} className="group rounded-xl border border-foreground/10 overflow-hidden bg-background/60 hover:bg-foreground/5 transition">
                  <div className="relative h-40 bg-foreground/5">
                    <Image src="/window.svg" alt={`Miniature du projet ${p.title}`} fill className="object-contain p-6 opacity-80 dark:invert" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-medium">{p.title}</h3>
                      <a href={p.link} target="_blank" className="text-sm underline hover:no-underline">
                        View
                      </a>
                    </div>
                    <p className="text-sm text-foreground/70 mt-1">{p.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <span key={t} className="text-xs rounded-md border border-foreground/10 px-2 py-0.5 bg-foreground/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16 border-t border-foreground/10">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
            </div>
            <div className="md:col-span-2">
              <form className="grid gap-4 sm:max-w-lg">
                <input className="h-11 rounded-md border border-foreground/15 bg-background px-3 outline-none focus:ring-2 focus:ring-foreground/20" placeholder="Your name" />
                <input type="email" className="h-11 rounded-md border border-foreground/15 bg-background px-3 outline-none focus:ring-2 focus:ring-foreground/20" placeholder="Your email" />
                <textarea className="min-h-28 rounded-md border border-foreground/15 bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-foreground/20" placeholder="Your message" />
                <button type="submit" className="inline-flex h-11 items-center justify-center rounded-md bg-foreground text-background px-5 text-sm font-medium hover:opacity-90">
                  Send
                </button>
              </form>
              <div className="mt-6 text-sm text-foreground/70">
                Prefer email? <a className="underline hover:no-underline" href="mailto:contact@souheil.dev">contact@souheil.dev</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-foreground/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Souheil Abdelhedi. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-foreground" href="https://github.com/souheil" target="_blank" rel="noreferrer">GitHub</a>
            <a className="hover:text-foreground" href="https://www.linkedin.com/in/souheil-abdelhedi" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="hover:text-foreground" href="https://x.com/souheil" target="_blank" rel="noreferrer">X</a>
            <a className="hover:text-foreground" href="#home">Top</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
