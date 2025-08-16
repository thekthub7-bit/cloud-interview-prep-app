import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import TopicDetailScreen from './components/TopicDetailScreen';
import QAScreen from './components/QAScreen';
import BookmarksScreen from './components/BookmarksScreen';
import ProfileScreen from './components/ProfileScreen';
import { BookmarkProvider } from './contexts/BookmarkContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BookmarkProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/topic/:topicId" element={<TopicDetailScreen />} />
              <Route path="/qa/:topicId/:difficulty" element={<QAScreen />} />
              <Route path="/bookmarks" element={<BookmarksScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
          </div>
        </Router>
      </BookmarkProvider>
    </QueryClientProvider>
  );
}

export default App;
