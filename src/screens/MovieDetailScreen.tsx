import React, { useEffect, useState } from 'react';
import { ArrowLeft, Bookmark, Share2, Play, Download, Star, Calendar, Eye, MessageCircle, ChevronDown } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchAnimeDetails, getImageUrl } from '../services/tmdb';

export function MovieDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') as 'tv' | 'movie' || 'tv';
  
  const [activeTab, setActiveTab] = useState(type === 'tv' ? 'Episodes' : 'Trailer');
  const [details, setDetails] = useState<any>(null);
  const [selectedSeason, setSelectedSeason] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      if (id) {
        try {
          const data = await fetchAnimeDetails(id, type);
          setDetails(data);
          
          if (type === 'tv' && data.seasons && data.seasons.length > 0) {
            const regularSeasons = data.seasons.filter((s: any) => s.season_number > 0);
            const defaultSeason = regularSeasons.length > 0 ? regularSeasons[0] : data.seasons[0];
            setSelectedSeason(defaultSeason);
            fetchEpisodes(id, defaultSeason.season_number);
          }
        } catch (error) {
          console.error("Failed to fetch details", error);
        }
      }
    };
    loadDetails();
  }, [id, type]);

  const fetchEpisodes = async (tvId: string, seasonNumber: number) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=2e211dfda888f7cc55ce433d743f9bc3`);
      const data = await response.json();
      setEpisodes(data.episodes || []);
    } catch (error) {
      console.error("Failed to fetch episodes", error);
    }
  };

  const handleSeasonChange = (season: any) => {
    setSelectedSeason(season);
    setShowSeasonDropdown(false);
    if (id) {
      fetchEpisodes(id, season.season_number);
    }
  };

  if (!details) {
    return <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">Loading...</div>;
  }

  const title = details.name || details.title;
  const year = details.first_air_date ? details.first_air_date.substring(0, 4) : details.release_date ? details.release_date.substring(0, 4) : '';
  const cast = details.credits?.cast?.slice(0, 10) || [];
  const similar = details.similar?.results?.slice(0, 6) || [];
  const trailer = details.videos?.results?.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');

  return (
    <div className="min-h-screen bg-[#111111] pb-10">
      {/* Hero Section */}
      <div className="relative h-[450px] w-full">
        <img 
          src={getImageUrl(details.backdrop_path, 'original')} 
          alt="Backdrop" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-transparent" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <button onClick={() => navigate(-1)} className="p-2 bg-black/40 rounded-full backdrop-blur-sm text-white hover:bg-[#F71B24] transition-colors">
            <ArrowLeft size={24} />
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
              <div className="flex items-center gap-3 text-sm text-[#ECEFF1] font-medium">
                <span className="flex items-center gap-1 text-[#F71B24]"><Star size={14} fill="currentColor" /> {details.vote_average?.toFixed(1)}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Calendar size={14} /> {year}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Eye size={14} /> {details.vote_count}</span>
                <span>·</span>
                <span className="border border-white/30 px-1 rounded text-xs">{details.adult ? '18+' : '13+'}</span>
                <span>·</span>
                <span className="border border-white/30 px-1 rounded text-xs">{details.original_language.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="p-2 bg-black/40 rounded-full backdrop-blur-sm text-white hover:text-[#F71B24]">
                <Bookmark size={24} />
              </button>
              <button className="p-2 bg-black/40 rounded-full backdrop-blur-sm text-white hover:text-[#F71B24]">
                <Share2 size={24} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => navigate(`/player/${id}?type=${type}&season=${selectedSeason?.season_number || 1}&episode=1`)}
              className="flex-1 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
            >
              <Play size={20} fill="currentColor" /> Play
            </button>
            <button className="flex-1 bg-[#292929] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700 transition-colors">
              <Download size={20} /> Download
            </button>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="px-6 py-4">
        <p className="text-white font-bold text-sm mb-3">
          {details.genres?.map((g: any) => g.name).join(', ')}
        </p>
        <p className="text-white/80 text-sm leading-relaxed mb-3">
          {details.overview}
        </p>
        <p className="text-[#888888] text-sm font-medium">Status: <span className="text-white">{details.status}</span></p>
      </div>

      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-bold text-white px-6 mb-4">Cast</h2>
          <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-4">
            {cast.map((actor: any) => (
              <div key={actor.id} className="w-[115px] shrink-0 flex flex-col items-center">
                <img src={getImageUrl(actor.profile_path)} alt={actor.name} className="w-[80px] h-[80px] rounded-full object-cover mb-3 border-2 border-[#292929]" referrerPolicy="no-referrer" />
                <p className="text-white font-bold text-sm text-center w-full truncate">{actor.name}</p>
                <p className="text-[#888888] text-xs text-center w-full truncate">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mt-4 px-6 border-b border-[#292929] flex gap-8">
        {(type === 'tv' ? ['Episodes', 'Trailer', 'Similar', 'Comments'] : ['Trailer', 'Similar', 'Comments']).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold relative ${activeTab === tab ? 'text-white' : 'text-[#888888] hover:text-white/80'}`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F71B24] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'Episodes' && type === 'tv' && (
          <div className="space-y-4">
            {/* Season Selector */}
            <div className="relative mb-4 z-30">
              <button 
                className="flex items-center justify-between w-full bg-[#292929] text-white px-4 py-3 rounded-xl"
                onClick={() => setShowSeasonDropdown(!showSeasonDropdown)}
              >
                <span className="font-medium">{selectedSeason?.name || 'Select Season'}</span>
                <ChevronDown size={20} className={`transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              {showSeasonDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#292929] rounded-xl overflow-hidden shadow-xl border border-white/10 max-h-60 overflow-y-auto z-50">
                  {details.seasons?.filter((s:any) => s.season_number > 0).map((season: any) => (
                    <button
                      key={season.id}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${selectedSeason?.id === season.id ? 'bg-[#F71B24] text-white' : 'text-white hover:bg-white/5'}`}
                      onClick={() => handleSeasonChange(season)}
                    >
                      {season.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Episodes List */}
            <div className="space-y-3">
              {episodes.map((ep: any) => (
                <div 
                  key={ep.id} 
                  className="flex gap-4 bg-[#292929] rounded-xl p-2 cursor-pointer hover:bg-white/5 transition-colors"
                  onClick={() => navigate(`/player/${id}?type=tv&season=${selectedSeason.season_number}&episode=${ep.episode_number}`)}
                >
                  <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <img 
                      src={ep.still_path ? getImageUrl(ep.still_path, 'w300') : `https://picsum.photos/seed/ep${ep.id}/300/200`} 
                      alt={ep.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play size={24} fill="white" className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 py-1">
                    <h4 className="text-white font-medium text-sm line-clamp-1">{ep.episode_number}. {ep.name}</h4>
                    <p className="text-[#888888] text-xs mt-1">{ep.runtime || 24}m</p>
                    <p className="text-[#888888] text-xs mt-1 line-clamp-2">{ep.overview}</p>
                  </div>
                </div>
              ))}
              {episodes.length === 0 && (
                <div className="text-center py-8 text-[#888888]">
                  No episodes found for this season.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'Trailer' && (
          trailer ? (
            <div className="w-full aspect-video bg-[#292929] rounded-2xl overflow-hidden">
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${trailer.key}`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="w-full aspect-video bg-[#292929] rounded-2xl flex items-center justify-center text-[#888888]">
              No trailer available
            </div>
          )
        )}
        
        {activeTab === 'Similar' && (
          <div className="grid grid-cols-3 gap-4">
            {similar.map((item: any) => (
              <div key={item.id} onClick={() => navigate(`/movie/${item.id}?type=${type}`)} className="relative h-[170px] rounded-2xl overflow-hidden cursor-pointer group">
                <img src={getImageUrl(item.poster_path)} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Comments' && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <img src="https://picsum.photos/seed/avatar/100/100" alt="Me" className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Add a comment..." 
                  className="w-full bg-[#292929] text-white rounded-xl h-10 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[#F71B24] text-sm"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#F71B24]">
                  <MessageCircle size={18} />
                </button>
              </div>
            </div>
            
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3">
                <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-10 h-10 rounded-full object-cover shrink-0" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-white font-bold text-sm">AnimeFan99</span>
                    <span className="text-[#F71B24] text-xs italic">2 days ago</span>
                  </div>
                  <p className="text-white/80 text-sm">This episode was absolutely insane! The animation quality is off the charts.</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

