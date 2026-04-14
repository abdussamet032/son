import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Automate Terminal Window Titles to Show Project Names | son CLI",
  description:
    "Learn how son automatically sets your terminal window and tab titles to match the current project, making it easy to find the right terminal among dozens of open tabs.",
  keywords: [
    "terminal window titles",
    "iterm2 tab titles",
    "tmux window titles",
    "wezterm titles",
    "terminal tab names",
  ],
  openGraph: {
    title: "Automate Terminal Window Titles to Show Project Names",
    description:
      "son automatically sets terminal window and tab titles to your project name.",
    type: "article",
  },
  alternates: {
    canonical: "/guides/terminal-window-titles",
  },
};

export default function TerminalWindowTitlesGuide() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Automate Terminal Window Titles to Show Project Names",
            description:
              "Learn how son automatically sets your terminal window and tab titles to match the current project.",
            step: [
              {
                "@type": "HowToStep",
                name: "Understand the problem",
                text: "With many projects open, terminals blur together. Finding the right one wastes time.",
              },
              {
                "@type": "HowToStep",
                name: "See it in action",
                text: "When son opens a project workspace, it sets the window title to the project name.",
              },
              {
                "@type": "HowToStep",
                name: "Works everywhere",
                text: "iTerm2, tmux, and WezTerm all supported. son uses the native API of each terminal.",
              },
            ],
            tool: [
              { "@type": "HowToTool", name: "son CLI" },
              { "@type": "HowToTool", name: "iTerm2, tmux, or WezTerm" },
            ],
          }),
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-sm font-mono">
              S
            </div>
            <span className="text-lg font-semibold tracking-tight">son</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-text-muted">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/guides" className="hover:text-white transition-colors">
              Guides
            </Link>
            <a
              href="https://github.com/abdussamet032/son"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <p className="text-sm font-medium text-yellow mb-3 tracking-wide uppercase">
              Quality of Life
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Smart Window Titles
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              son automatically names your terminal windows and tabs to match the
              project you&apos;re working in. Find the right terminal in milliseconds,
              not seconds.
            </p>
          </div>

          {/* Visual Demo */}
          <div className="rounded-xl overflow-hidden border border-terminal-border bg-terminal-bg mb-12">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#1a2332]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-2 text-xs text-yellow font-mono">api-gateway — zsh</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-text-dim">
                <span className="text-green">~/api-gateway</span>{" "}
                <span className="text-text-muted">$</span>{" "}
                <span className="text-white">son</span>
              </div>
              <div className="mt-3 text-green text-xs animate-fade-in">
                Opening api-gateway in iTerm2 with split layout...
              </div>
            </div>
          </div>

          {/* Before/After */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-red text-sm font-medium mb-3 uppercase tracking-wide">
                Without son
              </h3>
              <div className="space-y-2 font-mono text-sm text-text-dim">
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 1:</span>
                  <span>~</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 2:</span>
                  <span>~/dev</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 3:</span>
                  <span>~</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 4:</span>
                  <span>~/projects</span>
                </div>
                <div className="text-text-dim text-xs mt-3">
                  Which tab has your API gateway?
                </div>
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-green text-sm font-medium mb-3 uppercase tracking-wide">
                With son
              </h3>
              <div className="space-y-2 font-mono text-sm text-text-dim">
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 1:</span>
                  <span className="text-cyan">api-gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 2:</span>
                  <span className="text-cyan">web-frontend</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 3:</span>
                  <span className="text-cyan">auth-service</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-text-muted">Tab 4:</span>
                  <span className="text-cyan">data-pipeline</span>
                </div>
                <div className="text-text-dim text-xs mt-3">
                  Instant recognition
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2>How it works</h2>
              <p>
                When son opens a project workspace, it automatically sets the
                terminal window title to the project&apos;s directory name. This works
                across all supported terminals:
              </p>
              <ul>
                <li>
                  <strong>iTerm2</strong> — Uses AppleScript and iTerm2&apos;s native
                  OSC 1337 escape sequences for accurate session names
                </li>
                <li>
                  <strong>tmux</strong> — Sets the window name using tmux&apos;s
                  rename-window command
                </li>
                <li>
                  <strong>WezTerm</strong> — Uses WezTerm&apos;s domain-specific labeling
                  API for tab and pane titles
                </li>
              </ul>
            </section>

            <section>
              <h2>Per-project control</h2>
              <p>
                If you want to customize a project&apos;s window title, add a{" "}
                <code>name</code> field to your project&apos;s <code>.son.toml</code>:
              </p>
              <pre className="bg-white/5 rounded-lg p-4 text-sm">
{`[project]
name = "api-gateway"
title = "Gateway"`}
              </pre>
              <p>
                The <code>title</code> will be used instead of the directory name.
              </p>
            </section>

            <section>
              <h2>Disable if needed</h2>
              <p>
                If you prefer to manage window titles yourself, set{" "}
                <code>set_window_title = false</code> in your{" "}
                <code>~/.config/son/config.toml</code>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-[10px] font-mono">
              S
            </div>
            <span>son &middot; MIT License &middot; Built with Go</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-text-dim">
            <a
              href="https://github.com/abdussamet032/son"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-muted transition-colors"
            >
              GitHub
            </a>
            <Link href="/guides" className="hover:text-text-muted transition-colors">
              Guides
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
