import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Logo } from '../components/Logo';

export function LoginScreen() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center px-6">
      <Logo className="mb-12" />
      
      <div className="w-full max-w-md space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <User className="text-[#888888]" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Username" 
            className="w-full bg-[#292929] text-white rounded-xl h-[50px] pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F71B24]"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail className="text-[#888888]" size={20} />
          </div>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full bg-[#292929] text-white rounded-xl h-[50px] pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F71B24]"
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Lock className="text-[#888888]" size={20} />
          </div>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className="w-full bg-[#292929] text-white rounded-xl h-[50px] pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-[#F71B24]"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#888888] hover:text-white"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-white font-bold text-lg mb-6">Don't have an account?</p>
          
          <button 
            onClick={() => navigate('/home')}
            className="w-full bg-[#F71B24] text-white font-bold text-lg h-[50px] rounded-xl hover:bg-red-700 transition-colors"
          >
            Login
          </button>
          
          <button className="mt-6 text-white underline hover:text-[#F71B24] transition-colors">
            Forget Password
          </button>
        </div>
      </div>
    </div>
  );
}
