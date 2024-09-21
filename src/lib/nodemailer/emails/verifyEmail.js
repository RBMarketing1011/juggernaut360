import { transporter } from '../Transporter'

export const verifyEmail = (name, email, token) =>
{
  // async..await is not allowed in global scope, must use a wrapper
  async function main ()
  {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // sender address
      to: email, // list of receivers
      subject: "You Have Been Invited To Juggernaut 360®", // Subject line
      text: "Welcome To Juggernaut 360®", // plain text body
      html: `
      <div style='width: 50%;'>
        <p>Dear, ${ name }</p>
        <p>
        Thank you for signing up for Leads Near Me® scheduler! We're thrilled to have you on board. To ensure the security of your account and to provide you with uninterrupted access to our services, we kindly request that you verify your email address.
        </p>

        <p>
        Please click on the following link to verify your email:
        </p>
        <br>
        <a href='${ process.env.NEXT_PUBLIC_API_DOMAIN }/users/setpassword/${ token }' style='background: #EF5124; padding: 1rem 3rem; border-radius: .6rem; color: #ffffff; font-weight: bold; text-transform: uppercase; margin: 30px 0; text-decoration: none;'>
        Verify Email
        </a>
        <br>
        <br>

        <p>
        Verifying your email address helps us confirm your identity and enables us to communicate important updates and account-related information with you. Rest assured, we respect your privacy and will never misuse your email address.
        </p>

        <p>
        If the link above does not work please copy and paste this link into your browser
        </p>

        <h4>${ process.env.NEXT_PUBLIC_API_DOMAIN }/users/verification/${ token }</h4>

        <strong style='color: red;'>This link will expire in 30 minutes</strong>

        <p>
        If you encounter any issues or have any questions, feel free to reach out to our support team at <a href='mailto:support@leadsnearme.com'>support@leadsnearme.com</a>.
        </p>

        <p>
        Thank you for choosing Leads Near Me®. We look forward to serving you!
        </p>

        <p>
        Best regards,
        </p>
        <h2>
        Leads Near Me® Support team
        </h2>
      </div >
      `, // html body
    })

    console.log("Message sent: %s", info.messageId)
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  main().catch(console.error)
}