import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});
const models = await client.models.list();

console.log(models.data.map(m => m.id).join("\n"));
