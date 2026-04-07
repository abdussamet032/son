import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "son vs zoxide: Workspace Launcher vs Smart cd Alternative",
    description:
      "zoxide is a smarter cd. son is a workspace launcher. Learn how they differ, where each shines, and why you should use both together for the fastest dev workflow.",
    keywords: [
      "zoxide alternative",
      "zoxide vs son",
      "terminal workspace launcher",
      "smart cd alternative",
      "project switcher cli",
    ],
    openGraph: {
      title: "son vs zoxide: Workspace Launcher vs Smart cd Alternative",
      description:
        "zoxide is a smarter cd. son is a workspace launcher. Learn how they differ and why you should use both together.",
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
      name: "Is son an alternative to zoxide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "son and zoxide solve different problems. zoxide is a smarter 'cd' command that remembers frequently visited directories. son is a workspace launcher that opens full split-pane terminal environments with editors and dev servers. They are complementary tools — you can use both together.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use son and zoxide together?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, they work great together. Use zoxide for quick directory navigation within an existing terminal session, and use son when you want to open a complete workspace with split panes, editor, and startup commands for a specific project.",
      },
    },
    {
      "@type": "Question",
      name: "What does son do that zoxide doesn't?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "son launches full terminal workspaces with split panes, opens your editor, runs startup hooks (like dev servers), and supports multiple terminals (iTerm2, WezTerm, tmux). zoxide only changes your current directory — it does not create panes, launch editors, or run commands.",
      },
    },
    {
      "@type": "Question",
      name: "Does son have frecency sorting like zoxide?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Like zoxide, son uses frecency (frequency + recency) to rank your projects. The projects you use most often and most recently appear at the top of the list. Both tools share this core concept, but son applies it to workspace launching rather than directory navigation.",
      },
    },
  ],
};

