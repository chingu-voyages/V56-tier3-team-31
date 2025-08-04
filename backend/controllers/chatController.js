const { GoogleGenAI } = require("@google/genai");
const { PROJECT_FAQ_CONTEXT } = require("../utils");
const { StatusCodes } = require("http-status-codes");
const createChatResponse = async (req, res) => {
  const { prompt } = req.body;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${PROJECT_FAQ_CONTEXT.concat(" ", prompt)}`,
  });
  console.log(response.text);

  res.status(StatusCodes.CREATED).json({ response: response.text });
};

module.exports = { createChatResponse };
