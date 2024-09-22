import * as Sentry from '@sentry/nextjs'

const sentryErrorLogger = async (func) =>
{
  await Sentry.startSpan({
    name: 'Sentry Error Logger',
    op: 'An error logger for NextJS',
  }, func)
}

export { sentryErrorLogger }