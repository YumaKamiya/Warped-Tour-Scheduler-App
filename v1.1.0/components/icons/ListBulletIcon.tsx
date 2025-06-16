
import React from 'react';

interface ListBulletIconProps {
  className?: string;
}

const ListBulletIcon: React.FC<ListBulletIconProps> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-6 h-6 ${className}`}
  >
    <path fillRule="evenodd" d="M2.625 6.75a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H3.375a.75.75 0 01-.75-.75V6.75zM3.375 12a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75h.01a.75.75 0 00.75-.75V12.75a.75.75 0 00-.75-.75H3.375zM2.625 17.25a.75.75 0 01.75-.75h.01a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75H3.375a.75.75 0 01-.75-.75V17.25z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M6.375 6.75a.75.75 0 01.75-.75h13.125a.75.75 0 010 1.5H7.125a.75.75 0 01-.75-.75zM6.375 12a.75.75 0 01.75-.75h13.125a.75.75 0 010 1.5H7.125a.75.75 0 01-.75-.75zM6.375 17.25a.75.75 0 01.75-.75h13.125a.75.75 0 010 1.5H7.125a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
);

export default ListBulletIcon;
