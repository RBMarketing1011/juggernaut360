import connectDB from '@db/connectDB'
import Account from '@db/models/account'
import User from '@db/models/user'
import encryptPw from '@lib/encrypt/encryptPw'

const getAllAccounts = async (req) =>
{
  try
  {
    await connectDB()
    const accounts = await Account.find({})

    if (!accounts) throw new Error('No accounts found')

    return Response.json({ success: accounts }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const createAccount = async (req) =>
{
  const { firstname, lastname, email, password, role } = await req.json()
  const hashPw = await encryptPw(password)

  try
  {
    await connectDB()
    const user = await User.create({ firstname, lastname, email, password: hashPw, role })
    const account = await Account.create({ owner: user._id, users: [], jobs: [], customers: [] })

    if (!account || !user) throw new Error('User or Account not created. Please try again!')

    return Response.json({ success: 'Account created successfully' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getAllAccounts as GET, createAccount as POST }