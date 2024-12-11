import React from 'react';
import { MessageSquare, Table, Backpack, Book, PencilLine } from 'lucide-react';
import { PredefinedPrompt } from '../../types/chat';

interface PromptsPanelProps {
  onSelectPrompt: (prompt: string) => void;
}

export function PromptsPanel({ onSelectPrompt }: PromptsPanelProps) {
  const predefinedPrompts: PredefinedPrompt[] = [
    {
      id: '1',
      label: 'Exam Format',
      prompt: 'Describe the nature of the exams in this course.',
      category: 'technical',
      icon: 'PencilLine'
    },
    {
      id: '2',
      label: 'Reading Requirements',
      prompt: 'Is there a required text for this course?',
      category: 'technical',
      icon: 'Book'
    },
    {
      id: '3',
      label: 'Attendance Policy',
      prompt: 'What is the attendance policy for this course?',
      category: 'technical',
      icon: 'Backpack'
    },
    {
      id: '4',
      label: 'Due Date Calendar',
      prompt: 'Provide a table with all the assignments, exams, and due dates for the course.',
      category: 'technical',
      icon: 'Table'
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Table':
        return <Table size={16} />;
      case 'Backpack':
        return <Backpack size={16} />;
      case 'Book':
        return <Book size={16} />;
      case 'PencilLine':
        return <PencilLine size={16} />;
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