import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:8080/v1/recipe";

export const fetchRecipes = createAsyncThunk(
  "recipe/fetchRecipes",
  async (payload: { page: number }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/retreive?page=${payload.page}&limit=10`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error while fetching recipies");
    }
  }
);

export const generateRecipe = createAsyncThunk(
  "recipe/generateRecipe",
  async (payload: { formData: FormData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/generate`,
        payload.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue("Error while generating a recipe");
    }
  }
);
