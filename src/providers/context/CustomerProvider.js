'use client'

import { createContext, useState } from 'react'

const CustomerContext = createContext()

const CustomerProvider = ({ children }) =>
{
  const [ customer, setCustomer ] = useState(null)

  return (
    <CustomerContext.Provider value={ {
      customerState: [ customer, setCustomer ]
    } }>

      { children }

    </CustomerContext.Provider>
  )
}

export { CustomerContext, CustomerProvider }