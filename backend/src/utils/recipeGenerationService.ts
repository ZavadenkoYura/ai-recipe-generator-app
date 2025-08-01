import OpenAI from "openai";
import { loadFile } from "./loadFile";
import { ILLMRecipeOutput } from "../types/IRecipe";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY,
});

export const exportFinalRecipe = async (
  file: Express.Multer.File
): Promise<ILLMRecipeOutput> => {
  const encodedFile = loadFile(file);

  if (!encodedFile) throw new Error("[Error while opening image file]");

  const prompt = `
    You are a recipe assistant.
    
    Given an image of a dish, respond ONLY in JSON format as shown below:
    
    {
      "name": "<dish name>",
      "description": "<dish discription>"
      "ingredients": ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      "steps": ["Step 1", "Step 2", "Step 3"],
      "nutrients": {
        "calories": "<e.g., 350 kcal>",
        "protein": "<e.g., 20g>",
        "carbohydrates": "<e.g., 35g>",
        "fat": "<e.g., 15g>",
        "sodium": "<e.g., 500mg>",
        "cholesterol": "<e.g., 60mg>"
      }
    }
  `;

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          {
            type: "input_image",
            image_url: `data:${file.mimetype};base64,${encodedFile}`,
            detail: "auto",
          },
        ],
      },
    ],
  });

  if (response.error)
    throw new Error("[LLM model error while genereting response]");

  return JSON.parse(response.output_text);
};
