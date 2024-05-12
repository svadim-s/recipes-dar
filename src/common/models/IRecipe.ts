export interface IRecipe {
  id:  number;
  name: string;
  image: string;
  cuisine: string;
  servings: number;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  mealType: string[];
  difficulty: string;
  tags: string[];
}