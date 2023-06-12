import React from 'react'
import { NavLink } from 'react-router-dom'

import Wrapper from '../assets/wrappers/Navbar'




export const Navbar = () => {
  return (
    <Wrapper>
        <div className="nav-center">
            <span className="logo">Drinks</span>
            <div className="nav-links">
                <NavLink to='/' className='nav-link'>
                    home
                </NavLink>
                <NavLink to='/about' className='nav-link'>
                    about
                </NavLink>
                <NavLink to='/newsletter' className='nav-link'>
                    newletter
                </NavLink>
            </div>
        </div>
    </Wrapper>
  )
}

