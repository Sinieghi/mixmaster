import React from "react";
import {About, HomeLayout, Newsletter, Landing, Error, Cocktail, SinglePageError} from'./cotent'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { loader as landingLoader} from "./cotent/Landing";
import { loader as singleCocktailLoader} from "./cotent/Cocktail";
import { action as newsletterAction } from "./cotent/Newsletter";
/*vou aplicar o queryLibrary só para fazem um cache dos item. Pq sempre que a Landing para por um render ou re-render ela faz um request na API, ou seja, API tem numero 
maximo de request e isso vai gastando os seus request. Aramazenar as infos que ja foram rendezridas em cache é extrmamente importande para desempenho do site*/
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000 * 60 * 5
    }
  }
})


const router = createBrowserRouter([
  // pelo que entendi aqui vc cria a pagina, e vc tem que referenciar nos to='/blabla' acessar a pagina criada aqui
 
  {
    
    path:'/',
    element: <HomeLayout/>,
    errorElement:<Error/>,
    children: [
       {
 /*Esse index é meio confuso, mas entendi! Basicamente se vc n colocar ele o HomeLayout vai ser o lugar que vc vai renderizar a front page, tipo nesse projeto
 a lista de drinks que vem de uma API é toda renderizada na front page, mas como o index esta nessa page Landing todo o display vai acontecer nela, é meio confuso
mas ela basicamente vira o componente que esta com o Outlet, n entendi o pq ele optou por essa abordagem, mas é assim que funciona com esse index: true, torna esse component
o cara que vai renderizar os drinks*/       
     index:true,
     element: <Landing/>,
     errorElement:<SinglePageError/>,
     //essa é uma abordagem bom complexa, pois vc n pode invocar o query dentro do loader, enão usa essa abordagem de invocar ele no param do loader
     loader: landingLoader(queryClient)
     },
       {
       /* esse /:id é para direcionar para outra page, que no caso é a do "single cocktail" , basicamente deixa dinamico, como tem o fetching data dos drink, as infos vai
        ter o display de forma "dinamica", no caso quando vc clicka em detalhes vc puxa o data daquele drink em uma pagina separada, dai essa trick do :blablabla usei
        a id nesse caso pq sim, poderia usar o nome tambem */
     path:'/cocktail/:id',
     errorElement:<SinglePageError/>,
     loader:singleCocktailLoader(queryClient),
     element: <Cocktail/>
     },
       {
     path:'/newsletter',
     element: <Newsletter/>,
     action:newsletterAction
     },
     {
     path:'/about',
     element: <About/>,
 //mais um exemplo de nest component
     children:[
      
          {
// outra coisa que percebi é que essa page dixa de exitir para se tornar um diplay da page que esta com o Outlet, ent esse componet que esta com o index vira somente um
//display para a page com o Outlet, que é o About nesse caso            
            index:true,                     
            element: <h1>pessoa</h1>
     },
       {       
        path:'company', 
        element: <h1>Company aqui seria um component no caso</h1>
     },      
     ]    
     },
    ]
  },
   
])
const App = () => {
  
  return <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>;
};
export default App;
