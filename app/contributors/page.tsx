import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnimatedCounter } from '@/components/animated-counter';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, GitMerge, Trophy, Users } from 'lucide-react';

interface Contributor {
  login: string;
  avatarUrl: string;
  mergedPrs: number;
  totalPoints: number;
  highestTier: string | null;
}

interface PullRequest {
  number: number;
  user: {
    login: string;
    avatar_url: string;
  } | null;
  merged_at: string | null;
  body: string | null;
  title: string;
}

interface Label {
  name: string;
}

const POINTS_MAP: Record<string, number> = {
  NEWBIE: 10,
  ADVENTURER: 25,
  VETERAN: 50,
};

const TIER_ORDER = ['NEWBIE', 'ADVENTURER', 'VETERAN'] as const;

const GITHUB_API = 'https://api.github.com';
const REPO = 'akshay0611/havenly';

function getAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchMergedPRs(): Promise<PullRequest[]> {
  const url = `${GITHUB_API}/repos/${REPO}/pulls?state=closed&base=main&per_page=100`;
  const res = await fetch(url, {
    headers: getAuthHeaders(),
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const prs: PullRequest[] = await res.json();
  return prs.filter(
    (pr) =>
      pr.merged_at &&
      pr.user &&
      !pr.user.login.endsWith('[bot]') &&
      pr.user.login !== 'akshay0611'
  );
}

async function fetchIssueLabels(issueNumber: number): Promise<string[]> {
  try {
    const url = `${GITHUB_API}/repos/${REPO}/issues/${issueNumber}/labels`;
    const res = await fetch(url, {
      headers: getAuthHeaders(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const labels: Label[] = await res.json();
    return labels.map((l) => l.name);
  } catch {
    return [];
  }
}

function extractIssueNumber(body: string | null, title: string): number | null {
  const regex = /(?:close|fix|resolve|closes|fixes|resolves)\s*#(\d+)/i;
  const text = body || title;
  const match = text.match(regex);
  return match ? parseInt(match[1], 10) : null;
}

function getTier(labels: string[]): string | null {
  for (const tier of TIER_ORDER) {
    if (labels.includes(tier)) return tier;
  }
  return null;
}

async function getContributors(): Promise<Contributor[]> {
  try {
    const prs = await fetchMergedPRs();
    if (prs.length === 0) return [];

    const labelResults = await Promise.all(
      prs.map(async (pr) => {
        const issueNumber = extractIssueNumber(pr.body, pr.title);
        if (!issueNumber) return { pr, tier: null };
        const labels = await fetchIssueLabels(issueNumber);
        return { pr, tier: getTier(labels) };
      })
    );

    const contributorMap = new Map<string, Contributor>();

    for (const { pr, tier } of labelResults) {
      const login = pr.user!.login;
      const avatarUrl = pr.user!.avatar_url;

      if (!contributorMap.has(login)) {
        contributorMap.set(login, {
          login,
          avatarUrl,
          mergedPrs: 0,
          totalPoints: 0,
          highestTier: null,
        });
      }

      const contributor = contributorMap.get(login)!;
      contributor.mergedPrs += 1;

      if (tier) {
        contributor.totalPoints += POINTS_MAP[tier];
        if (
          !contributor.highestTier ||
          TIER_ORDER.indexOf(tier as (typeof TIER_ORDER)[number]) >
            TIER_ORDER.indexOf(
              contributor.highestTier as (typeof TIER_ORDER)[number]
            )
        ) {
          contributor.highestTier = tier;
        }
      }
    }

    return Array.from(contributorMap.values()).sort(
      (a, b) => b.totalPoints - a.totalPoints || b.mergedPrs - a.mergedPrs
    );
  } catch {
    return [];
  }
}

export default async function ContributorsPage() {
  const contributors = await getContributors();

  const totalContributors = contributors.length;
  const totalMergedPRs = contributors.reduce((s, c) => s + c.mergedPrs, 0);
  const totalPoints = contributors.reduce((s, c) => s + c.totalPoints, 0);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16 md:py-24 bg-muted relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            {totalContributors} Contributor{totalContributors !== 1 ? 's' : ''}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Contributors
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The people building Havenly
          </p>
        </div>
      </section>

      <section className="pb-12 -mt-8 relative z-10">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            <div className="rounded-xl border border-border bg-background p-6 text-center shadow-sm">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                <AnimatedCounter value={totalContributors} />
              </div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 text-center shadow-sm">
              <GitMerge className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                <AnimatedCounter value={totalMergedPRs} />
              </div>
              <div className="text-sm text-muted-foreground">PRs Merged</div>
            </div>
            <div className="rounded-xl border border-border bg-background p-6 text-center shadow-sm">
              <Trophy className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                <AnimatedCounter value={totalPoints} />
              </div>
              <div className="text-sm text-muted-foreground">Points Awarded</div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {contributors.length === 0 ? (
            <div className="text-center py-24">
              <Users className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                No contributors yet
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Be the first to contribute at{' '}
                <a
                  href="https://github.com/akshay0611/havenly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  github.com/akshay0611/havenly
                </a>
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {contributors.map((contributor, index) => {
                const rank = index + 1;
                const medal =
                  rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : null;

                return (
                  <Link
                    key={contributor.login}
                    href={`https://github.com/${contributor.login}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group rounded-xl border border-border bg-background p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-20 h-20 mx-auto mb-4">
                        <div className="w-full h-full rounded-full overflow-hidden bg-muted ring-2 ring-border">
                          <Image
                            src={contributor.avatarUrl}
                            alt={`${contributor.login}'s avatar`}
                            fill
                            className="object-cover rounded-full"
                            sizes="80px"
                          />
                        </div>
                        {medal && (
                          <span className="absolute -top-1 -right-1 text-lg leading-none select-none z-10">
                            {medal}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                          {contributor.login}
                        </span>
                        <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </div>

                      <div className="mb-3">
                        {contributor.highestTier === 'VETERAN' ? (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700 border border-amber-200">
                            VETERAN
                          </span>
                        ) : contributor.highestTier === 'ADVENTURER' ? (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                            ADVENTURER
                          </span>
                        ) : contributor.highestTier === 'NEWBIE' ? (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                            NEWBIE
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground border border-border">
                            Contributor
                          </span>
                        )}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {contributor.mergedPrs} PR
                        {contributor.mergedPrs !== 1 ? 's' : ''} merged
                      </div>

                      {contributor.totalPoints > 0 && (
                        <div className="text-sm font-medium text-foreground mt-0.5">
                          {contributor.totalPoints} pts
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-muted rounded-2xl p-10 md:p-16 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-3">
              Want to see your name here?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed">
              Havenly is open source under ELUSOC 2026. Pick an issue, submit a
              PR, and earn points.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/akshay0611/havenly/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                View open issues
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/akshay0611/havenly/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background text-foreground px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
              >
                Read contribution guide
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
