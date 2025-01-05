import React from "react";
import ReactMarkdown from "react-markdown";
import { XIcon } from "lucide-react";

interface AnalysisResultProps {
  postType: string;
  setPostType: React.Dispatch<React.SetStateAction<string>>;
  result: string;
  setResult: React.Dispatch<React.SetStateAction<string | null>>;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, postType, setPostType, setResult }) => {
  const clearResult = () => {
    setPostType("");
    setResult(null);
  };

  return (
    <div className="flex flex-col gap-4 text-gray-700">
      <div className="font-semibold flex gap-2 text-lg justify-start">
        <h3 className="text-gradient">Post Type: </h3>
        <span className="flex-1 text-left">{postType}</span>
        <button onClick={clearResult}>
          <XIcon size={24} />
        </button>
      </div>

      <ReactMarkdown
        className="prose text-left max-h-96 overflow-auto"
        components={{
          ul: ({ children }) => <ul className="list-disc list-inside mt-1 mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal list-inside mt-1 mb-2">{children}</ol>,
          h4: ({ children }) => <h4 className="font-semibold">{children}</h4>,
          h3: ({ children }) => <h3 className="text-lg font-semibold text-gradient">{children}</h3>,
          h2: ({ children }) => <h2 className="text-xl font-bold text-gradient">{children}</h2>,
          h1: ({ children }) => <h1 className="text-2xl font-bold text-gradient">{children}</h1>,
        }}
      >
        {result}
      </ReactMarkdown>
    </div>
  );
};

export default AnalysisResult;
