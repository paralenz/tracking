import { TrackEventParams } from '@datapunt/matomo-tracker-react/lib/types'
import { useMatomo } from 'matomo-tracker-react-native'

export const Tracking = (() => {
  const { trackScreenView, trackEvent: _trackEvent, trackAppStart } = useMatomo()

  const urlBase = 'https://analytics.paralenz.com/'
  let uid: string
  let siteId: number
  let debug = false

  return { // public interface
    init: (_siteId: number, _debug = false) => {
      siteId = _siteId
      debug = _debug
      debug && console.log('Tracking initialized with siteId:', siteId, 'and urlBase:', urlBase)
      trackAppStart({})
    },

    trackPage: (name: string) => {
      // eslint-disable-next-line no-throw-literal
      if (!siteId) return console.error('Tracking not initialized')
      trackScreenView({ name, userInfo: { uid } })
      debug && console.log('trackPage', name)
    },

    trackEvent: ({
      category,
      action,
      name,
      value
    }: TrackEventParams) => {
      // eslint-disable-next-line no-throw-literal
      if (!siteId) return console.error('Tracking not initialized')
      _trackEvent({ category, action, name, value, userInfo: { uid } })
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
