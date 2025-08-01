import mongoose, { Schema } from "mongoose";

const recipeSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  nutrients: {
    calories: { type: String, required: true },
    protein: { type: String, required: true },
    carbohydrates: { type: String, required: true },
    fat: { type: String, required: true },
    sodium: { type: String, required: true },
    cholesterol: { type: String, required: true },
  },
  url: { type: String, require: true },
});

export const recipeModel = mongoose.model("recipe", recipeSchema);
