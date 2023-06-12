import React from 'react'
import Wrapper from '../assets/wrappers/CocktailList'
import { CocktailCart } from './CocktailCart'


export const CocktailList = ({drinks}) => {
  if(!drinks){
    return <h1>empty value</h1>
  }

  const formattedDrinks = drinks.map((item)=>{
    const {idDrink,strDrink,strDrinkThumb,strGlass,strAlcoholic} = item
    return {id:idDrink,name:strDrink,image:strDrinkThumb,info:strGlass,glass:strAlcoholic}
  })
  return (
    <Wrapper>
      {formattedDrinks.map((item)=>{
        return <CocktailCart key={item.id} {...item}/> 
      })}
    </Wrapper>
  )
}
