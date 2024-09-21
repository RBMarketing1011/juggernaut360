'use client'

import { useId, useState } from 'react'

import { Button } from '@components/template/components/Button'
import { toast } from 'react-toastify'

export function SignUpForm ()
{
  let id = useId()
  const [ email, setEmail ] = useState('')

  const submitForm = async (e) =>
  {
    e.preventDefault()

    try
    {
      const req = await fetch('/api/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const res = await req.json()

      if (res.error)
      {
        toast.error(res.error)
      } else
      {
        toast.success(res.success)
      }
    } catch (error)
    {
      toast.error(error.message)
    }

    setEmail('')

  }

  return (
    <form onSubmit={ submitForm } className="relative isolate mt-8 flex items-center pr-1">
      <label htmlFor={ id } className="sr-only">
        Email address
      </label>
      <input
        required
        type="email"
        autoComplete="email"
        name="email"
        id={ id }
        placeholder="Email address"
        className="peer w-0 flex-auto bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <Button type="submit" arrow>
        Get Early Access
      </Button>
      <div className="absolute inset-0 -z-10 rounded-lg transition peer-focus:ring-4 peer-focus:ring-sky-300/15" />
      <div className="absolute inset-0 -z-10 rounded-lg bg-white/2.5 ring-1 ring-white/15 transition peer-focus:ring-sky-300" />
    </form>
  )
}
