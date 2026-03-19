import React from 'react';
import { Bookmark, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_FAVS = [
  { id: 1, title: "Demon Slayer", image: "https://picsum.photos/seed/demon/300/400" },
  { id: 2, title: "Jujutsu Kaisen", image: "https://picsum.photos/seed/jjk/300/400" },
  { id: 3, title: "Attack on Titan", image: "https://picsum.photos/seed/aot/300/400" },
  { id: 4, title: "One Piece", image: "https://picsum.photos/seed/op/300/400" },
];

export function FavoritesScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      <div className="bg-[#292929] px-6 py-4 flex items-center gap-3 sticky top-0 z-20">
        <Bookmark className="text-white" size={24} fill="currentColor" />
        <h1 className="text-white font-bold text-xl">Favorites</h1>
      </div>

      <div className="p-6">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-[#888888]" size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search favorites..." 
            className="w-full bg-[#292929] text-white rounded-xl h-[50px] pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#F71B24]"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {MOCK_FAVS.map(item => (
            <div 
              key={item.id} 
              onClick={() => navigate(`/movie/${item.id}`)}
              className="cursor-pointer group"
            >
              <div className="relative h-[170px] rounded-2xl overflow-hidden mb-2">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-3">
                  <h3 className="text-white font-bold text-xs text-center px-2 truncate w-full">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
