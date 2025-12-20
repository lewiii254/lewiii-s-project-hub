import { motion } from 'framer-motion';
import { Settings as SettingsIcon, User, Github, Bell, Shield, Palette } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <SettingsIcon className="w-6 h-6 text-muted-foreground" />
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Profile</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-2xl font-bold text-primary-foreground">
                  L
                </div>
                <Button variant="secondary" size="sm">
                  Change Avatar
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input
                    id="name"
                    defaultValue="Lewis"
                    className="input-search"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="lewis@example.com"
                    className="input-search"
                  />
                </div>
              </div>
            </div>
          </motion.section>

          {/* GitHub Integration */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Github className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">GitHub Integration</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Connected as @lewiii254</p>
                <p className="text-sm text-muted-foreground">
                  Repositories are synced automatically
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Disconnect
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Auto-sync new repositories</p>
                <p className="text-sm text-muted-foreground">
                  Automatically import new public repos
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Email notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about your projects
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">GitHub activity alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when repos get stars or forks
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.section>

          {/* Privacy */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Privacy</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Public portfolio</p>
                  <p className="text-sm text-muted-foreground">
                    Allow others to view your featured projects
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">Show GitHub stats</p>
                  <p className="text-sm text-muted-foreground">
                    Display stars and forks on public portfolio
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </motion.section>

          {/* Appearance */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Appearance</h2>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Currently using dark mode
                </p>
              </div>
              <Button variant="secondary" size="sm">
                Dark
              </Button>
            </div>
          </motion.section>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground">
              Save Changes
            </Button>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
