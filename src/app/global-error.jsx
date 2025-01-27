"use client"

import { clientLog } from '@lib/helpers/winston/clientLog'
import * as Sentry from "@sentry/nextjs"
import Error from "next/error"
import { useEffect } from "react"

export default function GlobalError ({ error })
{
  useEffect(() =>
  {
    clientLog(error.message)
    Sentry.captureException(error)
  }, [ error ])

  return (
    <html>
      <body>
        {/* Your Error component here... */ }
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={ 0 } />
      </body>
    </html>
  )
}