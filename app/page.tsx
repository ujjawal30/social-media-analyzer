"use client";

import runFlow from "@/lib/langflow-client";
import { useState } from "react";

export default function Page() {
  const [postType, setPostType] = useState("");
  const inputHandler = (e: any) => {
    setPostType(e.target.value);
  };

  const handleSubmit = async () => {
    const flowIdOrName = process.env.NEXT_PUBLIC_FLOW_ID_OR_NAME 
    const langflowId = process.env.NEXT_PUBLIC_LANGFLOW_ID
    if (flowIdOrName && langflowId){
      try {
        const tweaks = {
          "TextInput-VHOxL": {},
          "Agent-4RXYg": {},
          "AstraDBToolComponent-4DRur": {},
          "Agent-9roLF": {},
          "TextOutput-ZRVsf": {},
        };
        const response = await runFlow(flowIdOrName, langflowId, postType, tweaks);
        if (response && response.outputs) {
          const output = response.outputs[0].outputs[0].outputs.text.message
          console.log(output)
        }
      } catch (error: any) {
        console.error("Main Error", error.message);
      }
    }
  };
  
  return (
    <div className="flex w-full max-w-sm items-center space-x-2 m-auto h-screen">
      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        type="text"
        placeholder="Post Type"
        onChange={inputHandler}
      />
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        type="submit"
        onClick={handleSubmit}
      >
        Analyze
      </button>
    </div>
  );
}
