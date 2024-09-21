import { Schema, models, model } from 'mongoose'
import User from './user'
import Customer from './customer'
import Account from './account'

const jobSchema = new Schema({
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  assignedEmployees: [ {
    employee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isLead: { type: Boolean, default: false }
  } ],
  movingFromAddress: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  movingToAddress: {
    address1: { type: String, required: true },
    address2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true }
  },
  dateOfMove: {
    type: Date,
    required: true
  },
  timeJobStarted: {
    type: Date,
    default: null
  },
  timeJobCompleted: {
    type: Date,
    default: null
  },
  isBooked: {
    type: Boolean,
    default: false
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  numberOfMovers: {
    type: Number,
    default: null
  },
  estimatedHours: {
    type: Number,
    default: null
  },
  actualHours: {
    type: Number,
    default: null
  },
  notes: [ {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: { type: String, required: true }
  } ],
  inventory: [ {
    type: { type: String, required: true },
    quantity: { type: Number, required: true }
  } ],
  packingMaterials: [ {
    type: { type: String, required: true },
    quantity: { type: Number, required: true }
  } ],
  documents: [ {
    name: { type: String, required: true },
    sent: { type: Boolean, default: false },
    signed: { type: Boolean, default: false }
  } ],
  photos: [ {
    url: { type: String, required: true },
    description: { type: String },
    dateTaken: { type: Date, default: Date.now }
  } ],
}, { timestamps: true })

const Job = models.Job || model('Job', jobSchema)
export default Job