import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'primary' | 'completed' | 'progress' | 'accent';
  delay?: number;
}

const colorClasses = {
  primary: 'text-primary bg-primary/10',
  completed: 'text-status-completed bg-status-completed/10',
  progress: 'text-status-progress bg-status-progress/10',
  accent: 'text-accent bg-accent/10',
};

export function StatCard({ title, value, icon: Icon, color, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="stat-card group hover:border-primary/30 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm text-muted-foreground">{title}</span>
        <div className={cn('w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center', colorClasses[color])}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.1, type: 'spring' }}
        className="text-2xl sm:text-3xl font-bold text-foreground"
      >
        {value}
      </motion.div>
    </motion.div>
  );
}
