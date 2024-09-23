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
import { logger } from '@lib/helpers/winston/logger'

import { transporter } from '@lib/nodemailer/Transporter'

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
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier: email, url, token, baseUrl, provider }) =>
      {

        console.log(baseUrl)
        await transporter.sendMail({
          from: process.env.EMAIL_FROM,
          to: email,
          subject: `Sign in to Juggernaut 360®`,
          text: "Here's your link to sign in:",
          html: `
            <body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Arial', sans-serif;">
              <div style="max-width: 450px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); overflow: hidden; text-align: center;">
                  <div style="background-color: rgb(79, 70, 229); color: white; padding: 40px;">
                      <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome Aboard!</h1>
                      <p style="margin: 10px 0; font-size: 16px;">We're thrilled to have you with us.</p>
                  </div>
                  <div style="padding: 30px;">
                      <p style="font-size: 16px; line-height: 1.5; color: #374151;">
                          Hi there! Thank you for joining us. To get started, please click the button below:
                      </p>
                      <a href="${ baseUrl }" style="display: inline-block; margin: 20px 0; padding: 15px 30px; background-color: rgb(79, 70, 229); color: white; text-decoration: none; border-radius: 5px; font-size: 18px; font-weight: bold;">
                          Get Started
                      </a>
                      <p style="font-size: 16px; line-height: 1.5; color: #374151;">
                          If you have any questions, feel free to reach out to our support team. We’re here to help!
                      </p>
                  </div>
                  <div style="background-color: #f3f4f6; padding: 30px;">
                      <div style="margin-bottom: 20px;">
                          <a href="https://facebook.com" style="margin: 0 10px;">
                              <img src="https://img.icons8.com/color/facebook-new.png" alt="Facebook" width="24" />
                          </a>
                          <a href="https://twitter.com" style="margin: 0 10px;">
                              <img src="https://img.icons8.com/color/twitter-squared.png" alt="Twitter" width="24" />
                          </a>
                          <a href="https://instagram.com" style="margin: 0 10px;">
                              <img src="https://img.icons8.com/color/instagram-new.png" alt="Instagram" width="24" />
                          </a>
                      </div>
                      <p style="font-size: 12px; color: #6b7280;">
                          &copy; 2024 Your Company. All rights reserved.
                      </p>
                      <p style="font-size: 12px; color: #6b7280;">
                          <a href="#" style="color: rgb(79, 70, 229); text-decoration: none;">Privacy Policy</a> | <a href="#" style="color: rgb(79, 70, 229); text-decoration: none;">Terms of Service</a>
                      </p>
                  </div>
              </div>
          </body>
          `,
        })
      },
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
        try
        {
          // Start Sentry span for tracking
          return await Sentry.startSpan(
            {
              name: 'Email Signin',
              op: 'auth',
            },
            async () =>
            {
              // Check for missing credentials
              if (!credentials.email || !credentials.password)
              {
                return null // Return null if credentials are missing
              }

              // Check for user in DB
              await connectDB()
              const user = await User.findOne({ email: credentials.email })

              // If no user is found or password doesn't match, return null
              if (!user || !(await bcrypt.compare(credentials.password, user.password)))
              {
                return null
              }

              // If authentication is successful, return the user object
              return user
            }
          )
        } catch (error)
        {
          // Capture any unexpected error in Sentry and return null
          Sentry.captureException(error)
          logger.error(error.message)
          return null
        }
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
      } else if (account.provider === 'credentials' || user)
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