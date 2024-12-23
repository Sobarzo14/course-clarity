import React, { useState } from 'react';
import { ChatHistory } from './components/Chat/ChatHistory';
import { ChatInput } from './components/Chat/ChatInput';
import { PromptsPanel } from './components/Chat/PromptsPanel';
import { Message } from './types/chat';
import { Bot } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! How can I help you today?',
      isBot: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated response from the RAG system. In a real implementation, this would be generated based on retrieved relevant documents and an LLM.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col max-w-5xl mx-auto bg-white shadow-lg">
        {/* Header */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <Bot size={20} className="text-blue-600" />
            </div>
            <h1 className="text-xl font-semibold">RAG Assistant</h1>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <ChatHistory messages={messages} />
            </div>

            {/* Input area */}
            <div className="border-t border-gray-200 p-4">
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>
          </div>

          {/* Prompts panel */}
          <PromptsPanel onSelectPrompt={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}

export default App;