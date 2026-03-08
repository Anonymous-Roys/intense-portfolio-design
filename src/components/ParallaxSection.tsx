import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // -1 to 1, negative = slower, positive = faster
  fadeIn?: boolean;
  scale?: boolean;
}

const ParallaxSection = ({ 
  children, 
  className = '', 
  speed = 0.2, 
  fadeIn = true,
  scale = false 
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          y,
          ...(fadeIn ? { opacity } : {}),
          ...(scale ? { scale: scaleValue } : {}),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
