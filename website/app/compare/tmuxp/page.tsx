import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "son vs tmuxp: YAML Sessions vs Zero-Config Repo Launcher",
    description:
      "Compare son and tmuxp for terminal workspace management. son auto-discovers projects with zero config. tmuxp loads tmux sessions from YAML/JSON files.",
    keywords: [
      "tmuxp alternative",
      "tmuxp vs son",
      "tmux session yaml",
      "zero config workspace launcher",
      "terminal project switcher",
    ],
    openGraph: {
      title: "son vs tmuxp: YAML Sessions vs Zero-Config Repo Launcher",
      description:
        "Compare son and tmuxp for terminal workspace management. son auto-discovers projects with zero config. tmuxp loads tmux sessions from YAML/JSON files.",
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
      name: "What is the difference between son and tmuxp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "tmuxp loads tmux sessions from YAML or JSON configuration files. You define windows, panes, and commands in a file, and tmuxp creates the tmux session. son skips the config entirely — it discovers your projects automatically, lets you pick one with fuzzy search, and opens a workspace in iTerm2, WezTerm, or tmux without any YAML.",
      },
    },
    {
      "@type": "Question",
      name: "Is son a good tmuxp alternative?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, if you want zero-config workspace launching. tmuxp requires you to write and maintain YAML/JSON files for each project. son works immediately after install with no configuration. It also supports iTerm2 and WezTerm alongside tmux, which tmuxp does not.",
      },
    },
    {
      "@type": "Question",
      name: "Does son support YAML configuration like tmuxp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "son does not use YAML. It uses optional TOML files (.son.toml) for per-project startup hooks and layout preferences. However, most son users never create a config file — son's automatic project discovery and smart defaults handle everything.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use son if I'm currently using tmuxp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Install son alongside tmuxp and try it. Run 'son' to see your projects listed automatically. For most workflows, son's zero-config approach eliminates the need for tmuxp's YAML files. You can keep tmuxp for projects that need very specific multi-window tmux layouts.",
      },
    },
  ],
};

