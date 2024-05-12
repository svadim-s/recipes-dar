import cls from "./RecipeDetailsPage.module.scss"
import ArrowIcon from '../../../assets/Arrow.svg'
import { TimeLine } from "../../../components/TimeLine/TimeLine"
import { useAppDispatch, useAppSelector } from "../../../common/hooks/useAppDispatch/useAppDispatch"
import { useEffect, useState } from "react"
import { fetchRecipeById } from "../model/services/fetchRecipeById"
import { useParams } from 'react-router-dom'
import { NavLink } from "react-router-dom"
import ArrowPaginationIcon from '../../../assets/ArrowPagination.svg'

const RecipeDetailsPage = () => {
  const dispatch = useAppDispatch()
  const { recipe } = useAppSelector(state => state.recipeDetailsReducer)
  const { id } = useParams<{ id: string }>()
  const numericId = Number(id)
  const [paginationImage, setPaginationImage] = useState<number>(1)

  const handleNextPagination = () => {
    setPaginationImage(paginationImage + 1)
  };

  const handlePrevPagination = () => {
    setPaginationImage(paginationImage - 1)
  };

  useEffect(() => {
    if (numericId) {
      dispatch(fetchRecipeById(numericId))
    }
  }, [dispatch, numericId])

  return (
    <div className={cls.RecipeDetailsPage}>
      {recipe &&
        <>
          <header className={cls.header}>
            <NavLink to={'/'}>
              <img src={ArrowIcon} alt="Arrow" />
            </NavLink>
            <h1 className={cls.headerText}>{recipe.name}</h1>
          </header>
          <div className={cls.content}>
            <div className={cls.recipeInfo}>
              <div className={cls.infoWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Кухня</h2>
                </div>
                <div className={cls.cardBody}>
                  <p className={cls.typeText}>{recipe.cuisine}</p>
                </div>
              </div>
              <div className={cls.infoWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Теги</h2>
                </div>
                <div className={cls.tagWrapper}>
                  {recipe.tags && recipe.tags.map((tag, id) => (
                    <div key={id}>
                      <p className={cls.tagText}>#{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={cls.infoWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Калорийность</h2>
                </div>
                <div className={cls.calorie}>
                  <div className={cls.calorieText}>
                    <p className={cls.calorieValue}>{recipe.caloriesPerServing} ккал</p>
                    <p className={cls.weight}>100 грамм</p>
                  </div>
                </div>
              </div>
              <div className={cls.infoWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Количество порций</h2>
                </div>
                <div className={cls.cardBody}>
                  <p className={cls.portionsAmount}>{recipe.servings}</p>
                </div>
              </div>
              <div className={cls.infoWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Описание</h2>
                </div>
                <div className={cls.description}>
                  <p className={cls.descriptionText}>{recipe?.instructions}</p>
                </div>
              </div>
            </div>
            <div className={cls.recipeManual}>
              <div className={cls.infoWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Общее время приготовления</h2>
                </div>
                <div className={cls.cardBody}>
                  <p className={cls.timeText}>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} минут</p>
                </div>
              </div>
              <div className={cls.timeLineWrapper}>
                <div className={cls.cardHeader}>
                  <h2 className={cls.cardHeaderText}>Инструкции по приготовлению</h2>
                </div>
                <TimeLine steps={recipe.instructions} />
              </div>
            </div>
            <div className={cls.imageInfo}>
              <div className={cls.imageWrapper}>
                <img src={recipe?.image} alt="Image" className={cls.image} />
              </div>
              <div className={cls.buttonWrapper}>
                <button className={cls.button} onClick={handlePrevPagination} disabled={paginationImage === 1}>
                  <img src={ArrowPaginationIcon} alt="Arrow Prev" className={cls.reverse} />
                </button>
                <button className={cls.button} onClick={handleNextPagination} disabled={paginationImage === 2}>
                  <img src={ArrowPaginationIcon} alt="Arrow Next" />
                </button>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default RecipeDetailsPage