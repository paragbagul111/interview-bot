import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { isCorrect,formatQuestions } from "./functions.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX ",
  });
});

app.post("/", async (req, res) => {
  let questions = [];
  // do{
     try {
       const prompt = req.body.prompt;
       const token = req.body.token;
       const generationConfig = {
         maxOutputTokens: token,
         temperature: 0,
         topP: 0.1,
         topK: 16,
       };
       const model = genAI.getGenerativeModel({
         model: "gemini-pro",
         generationConfig,
       });
       // const prompt = "Write a story about a magic backpack."
       const result = await model.generateContent(prompt);
       const response = await result.response;
       const text = response.text();
       res.status(200).send({ text });
      //  questions = formatQuestions(text);

      } catch (error) {
        console.log(error);
        res.status(500).send({ error });
      }
    // }while(!isCorrect(questions));
});

app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000")
);
