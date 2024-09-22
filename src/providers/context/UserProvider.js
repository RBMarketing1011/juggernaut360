'use client'

import { useSession } from 'next-auth/react'
import { createContext, useState } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) =>
{
  // Session
  const { data: session, update } = useSession()
  // State
  const [ user, setUser ] = useState(null)

  return (
    <UserContext.Provider value={ {
      sessionState: [ session, update ],
      userState: [ user, setUser ]
    } }>

      { children }

    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }