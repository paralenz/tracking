import apps from './apps'

export type AppName = keyof typeof apps

export interface ITracking {
  isEnabled: boolean
  debugEnabled: boolean
  user?: User
  siteId?: number
  identify: (user: User) => this
  trackEvent: (event: string, properties: Record<string, unknown>) => this
  enableDebugging: (on: boolean) => boolean
  optOutOfTracking: (on: boolean) => Promise<boolean>
}

export type User = {
  id: string
  email?: string
  country?: string
}

// @TODO: Install types for: `react-native-async-storage`
export type StorageProvider = Storage
