import React, { memo } from 'react'
import TimerIcon from '../../assets/Timer.svg'
import StarIcon from '../../assets/star.svg'

import cls from './Card.module.scss'
import { IRecipe } from '../../common/models/IRecipe';

interface CardProps {
  recipe: IRecipe
}

const Card = memo((props: CardProps) => {
  const { recipe } = props

  return (
    <div className={cls.Card}>
      <div className={cls.cardMain}>
        <p className={cls.title}>{recipe.name}</p>
        <div className={cls.imageWrapper}>
          <img src={recipe.image} alt='Picture of the dish' className={cls.image} />
        </div>
      </div>
      <div className={cls.description}>
        <p className={cls.textInfo}>{recipe.instructions}</p>
        <div className={cls.time}>
          <img src={TimerIcon} alt='Timer' />
          <p className={cls.timeText}>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} минут</p>
        </div>
        <div className={cls.difficulty}>
          <p className={cls.difficultyText}>Сложность:</p>
          {recipe.difficulty === 'Easy' && <img src={StarIcon} alt='Star' />}
          {recipe.difficulty === 'Medium' && (
            <div>
              <img src={StarIcon} alt='Star' />
              <img src={StarIcon} alt='Star' />
            </div>
          )}
          {recipe.difficulty === 'Hard' && (
            <div>
              <img src={StarIcon} alt='Star' />
              <img src={StarIcon} alt='Star' />
              <img src={StarIcon} alt='Star' />
            </div>
          )}
        </div>
        <p className={cls.cuisineText}>{recipe.cuisine}</p>
        <p className={cls.mealTypeText}>{recipe.mealType.join(", ")}</p>
      </div>
    </div>
  )
})

export default Card