export interface Blob {
  id: string;
  name: string;
  image: string;
  creator: string;
  createdAt: string;
  memory?: string;
  color?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  blob?: Blob;
}

export interface Chat {
  id: string;
  friend: Friend;
  messages: Message[];
}