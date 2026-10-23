/*
  Private projects feed (Vercel serverless function, no dependencies).
  GET /api/projects -> { repos: [...] }

  Lists ONLY private repos the owner opted in by adding the GitHub topic `show-on-portfolio`.
  Returns metadata only (name, description, live link, language, topics, dates) — never code,
  never the repo URL. Confidential repos stay hidden simply by not having the topic.

  Setup: create a fine-grained GitHub token with read-only "Metadata" permission
  (Repository access: All repositories) and save it in Vercel as GITHUB_PORTFOLIO_TOKEN.
  Without it this returns an empty list, so the site just shows public repos.
  Responses are cached at Vercel's edge for 30 minutes to stay far below GitHub rate limits.
*/
const OPT_IN_TOPIC = 'show-on-portfolio';
const TOKEN = process.env.GITHUB_PORTFOLIO_TOKEN;

const httpUrl = (value) => {
  try {
    const url = new URL(String(value || '').trim());
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '';
  } catch {
    return '';
  }
};

module.exports = async (req, res) => {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  if (!TOKEN) {
    res.setHeader('Cache-Control', 'public, s-maxage=300');
    return res.status(200).json({ repos: [], configured: false });
  }

  try {
    const response = await fetch('https://api.github.com/user/repos?visibility=private&affiliation=owner&per_page=100&sort=pushed', {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${TOKEN}`,
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'nitish-portfolio',
      },
    });
    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
    const repos = (await response.json())
      .filter((repo) => repo && repo.private && !repo.archived && !repo.disabled && (repo.topics || []).includes(OPT_IN_TOPIC))
      .map((repo) => ({
        name: repo.name,
        description: repo.description || '',
        homepage: httpUrl(repo.homepage),
        language: repo.language || '',
        topics: (repo.topics || []).filter((topic) => topic !== OPT_IN_TOPIC),
        pushed_at: repo.pushed_at,
        updated_at: repo.updated_at,
        private: true,
        html_url: null,
        full_name: null,
      }));
    res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=86400');
    return res.status(200).json({ repos, configured: true });
  } catch {
    res.setHeader('Cache-Control', 'public, s-maxage=60');
    return res.status(200).json({ repos: [], configured: true, error: 'GitHub is temporarily unavailable.' });
  }
};
