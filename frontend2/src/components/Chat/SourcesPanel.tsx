import React from 'react';
import { FileText } from 'lucide-react';

interface Source {
  id: string;
  title: string;
  excerpt: string;
  relevance: number;
}

interface SourcesPanelProps {
  sources: Source[];
}

export function SourcesPanel({ sources }: SourcesPanelProps) {
  return (
    <div className="bg-gray-50 border-l border-gray-200 p-4 w-80">
      <h2 className="text-lg font-semibold mb-4">Reference Sources</h2>
      <div className="space-y-4">
        {sources.map((source) => (
          <div key={source.id} className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={16} className="text-blue-600" />
              <h3 className="font-medium text-sm">{source.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{source.excerpt}</p>
            <div className="mt-2 text-xs text-gray-500">
              Relevance: {Math.round(source.relevance * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}