import { Schema, models, model } from 'mongoose'

const userSchema = new Schema({
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
  password: {
    type: String,
    required: [ true, 'Password is required' ]
  },
  role: {
    type: String,
    enum: [ 'employee', 'lead', 'manager', 'admin', 'owner', 'superadmin' ],
    default: 'employee',
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
}, { timestamps: true })

const User = models.User || model('User', userSchema)
export default User