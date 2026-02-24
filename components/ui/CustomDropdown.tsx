import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  icon,
  className = "",
  variant = "outline",
}) => {
  const variants = {
    primary: "bg-brand-500 hover:bg-brand-400 text-black border-brand-400",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm shadow-lg",
    outline: "bg-transparent border-white/10 text-white hover:border-white/20",
  };

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        className={cn(
          "w-full h-auto py-3 px-4 font-display text-[0.875rem] tracking-wider rounded-lg transition-all",
          variants[variant],
          className,
        )}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-neutral-500">{icon}</span>}
          <SelectValue placeholder={placeholder} />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="focus:bg-brand-500 focus:text-black py-2.5 font-display text-[0.875rem] tracking-wider"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
