'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const RedirectAfterSignIn = () =>
{
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() =>
  {
    // When session is available, redirect to the dynamic dashboard URL
    if (session?.account?._id)
    {
      router.push(`/account/${ session.account._id }/dashboard`)
    }
  }, [ session, router ])

  return null // This component doesn't render anything, just handles redirection
}

export default RedirectAfterSignIn