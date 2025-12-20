import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Star,
  Settings,
  Github,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/projects/new', icon: PlusCircle, label: 'Add Project' },
  { to: '/featured', icon: Star, label: 'Featured' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-50 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">DevShowcase</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to || 
            (item.to === '/projects' && location.pathname.startsWith('/projects') && location.pathname !== '/projects/new');
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'sidebar-item relative group',
                isActive && 'sidebar-item-active'
              )}
            >
              <item.icon className={cn(
                'w-5 h-5 flex-shrink-0 transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
              )} />
              
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                      'text-sm transition-colors',
                      isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-border">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* GitHub Link */}
      <div className="p-3 border-t border-sidebar-border">
        <a
          href="https://github.com/lewiii254"
          target="_blank"
          rel="noopener noreferrer"
          className="sidebar-item group"
        >
          <Github className="w-5 h-5 flex-shrink-0 text-muted-foreground group-hover:text-foreground" />
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 flex-1"
              >
                <span className="text-sm text-muted-foreground group-hover:text-foreground">@lewiii254</span>
                <ExternalLink className="w-3 h-3 text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </a>
      </div>
    </motion.aside>
  );
}
