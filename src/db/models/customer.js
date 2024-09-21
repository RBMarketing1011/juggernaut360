import { Schema, models, model } from 'mongoose'

const customerSchema = new Schema({
  firstname: {
    type: String,
    required: [ true, 'First name is required' ]
  },
  lastname: {
    type: String,
    required: [ true, 'Last name is required' ]
  },
  email: {
    type: String,
    required: [ true, 'Email is required' ],
    unique: true
  },
  phone: {
    type: String,
    required: [ true, 'Phone number is required' ]
  },
}, { timestamps: true })

const Customer = models.Customer || model('Customer', customerSchema)
export default Customer