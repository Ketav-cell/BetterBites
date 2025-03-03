const express = require("express");
const fs = require("fs");
const cors = require("cors"); // Enables cross-origin requests from frontend
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // Allow frontend requests

const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const MODEL_NAME = "gemini-1.5-pro";

// Load system instructions for chatbot behavior
let systemInstructions;
try {
  systemInstructions = fs.readFileSync("rr.txt", "utf8");
} catch (err) {
  console.error("Failed to read system instructions:", err);
}

// AI chatbot function
async function runChat(userInput) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const chatSession = model.startChat({
    systemInstruction: systemInstructions,
    generationConfig: {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 1000,
    },
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });

  const result = await chatSession.sendMessage(userInput);
  return result.response.text();
}

// API endpoint for AI chat
app.post("/chat", async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    if (!userInput) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error("Error in chat endpoint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Serve static frontend files (React build)
app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/index.html"); // Load React frontend
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
