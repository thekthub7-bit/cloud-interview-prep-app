import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, BookOpen } from 'lucide-react';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700">
      <div className="text-center animate-fade-in">
        <div className="relative mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Cloud className="w-16 h-16 text-white" />
            <BookOpen className="w-14 h-14 text-white" />
          </div>
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
          Cloud Interview Prep
        </h1>
        <p className="text-white/80 text-lg font-medium">
          Master your cloud & DevOps interviews
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
