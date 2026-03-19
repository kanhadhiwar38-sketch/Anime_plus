import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { MainLayout } from './screens/MainLayout';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { MovieDetailScreen } from './screens/MovieDetailScreen';
import { PlayerScreen } from './screens/PlayerScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="/favorites" element={<FavoritesScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>

        <Route path="/movie/:id" element={<MovieDetailScreen />} />
        <Route path="/player/:id" element={<PlayerScreen />} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
