import { useEffect, useState } from 'react'
import cls from './Sidebar.module.scss'
import { Tabs } from '../Tabs/Tabs'
import { DropDown } from '../DropDown/DropDown'
import { IRecipe } from '../../common/models/IRecipe'
import { useNavigate } from 'react-router-dom'
import RecipeIcon from '../../assets/recipe.jpg'

interface SidebarProps {
  onChange: (value: string) => void
  value: string | null
  recipes: IRecipe[]
  onChangeMealType: (value: string) => void
  valueMealType: string | null
  onChangeCousine: (value: string) => void
  valueCousine: string | null
}

const Sidebar = (props: SidebarProps) => {
  const { 
    onChange, 
    value, 
    recipes,
    onChangeMealType,
    valueMealType,
    onChangeCousine,
    valueCousine
  } = props
  const navigate = useNavigate();
  const [filtersSelected, setFiltersSelected] = useState<boolean>(false);

  const handleResetFilters = () => {
    onChange("Любая")
    onChangeMealType('Все типы')
    onChangeCousine("Все страны и регионы")
    setFiltersSelected(false)
  }

  const handleRandomRecipe = () => {
    const randomRecipeIndex = Math.floor(Math.random() * (recipes.length - 1)) + 1;
    const recipeUrl = `/recipes/${randomRecipeIndex}`;
    navigate(recipeUrl)
  }
  
  const items: { value: string, label: string, disabled: boolean }[] = [
    { 
      value: 'Любая', 
      label: 'Любая',
      disabled: false
    },
    { 
      value: 'Easy',
      label: 'Низкая',
      disabled: false
    },
    { 
      value: 'Medium',
      label: 'Средняя',
      disabled: false
    },
    { 
      value: 'High', 
      label: 'Высокая',
      disabled: true
    }
  ]

  const mealTypeUnique: Set<string> = new Set()

  for (let i = 0; i < recipes.length; i++) {
    for (let j = 0; j < recipes[i].mealType.length; j++) {
      mealTypeUnique.add(recipes[i].mealType[j])
    }
  }

  const mealType = ["Все типы", ...mealTypeUnique]

  const cousineUnique: Set<string> = new Set()

  for (let i = 0; i < recipes.length; i++) {
    cousineUnique.add(recipes[i].cuisine)
  }

  const cousine = ["Все страны и регионы", ...cousineUnique]

  useEffect(() => {
    if (value !== "Любая" || valueMealType !== "Все типы" || valueCousine !== "Все страны и регионы") {
      setFiltersSelected(true);
    } else {
      setFiltersSelected(false);
    }
  }, [value, valueCousine, valueMealType]);

  return (
    <div className={cls.Sidebar}>
      <div className={cls.content}>
        <div className={cls.header}>
          <div className={cls.imageWrapper}>
            <img src={RecipeIcon} alt='Recipe image' className={cls.image} />
          </div>
          <div className={cls.textInfo}>
            <p>В нашей жизни, когда время становится все более ценным ресурсом, задача планирования приема пищи становится все более сложной.</p>
            <p>Часто мы сталкиваемся с дилеммой: что приготовить на завтрак, обед или ужин? Каким образом мы можем легко и быстро определиться с выбором блюда и не тратить много времени на принятие этого решения?</p>
            <p>Наш сервис поможет: выбирайте параметры - и вперед!</p>
          </div>
        </div>
        <div className={cls.filterWrapper}>
          <div className={cls.cousineWrapper}>
            <p className={cls.filterText}>Кухня:</p>
            <DropDown 
              items={cousine}
              value={valueCousine}
              onChange={onChangeCousine}
            />
          </div>
          <div className={cls.typeWrapper}>
            <p className={cls.filterText}>Тип блюда:</p>
            <DropDown 
              items={mealType}
              value={valueMealType}
              onChange={onChangeMealType}
            />
          </div>
          <div className={cls.difficultyWrapper}>
            <p className={cls.filterText}>Сложность приготовления:</p>
            <Tabs
              name='difficulty'
              items={items}
              value={value}
              onChange={onChange}
            />
          </div>
          <button className={`${cls.resetButton} ${filtersSelected ? cls.active : ''}`} onClick={handleResetFilters}>
            <p className={cls.resetText}>Сбросить все фильтры</p>
          </button>
        </div>
        <div className={cls.randomWrapper}>
          <p className={cls.randomText}>А еще можно попробовать на вкус удачу</p>
          <button className={cls.randomButton} onClick={handleRandomRecipe}>
            <p className={cls.buttonText}>Мне повезёт!</p> 
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar