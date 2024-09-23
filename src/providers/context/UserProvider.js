'use client'

import { useSession } from 'next-auth/react'
import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) =>
{
  // Session
  const { data: session, update } = useSession()
  // State
  const [ userAuth, setUserAuth ] = useState({
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

  const [ email, setEmail ] = useState('') // for forgot pw magic link

  return (
    <UserContext.Provider value={ {
      sessionState: [ session, update ],
      userAuthState: [ userAuth, setUserAuth ],
      emailState: [ email, setEmail ]
    } }>

      { children }

    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }