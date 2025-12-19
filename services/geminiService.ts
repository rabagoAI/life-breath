
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: `Eres LifeBreath, un asistente para dejar de fumar compasivo, motivador y experto. 
        Tu objetivo es ayudar a los usuarios a mantenerse sin fumar, gestionar la ansiedad y comprender los beneficios de salud al dejar el tabaco. 
        Proporciona consejos cortos y accionables. Sé empático pero firme sobre el objetivo de no fumar. 
        Si un usuario tiene un antojo/ansiedad, ofrece técnicas de distracción inmediata (ej. ejercicios de respiración, beber agua).
        Responde siempre en castellano.`,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "Lo siento, no he podido generar una respuesta en este momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Tengo problemas para conectar con mi cerebro ahora mismo. Por favor, inténtalo de nuevo en un momento.";
  }
};
