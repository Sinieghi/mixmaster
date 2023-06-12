import axios from 'axios';
import React from 'react'
import { Form, redirect, useNavigation } from 'react-router-dom'
import { toast } from 'react-toastify';


const newsletterUrl = 'https://www.course-api.com/cocktails-newsletter';



export const action = async ({request}) =>{
  try {
    const formData = await request.formData()
  const data = Object.fromEntries(formData)
  const response = await axios.post(newsletterUrl, data)
  console.log(response);
  toast.success(response.data.msg)
  return redirect('/')
  } catch (error) {
    console.log(error);
   return toast.error(error?.response?.data?.msg)
  }
}

const Newsletter = () => {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  return (
    <Form className="form" method='POST'>
      <h4 style={{textAlign:'center', marginBottom:'2rem'}}>
         our newsletter
      </h4>
      <div className="form-row">
        <label htmlFor="name" className='form-label'>
          name
        </label>
        <input type="text" className="form-input" name='name'
        id='name' required/>
      </div>
      <div className="form-row">
        <label htmlFor="lastName" className='form-label'>
          last name
        </label>
        <input type="text" className="form-input" name='lastName'
        id='lastName' required/>
      </div>
      <div className="form-row">
        <label htmlFor="email" className='form-label'>
          email
        </label>
        <input type="text" className="form-input" name='email'
        id='email' defaultValue='test@test.com'/>
      </div>
      <button type='submit' className="btn btn-block" style={{marginTop:'0.5rem'}} disabled={isSubmitting}>{isSubmitting?'wait':'subbmit'}</button>
    </Form>
  )
}

export default Newsletter