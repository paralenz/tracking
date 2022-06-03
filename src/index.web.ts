import posthog from 'posthog-js'
import { CaptureProperties, ITracking, Logger, User, UserProperties } from './types'
export * from './types'

export class Tracking<TEvents> implements ITracking<TEvents> {
  constructor (
    apiKey: string,
    config?: posthog.Config,
    name?: string,
    private readonly logger?: Logger
  ) {
    posthog.init(apiKey, config, name)
  }

  identify (userId: string, properties?: User): this {
    this.log('Identifying ', userId, { properties })

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
    this.log('Capture ', event, { properties, userProperties })
    posthog.capture(event as string, {
      ...(properties || {}),
      ...(userProperties || {})
    })

    return this
  }

  screen (screenName: string, properties?: posthog.Properties, userProperties?: UserProperties): this {
    this.log('Screen ', screenName, { properties })

    posthog.capture(
      screenName as string,
      {
        ...(properties || {}),
        ...(userProperties || {})
      }
    )

    return this
  }

  private log (...params: any[]) {
    this.logger?.log('[Tracking]:', ...params)
  }
}
