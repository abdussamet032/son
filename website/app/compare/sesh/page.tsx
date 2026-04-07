import type { Metadata } from "next";
import Link from "next/link";

export function generateMetadata(): Metadata {
  return {
    title: "son vs sesh: Multi-Terminal Workspace Launcher Comparison",
    description:
      "Compare son and sesh for terminal workspace management. son supports iTerm2, WezTerm, and tmux with zero config. sesh focuses on tmux session management.",
    keywords: [
      "sesh alternative",
      "sesh vs tmuxinator",
      "sesh vs son",
      "tmux session manager",
      "terminal workspace launcher",
    ],
    openGraph: {
      title: "son vs sesh: Multi-Terminal Workspace Launcher Comparison",
      description:
        "Compare son and sesh for terminal workspace management. son supports iTerm2, WezTerm, and tmux with zero config.",
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
      name: "What is the difference between son and sesh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "sesh is a tmux-first session manager that helps you switch between tmux sessions using fuzzy search. son is a multi-terminal workspace launcher that supports iTerm2, WezTerm, and tmux, with automatic project discovery, editor integration, and startup hooks. son launches full workspaces; sesh manages tmux sessions.",
      },
    },
    {
      "@type": "Question",
      name: "Should I use sesh or son if I don't use tmux?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If you don't use tmux, use son. sesh is built specifically for tmux and has no support for other terminals. son natively supports iTerm2 and WezTerm in addition to tmux, so it works with whatever terminal you prefer.",
      },
    },
    {
      "@type": "Question",
      name: "Does son discover projects automatically like sesh?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Both son and sesh can discover projects automatically. sesh uses configurable directory scanning to find projects for tmux session creation. son also scans development directories and ranks them by frecency (frequency + recency). Both support fuzzy search for project selection.",
      },
    },
    {
      "@type": "Question",
      name: "Can son replace both sesh and tmuxinator?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most developers, yes. son combines the automatic project discovery of sesh with the workspace layout capabilities of tmuxinator, and adds multi-terminal support, editor integration, and startup hooks. If you need extremely granular tmux window control, tmuxinator may still be needed for specific projects.",
      },
    },
  ],
};

