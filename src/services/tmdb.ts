const TMDB_API_KEY = '2e211dfda888f7cc55ce433d743f9bc3';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getImageUrl = (path: string, size: 'w300' | 'w500' | 'original' = 'w500') => {
  if (!path) return 'https://picsum.photos/seed/placeholder/500/750';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const fetchPopularAnime = async () => {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=ja&with_genres=16&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
};

export const fetchTopRatedAnime = async () => {
  const res = await fetch(`${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=ja&with_genres=16&sort_by=vote_average.desc&vote_count.gte=1000`);
  const data = await res.json();
  return data.results;
};

export const fetchAnimeMovies = async () => {
  const res = await fetch(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_original_language=ja&with_genres=16&sort_by=popularity.desc`);
  const data = await res.json();
  return data.results;
};

export const fetchAnimeDetails = async (id: string, type: 'tv' | 'movie' = 'tv') => {
  const res = await fetch(`${BASE_URL}/${type}/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`);
  const data = await res.json();
  return data;
};

export const searchAnime = async (query: string) => {
  const res = await fetch(`${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  // Filter for anime (ja language and animation genre if possible, or just return all)
  return data.results.filter((item: any) => 
    (item.media_type === 'tv' || item.media_type === 'movie') && 
    item.original_language === 'ja'
  );
};
