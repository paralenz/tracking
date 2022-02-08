import React, { createContext, FC, useEffect } from 'react'
import { MatomoProvider, createInstance, useMatomo } from '@datapunt/matomo-tracker-react'
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

export const TrackingContext = createContext<State>({
  trackPage: () => null,
  trackEvent: () => null,
  trackUserId: () => null
})

type TrackingProviderProps = {
  children: JSX.Element
  siteId: number
  urlBase?: string
}

export const TrackingProvider: FC<TrackingProviderProps> = ({
  children,
  siteId,
  urlBase
}) => {
  const instance = createInstance({
    urlBase: urlBase ?? 'https://analytics.paralenz.com/',
    siteId,
    linkTracking: false // because of enableLinkTracking()
  })

  const Tracking = () => {
    const {
      trackEvents,
      enableLinkTracking,
      trackPageView,
      trackEvent: _trackEvent,
      pushInstruction
    } = useMatomo()

    useEffect(() => {
      trackEvents()
      enableLinkTracking()
    }, [trackEvents, enableLinkTracking])

    const trackPage = (pageName: string) => {
      trackPageView({ documentTitle: pageName })
    }

    const trackEvent = ({
      category,
      action,
      name,
      value
    }: TrackEventParams) => {
      _trackEvent({
        category,
        action,
        name,
        value
      })
    }

    const trackUserId = (userId: string) => {
      pushInstruction('setUserId', userId)
    }

    return (
      <TrackingContext.Provider
        value={{
          trackPage,
          trackEvent,
          trackUserId
        }}
      >
        {children}
      </TrackingContext.Provider>
    )
  }

  return (
    <MatomoProvider value={instance}>
      <Tracking />
    </MatomoProvider>
  )
}
