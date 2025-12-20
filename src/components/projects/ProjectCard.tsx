import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, Github, Star, GitFork, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Project } from '@/hooks/useProjects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const statusLabels = {
  'idea': 'Idea',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

const categoryLabels = {
  'practice': 'Practice',
  'school': 'School',
  'startup': 'Startup',
  'opensource': 'Open Source',
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card-hover p-5 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link to={`/projects/${project.id}`} className="hover:text-primary transition-colors">
              <h3 className="font-semibold text-foreground truncate">{project.title}</h3>
            </Link>
            {project.featured && (
              <Star className="w-4 h-4 text-status-progress fill-status-progress flex-shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className={cn('status-badge', `status-${project.status === 'in-progress' ? 'progress' : project.status}`)}>
              {statusLabels[project.status]}
            </span>
            <span className={cn('status-badge', `category-${project.category}`)}>
              {categoryLabels[project.category]}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow">
        {project.description || 'No description'}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech_stack?.slice(0, 4).map((tech) => (
          <span key={tech} className="tech-badge">
            {tech}
          </span>
        ))}
        {project.tech_stack && project.tech_stack.length > 4 && (
          <span className="tech-badge">+{project.tech_stack.length - 4}</span>
        )}
      </div>

      {/* Stats */}
      {(project.stars !== null || project.forks !== null) && (
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          {project.stars !== null && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
          )}
          {project.forks !== null && (
            <div className="flex items-center gap-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
          )}
          {project.language && (
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary" />
              <span>{project.language}</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-border/50">
        {project.live_url && (
          <Button
            variant="default"
            size="sm"
            className="flex-1 bg-gradient-primary hover:opacity-90 text-primary-foreground"
            asChild
          >
            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-1.5" />
              Live Demo
            </a>
          </Button>
        )}
        {project.github_url && (
          <Button
            variant="secondary"
            size="sm"
            className={cn(!project.live_url && 'flex-1')}
            asChild
          >
            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-1.5" />
              GitHub
            </a>
          </Button>
        )}
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" asChild>
          <Link to={`/projects/${project.id}`}>
            <Edit2 className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
