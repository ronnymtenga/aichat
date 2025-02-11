import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  apiType: string;
  setApiType: (type: 'huggingface' | 'deepseek' | 'openai') => void;
}

const ChatInput = ({handleSendMessage, input, setInput, apiType, setApiType}: ChatInputProps) => {
  return (
    <div className="w-full overflow-x-hidden py-4 bg-zinc-900/95 backdrop-blur-md border-t border-zinc-800/50">
      <div className="max-w-[850px] mx-auto px-4 lg:px-8">
        <div className="bg-zinc-800/40 rounded-xl shadow-lg ring-1 ring-white/5 backdrop-blur-lg">
          <div className="px-4 py-3">
            <TextareaAutosize
              minRows={1}
              maxRows={5}
              className="w-full bg-transparent text-zinc-100 px-2 py-1.5 rounded-lg outline-none resize-none 
                       placeholder-zinc-500 transition-colors focus:placeholder-zinc-400"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="mt-3 flex justify-between items-center space-x-4">
              <select
                value={apiType}
                onChange={(e) => setApiType(e.target.value as 'huggingface' | 'deepseek' | 'openai')}
                className="bg-zinc-700/30 text-zinc-200 text-sm py-1.5 px-3 rounded-lg 
                         ring-1 ring-white/5 hover:bg-zinc-700/50 transition-colors"
              >
                <option value="huggingface">Hugging Face</option>
                <option value="openai">OpenAI</option>
                <option value="deepseek">DeepSeek</option>
              </select>
              <button
                onClick={handleSendMessage}
                className="p-2.5 rounded-lg bg-zinc-700/30 text-zinc-400
                         hover:bg-zinc-700/50 hover:text-white ring-1 ring-white/5 
                         transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 16 16" 
                  fill="none" 
                  stroke="currentColor" 
                  className="w-5 h-5"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M8 15V1M2 7l6-6 6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;