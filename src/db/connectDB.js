import mongoose from 'mongoose'

let connected = false

const connectDB = async () =>
{
  mongoose.set('strictQuery', true)

  // if DB is already connected dont connect twice
  connected && console.log('Previous DB Connected')

  //connect to DB
  try
  {
    await mongoose.connect(process.env.MONGO_URI)
    connected = true
    console.log('DB Connected')
  } catch (error)
  {
    console.log(error)
  }
}

export default connectDB