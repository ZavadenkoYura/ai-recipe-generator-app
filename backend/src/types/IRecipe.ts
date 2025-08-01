type INutrients = {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  sodium: string;
  cholesterol: string;
};

export type ILLMRecipeOutput = {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  nutrients: INutrients;
};
