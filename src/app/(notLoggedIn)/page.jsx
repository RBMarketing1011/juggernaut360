
const Home = () =>
{
  return (
    <main className='w-screen h-screen flex flex-col justify-center items-center gap-10'>
      <a href="/auth/login" className='w-[300px] bg-cyan-500 text-cyan-950 p-3 rounded-md text-center text-2xl font-bold uppercase'>
        Login
      </a>

      <a href="/auth/register" className='w-[300px] bg-cyan-500 text-cyan-950 p-3 rounded-md text-center text-2xl font-bold uppercase'>
        Register
      </a>
    </main>
  )
}

export default Home