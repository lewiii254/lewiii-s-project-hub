import { motion } from 'framer-motion';
import { FolderKanban, CheckCircle2, Clock, Star, RefreshCw, Github } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { mockProjects, calculateStats } from '@/data/mockProjects';

export default function Dashboard() {
  const stats = calculateStats(mockProjects);
  const recentProjects = [...mockProjects]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 4);
  const featuredProjects = mockProjects.filter(p => p.featured).slice(0, 2);

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                Welcome back, <span className="gradient-text">Lewis</span> 👋
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your project portfolio
              </p>
            </div>
            <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2 self-start">
              <RefreshCw className="w-4 h-4" />
              Sync from GitHub
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Projects"
            value={stats.total}
            icon={FolderKanban}
            color="primary"
            delay={0}
          />
          <StatCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle2}
            color="completed"
            delay={0.1}
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={Clock}
            color="progress"
            delay={0.2}
          />
          <StatCard
            title="Featured"
            value={stats.featured}
            icon={Star}
            color="accent"
            delay={0.3}
          />
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Star className="w-5 h-5 text-status-progress" />
                Featured Projects
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Projects */}
        <section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <a href="/projects">View all →</a>
            </Button>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
            {recentProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index + 2} />
            ))}
          </div>
        </section>

        {/* GitHub Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Github className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="font-medium text-foreground">Connected to GitHub</p>
              <p className="text-sm text-muted-foreground">@lewiii254 • Last synced 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Repos</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-foreground">342</p>
              <p className="text-xs text-muted-foreground">Stars</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center px-4">
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-xs text-muted-foreground">Forks</p>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
