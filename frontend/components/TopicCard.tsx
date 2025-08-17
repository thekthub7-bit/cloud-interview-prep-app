import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

interface TopicCardProps {
  topic: Topic;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ topic, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      <div className={`bg-gradient-to-br ${topic.color} rounded-3xl p-6 text-white shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{topic.icon}</div>
          <ChevronRight className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="text-xl font-bold mb-2">{topic.name}</h3>
        <p className="text-white/80 text-sm">{topic.description}</p>
      </div>
    </div>
  );
};

export default TopicCard;
