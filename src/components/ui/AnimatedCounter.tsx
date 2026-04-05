import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export function AnimatedCounter({ value, prefix = "" }: { value: number, prefix?: string }) {
  const springValue = useSpring(0, { bounce: 0, duration: 1500 });
  
  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const displayValue = useTransform(springValue, (current) => {
    return prefix + Math.round(current).toLocaleString();
  });

  return (
    <motion.span>
      {displayValue}
    </motion.span>
  );
}
