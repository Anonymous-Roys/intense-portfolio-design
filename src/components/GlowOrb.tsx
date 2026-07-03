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
  return null;
};

export default GlowOrb;