export default function SeshComparePage() {
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
            <span className="text-text-muted text-sm">sesh</span>
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-muted mb-8">
            <span className="w-2 h-2 rounded-full bg-purple" />
            sesh alternative
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            son vs sesh:
            <br />
            <span className="gradient-text">Multi-Terminal Workspace Launcher</span>
          </h1>
          <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
            sesh is a fast tmux session connector with smart project discovery.{" "}
            <span className="text-cyan font-mono font-medium">son</span>{" "}
            extends that concept to every terminal — iTerm2, WezTerm, and tmux —
            with editor integration, startup hooks, and custom split layouts.
          </p>
        </div>
      </section>

      {/* tmux-first vs multi-terminal */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            tmux-first vs multi-terminal
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            The biggest architectural difference between sesh and son is terminal
            support. sesh is designed exclusively for tmux. son detects your
            terminal environment and adapts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">sesh: tmux-only</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                sesh creates and connects to tmux sessions. If you live in tmux,
                it&apos;s a great workflow — fast session switching with fuzzy
                search. But if you prefer iTerm2&apos;s native splits or
                WezTerm&apos;s GPU-accelerated rendering, sesh can&apos;t help.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green/10">
                    <svg className="w-3 h-3 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">tmux</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/5">
                    <svg className="w-3 h-3 text-text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  <span className="text-text-dim">iTerm2</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/5">
                    <svg className="w-3 h-3 text-text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </span>
                  <span className="text-text-dim">WezTerm</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border-cyan/20">
              <h3 className="text-lg font-semibold mb-3 text-cyan">
                son: any terminal
              </h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                son detects whether you&apos;re running iTerm2, WezTerm, or tmux
                and uses the appropriate API to create split-pane workspaces. One
                tool, three terminals, zero lock-in.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green/10">
                    <svg className="w-3 h-3 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">tmux</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green/10">
                    <svg className="w-3 h-3 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">iTerm2</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green/10">
                    <svg className="w-3 h-3 text-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-text-muted">WezTerm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discovery model comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Discovery model comparison
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            Both sesh and son help you find projects quickly. But they take
            different approaches to building and ranking your project list.
          </p>

          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-4 px-6 font-medium text-text-muted">
                      Aspect
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-cyan">
                      son
                    </th>
                    <th className="py-4 px-6 font-semibold text-center text-text-muted">
                      sesh
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Project discovery",
                      "Auto-scans dev directories",
                      "Configurable directory scan",
                    ],
                    [
                      "Ranking algorithm",
                      "Frecency (frequency + recency)",
                      "Alphabetical / recent sessions",
                    ],
                    [
                      "Search method",
                      "Built-in fzf integration",
                      "fzf / tmux popup",
                    ],
                    [
                      "New project detection",
                      "Automatic on next run",
                      "Automatic on next run",
                    ],
                    [
                      "Non-project directories",
                      "Project roots only",
                      "Any tmux session name",
                    ],
                    [
                      "Configuration required",
                      "None (zero-config)",
                      "Optional TOML config",
                    ],
                  ].map(([aspect, sonVal, seshVal], i) => (
                    <tr
                      key={String(aspect)}
                      className={`border-b border-white/[0.03] ${
                        i % 2 === 0 ? "bg-white/[0.01]" : ""
                      }`}
                    >
                      <td className="py-3 px-6 text-text-muted font-medium">
                        {String(aspect)}
                      </td>
                      <td className="py-3 px-6 text-center text-sm text-text-muted">
                        {String(sonVal)}
                      </td>
                      <td className="py-3 px-6 text-center text-sm text-text-dim">
                        {String(seshVal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Startup Hooks */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Startup hooks and workspace setup
          </h2>
          <p className="text-text-muted mb-8 max-w-2xl leading-relaxed">
            When you open a project, you often need to start dev servers, activate
            virtual environments, or set environment variables. Here&apos;s how
            each tool handles this.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">sesh</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                sesh can run a startup command when creating a new tmux session.
                You configure this in sesh&apos;s TOML config file with a
                startup_command per session. It runs a single command in the
                initial pane.
              </p>
              <div className="bg-terminal-bg rounded-lg p-4 border border-terminal-border font-mono text-xs">
                <div className="text-text-dim"># sesh config</div>
                <div className="text-text-muted">[[session]]</div>
                <div className="text-text-muted">
                  name = &quot;api&quot;
                </div>
                <div className="text-text-muted">
                  path = &quot;~/projects/api&quot;
                </div>
                <div className="text-text-muted">
                  startup_command = &quot;npm run dev&quot;
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border-cyan/20">
              <h3 className="text-lg font-semibold mb-3 text-cyan">son</h3>
              <p className="text-sm text-text-muted leading-relaxed mb-4">
                son supports startup hooks via optional .son.toml files in your
                project root. You can define multiple commands, specify which
                pane they run in, and include editor launch commands. Hooks run
                automatically when the workspace opens.
              </p>
              <div className="bg-terminal-bg rounded-lg p-4 border border-terminal-border font-mono text-xs">
                <div className="text-text-dim"># .son.toml</div>
                <div className="text-text-muted">[hooks]</div>
                <div className="text-text-muted">
                  startup = [&quot;npm run dev&quot;]
                </div>
                <div className="text-text-muted mt-1">[editor]</div>
                <div className="text-text-muted">
                  command = &quot;cursor&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Feature Comparison */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Full feature comparison
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
                      sesh
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Zero-config setup", true, true],
                    ["Project auto-discovery", true, true],
                    ["Frecency sorting", true, false],
                    ["Fuzzy search (fzf)", true, true],
                    ["tmux support", true, true],
                    ["iTerm2 support", true, false],
                    ["WezTerm support", true, false],
                    ["Custom split layouts", true, false],
                    ["Editor integration", true, false],
                    ["Startup hooks", true, true],
                    ["Per-project config", true, true],
                    ["Single binary", true, true],
                    ["tmux popup integration", false, true],
                    ["Zoxide integration", false, true],
                    ["Session last-accessed sort", false, true],
                  ].map(([feature, son, sesh], i) => (
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
                        {sesh === true ? (
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

      {/* Who should choose which */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Who should choose which?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Choose sesh if...</h3>
              <ul className="space-y-3">
                {[
                  "You exclusively use tmux and want to stay in the tmux ecosystem",
                  "You want tmux popup integration for session switching with a keybinding",
                  "You prefer zoxide integration for directory-based session creation",
                  "You want the lightest-weight session connector possible",
                  "Your workflow is centered around switching between existing tmux sessions rather than creating new workspaces",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-text-dim mt-0.5 shrink-0">&bull;</span>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-xl p-6 border-cyan/20">
              <h3 className="text-lg font-semibold mb-4 text-cyan">
                Choose son if...
              </h3>
              <ul className="space-y-3">
                {[
                  "You use iTerm2, WezTerm, or switch between terminals",
                  "You want full workspace creation with split panes and layouts",
                  "You want your editor to launch automatically alongside terminal panes",
                  "You want frecency-based project sorting — your most-used repos first",
                  "You want startup hooks to run dev servers and setup commands automatically",
                  "You want a single tool that replaces tmuxinator, project switching, and workspace setup",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm">
                    <span className="text-cyan mt-0.5 shrink-0">&bull;</span>
                    <span className="text-text-muted">{item}</span>
                  </li>
                ))}
              </ul>
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
            Workspace launching beyond tmux
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            son gives you the project discovery of sesh, the layouts of
            tmuxinator, and the multi-terminal freedom to use whatever you
            prefer.
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
