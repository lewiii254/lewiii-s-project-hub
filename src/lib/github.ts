import { supabase } from '@/integrations/supabase/client';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&sort=updated&type=public`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function fetchRepoLanguages(owner: string, repo: string): Promise<Record<string, number>> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    }
  );

  if (!response.ok) {
    return {};
  }

  return response.json();
}

export function inferTechStack(repo: GitHubRepo, languages: Record<string, number>): string[] {
  const techStack: string[] = [];
  
  // Add primary language
  if (repo.language) {
    techStack.push(repo.language);
  }

  // Add topics as tech
  if (repo.topics && repo.topics.length > 0) {
    const relevantTopics = repo.topics.filter(topic => 
      !['project', 'demo', 'learning', 'tutorial', 'practice'].includes(topic.toLowerCase())
    );
    techStack.push(...relevantTopics.slice(0, 3).map(t => 
      t.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ));
  }

  // Add from languages
  const languageNames = Object.keys(languages).slice(0, 3);
  languageNames.forEach(lang => {
    if (!techStack.includes(lang)) {
      techStack.push(lang);
    }
  });

  return [...new Set(techStack)].slice(0, 6);
}

export function inferCategory(repo: GitHubRepo): 'practice' | 'school' | 'startup' | 'opensource' {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const topics = repo.topics?.map(t => t.toLowerCase()) || [];

  // Check for school keywords
  if (
    name.includes('assignment') || 
    name.includes('homework') || 
    name.includes('course') ||
    name.includes('class') ||
    desc.includes('university') ||
    desc.includes('school') ||
    desc.includes('assignment') ||
    topics.includes('school') ||
    topics.includes('education')
  ) {
    return 'school';
  }

  // Check for startup keywords
  if (
    desc.includes('startup') ||
    desc.includes('saas') ||
    desc.includes('platform') ||
    desc.includes('production') ||
    topics.includes('startup') ||
    topics.includes('saas')
  ) {
    return 'startup';
  }

  // Check for open source indicators
  if (
    repo.stargazers_count > 10 ||
    repo.forks_count > 5 ||
    topics.includes('open-source') ||
    topics.includes('hacktoberfest')
  ) {
    return 'opensource';
  }

  return 'practice';
}

export function inferStatus(repo: GitHubRepo): 'idea' | 'in-progress' | 'completed' {
  const lastUpdate = new Date(repo.updated_at);
  const now = new Date();
  const daysSinceUpdate = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);

  // If updated in last 30 days, it's likely in progress
  if (daysSinceUpdate < 30) {
    return 'in-progress';
  }

  // If has homepage/demo, it's likely completed
  if (repo.homepage) {
    return 'completed';
  }

  // If has good stars/forks, likely completed
  if (repo.stargazers_count > 5 || repo.forks_count > 2) {
    return 'completed';
  }

  // If older than 90 days without updates, either completed or abandoned
  if (daysSinceUpdate > 90) {
    return 'completed';
  }

  return 'in-progress';
}

export async function syncGitHubRepos(username: string, userId: string) {
  const repos = await fetchGitHubRepos(username);
  
  const projects = await Promise.all(
    repos.map(async (repo) => {
      const languages = await fetchRepoLanguages(username, repo.name);
      const techStack = inferTechStack(repo, languages);
      
      return {
        user_id: userId,
        title: repo.name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        description: repo.description || `A ${repo.language || 'code'} project`,
        tech_stack: techStack,
        github_url: repo.html_url,
        live_url: repo.homepage || null,
        status: inferStatus(repo),
        category: inferCategory(repo),
        featured: repo.stargazers_count > 10,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        github_repo_id: repo.id,
      };
    })
  );

  // Upsert projects (update if github_repo_id exists, insert if not)
  for (const project of projects) {
    const { data: existing } = await supabase
      .from('projects')
      .select('id')
      .eq('github_repo_id', project.github_repo_id)
      .eq('user_id', userId)
      .maybeSingle();

    if (existing) {
      await supabase
        .from('projects')
        .update({
          stars: project.stars,
          forks: project.forks,
          language: project.language,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existing.id);
    } else {
      await supabase.from('projects').insert(project);
    }
  }

  return projects.length;
}
