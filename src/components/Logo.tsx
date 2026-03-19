import React from 'react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center font-bold text-4xl tracking-widest ${className}`}>
      <span className="text-white">A N I M</span>
      <span className="text-[#F71B24]">E +</span>
    </div>
  );
}
