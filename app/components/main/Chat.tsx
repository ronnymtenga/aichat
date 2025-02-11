"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Timestamp } from 'firebase/firestore';
import 'simplebar-react/dist/simplebar.min.css';
import ChatMessages from './ChatBubbles';

type Message = {
  timestamp: Timestamp;
  sender: string;
  content: string;
  id: string;
};

interface ChatProps {
  messages: Message[];
  loading: boolean;
  id: string;
}

const Chat = ({ loading, id, messages }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null) as { current: HTMLDivElement };
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNearBottom() || (messages.length > 0 && messages[messages.length - 1].sender !== 'sender')) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isNearBottom = () => {
    const nearBottomThreshold = 100;
    const container = scrollContainerRef.current;
    if (!container) return false;
    return container.scrollHeight - container.scrollTop - container.clientHeight < nearBottomThreshold;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="h-16 px-4 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-sm sticky top-0 z-60">
        <div className="flex items-center h-full space-x-4">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center shadow-md">
            <span className="text-lg">👤</span>
          </div>
          
          {/* Chat Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-lg font-medium text-white leading-tight">
              {id ? `Chat ${id.slice(0, 4)}...` : 'Loading...'}
            </h2>
            <p className="text-sm text-zinc-400 leading-tight">Active</p>
          </div>
        </div>
      </header>

      {/* Messages container*/} 
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto scrollbar-hidden">
        <div className="max-w-[850px] mx-auto h-full px-4 lg:px-8 py-4">
          <ChatMessages 
            messages={messages.map(message => ({
              ...message,
              timestamp: (message.timestamp as any)?.toDate?.() || new Date(message.timestamp) || new Date()
            }))}
            loading={loading}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>     

    </div>
  );
};

export default Chat;