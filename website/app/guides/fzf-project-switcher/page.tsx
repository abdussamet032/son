import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Build an fzf Project Switcher (and When to Use son Instead) | son CLI",
  description:
    "Step-by-step guide to building a fuzzy project picker with fzf and bash. Starts simple, adds git timestamps and frecency, then shows where DIY scripts hit their limits.",
  keywords: [
    "fzf project switcher",
    "fzf project picker",
    "bash fzf script",
    "fuzzy finder projects",
    "terminal project selector",
    "fzf git projects",
    "son cli",
  ],
  openGraph: {
    title: "Build an fzf Project Switcher (and When to Use son Instead)",
    description:
      "Build a fuzzy project picker from scratch with fzf. See the script evolve and learn when a dedicated tool is the better choice.",
    type: "article",
  },
  alternates: {
    canonical: "/guides/fzf-project-switcher",
  },
};

export default function FzfProjectSwitcherGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Build an fzf Project Switcher",
            description:
              "Step-by-step guide to building a bash function that uses fzf for fuzzy project selection, with progressively advanced features.",
            step: [
              {
                "@type": "HowToStep",
                name: "Install fzf",
                text: "Install fzf using your package manager (brew install fzf on macOS, apt install fzf on Ubuntu).",
              },
              {
                "@type": "HowToStep",
                name: "Build a basic project picker",
                text: "Use find to list git repos and pipe to fzf for interactive fuzzy selection.",
              },
              {
                "@type": "HowToStep",
                name: "Add git timestamps",
                text: "Enhance the script to show the last commit date alongside each project name.",
              },
              {
                "@type": "HowToStep",
                name: "Add frecency tracking",
                text: "Implement an access counter using a flat file to track and sort by usage frequency.",
              },
              {
                "@type": "HowToStep",
                name: "Evaluate limitations",
                text: "Understand where DIY scripts fall short: no workspace launch, no multi-terminal support, maintenance burden.",
              },
            ],
            tool: [
              { "@type": "HowToTool", name: "fzf" },
              { "@type": "HowToTool", name: "bash or zsh" },
              { "@type": "HowToTool", name: "git" },
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
            <span className="text-text-muted">fzf Project Switcher</span>
          </div>

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-cyan mb-3 tracking-wide uppercase">
              Guide
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Build an fzf Project Switcher (and When to Use son Instead)
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              fzf is one of the most powerful tools in a developer&apos;s
              terminal toolkit. In this guide, we will build a project picker
              from scratch, progressively adding features until we hit the
              limits of what a shell script can comfortably handle.
            </p>
          </header>

          {/* --- Section: What is fzf --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">What Is fzf?</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>fzf</strong> (short for fuzzy finder) is a
              general-purpose command-line fuzzy finder written in Go. You pipe
              a list of items into it, and it gives you an interactive search
              interface where you can type fragments of what you are looking
              for and see matches instantly.
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Install fzf</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> brew install fzf
                {"      "}# macOS
              </div>
              <div className="text-text mb-3">
                <span className="text-text-dim">$</span> sudo apt install fzf
                {"  "}# Ubuntu/Debian
              </div>
              <div className="text-green mb-1"># Basic usage: search files</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> ls | fzf
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1">
                # Search anything: processes, git branches, commands
              </div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> git branch | fzf
              </div>
              <div className="text-text">
                <span className="text-text-dim">$</span> history | fzf
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              fzf is a building block, not a solution. It knows nothing about
              projects, git repos, or terminal workspaces. That is your job.
              Let us build something with it.
            </p>
          </section>

          {/* --- Section: Version 1 --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Version 1: Basic Project Picker (5 Lines)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The simplest fzf project picker finds all git repos under a
              directory and lets you pick one:
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
                {"  "}dir=$(find ~/dev -maxdepth 3 -name &quot;.git&quot; -type d \
              </div>
              <div className="text-text mb-1">
                {"    "}| sed &apos;s|/\.git$||&apos; \
              </div>
              <div className="text-text mb-1">
                {"    "}| sed &quot;s|$HOME/dev/||&quot; \
              </div>
              <div className="text-text mb-1">
                {"    "}| fzf --height 40% --reverse --prompt=&quot;project&gt; &quot;)
              </div>
              <div className="text-text mb-1">
                {"  "}[[ -n &quot;$dir&quot; ]] &amp;&amp; cd &quot;$HOME/dev/$dir&quot;
              </div>
              <div className="text-text">
                {`}`}
              </div>
            </div>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Usage</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> proj
              </div>
              <div className="text-text-dim mb-1">project&gt; api</div>
              <div className="text-cyan mb-1">
                {"  "}mycompany/api-gateway
              </div>
              <div className="text-text-muted mb-1">
                {"  "}personal/api-client
              </div>
              <div className="text-text-muted">
                {"  "}oss/openapi-gen
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              This works. It is simple and fast enough for small project
              collections. But it has problems: it rescans the filesystem
              every time, the results are unsorted (alphabetical at best), and
              all you get is a{" "}
              <code className="font-mono text-text text-sm">cd</code> into
              the directory.
            </p>
          </section>

          {/* --- Section: Version 2 --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Version 2: Adding Git Timestamps (15 Lines)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Let us make the list more useful by showing the last commit
              date, so you can see which projects are active:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-text mb-1">
                {`proj() {`}
              </div>
              <div className="text-text mb-1">
                {"  "}local selected
              </div>
              <div className="text-text mb-1">
                {"  "}selected=$(
              </div>
              <div className="text-text mb-1">
                {"    "}find ~/dev -maxdepth 3 -name &quot;.git&quot; -type d 2&gt;/dev/null \
              </div>
              <div className="text-text mb-1">
                {"    "}| sed &apos;s|/\.git$||&apos; \
              </div>
              <div className="text-text mb-1">
                {"    "}| while read -r repo; do
              </div>
              <div className="text-text mb-1">
                {"        "}ts=$(git -C &quot;$repo&quot; log -1 --format=&apos;%ci&apos; 2&gt;/dev/null \
              </div>
              <div className="text-text mb-1">
                {"          "}| cut -d&apos; &apos; -f1 || echo &quot;no-commits&quot;)
              </div>
              <div className="text-text mb-1">
                {"        "}name=$(echo &quot;$repo&quot; | sed &quot;s|$HOME/dev/||&quot;)
              </div>
              <div className="text-text mb-1">
                {"        "}printf &quot;%-40s %s\n&quot; &quot;$name&quot; &quot;$ts&quot;
              </div>
              <div className="text-text mb-1">
                {"      "}done \
              </div>
              <div className="text-text mb-1">
                {"    "}| sort -k2 -r \
              </div>
              <div className="text-text mb-1">
                {"    "}| fzf --height 50% --reverse --prompt=&quot;project&gt; &quot; \
              </div>
              <div className="text-text mb-1">
                {"    "}| awk &apos;&#123;print $1&#125;&apos;
              </div>
              <div className="text-text mb-1">
                {"  "})
              </div>
              <div className="text-text mb-1">
                {"  "}[[ -n &quot;$selected&quot; ]] &amp;&amp; cd &quot;$HOME/dev/$selected&quot;
              </div>
              <div className="text-text">
                {`}`}
              </div>
            </div>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Output now shows dates</div>
              <div className="text-text-dim mb-1">project&gt;</div>
              <div className="text-text mb-1">
                {"  "}mycompany/api-gateway{"             "}2026-04-07
              </div>
              <div className="text-text mb-1">
                {"  "}mycompany/frontend{"                "}2026-04-06
              </div>
              <div className="text-text mb-1">
                {"  "}personal/blog{"                     "}2026-04-05
              </div>
              <div className="text-text-muted">
                {"  "}oss/old-experiment{"                "}2025-11-12
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              Better. Active projects now appear at the top. But there is a
              noticeable lag: the script runs{" "}
              <code className="font-mono text-text text-sm">git log</code>{" "}
              inside every repo sequentially. With 50 repos, you might wait
              2-3 seconds. With 200 repos, it could take 10+ seconds. You can
              optimize this with parallel execution, but the script is getting
              complex.
            </p>
          </section>

          {/* --- Section: Version 3 --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Version 3: Adding Frecency (40+ Lines)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Git timestamps tell you when code was last <em>committed</em>,
              but not when you last <em>worked on</em> a project. You might
              access a repo for code review without committing. To track
              actual usage, you need a frequency/recency database:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1">
                # Frecency tracking file
              </div>
              <div className="text-text mb-1">PROJ_DB=&quot;$HOME/.proj_frecency&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">
                {`_proj_record() {`}
              </div>
              <div className="text-text mb-1">
                {"  "}local proj=&quot;$1&quot; now=$(date +%s)
              </div>
              <div className="text-text mb-1">
                {"  "}touch &quot;$PROJ_DB&quot;
              </div>
              <div className="text-text mb-1">
                {"  "}echo &quot;$now $proj&quot; &gt;&gt; &quot;$PROJ_DB&quot;
              </div>
              <div className="text-text">
                {`}`}
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">
                {`_proj_score() {`}
              </div>
              <div className="text-text mb-1">
                {"  "}local now=$(date +%s)
              </div>
              <div className="text-text mb-1">
                {"  "}awk -v now=&quot;$now&quot; &apos;&#123;
              </div>
              <div className="text-text mb-1">
                {"    "}age = (now - $1) / 3600
              </div>
              <div className="text-text mb-1">
                {"    "}if (age &lt; 1) w = 8
              </div>
              <div className="text-text mb-1">
                {"    "}else if (age &lt; 24) w = 4
              </div>
              <div className="text-text mb-1">
                {"    "}else if (age &lt; 168) w = 2
              </div>
              <div className="text-text mb-1">
                {"    "}else w = 1
              </div>
              <div className="text-text mb-1">
                {"    "}scores[$2] += w
              </div>
              <div className="text-text mb-1">
                {"  "}&#125; END &#123;
              </div>
              <div className="text-text mb-1">
                {"    "}for (p in scores) printf &quot;%d %s\n&quot;, scores[p], p
              </div>
              <div className="text-text mb-1">
                {"  "}&#125;&apos; &quot;$PROJ_DB&quot; | sort -rn
              </div>
              <div className="text-text">
                {`}`}
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">
                {`proj() {`}
              </div>
              <div className="text-text mb-1">
                {"  "}local selected
              </div>
              <div className="text-text mb-1">
                {"  "}selected=$(
              </div>
              <div className="text-text mb-1">
                {"    "}&#123; _proj_score; find ~/dev -maxdepth 3 -name &quot;.git&quot; -type d \
              </div>
              <div className="text-text mb-1">
                {"      "}| sed &apos;s|/\.git$||;s|.*/dev/||&apos; \
              </div>
              <div className="text-text mb-1">
                {"      "}| awk &apos;&#123;print &quot;0 &quot; $0&#125;&apos;; &#125; \
              </div>
              <div className="text-text mb-1">
                {"    "}| sort -k2 -u | sort -k1 -rn \
              </div>
              <div className="text-text mb-1">
                {"    "}| awk &apos;&#123;print $2&#125;&apos; \
              </div>
              <div className="text-text mb-1">
                {"    "}| fzf --height 50% --reverse --prompt=&quot;project&gt; &quot;
              </div>
              <div className="text-text mb-1">
                {"  "})
              </div>
              <div className="text-text mb-1">
                {"  "}if [[ -n &quot;$selected&quot; ]]; then
              </div>
              <div className="text-text mb-1">
                {"    "}_proj_record &quot;$selected&quot;
              </div>
              <div className="text-text mb-1">
                {"    "}cd &quot;$HOME/dev/$selected&quot;
              </div>
              <div className="text-text mb-1">
                {"  "}fi
              </div>
              <div className="text-text">
                {`}`}
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              Now we have a proper frecency-sorted project picker. Projects
              you use frequently and recently appear at the top. It works. But
              look at how much code this is, and it is still just a directory
              jumper.
            </p>
          </section>

          {/* --- Section: Its Limits --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Where the DIY Script Hits Its Limits
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Even with Version 3, there are several things your script cannot
              do without becoming a full application:
            </p>
            <ul className="space-y-3 text-text-muted leading-relaxed mb-4">
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">1.</span>
                <span>
                  <strong className="text-text">No workspace launch.</strong>{" "}
                  The script gets you into a directory. It does not open your
                  editor, start dev servers, or split your terminal into panes.
                  Adding that means shelling out to tmux, iTerm2 AppleScript,
                  or WezTerm CLI -- each with its own API.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">2.</span>
                <span>
                  <strong className="text-text">
                    No multi-terminal support.
                  </strong>{" "}
                  Writing code that works in tmux, iTerm2, and WezTerm
                  requires handling three different APIs. That is a lot of
                  bash.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">3.</span>
                <span>
                  <strong className="text-text">No per-project config.</strong>{" "}
                  Different projects need different layouts. Your API needs a
                  3-pane setup; your blog needs a single pane. Encoding this
                  in bash gets ugly fast.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">4.</span>
                <span>
                  <strong className="text-text">Caching is manual.</strong>{" "}
                  The find+git scan is slow. You could cache results to a
                  file, but then you need cache invalidation logic, background
                  refresh, etc.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">5.</span>
                <span>
                  <strong className="text-text">Maintenance burden.</strong>{" "}
                  Shell scripts are fragile. Edge cases accumulate: repos with
                  spaces in paths, repos without commits, submodules, nested
                  git directories. Each is a bug waiting to happen.
                </span>
              </li>
            </ul>
            <p className="text-text-muted leading-relaxed">
              At some point, you cross the line from &quot;handy shell
              function&quot; to &quot;application I need to maintain.&quot;
              That is the point where a dedicated tool pays for itself.
            </p>
          </section>

          {/* --- Section: When to Use son --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              When to Use son Instead
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>son</strong> is essentially what Version 3 of the script
              above would become if you kept adding features and rewrote it in
              a compiled language. It handles all the things the DIY script
              cannot:
            </p>

            <div className="glass-card rounded-xl overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 font-medium text-text-muted">
                        Feature
                      </th>
                      <th className="py-3 px-4 text-center text-text-muted">
                        DIY fzf Script
                      </th>
                      <th className="py-3 px-4 text-center text-cyan font-semibold">
                        son
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-muted">
                    {[
                      ["Fuzzy project search", "Yes", "Yes"],
                      ["Frecency sorting", "40+ lines of awk", "Built-in"],
                      ["Cached project index", "DIY or slow", "Automatic"],
                      ["Split pane workspace", "No", "Yes"],
                      ["Multi-terminal (tmux/iTerm/WezTerm)", "Pick one or write 3x code", "All supported"],
                      ["Per-project config", "No", ".son.toml"],
                      ["Editor integration", "Manual", "Built-in"],
                      ["Startup hooks", "No", "Yes"],
                      ["Single binary, no deps", "Needs bash + fzf + git", "Yes (fzf included)"],
                    ].map(([feature, diy, son], i) => (
                      <tr
                        key={feature}
                        className={`border-b border-white/[0.03] ${
                          i % 2 === 0 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="py-2.5 px-4 text-text-muted">
                          {feature}
                        </td>
                        <td className="py-2.5 px-4 text-center text-text-dim text-xs">
                          {diy}
                        </td>
                        <td className="py-2.5 px-4 text-center text-xs font-medium text-text">
                          {son}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-text-muted leading-relaxed mb-4">
              That said, keep the DIY script if:
            </p>
            <ul className="space-y-2 text-text-muted leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  You have fewer than 10 projects and do not need workspace
                  automation.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  You enjoy customizing shell scripts and want full control.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green mt-0.5 shrink-0">+</span>
                <span>
                  You only need to{" "}
                  <code className="font-mono text-text text-sm">cd</code>{" "}
                  into a directory and nothing else.
                </span>
              </li>
            </ul>
          </section>

          {/* --- Section: Getting Started --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Getting Started with son
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              If you are ready to move beyond the script, here is the setup:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Install</div>
              <div className="text-text mb-3">
                <span className="text-text-dim">$</span> brew install
                abdussamet032/tap/son
              </div>
              <div className="text-green mb-1"># Run it</div>
              <div className="text-text mb-3">
                <span className="text-text-dim">$</span> son
              </div>
              <div className="text-green mb-1"># Bind to a key (optional)</div>
              <div className="text-text">
                <span className="text-text-dim">$</span> echo
                &apos;bindkey -s &quot;^P&quot; &quot;son\n&quot;&apos; &gt;&gt;
                ~/.zshrc
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              No config files. No database setup. No dependencies to install.
              It discovers your projects automatically from common dev
              directories, and the frecency ranking starts learning your
              patterns from the first use.
            </p>
            <p className="text-text-muted leading-relaxed mt-4">
              For more on workspace layouts, see the{" "}
              <Link
                href="/guides/open-project-in-tmux-split-panes"
                className="text-cyan hover:underline"
              >
                tmux split panes guide
              </Link>
              . For tips on managing large numbers of repos, see{" "}
              <Link
                href="/guides/manage-multiple-git-repos-terminal"
                className="text-cyan hover:underline"
              >
                managing multiple git repos
              </Link>
              .
            </p>
          </section>

          {/* --- CTA --- */}
          <section className="mt-16 glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              From 40 lines of bash to one binary.
            </h2>
            <p className="text-text-muted mb-6 max-w-lg mx-auto">
              Keep your fzf skills. Lose the maintenance burden.
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
