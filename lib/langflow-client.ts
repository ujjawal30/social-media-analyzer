class LangflowClient {
  baseURL: string;
  applicationToken: string;

  constructor(baseURL: string, applicationToken: string) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint: string, body: any, headers: { [key: string]: string } = { "Content-Type": "application/json" }) {
    headers["Authorization"] = `Bearer ${this.applicationToken}`;
    headers["Content-Type"] = "application/json";
    const url = `${this.baseURL}${endpoint}`;
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

  async initiateSession(
    flowId: string,
    langflowId: string,
    inputValue: string,
    inputType = "text",
    outputType = "text",
    stream = false,
    tweaks = {}
  ) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
    return this.post(endpoint, { input_value: inputValue, input_type: inputType, output_type: outputType, tweaks: tweaks });
  }

  // handleStream(streamUrl, onUpdate, onClose, onError) {
  //   const eventSource = new EventSource(streamUrl);

  //   eventSource.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     onUpdate(data);
  //   };

  //   eventSource.onerror = (event) => {
  //     console.error("Stream Error:", event);
  //     onError(event);
  //     eventSource.close();
  //   };

  //   eventSource.addEventListener("close", () => {
  //     onClose("Stream closed");
  //     eventSource.close();
  //   });

  //   return eventSource;
  // }

  async runFlow(
    flowIdOrName: string,
    langflowId: string,
    inputValue: string,
    tweaks = {},
    inputType = "text",
    outputType = "text",
    stream = false
    // onUpdate,
    // onClose,
    // onError
  ) {
    try {
      const initResponse = await this.initiateSession(flowIdOrName, langflowId, inputValue, inputType, outputType, stream, tweaks);
      console.log("Init Response:", initResponse);
      if (stream && initResponse && initResponse.outputs && initResponse.outputs[0].outputs[0].artifacts.stream_url) {
        const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
        console.log(`Streaming from: ${streamUrl}`);
        // this.handleStream(streamUrl, onUpdate, onClose, onError);
      }
      return initResponse;
    } catch (error) {
      console.error("Error running flow:", error);
      // onError("Error initiating session");
    }
  }
}

export default LangflowClient;
