import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Bookmark, BookmarkCheck, ChevronUp, ChevronDown } from 'lucide-react';
import { useBookmarks } from '../contexts/BookmarkContext';

type Difficulty = 'beginner' | 'medium' | 'pro';

interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: Difficulty;
}

const sampleQuestions: Record<string, Record<Difficulty, Question[]>> = {
  aws: {
    beginner: [
      {
        id: 'aws-b-1',
        question: 'What is AWS?',
        answer: 'Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon. It offers a wide range of services including computing power, storage, databases, networking, analytics, machine learning, and more, delivered on-demand over the internet.',
        topic: 'aws',
        difficulty: 'beginner'
      },
      {
        id: 'aws-b-2',
        question: 'What is EC2?',
        answer: 'Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity in the cloud. It allows you to launch virtual servers (instances) with various configurations of CPU, memory, storage, and networking capacity.',
        topic: 'aws',
        difficulty: 'beginner'
      }
    ],
    medium: [
      {
        id: 'aws-m-1',
        question: 'Explain the difference between S3 and EBS.',
        answer: 'S3 (Simple Storage Service) is object storage for storing files and data accessible via REST API, while EBS (Elastic Block Store) provides block-level storage volumes for EC2 instances. S3 is for web-accessible storage, EBS is for instance storage.',
        topic: 'aws',
        difficulty: 'medium'
      }
    ],
    pro: [
      {
        id: 'aws-p-1',
        question: 'How would you implement a multi-region disaster recovery strategy?',
        answer: 'Implement cross-region replication for data, use Route 53 for DNS failover, set up automated backups, configure CloudFormation for infrastructure replication, implement monitoring with CloudWatch, and establish RTO/RPO requirements.',
        topic: 'aws',
        difficulty: 'pro'
      }
    ]
  },
  kubernetes: {
    beginner: [
      {
        id: 'k8s-b-1',
        question: 'What is Kubernetes?',
        answer: 'Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications across clusters of hosts.',
        topic: 'kubernetes',
        difficulty: 'beginner'
      }
    ],
    medium: [
      {
        id: 'k8s-m-1',
        question: 'Explain the difference between Deployment and StatefulSet.',
        answer: 'Deployments manage stateless applications with identical pods, while StatefulSets manage stateful applications requiring stable network identities, persistent storage, and ordered deployment/scaling.',
        topic: 'kubernetes',
        difficulty: 'medium'
      }
    ],
    pro: [
      {
        id: 'k8s-p-1',
        question: 'How do you implement custom resource definitions (CRDs)?',
        answer: 'Create a CRD YAML manifest defining the schema, apply it to extend the Kubernetes API, then implement a custom controller to watch and manage the custom resources using client-go libraries.',
        topic: 'kubernetes',
        difficulty: 'pro'
      }
    ]
  },
  terraform: {
    beginner: [
      {
        id: 'tf-b-1',
        question: 'What is Terraform?',
        answer: 'Terraform is an Infrastructure as Code (IaC) tool that allows you to define and provision infrastructure using declarative configuration files. It supports multiple cloud providers and maintains state to track resource changes.',
        topic: 'terraform',
        difficulty: 'beginner'
      }
    ],
    medium: [
      {
        id: 'tf-m-1',
        question: 'Explain Terraform state and its importance.',
        answer: 'Terraform state is a file that maps real-world resources to your configuration. It tracks metadata, improves performance, and enables collaboration. It should be stored remotely and locked to prevent conflicts.',
        topic: 'terraform',
        difficulty: 'medium'
      }
    ],
    pro: [
      {
        id: 'tf-p-1',
        question: 'How do you implement Terraform modules for reusability?',
        answer: 'Create modules with input variables, outputs, and main.tf files. Use semantic versioning, implement proper variable validation, document usage, and publish to registries for team reuse.',
        topic: 'terraform',
        difficulty: 'pro'
      }
    ]
  },
  ansible: {
    beginner: [
      {
        id: 'ans-b-1',
        question: 'What is Ansible?',
        answer: 'Ansible is an open-source automation tool for configuration management, application deployment, and task automation. It uses YAML playbooks and is agentless, connecting to nodes via SSH.',
        topic: 'ansible',
        difficulty: 'beginner'
      }
    ],
    medium: [
      {
        id: 'ans-m-1',
        question: 'Explain Ansible roles and their structure.',
        answer: 'Ansible roles organize playbooks into reusable components with standardized directory structure including tasks, handlers, variables, templates, and files directories for better organization and reusability.',
        topic: 'ansible',
        difficulty: 'medium'
      }
    ],
    pro: [
      {
        id: 'ans-p-1',
        question: 'How do you implement Ansible Vault for secrets management?',
        answer: 'Use ansible-vault to encrypt sensitive data, store vault passwords securely, implement vault IDs for multiple vaults, and integrate with CI/CD pipelines using vault password files or scripts.',
        topic: 'ansible',
        difficulty: 'pro'
      }
    ]
  }
};

const QAScreen: React.FC = () => {
  const { topicId, difficulty } = useParams<{ topicId: string; difficulty: string }>();
  const navigate = useNavigate();
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(difficulty as Difficulty);

  const questions = sampleQuestions[topicId || '']?.[currentDifficulty] || [];
  const currentQuestion = questions[currentQuestionIndex];

  const isBookmarked = currentQuestion ? bookmarks.some(b => b.id === currentQuestion.id) : false;

  useEffect(() => {
    setCurrentQuestionIndex(0);
    setShowAnswer(false);
  }, [currentDifficulty]);

  const handleSwipeLeft = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    }
  };

  const handleSwipeRight = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowAnswer(false);
    }
  };

  const toggleBookmark = () => {
    if (!currentQuestion) return;
    
    if (isBookmarked) {
      removeBookmark(currentQuestion.id);
    } else {
      addBookmark(currentQuestion);
    }
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

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
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
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
            const handleTouchEnd = (endEvent: TouchEvent) => {
              const endX = endEvent.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) handleSwipeLeft();
                else handleSwipeRight();
              }
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {/* Question Section */}
          <div className="h-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 flex flex-col justify-center">
            <h2 className="text-white text-xl font-bold leading-tight">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Answer Section */}
          <div 
            className={`h-1/2 p-8 flex flex-col justify-center transition-all duration-500 ${
              showAnswer ? 'bg-green-50' : 'bg-gray-50'
            }`}
            onClick={toggleAnswer}
          >
            {showAnswer ? (
              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  {currentQuestion.answer}
                </p>
                <div className="flex items-center justify-center text-green-600">
                  <ChevronUp className="w-6 h-6" />
                  <span className="text-sm ml-2">Tap to hide</span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-500 mb-4">
                  <ChevronDown className="w-6 h-6" />
                </div>
                <p className="text-gray-600 text-lg font-medium">
                  Tap to reveal answer
                </p>
              </div>
            )}
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

      {/* Swipe Indicators */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        {currentQuestionIndex > 0 && (
          <div className="text-white/50 text-xs">← Previous</div>
        )}
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {currentQuestionIndex < questions.length - 1 && (
          <div className="text-white/50 text-xs">Next →</div>
        )}
      </div>
    </div>
  );
};

export default QAScreen;
