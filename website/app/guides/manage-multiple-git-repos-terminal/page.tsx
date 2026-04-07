import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "How to Manage Multiple Git Repos from One Terminal Workflow | son CLI",
  description:
    "Directory structure best practices, project discovery, frecency sorting, favorites, and workspace automation for managing dozens or hundreds of git repositories from your terminal.",
  keywords: [
    "manage multiple git repos terminal",
    "git repository management",
    "multiple projects terminal",
    "developer workflow",
    "frecency sorting",
    "git workspace",
  ],
  openGraph: {
    title: "How to Manage Multiple Git Repos from One Terminal Workflow",
    description:
      "Best practices for organizing, discovering, and launching workspaces across dozens of git repositories.",
    type: "article",
  },
  alternates: {
    canonical: "/guides/manage-multiple-git-repos-terminal",
  },
};

export default function ManageMultipleGitReposGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "How to Manage Multiple Git Repos from One Terminal Workflow",
            description:
              "A practical guide to organizing, discovering, and launching workspaces across multiple git repositories.",
            author: {
              "@type": "Organization",
              name: "son CLI",
              url: "https://github.com/abdussamet032/son",
            },
            publisher: {
              "@type": "Organization",
              name: "son CLI",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id":
                "https://son.cli.dev/guides/manage-multiple-git-repos-terminal",
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
            <Link href="/guides" className="hover:text-white transition-colors">
              Guides
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

      {/* Article */}
      <article className="pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-dim mb-8">
            <Link href="/" className="hover:text-text-muted transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/guides"
              className="hover:text-text-muted transition-colors"
            >
              Guides
            </Link>
            <span>/</span>
            <span className="text-text-muted">Manage Multiple Git Repos</span>
          </div>

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-cyan mb-3 tracking-wide uppercase">
              Guide
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              How to Manage Multiple Git Repos from One Terminal Workflow
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              If you work at a company with microservices, contribute to open
              source, and have personal projects, you might easily have 50-200
              git repos on your machine. Here is how to keep them organized and
              accessible without losing your mind.
            </p>
          </header>

          {/* --- Section: The Challenge --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Managing multiple repos is not a single problem. It is actually
              several problems tangled together:
            </p>
            <ul className="space-y-2 text-text-muted leading-relaxed mb-4">
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  <strong className="text-text">Discovery:</strong> Where is
                  that repo? Did I clone it already? What is it called?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  <strong className="text-text">Navigation:</strong> Getting
                  into the right directory quickly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  <strong className="text-text">Prioritization:</strong> Which
                  of these 150 repos do I actually need right now?
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  <strong className="text-text">Workspace setup:</strong>{" "}
                  Opening the editor, starting dev servers, arranging terminal
                  panes for the specific project.
                </span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              Most tools solve one of these. A good workflow solves all of
              them together.
            </p>
          </section>

          {/* --- Section: Directory Structure --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Directory Structure Best Practices
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Before thinking about tooling, get your directory structure
              right. The most scalable pattern mirrors how GitHub organizes
              repositories:{" "}
              <code className="font-mono text-text text-sm">
                ~/dev/owner/repo
              </code>
              .
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-text-dim mb-1">~/dev/</div>
              <div className="text-text mb-1">
                {"  "}mycompany/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}api-gateway/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}frontend/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}auth-service/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}infrastructure/
              </div>
              <div className="text-text mb-1">
                {"  "}personal/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}dotfiles/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}blog/
              </div>
              <div className="text-text mb-1">
                {"  "}facebook/
              </div>
              <div className="text-text-muted mb-1">
                {"    "}react/
              </div>
              <div className="text-text mb-1">
                {"  "}golang/
              </div>
              <div className="text-text-muted">
                {"    "}go/
              </div>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              This pattern has several advantages:
            </p>
            <ul className="space-y-2 text-text-muted leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  It matches your mental model of ownership. You know
                  immediately which org a repo belongs to.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  No naming collisions. Two different orgs can have a repo
                  called{" "}
                  <code className="font-mono text-text text-sm">api</code>{" "}
                  without conflict.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  Fuzzy search works well because
                  &quot;mycompany/api&quot; is unambiguous.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  Tools like{" "}
                  <code className="font-mono text-text text-sm">son</code> and{" "}
                  <code className="font-mono text-text text-sm">ghq</code>{" "}
                  adopt this layout by default.
                </span>
              </li>
            </ul>
          </section>

          {/* --- Section: Discovery & Sorting --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Discovery and Sorting
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Once your repos are organized, you need a way to list and search
              them. The simplest approach is a{" "}
              <code className="font-mono text-text text-sm">find</code>{" "}
              command piped into{" "}
              <code className="font-mono text-text text-sm">fzf</code>:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-text-dim">
                <span className="text-text-dim">$</span> find ~/dev -maxdepth
                3 -name &quot;.git&quot; -type d | sed &apos;s|/\.git$||&apos; | sort
              </div>
              <div className="text-text-muted mt-2">
                /Users/you/dev/facebook/react
              </div>
              <div className="text-text-muted">
                /Users/you/dev/golang/go
              </div>
              <div className="text-text-muted">
                /Users/you/dev/mycompany/api-gateway
              </div>
              <div className="text-text-muted">
                /Users/you/dev/mycompany/auth-service
              </div>
              <div className="text-text-muted">
                /Users/you/dev/mycompany/frontend
              </div>
              <div className="text-text-muted">
                /Users/you/dev/mycompany/infrastructure
              </div>
              <div className="text-text-muted">
                /Users/you/dev/personal/blog
              </div>
              <div className="text-text-muted">
                /Users/you/dev/personal/dotfiles
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              But alphabetical sorting is almost useless. You do not care about
              repos alphabetically -- you care about which ones you are
              actively working on.
            </p>
          </section>

          {/* --- Section: Frecency --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Ranking by Activity (Frecency)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>Frecency</strong> is a portmanteau of frequency and
              recency. The idea comes from browser history ranking: a page you
              visited 50 times last month but not since should rank lower than
              one you visited 5 times today.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              You can approximate this with git. The most recent commit
              timestamp in a repo is a decent proxy for how recently you
              worked on it:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Sort repos by most recent commit</div>
              <div className="text-text mb-1">
                for repo in ~/dev/*/*; do
              </div>
              <div className="text-text mb-1">
                {"  "}ts=$(git -C &quot;$repo&quot; log -1 --format=%ct 2&gt;/dev/null || echo 0)
              </div>
              <div className="text-text mb-1">
                {"  "}echo &quot;$ts $repo&quot;
              </div>
              <div className="text-text mb-1">done | sort -rn | head -10</div>
              <div className="text-text-dim mt-2">
                1712505120 /Users/you/dev/mycompany/api-gateway
              </div>
              <div className="text-text-dim">
                1712501880 /Users/you/dev/personal/blog
              </div>
              <div className="text-text-dim">
                1712498700 /Users/you/dev/mycompany/frontend
              </div>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              This gives you recency but not frequency. True frecency requires
              tracking both access count and access time over a window. Tools
              like <strong>zoxide</strong> do this for directories. <strong>son</strong>{" "}
              does it specifically for project selection, combining how often
              you open a project with how recently you opened it.
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># son output: projects sorted by frecency</div>
              <div className="text-text-dim">
                <span className="text-text-dim">$</span> son --list
              </div>
              <div className="text-text mt-2">
                mycompany/api-gateway{"      "}07 Apr 15:32{"  "}f:42
              </div>
              <div className="text-text">
                mycompany/frontend{"         "}06 Apr 22:45{"  "}f:27
              </div>
              <div className="text-text">
                personal/blog{"              "}05 Apr 11:30{"  "}f:15
              </div>
              <div className="text-text-muted">
                mycompany/auth-service{"     "}01 Apr 09:00{"  "}f:3
              </div>
              <div className="text-text-muted">
                facebook/react{"             "}28 Mar 14:00{"  "}f:1
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              The <code className="font-mono text-text text-sm">f:</code> score
              tells you at a glance which projects dominate your workflow.
              Projects you have not touched in weeks naturally sink to the
              bottom.
            </p>
          </section>

          {/* --- Section: Favorites & Pinning --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Favorites and Pinning</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Frecency is great for daily work, but sometimes you have a
              project that you access infrequently yet want at the top of your
              list -- like an infrastructure repo you need during on-call. You
              can handle this with favorites or pinning.
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Pin a project in son</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> son --pin mycompany/infrastructure
              </div>
              <div className="text-text-dim mt-2 mb-1">
                # Pinned projects always appear first
              </div>
              <div className="text-text-dim">
                <span className="text-text-dim">$</span> son
              </div>
              <div className="text-yellow mt-1">
                {"  "}* mycompany/infrastructure{"  "}(pinned)
              </div>
              <div className="text-cyan">
                {"  "}&#9654; mycompany/api-gateway{"     "}f:42
              </div>
              <div className="text-text-muted">
                {"    "}mycompany/frontend{"        "}f:27
              </div>
            </div>
          </section>

          {/* --- Section: Workspace Launch --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Workspace Launch</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Finding a repo is only half the battle. The other half is setting
              up your workspace for that specific project. Different projects
              need different things:
            </p>
            <ul className="space-y-2 text-text-muted leading-relaxed mb-4">
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  A Go API might need an editor pane, a server pane running{" "}
                  <code className="font-mono text-text text-sm">go run .</code>,
                  and a test pane.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  A React frontend might need{" "}
                  <code className="font-mono text-text text-sm">npm run dev</code>{" "}
                  in one pane and a shell for git in another.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-0.5 shrink-0">--</span>
                <span>
                  A monorepo might need panes for multiple services
                  simultaneously.
                </span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed mb-4">
              You can define per-project workspace configs in a{" "}
              <code className="font-mono text-text text-sm">.son.toml</code>{" "}
              file:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># ~/dev/mycompany/api-gateway/.son.toml</div>
              <div className="text-text mb-1">layout = &quot;split&quot;</div>
              <div className="text-text mb-1">editor = &quot;nvim&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">cmd = &quot;go run .&quot;</div>
              <div className="text-text mb-1">name = &quot;server&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">cmd = &quot;go test ./... -v&quot;</div>
              <div className="text-text">name = &quot;tests&quot;</div>
            </div>
            <p className="text-text-muted leading-relaxed">
              Now when you select api-gateway, son opens a split layout with
              your editor on one side and your server and test runners on the
              other. See the{" "}
              <Link
                href="/guides/open-project-in-tmux-split-panes"
                className="text-cyan hover:underline"
              >
                tmux split panes guide
              </Link>{" "}
              for more layout options.
            </p>
          </section>

          {/* --- Section: Putting It All Together --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Putting It All Together with son
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Here is the complete workflow when everything is in place:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># 1. You press Ctrl+P (bound to son)</div>
              <div className="text-text-dim mb-3"># 2. Fuzzy picker appears with frecency-sorted projects</div>
              <div className="text-cyan mb-1">
                ? Select project:
              </div>
              <div className="text-cyan mb-1">
                {"  "}&#9654; mycompany/api-gateway{"       "}07 Apr 15:32{"  "}f:42
              </div>
              <div className="text-text-muted mb-1">
                {"    "}mycompany/frontend{"          "}06 Apr 22:45{"  "}f:27
              </div>
              <div className="text-text-muted mb-1">
                {"    "}personal/blog{"               "}05 Apr 11:30{"  "}f:15
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># 3. You type &quot;front&quot; + Enter</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># 4. Workspace opens:</div>
              <div className="text-text-muted mb-1">
                Opening mycompany/frontend in tmux with split layout...
              </div>
              <div className="text-text-muted mb-1">
                {"  "}Pane 1: nvim .
              </div>
              <div className="text-text-muted mb-1">
                {"  "}Pane 2: npm run dev
              </div>
              <div className="text-text">
                Workspace ready in 0.4s
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              From thought (&quot;I need to check the frontend&quot;) to a
              fully configured workspace in under a second. No directory
              navigation, no remembering paths, no manual pane setup. This is
              the difference between managing repos and having repos managed
              for you.
            </p>
          </section>

          {/* --- CTA --- */}
          <section className="mt-16 glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Manage repos, not paths.
            </h2>
            <p className="text-text-muted mb-6 max-w-lg mx-auto">
              Install son and let frecency sorting surface the projects that
              matter.
            </p>
            <div className="bg-[#0d1117] rounded-lg border border-[#1a2332] px-5 py-3 font-mono text-sm inline-block mb-6">
              <span className="text-text-dim">$ </span>
              <span className="text-text">
                brew install abdussamet032/tap/son
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/abdussamet032/son"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan to-blue text-black font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                View on GitHub
              </a>
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 hover:border-white/20 transition-all"
              >
                More guides
              </Link>
            </div>
          </section>
        </div>
      </article>

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
              href="/guides"
              className="hover:text-text-muted transition-colors"
            >
              Guides
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
