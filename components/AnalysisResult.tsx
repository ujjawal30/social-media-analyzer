import React from "react";
import ReactMarkdown from "react-markdown";

interface AnalysisResultProps {
  result: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="mt-6 p-6 bg-[#6633ee50] rounded-2xl shadow-2xl text-white transform transition-all overflow-auto max-h-[50vh] space-y-4">
      <h2 className="text-2xl font-bold">{result ? "Analysis Result:" : "Unable to analyze the post. Please try again."}</h2>
      <ReactMarkdown
        className="prose text-white"
        components={{
          ul: ({ children }) => <ul className="list-disc list-inside">{children}</ul>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-white">{children}</h3>,
        }}
      >
        {result}
      </ReactMarkdown>
    </div>
  );
};

export default AnalysisResult;
