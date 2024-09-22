import EmailProvider from 'next-auth/providers/email'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from './adapter'

import connectDB from '@db/connectDB'
import User from '@db/models/user'
import CompanyAccount from '@db/models/account'

import bcrypt from 'bcrypt'
import * as Sentry from '@sentry/nextjs'
import encryptPw from '@lib/encrypt/encryptPw'

const authOptions = {
  adapter: MongoDBAdapter(client),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'username@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '******' }
      },
      async authorize (credentials)
      {
        let isAllowed

        await Sentry.startSpan({
          name: 'Email Signin',
          op: 'auth',
        }, async () =>
        {
          if (!credentials.email || !credentials.password)
          {
            isAllowed = null
          }

          // Check for user in DB
          await connectDB()
          const user = await User.findOne({ email: credentials.email })

          // If no user found or password doesn't match, return null
          if (!user || !(await bcrypt.compare(credentials.password, user.password)))
          {
            isAllowed = null
          } else
          {
            isAllowed = user
          }
        })

        return isAllowed
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn ({ profile, user, account })
    {
      let allowedToSignIn = false

      if (account)
      {
        if (account.provider === 'facebook' || account.provider === 'google')
        {
          try
          {
            await Sentry.startSpan({
              name: `${ account.provider } Signin`,
              op: 'auth',
            }, async () =>
            {
              await connectDB()
              const existingUser = await User.findOne({ email: profile.email })
              if (existingUser)
              {
                allowedToSignIn = existingUser.signInOpts === account.provider
              } else
              {
                const newUser = await User.create({
                  firstname: profile.given_name || profile.name.split(' ')[ 0 ],
                  lastname: profile.family_name || profile.name.split(' ')[ 1 ],
                  email: profile.email,
                  password: await encryptPw(profile.sub || profile.id),
                  role: 'owner',
                  isEmailVerified: true,
                  signInOpts: account.provider,
                })

                await CompanyAccount.create({
                  owner: newUser._id,
                  users: [],
                  jobs: [],
                  customers: [],
                })

                allowedToSignIn = true
              }
            })
          } catch (error)
          {
            throw new Error(error.message)
          }
        }
      } else if (user)
      {
        // For credentials sign-in
        await Sentry.startSpan({
          name: 'Email Signin',
          op: 'auth',
        }, async () =>
        {
          await connectDB()
          const userExists = await User.findOne({ email: user.email })
          allowedToSignIn = !!userExists
        })
      }

      console.log(allowedToSignIn)
      return allowedToSignIn
    },
    async jwt ({ token })
    {
      await connectDB()
      const user = await User.findById(token.sub).select('-password')
      let account = await CompanyAccount.findOne({ owner: user._id }).populate('owner users jobs customers')

      if (!account)
      {
        account = await CompanyAccount.findOne({ $in: { users: user._id } }).populate('owner users jobs customers')
      }

      token.user = user
      token.account = account

      return token
    },
    async session ({ session, token })
    {
      session.user = token.user
      session.account = token.account
      return session
    },
  },
  pages: {
    signIn: '/auth/login',
    verifyRequest: "/auth/verify", // (used for check email message)
    error: '/auth/error', // Error code page
  },
}

export { authOptions }