import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Maximize, Settings, List, MessageSquare } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { fetchAnimeDetails } from '../services/tmdb';

export function PlayerScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'tv' | 'movie' || 'tv';
  const initialSeason = parseInt(searchParams.get('season') || '1', 10);
  const initialEpisode = parseInt(searchParams.get('episode') || '1', 10);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [servers, setServers] = useState<any[]>([]);
  const [activeServer, setActiveServer] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [season, setSeason] = useState(initialSeason);
  const [episode, setEpisode] = useState(initialEpisode);
  const [showServers, setShowServers] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        try {
          const tmdbData = await fetchAnimeDetails(id, type);
          setDetails(tmdbData);
          
          // Fetch servers from Firebase Realtime Database
          // Structure: anime/{tmdbId}/{season}/{episode}
          const serverRef = ref(db, `anime/${id}/${season}/${episode}`);
          const snapshot = await get(serverRef);
          
          if (snapshot.exists()) {
            const data = snapshot.val();
            const serverList = Object.keys(data).map(key => {
              const val = data[key];
              if (typeof val === 'string') {
                return { name: key, url: val, isEmbed: true };
              }
              return { name: key, ...val };
            });
            setServers(serverList);
            if (serverList.length > 0) {
              setActiveServer(serverList[0]);
            }
          } else {
            setServers([]);
            setActiveServer(null);
          }
        } catch (error) {
          console.error("Failed to fetch data", error);
        }
      }
    };
    loadData();
  }, [id, type, season, episode]);

  return (
    <div 
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onClick={() => {
        setShowControls(!showControls);
        setShowServers(false);
      }}
    >
      {/* Video Area */}
      <div className="absolute inset-0 flex items-center justify-center bg-black">
        {activeServer ? (
          activeServer.isEmbed !== false ? (
            <iframe 
              src={activeServer.url} 
              className="w-full h-full border-0" 
              allowFullScreen 
              allow="autoplay; fullscreen"
            ></iframe>
          ) : (
            <video 
              src={activeServer.url} 
              className="w-full h-full" 
              controls={false}
              autoPlay
            ></video>
          )
        ) : (
          <div className="text-white text-lg">No servers available for this episode.</div>
        )}
      </div>

      {/* Controls Overlay */}
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex flex-col justify-between ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Top Bar */}
        <div className="p-6 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent">
          <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="text-white hover:text-[#F71B24]">
            <ArrowLeft size={28} />
          </button>
          <h2 className="text-white font-bold text-lg">
            {details ? (details.name || details.title) : 'Loading...'} 
            {type === 'tv' && ` - S${season} E${episode}`}
          </h2>
        </div>

        {/* Middle Controls (Only for non-embed video) */}
        {activeServer && activeServer.isEmbed === false && (
          <div className="flex items-center justify-center gap-12">
            <button className="text-white hover:text-[#F71B24] transition-colors" onClick={(e) => e.stopPropagation()}>
              <SkipBack size={40} fill="currentColor" />
            </button>
            <button 
              className="text-white hover:text-[#F71B24] transition-colors"
              onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
            >
              {isPlaying ? <Pause size={64} fill="currentColor" /> : <Play size={64} fill="currentColor" className="ml-2" />}
            </button>
            <button className="text-white hover:text-[#F71B24] transition-colors" onClick={(e) => e.stopPropagation()}>
              <SkipForward size={40} fill="currentColor" />
            </button>
          </div>
        )}

        {/* Bottom Controls */}
        <div className="p-6 bg-gradient-to-t from-black/90 to-transparent" onClick={(e) => e.stopPropagation()}>
          {/* Progress Bar (Only for non-embed) */}
          {activeServer && activeServer.isEmbed === false && (
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white text-sm font-medium">00:00</span>
              <div className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer relative group">
                <div className="absolute top-0 left-0 h-full bg-[#F71B24] w-[0%] rounded-full"></div>
                <div className="absolute top-1/2 left-[0%] -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#F71B24] rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"></div>
              </div>
              <span className="text-white text-sm font-medium">24:00</span>
            </div>
          )}

          {/* Bottom Toolbar */}
          <div className="flex justify-between items-center relative">
            <div className="flex gap-6">
              {type === 'tv' && (
                <button 
                  className="text-white hover:text-[#F71B24] flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    const nextEp = episode + 1;
                    setEpisode(nextEp);
                    navigate(`/player/${id}?type=tv&season=${season}&episode=${nextEp}`, { replace: true });
                  }}
                >
                  <List size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Next Ep</span>
                </button>
              )}
              
              <div className="relative">
                <button 
                  className="text-white hover:text-[#F71B24] flex flex-col items-center gap-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowServers(!showServers);
                  }}
                >
                  <Settings size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Servers</span>
                </button>
                
                {/* Servers Menu */}
                {showServers && (
                  <div className="absolute bottom-full left-0 mb-4 bg-[#292929] rounded-xl p-2 min-w-[150px] shadow-xl border border-white/10">
                    <h3 className="text-white/50 text-xs font-bold uppercase px-3 py-2 border-b border-white/10 mb-1">Select Server</h3>
                    {servers.map(server => (
                      <button
                        key={server.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveServer(server);
                          setShowServers(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeServer?.name === server.name ? 'bg-[#F71B24] text-white' : 'text-white hover:bg-white/10'}`}
                      >
                        {server.name}
                      </button>
                    ))}
                    {servers.length === 0 && (
                      <div className="px-3 py-2 text-white/50 text-sm">No servers</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button className="text-white hover:text-[#F71B24]">
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

