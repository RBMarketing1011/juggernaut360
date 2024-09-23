import connectDB from '@db/connectDB'
import encryptPw from '@lib/encrypt/encryptPw'
import User from '@db/models/user'
import { logger } from '@lib/helpers/winston/logger'
import CompanyAccount from '@db/models/account'

const getAllUsers = async (req) =>
{
  try
  {
    await connectDB()
    const users = await User.find({})

    if (!users) throw new Error('No users found')

    return Response.json({ success: users }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const createUser = async (req) =>
{
  const { firstname, lastname, email, password, signInOpts, role } = await req.json()
  const hashPw = await encryptPw(password)

  try
  {
    await connectDB()

    const userExists = await User.findOne({ email })

    if (userExists) return Response.json({ error: 'User already exists' }, { status: 400 })

    const user = await User.create({ firstname, lastname, email, password: hashPw, signInOpts, role })

    if (!user) return Response.json({ error: 'User not created' }, { status: 400 })

    const account = await CompanyAccount.create({
      owner: user._id,
      users: [],
      jobs: [],
      customers: []
    })

    if (!account) return Response.json({ error: 'Account not created' }, { status: 400 })

    return Response.json({ success: 'User created successfully' }, { status: 200 })
  } catch (error)
  {
    logger.error(error.message)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getAllUsers as GET, createUser as POST }