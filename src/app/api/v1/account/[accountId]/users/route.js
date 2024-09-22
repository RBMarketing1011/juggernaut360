import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import User from '@db/models/user'
import encryptPw from '@lib/encrypt/encryptPw'

const getUsersInAccount = async (req, { params }) =>
{
  const { accountId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('users')

    if (!account) throw new Error('Account not found')

    return Response.json({ users: account.users }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const createUserInAccount = async (req, { params }) =>
{
  const { accountId } = params
  const { firstname, lastname, email, password, role } = req.json()
  const hashPw = await encryptPw(password)

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)

    if (!account) throw new Error('Account not found')

    const user = await User.create({ firstname, lastname, email, password: hashPw, role })

    if (!user) throw new Error('User not created')

    account.users.push(user)
    await account.save()

    return Response.json({ success: 'User created and added to account' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getUsersInAccount as GET, createUserInAccount as POST }