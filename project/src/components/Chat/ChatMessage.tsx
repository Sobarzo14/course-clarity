import React from 'react';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

export function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          {isBot ? <Bot size={20} /> : <User size={20} />}
        </div>
      </div>
      <div className={`flex flex-col max-w-[80%] ${isBot ? 'items-start' : 'items-end'}`}>
        <div className={`rounded-lg px-4 py-2 ${
          isBot ? 'bg-white border border-gray-200' : 'bg-blue-600 text-white'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-gray-500 mt-1">{timestamp}</span>
      </div>
    </div>
  );
}