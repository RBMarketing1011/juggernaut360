export const validatePassword = (p) =>
{
  let strength = 0
  const errors = []

  if (p.length >= 8 && p.length < 16)
  {
    strength += 20
  } else
  {
    strength -= 20
  }

  if (p.search(/[a-z]/) < 0)
  {
    errors.push("Your password must contain at least one lower case letter.")
  } else
  {
    strength += 20
  }

  if (p.search(/[A-Z]/) < 0)
  {
    errors.push("Your password must contain at least one upper case letter.")
  } else
  {
    strength += 20
  }

  if (p.search(/[0-9]/) < 0)
  {
    errors.push("Your password must contain at least one digit.")
  } else
  {
    strength += 20
  }

  if (p.search(/[!@#\$%\^&\*_]/) < 0)
  {
    errors.push("Your password must contain at least special char from -[ ! @ # $ % ^ & * _ ]")
  } else
  {
    strength += 20
  }

  // Console Log error and strength to verify the output
  // if (errors.length > 0)
  // {
  //   console.log(errors.join("\n"))
  // }

  if (strength > 0 && strength <= 100)
  {
    return strength
  } else
  {
    return 0
  }
}