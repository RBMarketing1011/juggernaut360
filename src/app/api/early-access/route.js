import { sendEarlyAccessEmail, sendCompanyEmail } from '@lib/nodemailer/emails/sendEarlyAccessEmail'

const sendEarlyAccessEmailRoute = async (req) =>
{
  const { email } = await req.json()

  try
  {
    await sendEarlyAccessEmail(email)
    await sendCompanyEmail(email)
    return Response.json({ success: 'Requesting early access. Check your inbox for more detials.' }, { status: 200 })
  } catch (error)
  {
    console.error(error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { sendEarlyAccessEmailRoute as POST }