"use client";

import runFlow from "@/lib/langflow-client";
import { useState } from "react";

export default function PostAnalyzer() {
  const [postType, setPostType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<string | null>(null);


  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostType(e.target.value);
  };


  const handleSubmit = async () => {
    setIsLoading(true);
    const flowIdOrName = process.env.NEXT_PUBLIC_FLOW_ID_OR_NAME;
    const langflowId = process.env.NEXT_PUBLIC_LANGFLOW_ID;
    if (flowIdOrName && langflowId) {
      try {
        const tweaks = {
          "TextInput-VHOxL": {},
          "Agent-4RXYg": {},
          "AstraDBToolComponent-4DRur": {},
          "Agent-9roLF": {},
          "TextOutput-ZRVsf": {},
        };
        const response = await runFlow(flowIdOrName, langflowId, postType, tweaks);
        if (response) {
          console.log(response.outputs[0].outputs[0].outputs.text.message)
          setResponseData(response.outputs[0].outputs[0].outputs.text.message);
        }
      } catch (error: any) {
        console.error("Main Error", error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 p-4 animate-gradient">
      <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all hover:scale-105 hover:shadow-3xl border border-white/10">
        <h1 className="text-4xl font-bold text-center text-white mb-6 drop-shadow-lg">
          Social Media Post Analyzer
        </h1>
        <div className="flex flex-col space-y-6">
          <input
            className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            type="text"
            placeholder="Enter Post Type (e.g., Reels, Carousel, Images)"
            onChange={inputHandler}
            value={postType}
          />
          <button
            className="w-full bg-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12s5.373 12 12 12v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
                Loading...
              </div>
            ) : (
              "Analyze Post"
            )}
          </button>
          {responseData && (
            <div className="mt-6 p-4 bg-white/10 rounded-xl text-white">
              <h2 className="text-xl font-semibold mb-2">Analysis Result:</h2>
              <p>{responseData}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}