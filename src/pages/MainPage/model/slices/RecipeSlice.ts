import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IRecipe } from "../../../../common/models/IRecipe"
import { fetchRecipes } from "../services/fetchRecipes"

interface RecipeState {
  recipes: IRecipe[]
  isLoading: boolean
  error: string | undefined;
}

const initialState: RecipeState = {
  recipes: [],
  isLoading: false,
  error: undefined,
}

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<{ recipes: IRecipe[] }>) =>  {
        state.isLoading = false;
        state.recipes = action.payload.recipes;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
  }
})

export default recipeSlice.reducer;