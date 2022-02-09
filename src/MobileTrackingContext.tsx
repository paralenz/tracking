import React, { createContext, FC, useEffect, useState } from 'react'
import MatomoTracker, { MatomoProvider, useMatomo } from 'matomo-tracker-react-native'
import { TrackEventParams } from '@datapunt/matomo-tracker-react/lib/types'

type State = {
  trackPage: (page: string) => void
  trackEvent: ({
    category,
    action,
    name,
    value
  }: TrackEventParams) => void
  trackUserId: (userId: string) => void
}

export const MobileTrackingContext = createContext<State>({
  trackPage: () => null,
  trackEvent: () => null,
  trackUserId: () => null
})

type TrackingProviderProps = {
  children: JSX.Element
  siteId: number
  urlBase?: string
}

export const MobileTrackingProvider: FC<TrackingProviderProps> = ({
  children,
  siteId,
  urlBase
}) => {
  const instance = new MatomoTracker({
    urlBase: urlBase ?? 'https://analytics.paralenz.com/',
    siteId
  })

  return (
    <MatomoProvider instance={instance}>
      <Tracking>
        {children}
      </Tracking>
    </MatomoProvider>
  )
}

type TrackingProps = {
  children: JSX.Element
}

const Tracking: FC<TrackingProps> = ({ children }) => {
  const [uid, setUid] = useState<string>()
  const { trackScreenView, trackEvent: _trackEvent, trackAppStart } = useMatomo()

  useEffect(() => {
    trackAppStart({})
  }, [trackAppStart])

  const trackPage = (name: string) => {
    trackScreenView({ name, userInfo: { uid } })
  }

  const trackEvent = ({
    category,
    action,
    name,
    value
  }: TrackEventParams) => {
    _trackEvent({ category, action, name, value, userInfo: { uid } })
  }

  const trackUserId = (userId: string) => {
    setUid(userId)
  }

  return (
    <MobileTrackingContext.Provider
      value={{
        trackPage,
        trackEvent,
        trackUserId
      }}
    >
      {children}
    </MobileTrackingContext.Provider>
  )
}
