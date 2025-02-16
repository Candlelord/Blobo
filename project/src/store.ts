import { create } from 'zustand';
import { Blob, Friend, Chat, Message } from './types';

// Generate 100 random profiles
const generateProfiles = () => {
  const profiles: Friend[] = [];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tara'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  
  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const gender = Math.random() > 0.5 ? 'men' : 'women';
    const id = Math.floor(Math.random() * 100);
    
    profiles.push({
      id: `user${i}`,
      name,
      avatar: `https://randomuser.me/api/portraits/${gender}/${id}.jpg`,
      online: Math.random() > 0.5,
      lastMessage: Math.random() > 0.5 ? 'Check out this cool blob!' : undefined,
      lastMessageTime: new Date(Date.now() - Math.random() * 86400000).toISOString()
    });
  }
  return profiles;
};

const searchableProfiles = generateProfiles();

interface AppState {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  blobs: Blob[];
  addBlob: (blob: Blob) => void;
  friends: Friend[];
  addFriend: (friend: Friend) => void;
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string | null) => void;
  sendMessage: (chatId: string, message: Message) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCreatingBlob: boolean;
  setIsCreatingBlob: (isCreating: boolean) => void;
  selectedBlob: Blob | null;
  setSelectedBlob: (blob: Blob | null) => void;
  searchableProfiles: Friend[];
  searchProfiles: (query: string) => Friend[];
  blobCategories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
  blobs: [],
  addBlob: (blob) => set((state) => ({ blobs: [...state.blobs, blob] })),
  friends: [],
  addFriend: (friend) => set((state) => ({ friends: [...state.friends, friend] })),
  chats: [],
  activeChat: null,
  setActiveChat: (chatId) => set({ activeChat: chatId }),
  sendMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat
      ),
    })),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  isCreatingBlob: false,
  setIsCreatingBlob: (isCreating) => set({ isCreatingBlob: isCreating }),
  selectedBlob: null,
  setSelectedBlob: (blob) => set({ selectedBlob: blob }),
  searchableProfiles,
  searchProfiles: (query: string) => {
    const profiles = get().searchableProfiles;
    if (!query) return [];
    return profiles.filter(profile => 
      profile.name.toLowerCase().includes(query.toLowerCase()) &&
      !get().friends.some(friend => friend.id === profile.id)
    );
  },
  blobCategories: ['All', 'Memories', 'Friends', 'Created', 'Favorites'],
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));