import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/"), 8000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-portfolio-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-portfolio-blue opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-portfolio-purple opacity-10 rounded-full blur-3xl"></div>
      
      <motion.div 
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img 
            src="/niche_bright-removebg-preview.png" 
            alt="Roy - Niche Logo" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain animate-pulse"
          />
        </motion.div>
        
        <motion.h1 
          className="text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-portfolio-blue to-portfolio-purple bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          404
        </motion.h1>
        
        <motion.p 
          className="text-2xl md:text-3xl text-portfolio-light mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Oops! Page Not Found
        </motion.p>
        
        <motion.p 
          className="text-portfolio-light/70 mb-8 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          The page you're looking for doesn't exist. You'll be redirected home in a moment.
        </motion.p>
        
        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button 
            onClick={() => navigate("/")} 
            className="btn-gradient gap-2"
          >
            <Home size={18} />
            Go Home
          </Button>
          
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline"
            className="bg-transparent border border-portfolio-blue text-portfolio-blue hover:bg-portfolio-blue/10 gap-2"
          >
            <ArrowLeft size={18} />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
