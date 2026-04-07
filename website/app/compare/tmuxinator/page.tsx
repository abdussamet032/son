import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "son vs tmuxinator: Zero-Config Terminal Workspace Alternative",
    description:
      "Switch from config-heavy tmuxinator to zero-config son. Automatic project discovery, frecency sorting, multi-terminal support, and no YAML files to maintain.",
    keywords: [
      "tmuxinator alternative",
      "tmuxinator vs son",
      "zero config terminal workspace",
      "tmux session manager",
      "project launcher cli",
    ],
    openGraph: {
      title: "son vs tmuxinator: Zero-Config Terminal Workspace Alternative",
      description:
        "Switch from config-heavy tmuxinator to zero-config son. Automatic project discovery, frecency sorting, multi-terminal support.",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the best tmuxinator alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "son is a zero-config alternative to tmuxinator that automatically discovers your projects, sorts them by frecency, and launches full workspace layouts. Unlike tmuxinator, son requires no YAML configuration files and supports iTerm2, WezTerm, and tmux.",
      },
    },
    {
      "@type": "Question",
      name: "Does son require YAML config files like tmuxinator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. son works with zero configuration out of the box. It scans your development directories to discover projects automatically. You can optionally add a .son.toml file for per-project startup hooks, but it is never required.",
      },
    },
    {
      "@type": "Question",
      name: "Can son replace tmuxinator if I don't use tmux?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Unlike tmuxinator which only works with tmux, son supports iTerm2, WezTerm, and tmux. If you use iTerm2 on macOS or WezTerm on any platform, son provides native split-pane workspace support without tmux.",
      },
    },
    {
      "@type": "Question",
      name: "How do I migrate from tmuxinator to son?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Migration is simple: install son with 'brew install abdussamet032/tap/son', then run 'son'. It will automatically discover projects that you previously configured in tmuxinator YAML files. For startup hooks, add a .son.toml file to your project root.",
      },
    },
  ],
};

