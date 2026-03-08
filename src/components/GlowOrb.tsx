import { motion } from 'framer-motion';

interface GlowOrbProps {
  color: string;
  size?: string;
  className?: string;
  duration?: number;
  delay?: number;
}

const GlowOrb = ({ 
  color, 
  size = '200px', 
  className = '', 
  duration = 8, 
  delay = 0 
}: GlowOrbProps) => {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(60px)',
        opacity: 0.12,
      }}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 15, -10, 0],
        y: [0, -10, 12, 0],
        opacity: [0.08, 0.14, 0.08],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

export default GlowOrb;
