'use client'

import { Button } from '@components/template/components/Button'
import { sentryErrorLogger } from '@lib/helpers/sentryErrorLogger'

const TestingPage = () =>
{
  return (
    <main
      style={ {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      } }
    >
      <Button
        style={ {
          padding: "12px",
          cursor: "pointer",
          backgroundColor: "#AD6CAA",
          borderRadius: "4px",
          border: "none",
          color: "white",
          fontSize: "14px",
          margin: "18px",
        } }
        onClick={ () => sentryErrorLogger(() => { throw new Error('Test Error Logger Error') }) }>
        Test Error
      </Button>
    </main>
  )
}

export default TestingPage