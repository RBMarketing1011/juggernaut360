export { default } from 'next-auth/middleware'

// Define the matcher for which paths this middleware will apply
export const config = {
  matcher: [
    '/account/:path*'
  ],
}