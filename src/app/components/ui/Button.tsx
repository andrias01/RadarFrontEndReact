import React from 'react';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#008b50] text-white hover:bg-[#006f3f] active:scale-95',
    secondary: 'bg-[#ffca00] text-[#1a202c] hover:bg-[#e6b600] active:scale-95',
    outline: 'border-2 border-[#008b50] text-[#008b50] dark:text-[#04b5ac] hover:bg-[#008b50] hover:text-white dark:hover:bg-[#04b5ac] dark:hover:text-[#0f1419] active:scale-95',
    ghost: 'text-foreground hover:bg-muted active:scale-95'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5',
    lg: 'px-7 py-3.5 text-lg'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
