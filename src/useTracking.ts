import { AppName, StorageProvider } from './types'
import { Tracking } from './Tracking'
import { useMemo } from 'react'

export const useTracking = (appName: AppName, storage: StorageProvider) => {
  const tracker = useMemo(() => new Tracking(appName, storage), [appName, storage])

  return {
    identify: tracker.identify,
    trackEvent: tracker.trackEvent,
    optOutOfTracking: tracker.optOutOfTracking,
    enableDebugging: tracker.enableDebugging
  }
}
