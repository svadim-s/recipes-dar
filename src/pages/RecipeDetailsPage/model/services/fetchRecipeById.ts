import axios from "axios";
import { IRecipe } from "../../../../common/models/IRecipe";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecipeById = createAsyncThunk<IRecipe, number>(
  'recipeDetails/fetchRecipeById',
  async (recipeId, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await axios.get<IRecipe>(`https://dummyjson.com/recipes/${recipeId}`)
      return response.data
    } catch (err) {
      return rejectWithValue('error')
    }
  }
)