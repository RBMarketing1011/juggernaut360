import connectDB from '@db/connectDB'
import encryptPw from '@lib/encrypt/encryptPw'
import User from '@db/models/user'

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
  const { firstname, lastname, email, password, role } = await req.json()
  const hashPw = await encryptPw(password)

  try
  {
    await connectDB()
    const user = await User.create({ firstname, lastname, email, password: hashPw, role })

    if (!user) throw new Error('User not created')

    return Response.json({ success: 'User created successfully' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getAllUsers as GET, createUser as POST }