import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from './providers'

import '@components/template/styles/tailwind.css'

const inter = Inter({
  subsets: [ 'latin' ],
  display: 'swap',
  variable: '--font-inter',
})

const monaSans = localFont({
  src: '../../../components/template/fonts/Mona-Sans.var.woff2',
  display: 'swap',
  variable: '--font-mona-sans',
  weight: '200 900',
})

export const metadata = {
  title: 'Juggernaut 360®',
  description:
    'Commit is a lightweight Git client you can open from anywhere any time you’re ready to commit your work with a single keyboard shortcut. It’s fast, beautiful, and completely unnecessary.',
}

export default function RootLayout ({ children })
{
  return (
    <html
      lang="en"
      className={ clsx('h-full antialiased', inter.variable, monaSans.variable) }
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  )
}
