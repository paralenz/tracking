import { TrackEventParams } from '@datapunt/matomo-tracker-react/lib/types'
import MatomoTracker from 'matomo-tracker-react-native'

export const Tracking = (() => {
  const urlBase = 'https://analytics.paralenz.com/'
  let uid: string
  let siteId: number
  let debug = false

  let matomoTracker: MatomoTracker

  return { // public interface
    init: (_siteId: number, _debug = false) => {
      siteId = _siteId
      debug = _debug
      matomoTracker = new MatomoTracker({ urlBase, siteId })
      debug && console.log('Tracking initialized with siteId:', siteId, 'and urlBase:', urlBase)
      matomoTracker.trackAppStart({})
    },

    trackPage: (name: string) => {
      // eslint-disable-next-line no-throw-literal
      if (!siteId) return console.error('Tracking not initialized')
      matomoTracker.trackScreenView({ name, userInfo: { uid } })
      debug && console.log('trackPage', name)
    },

    trackSearch: (keyword: string) => {
      // eslint-disable-next-line no-throw-literal
      if (!siteId) return console.error('Tracking not initialized')
      matomoTracker.trackSiteSearch({ keyword, userInfo: { uid } })
      debug && console.log('trackSearch', keyword)
    },

    trackEvent: ({
      category,
      action,
      name,
      value
    }: TrackEventParams) => {
      // eslint-disable-next-line no-throw-literal
      if (!siteId) return console.error('Tracking not initialized')
      matomoTracker.trackEvent({ category, action, name, value, userInfo: { uid } })
      debug && console.log('trackEvent', category, action, name, value)
    },

    trackUserId: (userId: string) => {
      // eslint-disable-next-line no-throw-literal
      if (!siteId) return console.error('Tracking not initialized')
      uid = userId
      debug && console.log('trackUserId', uid)
    }
  }
})()
