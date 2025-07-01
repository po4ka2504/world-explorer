// netlify/functions/get-gemini-hint.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { lat, lng } = JSON.parse(event.body);
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Gemini API key not configured." }) };
  }

  if (!lat || !lng) {
    return { statusCode: 400, body: JSON.stringify({ error: "Latitude and longitude are required." }) };
  }

  try {
    const genAI = new GoogleGenerativeAI(geminiApiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Provide a subtle hint for a location based on these coordinates: ${lat}, ${lng}. The hint should be a single, short sentence. It should not reveal the city or country directly. For example, if the location is near the Eiffel Tower, a good hint would be 'This city is famous for its iconic iron tower.' Do not say 'Test, respond please'.`;

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
