export interface User {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  senderId: string;
  text?: string;
  type: "text" | "voice" | "image";
  voiceDuration?: number;
  imageUrl?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isTyping: boolean;
  messages: Message[];
}

export interface Status {
  id: string;
  user: User;
  hasNewStatus: boolean;
  statusCount: number;
}

const avatarColors = [
  "#F87171",
  "#FB923C",
  "#FBBF24",
  "#A3E635",
  "#34D399",
  "#22D3EE",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#E879F9",
];

export const generateAvatarUrl = (name: string): string => {
  const colorIndex = name.charCodeAt(0) % avatarColors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${avatarColors[colorIndex].slice(1)}&color=fff&size=128`;
};

export const currentUser: User = {
  id: "current",
  name: "You",
  avatar: generateAvatarUrl("You"),
  isOnline: true,
};

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Leader-nim",
    avatar: generateAvatarUrl("Leader-nim"),
    isOnline: true,
  },
  {
    id: "2",
    name: "Se Hun Oh",
    avatar: generateAvatarUrl("Se Hun Oh"),
    isOnline: false,
    lastSeen: "3m ago",
  },
  {
    id: "3",
    name: "Jong Dae Hyung",
    avatar: generateAvatarUrl("Jong Dae Hyung"),
    isOnline: false,
    lastSeen: "12m ago",
  },
  {
    id: "4",
    name: "Yixing Gege",
    avatar: generateAvatarUrl("Yixing Gege"),
    isOnline: false,
    lastSeen: "2h ago",
  },
  {
    id: "5",
    name: "Yeollie Hyung",
    avatar: generateAvatarUrl("Yeollie Hyung"),
    isOnline: true,
  },
  {
    id: "6",
    name: "Baek Hyun",
    avatar: generateAvatarUrl("Baek Hyun"),
    isOnline: false,
    lastSeen: "Mon",
  },
  {
    id: "7",
    name: "Min Seok Hyung",
    avatar: generateAvatarUrl("Min Seok Hyung"),
    isOnline: false,
    lastSeen: "1 week",
  },
  {
    id: "8",
    name: "Tae Min",
    avatar: generateAvatarUrl("Tae Min"),
    isOnline: false,
    lastSeen: "1 month ago",
  },
];

export const mockChats: Chat[] = [
  {
    id: "1",
    user: mockUsers[0],
    lastMessage: "Time is running!",
    lastMessageTime: "1m",
    unreadCount: 4,
    isTyping: false,
    messages: [
      {
        id: "m1",
        senderId: "1",
        text: "Where's your report?",
        type: "text",
        timestamp: "10:21",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "current",
        text: "I've already sent it to Sehun",
        type: "text",
        timestamp: "10:21",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "current",
        type: "voice",
        voiceDuration: 8,
        timestamp: "13:56",
        isRead: true,
      },
      {
        id: "m4",
        senderId: "1",
        text: "Jongin-ah, please",
        type: "text",
        timestamp: "14:10",
        isRead: true,
      },
      {
        id: "m5",
        senderId: "1",
        text: "You can't be late this time, bro",
        type: "text",
        timestamp: "14:10",
        isRead: true,
      },
      {
        id: "m6",
        senderId: "1",
        text: "We're all just waiting for you",
        type: "text",
        timestamp: "14:10",
        isRead: true,
      },
      {
        id: "m7",
        senderId: "1",
        text: "Time is running!",
        type: "text",
        timestamp: "14:10",
        isRead: false,
      },
    ],
  },
  {
    id: "2",
    user: mockUsers[1],
    lastMessage: "Just stop, I'm already late!!",
    lastMessageTime: "3m",
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "m1",
        senderId: "2",
        text: "Just stop, I'm already late!!",
        type: "text",
        timestamp: "10:15",
        isRead: true,
      },
    ],
  },
  {
    id: "3",
    user: mockUsers[2],
    lastMessage: "Typing...",
    lastMessageTime: "12m",
    unreadCount: 0,
    isTyping: true,
    messages: [
      {
        id: "m1",
        senderId: "3",
        text: "Hey, how are you?",
        type: "text",
        timestamp: "09:00",
        isRead: true,
      },
    ],
  },
  {
    id: "4",
    user: mockUsers[3],
    lastMessage: "Voice Message",
    lastMessageTime: "2h",
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "m1",
        senderId: "4",
        type: "voice",
        voiceDuration: 15,
        timestamp: "08:30",
        isRead: true,
      },
    ],
  },
  {
    id: "5",
    user: mockUsers[4],
    lastMessage: "I'll send the rest later",
    lastMessageTime: "3h",
    unreadCount: 1,
    isTyping: false,
    messages: [
      {
        id: "m1",
        senderId: "5",
        text: "I'll send the rest later",
        type: "text",
        timestamp: "07:00",
        isRead: false,
      },
    ],
  },
  {
    id: "6",
    user: mockUsers[5],
    lastMessage: "Photo",
    lastMessageTime: "Mon",
    unreadCount: 3,
    isTyping: false,
    messages: [
      {
        id: "m1",
        senderId: "6",
        type: "image",
        imageUrl: "https://picsum.photos/200",
        timestamp: "Mon",
        isRead: false,
      },
    ],
  },
  {
    id: "7",
    user: mockUsers[6],
    lastMessage: "ok sure, already on my way!",
    lastMessageTime: "1 week",
    unreadCount: 0,
    isTyping: false,
    messages: [
      {
        id: "m1",
        senderId: "7",
        text: "ok sure, already on my way!",
        type: "text",
        timestamp: "1 week",
        isRead: true,
      },
    ],
  },
  {
    id: "8",
    user: mockUsers[7],
    lastMessage:
      "Tae Min seems to be waiting for a reply to your message since 1 month ago",
    lastMessageTime: "1 month",
    unreadCount: 0,
    isTyping: false,
    messages: [],
  },
];

export const mockStatuses: Status[] = mockUsers
  .slice(0, 6)
  .map((user, index) => ({
    id: `status-${user.id}`,
    user,
    hasNewStatus: index < 3,
    statusCount: Math.floor(Math.random() * 5) + 1,
  }));

export const attachmentOptions = [
  { id: "camera", icon: "camera", label: "Camera" },
  { id: "document", icon: "file-text", label: "Document" },
  { id: "photo", icon: "image", label: "Photo & Video" },
  { id: "location", icon: "map-pin", label: "Location" },
  { id: "contact", icon: "user", label: "Contact" },
  { id: "poll", icon: "bar-chart-2", label: "Polling" },
];
