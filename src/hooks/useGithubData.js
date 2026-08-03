import { useEffect, useState } from "react";

const CACHE_KEY = (username) => `gh-cache:${username}`;
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour, GitHub's unauthenticated rate limit is tight

/**
 * Fetches a user's public, non-fork repos plus basic profile stats
 * from the GitHub REST API (no auth required for public data).
 * Falls back to a short-lived localStorage cache so repeat visits
 * within an hour don't burn API rate limit.
 */
const useGithubData = (username) => {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | success | error

  useEffect(() => {
    let cancelled = false;

    const cached = window.localStorage.getItem(CACHE_KEY(username));
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
          setRepos(parsed.repos);
          setProfile(parsed.profile);
          setStatus("success");
          return () => {
            cancelled = true;
          };
        }
      } catch {
        // ignore corrupt cache
      }
    }

    const load = async () => {
      try {
        const [reposRes, profileRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`),
          fetch(`https://api.github.com/users/${username}`),
        ]);

        if (!reposRes.ok || !profileRes.ok) throw new Error("GitHub API request failed");

        const reposJson = await reposRes.json();
        const profileJson = await profileRes.json();

        const cleaned = reposJson
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            url: r.html_url,
            homepage: r.homepage,
            language: r.language,
            stars: r.stargazers_count,
            updatedAt: r.updated_at,
            topics: r.topics || [],
          }));

        const profileData = {
          publicRepos: profileJson.public_repos,
          followers: profileJson.followers,
          avatarUrl: profileJson.avatar_url,
          bio: profileJson.bio,
        };

        if (!cancelled) {
          setRepos(cleaned);
          setProfile(profileData);
          setStatus("success");
          window.localStorage.setItem(
            CACHE_KEY(username),
            JSON.stringify({ repos: cleaned, profile: profileData, timestamp: Date.now() })
          );
        }
      } catch (err) {
        if (!cancelled) setStatus("error");
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return { repos, profile, status };
};

export default useGithubData;
