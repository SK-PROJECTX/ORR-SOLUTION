"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
  type: 'text' | 'file' | 'image';
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar: string;
  online: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: "ORR Support Team",
    lastMessage: "We'll help you with your project setup",
    timestamp: "2 min ago",
    unread: 2,
    avatar: "🎧",
    online: true
  },
  {
    id: 2,
    name: "John Smith - Consultant",
    lastMessage: "The meeting notes are ready for review",
    timestamp: "1 hour ago",
    unread: 0,
    avatar: "👨‍💼",
    online: true
  },
  {
    id: 3,
    name: "Project Manager",
    lastMessage: "Timeline looks good, let's proceed",
    timestamp: "3 hours ago",
    unread: 1,
    avatar: "📋",
    online: false
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    sender: 'support',
    timestamp: new Date(Date.now() - 3600000),
    type: 'text'
  },
  {
    id: 2,
    text: "Hi, I need help setting up my project dashboard",
    sender: 'user',
    timestamp: new Date(Date.now() - 3500000),
    type: 'text'
  },
  {
    id: 3,
    text: "I'd be happy to help you with that! Let me guide you through the process step by step.",
    sender: 'support',
    timestamp: new Date(Date.now() - 3400000),
    type: 'text'
  },
  {
    id: 4,
    text: "First, you'll want to navigate to the dashboard section and click on 'Create New Project'",
    sender: 'support',
    timestamp: new Date(Date.now() - 3300000),
    type: 'text'
  },
  {
    id: 5,
    text: "Perfect! I can see the option now. What should I do next?",
    sender: 'user',
    timestamp: new Date(Date.now() - 120000),
    type: 'text'
  }
];

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<Chat>(mockChats[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');

      // Simulate response
      setTimeout(() => {
        const response: Message = {
          id: messages.length + 2,
          text: "Thanks for your message! I'll get back to you shortly.",
          sender: 'support',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const filteredChats = mockChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen bg-background flex">
      {/* Sidebar - Chat List */}
      <div className="w-80 bg-card border-r border-secondary flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-secondary">
          <h1 className="text-xl font-semibold text-foreground mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground opacity-40 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary border border-secondary rounded-lg text-foreground placeholder:opacity-60 focus:border-primary outline-none"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-secondary cursor-pointer hover:bg-secondary/50 transition-colors ${
                selectedChat.id === chat.id ? 'bg-secondary/30 border-l-4 border-l-primary' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-xl">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                    <span className="text-xs text-foreground opacity-60">{chat.timestamp}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-foreground opacity-70 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="bg-primary text-black text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-card border-b border-secondary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-lg">
                {selectedChat.avatar}
              </div>
              {selectedChat.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
              )}
            </div>
            <div>
              <h2 className="font-semibold text-foreground">{selectedChat.name}</h2>
              <p className="text-xs text-foreground opacity-60">
                {selectedChat.online ? 'Online' : 'Last seen 2 hours ago'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Phone className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Video className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <MoreVertical className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-black'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-black/70' : 'text-foreground/60'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-card border-t border-secondary">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Paperclip className="w-5 h-5 text-foreground" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="w-full px-4 py-3 bg-secondary border border-secondary rounded-lg text-foreground placeholder:opacity-60 focus:border-primary outline-none pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-secondary/80 transition-colors">
                <Smile className="w-5 h-5 text-foreground opacity-60" />
              </button>
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="p-3 rounded-lg bg-primary text-black hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}