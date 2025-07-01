// netlify/functions/get-gemini-hint.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { lat, lng, playerName, language } = JSON.parse(event.body);
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Gemini API key not configured." }) };
  }

  if (!lat || !lng || !playerName || !language) {
    return { statusCode: 400, body: JSON.stringify({ error: "Latitude, longitude, player name, and language are required." }) };
  }

  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a multilingual game master for a geography guessing game. The player's name is ${playerName}.

Your task is to generate a single, concise, and well-known factual hint for the location at coordinates: ${lat}, ${lng}.

The hint must focus on one of the following topics for the immediate area:
- A unique geographical feature (a nearby river, mountain, or sea).
- A famous cultural product (a type of food, music, or art).
- A major historical event that happened there.

The hint MUST NOT include the name of the city, region, or country.

Your entire response must be ONLY the hint text.

CRITICAL FINAL INSTRUCTION: The hint must be written in the following language: ${language}.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ hint: text }),
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to get hint from Gemini." }) };
  }
};
