import React, { useState } from 'react';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder: string;
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string; // Added className prop to the interface
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <div className="relative">
      <div onClick={() => setOpen(!open)}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<any>);
          }
          return null;
        })}
      </div>
      
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              return React.cloneElement(child as React.ReactElement<any>, {
                onSelect: (selectedValue: string) => {
                  onValueChange(selectedValue);
                  setOpen(false);
                },
                currentValue: value
              });
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ className = "", children }) => {
  return (
    <button className={`flex items-center justify-between w-full p-2 border rounded-md ${className}`}>
      {children}
      <span>▼</span>
    </button>
  );
};

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  return <span>{placeholder}</span>;
};

export const SelectContent: React.FC<SelectContentProps & {onSelect?: (value: string) => void, currentValue?: string}> = 
  ({ children, onSelect, currentValue, className = "" }) => {
  return (
    <div className={`py-1 bg-dark-surface border-dark-border text-dark-text ${className}`}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child as React.ReactElement<any>, {
            onSelect,
            selected: currentValue === (child.props as SelectItemProps).value
          });
        }
        return null;
      })}
    </div>
  );
};

export const SelectItem: React.FC<SelectItemProps & {onSelect?: (value: string) => void, selected?: boolean}> = ({ value, children, onSelect, selected }) => {
  return (
    <div 
      className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${selected ? 'bg-blue-50' : ''}`}
      onClick={() => onSelect && onSelect(value)}
    >
      {children}
    </div>
  );
};