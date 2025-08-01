import { createSlice } from "@reduxjs/toolkit";
import { fetchRecipes, generateRecipe } from "../thunks/recipeAPIThunks";
import type { IRecipePagination } from "../types/IRecipeResponse";

type RecipeState = {
  data: IRecipePagination | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: RecipeState = {
  data: null,
  isLoading: false,
  error: null,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // Fetch all recipes
    builder.addCase(fetchRecipes.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.data = action.payload;
      console.log(state.data);
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });

    // Generation logic
    builder.addCase(generateRecipe.pending, (state) => {
      state.error = null;
      state.isLoading = true;
    });
    builder.addCase(generateRecipe.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      if (state.data) {
        state.data?.recipies.unshift(action.payload);
        // Adjusting pagination options
        if (
          state.data.recipies.length >
          state.data.pagination.pageLimit * state.data.pagination.pageLimit
        ) {
          state.data.recipies.pop();
          state.data.pagination.totalPages++;
        }
      }
    });
    builder.addCase(generateRecipe.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
  },
});

export const {} = recipeSlice.actions;

export default recipeSlice.reducer;
