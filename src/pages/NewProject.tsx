import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowLeft, Plus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export default function NewProject() {
  const [isLoading, setIsLoading] = useState(false);
  const [techInput, setTechInput] = useState('');
  const [techStack, setTechStack] = useState<string[]>([]);
  const { toast } = useToast();

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast({
      title: 'Project created!',
      description: 'Your project has been added successfully.',
    });
    
    setIsLoading(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Add New Project</h1>
          <p className="text-muted-foreground">
            Import from GitHub or manually add a new project
          </p>
        </motion.div>

        {/* Import from GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 mb-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <Github className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">Import from GitHub</p>
                <p className="text-sm text-muted-foreground">
                  Automatically fetch repository details
                </p>
              </div>
            </div>
            <Button variant="secondary">
              Select Repository
            </Button>
          </div>
        </motion.div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">or add manually</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Manual Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass-card p-6 space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              placeholder="My Awesome Project"
              className="input-search"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your project..."
              className="input-search min-h-[100px]"
              required
            />
          </div>

          {/* URLs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL *</Label>
              <Input
                id="github_url"
                type="url"
                placeholder="https://github.com/..."
                className="input-search"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="live_url">Live Demo URL</Label>
              <Input
                id="live_url"
                type="url"
                placeholder="https://your-demo.vercel.app"
                className="input-search"
              />
            </div>
          </div>

          {/* Status & Category */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select defaultValue="in-progress">
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category *</Label>
              <Select defaultValue="practice">
                <SelectTrigger className="bg-muted/50 border-border/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="practice">Practice</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="opensource">Open Source</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <div className="flex gap-2">
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
            {techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="tech-badge cursor-pointer hover:bg-destructive/20 hover:text-destructive transition-colors"
                    onClick={() => handleRemoveTech(tech)}
                  >
                    {tech} ×
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="featured">Featured Project</Label>
              <p className="text-sm text-muted-foreground">
                Show this project on your public portfolio
              </p>
            </div>
            <Switch id="featured" />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Project
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </DashboardLayout>
  );
}
