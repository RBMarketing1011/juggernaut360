import EmailProvider from 'next-auth/providers/email'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import connectDB from '@db/connectDB'
import User from '@db/models/user'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from './adapter'

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
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
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'username@example.com' },
        password: { label: 'Password', type: 'password', placeholder: '******' }
      },
      async authorize (credentials)
      {
        // check for credentials
        if (!credentials.email || !credentials.password)
        {
          return null
        }
        // check for user
        await connectDB()
        const user = await User.findOne({ email: credentials.email })

        // if no user return null
        if (!user)
        {
          return null
        }

        //compare PW 
        const matched = await bcrypt.compare(credentials.password, user.password)

        // if pw dont match return null 
        if (!matched)
        {
          return null
        }

        // return user if everything checks out 
        return user
      }
    }),
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  // debug: process.env.NODE_ENV === 'development',
  callbacks: {
    //Invoked on successful signin 
    async signIn ({ profile, user })
    {
      await connectDB()
      const userExists = await User.findOne({
        email: user.email,  //the user object has the email the user entered.
      })
      if (userExists)
      {
        return true   //if the email exists in the User collection, email them a magic login link
      } else
      {
        return "/auth/register"
      }
    },
    async jwt ({ token })
    {
      // Persist the OAuth access_token and or the user id to the token right after signin
      await connectDB()
      const user = await User.findById(token.sub).select('-password')

      token.user = user

      return token
    },
    // Modify session object 
    async session ({ session, token })
    {
      //assign User ID to session 
      session.user = token.user
      //return session 
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    verifyRequest: "/auth/verify", // (used for check email message)
  }
}

export { authOptions }