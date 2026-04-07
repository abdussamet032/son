import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Open a Project in tmux Split Panes Automatically | son CLI",
  description:
    "Compare tmuxinator, tmuxp, and son for automatically creating tmux split pane layouts. Includes layout presets, startup hooks, and .son.toml configuration examples.",
  keywords: [
    "open project tmux split panes automatically",
    "tmux layout automation",
    "tmuxinator alternative",
    "tmuxp",
    "terminal workspace",
    "tmux pane setup",
    "son cli tmux",
  ],
  openGraph: {
    title: "Open a Project in tmux Split Panes Automatically",
    description:
      "Stop manually splitting panes. Learn how to set up automatic tmux workspaces with layout presets and startup hooks.",
    type: "article",
  },
  alternates: {
    canonical: "/guides/open-project-in-tmux-split-panes",
  },
};

export default function TmuxSplitPanesGuide() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Open a Project in tmux Split Panes Automatically",
            description:
              "Learn how to automatically create tmux split pane workspaces for your projects using tmuxinator, tmuxp, and son.",
            step: [
              {
                "@type": "HowToStep",
                name: "Understand manual tmux pane setup",
                text: "Learn the tmux commands needed to manually split panes and run commands in each.",
              },
              {
                "@type": "HowToStep",
                name: "Evaluate tmuxinator",
                text: "Create YAML config files for tmuxinator to automate pane layouts.",
              },
              {
                "@type": "HowToStep",
                name: "Evaluate tmuxp",
                text: "Use tmuxp's JSON/YAML configs for similar automation with a different syntax.",
              },
              {
                "@type": "HowToStep",
                name: "Use son for zero-config automation",
                text: "Install son and use built-in layout presets or .son.toml for per-project workspace configuration.",
              },
            ],
            tool: [
              { "@type": "HowToTool", name: "tmux" },
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
            <span className="text-text-muted">tmux Split Panes</span>
          </div>

          {/* Header */}
          <header className="mb-12">
            <p className="text-sm font-medium text-cyan mb-3 tracking-wide uppercase">
              Guide
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Open a Project in tmux Split Panes Automatically
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              Every time you start working on a project, you go through the
              same ritual: split the terminal, navigate to the project in each
              pane, start the dev server in one, open the editor in another,
              maybe run tests in a third. Here is how to automate that entire
              sequence.
            </p>
          </header>

          {/* --- Section: Manual Setup --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              The Manual tmux Pane Setup (What We Are Replacing)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              If you do this by hand in tmux, the sequence looks something
              like this:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Create a new session</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> tmux new-session -s api-gateway -c ~/dev/mycompany/api-gateway
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Split horizontally</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">Ctrl+B</span> %
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># In the right pane, split vertically</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">Ctrl+B</span> &quot;
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Go to left pane, start editor</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">Ctrl+B</span> &#123;left&#125;
              </div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> nvim .
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Go to top-right pane, start server</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">Ctrl+B</span> &#123;right&#125;
              </div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> go run .
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Go to bottom-right pane, run tests</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">Ctrl+B</span> &#123;down&#125;
              </div>
              <div className="text-text">
                <span className="text-text-dim">$</span> go test ./... -v
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              That is about 12 keystrokes and 30 seconds, assuming you
              remember the exact sequence. Do this 5 times a day across
              different projects and you are spending 2-3 minutes daily on
              pane choreography. Now let us automate it.
            </p>
          </section>

          {/* --- Section: tmuxinator --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Using tmuxinator (Config-Heavy Approach)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>tmuxinator</strong> is the most popular tmux workspace
              manager. It uses YAML config files to define session layouts:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># ~/.config/tmuxinator/api-gateway.yml</div>
              <div className="text-text mb-1">name: api-gateway</div>
              <div className="text-text mb-1">root: ~/dev/mycompany/api-gateway</div>
              <div className="text-text-dim mb-1">&nbsp;</div>
              <div className="text-text mb-1">windows:</div>
              <div className="text-text mb-1">{"  "}- editor:</div>
              <div className="text-text mb-1">{"      "}layout: main-vertical</div>
              <div className="text-text mb-1">{"      "}panes:</div>
              <div className="text-text mb-1">{"        "}- nvim .</div>
              <div className="text-text mb-1">{"        "}- go run .</div>
              <div className="text-text">{"        "}- go test ./... -v</div>
            </div>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># Launch the workspace</div>
              <div className="text-text">
                <span className="text-text-dim">$</span> tmuxinator start api-gateway
              </div>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              tmuxinator is solid and battle-tested. The downsides:
            </p>
            <ul className="space-y-2 text-text-muted leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">!</span>
                <span>
                  You need to create a YAML config file for every project.
                  With 30 repos, that is 30 config files to maintain.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">!</span>
                <span>
                  It requires Ruby as a runtime dependency.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">!</span>
                <span>
                  It only works with tmux. If you also use iTerm2 or WezTerm,
                  you need separate solutions.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow mt-0.5 shrink-0">!</span>
                <span>
                  It does not discover projects. You still need to remember
                  the config name and type it out.
                </span>
              </li>
            </ul>
          </section>

          {/* --- Section: tmuxp --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Using tmuxp
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>tmuxp</strong> is similar to tmuxinator but written in
              Python and supports both YAML and JSON configs:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># .tmuxp.yaml in project root</div>
              <div className="text-text mb-1">session_name: api-gateway</div>
              <div className="text-text mb-1">start_directory: ./</div>
              <div className="text-text mb-1">windows:</div>
              <div className="text-text mb-1">{"  "}- window_name: dev</div>
              <div className="text-text mb-1">{"    "}layout: main-vertical</div>
              <div className="text-text mb-1">{"    "}panes:</div>
              <div className="text-text mb-1">{"      "}- shell_command: nvim .</div>
              <div className="text-text mb-1">{"      "}- shell_command: go run .</div>
              <div className="text-text">{"      "}- shell_command: go test ./... -v</div>
            </div>
            <p className="text-text-muted leading-relaxed">
              tmuxp has the advantage of placing config files in the project
              root, which keeps things co-located with the code. However, it
              shares the same fundamental limitations: tmux-only, manual
              config creation, Python dependency, no project discovery.
            </p>
          </section>

          {/* --- Section: son --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Using son (Zero-Config Approach)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              <strong>son</strong> takes a different approach. Instead of
              requiring a config file for every project, it provides sensible
              defaults and only needs configuration when you want something
              specific. Most projects work with zero config:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1"># No config needed for most projects</div>
              <div className="text-text mb-1">
                <span className="text-text-dim">$</span> son
              </div>
              <div className="text-text-dim mb-1">
                ? Select project: api-gateway
              </div>
              <div className="text-green mb-1">
                Opening api-gateway in tmux with split layout...
              </div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># son detects your terminal automatically:</div>
              <div className="text-text-muted mb-1">
                {"  "}tmux detected {"  "}→ uses tmux split-window
              </div>
              <div className="text-text-muted mb-1">
                {"  "}iTerm2 detected → uses AppleScript split panes
              </div>
              <div className="text-text-muted">
                {"  "}WezTerm detected → uses WezTerm CLI
              </div>
            </div>
            <p className="text-text-muted leading-relaxed">
              son discovers your projects, presents them through fzf, and
              opens the workspace in whichever terminal you are using. No
              YAML, no Ruby, no Python.
            </p>
          </section>

          {/* --- Section: Layout Presets --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Layout Presets</h2>
            <p className="text-text-muted leading-relaxed mb-4">
              son includes built-in layout presets you can use without writing
              any config:
            </p>

            {/* Layout grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Single */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-sm font-semibold text-cyan mb-2">
                  single
                </h3>
                <div className="bg-[#0d1117] rounded-lg border border-[#1a2332] p-3 mb-2 h-20 flex items-center justify-center">
                  <div className="w-full h-full rounded bg-cyan/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    shell
                  </div>
                </div>
                <p className="text-xs text-text-dim">
                  One pane. Good for quick edits.
                </p>
              </div>

              {/* Split */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-sm font-semibold text-cyan mb-2">
                  split
                </h3>
                <div className="bg-[#0d1117] rounded-lg border border-[#1a2332] p-3 mb-2 h-20 flex gap-1">
                  <div className="flex-1 rounded bg-cyan/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    editor
                  </div>
                  <div className="flex-1 rounded bg-purple/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    shell
                  </div>
                </div>
                <p className="text-xs text-text-dim">
                  Two panes side by side. The default.
                </p>
              </div>

              {/* 3-pane */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-sm font-semibold text-cyan mb-2">
                  3-pane
                </h3>
                <div className="bg-[#0d1117] rounded-lg border border-[#1a2332] p-3 mb-2 h-20 flex gap-1">
                  <div className="flex-1 rounded bg-cyan/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    editor
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex-1 rounded bg-yellow/10 flex items-center justify-center text-xs text-text-dim font-mono">
                      server
                    </div>
                    <div className="flex-1 rounded bg-purple/10 flex items-center justify-center text-xs text-text-dim font-mono">
                      tests
                    </div>
                  </div>
                </div>
                <p className="text-xs text-text-dim">
                  Editor left, server and tests right.
                </p>
              </div>

              {/* Grid */}
              <div className="glass-card rounded-xl p-5">
                <h3 className="text-sm font-semibold text-cyan mb-2">
                  grid
                </h3>
                <div className="bg-[#0d1117] rounded-lg border border-[#1a2332] p-3 mb-2 h-20 grid grid-cols-2 grid-rows-2 gap-1">
                  <div className="rounded bg-cyan/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    1
                  </div>
                  <div className="rounded bg-yellow/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    2
                  </div>
                  <div className="rounded bg-purple/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    3
                  </div>
                  <div className="rounded bg-green/10 flex items-center justify-center text-xs text-text-dim font-mono">
                    4
                  </div>
                </div>
                <p className="text-xs text-text-dim">
                  Four equal panes. For microservices.
                </p>
              </div>
            </div>
          </section>

          {/* --- Section: Startup Hooks --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Startup Hooks (Auto-Run Commands)
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              The real power of automated workspaces is running commands
              automatically when panes open. Instead of navigating to a pane
              and typing{" "}
              <code className="font-mono text-text text-sm">npm run dev</code>,
              the command runs for you.
            </p>
            <p className="text-text-muted leading-relaxed mb-4">
              In tmuxinator and tmuxp, you define commands in the config file.
              In son, you use the{" "}
              <code className="font-mono text-text text-sm">.son.toml</code>{" "}
              file in the project root. Here is a real example:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1">
                # ~/dev/mycompany/api-gateway/.son.toml
              </div>
              <div className="text-text mb-1">layout = &quot;3-pane&quot;</div>
              <div className="text-text mb-1">editor = &quot;nvim&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Hook that runs before panes open</div>
              <div className="text-text mb-1">[hooks]</div>
              <div className="text-text mb-1">before = &quot;source .env.local&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-green mb-1"># Pane definitions</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">name = &quot;server&quot;</div>
              <div className="text-text mb-1">cmd = &quot;go run .&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">name = &quot;tests&quot;</div>
              <div className="text-text">cmd = &quot;go test ./... -v -count=1&quot;</div>
            </div>
            <p className="text-text-muted leading-relaxed mb-4">
              Here is a more complex example for a fullstack monorepo:
            </p>
            <div className="bg-[#0d1117] rounded-xl border border-[#1a2332] p-5 font-mono text-sm leading-relaxed mb-4 overflow-x-auto">
              <div className="text-green mb-1">
                # ~/dev/mycompany/fullstack-app/.son.toml
              </div>
              <div className="text-text mb-1">layout = &quot;grid&quot;</div>
              <div className="text-text mb-1">editor = &quot;code&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[hooks]</div>
              <div className="text-text mb-1">before = &quot;nvm use 20&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">name = &quot;frontend&quot;</div>
              <div className="text-text mb-1">cmd = &quot;cd frontend &amp;&amp; npm run dev&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">name = &quot;backend&quot;</div>
              <div className="text-text mb-1">cmd = &quot;cd backend &amp;&amp; npm run dev&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">name = &quot;db&quot;</div>
              <div className="text-text mb-1">cmd = &quot;docker compose up postgres redis&quot;</div>
              <div className="text-text-dim mb-3">&nbsp;</div>
              <div className="text-text mb-1">[[panes]]</div>
              <div className="text-text mb-1">name = &quot;shell&quot;</div>
              <div className="text-text">cmd = &quot;&quot;</div>
            </div>
            <p className="text-text-muted leading-relaxed">
              This opens a 4-pane grid layout. The frontend dev server starts
              in one pane, the backend API in another, Docker databases in the
              third, and a clean shell in the fourth. All of that from typing{" "}
              <code className="font-mono text-text text-sm">son</code> and
              selecting the project.
            </p>
          </section>

          {/* --- Section: Comparison Table --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              Comparison: tmuxinator vs tmuxp vs son
            </h2>
            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-3 px-4 font-medium text-text-muted">
                        Feature
                      </th>
                      <th className="py-3 px-4 text-center text-text-muted">
                        tmuxinator
                      </th>
                      <th className="py-3 px-4 text-center text-text-muted">
                        tmuxp
                      </th>
                      <th className="py-3 px-4 text-center text-cyan font-semibold">
                        son
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-text-muted">
                    {[
                      ["Config required per project", "Yes (YAML)", "Yes (YAML/JSON)", "No (optional)"],
                      ["Project discovery", "No", "No", "Yes"],
                      ["Fuzzy search", "No", "No", "Yes (fzf)"],
                      ["Frecency sorting", "No", "No", "Yes"],
                      ["Multi-terminal support", "tmux only", "tmux only", "tmux, iTerm2, WezTerm"],
                      ["Runtime dependency", "Ruby", "Python", "None (Go binary)"],
                      ["Layout presets", "Built-in tmux layouts", "Built-in tmux layouts", "single, split, 3-pane, grid"],
                      ["Startup hooks", "Yes", "Yes", "Yes"],
                    ].map(([feature, tmuxinator, tmuxp, son], i) => (
                      <tr
                        key={feature}
                        className={`border-b border-white/[0.03] ${
                          i % 2 === 0 ? "bg-white/[0.01]" : ""
                        }`}
                      >
                        <td className="py-2.5 px-4 text-text-muted">{feature}</td>
                        <td className="py-2.5 px-4 text-center text-text-dim text-xs">
                          {tmuxinator}
                        </td>
                        <td className="py-2.5 px-4 text-center text-text-dim text-xs">
                          {tmuxp}
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
          </section>

          {/* --- Section: When to use what --- */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">
              When to Use What
            </h2>
            <ul className="space-y-3 text-text-muted leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">--</span>
                <span>
                  <strong className="text-text">Use tmuxinator or tmuxp</strong>{" "}
                  if you exclusively use tmux, you have a small number of
                  projects with complex window layouts (multiple windows, not
                  just panes), and you do not mind maintaining YAML configs.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">--</span>
                <span>
                  <strong className="text-text">Use son</strong> if you want
                  zero-config defaults, project discovery, frecency sorting,
                  and support for multiple terminal applications. It is
                  especially useful when you have many projects and want the
                  workspace setup to be automatic rather than manually
                  configured.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan mt-1 shrink-0">--</span>
                <span>
                  <strong className="text-text">Combine them</strong> if you
                  want to. son handles project discovery and selection;
                  tmuxinator handles complex multi-window layouts. They are
                  not mutually exclusive.
                </span>
              </li>
            </ul>
          </section>

          {/* --- CTA --- */}
          <section className="mt-16 glass-card rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">
              Stop splitting panes by hand.
            </h2>
            <p className="text-text-muted mb-6 max-w-lg mx-auto">
              Install son and let your workspace assemble itself.
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
                href="/guides/fzf-project-switcher"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 hover:border-white/20 transition-all"
              >
                Next: fzf Project Switcher
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
