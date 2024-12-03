import React from 'react';
import { MessageSquare, Code, HelpCircle } from 'lucide-react';
import { PredefinedPrompt } from '../../types/chat';

interface PromptsPanelProps {
  onSelectPrompt: (prompt: string) => void;
}

export function PromptsPanel({ onSelectPrompt }: PromptsPanelProps) {
  const predefinedPrompts: PredefinedPrompt[] = [
    {
      id: '1',
      label: 'Project Overview',
      prompt: 'Can you give me an overview of this project?',
      category: 'general',
      icon: 'MessageSquare'
    },
    {
      id: '2',
      label: 'Code Examples',
      prompt: 'Can you show me some code examples?',
      category: 'technical',
      icon: 'Code'
    },
    {
      id: '3',
      label: 'Best Practices',
      prompt: 'What are the best practices for this project?',
      category: 'technical',
      icon: 'Code'
    },
    {
      id: '4',
      label: 'Troubleshooting',
      prompt: 'I need help troubleshooting an issue.',
      category: 'support',
      icon: 'HelpCircle'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'MessageSquare':
        return <MessageSquare size={16} />;
      case 'Code':
        return <Code size={16} />;
      case 'HelpCircle':
        return <HelpCircle size={16} />;
      default:
        return <MessageSquare size={16} />;
    }
  };

  return (
    <div className="bg-gray-50 border-l border-gray-200 p-4 w-80">
      <h2 className="text-lg font-semibold mb-4">Quick Prompts</h2>
      <div className="space-y-3">
        {predefinedPrompts.map((promptItem) => (
          <button
            key={promptItem.id}
            onClick={() => onSelectPrompt(promptItem.prompt)}
            className="w-full bg-white hover:bg-blue-50 transition-colors duration-200 rounded-lg p-3 shadow-sm border border-gray-200 flex items-center gap-3 text-left"
          >
            <div className="text-blue-600">
              {getIcon(promptItem.icon)}
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-900">{promptItem.label}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{promptItem.prompt}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}