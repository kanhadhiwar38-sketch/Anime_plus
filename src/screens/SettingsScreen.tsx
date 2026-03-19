import React from 'react';
import { ChevronRight, Bell, Image as ImageIcon, Moon, HelpCircle, FileText, HardDrive, Edit3 } from 'lucide-react';

export function SettingsScreen() {
  return (
    <div className="min-h-screen bg-[#111111] pb-32 overflow-y-auto">
      {/* Profile Section */}
      <div className="flex flex-col items-center pt-12 pb-8">
        <div className="relative mb-4">
          <img 
            src="https://picsum.photos/seed/avatar/200/200" 
            alt="Profile" 
            className="w-[100px] h-[100px] rounded-full border-2 border-[#F71B24] object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-white font-bold text-xl">Kanha Dhiwar</h2>
        <p className="text-[#888888] text-sm mt-1">kanhadhiwar38@gmail.com</p>
      </div>

      <div className="px-6 space-y-4">
        <SettingsItem icon={<Edit3 size={20} />} label="Edit Profile" type="link" />
        <SettingsItem icon={<Bell size={20} />} label="Notifications" type="toggle" defaultOn={true} />
        <SettingsItem icon={<ImageIcon size={20} />} label="Image Quality" type="toggle" defaultOn={false} />
        <SettingsItem icon={<Moon size={20} />} label="App Theme" type="toggle" defaultOn={true} />
        <SettingsItem icon={<HelpCircle size={20} />} label="Help & Information" type="link" />
        <SettingsItem icon={<FileText size={20} />} label="User Requests" type="link" />
      </div>

      {/* Storage Section */}
      <div className="mt-8 px-6">
        <div className="bg-[#292929] rounded-2xl p-6 flex items-center gap-4">
          <div className="w-[45px] h-[45px] bg-[#111111] rounded-full flex items-center justify-center shrink-0">
            <HardDrive className="text-[#F71B24]" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-white text-[10px] font-bold">Total Storage: 50 GB</span>
              <span className="text-white text-[10px] font-bold">Available: 75.33 GB</span>
            </div>
            <div className="w-full h-2 bg-black rounded-full overflow-hidden">
              <div className="h-full bg-[#F71B24] w-[60%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Credits Section */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex gap-6 items-center opacity-50">
          <span className="text-white font-bold text-xl tracking-tighter">IMDb</span>
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6 grayscale" />
          <span className="text-[#E50914] font-bold text-xl tracking-tighter">NETFLIX</span>
        </div>
        <div className="flex gap-4 text-sm">
          <a href="#" className="text-[#2196F3] hover:underline">About Me</a>
          <span className="text-[#888888]">|</span>
          <a href="#" className="text-[#2196F3] hover:underline">Privacy Policy</a>
        </div>
        <p className="text-[#888888] text-xs">Version 1.0</p>
      </div>
    </div>
  );
}

function SettingsItem({ icon, label, type, defaultOn }: { icon: React.ReactNode, label: string, type: 'link' | 'toggle', defaultOn?: boolean }) {
  const [isOn, setIsOn] = React.useState(defaultOn);

  return (
    <div className="bg-[#292929] h-[50px] rounded-xl px-4 flex items-center justify-between cursor-pointer hover:bg-[#333333] transition-colors">
      <div className="flex items-center gap-4 text-white">
        <div className="text-[#888888]">{icon}</div>
        <span className="font-medium">{label}</span>
      </div>
      {type === 'link' ? (
        <ChevronRight className="text-[#888888]" size={20} />
      ) : (
        <div 
          onClick={() => setIsOn(!isOn)}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isOn ? 'bg-[#F71B24]' : 'bg-black'}`}
        >
          <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isOn ? 'translate-x-6' : 'translate-x-0'}`} />
        </div>
      )}
    </div>
  );
}
