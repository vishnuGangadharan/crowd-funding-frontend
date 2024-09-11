export interface Message {
    senderId: string | null;
    recipientId: string;
    message?: string;
    mediaUrl?: string;
    messageType?: string;
    createdAt?: Date | undefined
  }
  
 export interface Conversation {
    recipientId: string;
    name: string;
    _id: string;
    profilePicture: string;
  }
  
 export type onlineUser = {
    userId: string;
    socketId: string;
  };

 export interface chatProps {
    conversations: Conversation[];
    recipientId: string;
    messages: Message[];
    currentUserId: string;
    onlineUsers?: onlineUser[];
    lastSeenUser? : lastSeenProps[]
  }

  export  interface ConversationsProps {
    conversations: Conversation[]; 
    handleUserClick: (id: string) => void; 
    senderId: string;
    recipientId: string;
    isRecipientTyping: boolean;
    unreadCounts: { [key: string]: number };
    onlineUsers: onlineUser[];
    lastSeenUser? : lastSeenProps
  }

  export interface lastSeenProps {
    _id?:string;
    lastSeen: Date;
  }