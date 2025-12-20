import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, Code2, Mail, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useFeaturedProjects } from '@/hooks/useProjects';

const statusLabels = {
  'idea': 'Idea',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

export default function Portfolio() {
  const { data: featuredProjects = [], isLoading } = useFeaturedProjects();

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Code2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">lewiii254</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
              <a href="https://github.com/lewiii254" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="sm:hidden h-9 w-9">
              <a href="https://github.com/lewiii254" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </a>
            </Button>
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-primary-foreground h-9" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 py-12 sm:py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-primary mx-auto mb-6 flex items-center justify-center text-3xl sm:text-4xl font-bold text-primary-foreground">
              L
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground mb-4">
              Hi, I'm <span className="gradient-text">Lewis</span>
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 px-4">
              Software Engineer building modern web applications with React, Next.js, Flutter, and AI.
              Passionate about clean code and beautiful user experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground w-full sm:w-auto min-h-[44px]" asChild>
                <a href="https://github.com/lewiii254" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  View GitHub
                </a>
              </Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-[44px]" asChild>
                <a href="mailto:lewis@example.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Me
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-8 sm:py-12 border-y border-border/50 bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-foreground">{isLoading ? '0' : featuredProjects.length}</p>
              <p className="text-sm sm:text-base text-muted-foreground">Projects</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-foreground">342</p>
              <p className="text-sm sm:text-base text-muted-foreground">GitHub Stars</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-foreground">5+</p>
              <p className="text-sm sm:text-base text-muted-foreground">Years Experience</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-foreground">10+</p>
              <p className="text-sm sm:text-base text-muted-foreground">Tech Stacks</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative z-10 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-8 sm:mb-10"
          >
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Featured Projects
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">A selection of my best work</p>
            </div>
          </motion.div>

          {isLoading ? (
            <div className="flex items-center justify-center min-h-[200px]">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="glass-card p-8 sm:p-12 text-center">
              <p className="text-sm sm:text-base text-muted-foreground">No featured projects yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass-card-hover p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base sm:text-lg font-semibold text-foreground">{project.title}</h3>
                        <Star className="w-4 h-4 text-status-progress fill-status-progress" />
                      </div>
                      <span className={`status-badge status-${project.status === 'in-progress' ? 'progress' : project.status}`}>
                        {statusLabels[project.status]}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech_stack.slice(0, 5).map((tech) => (
                      <span key={tech} className="tech-badge text-xs">{tech}</span>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 border-t border-border/50">
                    {project.live_url && (
                      <Button size="sm" className="bg-gradient-primary hover:opacity-90 text-primary-foreground min-h-[44px] sm:min-h-0" asChild>
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1.5" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.github_url && (
                      <Button size="sm" variant="secondary" className="min-h-[44px] sm:min-h-0" asChild>
                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1.5" />
                          View Code
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card p-6 sm:p-8 lg:p-12 text-center"
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Interested in working together?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto mb-6 px-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground w-full sm:w-auto min-h-[44px]" asChild>
              <a href="mailto:lewis@example.com">
                Get In Touch
                <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2024 Lewis. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
