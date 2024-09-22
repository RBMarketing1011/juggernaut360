import { logger } from '@lib/helpers/winston/logger'

const createFrontendLogger = async (req) =>
{
  const { error } = await req.json()
  try
  {
    logger.info(error)
    return Response.json({ status: 200 })
  } catch (error)
  {
    logger.error(error.message)
    return Response.json({ status: 500 })
  }
}

export { createFrontendLogger as POST }