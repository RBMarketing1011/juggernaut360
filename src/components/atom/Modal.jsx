'use client'

import { useContext } from 'react'

import
{
  Dialog, DialogBackdrop, DialogPanel, DialogTitle
} from '@headlessui/react'
import
{
  XMarkIcon
} from '@heroicons/react/24/outline'

import { MiscContext } from '@providers/context/MiscProvider'

const Modal = ({ title, btn, children }) =>
{
  const { modal1State } = useContext(MiscContext)

  const [ openModal1, setOpenModal1 ] = modal1State

  return (
    <Dialog open={ openModal1 } onClose={ setOpenModal1 } className="relative z-[1000]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                type="button"
                onClick={ () => setOpenModal1(false) }
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">

              {
                title.icon &&
                <div className={ `mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${ title.iconBg } sm:mx-0 sm:h-10 sm:w-10` }>
                  { title.icon }
                </div>
              }

              <div className="w-full mt-3 text-center sm:mx-4 sm:mt-0 sm:text-left">

                {
                  title.text &&
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    { title.text }
                  </DialogTitle>
                }

                <div className={ `${ title.text && 'mt-2' }` }>

                  {/* CONTENT */ }
                  { children }

                </div>
              </div>

              {
                title.icon &&
                <div className={ `mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-transparent sm:mx-0 sm:h-10 sm:w-10` }></div>
              }

            </div>
            <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={ btn.onClick }
                className={ `inline-flex w-full justify-center rounded-md ${ btn.color } px-3 py-2 text-sm font-semibold ${ btn.textColor } shadow-sm ${ btn.hover } sm:ml-3 sm:w-auto` }
              >
                { btn.text }
              </button>
              <button
                type="button"
                onClick={ () => setOpenModal1(false) }
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default Modal