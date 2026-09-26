import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    message: "Person 3 AI backend is running!"
  });
});

app.post("/api/retheme", async (req, res) => {
  try {
    const { theme } = req.body;

    const prompt = `
You are an educational question re-theming assistant.

You are given a LOCKED physics question.

LOCKED EDUCATIONAL INFORMATION:
Concept: Ohm's Law
Resistance: 5
Current: 2
Formula: V = I × R
Correct answer: 10
Answer unit: V
Operation: multiplication
Difficulty: 2
Learning objective: Calculate voltage using Ohm's Law

Student interest/theme:
${theme}

Your job:
Change ONLY the narrative/story so that it relates to the student's interest.

DO NOT change:
- resistance
- current
- formula
- correct answer
- answer unit
- operation
- concept
- difficulty
- learning objective

Return ONLY valid JSON.
Do not use markdown.
Do not use code fences.

The JSON must have exactly these fields:

{
  "concept": "Ohm's Law",
  "difficulty": 2,
  "learningObjective": "Calculate voltage using Ohm's Law",
  "lockedVariables": {
    "resistance": 5,
    "current": 2
  },
  "formula": "V = I × R",
  "correctAnswer": 10,
  "answerUnit": "V",
  "operation": "multiplication",
  "theme": "${theme}",
  "narrative": "your themed story",
  "question": "your complete question"
}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3
    });

    const generatedText =
      completion.choices[0]?.message?.content || "";

    const cleanedText = generatedText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const generatedQuestion = JSON.parse(cleanedText);

    res.json({
      success: true,
      generatedQuestion
    });

  } catch (error) {
    console.error("Groq API error:", error);

    res.status(500).json({
      success: false,
      error: "Failed to generate themed question."
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`AI server running at http://localhost:${PORT}`);
});