import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Trash2 } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';
import BottomNavigation from './BottomNavigation';

const BookmarksScreen: React.FC = () => {
  const navigate = useNavigate();
  const { bookmarks, removeBookmark } = useBookmarks();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-orange-100 text-orange-800';
      case 'pro': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTopicColor = (topic: string) => {
    switch (topic) {
      case 'aws': return 'bg-orange-100 text-orange-800';
      case 'kubernetes': return 'bg-blue-100 text-blue-800';
      case 'terraform': return 'bg-purple-100 text-purple-800';
      case 'ansible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center px-6 py-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors mr-4"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Bookmarks</h1>
            <p className="text-sm text-gray-600">{bookmarks.length} saved questions</p>
          </div>
        </div>
      </div>

      {/* Bookmarks List */}
      <div className="px-6 py-6">
        {bookmarks.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookmarks yet</h3>
            <p className="text-gray-500">Start bookmarking questions to review them later</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookmarks.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTopicColor(question.topic)}`}>
                      {question.topic.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty}
                    </span>
                  </div>
                  <button
                    onClick={() => removeBookmark(question.id)}
                    className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                  {question.question}
                </h3>
                
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {question.answer}
                </p>
                
                <button
                  onClick={() => navigate(`/qa/${question.topic}/${question.difficulty}`)}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <Play className="w-4 h-4" />
                  <span>Practice this topic</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      {bookmarks.length > 0 && (
        <div className="fixed bottom-24 right-6">
          <button
            onClick={() => {
              // Future: Start quiz with bookmarked questions
              console.log('Start quiz with bookmarked questions');
            }}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          >
            <Play className="w-8 h-8" />
          </button>
        </div>
      )}

      <BottomNavigation activeTab="bookmarks" />
    </div>
  );
};

export default BookmarksScreen;
