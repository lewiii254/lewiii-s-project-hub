import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, CheckCircle2, Clock, Star, RefreshCw, Github, Loader2, Lightbulb } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProjects';
import { useAuth } from '@/hooks/useAuth';
import { syncGitHubRepos } from '@/lib/github';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const { data: projects = [], isLoading } = useProjects();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    featured: projects.filter(p => p.featured).length,
    ideas: projects.filter(p => p.status === 'idea').length,
  };

  const recentProjects = [...projects]
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, 4);

  const featuredProjects = projects.filter(p => p.featured).slice(0, 2);
  const totalStars = projects.reduce((sum, p) => sum + (p.stars || 0), 0);
  const totalForks = projects.reduce((sum, p) => sum + (p.forks || 0), 0);

  const handleSync = async () => {
    if (!user) return;
    
    setIsSyncing(true);
    try {
      const count = await syncGitHubRepos('lewiii254', user.id);
      toast({
        title: 'Sync complete!',
        description: `Imported/updated ${count} repositories from GitHub.`,
      });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    } catch (error) {
      toast({
        title: 'Sync failed',
        description: error instanceof Error ? error.message : 'Failed to sync with GitHub',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-1">
                Welcome back, <span className="gradient-text">{user?.user_metadata?.display_name || 'Developer'}</span> 👋
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Here's an overview of your project portfolio
              </p>
            </div>
            <Button 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground gap-2 self-start w-full sm:w-auto min-h-[44px] sm:min-h-0"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              {isSyncing ? 'Syncing...' : 'Sync from GitHub'}
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
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

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 sm:p-12 text-center mb-6 sm:mb-8"
          >
            <FolderKanban className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-2">No projects yet</h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6">
              Click "Sync from GitHub" to import your repositories, or add a project manually.
            </p>
            <Button 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground w-full sm:w-auto min-h-[44px] sm:min-h-0"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Github className="w-4 h-4 mr-2" />
              )}
              Import from GitHub
            </Button>
          </motion.div>
        )}

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-6 sm:mb-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="text-base sm:text-lg font-semibold text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-status-progress" />
                Featured Projects
              </h2>
            </motion.div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Projects */}
        {recentProjects.length > 0 && (
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-between mb-4"
            >
              <h2 className="text-base sm:text-lg font-semibold text-foreground">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground text-xs sm:text-sm" asChild>
                <a href="/projects">View all →</a>
              </Button>
            </motion.div>
            <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
              {recentProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + 2} />
              ))}
            </div>
          </section>
        )}

        {/* GitHub Stats Banner */}
        {projects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 sm:mt-8 glass-card p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted flex items-center justify-center">
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </div>
              <div>
                <p className="text-sm sm:text-base font-medium text-foreground">GitHub Stats</p>
                <p className="text-xs sm:text-sm text-muted-foreground">@lewiii254</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-around sm:justify-end">
              <div className="text-center px-3 sm:px-4">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Repos</p>
              </div>
              <div className="w-px h-6 sm:h-8 bg-border" />
              <div className="text-center px-3 sm:px-4">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{totalStars}</p>
                <p className="text-xs text-muted-foreground">Stars</p>
              </div>
              <div className="w-px h-6 sm:h-8 bg-border" />
              <div className="text-center px-3 sm:px-4">
                <p className="text-xl sm:text-2xl font-bold text-foreground">{totalForks}</p>
                <p className="text-xs text-muted-foreground">Forks</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
