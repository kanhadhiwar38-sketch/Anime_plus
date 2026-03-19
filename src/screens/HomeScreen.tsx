import React, { useEffect, useState } from 'react';
import { Bell, Play, Bookmark, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchPopularAnime, fetchTopRatedAnime, fetchAnimeMovies, getImageUrl } from '../services/tmdb';

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mecha", "Romance", "Sci-Fi", "Slice of Life", "Sports", "Supernatural"];

export function HomeScreen() {
  const navigate = useNavigate();
  const [popularAnime, setPopularAnime] = useState<any[]>([]);
  const [topRatedAnime, setTopRatedAnime] = useState<any[]>([]);
  const [animeMovies, setAnimeMovies] = useState<any[]>([]);
  const [heroAnime, setHeroAnime] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const popular = await fetchPopularAnime();
        const topRated = await fetchTopRatedAnime();
        const movies = await fetchAnimeMovies();
        
        setPopularAnime(popular);
        setTopRatedAnime(topRated);
        setAnimeMovies(movies);
        
        if (popular && popular.length > 0) {
          setHeroAnime(popular[0]);
        }
      } catch (error) {
        console.error("Failed to fetch anime data", error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] pb-32">
      {/* Hero Section */}
      <div className="relative h-[350px] w-full">
        {heroAnime ? (
          <img 
            src={getImageUrl(heroAnime.backdrop_path, 'original')} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-[#292929] animate-pulse" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent" />
        
        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
          <div className="flex items-center gap-3">
            <img 
              src="https://picsum.photos/seed/avatar/100/100" 
              alt="Profile" 
              className="w-[55px] h-[55px] rounded-full border-2 border-[#F71B24] object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <p className="text-white font-medium">Hello <span className="font-bold">Kanha</span></p>
              <p className="text-white/80 text-sm">Enjoy your favourite anime</p>
            </div>
          </div>
          <button className="relative p-2 bg-black/40 rounded-full backdrop-blur-sm">
            <Bell className="text-white" size={24} />
            <span className="absolute top-1 right-1 w-3 h-3 bg-[#F71B24] rounded-full border-2 border-black"></span>
          </button>
        </div>

        {/* Hero Info */}
        {heroAnime && (
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{heroAnime.name || heroAnime.title}</h1>
            <p className="text-white/80 text-sm mb-6 max-w-md line-clamp-2">
              {heroAnime.overview}
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={() => navigate(`/movie/${heroAnime.id}?type=tv`)}
                className="flex-1 bg-white text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200"
              >
                <Play size={20} fill="currentColor" /> Play
              </button>
              <button className="flex-1 bg-[#292929] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-700">
                <Bookmark size={20} /> My List
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Genre Chips */}
      <div className="px-6 py-4 flex gap-3 overflow-x-auto no-scrollbar">
        {GENRES.map(genre => (
          <button key={genre} className="whitespace-nowrap bg-[#1F212A] text-white font-bold px-6 py-2 rounded-full hover:bg-[#F71B24] transition-colors">
            {genre}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-8 mt-4">
        {popularAnime.length > 0 && (
          <Section title="Continue Watching">
            <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-4">
              {popularAnime.slice(1, 3).map((item, i) => (
                <div key={item.id} className="min-w-[225px] bg-[#292929] rounded-xl overflow-hidden shrink-0 cursor-pointer" onClick={() => navigate(`/movie/${item.id}?type=tv`)}>
                  <div className="relative h-[115px]">
                    <img src={getImageUrl(item.backdrop_path)} alt="Resume" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <button className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-[#F71B24]" onClick={(e) => e.stopPropagation()}>
                      <X size={16} />
                    </button>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-[#F71B24] rounded-full flex items-center justify-center">
                        <Play size={24} fill="white" className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-white font-bold text-sm truncate">{item.name || item.title}</h3>
                      <span className="text-[#888888] text-xs">S01 E01</span>
                    </div>
                    <p className="text-[#888888] text-xs mb-3 truncate">{item.overview}</p>
                    <div className="w-full h-1 bg-black rounded-full overflow-hidden">
                      <div className="h-full bg-[#F71B24] w-[45%] rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        <Section title="Popular Anime">
          <MovieRow items={popularAnime} type="tv" />
        </Section>

        <Section title="Top Rated">
          <MovieRow items={topRatedAnime} type="tv" />
        </Section>
        
        <Section title="Anime Movies">
          <MovieRow items={animeMovies} type="movie" />
        </Section>
      </div>
    </div>
  );
}

function Section({ title, titleHighlight, children }: { title: string, titleHighlight?: string, children: React.ReactNode }) {
  const parts = titleHighlight ? title.split(titleHighlight) : [title];
  
  return (
    <div>
      <h2 className="text-xl font-bold text-white px-6 mb-4">
        {titleHighlight ? (
          <>
            {parts[0]}<span className="text-[#F71B24]">{titleHighlight}</span>{parts[1]}
          </>
        ) : title}
      </h2>
      {children}
    </div>
  );
}

function MovieRow({ items, type }: { items: any[], type: 'tv' | 'movie' }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 px-6 overflow-x-auto no-scrollbar pb-4">
      {items.map(item => (
        <div 
          key={item.id} 
          onClick={() => navigate(`/movie/${item.id}?type=${type}`)}
          className="w-[110px] shrink-0 cursor-pointer group"
        >
          <div className="relative h-[140px] rounded-xl overflow-hidden mb-2">
            <img src={getImageUrl(item.poster_path)} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" referrerPolicy="no-referrer" />
            <div className="absolute top-2 right-2 bg-[#F71B24] text-white text-xs font-bold px-1.5 py-0.5 rounded">
              {item.vote_average ? item.vote_average.toFixed(1) : 'N/A'}
            </div>
          </div>
          <h3 className="text-white font-bold text-sm truncate">{item.name || item.title}</h3>
          <p className="text-[#888888] text-xs truncate">{item.first_air_date ? item.first_air_date.substring(0, 4) : item.release_date ? item.release_date.substring(0, 4) : ''}</p>
        </div>
      ))}
    </div>
  );
}
