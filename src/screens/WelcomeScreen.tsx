import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://picsum.photos/seed/animeposter/1080/1920)' }}
      />
      
      {/* Semi-transparent Card */}
      <div className="relative z-10 bg-black/60 backdrop-blur-sm p-8 rounded-3xl mx-6 max-w-md w-full text-center border border-white/10 shadow-2xl">
        <Logo className="mb-6" />
        
        <p className="text-white text-lg mb-10 leading-relaxed">
          Watch your favorite movie series on only one platform. You can watch it anytime and anywhere.
        </p>
        
        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-[#F71B24] text-white font-bold text-xl py-4 rounded-xl mb-4 hover:bg-red-700 transition-colors"
        >
          Sign In
        </button>
        
        <button 
          onClick={() => navigate('/home')}
          className="w-full border border-white/30 text-white font-semibold text-lg py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-white/10 transition-colors"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
          Continue with Google
        </button>
      </div>
    </div>
  );
}
