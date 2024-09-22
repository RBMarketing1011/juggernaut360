import connectDB from '@db/connectDB'
import CompanyAccount from '@db/models/account'
import Customer from '@db/models/customer'

const getCustomerInAccount = async (req, { params }) =>
{
  const { accountId, customerId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('customers')
    const customer = await Customer.findById(customerId)

    if (!account || !customer) throw new Error('Account or Customer not found')

    const customerInAccount = account.customers.find(customer => customer.id === customerId)

    if (!customerInAccount) throw new Error('Customer not found in Account')

    return Response.json({ success: customer }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const updateCustomerInAccount = async (req, { params }) =>
{
  const { accountId, customerId } = params
  const { firstname, lastname, email, phone } = req.json()

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('customers')
    const customer = await Customer.findById(customerId)

    if (!account || !customer) throw new Error('Account or Customer not found')

    const customerInAccount = account.customers.find(customer => customer.id === customerId)

    if (!customerInAccount) throw new Error('Customer not found in Account')

    customer.firstname = firstname || customer.firstname
    customer.lastname = lastname || customer.lastname
    customer.email = email || customer.email
    customer.phone = phone || customer.phone
    await customer.save()

    return Response.json({ success: 'Customer updated' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const deleteCustomerInAccount = async (req, { params }) =>
{
  const { accountId, customerId } = params

  try
  {
    await connectDB()
    const account = await CompanyAccount.findById(accountId).populate('customers')
    const customer = await Customer.findById(customerId)

    if (!account || !customer) throw new Error('Account or Customer not found')

    const customerInAccount = account.customers.find(customer => customer.id === customerId)

    if (!customerInAccount) throw new Error('Customer not found in Account')

    await Customer.findByIdAndDelete(customerId)

    return Response.json({ success: 'Customer deleted' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getCustomerInAccount as GET, updateCustomerInAccount as PUT, deleteCustomerInAccount as DELETE }