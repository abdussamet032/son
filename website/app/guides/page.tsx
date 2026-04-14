import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guides - son CLI | Terminal Workflow Tutorials",
  description:
    "Practical guides for managing multiple projects, switching repos in your terminal, setting up tmux workspaces, and building fzf-powered workflows.",
  keywords: [
    "terminal guides",
    "tmux tutorial",
    "fzf project switcher",
    "manage git repos",
    "terminal workflow",
    "developer productivity",
    "son cli",
  ],
  openGraph: {
    title: "Guides - son CLI | Terminal Workflow Tutorials",
    description:
      "Practical guides for managing multiple projects, switching repos, tmux workspaces, and fzf workflows.",
    type: "website",
  },
};

const guides = [
  {
    slug: "switch-between-projects-in-terminal",
    title: "How to Switch Between Projects in Terminal Fast",
    description:
      "Stop wasting time with cd and find. Learn the fastest ways to jump between projects in your terminal, from manual methods to fzf to zero-config tools.",
    keywords: ["cd", "terminal navigation", "project switching", "fzf"],
    readTime: "6 min read",
    color: "from-cyan to-blue",
  },
  {
    slug: "manage-multiple-git-repos-terminal",
    title: "How to Manage Multiple Git Repos from One Terminal Workflow",
    description:
      "Directory structure patterns, discovery strategies, frecency sorting, and workspace automation for developers juggling dozens or hundreds of repositories.",
    keywords: ["git repos", "directory structure", "frecency", "workspace"],
    readTime: "7 min read",
    color: "from-blue to-purple",
  },
  {
    slug: "open-project-in-tmux-split-panes",
    title: "Open a Project in tmux Split Panes Automatically",
    description:
      "Compare tmuxinator, tmuxp, and son for creating split-pane workspaces. Includes layout presets, startup hooks, and real configuration examples.",
    keywords: ["tmux", "split panes", "tmuxinator", "workspace layout"],
    readTime: "7 min read",
    color: "from-purple to-cyan",
  },
  {
    slug: "fzf-project-switcher",
    title: "Build an fzf Project Switcher (and When to Use son Instead)",
    description:
      "Build a fuzzy project picker from scratch using fzf and bash. See how the script grows in complexity, and when a dedicated tool starts to make more sense.",
    keywords: ["fzf", "bash script", "fuzzy finder", "project picker"],
    readTime: "8 min read",
    color: "from-cyan to-purple",
  },
  {
    slug: "son-setup-command",
    title: "Quick Setup with son setup — Interactive Terminal Configuration",
    description:
      "Skip the config file. Run son setup to configure your dev directories, preferred terminal, editor, and layout preferences via an interactive TUI.",
    keywords: ["son setup", "configuration", "interactive", "tui"],
    readTime: "3 min read",
    color: "from-green to-cyan",
  },
  {
    slug: "terminal-window-titles",
    title: "Automate Terminal Window Titles to Show Project Names",
    description:
      "Learn how son automatically sets your terminal window and tab titles to match the project you're working in — and why it makes finding the right terminal effortless.",
    keywords: ["window titles", "iterm2", "tmux", "wezterm", "tab titles"],
    readTime: "4 min read",
    color: "from-yellow to-green",
  },
];

export default function GuidesIndex() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "son CLI Guides",
            description:
              "Practical terminal workflow guides for developers using the son CLI tool.",
            url: "https://son.cli.dev/guides",
            mainEntity: {
              "@type": "ItemList",
              itemListElement: guides.map((g, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://son.cli.dev/guides/${g.slug}`,
                name: g.title,
              })),
            },
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
            <a
              href="https://github.com/abdussamet032/son"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-sm font-medium text-cyan mb-3 tracking-wide uppercase">
              Guides
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Terminal Workflow Guides
            </h1>
            <p className="text-lg text-text-muted max-w-2xl leading-relaxed">
              Practical tutorials on project switching, repository management,
              tmux workspaces, and fuzzy search workflows. Each guide stands on
              its own and teaches real skills regardless of which tools you use.
            </p>
          </div>

          {/* Guide Cards */}
          <div className="grid gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="group glass-card rounded-xl p-8 transition-all duration-300 hover:translate-y-[-2px] block"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                  {/* Accent bar */}
                  <div
                    className={`shrink-0 w-1.5 sm:w-1.5 h-full sm:h-auto sm:self-stretch rounded-full bg-gradient-to-b ${guide.color} hidden sm:block`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs text-text-dim">
                        {guide.readTime}
                      </span>
                      {guide.keywords.map((kw) => (
                        <span
                          key={kw}
                          className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-text-dim"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-cyan transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="shrink-0 self-center text-text-dim group-hover:text-cyan group-hover:translate-x-1 transition-all">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
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
            <Link
              href="/"
              className="hover:text-text-muted transition-colors"
            >
              Home
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