export default function ZoxideComparePage() {
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
            <span className="text-text-muted text-sm">zoxide</span>
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-blue" />
            zoxide alternative
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            zoxide Alternative for
            <br />
            <span className="gradient-text">Full Terminal Workspaces</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            zoxide makes <code className="font-mono text-text-muted">cd</code>{" "}
            smarter. But changing directories is only the beginning.{" "}
            <span className="text-cyan font-mono font-medium">son</span> goes
            further — it opens a full workspace with split panes, your editor,
            and startup commands, all in one keystroke.
          </p>
        </div>
      </section>

      {/* cd tool vs workspace launcher */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            A <code className="font-mono text-cyan">cd</code> tool vs a
            workspace launcher
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            The fundamental difference between zoxide and son is their scope.
            zoxide replaces <code className="font-mono">cd</code> with
            something smarter. son replaces the entire process of switching
            context to a new project.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* zoxide column */}
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-muted font-mono font-bold text-sm">
                  z
                </div>
                <h3 className="text-lg font-semibold">zoxide</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                A smarter <code className="font-mono">cd</code> command that
                learns your habits and takes you to directories with partial
                matches.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Changes to a directory</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Frecency-based ranking</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-text-dim mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  <span className="text-text-dim">Does not open panes</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-text-dim mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  <span className="text-text-dim">Does not launch editors</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-text-dim mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  <span className="text-text-dim">Does not run startup commands</span>
                </div>
              </div>
            </div>

            {/* son column */}
            <div className="glass-card rounded-xl p-6 border-cyan/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-sm font-mono">
                  S
                </div>
                <h3 className="text-lg font-semibold text-cyan">son</h3>
              </div>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                A workspace launcher that opens split-pane terminal environments
                with editors, dev servers, and project-specific commands.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Opens full workspace</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Split panes with layout</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Launches your editor</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Runs startup hooks</span>
                </div>
                <div className="flex items-start gap-2 text-sm">
                  <span className="text-green mt-0.5 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">Frecency-based ranking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Where zoxide is better */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Where zoxide is better
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Any directory, not just projects",
                description:
                  "zoxide tracks every directory you visit — not just project roots. Need to jump to ~/Documents/invoices/2024? zoxide handles that. son focuses specifically on developer project directories.",
              },
              {
                title: "Shell integration",
                description:
                  "zoxide replaces cd directly in your shell with the 'z' command. It's seamless — you never think about it. son is a separate command you invoke when you want to open a full workspace.",
              },
              {
                title: "Minimal and focused",
                description:
                  "zoxide does one thing: navigate to directories faster. It's tiny, fast, and has essentially zero overhead. If all you need is smarter cd, zoxide is the right tool.",
              },
              {
                title: "Works in any terminal session",
                description:
                  "zoxide operates within your current shell session. It doesn't need to create new panes or windows. It just changes your working directory, which works everywhere.",
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

      {/* Where son is better */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Where <span className="text-cyan">son</span> is better
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Full workspace creation",
                description:
                  "son doesn't just navigate to a directory — it creates an entire workspace. Split panes, editor in one pane, dev server in another, test runner in a third. One command, fully productive.",
              },
              {
                title: "Multi-terminal support",
                description:
                  "son natively supports iTerm2, WezTerm, and tmux. It uses each terminal's native API to create split-pane layouts. zoxide is terminal-agnostic because it only changes directories.",
              },
              {
                title: "Project-aware discovery",
                description:
                  "son understands project structure. It scans for git repos, recognizes project types, and applies appropriate layouts. zoxide tracks raw directory paths without project context.",
              },
              {
                title: "Startup hooks and automation",
                description:
                  "With .son.toml, you can define commands that run automatically when you open a workspace — start dev servers, activate virtual environments, set environment variables. zoxide just changes your directory.",
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

      {/* Use Both Together */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Use both together — they&apos;re complementary
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            son and zoxide are not competitors — they solve different problems
            at different stages of your workflow. The best developer setup uses
            both.
          </p>

          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-6 font-medium text-text-muted">
                      Workflow Step
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-text-muted">
                      Best Tool
                    </th>
                    <th className="text-left py-4 px-6 font-medium text-text-muted">
                      Why
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Starting work on a project",
                      "son",
                      "Opens full workspace with panes, editor, and dev server",
                    ],
                    [
                      "Quick directory jump within a session",
                      "zoxide",
                      "Lightweight cd replacement, stays in current terminal",
                    ],
                    [
                      "Switching between active projects",
                      "son",
                      "Creates or switches to the project's workspace layout",
                    ],
                    [
                      "Navigating to a non-project directory",
                      "zoxide",
                      "Tracks any directory, not limited to project roots",
                    ],
                    [
                      "Opening a new project for the first time",
                      "son",
                      "Auto-discovers new repos, no config needed",
                    ],
                    [
                      "Returning to a deep subdirectory",
                      "zoxide",
                      "Remembers paths like ~/projects/api/src/handlers",
                    ],
                  ].map(([step, tool, why], i) => (
                    <tr
                      key={String(step)}
                      className={`border-b border-white/[0.03] ${
                        i % 2 === 0 ? "bg-white/[0.01]" : ""
                      }`}
                    >
                      <td className="py-3 px-6 text-text-muted">
                        {String(step)}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            tool === "son"
                              ? "bg-cyan/10 text-cyan"
                              : "bg-white/5 text-text-muted"
                          }`}
                        >
                          {String(tool)}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-text-dim text-xs">
                        {String(why)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-3">
              The ideal workflow
            </h3>
            <p className="text-sm text-text-muted leading-relaxed mb-4">
              Start your day by running{" "}
              <code className="font-mono text-cyan">son</code> to open a full
              workspace for your main project. Throughout the day, use{" "}
              <code className="font-mono text-text-muted">z</code> (zoxide) to
              jump between directories within your terminal panes. When you need
              to switch to a completely different project, run{" "}
              <code className="font-mono text-cyan">son</code> again to open a
              new workspace.
            </p>
            <div className="bg-terminal-bg rounded-lg p-4 border border-terminal-border font-mono text-sm">
              <div className="text-text-dim">
                <span className="text-cyan">~</span> $ son{" "}
                <span className="text-text-dim">
                  {" "}
                  # pick project, full workspace opens
                </span>
              </div>
              <div className="text-text-dim mt-1">
                <span className="text-cyan">~/api</span> $ z handlers{" "}
                <span className="text-text-dim">
                  {" "}
                  # quick jump within the project
                </span>
              </div>
              <div className="text-text-dim mt-1">
                <span className="text-cyan">~/api/handlers</span> $ z tests{" "}
                <span className="text-text-dim"> # another quick jump</span>
              </div>
              <div className="text-text-dim mt-1">
                <span className="text-cyan">~/api/tests</span> $ son{" "}
                <span className="text-text-dim">
                  {" "}
                  # switch project entirely
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
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
                      zoxide
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Frecency sorting", true, true],
                    ["Fuzzy search", true, true],
                    ["Zero-config setup", true, true],
                    ["Single binary", true, true],
                    ["Split-pane workspaces", true, false],
                    ["Editor integration", true, false],
                    ["Startup hooks", true, false],
                    ["Multi-terminal support", true, false],
                    ["Shell cd replacement", false, true],
                    ["Tracks any directory", false, true],
                    ["Sub-shell integration", false, true],
                    ["Project-type detection", true, false],
                  ].map(([feature, son, zox], i) => (
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
                        {zox === true ? (
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

      {/* CTA */}
      <section className="py-20 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[400px] bg-gradient-to-r from-cyan/10 via-blue/10 to-purple/10 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Go beyond <code className="font-mono text-text-muted">cd</code>.
            Launch workspaces.
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Keep zoxide for quick directory jumps. Add son for full workspace
            launching. Install in one command.
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
