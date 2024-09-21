'use client'

import { createContext, useState } from 'react'

const MiscContext = createContext()

const MiscProvider = ({ children }) =>
{
  const [ mobileMenuOpen, setMobileMenuOpen ] = useState(false)

  return (
    <MiscContext.Provider value={ {
      mobileMenuState: [ mobileMenuOpen, setMobileMenuOpen ]
    } }>

      { children }

    </MiscContext.Provider>
  )
}

export { MiscContext, MiscProvider }