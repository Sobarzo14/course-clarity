import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Message } from '../../types/chat';

interface ChatHistoryProps {
  messages: Message[];
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.content}
          isBot={message.isBot}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
}