"use server"
const baseURL = "https://api.langflow.astra.datastax.com";
const applicationToken = process.env.APPLICATION_TOKEN || "";

if (!applicationToken) {
  throw new Error("Application token is not defined in environment variables.");
}

async function post(endpoint: string, body: any, headers: { [key: string]: string } = { "Content-Type": "application/json" }) {
  headers["Authorization"] = `Bearer ${applicationToken}`;
  headers["Content-Type"] = "application/json";
  const url = `${baseURL}${endpoint}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    const responseMessage = await response.json();
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
    }
    return responseMessage;
  } catch (error: any) {
    console.error("Request Error:", error.message);
    throw error;
  }
}

async function initiateSession(flowId: string, langflowId: string, inputValue: string, tweaks = {}) {
  const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=false`;
  return post(endpoint, { input_value: inputValue, input_type: "text", output_type: "text", tweaks: tweaks });
}

async function runFlow(flowIdOrName: string, langflowId: string, postType: string, tweaks = {}) {
  try {
    const initResponse = await initiateSession(flowIdOrName, langflowId, postType, tweaks);
    return initResponse;
  } catch (error) {
    console.error("Error running flow:", error);
  }
}

export default runFlow;