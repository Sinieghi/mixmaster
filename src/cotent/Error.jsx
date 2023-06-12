import React from 'react'
import { Link, useRouteError } from 'react-router-dom'
import img from '../assets/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage';
const Error = () => {
  const error = useRouteError();
  if(error.status === 404){
    return <Wrapper>
      <div>
      <img src={img} alt="" />
    <Link to='/'>back home</Link>
    <p>Missing some compnent</p>
    </div>
    </Wrapper> 
  }
  return (
    <Wrapper>
      <div><h3>something wrong</h3></div>
      
    </Wrapper>
  )
}

export default Error