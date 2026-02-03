import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  // Base styles: Focus states, transitions, font
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 rounded-lg active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    // Primary: Brand Color, High Emphasis, Glow
    primary: "bg-brand-500 hover:bg-brand-400 text-black border border-brand-400 shadow-[0_0_20px_rgba(213,243,101,0.2)] hover:shadow-[0_0_30px_rgba(213,243,101,0.4)]",
    
    // Secondary: Glass/White Outline, Medium Emphasis
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm shadow-lg",
    
    // Tertiary: Ghost/Link, Low Emphasis
    tertiary: "bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white border border-transparent",
    
    // Keeping outline mapped to Secondary style for consistency or specific need
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
    
    // Danger: Critical actions
    danger: "bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-lg shadow-red-900/20"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};