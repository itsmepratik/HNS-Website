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
  // Base styles: Layout, Focus, Transition, Active Scale
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 ease-out rounded-lg active:scale-[0.96] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed whitespace-nowrap group";
  
  const variants = {
    // Primary: Brand Color, High Emphasis, Glow + Lift on Hover
    primary: "bg-brand-500 hover:bg-brand-400 text-black border border-brand-400 shadow-[0_0_20px_rgba(213,243,101,0.2)] hover:shadow-[0_0_35px_rgba(213,243,101,0.5)] hover:-translate-y-0.5",
    
    // Secondary: Glass/White Outline, Medium Emphasis + Lift on Hover
    secondary: "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:shadow-white/10 hover:-translate-y-0.5",
    
    // Tertiary: Ghost/Link, Low Emphasis, subtle background change
    tertiary: "bg-transparent hover:bg-white/5 text-neutral-400 hover:text-white border border-transparent hover:border-white/10",
    
    // Outline: Transparent with border, glows on hover
    outline: "bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-brand-500/50 hover:text-brand-500 hover:shadow-[0_0_15px_rgba(213,243,101,0.1)]",
    
    // Danger: Critical actions, Red glow + Lift
    danger: "bg-red-600 hover:bg-red-500 text-white border border-red-500 shadow-lg shadow-red-900/20 hover:shadow-red-500/40 hover:-translate-y-0.5"
  };

  // Responsive sizing
  const sizes = {
    sm: "px-3 py-1.5 text-xs md:px-4 md:py-2",
    md: "px-4 py-2 text-sm md:px-6 md:py-3",
    lg: "px-5 py-3 text-sm md:px-8 md:py-4 md:text-base",
    xl: "px-6 py-3.5 text-base md:px-10 md:py-5 md:text-lg"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      {...props}
    >
      {/* Optional: Add a subtle shine effect overlay on hover for primary/danger buttons */}
      {(variant === 'primary' || variant === 'danger') && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />
      )}
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
    </button>
  );
};