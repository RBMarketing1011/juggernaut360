'use client'

import { useContext, useId } from 'react'
import { MiscContext } from '@providers/context/MiscProvider'
import { UserContext } from '@providers/context/UserProvider'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import
{
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from '@headlessui/react'
import
{
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  RectangleGroupIcon,
  CalendarDaysIcon,
  UserGroupIcon,
  ChartPieIcon,
  RocketLaunchIcon,
  ClipboardDocumentListIcon,
  DocumentCurrencyDollarIcon,
  FaceSmileIcon,
  Cog6ToothIcon,
  TruckIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Messages from '@components/atom/Messages'

const Sidebar = ({ children, accountId }) =>
{
  const { mobileMenuState, messageState } = useContext(MiscContext)
  const [ mobileMenuOpen, setMobileMenuOpen ] = mobileMenuState
  const [ message, setMessage ] = messageState

  const { sessionState } = useContext(UserContext)
  const [ session, update ] = sessionState

  const path = usePathname()

  const operations = [
    {
      name: 'Dashboard',
      href: `/account/${ accountId }/dashboard`,
      icon: RectangleGroupIcon
    },
    {
      name: 'Calendar',
      href: `/account/${ accountId }/calendar`,
      icon: CalendarDaysIcon
    },
    {
      name: 'Leads',
      href: `/account/${ accountId }/leads`,
      icon: RocketLaunchIcon
    },
    {
      name: 'Team',
      href: `/account/${ accountId }/team`,
      icon: UserGroupIcon
    },
    {
      name: 'Dispatch',
      href: `/account/${ accountId }/dispatch`,
      icon: TruckIcon
    },
  ]

  const financials = [
    {
      name: 'Invoices',

      href: `/account/${ accountId }/invoices`,
      icon: DocumentCurrencyDollarIcon
    },
    {
      name: 'Estimates',
      href: `/account/${ accountId }/estimates`,
      icon: ClipboardDocumentListIcon
    },
  ]

  const admin = [
    {
      name: 'Reports',
      href: `/account/${ accountId }/reports`,
      icon: ChartPieIcon
    },
    {
      name: 'Surveys',
      href: `/account/${ accountId }/surveys`,
      icon: FaceSmileIcon
    },
  ]
  const userNavigation = [
    { name: 'Your profile', href: `/account/${ accountId }/users/${ session?.user?._id }/settings` },
    { name: 'Sign out', onClick: () => signOut() },
  ]

  return (
    <>
      <div>
        <Dialog open={ mobileMenuOpen } onClose={ setMobileMenuOpen } className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={ () => setMobileMenuOpen(false) }
                    className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              {/* Sidebar component, swap this element with another sidebar if you like */ }
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">

                        {
                          operations.map(item => (

                            <li key={ useId() }>
                              <a
                                href={ item.href }
                                className={ `${ path === item.href
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6` }
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={ `${ path === item.href
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600' }
                                    h-6 w-6 shrink-0`}
                                />
                                { item.name }
                              </a>
                            </li>

                          ))
                        }

                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">Finance</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">

                        {
                          financials.map(item => (

                            <li key={ useId() }>
                              <a
                                href={ item.href }
                                className={ `${ path === item.href
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6` }
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={ `${ path === item.href
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600' }
                                    h-6 w-6 shrink-0`}
                                />
                                { item.name }
                              </a>
                            </li>

                          ))
                        }

                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">Admin</div>
                      <ul role="list" className="-mx-2 mt-2 space-y-1">

                        {
                          admin.map(item => (

                            <li key={ useId() }>
                              <a
                                href={ item.href }
                                className={ `${ path === item.href
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6` }
                              >
                                <item.icon
                                  aria-hidden="true"
                                  className={ `${ path === item.href
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600' }
                                    h-6 w-6 shrink-0`}
                                />
                                { item.name }
                              </a>
                            </li>

                          ))
                        }

                      </ul>
                    </li>
                    <li className="mt-auto">
                      <a
                        href="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                      >
                        <Cog6ToothIcon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                        />
                        Settings
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */ }
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */ }
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">

                    {
                      operations.map(item => (

                        <li key={ useId() }>
                          <a
                            href={ item.href }
                            className={ `${ path === item.href
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6` }
                          >
                            <item.icon
                              aria-hidden="true"
                              className={ `${ path === item.href
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600' }
                                    h-6 w-6 shrink-0`}
                            />
                            { item.name }
                          </a>
                        </li>

                      ))
                    }

                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Finance</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">

                    {
                      financials.map(item => (

                        <li key={ useId() }>
                          <a
                            href={ item.href }
                            className={ `${ path === item.href
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6` }
                          >
                            <item.icon
                              aria-hidden="true"
                              className={ `${ path === item.href
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600' }
                                    h-6 w-6 shrink-0`}
                            />
                            { item.name }
                          </a>
                        </li>

                      ))
                    }

                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Admin</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">

                    {
                      admin.map(item => (

                        <li key={ useId() }>
                          <a
                            href={ item.href }
                            className={ `${ path === item.href
                              ? 'bg-gray-50 text-indigo-600'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600' } group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6` }
                          >
                            <item.icon
                              aria-hidden="true"
                              className={ `${ path === item.href
                                ? 'text-indigo-600'
                                : 'text-gray-400 group-hover:text-indigo-600' }
                                    h-6 w-6 shrink-0`}
                            />
                            { item.name }
                          </a>
                        </li>

                      ))
                    }

                  </ul>
                </li>
                <li className="mt-auto">
                  <a
                    href="#"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  >
                    <Cog6ToothIcon
                      aria-hidden="true"
                      className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 lg:mx-auto lg:max-w-8xl lg:px-8">
            <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-0 lg:shadow-none">
              <button
                type="button"
                onClick={ () => setMobileMenuOpen(true) }
                className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Separator */ }
              <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form action="#" method="GET" className="relative flex flex-1">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                  />
                  <input
                    id="search-field"
                    name="search"
                    type="search"
                    placeholder="Search..."
                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                  />
                </form>
                <Messages />
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Separator */ }
                  <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />

                  {/* Profile dropdown */ }
                  <Menu as="div" className="relative">
                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <div
                        className="flex justify-center items-center bg-indigo-100 text-indigo-600 rounded-full p-1 ring-1 ring-indigo-600 w-7 h-7 text-sm">
                        { session?.user?.firstname?.charAt(0).toUpperCase() }{ session?.user?.lastname?.charAt(0).toUpperCase() }
                      </div>
                      <span className="hidden lg:flex lg:items-center">
                        <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                          { session?.user?.firstname }
                        </span>
                        <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
                      </span>
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      { userNavigation.map((item) => (
                        <MenuItem key={ item.name }>

                          {
                            item.href ?
                              <a
                                href={ item.href }
                                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                              >
                                { item.name }
                              </a>

                              :

                              item.onClick &&

                              <button
                                type='button'
                                className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                                onClick={ item.onClick }
                              >
                                { item.name }
                              </button>
                          }

                        </MenuItem>
                      )) }
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
              {/* Your content */ }
              { children }
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Sidebar