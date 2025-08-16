import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Home, Bookmark, User } from 'lucide-react';
import TopicCard from './TopicCard';
import BottomNavigation from './BottomNavigation';

const topics = [
  {
    id: 'aws',
    name: 'AWS',
    icon: '☁️',
    color: 'from-orange-400 to-orange-600',
    description: 'Amazon Web Services'
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '⚙️',
    color: 'from-blue-400 to-blue-600',
    description: 'Container Orchestration'
  },
  {
    id: 'terraform',
    name: 'Terraform',
    icon: '🏗️',
    color: 'from-purple-400 to-purple-600',
    description: 'Infrastructure as Code'
  },
  {
    id: 'ansible',
    name: 'Ansible',
    icon: '🔧',
    color: 'from-red-400 to-red-600',
    description: 'Configuration Management'
  }
];

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top App Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cloud Interview Prep</h1>
            <p className="text-sm text-gray-600">Choose your topic</p>
          </div>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
            <Search className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => navigate(`/topic/${topic.id}`)}
            />
          ))}
        </div>
      </div>

      <BottomNavigation activeTab="home" />
    </div>
  );
};

export default HomeScreen;
