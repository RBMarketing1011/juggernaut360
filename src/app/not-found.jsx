import Navbar from '@components/organism/frontend/Navbar'
import Image from 'next/image'

const NotFound = () =>
{
  return (
    <div className="flex flex-col justify-end min-h-full lg:grid grid-cols-1 grid-rows-[1fr,auto,1fr] bg-white lg:grid-cols-[max(50%,36rem),1fr]">
      <Navbar />
      <main className="my-auto text-center lg:text-left mx-auto w-full max-w-7xl px-6 py-24 sm:py-32 lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:px-8">
        <div className="w-full lg:max-w-lg">
          <p className="text-base font-semibold leading-8 text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10">
            <a href="/" className="text-sm font-semibold leading-7 text-indigo-600">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </main>
      <footer className="w-full lg:text-left self-end lg:col-span-2 lg:col-start-1 lg:row-start-3">
        <div className="border-t border-gray-100 bg-gray-50 py-10">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-center lg:justify-start gap-x-4 px-6 text-sm leading-7 text-gray-600 lg:px-8">
            <a href="#">Contact support</a>
            <svg viewBox="0 0 2 2" aria-hidden="true" className="h-0.5 w-0.5 fill-gray-300">
              <circle r={ 1 } cx={ 1 } cy={ 1 } />
            </svg>
            <a href="#">Status</a>
          </nav>
        </div>
      </footer>
      <div className="hidden lg:relative lg:col-start-2 lg:row-start-1 lg:row-end-4 lg:block">
        <Image
          src='/images/walkingInDessert.avif'
          width={ 0 }
          height={ 0 }
          alt='Walking In The Dessert'
          className='h-screen w-full object-cover object-bottom'
          sizes='100vw'
        />
      </div>
    </div>
  )
}

export default NotFound