export default function TmuxpComparePage() {
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
            <span className="text-text-muted text-sm">tmuxp</span>
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
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-green" />
            tmuxp alternative
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            son vs tmuxp:
            <br />
            <span className="gradient-text">
              YAML Sessions vs Recent Repo Launcher
            </span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            tmuxp is a Python-based tmux session manager that loads workspaces
            from YAML or JSON files.{" "}
            <span className="text-cyan font-mono font-medium">son</span>{" "}
            takes a different approach: it discovers your projects automatically,
            ranks them by usage, and opens workspaces with zero config files.
          </p>
        </div>
      </section>

      {/* YAML sessions vs zero-config */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            YAML sessions vs zero-config
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            The core philosophy differs fundamentally. tmuxp asks you to describe
            your workspace upfront. son figures it out automatically.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">
                tmuxp: define everything in YAML
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                With tmuxp, you create a YAML file for each project that
                specifies the session name, windows, panes, working directories,
                and commands. This is powerful but requires upfront effort for
                every new project.
              </p>
              <div className="bg-terminal-bg rounded-lg p-4 border border-terminal-border font-mono text-xs overflow-x-auto">
                <div className="text-text-dim"># ~/.tmuxp/api.yaml</div>
                <div className="text-text-muted">session_name: api</div>
                <div className="text-text-muted">start_directory: ~/projects/api</div>
                <div className="text-text-muted">windows:</div>
                <div className="text-text-muted pl-2">- window_name: editor</div>
                <div className="text-text-muted pl-4">panes:</div>
                <div className="text-text-muted pl-6">- nvim .</div>
                <div className="text-text-muted pl-2">- window_name: server</div>
                <div className="text-text-muted pl-4">panes:</div>
                <div className="text-text-muted pl-6">- npm run dev</div>
                <div className="text-text-muted pl-6">- npm test -- --watch</div>
              </div>
              <p className="text-xs text-text-dim mt-3">
                Repeat for every project. Update when structure changes.
              </p>
            </div>

            <div className="glass-card rounded-xl p-6 border-cyan/20">
              <h3 className="text-lg font-semibold mb-3 text-cyan">
                son: discover and launch
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                With son, you run one command. son scans your dev directories,
                finds all your projects, ranks them by frecency, and lets you
                pick one with fuzzy search. Your workspace opens immediately with
                a smart default layout.
              </p>
              <div className="bg-terminal-bg rounded-lg p-4 border border-terminal-border font-mono text-xs">
                <div className="text-cyan">~</div>
                <div className="text-text-muted">
                  $ son
                </div>
                <div className="text-text-dim mt-2">
                  # fuzzy search appears...
                </div>
                <div className="text-text-dim">
                  # pick a project...
                </div>
                <div className="text-text-dim">
                  # workspace opens in 0.3s
                </div>
                <div className="text-green mt-2">
                  Workspace ready.
                </div>
              </div>
              <p className="text-xs text-text-dim mt-3">
                Works for every project. No files to create or maintain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Setup cost comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Setup cost comparison
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            How much work does it take to get from &quot;I cloned a new repo&quot;
            to &quot;I have a full workspace open&quot;?
          </p>

          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-6 font-medium text-text-muted">
                      Step
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-cyan">
                      son
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-text-muted">
                      tmuxp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Install the tool",
                      "brew install (single binary)",
                      "pip install tmuxp (Python required)",
                    ],
                    [
                      "Add a new project",
                      "Automatic (just clone it)",
                      "Write a YAML config file",
                    ],
                    [
                      "Open a workspace",
                      "son → fuzzy search → Enter",
                      "tmuxp load project-name",
                    ],
                    [
                      "Change workspace layout",
                      "Edit .son.toml (optional)",
                      "Edit YAML file",
                    ],
                    [
                      "Find an old project",
                      "Fuzzy search (frecency-sorted)",
                      "Remember the YAML file name",
                    ],
                    [
                      "Remove a project",
                      "Nothing (just delete the repo)",
                      "Delete the YAML config file",
                    ],
                    [
                      "Runtime dependencies",
                      "None (Go binary)",
                      "Python + libtmux + tmux",
                    ],
                  ].map(([step, sonVal, tmuxpVal], i) => (
                    <tr
                      key={String(step)}
                      className={`border-b border-white/[0.03] ${
                        i % 2 === 0 ? "bg-white/[0.01]" : ""
                      }`}
                    >
                      <td className="py-3 px-6 text-text-muted font-medium">
                        {String(step)}
                      </td>
                      <td className="py-3 px-6 text-center text-sm text-cyan">
                        {String(sonVal)}
                      </td>
                      <td className="py-3 px-6 text-center text-sm text-text-dim">
                        {String(tmuxpVal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">The math</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              If you work on 20 projects, tmuxp requires 20 YAML files — one for
              each project. When project structures change, you update those
              files. With son, you have zero config files. Every project is
              discovered automatically. Over a year of active development across
              multiple repos, son saves hours of config maintenance.
            </p>
          </div>
        </div>
      </section>

      {/* Full Feature Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Feature comparison
          </h2>
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
                      tmuxp
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Zero-config setup", true, false],
                    ["Auto project discovery", true, false],
                    ["Frecency sorting", true, false],
                    ["Fuzzy search (fzf)", true, false],
                    ["iTerm2 support", true, false],
                    ["WezTerm support", true, false],
                    ["tmux support", true, true],
                    ["Custom split layouts", true, true],
                    ["YAML/JSON session files", false, true],
                    ["Editor integration", true, false],
                    ["Startup hooks", true, true],
                    ["Session freezing/export", false, true],
                    ["Named windows", false, true],
                    ["Pane dimension control", false, true],
                    ["Single binary (no runtime)", true, false],
                    ["Python API", false, true],
                  ].map(([feature, son, tmuxp], i) => (
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
                            <svg className="w-3.5 h-3.5 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                            <svg className="w-3.5 h-3.5 text-text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        {tmuxp === true ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green/10">
                            <svg className="w-3.5 h-3.5 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                            <svg className="w-3.5 h-3.5 text-text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
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

      {/* Migration Guide */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Migrating from tmuxp to son
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            The migration is simple — mostly because son requires no config.
            Here&apos;s the step-by-step process.
          </p>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Install son",
                description:
                  "A single binary, installed via Homebrew or Go. No Python, no pip, no virtual environments.",
                code: "brew install abdussamet032/tap/son",
                gradient: "from-cyan to-blue",
              },
              {
                step: "02",
                title: "Run son — your projects are already there",
                description:
                  "son automatically scans your development directories and finds every git repo. No need to recreate YAML files. Just run son and see your projects listed.",
                code: "son",
                gradient: "from-blue to-purple",
              },
              {
                step: "03",
                title: "Optionally add .son.toml for startup hooks",
                description:
                  "If your tmuxp YAML had specific startup commands (dev server, test watcher), add them to a .son.toml file in your project root. This is the only config son ever needs, and it's entirely optional.",
                code: "# only if you need startup hooks",
                gradient: "from-purple to-cyan",
              },
              {
                step: "04",
                title: "Keep tmuxp for edge cases",
                description:
                  "son and tmuxp can coexist. If you have projects with complex multi-window tmux layouts that need exact pane sizing, keep those tmuxp YAML files. Use son for everything else.",
                code: "# both tools work side by side",
                gradient: "from-cyan to-green",
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
                <code className="shrink-0 font-mono text-sm text-text-muted bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                  $ {item.code}
                </code>
              </div>
            ))}
          </div>

          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              What about tmuxp&apos;s session freeze/export?
            </h3>
            <p className="text-sm text-text-muted leading-relaxed">
              tmuxp can export your current tmux session to a YAML file with
              <code className="font-mono text-text-muted"> tmuxp freeze</code>.
              son does not have this feature because it takes the opposite
              approach: rather than capturing and replaying sessions, son
              creates fresh workspaces on demand. If you rely heavily on session
              freezing, tmuxp is the better choice for that specific workflow.
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
            Zero YAML. Zero setup. Full workspaces.
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Stop writing config files. Start launching workspaces. Install son in
            one command.
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
              href="/compare/tmuxinator"
              className="glass-card rounded-xl p-5 hover:translate-y-[-2px] transition-all duration-300 block"
            >
              <p className="font-semibold text-sm mb-1">son vs tmuxinator</p>
              <p className="text-xs text-text-muted">
                Zero-config workspace alternative
              </p>
            </Link>
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
