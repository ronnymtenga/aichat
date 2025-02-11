// ReadOnlyEditor.tsx
"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface ReadOnlyEditorProps {
  content: string;
}

const ReadOnlyEditor: React.FC<ReadOnlyEditorProps> = ({ content }) => {
  return (
    <div>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default ReadOnlyEditor;
