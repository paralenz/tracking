import { PostHog, JsonMap, Configuration } from 'posthog-react-native'
import { CaptureProperties, ITracking, UserProperties, User } from './types'
export * from './types'

export class NativeTracking<TEvents> implements ITracking<TEvents> {
  private readonly client = new PostHog.Client()
  private readonly handlers = [] as Array<(e: Error) => void>

  constructor (apiKey: string, config?: Configuration) {
    this.client.catch(this.emitError)

    this.client.setup(apiKey, config)
  }

  identify (userId: string, properties?: User): this {
    this.client.identify(userId, properties)

    return this
  }

  capture<T extends keyof TEvents>(
    event: T,
    properties?: CaptureProperties<TEvents>,
    userProperties?: UserProperties
  ): this {
    this.client.capture(event as string, {
      ...(properties || {}),
      ...(userProperties || {})
    })

    return this
  }

  screen (screenName: string, properties?: { [x: string]: unknown } & JsonMap): this {
    this.client.screen(screenName, properties)

    return this
  }

  onError (handler: (e: Error) => void): void {
    this.handlers.push(handler)
  }

  private emitError = (err: Error) => {
    this.handlers.forEach(handler => handler(err))
  }
}
