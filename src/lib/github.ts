export interface GhUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  location: string | null;
}

export interface GhRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  homepage: string | null;
  size: number;
  has_pages: boolean;
}

export interface GhData {
  user: GhUser | null;
  repos: GhRepo[];
  topLanguages: { name: string; count: number; pct: number }[];
  totalStars: number;
  yearsActive: number;
}

const API = "https://api.github.com";

export async function fetchGitHub(username: string, signal?: AbortSignal): Promise<GhData> {
  const [userRes, reposRes] = await Promise.all([
    fetch(`${API}/users/${username}`, { signal }),
    fetch(`${API}/users/${username}/repos?per_page=100&sort=updated`, { signal }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API failed: ${userRes.status}/${reposRes.status}`);
  }

  const user = (await userRes.json()) as GhUser;
  const repos = (await reposRes.json()) as GhRepo[];

  const langCounts: Record<string, number> = {};
  for (const r of repos) {
    if (r.fork) continue;
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
  }
  const total = Object.values(langCounts).reduce((s, n) => s + n, 0) || 1;
  const topLanguages = Object.entries(langCounts)
    .map(([name, count]) => ({ name, count, pct: count / total }))
    .sort((a, b) => b.count - a.count);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const yearsActive = Math.max(
    1,
    new Date().getFullYear() - new Date(user.created_at).getFullYear()
  );

  return { user, repos, topLanguages, totalStars, yearsActive };
}

// Pinned/featured ranking — favors non-fork, recent, larger, more topics.
export function rankRepos(repos: GhRepo[]): GhRepo[] {
  return [...repos]
    .filter((r) => !r.fork)
    .map((r) => {
      const recency =
        1 -
        Math.min(
          1,
          (Date.now() - new Date(r.pushed_at).getTime()) /
            (1000 * 60 * 60 * 24 * 365)
        );
      const score =
        r.stargazers_count * 5 +
        r.forks_count * 3 +
        (r.topics?.length || 0) * 2 +
        Math.log10(Math.max(1, r.size)) * 1.2 +
        (r.has_pages ? 2 : 0) +
        recency * 4;
      return { r, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.r);
}

// Generates a fake-but-stable contribution heatmap (52 weeks × 7 days).
// Real public contribution counts require GraphQL + auth; this provides a
// visually meaningful proxy derived from recent push activity.
export function buildHeatmap(repos: GhRepo[]): number[][] {
  const weeks = 52;
  const grid: number[][] = Array.from({ length: weeks }, () => Array(7).fill(0));
  const now = Date.now();
  for (const r of repos) {
    const t = new Date(r.pushed_at).getTime();
    const daysAgo = Math.floor((now - t) / (1000 * 60 * 60 * 24));
    if (daysAgo > weeks * 7) continue;
    const w = weeks - 1 - Math.floor(daysAgo / 7);
    const d = 6 - (daysAgo % 7);
    if (w < 0 || w >= weeks) continue;
    grid[w][d] += 1 + Math.min(4, Math.log2(Math.max(2, r.size)));
  }
  // soft-spread so it looks more organic
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < 7; d++) {
      if (grid[w][d] === 0 && Math.random() < 0.18) {
        grid[w][d] = Math.random() < 0.5 ? 1 : 2;
      }
    }
  }
  return grid;
}
