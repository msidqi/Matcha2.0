import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Signup = (): JSX.Element => {
  const {register, handleSubmit} = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      const result = await axios.post('http://localhost:3001/api/signup', data);
      console.log(result)
    } catch (e) {
      console.error(e)
    }
  }
  return <div className="m-auto">
    <div className="bg-white border rounded max">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName" className="block text-gray-700 font-semibold	">User name</label>
        <input name="userName" ref={register} className="form-input block" />

        <label htmlFor="firstName" className="block text-gray-700 font-semibold	">First name</label>
        <input name="firstName" ref={register} className="form-input block" />

        <label htmlFor="lastName" className="block text-gray-700 font-semibold	">Last name</label>
        <input name="lastName" ref={register} className="form-input block" />

        <label htmlFor="email" className="block text-gray-700 font-semibold	">Email</label>
        <input name="email" ref={register} className="form-input block" />
        
        <label htmlFor="password" className="block text-gray-700 font-semibold	">Password</label>
        <input name="password" ref={register} type="password" className="form-input block" />
        
        <label htmlFor="retryPassword" className="block text-gray-700 font-semibold	">Confirm Password</label>
        <input name="retryPassword" ref={register} type="password" className="form-input block" />
        
        <input type="submit" value="Signup"/>
      </form>
    </div>
  </div>
};

export default Signup