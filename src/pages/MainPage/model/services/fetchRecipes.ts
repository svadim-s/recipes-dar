import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRecipe } from "../../../../common/models/IRecipe";

export const fetchRecipes = createAsyncThunk<{ recipes: IRecipe[] }>(
  'recipes/fetchAll',
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
      const response = await axios.get<{ recipes: IRecipe[] }>(`https://dummyjson.com/recipes?limit=0`)
      return response.data
    } catch (err) {
      return rejectWithValue('error')
    }
  }
)