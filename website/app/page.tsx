"use client";

import { useEffect, useState, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-sm font-mono">
            S
          </div>
          <span className="text-lg font-semibold tracking-tight">son</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-text-muted">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </a>
          <a href="#compare" className="hover:text-white transition-colors">
            Compare
          </a>
          <a
            href="https://github.com/abdussamet032/son"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GitHubIcon className="w-4 h-4" />
            GitHub
          </a>
        </div>
        <a
          href="#install"
          className="hidden md:inline-flex px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all"
        >
          Install
        </a>
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */
function Hero() {
  const [copied, setCopied] = useState(false);
  const installCmd = "brew install abdussamet032/tap/son";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 hero-glow" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-text-muted mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
          Open source CLI tool for developers
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 animate-fade-in-up">
          Project Switcher CLI
          <br />
          for Terminal Workspaces.
          <br />
          <span className="gradient-text">Two keystrokes.</span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="font-mono text-cyan font-medium">son</span> finds your recent repos,
          fuzzy-searches them with fzf, and opens ready-made terminal workspaces
          in tmux, WezTerm, or iTerm2 with split panes, editors, and startup hooks.
        </p>

        {/* Install command */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={copyToClipboard}
            className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan/30 hover:bg-white/[0.06] transition-all duration-300 cursor-pointer"
          >
            <span className="text-text-dim font-mono text-sm">$</span>
            <code className="font-mono text-sm sm:text-base text-text">
              {installCmd}
            </code>
            <span className="ml-2 text-text-muted group-hover:text-cyan transition-colors">
              {copied ? (
                <CheckIcon className="w-4 h-4 text-green" />
              ) : (
                <CopyIcon className="w-4 h-4" />
              )}
            </span>
          </button>
          <p className="text-xs text-text-dim mt-3">
            Also available via{" "}
            <code className="text-text-muted">go install</code> &middot;
            macOS &middot; Linux
          </p>
        </div>

        {/* Terminal Demo */}
        <div
          className="mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <TerminalDemo />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDownIcon className="w-5 h-5 text-text-dim" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Terminal Demo (animated)                                           */
/* ------------------------------------------------------------------ */
function TerminalDemo() {
  const [phase, setPhase] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [selectedRow, setSelectedRow] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const command = "son";
  const projects = [
    { name: "abdussamet032/api-gateway", date: "07 Apr 15:32", freq: "42" },
    { name: "kendikralligim/son", date: "07 Apr 14:18", freq: "38" },
    { name: "myorg/frontend", date: "06 Apr 22:45", freq: "27" },
    { name: "myorg/backend-services", date: "06 Apr 19:10", freq: "21" },
    { name: "abdussamet032/dotfiles", date: "05 Apr 11:30", freq: "15" },
  ];

  useEffect(() => {
    const runAnimation = () => {
      // Phase 0: empty prompt
      // Phase 1: typing "son"
      // Phase 2: show project list
      // Phase 3: highlight selection
      // Phase 4: show split pane result
      // Phase 5: pause, then restart

      // Reset
      setPhase(0);
      setTypedChars(0);
      setSelectedRow(0);

      const delays: [number, () => void][] = [
        [800, () => setPhase(1)], // start typing
      ];

      // Type each char of "son"
      for (let i = 0; i < command.length; i++) {
        delays.push([
          800 + (i + 1) * 150,
          () => setTypedChars(i + 1),
        ]);
      }

      delays.push([1500, () => setPhase(2)]); // show project list
      delays.push([2200, () => setSelectedRow(0)]); // highlight row
      delays.push([3000, () => setPhase(3)]); // Enter pressed
      delays.push([3500, () => setPhase(4)]); // show workspace
      delays.push([7500, () => runAnimation()]); // restart loop

      delays.forEach(([delay, fn]) => {
        timerRef.current = setTimeout(fn, delay);
      });
    };

    runAnimation();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Terminal chrome */}
      <div className="rounded-xl overflow-hidden terminal-glow animate-pulse-glow border border-terminal-border bg-terminal-bg">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#1a2332]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-xs text-text-dim font-mono">
            ~/dev
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-5 font-mono text-sm leading-relaxed min-h-[280px]">
          {phase < 4 ? (
            <>
              {/* Prompt line */}
              <div className="flex items-center gap-2">
                <span className="text-cyan">~</span>
                <span className="text-text-dim">$</span>
                <span className="text-white">
                  {command.slice(0, typedChars)}
                </span>
                {phase < 2 && (
                  <span className="w-2 h-5 bg-cyan/80 cursor-blink inline-block" />
                )}
              </div>

              {/* Project list */}
              {phase >= 2 && (
                <div className="mt-3 animate-fade-in">
                  <div className="text-text-muted mb-2 text-xs">
                    <span className="text-cyan">?</span> Select project:{" "}
                    <span className="text-text-dim">
                      (Use arrow keys or type to filter)
                    </span>
                  </div>
                  {projects.map((p, i) => (
                    <div
                      key={p.name}
                      className={`flex items-center justify-between py-1 px-2 rounded transition-all duration-200 ${
                        i === selectedRow && phase >= 2
                          ? "bg-cyan/10 text-cyan"
                          : "text-text-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {i === selectedRow && phase >= 2 ? (
                          <span className="text-cyan text-xs">&#9654;</span>
                        ) : (
                          <span className="text-transparent text-xs">
                            &#9654;
                          </span>
                        )}
                        <span
                          className={
                            i === selectedRow && phase >= 2
                              ? "text-white"
                              : ""
                          }
                        >
                          {p.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="text-text-dim">{p.date}</span>
                        <span className="text-text-dim opacity-50">
                          f:{p.freq}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Enter feedback */}
              {phase >= 3 && (
                <div className="mt-3 text-green animate-fade-in text-xs">
                  Opening api-gateway in iTerm2 with split layout...
                </div>
              )}
            </>
          ) : (
            /* Phase 4: Split pane workspace view */
            <div className="animate-fade-in">
              <div className="text-green text-xs mb-3">
                Workspace ready in 0.3s
              </div>
              <div className="grid grid-cols-2 gap-1 rounded-lg overflow-hidden border border-[#1a2332]">
                {/* Left pane */}
                <div className="bg-[#0d1117] p-3 border-r border-[#1a2332] min-h-[160px]">
                  <div className="text-cyan text-xs mb-2">
                    ~/api-gateway
                  </div>
                  <div className="text-text-dim text-xs space-y-1">
                    <div>
                      <span className="text-text-muted">$</span> nvim .
                    </div>
                    <div className="text-green mt-2">NeoVim</div>
                    <div className="text-text-dim text-[10px]">
                      main.go | handlers/ | config/
                    </div>
                  </div>
                </div>
                {/* Right pane - split top/bottom */}
                <div className="flex flex-col gap-1">
                  <div className="bg-[#0d1117] p-3 flex-1">
                    <div className="text-yellow text-xs mb-1">
                      server
                    </div>
                    <div className="text-text-dim text-xs">
                      <span className="text-text-muted">$</span> go run .
                    </div>
                    <div className="text-green text-[10px] mt-1">
                      Listening on :8080
                    </div>
                  </div>
                  <div className="bg-[#0d1117] p-3 flex-1 border-t border-[#1a2332]">
                    <div className="text-purple text-xs mb-1">
                      tests
                    </div>
                    <div className="text-text-dim text-xs">
                      <span className="text-text-muted">$</span> go test
                      ./...
                    </div>
                    <div className="text-green text-[10px] mt-1">
                      PASS (12 tests)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Features Grid                                                      */
/* ------------------------------------------------------------------ */
function Features() {
  const features = [
    {
      icon: <SearchIcon />,
      title: "Smart Discovery",
      description:
        "Scans your dev directories automatically. Zero config. Finds every repo, every project, every time.",
      color: "text-cyan",
    },
    {
      icon: <TerminalIcon />,
      title: "Multi-Terminal",
      description:
        "Native support for iTerm2, tmux, and WezTerm. Uses whichever you have, adapts to its API.",
      color: "text-blue",
    },
    {
      icon: <ZapIcon />,
      title: "Fuzzy Search",
      description:
        "Powered by fzf. Type a few characters, find any project instantly. Frecency-sorted for smarter defaults.",
      color: "text-yellow",
    },
    {
      icon: <LayoutIcon />,
      title: "Custom Layouts",
      description:
        "Single pane, split, 3-pane, or grid. Define per-project or use smart defaults based on project type.",
      color: "text-purple",
    },
    {
      icon: <CodeIcon />,
      title: "Editor Integration",
      description:
        "Launches VS Code, Cursor, Zed, or Neovim alongside your terminal panes. One command, full workspace.",
      color: "text-green",
    },
    {
      icon: <GearIcon />,
      title: "Startup Hooks",
      description:
        "Auto-run commands per project. Start dev servers, set env vars, activate venvs. All from .son.toml.",
      color: "text-cyan",
    },
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Search Projects with fzf
            <br />
            <span className="text-text-muted">and Frecency Ranking.</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto">
            Launch split-pane workspaces with editors and startup hooks.
            Designed for developers who value their time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:translate-y-[-2px] group"
            >
              <div
                className={`w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-4 ${feature.color} group-hover:bg-white/10 transition-colors`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works                                                       */
/* ------------------------------------------------------------------ */
function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Install",
      description: "One command. Homebrew or Go install. No dependencies, no runtime, no bloat.",
      code: "brew install abdussamet032/tap/son",
      color: "from-cyan to-blue",
    },
    {
      number: "02",
      title: "Run",
      description: "Type son. See your projects sorted by recent activity and frequency. Pick one with fuzzy search.",
      code: "son",
      color: "from-blue to-purple",
    },
    {
      number: "03",
      title: "Code",
      description:
        "Your terminal opens with the layout you want, editor ready, dev server running. Zero to productive in under a second.",
      code: "# you're already coding",
      color: "from-purple to-cyan",
    },
  ];

  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Switch Between Projects in Terminal — Fast.
          </h2>
          <p className="text-text-muted max-w-md mx-auto">
            Install son on macOS or Linux. From zero to a fully configured
            workspace in under 60 seconds.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              className="glass-card rounded-xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6 group hover:translate-y-[-2px] transition-all duration-300"
            >
              {/* Step number */}
              <div
                className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-black font-mono font-bold text-lg`}
              >
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.description}</p>
              </div>

              {/* Code */}
              <code className="shrink-0 font-mono text-sm text-text-muted bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                $ {step.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Comparison Table                                                    */
/* ------------------------------------------------------------------ */
function Comparison() {
  const features = [
    "Zero-config project discovery",
    "Frecency sorting",
    "Fuzzy search (fzf)",
    "Multi-terminal support",
    "Custom split layouts",
    "Editor integration",
    "Startup hooks",
    "Per-project config",
    "Single binary, no runtime",
  ];

  const tools: {
    name: string;
    support: (boolean | string)[];
    highlight?: boolean;
  }[] = [
    {
      name: "son",
      support: [true, true, true, true, true, true, true, true, true],
      highlight: true,
    },
    {
      name: "tmuxinator",
      support: [false, false, false, "tmux only", true, false, true, true, false],
    },
    {
      name: "zoxide",
      support: [false, true, true, false, false, false, false, false, true],
    },
    {
      name: "Manual",
      support: [false, false, false, false, false, false, false, false, "n/a"],
    },
  ];

  return (
    <section id="compare" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            son vs tmuxinator, zoxide, and Manual Setup
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Looking for a tmuxinator alternative? See how son compares to existing
            terminal session managers and directory jumpers.
          </p>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left py-4 px-6 font-medium text-text-muted">
                    Feature
                  </th>
                  {tools.map((tool) => (
                    <th
                      key={tool.name}
                      className={`py-4 px-4 font-semibold text-center ${
                        tool.highlight ? "text-cyan" : "text-text-muted"
                      }`}
                    >
                      {tool.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature}
                    className={`border-b border-white/[0.03] ${
                      i % 2 === 0 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="py-3 px-6 text-text-muted">{feature}</td>
                    {tools.map((tool) => (
                      <td key={tool.name} className="py-3 px-4 text-center">
                        {tool.support[i] === true ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green/10">
                            <CheckIcon className="w-3.5 h-3.5 text-green" />
                          </span>
                        ) : tool.support[i] === false ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5">
                            <XIcon className="w-3.5 h-3.5 text-text-dim" />
                          </span>
                        ) : (
                          <span className="text-xs text-text-dim">
                            {String(tool.support[i])}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Install Section                                                    */
/* ------------------------------------------------------------------ */
function Install() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const commands = [
    {
      label: "Homebrew",
      cmd: "brew install abdussamet032/tap/son",
    },
    {
      label: "Go",
      cmd: "go install github.com/abdussamet032/son@latest",
    },
  ];

  const copy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section
      id="install"
      className="py-32 relative"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-gradient-to-r from-cyan/10 via-blue/10 to-purple/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Install son on macOS and Linux
        </h2>
        <p className="text-text-muted mb-12 max-w-md mx-auto">
          One command. Start switching between projects immediately. No config
          files, no setup wizard, no tutorials needed.
        </p>

        <div className="space-y-4 max-w-xl mx-auto">
          {commands.map((c, i) => (
            <div key={c.label} className="glass-card rounded-xl p-1">
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-text-dim uppercase tracking-wider w-20 text-left">
                    {c.label}
                  </span>
                  <code className="font-mono text-sm text-text">
                    <span className="text-text-dim">$ </span>
                    {c.cmd}
                  </code>
                </div>
                <button
                  onClick={() => copy(c.cmd, i)}
                  className="ml-4 shrink-0 p-2 rounded-lg hover:bg-white/5 text-text-muted hover:text-cyan transition-colors cursor-pointer"
                >
                  {copiedIdx === i ? (
                    <CheckIcon className="w-4 h-4 text-green" />
                  ) : (
                    <CopyIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://github.com/abdussamet032/son"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan to-blue text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <GitHubIcon className="w-4 h-4" />
            View on GitHub
          </a>
          <a
            href="https://github.com/abdussamet032/son#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-sm hover:bg-white/5 hover:border-white/20 transition-all"
          >
            Read the docs
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold mb-3">Compare</h4>
            <ul className="space-y-2 text-sm text-text-dim">
              <li><a href="/compare/tmuxinator" className="hover:text-text-muted transition-colors">son vs tmuxinator</a></li>
              <li><a href="/compare/zoxide" className="hover:text-text-muted transition-colors">son vs zoxide</a></li>
              <li><a href="/compare/sesh" className="hover:text-text-muted transition-colors">son vs sesh</a></li>
              <li><a href="/compare/tmuxp" className="hover:text-text-muted transition-colors">son vs tmuxp</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Guides</h4>
            <ul className="space-y-2 text-sm text-text-dim">
              <li><a href="/guides/switch-between-projects-in-terminal" className="hover:text-text-muted transition-colors">Switch Between Projects</a></li>
              <li><a href="/guides/manage-multiple-git-repos-terminal" className="hover:text-text-muted transition-colors">Manage Multiple Repos</a></li>
              <li><a href="/guides/open-project-in-tmux-split-panes" className="hover:text-text-muted transition-colors">tmux Split Panes</a></li>
              <li><a href="/guides/fzf-project-switcher" className="hover:text-text-muted transition-colors">fzf Project Switcher</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-text-dim">
              <li><a href="https://github.com/abdussamet032/son" target="_blank" rel="noopener noreferrer" className="hover:text-text-muted transition-colors">GitHub</a></li>
              <li><a href="https://github.com/abdussamet032/son/releases" target="_blank" rel="noopener noreferrer" className="hover:text-text-muted transition-colors">Releases</a></li>
              <li><a href="https://github.com/abdussamet032/son/issues" target="_blank" rel="noopener noreferrer" className="hover:text-text-muted transition-colors">Issues</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Install</h4>
            <ul className="space-y-2 text-sm text-text-dim">
              <li><code className="text-xs">brew install abdussamet032/tap/son</code></li>
              <li><code className="text-xs">go install github.com/abdussamet032/son@latest</code></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan to-blue flex items-center justify-center text-black font-bold text-[10px] font-mono">
              S
            </div>
            <span>
              son &middot; MIT License &middot; Built with Go
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-text-dim">
            <a
              href="https://github.com/abdussamet032/son"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-text-muted transition-colors flex items-center gap-1.5"
            >
              <GitHubIcon className="w-4 h-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG for zero dependencies)                           */
/* ------------------------------------------------------------------ */
function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function CopyIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ChevronDownIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="9" y1="21" x2="9" y2="9" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Comparison />
      <Install />
      <Footer />
    </main>
  );
}
