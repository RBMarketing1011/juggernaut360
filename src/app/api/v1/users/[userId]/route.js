import connectDB from '@db/connectDB'
import User from '@db/models/user'

const getUser = async (req, { params }) =>
{
  const { userId } = params

  try
  {
    await connectDB()
    const user = await User.findById(userId)

    if (!user) throw new Error('User not found')

    return Response.json({ success: user }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const updateUser = async (req, { params }) =>
{
  const { userId } = params
  const { firstname, lastname, email, password, role } = await req.json()

  try
  {
    await connectDB()
    const user = await User.findByIdAndUpdate(userId, { firstname, lastname, email, password, role }, { new: true })

    if (!user) throw new Error('User not found')

    return Response.json({ success: 'User updated successfully' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const deleteUser = async (req, { params }) =>
{
  const { userId } = params

  try
  {
    await connectDB()
    const user = await User.findByIdAndDelete(userId)

    if (!user) throw new Error('User not found')

    return Response.json({ success: 'User deleted successfully' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getUser as GET, updateUser as PUT, deleteUser as DELETE }