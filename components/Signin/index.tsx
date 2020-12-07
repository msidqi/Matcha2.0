import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Signin = (): JSX.Element => {
  const {register, handleSubmit} = useForm()

  const onSubmit = async (data: any) => {
    console.log(data)
    try {
      const result = await axios.post('http://localhost:3001/api/signIn', data);
      // const result = await axios.get('http://localhost:3001/api/like');
      console.log(result)
    } catch (e) {
      console.log('error', e.message)
    }
  }
  return <div className="m-auto">
    <div className="bg-white border rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userName" className="block text-gray-700 font-semibold	">User name</label>
        <input name="userName" ref={register} className="form-input block" />
        <label htmlFor="password" className="block text-gray-700 font-semibold	">Password</label>
        <input name="password" ref={register} type="password" className="form-input block" />
        <input type="submit" value="Signin"/>
      </form>
    </div>
  </div>
};

export default Signin;
