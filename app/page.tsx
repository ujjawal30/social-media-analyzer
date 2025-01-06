"use client";

import { useState } from "react";
import AnalysisResult from "@/components/AnalysisResult";
import PostInput from "@/components/PostInput";
import runFlow from "@/lib/langflow-client";

export default function PostAnalyzer() {
  const [postType, setPostType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);
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
        } else {
          setErrorMessage("Unable to analyze the post. Please try again.");
        }
      } catch (error: any) {
        console.error("Main Error", error.message);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="relative h-screen w-screen bg-blue-50">
      <div className="absolute h-full w-full bg-[radial-gradient(#1d4ed8_1px,#fff_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-white flex flex-col gap-8 sm:w-3/4 max-sm:w-11/12 lg:w-1/2 xl:w-2/5 p-8 rounded-2xl z-10">
          <div className="text-center space-y-1">
            <h1 className="text-4xl font-bold text-gradient">EngageWise</h1>
            <p className="text-sm text-gray-700">AI-powered social media post analysis tool</p>
          </div>

          {!responseData && <video autoPlay loop muted className="m-auto lg:w-1/2 xl:w-2/5 w-1/2" src="/logo.mp4" />}

          {!responseData ? (
            <PostInput postType={postType} setPostType={setPostType} isLoading={isLoading} onSubmit={handleSubmit} error={errorMessage} />
          ) : (
            <AnalysisResult postType={postType} setPostType={setPostType} result={responseData} setResult={setResponseData} />
          )}
        </div>
      </div>
    </div>
  );
}
