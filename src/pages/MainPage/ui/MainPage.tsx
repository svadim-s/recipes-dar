import { memo, useEffect, useMemo, useState } from "react";
import CardList from "../../../components/CardList/CardList"
import Sidebar from "../../../components/Sidebar/Sidebar"
import cls from "./MainPage.module.scss"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useAppDispatch/useAppDispatch";
import { fetchRecipes } from "../model/services/fetchRecipes";

const MainPage = memo(() => {
  const dispatch = useAppDispatch();
  const { recipes, error } = useAppSelector(state => state.recipeReducer);
  const limit = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCousine, setSelectedCousine] = useState<string | null>('Все страны и регионы');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>('Любая');
  const [selectedMealType, setSelectedMealType] = useState<string | null>('Все типы');

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      if (selectedCousine && selectedCousine !== "Все страны и регионы" && !recipe.cuisine.includes(selectedCousine)) {
        return false;
      }
      if (selectedDifficulty && selectedDifficulty !== "Любая" && recipe.difficulty !== selectedDifficulty) {
        return false;
      }
      if (selectedMealType && selectedMealType !== "Все типы" && !recipe.mealType.includes(selectedMealType)) {
        return false;
      }
      return true;
    })
  }, [recipes, selectedCousine, selectedDifficulty, selectedMealType]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDifficultyChange = (value: string) => {
    setSelectedDifficulty(value);
    setCurrentPage(1);
  };

  const handleMealTypeChange = (value: string) => {
    setSelectedMealType(value);
    setCurrentPage(1);
  };

  const handleCousineChange = (value: string) => {
    setSelectedCousine(value);
    setCurrentPage(1);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalPages = filteredRecipes.length;
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredRecipes.length);
  const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
  
  return (
    <div className={cls.MainPage}>
      <header className={cls.header}>
        <h2 className={cls.text}>Сборник рецептов из разных стран мира</h2>
      </header>
      <div className={cls.content}>
        <Sidebar 
          onChange={handleDifficultyChange} 
          value={selectedDifficulty}
          recipes={recipes}
          onChangeMealType={handleMealTypeChange}
          valueMealType={selectedMealType}
          onChangeCousine={handleCousineChange}
          valueCousine={selectedCousine}
        />
        <CardList 
          recipes={paginatedRecipes}
          total={totalPages}
          changePage={handlePageChange} 
          limit={limit}
        />
      </div>
    </div>
  )
})

export default MainPage
