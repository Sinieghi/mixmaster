import React from 'react'
import Wrapper from '../assets/wrappers/AboutPage'
import { Outlet } from 'react-router-dom'

const About = () => {
  return (
    <Wrapper>

      <Outlet/>
      {/* Como esperado esse <p> e essa <h3> aparece na page company tambem */}
      <h3>about</h3>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Fugit, omnis, velit ratione vitae dolorum modi voluptates 
        fuga aspernatur tenetur quis consectetur, ullam nobis.
         Provident nesciunt facere ratione, eaque soluta earum?</p>
    </Wrapper>
  )
}

export default About