"use client";

import LangflowClient from "@/lib/langflow-client";
import { useState } from "react";

export default function Page() {
  const [postType, setPostType] = useState("");
  const inputHandler = (e: any) => {
    setPostType(e.target.value);
  };

  const handleSubmit = async () => {
    console.log(postType);

    const flowIdOrName = "693ea184-583f-4aa3-8f7e-714074ad788b";
    const langflowId = "447d8833-423b-4959-af6c-d50bbb3943c2";
    const applicationToken = "AstraCS:jthZjCEJLelSwmUmiNalOZtY:60c6109068c71a75fa3b1fb595d6b9b388f80aaa83194798b71ef66e466fe323";
    const langflowClient = new LangflowClient("https://api.langflow.astra.datastax.com", applicationToken);

    try {
      const tweaks = {
        "TextInput-VHOxL": {},
        "Agent-4RXYg": {},
        "AstraDBToolComponent-4DRur": {},
        "Agent-9roLF": {},
        "TextOutput-ZRVsf": {},
      };

      const response = await langflowClient.runFlow(flowIdOrName, langflowId, postType, tweaks);
      if (response && response.outputs) {
        const flowOutputs = response.outputs[0];
        const firstComponentOutputs = flowOutputs.outputs[0];
        const output = firstComponentOutputs.outputs.message;

        console.log("Final Output:", output.message.text);
      }
    } catch (error: any) {
      console.error("Main Error", error.message);
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
