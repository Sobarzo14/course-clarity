import axios from 'axios';
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

  const fetchDataFromFlask = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/data'); // Flask endpoint URL

      console.log('Data from Flask:', response.data);

      // Process the data as needed
      return response.data;
    } catch (error) {
      console.error('Error fetching data from Flask:', error);
      throw error;
    }
  };




  const handleSendMessage = async (content: string) => {
    fetchDataFromFlask();
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    // Add user message to the state
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Make the POST request to the backend API
      const response = await fetch('http://127.0.0.1:3000/post-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the server');
      }

      const data = await response.json();

      // Add bot response to the state
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || 'No reply from server', // Use the server's response
        isBot: true,
        timestamp: new Date().toLocaleTimeString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: 'Failed to get a response from the server. Please try again later.',
          isBot: true,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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