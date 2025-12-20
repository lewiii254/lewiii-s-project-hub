import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6"
        >
          <Code2 className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        
        <h1 className="text-7xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This page doesn't exist.
        </p>
        
        <div className="flex items-center justify-center gap-4">
          <Button variant="secondary" asChild>
            <Link to="/portfolio">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Link>
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground" asChild>
            <Link to="/dashboard">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
