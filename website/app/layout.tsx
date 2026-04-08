import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getson.is-a.dev";

export const metadata: Metadata = {
  title: {
    default: "son: Project Switcher CLI & Terminal Workspace Launcher",
    template: "%s | son",
  },
  description:
    "son is a project switcher CLI that finds recent repos, fuzzy-searches them, and opens ready-made terminal workspaces in tmux, WezTerm, or iTerm2.",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "son: Project Switcher CLI & Terminal Workspace Launcher",
    description:
      "son is a project switcher CLI that finds recent repos, fuzzy-searches them, and opens ready-made terminal workspaces in tmux, WezTerm, or iTerm2.",
    type: "website",
    url: SITE_URL,
    siteName: "son",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "son: Project Switcher CLI & Terminal Workspace Launcher",
    description:
      "son is a project switcher CLI that finds recent repos, fuzzy-searches them, and opens ready-made terminal workspaces in tmux, WezTerm, or iTerm2.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "son",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS, Linux",
  url: SITE_URL,
  downloadUrl: "https://github.com/abdussamet032/son/releases",
  codeRepository: "https://github.com/abdussamet032/son",
  description:
    "son is a project switcher CLI that finds recent repos, fuzzy-searches them, and opens ready-made terminal workspaces in tmux, WezTerm, or iTerm2.",
  isAccessibleForFree: true,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Project discovery",
    "fzf fuzzy search",
    "Frecency ranking",
    "tmux support",
    "WezTerm support",
    "iTerm2 support",
    "Split-pane layouts",
    "Editor integration",
    "Startup hooks",
    "Per-project configuration",
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
