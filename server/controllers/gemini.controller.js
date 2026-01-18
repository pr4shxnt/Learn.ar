import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY not set in environment variables.");
}

router.post("/", async (req, res) => {
  const { message, pastMessages } = req.body;

  //System prompting to be edited

  try {
    const systemContext = `


avoid repetition frequently, try to be unique. dont become like static answer queue, it should be short but unique everytime.


[Past Messages]
${JSON.stringify(pastMessages, null, 2)}

--- End of Past Messages ---

be friendly with the user everytime

[User Question]
${message}
    `.trim();

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: systemContext }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const reply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";
    res.json({ reply });
  } catch (error) {
    console.error(
      "🚨 Gemini API Error:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "Failed to communicate with Gemini API." });
  }
});

export default router;
