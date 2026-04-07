import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "son vs Other Terminal Tools — Comparison Guide",
  description:
    "Compare son with tmuxinator, zoxide, sesh, and tmuxp. See how son's zero-config workspace launcher stacks up against popular terminal tools.",
  openGraph: {
    title: "son vs Other Terminal Tools — Comparison Guide",
    description:
      "Compare son with tmuxinator, zoxide, sesh, and tmuxp. See how son's zero-config workspace launcher stacks up against popular terminal tools.",
    type: "website",
  },
};

const comparisons = [
  {
    slug: "tmuxinator",
    title: "son vs tmuxinator",
    subtitle: "Zero-Config Terminal Workspace Alternative",
    description:
      "tmuxinator requires YAML configs for every project. son discovers your repos automatically, sorts by frecency, and launches workspaces with zero setup. If you're tired of maintaining config files, son is the tmuxinator alternative you've been looking for.",
    tags: ["YAML-free", "Zero config", "Multi-terminal"],
    gradient: "from-cyan to-blue",
  },
  {
    slug: "zoxide",
    title: "son vs zoxide",
    subtitle: "Full Terminal Workspaces, Not Just cd",
    description:
      "zoxide is a smarter cd command. son is a workspace launcher. zoxide takes you to a directory — son opens a full split-pane workspace with your editor, dev server, and test runner. They solve different problems and work great together.",
    tags: ["Workspace launcher", "Split panes", "Complementary"],
    gradient: "from-blue to-purple",
  },
  {
    slug: "sesh",
    title: "son vs sesh",
    subtitle: "Multi-Terminal Workspace Launcher",
    description:
      "sesh is a tmux session manager with smart project discovery. son goes further: it supports iTerm2 and WezTerm alongside tmux, launches editors, and runs startup hooks. If you want workspace management beyond tmux, son delivers.",
    tags: ["Multi-terminal", "Editor launch", "Startup hooks"],
    gradient: "from-purple to-cyan",
  },
  {
    slug: "tmuxp",
    title: "son vs tmuxp",
    subtitle: "YAML Sessions vs Recent Repo Launcher",
    description:
      "tmuxp loads tmux sessions from YAML/JSON files. son skips the config entirely — it discovers your projects, lets you fuzzy-search, and opens a ready-made workspace. No YAML, no JSON, no setup cost.",
    tags: ["Config-free", "Fuzzy search", "Auto-discovery"],
    gradient: "from-cyan to-purple",
  },
];

export default function ComparePage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-sm font-mono">
                S
              </div>
              <span className="text-lg font-semibold tracking-tight">son</span>
            </Link>
            <span className="text-text-dim">/</span>
            <span className="text-text-muted text-sm">Compare</span>
          </div>
          <a
            href="https://github.com/abdussamet032/son"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-white transition-colors flex items-center gap-1.5 text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6">
            How does <span className="gradient-text">son</span> compare?
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            son is a zero-config workspace launcher that discovers your projects
            and opens full split-pane terminal workspaces. See how it compares to
            other popular developer tools.
          </p>
        </div>
      </section>

      {/* Comparison Cards */}
      <section className="pb-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="glass-card rounded-xl p-8 transition-all duration-300 hover:translate-y-[-2px] group block"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${comp.gradient} flex items-center justify-center text-black font-bold text-sm font-mono`}
                  >
                    vs
                  </div>
                  <h2 className="text-xl font-bold">{comp.title}</h2>
                </div>
                <p className="text-sm text-cyan font-medium mb-3">
                  {comp.subtitle}
                </p>
                <p className="text-sm text-text-muted leading-relaxed mb-4">
                  {comp.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {comp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-cyan group-hover:underline">
                  Read full comparison &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-32 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-gradient-to-r from-cyan/10 via-blue/10 to-purple/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to try son?
          </h2>
          <p className="text-text-muted mb-8">
            Install in one command. No config files, no setup wizard.
          </p>
          <div className="glass-card rounded-xl p-1 max-w-lg mx-auto mb-8">
            <div className="flex items-center justify-center px-5 py-4">
              <code className="font-mono text-sm text-text">
                <span className="text-text-dim">$ </span>brew install
                abdussamet032/tap/son
              </code>
            </div>
          </div>
          <a
            href="https://github.com/abdussamet032/son"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan to-blue text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-[10px] font-mono">
              S
            </div>
            <span>son &middot; MIT License &middot; Built with Go</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-dim">
            <Link href="/" className="hover:text-text-muted transition-colors">
              Home
            </Link>
            <a
              href="https://github.com/abdussamet032/son"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-muted transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
