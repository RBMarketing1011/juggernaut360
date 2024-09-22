// import EmailProvider from 'next-auth/providers/email'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import CredentialsProvider from 'next-auth/providers/credentials'
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import clientPromise from './adapter'

// import connectDB from '@db/connectDB'
// import User from '@db/models/user'
// import CompanyAccount from '@db/models/account'

// import bcrypt from 'bcrypt'
// import * as Sentry from '@sentry/nextjs'
// import encryptPw from '@lib/encrypt/encryptPw'

// let dynamicSlug = ''

// const authOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD
//         }
//       },
//       from: process.env.EMAIL_FROM
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       allowDangerousEmailAccountLinking: true,
//     }),
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {
//         email: { label: 'Email', type: 'text', placeholder: 'username@example.com' },
//         password: { label: 'Password', type: 'password', placeholder: '******' }
//       },
//       async authorize (credentials)
//       {
//         let isAllowed
//         // check for credentials
//         await Sentry.startSpan({
//           name: 'Email Signin',
//           op: 'auth',
//         }, async () =>
//         {
//           if (!credentials.email || !credentials.password)
//           {
//             isAllowed = null
//           }
//           // check for user
//           await connectDB()
//           const user = await User.findOne({ email: credentials.email })

//           // if no user return null
//           if (!user)
//           {
//             isAllowed = null
//           }

//           //compare PW
//           const matched = await bcrypt.compare(credentials.password, user.password)

//           // if pw dont match return null
//           if (!matched)
//           {
//             isAllowed = null
//           }

//           isAllowed = user
//         })

//         // return user if everything checks out
//         return isAllowed
//       }
//     }),
//   ],
//   session: {
//     strategy: 'jwt'
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   // debug: process.env.NODE_ENV === 'development',
//   callbacks: {
//     //Invoked on successful signin
//     async signIn ({ profile, user, account })
//     {
//       let allowedToSignIn = false
//       let reason = ''

//       if (account)
//       {
//         if (account.provider === 'facebook')
//         {
//           try
//           {
//             await Sentry.startSpan({
//               name: 'Facebook Signin',
//               op: 'auth',
//             }, async () =>
//             {
//               await connectDB()
//               const user = await User.findOne({ email: profile.email })
//               if (user)
//               {
//                 if (user.signInOpts !== 'facebook')
//                 {
//                   allowedToSignIn = false
//                   reason = 'User does not sign in with Facebook'
//                 } else
//                 {
//                   allowedToSignIn = true
//                   reason = 'User signs in with Facebook'
//                 }
//               } else if (!user)
//               {
//                 const name = profile.name.split(' ')

//                 const user = await User.create({
//                   firstname: name[ 0 ],
//                   lastname: name[ 1 ],
//                   email: profile.email,
//                   password: await encryptPw(profile.id),
//                   role: 'owner',
//                   isEmailVerified: true,
//                   signInOpts: 'facebook',
//                 })

//                 await CompanyAccount.create({
//                   owner: user._id,
//                   users: [],
//                   jobs: [],
//                   customers: [],
//                 })

//                 allowedToSignIn = true
//                 reason = 'User created and signed in with Facebook'
//               }
//             })

//             console.log(allowedToSignIn)
//             console.log(reason)
//           } catch (error)
//           {
//             throw new Error(error.message)
//           }

//         } else if (account.provider === 'google')
//         {
//           try
//           {
//             await Sentry.startSpan({
//               name: 'Google Signin',
//               op: 'auth',
//             }, async () =>
//             {
//               await connectDB()
//               const user = await User.findOne({ email: profile.email })
//               if (user)
//               {
//                 if (user.signInOpts !== 'google')
//                 {
//                   allowedToSignIn = false
//                 } else
//                 {
//                   allowedToSignIn = true

//                 }
//               } else if (!user)
//               {
//                 const user = await User.create({
//                   firstname: profile.given_name,
//                   lastname: profile.family_name,
//                   email: profile.email,
//                   password: await encryptPw(profile.sub),
//                   role: 'owner',
//                   isEmailVerified: true,
//                   signInOpts: 'google',
//                 })

//                 const account = await CompanyAccount.create({
//                   owner: user._id,
//                   users: [],
//                   jobs: [],
//                   customers: [],
//                 })

//                 allowedToSignIn = true
//                 dynamicSlug = '/account/' + account._id + '/dashboard'
//               }
//             })
//           } catch (error)
//           {
//             return 'NO'
//           }
//         }

//       } else if (user)
//       {
//         console.log('USER:')
//         console.log(user)
//         await Sentry.startSpan({
//           name: 'Email Signin',
//           op: 'auth',
//         }, async () =>
//         {
//           await connectDB()
//           const userExists = await User.findOne({
//             email: user.email,  //the user object has the email the user entered.
//           })
//           if (userExists)
//           {
//             allowedToSignIn = true   //if the email exists in the User collection, email them a magic login link
//           } else
//           {
//             allowedToSignIn = false
//           }
//         })
//       }

//       if (allowedToSignIn)
//       {
//         return true
//       } else
//       {
//         return false
//       }
//     },
//     async jwt ({ token })
//     {
//       // Persist the OAuth access_token and or the user id to the token right after signin
//       await connectDB()
//       const user = await User.findById(token.sub).select('-password')
//       let account = await CompanyAccount.findOne({ owner: user._id }).populate('owner users jobs customers')

//       if (!account)
//       {
//         account = await CompanyAccount.findOne({ $in: { users: user._id } }).populate('owner users jobs customers')
//       }

//       token.user = user
//       token.account = account

//       return token
//     },
//     // Modify session object
//     async session ({ session, token })
//     {
//       //assign User ID to session
//       session.user = token.user
//       session.account = token.account
//       //return session
//       return session
//     },
//     async redirect ({ url, baseUrl })
//     {
//       return baseUrl + dynamicSlug
//     }
//   },
//   pages: {
//     signIn: '/auth/login',
//     verifyRequest: "/auth/verify", // (used for check email message)
//   }
// }

// export { authOptions }

























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