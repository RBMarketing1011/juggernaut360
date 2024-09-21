import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVER_SERVICE,
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
})