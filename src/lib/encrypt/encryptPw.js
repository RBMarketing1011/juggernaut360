import bcrypt from 'bcrypt'

const encryptPw = async (pw) =>
{
  const salt = await bcrypt.genSalt(12)
  const hash = await bcrypt.hash(pw, salt)

  return hash
}

export default encryptPw