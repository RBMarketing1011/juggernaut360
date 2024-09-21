import connectDB from '@db/connectDB'
import Account from '@db/models/account'
import Job from '@db/models/job'
import Customer from '@db/models/customer'

const getJobsInAccount = async (req, { params }) =>
{
  const { accountId } = params

  try
  {
    await connectDB()
    const account = await Account.findById(accountId).populate('jobs')

    if (!account) throw new Error('Account not found')

    return Response.json({ jobs: account.jobs }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const createJobInAccount = async (req, { params }) =>
{
  const { accountId } = params
  const {
    customerId, movingFromAddress, movingToAddress,
    dateOfMove, numberOfMovers, notes
  } = req.json()

  try
  {
    await connectDB()
    const account = await Account.findById(accountId)
    const customer = await Customer.findById(customerId)

    if (!account || !customer) throw new Error('Account or Customer not found')

    const job = await Job.create({
      account: account._id,
      customer: customer._id,
      movingFromAddress,
      movingToAddress,
      dateOfMove,
      numberOfMovers,
      notes,
      assignedEmployees: [],
      inventory: [],
      packingMaterials: [],
      documents: [],
      photos: [],
    })

    account.jobs.push(job)
    await account.save()

    return Response.json({ message: 'Job created' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getJobsInAccount as GET, createJobInAccount as POST }