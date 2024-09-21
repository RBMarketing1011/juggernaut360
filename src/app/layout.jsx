import { Inter } from "next/font/google"

import AuthProvider from '@providers/AuthProvider'
import { UserProvider } from '@providers/context/UserProvider'
import { CustomerProvider } from '@providers/context/CustomerProvider'
import { JobProvider } from '@providers/context/JobProvider'
import { MiscProvider } from '@providers/context/MiscProvider'
import { ThemeProvider } from '@providers/context/ThemeProvider'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import '@styles/globals.css'

const inter = Inter({ subsets: [ "latin" ] })

export const metadata = {
  title: 'Add Title Here',
  description: 'Add Description Here'
}

const Layout = ({ children }) =>
{
  return (
    <html className="h-full" lang="en-US">
      <body className={ `h-full ${ inter.className }` }>
        <AuthProvider>
          <ThemeProvider>
            <UserProvider>
              <CustomerProvider>
                <JobProvider>
                  <MiscProvider>
                    <ToastContainer />
                    { children }
                  </MiscProvider>
                </JobProvider>
              </CustomerProvider>
            </UserProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

export default Layout