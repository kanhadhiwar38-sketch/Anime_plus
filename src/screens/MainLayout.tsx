import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-[#111111]">
      <Outlet />
      <BottomNav />
    </div>
  );
}
