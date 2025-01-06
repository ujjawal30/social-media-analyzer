import React from "react";
import { AlertCircleIcon, LoaderIcon, SendHorizonalIcon } from "lucide-react";

interface PostInputProps {
  postType: string;
  setPostType: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  onSubmit: () => Promise<void>;
  error: string | null;
}

const PostInput: React.FC<PostInputProps> = ({ postType, setPostType, isLoading, onSubmit, error }) => {
  return (
    <div className="text-center space-y-2">
      <span className="block text-gray-700 font-semibold">Which type of post do you want to analyze?</span>
      <div className="flex items-center gap-2">
        <input
          id="post"
          type="text"
          className="w-full px-4 py-2 border-2 border-gray-200 rounded-full focus-visible:outline-blue-700 h-12"
          placeholder="e.g. reels, carousels, images"
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        />
        <button
          type="submit"
          onClick={onSubmit}
          className="btn-gradient text-white p-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading || !postType}
        >
          <SendHorizonalIcon size={28} />
        </button>
      </div>

      {isLoading && (
        <div className="text-gray-700 text-lg flex items-center justify-center font-semibold">
          <LoaderIcon size={28} className="inline-block animate-spin mr-2" />
          <span>Analyzing...</span>
        </div>
      )}

      {error && (
        <div className="text-red-700 text-lg flex items-center justify-center font-semibold">
          <AlertCircleIcon size={24} className="inline-block mr-2" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PostInput;
