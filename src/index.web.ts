import posthog from 'posthog-js'
import { CaptureProperties, ITracking, User, UserProperties } from './types'
export * from './types'

export class Tracking<TEvents> implements ITracking<TEvents> {
  constructor (apiKey: string, config?: posthog.Config) {
    posthog.init(apiKey, config)
  }

  identify (userId: string, properties?: User): this {
    posthog.identify(userId)

    if (properties) {
      posthog.people.set(properties)
    }

    return this
  }

  capture<T extends keyof TEvents>(event: T,
    properties?: CaptureProperties<TEvents>,
    userProperties?: UserProperties
  ): this {
    posthog.capture(event as string, {
      ...(properties || {}),
      ...(userProperties || {})
    })

    return this
  }

  screen (screenName: string, properties?: posthog.Properties): this {
    posthog.capture(screenName as string, properties)

    return this
  }
}
