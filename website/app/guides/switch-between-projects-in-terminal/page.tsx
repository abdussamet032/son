import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Switch Between Projects in Terminal Fast | son CLI",
  description:
    "Learn the fastest ways to switch between projects in your terminal. From cd and find to fzf and zero-config project launchers like son.",
  keywords: [
    "switch between projects terminal",
    "cd alternative",
    "fzf project",
    "terminal project switcher",
    "change directory fast",
    "developer productivity terminal",
  ],
  openGraph: {
    title: "How to Switch Between Projects in Terminal Fast",
    description:
      "Stop wasting time navigating directories. Learn fast project switching methods from manual to fully automated.",
    type: "article",
  },
  alternates: {
    canonical: "/guides/switch-between-projects-in-terminal",
  },
};

export default function SwitchBetweenProjectsGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Switch Between Projects in Terminal Fast",
            description:
              "A comprehensive guide to switching between projects in your terminal quickly, covering manual workflows, fzf, and automated tools.",
            step: [
              {
                "@type": "HowToStep",
                name: "Understand the problem",
                text: "Context switching between projects costs time and focus. Every cd command is a micro-interruption.",
              },
              {
                "@type": "HowToStep",
                name: "Try shell aliases",
                text: "Create bash aliases for frequently visited projects to reduce typing.",
              },
              {
                "@type": "HowToStep",
                name: "Use fzf for fuzzy search",
                text: "Install fzf and pipe directory listings through it for interactive fuzzy matching.",
              },
              {
                "@type": "HowToStep",
                name: "Automate with son",
                text: "Install son for zero-config project discovery, frecency sorting, and automatic workspace setup.",
              },
            ],
            tool: [
              { "@type": "HowToTool", name: "Terminal (iTerm2, tmux, or WezTerm)" },
              { "@type": "HowToTool", name: "fzf (optional)" },
              { "@type": "HowToTool", name: "son CLI" },
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
            <span className="text-text-muted">Switch Between Projects</span>
          </div>

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-cyan mb-3 tracking-wide uppercase">
              Guide
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              How to Switch Between Projects in Terminal Fast
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Every developer with more than a handful of repos has felt the
              friction: you need to jump from one project to another, and
              suddenly you are typing out directory paths from memory, running{" "}
              <code className="text-cyan font-mono text-base">find</code>, or
              scrolling through shell history. Here is how to fix that.
            </p>
          </header>

          {/* --- Section: The Problem --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              The Problem: Context Switching Kills Your Flow
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Research on developer productivity consistently shows that context
              switches are the most expensive interruptions in a coding session.
              When you break from writing code to figure out where a project
              lives on disk, you are not just losing the 10-30 seconds it takes
              to navigate there. You are losing the mental context you built up
              in the previous project.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              The typical workflow looks something like this: you finish a task
              in project A, you need to check something in project B, and now
              you are trying to remember whether it was in{" "}
              <code className="font-mono text-text text-sm">~/dev/work/</code>{" "}
              or{" "}
              <code className="font-mono text-text text-sm">
                ~/projects/company/
              </code>
              . You start tab-completing paths, maybe run{" "}
              <code className="font-mono text-text text-sm">ls</code> a couple
              of times, and eventually land in the right directory. Multiply
              this by 20 times a day across 5 different projects, and you are
              burning real time.
            </p>
          </section>

          {/* --- Section: Manual Workflow --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Level 0: The Manual Workflow
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The most common approach is manual navigation using{" "}
              <code className="font-mono text-text text-sm">cd</code>. It works
              when you have 3-5 projects. It falls apart beyond that.
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-text-dim mb-1">
                <span className="text-cyan">~</span> $ cd ~/dev/work/company/api-gateway
              </div>
              <div className="text-text-dim mb-1">
                <span className="text-cyan">~/d/w/c/api-gateway</span> $ # do some work...
              </div>
              <div className="text-text-dim mb-1">
                <span className="text-cyan">~/d/w/c/api-gateway</span> $ cd ~/dev/personal/blog
              </div>
              <div className="text-text-dim mb-1">
                <span className="text-cyan">~/d/p/blog</span> $ # wait, was it in personal/ or oss/?
              </div>
              <div className="text-text-dim">
                <span className="text-cyan">~/d/p/blog</span> $ cd ~/dev/oss/blog-engine
              </div>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Some developers improve this with shell aliases:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># ~/.bashrc or ~/.zshrc</div>
              <div className="text-text mb-1">
                alias api=&quot;cd ~/dev/work/company/api-gateway&quot;
              </div>
              <div className="text-text mb-1">
                alias blog=&quot;cd ~/dev/oss/blog-engine&quot;
              </div>
              <div className="text-text">
                alias front=&quot;cd ~/dev/work/company/frontend&quot;
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              This helps, but it does not scale. You need to manually maintain
              the alias list, remember the alias names, and add new aliases
              every time you clone a new repo. For a developer working on 30+
              repos, this quickly becomes its own maintenance burden.
            </p>
          </section>

          {/* --- Section: Directory Jumpers --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Level 1: Directory Jumpers (z, zoxide, autojump)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Tools like <strong>zoxide</strong>, <strong>z</strong>, and{" "}
              <strong>autojump</strong> track the directories you visit and let
              you jump to them with partial matches. After you have visited a
              directory, you can return to it by typing just a fragment of its
              name.
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Using zoxide</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> z api-gateway
              </div>
              <div className="text-text-dim mb-3">
                # jumps to ~/dev/work/company/api-gateway
              </div>
              <div className="text-green mb-1"># Even shorter</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> z api
              </div>
              <div className="text-text-dim">
                # if &quot;api-gateway&quot; has the highest frecency score for
                &quot;api&quot;
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              This is a significant improvement. The limitation is that these
              tools are purely directory jumpers: they get you into the right
              folder, but that is where they stop. You still need to open your
              editor, start your dev server, arrange your terminal panes, and
              so on. They also require you to have visited the directory at
              least once before they know about it.
            </p>
          </section>

          {/* --- Section: fzf Approach --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Level 2: The fzf Approach (DIY Script)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>fzf</strong> is a general-purpose fuzzy finder. You can
              combine it with{" "}
              <code className="font-mono text-text text-sm">find</code> or{" "}
              <code className="font-mono text-text text-sm">fd</code> to build
              an interactive project picker:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1">
                # Add to ~/.bashrc or ~/.zshrc
              </div>
              <div className="text-text mb-1">
                {`proj() {`}
              </div>
              <div className="text-text mb-1">
                {"  "}local dir
              </div>
              <div className="text-text mb-1">
                {"  "}dir=$(find ~/dev -maxdepth 3 -name &quot;.git&quot; -type d 2&gt;/dev/null \
              </div>
              <div className="text-text mb-1">
                {"    "}| sed &apos;s|/\.git$||&apos; \
              </div>
              <div className="text-text mb-1">
                {"    "}| fzf --height 40% --reverse --prompt=&quot;project&gt; &quot;)
              </div>
              <div className="text-text mb-1">
                {"  "}[[ -n &quot;$dir&quot; ]] &amp;&amp; cd &quot;$dir&quot;
              </div>
              <div className="text-text">
                {`}`}
              </div>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Now you can type{" "}
              <code className="font-mono text-text text-sm">proj</code>, get
              an interactive list of every git repository under{" "}
              <code className="font-mono text-text text-sm">~/dev</code>, and
              fuzzy-search by name. This is a real productivity boost.
            </p>
            <p className="text-text-muted leading-relaxed">
              However, the script has gaps. It rescans the filesystem every
              time (slow with many repos). It has no frecency sorting, so your
              most-used projects are buried alongside repos you cloned once six
              months ago. And once you land in the directory, you still need to
              set up your workspace manually. For a more complete fzf-based
              solution, see our{" "}
              <Link
                href="/guides/fzf-project-switcher"
                className="text-cyan hover:underline"
              >
                fzf project switcher guide
              </Link>
              .
            </p>
          </section>

          {/* --- Section: Using son --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Level 3: Using son (Zero-Config Solution)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>son</strong> is a CLI tool designed specifically for this
              problem. It discovers every project under your dev directories,
              ranks them by frecency (a combination of how frequently and how
              recently you use them), presents them through fzf, and then opens
              a full workspace in your terminal -- editor, split panes, dev
              server, and all.
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Install</div>
              <div className="text-text mb-3">
                <span className="text-text-dim">$</span> brew install
                abdussamet032/tap/son
              </div>
              <div className="text-green mb-1"># Use it</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> son
              </div>
              <div className="text-text-dim mb-1">
                ? Select project: (type to filter)
              </div>
              <div className="text-cyan mb-1">
                {"  "}&#9654; myorg/api-gateway{"       "}07 Apr 15:32{"  "}f:42
              </div>
              <div className="text-text-muted mb-1">
                {"    "}myorg/frontend{"          "}06 Apr 22:45{"  "}f:27
              </div>
              <div className="text-text-muted mb-1">
                {"    "}personal/blog-engine{"    "}05 Apr 11:30{"  "}f:15
              </div>
              <div className="text-text-muted mb-3">
                {"    "}oss/react-component{"    "}04 Apr 09:00{"  "}f:8
              </div>
              <div className="text-green">
                Opening api-gateway in iTerm2 with split layout... (0.3s)
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              No config file needed. No aliases to maintain. No filesystem
              scan lag (son caches and incrementally updates). Your most-used
              projects surface to the top automatically. And when you select
              one, it does not just{" "}
              <code className="font-mono text-text text-sm">cd</code> you
              there -- it opens a complete workspace with your preferred
              layout.
            </p>
          </section>

          {/* --- Section: Keyboard Shortcuts --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Keyboard Shortcuts for Even Faster Switching
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              You can bind son to a keyboard shortcut in your shell so you do
              not even need to type the command name. Add this to your shell
              config:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1">
                # Bind Ctrl+P to open the project picker (zsh)
              </div>
              <div className="text-text mb-1">
                bindkey -s &apos;^P&apos; &apos;son\n&apos;
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Or for bash</div>
              <div className="text-text">
                bind &apos;&quot;\C-p&quot;: &quot;son\n&quot;&apos;
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              Now pressing <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs text-text border border-white/10">Ctrl</kbd> + <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs text-text border border-white/10">P</kbd> instantly
              opens the project picker. Select a project, press Enter, and
              your workspace opens. Two keystrokes from thought to code.
            </p>
          </section>

          {/* --- Section: 100+ Repos --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Tips for Managing 100+ Repos
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              When your project count climbs into the hundreds, even fuzzy
              search can feel slow if you do not have good habits:
            </p>
            <ul className="space-y-3 text-text-muted leading-relaxed mb-4">
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">1.</span>
                <span>
                  <strong className="text-text">Use a consistent directory structure.</strong>{" "}
                  Organize repos as{" "}
                  <code className="font-mono text-text text-sm">~/dev/org/repo</code>{" "}
                  (e.g.,{" "}
                  <code className="font-mono text-text text-sm">~/dev/mycompany/api</code>
                  ). This makes fuzzy matching predictable. See our{" "}
                  <Link
                    href="/guides/manage-multiple-git-repos-terminal"
                    className="text-cyan hover:underline"
                  >
                    git repo management guide
                  </Link>{" "}
                  for more on this.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">2.</span>
                <span>
                  <strong className="text-text">Trust frecency.</strong> Do not try to
                  organize your project list manually. Let the tool surface
                  what you actually use. After a week, the top 10 results will
                  match your workflow perfectly.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">3.</span>
                <span>
                  <strong className="text-text">Archive aggressively.</strong> Move repos
                  you are done with to an{" "}
                  <code className="font-mono text-text text-sm">~/archive</code>{" "}
                  directory outside your scan path. Less noise, faster results.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">4.</span>
                <span>
                  <strong className="text-text">Use per-project configs.</strong> For repos
                  with unique workspace needs (e.g., a microservices project
                  that needs 4 panes), add a{" "}
                  <code className="font-mono text-text text-sm">.son.toml</code>{" "}
                  so the workspace opens exactly the way you need it. See the{" "}
                  <Link
                    href="/guides/open-project-in-tmux-split-panes"
                    className="text-cyan hover:underline"
                  >
                    tmux split panes guide
                  </Link>
                  .
                </span>
              </li>
            </ul>
          </section>

          {/* --- CTA --- */}
          <section className="mt-16 glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Stop <code className="font-mono text-text-muted">cd</code>-ing.
              Start shipping.
            </h2>
            <p className="text-text-muted mb-6 max-w-lg mx-auto">
              Install son in one command and switch between projects in under a
              second.
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
