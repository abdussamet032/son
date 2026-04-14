import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quick Setup with son setup — Interactive Terminal Configuration | son CLI",
  description:
    "Learn how to configure son instantly using the interactive setup command. Set dev directories, preferred terminal, editor, and more — no config files needed.",
  keywords: [
    "son setup",
    "son configuration",
    "interactive setup",
    "terminal configuration",
    "son cli config",
  ],
  openGraph: {
    title: "Quick Setup with son setup — Interactive Terminal Configuration",
    description:
      "Configure son instantly with an interactive TUI. No config files needed.",
    type: "article",
  },
  alternates: {
    canonical: "/guides/son-setup-command",
  },
};

export default function SonSetupGuide() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Quick Setup with son setup — Interactive Terminal Configuration",
            description:
              "Learn how to configure son instantly using the interactive setup command.",
            step: [
              {
                "@type": "HowToStep",
                name: "Run son setup",
                text: "Execute the son setup command to launch the interactive configuration TUI.",
              },
              {
                "@type": "HowToStep",
                name: "Configure dev directories",
                text: "Tell son where your projects live. It will scan and index them.",
              },
              {
                "@type": "HowToStep",
                name: "Choose your terminal",
                text: "Select iTerm2, tmux, or WezTerm as your preferred terminal.",
              },
              {
                "@type": "HowToStep",
                name: "Pick your editor",
                text: "Choose VS Code, Cursor, Zed, Neovim, or another editor.",
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
            <Link
              href="/guides"
              className="hover:text-white transition-colors"
            >
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
            <p className="text-sm font-medium text-green mb-3 tracking-wide uppercase">
              Configuration
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Quick Setup with son setup
            </h1>
            <p className="text-xl text-text-muted leading-relaxed">
              Configure everything via an interactive TUI. No config files, no
              CLI flags. Just run <code className="text-cyan">son setup</code> and
              answer a few questions.
            </p>
          </div>

          {/* Terminal Demo */}
          <div className="rounded-xl overflow-hidden terminal-glow border border-terminal-border bg-terminal-bg mb-12">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#1a2332]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="ml-2 text-xs text-text-dim font-mono">Terminal</span>
            </div>
            <div className="p-6 font-mono text-sm">
              <div className="text-text-dim mb-4">
                <span className="text-green">~</span> <span className="text-text-muted">$</span>{" "}
                <span className="text-white">son setup</span>
              </div>
              <div className="space-y-3 text-text-muted">
                <div className="flex items-center gap-2">
                  <span className="text-cyan">?</span>
                  <span>Dev directories:</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green">[&bull;]</span>
                    <span>~/dev</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-dim">
                    <span>[ ]</span>
                    <span>~/projects</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-cyan">?</span>
                  <span>Default terminal:</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green">[&bull;]</span>
                    <span>iTerm2</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-dim">
                    <span>[ ]</span>
                    <span>tmux</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-dim">
                    <span>[ ]</span>
                    <span>WezTerm</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <span className="text-cyan">?</span>
                  <span>Preferred editor:</span>
                </div>
                <div className="pl-4 space-y-1">
                  <div className="flex items-center gap-2 text-text-dim">
                    <span>[ ]</span>
                    <span>VS Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green">[&bull;]</span>
                    <span>Neovim</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-dim">
                    <span>[ ]</span>
                    <span>Cursor</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-dim">
                    <span>[ ]</span>
                    <span>Zed</span>
                  </div>
                </div>
                <div className="mt-4 text-green">
                  Configuration saved to ~/.config/son/config.toml
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2>Why use son setup?</h2>
              <p>
                Instead of reading documentation and manually editing config files,
                just run <code className="text-cyan">son setup</code>. The interactive
                TUI guides you through every option with sensible defaults.
              </p>
            </section>

            <section>
              <h2>What you can configure</h2>
              <ul>
                <li>
                  <strong>Dev directories</strong> — where son scans for your projects.
                  Add multiple directories for monorepos or scattered workspaces.
                </li>
                <li>
                  <strong>Default terminal</strong> — iTerm2, tmux, or WezTerm. son
                  detects what you have installed automatically.
                </li>
                <li>
                  <strong>Preferred editor</strong> — VS Code, Cursor, Zed, Neovim,
                  or any editor that opens from CLI.
                </li>
                <li>
                  <strong>Default layout</strong> — split horizontally, vertically,
                  or grid. Override per-project later with <code>.son.toml</code>.
                </li>
                <li>
                  <strong>Frecency decay</strong> — tune how quickly old projects
                  drop in the ranking.
                </li>
              </ul>
            </section>

            <section>
              <h2>After setup</h2>
              <p>
                Once configured, just run <code className="text-cyan">son</code> to
                launch the project picker. Your settings are saved to{" "}
                <code>~/.config/son/config.toml</code> — you can edit this file
                directly or re-run <code>son setup</code> anytime.
              </p>
            </section>

            <section>
              <h2>Config file location</h2>
              <p>
                On macOS: <code>~/.config/son/config.toml</code>
              </p>
              <p>
                On Linux: <code>~/.config/son/config.toml</code>
              </p>
              <p>
                See all options in the{" "}
                <a href="https://github.com/abdussamet032/son#configuration">
                  configuration reference
                </a>
                .
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
