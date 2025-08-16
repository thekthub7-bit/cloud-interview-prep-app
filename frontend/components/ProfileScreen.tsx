import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Award, Target, TrendingUp } from 'lucide-react';
import BottomNavigation from './BottomNavigation';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Questions Answered', value: '127', icon: Target, color: 'text-blue-600' },
    { label: 'Current Streak', value: '5 days', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Topics Mastered', value: '2', icon: Award, color: 'text-purple-600' },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 py-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-6">
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Cloud Learner</h2>
            <p className="text-gray-600">Preparing for cloud interviews</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Coming Soon</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Progress tracking</li>
            <li>• Achievement badges</li>
            <li>• Study streaks</li>
            <li>• Performance analytics</li>
          </ul>
        </div>
      </div>

      <BottomNavigation activeTab="profile" />
    </div>
  );
};

export default ProfileScreen;
