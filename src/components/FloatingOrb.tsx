import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingOrbProps {
  color: string;
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  speed?: number;
}

const FloatingOrb = ({ color, size, top, left, right, bottom, speed = 0.4 }: FloatingOrbProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * 150, speed * -150]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, speed * 30, 0]);

  return null;
};

export default FloatingOrb;
