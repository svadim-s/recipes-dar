import { combineReducers, configureStore } from "@reduxjs/toolkit";
import recipeReducer from '../pages/MainPage/model/slices/RecipeSlice'
import recipeDetailsReducer from "../pages/RecipeDetailsPage/model/slices/recipeDetailsSlice";

const rootReducer = combineReducers({
  recipeReducer,
  recipeDetailsReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']