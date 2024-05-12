import React, { memo } from 'react'
import Card from '../Card/Card'
import cls from './CardList.module.scss'
import { IRecipe } from '../../common/models/IRecipe'
import { Link } from 'react-router-dom'
import { Pagination } from 'antd'

interface CardListProps {
  recipes: IRecipe[]
  changePage: (page: number) => void
  total: number
  limit: number
}
 
const CardList = memo((props: CardListProps) => {
  const { recipes, total, changePage, limit } = props

  return (
    <div className={cls.CardList}>
      <header className={cls.header}>
        <h1 className={cls.text}>Найденные рецепты</h1>
        <span className={cls.total}>{total}</span>
      </header>
      <div className={cls.cardsWrapper}>
        <div className={cls.cards}>
          {recipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
              <Card recipe={recipe} />
            </Link>
          ))}
        </div>
        <div className={cls.pagination}>
          <Pagination
            total={total}
            pageSize={limit}
            defaultCurrent={1}
            onChange={changePage}
          />
        </div>
      </div>
    </div>
  )
})

export default CardList