import React from "react";
import ReactMarkdown from "react-markdown";

interface AnalysisResultProps {
  result: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="mt-6 p-6 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-2xl shadow-2xl text-white transform transition-all hover:scale-105 hover:shadow-3xl">
      <h2 className="text-2xl font-bold mb-4">Analysis Result:</h2>
      <ReactMarkdown>{result}</ReactMarkdown>
    </div>
  );
};

export default AnalysisResult;
