'use client';

import { ReactNode, useRef } from 'react';
import { motion } from 'motion/react';
import { useOnScreen } from '@/app/hooks/useOnScreen';

interface RowProps {
  children: ReactNode;
  className?: string;
  maxWidth?: number;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
}

/**
 * Row Component - WordPress-style content wrapper
 * 
 * Purpose: Controls content width, alignment, and resolution
 * - Default max-width: 1316px
 * - Default width: 90% (provides 5% margin on each side)
 * - Always centered horizontally (mx-auto)
 * - Content never stretches beyond max-width on large screens
 * 
 * Usage:
 * <Section>
 *   <Row>
 *     Your content here
 *   </Row>
 * </Section>
 */
export function Row({ 
  children, 
  className = '',
  maxWidth = 1316,
  animationType = 'fade',
  delay = 0,
  duration = 0.5
}: RowProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(ref, '-100px');

  // Define animation variants
  const getAnimationVariants = () => {
    switch (animationType) {
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slideDown':
        return {
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 }
        };
      case 'slideLeft':
        return {
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slideRight':
        return {
          hidden: { opacity: 0, x: 50 },
          visible: { opacity: 1, x: 0 }
        };
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };

  const variants = getAnimationVariants();

  return (
    <motion.div 
      ref={ref}
      className={`w-[90%] mx-auto ${className}`}
      style={{ maxWidth: `${maxWidth}px` }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: duration, delay: delay }}
    >
      {children}
    </motion.div>
  );
}
