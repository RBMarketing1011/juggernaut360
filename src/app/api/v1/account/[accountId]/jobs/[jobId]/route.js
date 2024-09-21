import connectDB from '@db/connectDB'
import Account from '@db/models/account'
import Job from '@db/models/job'

const getJobInAccount = async (req, { params }) =>
{
  const { accountId, jobId } = params

  try
  {
    await connectDB()
    const account = await Account.findById(accountId)
    const job = await Job.findById(jobId)

    if (!account || !job) throw new Error('Account or Job not found')

    const jobInAccount = account.jobs.find(job => job._id === jobId)

    if (!jobInAccount) throw new Error('Job not found in Account')

    return Response.json({ success: job }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const updateJobInAccount = async (req, { params }) =>
{
  const { accountId, jobId } = params
  const {
    movingFromAddress, movingToAddress, dateOfMove, numberOfMovers, notes,
    timeJobStarted, timeJobCompleted, isBooked, isComplete, estimatedHours,
    actualHours, assignedEmployees, inventory, packingMaterials, documents, photos
  } = req.json()

  try
  {
    await connectDB()
    const account = await Account.findById(accountId)
    const job = await Job.findById(jobId)

    if (!account || !job) throw new Error('Account or Job not found')

    const jobInAccount = account.jobs.find(job => job._id === jobId)

    if (!jobInAccount) throw new Error('Job not found in Account')

    job.customer = customerId || job.customer
    job.movingFromAddress = movingFromAddress || job.movingFromAddress
    job.movingToAddress = movingToAddress || job.movingToAddress
    job.dateOfMove = dateOfMove || job.dateOfMove
    job.numberOfMovers = numberOfMovers || job.numberOfMovers
    job.notes = notes || job.notes
    job.timeJobStarted = timeJobStarted || job.timeJobStarted
    job.timeJobCompleted = timeJobCompleted || job.timeJobCompleted
    job.isBooked = isBooked || job.isBooked
    job.isComplete = isComplete || job.isComplete
    job.estimatedHours = estimatedHours || job.estimatedHours
    job.actualHours = actualHours || job.actualHours

    assignedEmployees && job.assignedEmployees.push(assignedEmployees)
    inventory && job.inventory.push(inventory)
    packingMaterials && job.packingMaterials.push(packingMaterials)
    documents && job.documents.push(documents)
    photos && job.photos.push(photos)

    await job.save()

    return Response.json({ success: 'Job updated' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

const deleteJobInAccount = async (req, { params }) =>
{
  const { accountId, jobId } = params

  try
  {
    await connectDB()
    const account = await Account.findById(accountId)
    const job = await Job.findById(jobId)

    if (!account || !job) throw new Error('Account or Job not found')

    const jobInAccount = account.jobs.find(job => job._id === jobId)

    if (!jobInAccount) throw new Error('Job not found in Account')

    await Job.findByIdAndDelete(jobId)

    return Response.json({ success: 'Job deleted' }, { status: 200 })

  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { getJobInAccount as GET, updateJobInAccount as PUT, deleteJobInAccount as DELETE }