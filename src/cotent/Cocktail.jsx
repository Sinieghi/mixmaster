import React from 'react'
import { Link,useLoaderData } from 'react-router-dom'
import axios from 'axios'
import Wrapper from '../assets/wrappers/CocktailPage'
import { useQuery } from '@tanstack/react-query';

const cocktailSearchUrl =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';


  const singleCocktailQuery = (id)=>{
    return {
      queryKey:['cocktail', id],
      queryFn: async()=>{
        const {data} = await axios(`${cocktailSearchUrl}${id}`)
        return data
      }
    }
  }


  /*o q esta acontecendo aqui? Basicamente como pegamos a API q depende do ID para filtrar vamos montar
  com basi nesso a logica de atribuir dinamicamente ao i="id", só lembrando que foi definido a id
  como o metodo aqui la no App, especificamente na linha 33   path:'/cocktail/:id', */
  export const loader = 
  // aqui de novo onde eu retorno loader no meu hook do Reactquery
  (querClient)=> async  ({params}) =>{

    const {id} = params
    await querClient.ensureQueryData(singleCocktailQuery(id))
    return {id}
  }

const Cocktail = () => {
  const {id} = useLoaderData()

  const {data} = useQuery(singleCocktailQuery(id))
  if(!data) return <h2>something went wrong...</h2>

  const singleDrink = data.drinks[0]

  const {strAlcoholic:info,strDrink:name,
    strGlass:glass,
    strCategory:category, 
    strDrinkThumb:image, strInstructions} = singleDrink

    const validIngredients = Object.keys(singleDrink).filter(
      (key)=> key.startsWith("strIngredient") && singleDrink [key] !== null).map(
        (numb)=> singleDrink[numb]
      )


    console.log(validIngredients);
    
  return (
      <Wrapper>
      <header>
        <Link to='/' className='btn'>
          home
        </Link>
        <h3>{name}</h3>
      </header>
      <div className="drink">
        <img src={image} alt={name} className='img'/>
        <div className="drink-info">
          <p>
            <span className="drink-data">category:</span>
            {category}
          </p>
           <p>
            <span className="drink-data">info:</span>
            {info}
          </p>
           <p>
            <span className="drink-data">glass:</span>
            {glass}
          </p>
           <p>
            <span className="drink-data">ingridients:</span>
            {validIngredients.map((item, indedx)=>{
              return <span className="ing" key={item}>
                {item}{indedx < validIngredients.length - 1 ? ',':''}
              </span>
            })}
          </p>
           <p>
            <span className="drink-data">instructions:</span>
            {strInstructions}
          </p>
        </div>
      </div>
    </Wrapper>
  )
}

export default Cocktail