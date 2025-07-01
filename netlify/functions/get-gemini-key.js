// netlify/functions/get-gemini-key.js
export const handler = async (event, context) => {
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (!geminiApiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gemini API Key not found on server.' })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey: geminiApiKey }),
  };
};
