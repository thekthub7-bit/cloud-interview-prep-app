import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

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

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    // Apply transform to create drag effect
    if (containerRef.current) {
      const progress = Math.min(Math.abs(deltaY) / 100, 1);
      const scale = 1 - progress * 0.05;
      const opacity = 1 - progress * 0.3;
      
      containerRef.current.style.transform = `translateY(${deltaY * 0.5}px) scale(${scale})`;
      containerRef.current.style.opacity = opacity.toString();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    
    const deltaY = currentY.current - startY.current;
    const threshold = 80;
    
    // Reset transform
    if (containerRef.current) {
      containerRef.current.style.transform = '';
      containerRef.current.style.opacity = '';
    }
    
    if (Math.abs(deltaY) > threshold) {
      if (deltaY < 0) {
        // Swipe up - next question
        goToNextQuestion();
      } else {
        // Swipe down - previous question
        goToPreviousQuestion();
      }
    }
    
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      goToNextQuestion();
    } else {
      goToPreviousQuestion();
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
      className="min-h-screen bg-gray-900 relative overflow-hidden select-none"
      onWheel={handleWheel}
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-black/20 backdrop-blur-sm">
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

      {/* Main Content Container */}
      <div className="h-screen flex items-center justify-center p-4">
        <div 
          ref={containerRef}
          className={`w-full max-w-sm h-full bg-white rounded-3xl shadow-2xl overflow-hidden relative transition-all duration-300 ${
            isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Question Section - 35% */}
          <div className="h-[35%] bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col justify-center relative">
            <h2 className="text-white text-lg font-bold leading-tight">
              {currentQuestion.question}
            </h2>
            
            {/* Swipe indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuestionIndex 
                        ? 'bg-white' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Answer Section - 65% */}
          <div className="h-[65%] p-6 flex flex-col justify-start bg-gray-50 overflow-y-auto">
            <div className="space-y-4">
              <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
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
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
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

      {/* Navigation hints */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/30 z-10">
        {currentQuestionIndex > 0 && (
          <div className="text-xs text-center">
            <div className="mb-1">↑</div>
            <div>Previous</div>
          </div>
        )}
      </div>
      
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/30 z-10">
        {currentQuestionIndex < questions.length - 1 && (
          <div className="text-xs text-center">
            <div className="mb-1">↓</div>
            <div>Next</div>
          </div>
        )}
      </div>

      {/* Swipe instruction */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/40 text-xs text-center z-10">
        <p>Swipe up/down to navigate</p>
      </div>
    </div>
  );
};

export default QAScreen;
