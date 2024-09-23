import { a } from '@components/template/components/mdx'
import { transporter } from '../Transporter'

const sendEarlyAccessEmail = async (email) =>
{
  const user = email.split('@')[ 0 ]
  async function main ()
  {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Exclusive Early Access to Juggernaut 360® - Unlock Your Potential!",
      text: "Welcome To Juggernaut 360®",
      html: `
      <div style='max-width: 600px; font-family: Arial, sans-serif;'>
      <p>Welcome ${ user },</p>
      <p>Thank you for your interest in Juggernaut 360®! We are thrilled to offer you exclusive early access to our revolutionary platform.</p>
      <p>Juggernaut 360® is designed to empower you with cutting-edge tools and insights, helping you to unlock your full potential and achieve your goals like never before.</p>
      <p>As an early access member, you will be among the first to experience our innovative features, receive personalized support, and provide valuable feedback that will shape the future of Juggernaut 360®.</p>
      <p>Our team will reach out to you within 5 business days with more details on how to get started and make the most of your early access.</p>
      <p>Don't miss this opportunity to be a part of something truly transformative!</p>
      <p>Best regards,</p>
      <p>The Juggernaut 360® Team</p>
      </div>
      `
    })

    console.log("Message sent: %s", info.messageId)
  }

  await main().catch(console.error)
}

const sendCompanyEmail = async (email) =>
{
  async function main ()
  {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_SERVER_USER,
      subject: "New Early Access Request for Juggernaut 360®",
      text: `New Early Access Request`,
      html: `
      <div style='width: 50%; font-family: Arial, sans-serif;'>
      <p>Hey Team,</p>
      <p>Someone has requested early access to Juggernaut 360®.</p>
      <p>Email Address: ${ email }</p>
      <p>Thank You,</p>
      <p>The Juggernaut 360® Platform</p>
      </div>
      `
    })

    console.log("Message sent: %s", info.messageId)
  }

  await main().catch(console.error)
}

export { sendEarlyAccessEmail, sendCompanyEmail }