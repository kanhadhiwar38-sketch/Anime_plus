import React from 'react';
import { Home, Search, Bookmark, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/home', icon: Home },
    { path: '/search', icon: Search },
    { path: '/favorites', icon: Bookmark },
    { path: '/settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 px-10 pb-6 pt-4 bg-gradient-to-t from-black to-transparent z-50">
      <div className="bg-[#F71B24] rounded-full flex justify-between items-center px-8 py-4 shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`p-2 transition-transform ${isActive ? 'scale-110 text-white' : 'text-white/70 hover:text-white'}`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
