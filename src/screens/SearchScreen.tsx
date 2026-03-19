import React from 'react';
import { Search, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_RESULTS = [
  { id: 1, title: "Attack on Titan", rating: "9.8", image: "https://picsum.photos/seed/aot/300/300", desc: "After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans." },
  { id: 2, title: "Death Note", rating: "9.0", image: "https://picsum.photos/seed/dn/300/300", desc: "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it." },
  { id: 3, title: "Fullmetal Alchemist", rating: "9.1", image: "https://picsum.photos/seed/fma/300/300", desc: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms." },
];

export function SearchScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      <div className="sticky top-0 z-20 bg-[#111111] p-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-[#888888]" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search movie..." 
            className="w-full bg-[#292929] text-white rounded-xl h-[50px] pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F71B24]"
          />
        </div>
      </div>

      <div className="px-6 space-y-6">
        {MOCK_RESULTS.map(item => (
          <div key={item.id} className="flex gap-4 border-b border-[#292929] pb-6 last:border-0">
            <div className="w-[145px] h-[145px] shrink-0 relative rounded-2xl overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2 bg-[#F71B24] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                {item.rating}
              </div>
            </div>
            <div className="flex flex-col justify-between py-1">
              <div>
                <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-white/70 text-xs line-clamp-3 leading-relaxed">{item.desc}</p>
              </div>
              <button 
                onClick={() => navigate(`/movie/${item.id}`)}
                className="flex items-center gap-2 text-[#F71B24] font-bold text-sm mt-2 hover:text-white transition-colors"
              >
                <Play size={16} fill="currentColor" /> Watch Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
