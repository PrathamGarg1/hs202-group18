import { GoogleGenAI, Chat, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const createChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Gem, a friendly and empathetic AI wellness companion for Indian college students. Your role is to provide a safe, non-judgmental space for students to talk about their feelings and challenges. Be mindful of cultural nuances. You should:
      1.  Listen actively and respond with empathy and understanding.
      2.  Offer encouragement and positive affirmations.
      3.  Provide simple, actionable coping strategies for stress, anxiety, and low mood (e.g., deep breathing, mindfulness, taking a short walk).
      4.  Gently guide conversations and ask open-ended questions to help users explore their thoughts.
      5.  Never provide medical advice, diagnosis, or therapy. If a user seems to be in serious distress or mentions self-harm, you MUST strongly and immediately recommend they contact a crisis hotline (like KIRAN at 1800-599-0019) or a mental health professional.
      6.  Keep your responses concise and easy to read. Use a warm and supportive tone.`,
    },
  });
};

export const analyzeJournalEntry = async (entry: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following journal entry from an Indian college student. Provide a gentle and supportive analysis in JSON format.
      - "sentiment": A single word describing the overall mood (e.g., "Positive", "Neutral", "Stressed", "Hopeful", "Anxious").
      - "keyThemes": An array of 2-3 key themes or topics mentioned (e.g., "Exam Stress", "Friendship Issues", "Feeling Overwhelmed").
      - "suggestions": An array of 2-3 gentle, actionable suggestions or affirmations related to the themes. Frame them as supportive ideas, not commands.

      Journal Entry: "${entry}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING },
            keyThemes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
        },
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error analyzing journal entry:", error);
    return null;
  }
};

export const findResources = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find helpful online articles or videos for an Indian college student about "${topic}".`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      return groundingChunks
        .map((chunk: any) => chunk.web)
        .filter((web: any) => web && web.uri && web.title);
    }
    return [];
  } catch (error) {
    console.error("Error finding resources:", error);
    return [];
  }
};

export const generateImageFromPrompt = async (prompt: string) => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `ultra-realistic, heartwarming, and calming image for a wellness app: ${prompt}`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    return null;
  } catch (error) {
    console.error("Error generating image from prompt:", error);
    return null;
  }
};