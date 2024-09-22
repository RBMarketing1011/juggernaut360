import { Schema, models, model } from 'mongoose'
import User from './user'
import Job from './job'
import Customer from './customer'

const companyAccountSchema = new Schema({
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

const CompanyAccount = models.CompanyAccount || model('CompanyAccount', companyAccountSchema)
export default CompanyAccount