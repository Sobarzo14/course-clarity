export interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: string;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}

export interface PredefinedPrompt {
  id: string;
  label: string;
  prompt: string;
  category: 'class structure' | 'materials' | 'policies' | 'assignments';
  icon: string;
}
