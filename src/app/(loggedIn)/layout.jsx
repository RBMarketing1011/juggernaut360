'use client'

import Sidebar from '@components/organism/backend/Sidebar'
import { useParams } from 'next/navigation'

const Layout = ({ children }) =>
{
  const { accountId } = useParams()

  return (
    <Sidebar accountId={ accountId }>
      { children }
    </Sidebar>
  )
}

export default Layout