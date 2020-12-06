import React from 'react'
import { useForm } from 'react-hook-form'

export const Login = (): JSX.Element => {
  const {register, handleSubmit} = useForm()

  const onSubmit = (data: any) => console.log(data)
  return <div className="m-auto">
    <div className="bg-white border rounded">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="block text-gray-700 font-semibold	">Email</label>
        <input name="email" ref={register} className="form-input block" />
        <label className="block text-gray-700 font-semibold	">Password</label>
        <input name="password" ref={register} type="password" className="form-input block" />
        <input type="submit" />
      </form>
    </div>
  </div>
};