export default function TmuxinatorComparePage() {
  return (
    <main className="min-h-screen">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
            <Link
              href="/compare"
              className="text-text-muted hover:text-white text-sm transition-colors"
            >
              Compare
            </Link>
            <span className="text-text-dim">/</span>
            <span className="text-text-muted text-sm">tmuxinator</span>
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan" />
            tmuxinator alternative
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Best tmuxinator Alternative
            <br />
            <span className="gradient-text">for Recent Repos</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            tmuxinator changed the game with YAML-defined tmux sessions. But
            maintaining a config file for every project gets old fast.{" "}
            <span className="text-cyan font-mono font-medium">son</span>{" "}
            discovers your projects automatically and launches workspaces with
            zero configuration.
          </p>
        </div>
      </section>

      {/* Where tmuxinator wins */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Where tmuxinator wins
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Battle-tested maturity",
                description:
                  "tmuxinator has been around since 2010. It has a massive community, hundreds of contributors, and covers virtually every tmux edge case. If you need a feature, tmuxinator probably has it.",
              },
              {
                title: "Granular window/pane control",
                description:
                  "tmuxinator lets you define exact pane dimensions, specify which command runs in which pane, name individual windows, and set pane-level environment variables. It gives you pixel-level control over your tmux layout.",
              },
              {
                title: "Shared team configurations",
                description:
                  "Because configs are plain YAML files, teams can check them into version control and share workspace setups. Every developer on the team gets the exact same terminal layout.",
              },
              {
                title: "Complex multi-window setups",
                description:
                  "For projects that need 4+ tmux windows, each with different pane arrangements, tmuxinator's declarative YAML approach scales better than interactive setup.",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Where son wins */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Where <span className="text-cyan">son</span> wins
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Zero configuration",
                description:
                  "son works the moment you install it. No YAML files, no project setup, no template generation. It scans your development directories and builds a project list automatically.",
                icon: "text-cyan",
              },
              {
                title: "Automatic project discovery",
                description:
                  "New repo? son finds it immediately. You never need to create or update a config file when you clone a new project. Just run son and it's there, sorted by how recently and frequently you've used it.",
                icon: "text-blue",
              },
              {
                title: "Multi-terminal support",
                description:
                  "tmuxinator only works with tmux. son supports iTerm2, WezTerm, and tmux natively. It detects which terminal you're running and uses the right API. No lock-in to tmux.",
                icon: "text-purple",
              },
              {
                title: "Frecency-based sorting",
                description:
                  "son combines frequency and recency to put your most relevant projects at the top. The project you worked on yesterday ranks higher than the one you last touched six months ago.",
                icon: "text-green",
              },
              {
                title: "Fuzzy search with fzf",
                description:
                  "Built-in fzf integration means you can find any project in milliseconds by typing a few characters. No need to remember exact project names or config file names.",
                icon: "text-yellow",
              },
              {
                title: "Single binary, no runtime",
                description:
                  "son is written in Go and distributed as a single binary. tmuxinator requires Ruby and several gem dependencies. son has zero runtime dependencies.",
                icon: "text-cyan",
              },
            ].map((item) => (
              <div key={item.title} className="glass-card rounded-xl p-6">
                <div
                  className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${item.icon}`}
                >
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Config vs Zero-Config comparison table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Config vs Zero-Config: Feature Comparison
          </h2>
          <p className="text-text-muted mb-8 max-w-xl">
            A side-by-side comparison of tmuxinator&apos;s config-driven
            approach versus son&apos;s zero-config philosophy.
          </p>
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-6 font-medium text-text-muted">
                      Feature
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-cyan">
                      son
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-text-muted">
                      tmuxinator
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Zero-config setup", true, false],
                    ["Automatic project discovery", true, false],
                    ["Frecency sorting", true, false],
                    ["Fuzzy search (fzf)", true, false],
                    ["iTerm2 support", true, false],
                    ["WezTerm support", true, false],
                    ["tmux support", true, true],
                    ["Custom split layouts", true, true],
                    ["Editor integration", true, false],
                    ["Startup hooks / commands", true, true],
                    ["Per-project config (optional)", true, true],
                    ["Shared team configs", false, true],
                    ["Named windows", false, true],
                    ["Granular pane sizing", false, true],
                    ["Single binary (no runtime)", true, false],
                    ["Cross-platform", true, true],
                  ].map(([feature, son, tmux], i) => (
                    <tr
                      key={String(feature)}
                      className={`border-b border-white/[0.03] ${
                        i % 2 === 0 ? "bg-white/[0.01]" : ""
                      }`}
                    >
                      <td className="py-3 px-6 text-text-muted">
                        {String(feature)}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {son === true ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green/10">
                            <svg
                              className="w-3.5 h-3.5 text-green"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                            <svg
                              className="w-3.5 h-3.5 text-text-dim"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {tmux === true ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green/10">
                            <svg
                              className="w-3.5 h-3.5 text-green"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                            <svg
                              className="w-3.5 h-3.5 text-text-dim"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to Migrate */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            How to migrate from tmuxinator
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl">
            Moving from tmuxinator to son is straightforward. Because son
            discovers projects automatically, most of the migration is simply
            installing son and running it.
          </p>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Install son",
                description:
                  "Install son via Homebrew or Go. It's a single binary with no dependencies — no Ruby, no gems, no bundler.",
                code: "brew install abdussamet032/tap/son",
                gradient: "from-cyan to-blue",
              },
              {
                step: "02",
                title: "Run son",
                description:
                  "Simply type 'son' in your terminal. It will scan your development directories and present a fuzzy-searchable list of every project it finds. No config needed.",
                code: "son",
                gradient: "from-blue to-purple",
              },
              {
                step: "03",
                title: "Add startup hooks (optional)",
                description:
                  "If you had per-project commands in tmuxinator (e.g., starting a dev server), create a .son.toml file in your project root. This is optional — son works without it.",
                code: "# .son.toml in your project root\n# [hooks]\n# startup = [\"npm run dev\"]",
                gradient: "from-purple to-cyan",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="glass-card rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
              >
                <div
                  className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-black font-mono font-bold text-lg`}
                >
                  {item.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.description}</p>
                </div>
                <code className="shrink-0 font-mono text-sm text-text-muted bg-white/5 px-4 py-2 rounded-lg border border-white/5 whitespace-pre-wrap max-w-xs">
                  $ {item.code}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              What about my tmuxinator YAML files?
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              You can keep them. son and tmuxinator can coexist. Use son for
              quick project switching and workspace launching, and fall back to
              tmuxinator for projects that need complex multi-window tmux
              layouts. Over time, you may find that son covers 90% of your
              use cases without any config files at all.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-gradient-to-r from-cyan/10 via-blue/10 to-purple/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Drop the YAML. Try son.
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Install in one command. Open your first workspace in under a second.
            No config files, no setup wizard, no tutorials.
          </p>
          <div className="glass-card rounded-xl p-1 max-w-lg mx-auto mb-8">
            <div className="flex items-center justify-center px-5 py-4">
              <code className="font-mono text-sm text-text">
                <span className="text-text-dim">$ </span>brew install
                abdussamet032/tap/son
              </code>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/abdussamet032/son"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan to-blue text-black font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View on GitHub
            </a>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 hover:border-white/20 transition-all"
            >
              See all comparisons
            </Link>
          </div>
        </div>
      </section>

      {/* Other Comparisons */}
      <section className="py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-lg font-semibold mb-6 text-text-muted">
            Other comparisons
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/compare/zoxide"
              className="glass-card rounded-xl p-5 hover:translate-y-[-2px] transition-all duration-300 block"
            >
              <p className="font-semibold text-sm mb-1">son vs zoxide</p>
              <p className="text-xs text-text-muted">
                cd tool vs workspace launcher
              </p>
            </Link>
            <Link
              href="/compare/sesh"
              className="glass-card rounded-xl p-5 hover:translate-y-[-2px] transition-all duration-300 block"
            >
              <p className="font-semibold text-sm mb-1">son vs sesh</p>
              <p className="text-xs text-text-muted">
                Multi-terminal workspace launcher
              </p>
            </Link>
            <Link
              href="/compare/tmuxp"
              className="glass-card rounded-xl p-5 hover:translate-y-[-2px] transition-all duration-300 block"
            >
              <p className="font-semibold text-sm mb-1">son vs tmuxp</p>
              <p className="text-xs text-text-muted">
                YAML sessions vs recent repo launcher
              </p>
            </Link>
          </div>
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
