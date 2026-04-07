import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "son - Open the right repo in the right workspace",
  description:
    "A blazing-fast CLI that finds your projects, picks the right terminal layout, and drops you into a ready-made workspace. Two keystrokes.",
  keywords: [
    "cli",
    "developer tools",
    "terminal",
    "workspace",
    "tmux",
    "iterm2",
    "wezterm",
    "project launcher",
  ],
  openGraph: {
    title: "son - Developer Workspace Launcher",
    description:
      "Open the right repo in the right workspace. Two keystrokes.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
