
import OpenAI from "openai";

// init openai client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export function getOpenai() {
  return openai
}