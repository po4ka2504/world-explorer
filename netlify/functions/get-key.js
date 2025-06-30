// This is the SAME function, but written using ES Module syntax.
// Note the `export const handler` at the beginning.

export const handler = async (event, context) => {
  // Access the environment variable set in the Netlify UI
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API Key not found on server. Make sure it is set in Netlify build settings.' })
    };
  }

  // Send the key back to the game in a JSON format
  return {
    statusCode: 200,
    body: JSON.stringify({ apiKey: apiKey }),
  };
};