import { motion } from 'framer-motion';
import { Star, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { useProjects } from '@/hooks/useProjects';

export default function Featured() {
  const { data: projects = [], isLoading } = useProjects();
  const featuredProjects = projects.filter((p) => p.featured);

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
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <Star className="w-6 h-6 text-status-progress fill-status-progress" />
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Featured Projects</h1>
          </div>
          <p className="text-muted-foreground">
            Your highlighted projects that appear on your public portfolio
          </p>
        </motion.div>

        {featuredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-foreground mb-2">No featured projects yet</p>
            <p className="text-muted-foreground">
              Mark projects as featured to showcase them on your public portfolio
            </p>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
