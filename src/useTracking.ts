import { TrackingContext } from './TrackingContext'
import { useContext } from 'react'

export const useTracking = () => useContext(TrackingContext)
