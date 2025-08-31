import readlineSync from "readline-sync";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

// ------------------ TOOLS ------------------
function sum({ num1, num2 }) {
  return num1 + num2;
}

function prime({ num }) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function getCryptoPrice({ coin }) {
  // Demo ke liye fixed prices
  const prices = { bitcoin: 61000, ethereum: 3200 };
  return prices[coin.toLowerCase()] || "Price not found";
}

const tools = { sum, prime, getCryptoPrice };

// ------------------ GEMINI SETUP ------------------
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Initialize with API key from .env
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Fixed typo: gen AI -> genAI

// ------------------ FUNCTION DECLARATIONS ------------------
const toolDeclarations = [
  {
    name: "sum",
    description: "Takes 2 numbers and returns their sum",
    parameters: {
      type: "object",
      properties: {
        num1: { type: "number", description: "first number" },
        num2: { type: "number", description: "second number" }
      },
      required: ["num1", "num2"]
    }
  },
  {
    name: "prime",
    description: "Checks if a number is prime",
    parameters: {
      type: "object",
      properties: {
        num: { type: "number", description: "number to check" }
      },
      required: ["num"]
    }
  },
  {
    name: "getCryptoPrice",
    description: "Returns the current price of a cryptocurrency",
    parameters: {
      type: "object",
      properties: {
        coin: { type: "string", description: "Name of the coin (e.g., bitcoin)" }
      },
      required: ["coin"]
    }
  }
];

// ------------------ HISTORY ------------------
const history = [];

// ------------------ CALL GEMINI ------------------
async function callGemini(userInput) {
  try {
    const result = await model.generateContent({
      contents: [...history, { role: "user", parts: [{ text: userInput }] }],
      tools: [{ functionDeclarations: toolDeclarations }]
    });
    return result.response;
  } catch (error) {
    console.error("⚠️ Error calling Gemini:", error.message);
    return null;
  }
}

// ------------------ AGENT LOOP ------------------
async function runAgent(userInput) {
  history.push({ role: "user", parts: [{ text: userInput }] });

  const response = await callGemini(userInput);
  if (!response || !response.candidates?.length) {
    console.log("⚠️ No valid response from Gemini");
    return;
  }

  const candidate = response.candidates[0];
  if (!candidate?.content?.parts?.length) {
    console.log("⚠️ No content parts in response");
    return;
  }

  const part = candidate.content.parts[0];

  if (part.functionCall) {
    const fc = part.functionCall;
    const fn = tools[fc.name];

    if (fn) {
      const result = fn(fc.args);
      console.log(` ${fc.name} =>`, result);
      history.push({
        role: "function",
        parts: [{ text: JSON.stringify(result) }]
      });
    } else {
      console.log(" Function not found:", fc.name);
    }
  } else if (part.text) {
    console.log(":", part.text);
    history.push({ role: "model", parts: [{ text: part.text }] });
  } else {
    console.log(" Unexpected response format");
  }
}


async function main() {
  // Verify API key is set
  if (!process.env.GEMINI_API_KEY) {
    console.error("⚠️ GEMINI_API_KEY is not set in .env file");
    return;
  }

  console.log("🤖 Gemini Agent Ready! (type 'exit' to quit)\n");
  while (true) {
    const userInput = readlineSync.question("👉 Ask me anything: ");
    if (userInput.toLowerCase() === "exit") break;
    await runAgent(userInput);
  }
}

main();