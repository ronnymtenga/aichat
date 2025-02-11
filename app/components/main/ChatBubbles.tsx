import React, { useState, useEffect, useRef } from 'react';
import ReadOnlyEditor from "./ReadOnlyEditor";
import toast from 'react-hot-toast';

// First, update the Message type to reflect what we're actually receiving
type Message = {
  timestamp: Date;  // Changed from Timestamp to Date
  sender: string;
  content: string;
  id: string;
};

interface ChatBubblesProps {
  messages: Message[];
  loading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatBubbles = ({ messages, loading, messagesEndRef }: ChatBubblesProps) => {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set a timer to hide the component after 5 seconds (5000ms)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 700);

    // Clean up the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  const exportToNotion = async (content: string) => {
    try {
      const response = await fetch('/api/notion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) throw new Error('Failed to export to Notion');
      toast.success('Exported to Notion successfully!');
    } catch (error) {
      console.error('Error exporting to Notion:', error);
      toast.error('Failed to export to Notion');
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-GB', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="py-4 space-y-6 relative">
      {/* Overlay - covers only the chat messages container */}
        <div 
          className={`absolute inset-0 bg-zinc-900 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        />

        {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`
            ${message.sender === 'user' 
              ? 'max-w-[55ch] lg:max-w-[65ch]' 
              : 'max-w-[85%] lg:max-w-[75%]'}
            rounded-2xl py-1.5 px-4
            font-light leading-snug tracking-wide
            text-[15px] subpixel-antialiased
            ${message.sender === 'user' 
              ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-slate-100 ring-1 ring-slate-600/20' 
              : 'bg-zinc-800/90 text-zinc-100 shadow-sm shadow-black/10'}
          `}>
            <div className="space-y-0.5">
              <ReadOnlyEditor content={message.content} />
              <div className="flex items-center justify-between gap-4 mt-1">
                {message.sender === 'bot' && (
                  <button 
                    className="text-[11px] font-normal tracking-wider text-zinc-400 
                               hover:text-indigo-300 transition-colors whitespace-nowrap"
                    onClick={() => exportToNotion(message.content)}
                  >
                    Export to Notion
                  </button>
                )}
                <span className={`text-[10px] font-light tracking-wider whitespace-nowrap ml-auto ${
                  message.sender === 'user' 
                    ? 'text-slate-300/70' 
                    : 'text-zinc-500/70'
                }`}>
                  {formatTimestamp(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="flex justify-center p-4 text-zinc-500">
          <span>Bot is typing...</span>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBubbles;