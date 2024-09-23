
import RedirectAfterSignIn from '@lib/helpers/RedirectAfterSignIn'

const VerifyPage = () =>
{
  return (
    <div className="min-h-screen flex justify-center items-center py-24 sm:py-32">
      <RedirectAfterSignIn />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center lg:text-left mx-auto max-w-2xl lg:mx-0">
          <p className="text-base font-semibold leading-7 text-indigo-600">
            Get Access
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Check Your Email
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We’ve sent you an email with a link to securely log in to your account. Once logged in, you can easily reset your password from your profile settings. If you don’t see the email in your inbox, please check your spam or junk folder.
          </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyPage