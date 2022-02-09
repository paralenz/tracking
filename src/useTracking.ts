import { TrackingContext } from './WebTrackingContext'
import { MobileTrackingContext } from './MobileTrackingContext'
import { useContext } from 'react'

export const useTracking = () => useContext(TrackingContext)
export const useMobileTracking = () => useContext(MobileTrackingContext)
