import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

type Difficulty = 'beginner' | 'medium' | 'pro';

const difficulties: { id: Difficulty; label: string; color: string; gradient: string }[] = [
  { id: 'beginner', label: 'Beginner', color: 'text-green-700', gradient: 'from-green-100 to-green-200' },
  { id: 'medium', label: 'Medium', color: 'text-orange-700', gradient: 'from-orange-100 to-orange-200' },
  { id: 'pro', label: 'Pro', color: 'text-red-700', gradient: 'from-red-100 to-red-200' }
];

const topicInfo: Record<string, { name: string; icon: string; color: string }> = {
  aws: { name: 'AWS', icon: '☁️', color: 'from-orange-400 to-orange-600' },
  kubernetes: { name: 'Kubernetes', icon: '⚙️', color: 'from-blue-400 to-blue-600' },
  terraform: { name: 'Terraform', icon: '🏗️', color: 'from-purple-400 to-purple-600' },
  ansible: { name: 'Ansible', icon: '🔧', color: 'from-red-400 to-red-600' }
};

const TopicDetailScreen: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('beginner');

  const topic = topicInfo[topicId || ''];

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const handleStartQuestions = () => {
    navigate(`/qa/${topicId}/${selectedDifficulty}`);
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
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{topic.icon}</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{topic.name}</h1>
              <p className="text-sm text-gray-600">Choose difficulty level</p>
            </div>
          </div>
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="px-6 py-8">
        <div className="space-y-6">
          {difficulties.map((difficulty) => (
            <div
              key={difficulty.id}
              onClick={() => setSelectedDifficulty(difficulty.id)}
              className={`cursor-pointer transform transition-all duration-300 ${
                selectedDifficulty === difficulty.id
                  ? 'scale-105 shadow-lg'
                  : 'hover:scale-102 shadow-md'
              }`}
            >
              <div className={`bg-gradient-to-r ${difficulty.gradient} rounded-2xl p-6 border-2 ${
                selectedDifficulty === difficulty.id
                  ? 'border-gray-300'
                  : 'border-transparent'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-xl font-bold ${difficulty.color}`}>
                      {difficulty.label}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {difficulty.id === 'beginner' && 'Perfect for getting started'}
                      {difficulty.id === 'medium' && 'For intermediate knowledge'}
                      {difficulty.id === 'pro' && 'Advanced level questions'}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${
                    selectedDifficulty === difficulty.id
                      ? 'bg-white border-gray-400'
                      : 'border-gray-300'
                  }`}>
                    {selectedDifficulty === difficulty.id && (
                      <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6">
        <button
          onClick={handleStartQuestions}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          <Play className="w-8 h-8" />
        </button>
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
};

export default TopicDetailScreen;
