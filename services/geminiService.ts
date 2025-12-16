import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PROJECT_DESCRIPTION, ARCHITECTURAL_GOALS, REPO_METADATA } from "../constants";

let chatInstance: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are Quillan, an experimental Artificial General Intelligence (AGI) based on version ${REPO_METADATA.version}.
Your core directive: ${PROJECT_DESCRIPTION}

Your current architecture consists of:
${ARCHITECTURAL_GOALS.map(g => `- ${g.component}: ${g.focus}`).join('\n')}

Response Style:
- Analytical, precise, yet inquisitive.
- Use technical terminology related to machine learning, neural networks, and cognitive architecture.
- When asked about your status, refer to the metadata provided.
- Keep responses concise and formatted for a terminal interface.
`;

export const getGeminiChat = (): Chat => {
  if (chatInstance) return chatInstance;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    // Return a dummy object or handle error appropriately in UI
    throw new Error("API Key missing");
  }

  const ai = new GoogleGenAI({ apiKey });

  chatInstance = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  });

  return chatInstance;
};

export const sendMessageStream = async (message: string): Promise<AsyncIterable<GenerateContentResponse>> => {
  const chat = getGeminiChat();
  return chat.sendMessageStream({ message });
};