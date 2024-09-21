import Navbar from '@components/organism/frontend/Navbar'

const Layout = ({ children }) =>
{
  return (
    <main>
      <Navbar />
      { children }
    </main>
  )
}

export default Layout