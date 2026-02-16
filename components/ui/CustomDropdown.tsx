import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  icon,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useGSAP(() => {
    if (isOpen) {
      gsap.to(listRef.current, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        display: 'block'
      });
    } else {
      gsap.to(listRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
        display: 'none'
      });
    }
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-[#151515] border ${isOpen ? 'border-brand-500 ring-1 ring-brand-500/50' : 'border-white/10'} rounded-lg py-3 text-white text-sm outline-none transition-all font-mono flex items-center justify-between group hover:border-white/20 px-4 ${icon ? 'pl-10' : ''}`}
      >
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-600 group-hover:text-neutral-400 transition-colors pointer-events-none">
            {icon}
          </div>
        )}
        
        <span className={`truncate ${!selectedOption ? 'text-neutral-500' : 'text-white'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <ChevronDown 
          size={16} 
          className={`text-neutral-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-500' : ''}`} 
        />
      </button>

      <div 
        ref={listRef} 
        className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden hidden origin-top"
      >
        <div className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between group
                ${option.value === value 
                  ? 'bg-brand-500/10 text-brand-500' 
                  : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <span className="font-mono">{option.label}</span>
              {option.value === value && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};