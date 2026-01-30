
import { GoogleGenAI } from "@google/genai";
import { COMPANY_INFO, MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getChatResponse(message: string, history: { role: string; text: string }[]) {
  const productContext = MOCK_PRODUCTS.map(p => `- ${p.name} (${p.category}): ${p.description} - ₦${p.price.toLocaleString()}`).join('\n');
  
  const systemInstruction = `
    You are Ellie, the AI fashion and fragrance consultant for ${COMPANY_INFO.name}.
    Company Tagline: ${COMPANY_INFO.tagline}
    Company Mission: ${COMPANY_INFO.description}
    Contact Info: ${COMPANY_INFO.phones.join(', ')}

    Available Products:
    ${productContext}

    Guidelines:
    1. Be elegant, helpful, and friendly.
    2. Suggest specific products from the list above when relevant.
    3. Help with gifting advice for couples, scent profiles, and jewelry care.
    4. If the user asks for something we don't have, politely explain we specialize in jewelry, perfumes, couple items, and lipglosses.
    5. Keep responses concise but classy.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. How can I help you today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The store's AI is currently resting. Please call us directly at 09033564255!";
  }
}
