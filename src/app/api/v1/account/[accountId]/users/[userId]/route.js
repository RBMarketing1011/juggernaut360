import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import User from '@db/models/user'
import encryptPw from '@lib/encrypt/encryptPw'

const getUserInAccount = async (req, { params }) =>
{
  const { accountId, userId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('users')
    const user = account.users.find(user => user._id == userId)

    if (!user) throw new Error('User not found in account')

    return Response.json({ success: user }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const updateUserInAccount = async (req, { params }) =>
{
  const { accountId, userId } = params
  const { firstname, lastname, email, password, role } = req.json()
  const hashPw = await encryptPw(password)

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)
    const user = await User.findById(userId)

    if (!account || !user) throw new Error('Account or User not found')

    const userInAccount = account.users.find(user => user._id == userId)

    if (!userInAccount) throw new Error('User not found in account')

    user.firstname = firstname || user.firstname
    user.lastname = lastname || user.lastname
    user.email = email || user.email
    user.password = hashPw || user.password
    user.role = role || user.role
    await user.save()

    return Response.json({ success: 'User updated' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const deleteUserInAccount = async (req, { params }) =>
{
  const { accountId, userId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)
    const user = await User.findById(userId)

    if (!account || !user) throw new Error('Account or User not found')

    const userInAccount = account.users.find(user => user._id == userId)

    if (!userInAccount) throw new Error('User not found in account')

    await User.findByIdAndDelete(userId)

    return Response.json({ success: 'User deleted' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getUserInAccount as GET, updateUserInAccount as PUT, deleteUserInAccount as DELETE }