import React from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'
import { CocktailList } from '../comonents/CocktailList'
import {SearchForms} from '../comonents/SearchForms'
// React Query
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const cocktailSearch = 'http://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const searchCocktailsQuery = (searchTerm)=>{
  return {
    queryKey:['search',searchTerm || 'all'],
    queryFn: async ()=>{
      const response = await axios.get(`${cocktailSearch}${searchTerm}`)
      return response.data.drinks
    }
  }
}


// esse request esta vindo do action ou loader, se tu quiser saber em que array ele esta é só olhar la no log do newsletter, la tem o array com os objetos do server
export const loader = (queryClient)=> 
// com essa syntax loader retorna essa logica no query
async ({request})=>{
  const url = new URL(request.url)
  //url agora tem o valor do name='search' do input depois que acontece o submit, searchParams é um method  
  // console.log(url);
  const searchTerm = url.searchParams.get('search') || '';
  await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
  return {searchTerm}
}

const Landing = () => {
  //searchTerm muda de acordo com o value digitado no inpute
  const {searchTerm} = useLoaderData()
  const {data:drinks, isLoading} = useQuery(searchCocktailsQuery(searchTerm))
  if(isLoading){
    return <div className='loading'></div>
  }
   console.log(drinks);
  return (
      <div>
        <SearchForms searchTerm={searchTerm} />
      <CocktailList drinks={drinks}/>
      
    </div>
  )
}

export default Landing