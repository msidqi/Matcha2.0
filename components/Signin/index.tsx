import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loading from '@/components/Loading';
import { useUser } from '../auth';

const Signin = (): JSX.Element => {
  const { register, handleSubmit } = useForm()
  const router = useRouter()
  const [, { login, loading }] = useUser()

  const onSubmit = async (data: { userName: string; password: string; }) => {
    try {
      await login(data)
      router.push('/')
    } catch (e) {
      console.error(e)
    }
  }
  if (loading) {
    return <Loading />
  }
  return <div className="bg-white border rounded  max shadow-lg p-10 max-w-xl m-auto">
    <h3 className="my-4 text-2xl font-semibold text-gray-700 mt-0">Sign in</h3>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
      <label htmlFor="userName" className="block text-gray-700 font-semibold	">User name</label>
      <input name="userName" ref={register} className="form-input block" />
      <label htmlFor="password" className="block text-gray-700 font-semibold	">Password</label>
      <input name="password" ref={register} type="password" className="form-input block" />
      <input className="bg-blue-500 hover:bg-gray-800 text-white p-2 rounded" type="submit" value="Signin" />
    </form>
  </div>
};

export default Signin;
