'use client'

import { useContext, useEffect } from 'react'
import { MiscContext } from '@providers/context/MiscProvider'
import { UserContext } from '@providers/context/UserProvider'

const Danger = ({ text, onClick, link }) =>
{
  return (
    <a href={ link } className={ `${ link && 'hover:cursor-pointer' } inline-flex items-center gap-x-0.5 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10` }>
      { text }
      <button
        type="button"
        className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-red-600/20"
        onClick={ onClick }
      >
        <span className="sr-only">Remove</span>
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-red-600/50 group-hover:stroke-red-600/75">
          <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
        <span className="absolute -inset-1" />
      </button>
    </a>
  )
}

const Warn = ({ text, onClick, link }) =>
{
  return (
    <a href={ link } className={ `${ link && 'hover:cursor-pointer' } inline-flex items-center gap-x-0.5 rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20` }>
      { text }
      <button
        type="button"
        className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-yellow-600/20"
        onClick={ onClick }
      >
        <span className="sr-only">Remove</span>
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-yellow-700/50 group-hover:stroke-yellow-700/75">
          <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
        <span className="absolute -inset-1" />
      </button>
    </a>
  )
}

const Success = ({ text, onClick, link }) =>
{
  return (
    <a href={ link } className={ `${ link && 'hover:cursor-pointer' } inline-flex items-center gap-x-0.5 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20` }>
      { text }
      <button
        type="button"
        className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-green-600/20"
        onClick={ onClick }
      >
        <span className="sr-only">Remove</span>
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-green-700/50 group-hover:stroke-green-700/75">
          <path d="M4 4l6 6m0-6l-6 6" />
        </svg>
        <span className="absolute -inset-1" />
      </button>
    </a>
  )
}

const Messages = () =>
{
  const { messageState } = useContext(MiscContext)
  const [ message, setMessage ] = messageState

  const { sessionState } = useContext(UserContext)
  const [ session ] = sessionState

  useEffect(() =>
  {
    const messageData = JSON.parse(localStorage.getItem('J360MessageData')) || {}
    const lastShown = messageData.lastShown
    const currentTime = Date.now()

    // Check if the message was shown within the last 12 hours (12 * 60 * 60 * 1000 milliseconds)
    const twelveHours = 1000 * 60 * 60 * 12

    if (!lastShown || (currentTime - lastShown > twelveHours))
    {
      const currentDate = new Date(Date.now())
      const userCreatedAt = new Date(session?.user?.createdAt)
      const createdAtPlus14days = new Date(userCreatedAt.getTime() + (1000 * 60 * 60 * 24 * 14))

      const param1 = session?.user.isEmailVerified
      const param2 = currentDate < createdAtPlus14days

      if (!param1 && param2)
      {
        setMessage({
          text: 'Please verify your email address',
          type: 'danger',
          link: `/account/${ session?.account?._id }/users/${ session?.user?._id }/settings`,
          show: true
        })
      }
    }
  }, [ session, setMessage ])

  const hideMessage = () =>
  {
    setMessage(prev => ({ ...prev, show: false }))
    const messageData = {
      lastShown: Date.now()
    }
    localStorage.setItem('J360MessageData', JSON.stringify(messageData))
  }

  return (
    <main className='flex justify-center items-center'>

      { message.show &&
        message.type === 'danger' ?
        <Danger
          text={ message.text }
          link={ message.link }
          onClick={ hideMessage }
        />

        :

        message.type === 'warn' ?
          <Warn
            text={ message.text }
            link={ message.link }
            onClick={ hideMessage }
          />

          :

          message.type === 'success' &&
          <Success
            text={ message.text }
            link={ message.link }
            onClick={ hideMessage }
          />

      }

    </main>
  )
}

export default Messages