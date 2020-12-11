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
  return <div className="bg-white border rounded max shadow-lg p-10 max-w-xl m-auto">
    <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">Create an Account</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
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
        
        <input className="bg-blue-500 hover:bg-gray-800 text-white p-2 rounded" type="submit" value="Signup"/>
      </form>
    </div>
};

export default Signup