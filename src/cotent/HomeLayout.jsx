import React from 'react'
import {  Outlet, useNavigation } from 'react-router-dom'
import { Navbar } from '../comonents/Navbar'

const HomeLayout = () => {
  const navigation = useNavigation()
  // console.log(navigation);
  const isLoading = navigation.state === 'loading'
  return (
    <div>
      {/* Outlet é o cara responsavel por ser o "pivo" de todo o nested component, ou seja ele é o primeiro cara da fila o avo de geral e nele tudo que tiver de diplay
      que precise estar em todas as paginas COMO NO CASO DA NAVBAR,FOOTER,BTN DE CADASTRO E ETC... que precisa estar em todas as paginas, tem de colocar esse componente aqui smente aqui ele vai ter uma
      aplicação globar no projeto */}
      <Navbar/>
      <section className='page'>
        {isLoading? <div className="loading"/>
        
        :
        <Outlet/>
        }

      
      </section>
      
    </div>
  )
}

export default HomeLayout