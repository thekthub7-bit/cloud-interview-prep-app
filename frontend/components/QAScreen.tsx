import React, { useState, useEffect, useRef } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [nextQuestion, setNextQuestion] = useState<Question | null>(null);
  const [prevQuestion, setPrevQuestion] = useState<Question | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isBookmarked = currentQuestion ? bookmarks.some(b => b.id === currentQuestion.id) : false;

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
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

  // Update next and previous questions when current index changes
  useEffect(() => {
    if (questions.length > 0) {
      setNextQuestion(currentQuestionIndex < questions.length - 1 ? questions[currentQuestionIndex + 1] : null);
      setPrevQuestion(currentQuestionIndex > 0 ? questions[currentQuestionIndex - 1] : null);
    }
  }, [currentQuestionIndex, questions]);

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsTransitioning(false);
      }, 150);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || isTransitioning) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY.current;
    
    // Limit drag distance and add resistance
    const maxDrag = 120;
    const resistance = 0.7;
    const limitedDelta = Math.sign(deltaY) * Math.min(Math.abs(deltaY) * resistance, maxDrag);
    
    setDragOffset(limitedDelta);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current || isTransitioning) return;
    
    const threshold = 50;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset < 0) {
        // Swipe up - next question
        goToNextQuestion();
      } else {
        // Swipe down - previous question
        goToPreviousQuestion();
      }
    }
    
    setDragOffset(0);
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isTransitioning) return;
    
    if (e.deltaY > 0) {
      goToNextQuestion();
    } else {
      goToPreviousQuestion();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (isTransitioning) return;
    
    if (e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      goToNextQuestion();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      goToPreviousQuestion();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestionIndex, questions.length, isTransitioning]);

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

  const cardTransform = isTransitioning 
    ? 'scale(0.98) translateY(0px)' 
    : `translateY(${dragOffset}px) scale(${1 - Math.abs(dragOffset) * 0.0003})`;

  const cardOpacity = isTransitioning 
    ? 0.9 
    : 1 - Math.abs(dragOffset) * 0.001;

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
          className="w-full max-w-sm h-full bg-white rounded-3xl shadow-2xl overflow-hidden relative transition-all duration-150 ease-out"
          style={{
            transform: cardTransform,
            opacity: cardOpacity
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Question Section - 35% */}
          <div className="h-[35%] bg-gradient-to-br from-blue-500 to-purple-600 p-6 flex flex-col justify-center relative">
            <h2 className="text-white text-lg font-bold leading-tight">
              {currentQuestion.question}
            </h2>
            
            {/* Progress dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1">
                {questions.slice(0, Math.min(questions.length, 10)).map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentQuestionIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30'
                    }`}
                  />
                ))}
                {questions.length > 10 && (
                  <div className="text-white/60 text-xs ml-2">
                    +{questions.length - 10}
                  </div>
                )}
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

      {/* Navigation Buttons - Improved */}
      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10">
        {prevQuestion && (
          <button
            onClick={goToPreviousQuestion}
            disabled={isTransitioning}
            className="p-4 rounded-full bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 transition-all duration-200 disabled:opacity-50 shadow-lg"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>
      
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10">
        {nextQuestion && (
          <button
            onClick={goToNextQuestion}
            disabled={isTransitioning}
            className="p-4 rounded-full bg-white/25 backdrop-blur-sm text-white hover:bg-white/35 transition-all duration-200 disabled:opacity-50 shadow-lg"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        )}
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

      {/* Swipe instruction */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/40 text-xs text-center z-10">
        <p>Swipe up/down • Use arrow keys • Scroll to navigate</p>
      </div>

      {/* Drag feedback - Improved */}
      {isDragging.current && Math.abs(dragOffset) > 25 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 text-white shadow-xl">
            {dragOffset < 0 ? (
              <div className="flex items-center space-x-3">
                <ChevronDown className="w-6 h-6" />
                <div>
                  <span className="text-sm font-medium">Next Question</span>
                  {nextQuestion && (
                    <p className="text-xs text-white/70 mt-1 max-w-48 truncate">
                      {nextQuestion.question}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <ChevronUp className="w-6 h-6" />
                <div>
                  <span className="text-sm font-medium">Previous Question</span>
                  {prevQuestion && (
                    <p className="text-xs text-white/70 mt-1 max-w-48 truncate">
                      {prevQuestion.question}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QAScreen;
