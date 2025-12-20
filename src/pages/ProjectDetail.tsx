import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Star, 
  GitFork, 
  Calendar, 
  Edit2, 
  Trash2, 
  Loader2,
  Save,
  X,
  Plus
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useProject, useUpdateProject, useDeleteProject, useToggleFeatured } from '@/hooks/useProjects';
import { cn } from '@/lib/utils';

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

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading } = useProject(id || '');
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const toggleFeatured = useToggleFeatured();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    github_url: '',
    live_url: '',
    status: 'idea' as 'idea' | 'in-progress' | 'completed',
    category: 'practice' as 'practice' | 'school' | 'startup' | 'opensource',
    tech_stack: [] as string[],
  });
  const [techInput, setTechInput] = useState('');

  const handleEdit = () => {
    if (project) {
      setEditForm({
        title: project.title,
        description: project.description || '',
        github_url: project.github_url || '',
        live_url: project.live_url || '',
        status: project.status,
        category: project.category,
        tech_stack: project.tech_stack || [],
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!id) return;
    await updateProject.mutateAsync({ id, ...editForm });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!id) return;
    await deleteProject.mutateAsync(id);
    navigate('/projects');
  };

  const handleToggleFeatured = async () => {
    if (!project) return;
    await toggleFeatured.mutateAsync({ id: project.id, featured: !project.featured });
  };

  const handleAddTech = () => {
    if (techInput.trim() && !editForm.tech_stack.includes(techInput.trim())) {
      setEditForm({
        ...editForm,
        tech_stack: [...editForm.tech_stack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setEditForm({
      ...editForm,
      tech_stack: editForm.tech_stack.filter((t) => t !== tech),
    });
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

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="glass-card p-12 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">Project not found</h2>
            <p className="text-muted-foreground mb-4">
              This project doesn't exist or you don't have access to it.
            </p>
            <Button asChild>
              <Link to="/projects">← Back to Projects</Link>
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Project Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              {isEditing ? (
                <Input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="text-2xl font-bold input-search mb-2"
                />
              ) : (
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                  {project.title}
                  {project.featured && (
                    <Star className="w-6 h-6 text-status-progress fill-status-progress" />
                  )}
                </h1>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                {isEditing ? (
                  <>
                    <Select
                      value={editForm.status}
                      onValueChange={(v) => setEditForm({ ...editForm, status: v as typeof editForm.status })}
                    >
                      <SelectTrigger className="w-[140px] bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select
                      value={editForm.category}
                      onValueChange={(v) => setEditForm({ ...editForm, category: v as typeof editForm.category })}
                    >
                      <SelectTrigger className="w-[140px] bg-muted/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="practice">Practice</SelectItem>
                        <SelectItem value="school">School</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="opensource">Open Source</SelectItem>
                      </SelectContent>
                    </Select>
                  </>
                ) : (
                  <>
                    <span className={cn('status-badge', `status-${project.status === 'in-progress' ? 'progress' : project.status}`)}>
                      {statusLabels[project.status]}
                    </span>
                    <span className={cn('status-badge', `category-${project.category}`)}>
                      {categoryLabels[project.category]}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditing(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={updateProject.isPending}
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                  >
                    {updateProject.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-1" />
                    )}
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleEdit}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{project.title}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDelete}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          {isEditing ? (
            <Textarea
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="input-search min-h-[100px] mb-4"
              placeholder="Project description..."
            />
          ) : (
            <p className="text-muted-foreground mb-4">
              {project.description || 'No description provided.'}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4 flex-wrap">
            {project.stars !== null && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{project.stars} stars</span>
              </div>
            )}
            {project.forks !== null && (
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{project.forks} forks</span>
              </div>
            )}
            {project.language && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary" />
                <span>{project.language}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-wrap">
            {project.live_url && (
              <Button
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                asChild
              >
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button variant="secondary" asChild>
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            )}
            <Button
              variant={project.featured ? 'secondary' : 'outline'}
              onClick={handleToggleFeatured}
              disabled={toggleFeatured.isPending}
            >
              <Star className={cn('w-4 h-4 mr-2', project.featured && 'fill-current')} />
              {project.featured ? 'Remove from Featured' : 'Add to Featured'}
            </Button>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <h2 className="text-lg font-semibold text-foreground mb-4">Tech Stack</h2>
          
          {isEditing && (
            <div className="flex gap-2 mb-4">
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add technology..."
                className="input-search"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
              />
              <Button type="button" variant="secondary" onClick={handleAddTech}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {(isEditing ? editForm.tech_stack : project.tech_stack)?.map((tech) => (
              <span
                key={tech}
                className={cn(
                  'tech-badge',
                  isEditing && 'cursor-pointer hover:bg-destructive/20 hover:text-destructive'
                )}
                onClick={() => isEditing && handleRemoveTech(tech)}
              >
                {tech}
                {isEditing && ' ×'}
              </span>
            ))}
            {(!project.tech_stack || project.tech_stack.length === 0) && !isEditing && (
              <p className="text-muted-foreground text-sm">No technologies specified.</p>
            )}
          </div>
        </motion.div>

        {/* URLs (Edit Mode) */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-semibold text-foreground mb-4">Links</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  value={editForm.github_url}
                  onChange={(e) => setEditForm({ ...editForm, github_url: e.target.value })}
                  placeholder="https://github.com/..."
                  className="input-search"
                />
              </div>
              <div className="space-y-2">
                <Label>Live Demo URL</Label>
                <Input
                  value={editForm.live_url}
                  onChange={(e) => setEditForm({ ...editForm, live_url: e.target.value })}
                  placeholder="https://your-demo.vercel.app"
                  className="input-search"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
