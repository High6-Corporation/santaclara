'use client';

import { ReactNode, useRef } from 'react';
import { motion } from 'motion/react';
import { useOnScreen } from '@/app/hooks/useOnScreen';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  bgColor?: string;
  bgImage?: string;
  style?: React.CSSProperties;
  animationType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight';
  delay?: number;
  duration?: number;
}

/**
 * Section Component - WordPress-style full-width section
 * 
 * Purpose: Full-width container for background colors/images and visual separation
 * - Always spans 100% viewport width
 * - Used only for backgrounds and visual containers
 * - Does not control content width (use Row for that)
 */
export function Section({ 
  children, 
  className = '', 
  id,
  bgColor,
  bgImage,
  style: customStyle,
  animationType = 'fade',
  delay = 0,
  duration = 0.5
}: SectionProps) {
  const style: React.CSSProperties = {
    ...(bgImage && { 
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }),
    ...customStyle // Merge custom styles last so they override
  };

  // Build className with bgColor as Tailwind class (if provided)
  const finalClassName = `${bgColor ? bgColor : ''} ${className}`.trim();

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
    <motion.section 
      ref={ref}
      id={id}
      className={`w-full ${finalClassName}`}
      style={style}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: duration, delay: delay }}
    >
      {children}
    </motion.section>
  );
}
