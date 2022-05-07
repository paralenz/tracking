import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage'
import apps from './apps'
import { ITracking, StorageProvider, User, AppName } from './types'

export class Tracking implements ITracking {
  private readonly storageKey = '@paralenz-tracking/enabled'

  isEnabled = false

  debugEnabled = false

  user?: User | undefined = undefined

  siteId?: number | undefined = undefined

  constructor (
    private readonly appName: AppName,
    private readonly storageProvider: StorageProvider | AsyncStorageStatic = AsyncStorage) {
    if (!apps[appName]) {
      return this.throw(
        [
          `${appName} is not a known application.`,
          'Please verify that is has been added to the record of known apps that should be tracked'
        ].join(' ')
      )
    }
    this.siteId = apps[appName]
    // this.isEnabled = Boolean(Promise.resolve(storageProvider.getItem(this.storageKey))) ?? false
  }

  optOutOfTracking = async (value: boolean) => {
    this.logger(`User ${this.user?.id} wishes to opt out of tracking`)

    this.storageProvider.setItem(this.storageKey, `${value}`)

    this.isEnabled = value

    return Promise.resolve(
      Boolean(this.storageProvider.getItem(this.storageKey))
    )
  }

  identify = (user: User) => {
    this.logger(`Identifying user ${user.id}`)
    this.user = user

    return this
  }

  trackEvent = (event: string, properties?: Record<string, unknown>) => {
    if (!this.siteId) {
      return this.throw('App has not been set. Please call the init method.')
    }
    if (!this.isEnabled) {
      this.logger(
        'Skipping tracking due to user who has opted out of tracking',
        `Event: ${event}`,
        `User: ${this.user?.id ?? 'unknown'}`,
        `Properties ${JSON.stringify(properties)}`
      )

      return this
    }

    this.logger(
      [
        `Tracking event: ${event}`,
        `for user: ${this.user?.id ?? 'unknown'}`,
        properties && `with properties ${JSON.stringify(properties)}`
      ]
        .filter(Boolean)
        .join(' ')
    )

    //  @TODO: Implement this
    this.logger(event, JSON.stringify(properties))

    return this
  }

  enableDebugging = (on: boolean) => {
    this.debugEnabled = on

    return this.debugEnabled
  }

  private logger = (message?: any, ...optionalParams: any[]) => {
    if (!this.debugEnabled) { return }

    return console.log(message, optionalParams)
  }

  private throw = (message: string) => {
    throw new Error(`Paralenz Tracking: ${message}`)
  }
}
