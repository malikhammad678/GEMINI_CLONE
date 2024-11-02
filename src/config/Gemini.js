import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";
  
  const apiKey = "YOUR_API_KEY"; 
  const genAI = new GoogleGenerativeAI(apiKey);
  

  const model = await genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
const runChat = async (prompt) =>  {
    const chatSession = model.startChat({
      generationConfig,
      history: [], 
    });
    const result = await chatSession.sendMessage(prompt);
    console.log(result.response.text());
    return result.response.text();
  }

  export default runChat
  