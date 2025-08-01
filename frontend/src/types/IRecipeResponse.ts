type INutrients = {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  sodium: string;
  cholesterol: string;
};

export type IRecipe = {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  nutrients: INutrients;
  url: string;
};

type Pagination = {
  page: number;
  pageLimit: number;
  totalPages: number;
};

export type IRecipePagination = {
  recipies: IRecipe[];
  pagination: Pagination;
};
