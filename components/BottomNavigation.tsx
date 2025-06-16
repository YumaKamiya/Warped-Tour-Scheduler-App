import React from 'react';
import { View } from '../types';
import CalendarDaysIcon from './icons/CalendarDaysIcon';
import ListBulletIcon from './icons/ListBulletIcon';

interface BottomNavigationProps {
  currentView: View;
  onSetView: (view: View) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ currentView, onSetView }) => {
  const navItems = [
    { view: View.Timetable, label: 'Timetable', icon: <CalendarDaysIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" /> },
    { view: View.ArtistList, label: 'Artists', icon: <ListBulletIcon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40">
      <div className="max-w-md mx-auto flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onSetView(item.view)}
            className={`flex flex-col items-center justify-center w-full py-1 px-1 text-xs sm:text-sm focus:outline-none transition-colors duration-150
              ${
                currentView === item.view
                  ? 'text-blue-600'
                  : 'text-slate-500 hover:text-blue-500'
              }
            `}
            aria-current={currentView === item.view ? "page" : undefined}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;