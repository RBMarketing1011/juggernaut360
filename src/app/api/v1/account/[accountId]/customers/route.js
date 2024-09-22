import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import Customer from '@db/models/customer'

const getCustomersInAccount = async (req, { params }) =>
{
  const { accountId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('customers')

    if (!account) throw new Error('Account not found')

    return Response.json({ success: account.customers }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const createCustomerInAccount = async (req, { params }) =>
{
  const { accountId } = params
  const { firstname, lastname, email, phone } = req.json()

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId)

    if (!account) throw new Error('Account not found')

    const customer = await Customer.create({ firstname, lastname, email, phone })

    if (!customer) throw new Error('Customer not created')

    account.customers.push(customer)
    await account.save()

    return Response.json({ success: customer }, { status: 201 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getCustomersInAccount as GET, createCustomerInAccount as POST }