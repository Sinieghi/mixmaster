import React from 'react'
import Wrapper from '../assets/wrappers/SearchForm'
import { Form, useNavigation } from 'react-router-dom'


export const SearchForms = ({searchTerm}) => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Wrapper>
      <Form className='form'>
        <input type="search" className="form-input" name='search' defaultValue={searchTerm} />
        <button className="btn" type='submit'>{isSubmitting?'searching...':'search'}</button>
      </Form>
    </Wrapper>
    
  )
}
