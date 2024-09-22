export const clientLog = async (error) =>
{
  await fetch('/api/v1/logger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ error }),
  })
}