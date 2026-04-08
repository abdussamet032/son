import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://getson.is-a.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/compare`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/tmuxinator`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compare/zoxide`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/compare/sesh`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compare/tmuxp`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/switch-between-projects-in-terminal`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/manage-multiple-git-repos-terminal`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/guides/open-project-in-tmux-split-panes`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/guides/fzf-project-switcher`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
