import { PostHog, JsonMap } from 'posthog-react-native'
import { CaptureProperties, ITracking, UserProperties, User, Logger } from './types'
export * from './types'

export class NativeTracking<TEvents> implements ITracking<TEvents> {
  private readonly client = new PostHog.Client()
  private readonly handlers = [] as Array<(e: Error) => void>

  constructor (
    private readonly config?: PostHog.Configuration,
    private readonly logger?: Logger
  ) {
    this.client.catch(this.emitError)
  }

  setup (apiKey: string) {
    this.client.setup(apiKey, this.config)
  }

  identify (userId: string, properties?: User): this {
    this.log('Identifying ', userId, { properties })
    this.client.identify(userId, properties)

    return this
  }

  capture<T extends keyof TEvents>(
    event: T,
    properties?: CaptureProperties<TEvents>,
    userProperties?: UserProperties
  ): this {
    this.log('Capture ', event, { properties, userProperties })
    this.client.capture(event as string, {
      ...(properties || {}),
      ...(userProperties || {})
    })

    return this
  }

  screen (screenName: string, properties?: { [x: string]: unknown } & JsonMap): this {
    this.log('Screen ', screenName, { properties })
    this.client.screen(screenName, properties)

    return this
  }

  onError (handler: (e: Error) => void): void {
    this.handlers.push(handler)
  }

  private emitError = (err: Error) => {
    this.handlers.forEach(handler => handler(err))
  }

  private log (...params: any[]) {
    this.logger?.log('[Tracking]:', ...params)
  }
}
