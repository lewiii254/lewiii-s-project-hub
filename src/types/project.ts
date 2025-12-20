export type ProjectStatus = 'idea' | 'in-progress' | 'completed';
export type ProjectCategory = 'practice' | 'school' | 'startup' | 'opensource';

export interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url?: string;
  status: ProjectStatus;
  category: ProjectCategory;
  featured: boolean;
  created_at: string;
  updated_at: string;
  stars?: number;
  forks?: number;
  language?: string;
}

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

export interface DashboardStats {
  total: number;
  completed: number;
  inProgress: number;
  featured: number;
}
