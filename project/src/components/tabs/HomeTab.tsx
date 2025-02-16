import React from 'react';
import { useStore } from '../../store';
import { Sparkles, PlusCircle, Users, MessageSquare, Image } from 'lucide-react';

const HomeTab = () => {
  const darkMode = useStore((state) => state.darkMode);
  const setActiveTab = useStore((state) => state.setActiveTab);

  const features = [
    {
      icon: PlusCircle,
      title: '🎨 Create Blobs',
      description: 'Design and customize your own unique blob cards with memories and special moments.',
      tab: 'create'
    },
    {
      icon: Users,
      title: '👥 Connect',
      description: 'Find and add friends to share your blob collection with the community.',
      tab: 'friends'
    },
    {
      icon: MessageSquare,
      title: '💬 Chat',
      description: 'Exchange messages and blobs with friends in real-time conversations.',
      tab: 'chat'
    },
    {
      icon: Image,
      title: '🎁 Share',
      description: 'Send your favorite blobs to friends and collect memories together.',
      tab: 'blobs'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          Welcome to BlobShare
          <Sparkles className="w-8 h-8 text-primary" />
        </h1>
        <p className="text-xl">Share your favorite blobs with friends!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {features.map((feature) => (
          <button
            key={feature.title}
            onClick={() => setActiveTab(feature.tab)}
            className={`p-6 rounded-lg ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
            } retro-border transition-all duration-200 transform hover:scale-105 text-left`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <feature.icon className="w-6 h-6" />
              {feature.title}
            </h2>
            <p>{feature.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomeTab;