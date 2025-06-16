
import React from 'react';

interface TabOption<T extends string> {
  label: string;
  value: T;
}

interface TabsProps<T extends string> {
  options: TabOption<T>[];
  selectedValue: T;
  onSelect: (value: T) => void;
  className?: string;
  tabClassName?: string;
  activeTabClassName?: string;
}

const Tabs = <T extends string,>({
  options,
  selectedValue,
  onSelect,
  className = '',
  tabClassName = '',
  activeTabClassName = '',
}: TabsProps<T>): React.ReactElement => {
  return (
    <div className={`flex border-b border-slate-200 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={`px-4 py-3 font-medium text-sm sm:text-base focus:outline-none transition-colors duration-150
            ${
              selectedValue === option.value
                ? `border-b-2 border-blue-600 text-blue-600 ${activeTabClassName}`
                : `text-slate-500 hover:text-blue-500 hover:border-blue-600/50 border-b-2 border-transparent ${tabClassName}`
            }
          `}
          aria-pressed={selectedValue === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;