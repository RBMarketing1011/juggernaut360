'use client'

import { createContext, useState } from 'react'

const ThemeContext = createContext()

const ThemeProvider = ({ children }) =>
{
  const [ theme, setTheme ] = useState(null)

  return (
    <ThemeContext.Provider value={ {
      themeState: [ theme, setTheme ]
    } }>

      { children }

    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }