import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IRecipe } from "../../../../common/models/IRecipe"
import { fetchRecipeById } from "../services/fetchRecipeById"

interface RecipeState {
  recipe: IRecipe
  isLoading: boolean
  error: string | null;
}

const initialState: RecipeState = {
  recipe: {} as IRecipe,
  isLoading: false,
  error: null
}

export const recipeDetailsSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action: PayloadAction<IRecipe>) =>  {
        state.isLoading = false;
        state.recipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
  }
})

export default recipeDetailsSlice.reducer;