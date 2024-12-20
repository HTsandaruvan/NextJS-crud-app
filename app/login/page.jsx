'use client'
import React, { useState } from 'react'

const LoginPage = () => {
  return (
    <div
      id="Home"
      className="min-h-screen h-[100vh] md:h-[100vh] lg:h-[100vh] xl:h-[100vh]">

      <div className='min-h-screen flex items-center justify-center'>

        <div className='w-[380px] mx-auto '>
          <div className="flex items-center justify-center my-3">
            <h1 className='font-semibold text-2xl'>
              Evotech
            </h1>
          </div>
          <div className='bg-white border border-gray-200 shadow-md p-4 rounded-lg'>
            <form action={""} className='space-y-6'>
              <h1 className='text-start text-xl font-bold text-gray-900'>Sign in to your account</h1>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900  focus:border-blue-500 block w-full p-1.5 rounded-md' type="text" name='email' id='email' placeholder="name@company.com" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900   focus:ring-blue-600 focus:border-blue-600 block w-full p-1.5 rounded-md' type="password" name='password' id='password' placeholder="xxxxxxx" required="" />
              </div>
              <div className='flex justify-between'>
                <div className='flex'>
                  <div className='flex items-center h-5'>
                    <input id='remember' type="checkbox" />
                  </div>
                  <div className='text-sm ml-2'>
                    <label htmlFor="remember" className='font-medium text-gray-900'>Remember Me</label>
                  </div>
                </div>
                <a href='/forget-password' className='text-sm text-blue-700 hover:underline '>Forget password</a>
              </div>
              <button type='submit' className='w-full text-white bg-blue-600 hover:bg-blue-700 transition-all focus-visible:ring-4 ring-2 focus:ring-blue-300 px-5 py-1.5'>Sign in</button>
              <div className='flex text-sm font-medium text-gray-500 space-x-1 justify-center'>
                <span>Don’t have an account yet? </span>
                <a className='text-sm text-blue-700 hover:underline' href="/register">Sign up</a>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage