"use client";

import AnalysisResult from "@/components/AnalysisResult";
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
          console.log("response........", response);
          console.log("data.........", response.outputs[0].outputs[0].outputs.text.message);
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
    <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-zinc-950 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-2xl transform transition-all border border-white/10">
          <h1 className="text-3xl font-semibold text-center text-white mb-2 drop-shadow-lg">EngageWise</h1>
          <h2 className="text-lg font-light text-center text-white/80 mb-6 drop-shadow-lg">AI-powered social media post analysis</h2>
          <div className="flex flex-col space-y-6">
            <input
              className="w-full px-4 py-3 rounded-xl border-2 border-white/20 bg-white/10 text-white placeholder-white/50 focus:border-[#6633ee] focus:outline-none focus:ring-2 focus:ring-[#6633ee] transition-all"
              type="text"
              placeholder="Enter Post Type (e.g., Reels, Carousel, Images)"
              onChange={inputHandler}
              value={postType}
            />
            <button
              className="w-full bg-[#6633ee] text-white py-3 rounded-xl font-semibold hover:bg-[#6633ee50] transition-all focus:outline-none focus:ring-2 focus:ring-[#6633ee70] focus:ring-offset-2 shadow-lg hover:shadow-xl flex items-center justify-center"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
            {responseData && <AnalysisResult result={responseData} />}
          </div>
        </div>
      </div>
    </div>
  );
}
