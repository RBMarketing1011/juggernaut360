import { Schema, models, model } from 'mongoose'
import User from './user'
import Job from './job'
import Customer from './customer'

const accountSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, 'Account owner is required' ]
  },
  users: [ {
    type: Schema.Types.ObjectId,
    ref: 'User'
  } ],
  jobs: [ {
    type: Schema.Types.ObjectId,
    ref: 'Job'
  } ],
  customers: [ {
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  } ],
}, { timestamps: true })

const Account = models.Account || model('Account', accountSchema)
export default Account