'use client'

import { useContext } from 'react'
import { signIn } from 'next-auth/react'

import { EyeIcon, EyeSlashIcon, LinkIcon } from '@heroicons/react/24/outline'

import { UserContext } from '@providers/context/UserProvider'
import { MiscContext } from '@providers/context/MiscProvider'
import RedirectAfterSignIn from '@lib/helpers/RedirectAfterSignIn'
import { toast } from 'react-toastify'
import { clientLog } from '@lib/helpers/winston/clientLog'
import * as Sentry from '@sentry/nextjs'
import Modal from '@components/atom/Modal'

const LoginPage = () =>
{
  const { userAuthState, emailState } = useContext(UserContext)
  const { modal1State } = useContext(MiscContext)

  const [ userAuth, setUserAuth ] = userAuthState
  const [ email, setEmail ] = emailState
  const [ openModal1, setOpenModal1 ] = modal1State

  const handleSignin = async (social) => 
  {
    try
    {
      const req = await signIn(social, {
        redirect: false,
      })

      if (req?.error)
      {
        // Handle sign-in error (e.g., wrong credentials)
        toast.error(req.error)
        console.error("Sign-in failed:", req.error)
      } else
      {
        // Successful sign-in
        toast.success("Signed in successfully")
      }

    } catch (error)
    {
      Sentry.captureException(error.message)
      clientLog(error.message)
      toast.error(error.message)
    }
  }

  const handleCredSignIn = async (e) => 
  {
    e.preventDefault()

    if (!userAuth.email || !userAuth.password)
    {
      toast.error('Please enter your email and password')
      return
    }

    try
    {
      const req = await signIn('credentials', {
        email: userAuth.email,
        password: userAuth.password,
        redirect: false,
      })

      if (req?.error)
      {
        // Handle sign-in error (e.g., wrong credentials)
        toast.error('Invalid credentials. Please try again')
      } else
      {
        // Successful sign-in
        toast.success("Signed in successfully")
      }

    } catch (error)
    {
      Sentry.captureException(error.message)
      clientLog(error.message)
      toast.error(error.message)
    }

    setUserAuth({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      showPassword: false,
      pwStrength: 0,
      confirmPw: '',
      showConfirmPw: false,
      role: ''
    })
  }

  const submitForgotPw = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await signIn('email', {
        email
      })

      if (req?.error)
      {
        // Handle sign-in error (e.g., wrong credentials)
        toast.error('Check your email and try again.')
        clientLog(req.error)
      }

    } catch (error)
    {
      Sentry.captureException(error.message)
      clientLog(error.message)
      toast.error(error.message)
    }

    setEmail('')
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 min-h-screen">
      <RedirectAfterSignIn />
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="h-10 w-auto"
          />
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Not a member?{ ' ' }
            <a href="/auth/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register for a 14 day free trial
            </a>
          </p>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={ (e) => handleCredSignIn(e) } className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={ userAuth.email }
                    onChange={ (e) => setUserAuth(prev => ({
                      ...prev,
                      email: e.target.value
                    })) }
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm leading-6">
                    <button
                      type='button'
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                      onClick={ () => setOpenModal1(true) }
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>
                <div className="relative mt-2">
                  <input
                    id="password"
                    name="password"
                    type={ userAuth.showPassword ? 'text' : 'password' }
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={ userAuth.password }
                    onChange={ (e) => setUserAuth(prev => ({
                      ...prev,
                      password: e.target.value
                    })) }
                  />

                  <div className='absolute right-3 top-2'>
                    {
                      userAuth.showPassword ?
                        <EyeSlashIcon className='w-5 h-5 hover:cursor-pointer' onClick={ () => setUserAuth(prev => ({
                          ...prev,
                          showPassword: !userAuth.showPassword
                        })) } />
                        :
                        <EyeIcon className='w-5 h-5 hover:cursor-pointer' onClick={ () => setUserAuth(prev => ({
                          ...prev,
                          showPassword: !userAuth.showPassword
                        })) } />
                    }
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10">
            <div className="flex gap-1">
              <div className="w-full border-t border-gray-300" />
              <span className="-mt-3 text-sm font-medium leading-6 px-6 text-gray-900 whitespace-nowrap">Or continue with</span>
              <div className="w-full border-t border-gray-300" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                onClick={ () => handleSignin('google') }
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                  <path
                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                    fill="#EA4335"
                  />
                  <path
                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                    fill="#34A853"
                  />
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>

              <button
                className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
                onClick={ () => handleSignin('facebook') }
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-blue-500">
                  <path d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" /></svg>
                <span className="text-sm font-semibold leading-6">Facebook</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password / Magic Link Modal */ }
      <Modal
        title={ {
          text: 'Get Login Link',
          iconBg: 'bg-indigo-100',
          icon: <LinkIcon className="h-6 w-6 text-indigo-600" />
        } }
        btn={ {
          text: 'Send Link',
          color: 'bg-indigo-600',
          textColor: 'text-white',
          hover: 'hover:bg-indigo-500',
          onClick: (e) => submitForgotPw(e)
        } }
      >

        <div className='w-full'>
          <label htmlFor="email2" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email2"
              name="email2"
              type="email"
              className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default LoginPage