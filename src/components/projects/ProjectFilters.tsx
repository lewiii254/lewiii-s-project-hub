import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProjectStatus, ProjectCategory } from '@/types/project';

interface ProjectFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  statusFilter: ProjectStatus | 'all';
  onStatusChange: (value: ProjectStatus | 'all') => void;
  categoryFilter: ProjectCategory | 'all';
  onCategoryChange: (value: ProjectCategory | 'all') => void;
  sortBy: 'updated' | 'created' | 'name' | 'stars';
  onSortChange: (value: 'updated' | 'created' | 'name' | 'stars') => void;
}

export function ProjectFilters({
  search,
  onSearchChange,
  statusFilter,
  onStatusChange,
  categoryFilter,
  onCategoryChange,
  sortBy,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 input-search"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={(v) => onStatusChange(v as ProjectStatus | 'all')}>
          <SelectTrigger className="w-[140px] bg-muted/50 border-border/50">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="idea">Idea</SelectItem>
          </SelectContent>
        </Select>

        <Select value={categoryFilter} onValueChange={(v) => onCategoryChange(v as ProjectCategory | 'all')}>
          <SelectTrigger className="w-[150px] bg-muted/50 border-border/50">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="startup">Startup</SelectItem>
            <SelectItem value="school">School</SelectItem>
            <SelectItem value="practice">Practice</SelectItem>
            <SelectItem value="opensource">Open Source</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => onSortChange(v as typeof sortBy)}>
          <SelectTrigger className="w-[160px] bg-muted/50 border-border/50">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="created">Newest First</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="stars">Most Stars</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
