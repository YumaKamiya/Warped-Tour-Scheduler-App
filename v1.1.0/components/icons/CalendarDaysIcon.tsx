
import React from 'react';

interface CalendarDaysIconProps {
  className?: string;
}

const CalendarDaysIcon: React.FC<CalendarDaysIconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path fillRule="evenodd" d="M12.75 12V6a.75.75 0 00-1.5 0v6h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5z" clipRule="evenodd" />
    <path d="M3.75 3A1.75 1.75 0 002 4.75v14.5c0 .966.784 1.75 1.75 1.75h16.5A1.75 1.75 0 0022 19.25V4.75A1.75 1.75 0 0020.25 3H3.75zm0 1.5h16.5a.25.25 0 01.25.25v2.5H2v-2.5a.25.25 0 01.25-.25zM2.75 9h18.5v10.25a.25.25 0 01-.25.25H3a.25.25 0 01-.25-.25V9z" />
  </svg>
);

export default CalendarDaysIcon;
