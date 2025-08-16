import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

type Difficulty = 'beginner' | 'medium' | 'pro';

interface Question {
  id: string;
  question: string;
  answer: string;
  image_suggestion?: string;
}

const QAScreen: React.FC = () => {
  const { topicId, difficulty } = useParams<{ topicId: string; difficulty: string }>();
  const navigate = useNavigate();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(difficulty as Difficulty);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const currentQuestion = questions[currentQuestionIndex];
  const isBookmarked = currentQuestion ? bookmarks.some(b => b.id === currentQuestion.id) : false;

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        // First try to fetch from S3
        const s3Url = `https://1question2.s3.us-east-1.amazonaws.com/${topicId}+${currentDifficulty}/basic.js`;
        
        try {
          const response = await fetch(s3Url);
          if (response.ok) {
            const text = await response.text();
            // Extract the array from the JS file (assuming it exports default [...])
            const match = text.match(/export\s+default\s+(\[[\s\S]*\])/);
            if (match) {
              const questionsData = JSON.parse(match[1]);
              setQuestions(questionsData);
              setCurrentQuestionIndex(0);
              setLoading(false);
              return;
            }
          }
        } catch (s3Error) {
          console.log('S3 fetch failed, falling back to local data:', s3Error);
        }

        // Fallback to local data
        const module = await import(`../data/topics/${topicId}/${currentDifficulty}.ts`);
        setQuestions(module.default);
        setCurrentQuestionIndex(0);
      } catch (error) {
        console.error('Failed to load questions:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (topicId && currentDifficulty) {
      loadQuestions();
    }
  }, [topicId, currentDifficulty]);

  const handleSwipeLeft = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSwipeRight = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleScrollNavigation = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      // Scroll down - next question
      handleSwipeLeft();
    } else {
      // Scroll up - previous question
      handleSwipeRight();
    }
  };

  const toggleBookmark = () => {
    if (!currentQuestion) return;
    
    const questionWithMeta = {
      ...currentQuestion,
      topic: topicId || '',
      difficulty: currentDifficulty
    };
    
    if (isBookmarked) {
      removeBookmark(currentQuestion.id);
    } else {
      addBookmark(questionWithMeta);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading questions...</h2>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">No questions available</h2>
          <button
            onClick={() => navigate('/home')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-900 relative overflow-hidden"
      onWheel={handleScrollNavigation}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate(`/topic/${topicId}`)}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-white text-center">
            <p className="text-sm opacity-80">{currentQuestionIndex + 1} of {questions.length}</p>
            <p className="text-xs opacity-60 capitalize">{currentDifficulty}</p>
          </div>

          <button
            onClick={toggleBookmark}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-6 h-6 text-yellow-400" />
            ) : (
              <Bookmark className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="h-screen flex items-center justify-center p-6">
        <div 
          className="w-full max-w-md h-5/6 bg-white rounded-3xl shadow-2xl overflow-hidden relative"
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            const startY = e.touches[0].clientY;
            const handleTouchEnd = (endEvent: TouchEvent) => {
              const endX = endEvent.changedTouches[0].clientX;
              const endY = endEvent.changedTouches[0].clientY;
              const diffX = startX - endX;
              const diffY = startY - endY;
              
              // Prioritize vertical swipes for navigation
              if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 50) {
                if (diffY > 0) {
                  // Swipe up - next question
                  handleSwipeLeft();
                } else {
                  // Swipe down - previous question
                  handleSwipeRight();
                }
              } else if (Math.abs(diffX) > 50) {
                // Horizontal swipes
                if (diffX > 0) handleSwipeLeft();
                else handleSwipeRight();
              }
              
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {/* Question Section - 35% */}
          <div className="h-[35%] bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col justify-center">
            <h2 className="text-white text-lg font-bold leading-tight">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Section - 65% */}
          <div className="h-[65%] p-6 flex flex-col justify-start bg-gray-50 overflow-y-auto">
            <div className="space-y-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                {currentQuestion.answer}
              </p>
              {currentQuestion.image_suggestion && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">💡 Visual suggestion:</p>
                  <p className="text-sm text-blue-600 mt-1">{currentQuestion.image_suggestion}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Switcher */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 bg-black/30 backdrop-blur-sm rounded-full p-2">
          {(['beginner', 'medium', 'pro'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setCurrentDifficulty(diff)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                currentDifficulty === diff
                  ? 'bg-white text-gray-900'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50">
        {currentQuestionIndex > 0 && (
          <div className="flex flex-col items-center space-y-2">
            <ChevronUp className="w-6 h-6" />
            <div className="text-xs">Previous</div>
          </div>
        )}
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50">
        {currentQuestionIndex < questions.length - 1 && (
          <div className="flex flex-col items-center space-y-2">
            <ChevronDown className="w-6 h-6" />
            <div className="text-xs">Next</div>
          </div>
        )}
      </div>

      {/* Scroll/Swipe Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/40 text-xs text-center">
        <p>Scroll up/down or swipe to navigate</p>
      </div>
    </div>
  );
};

export default QAScreen;
