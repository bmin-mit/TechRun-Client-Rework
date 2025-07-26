'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { AuctionData } from '@/lib/data/auction'

const refreshInterval = 500 // milliseconds
const timerUpdateInterval = 50 // milliseconds

export function useCurrentAuction() {
  const [, setUpdate] = useState(false)
  const { data, isLoading, error } = useSWR('/auction/current', AuctionData.getCurrent, { refreshInterval })
  const startTime = data ? new Date(data.endTime.getTime() - data.durationInSeconds * 1000) : undefined

  // Update timer, auction state every timerUpdateInterval milliseconds
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(prev => !prev)
    }, timerUpdateInterval)

    return () => clearInterval(interval)
  })

  return {
    auction: data ? { ...data, startTime } : null,
    isWaiting: startTime ? new Date() < startTime : undefined,
    inProgress: data && startTime ? new Date() >= startTime && new Date() < data.endTime : undefined,
    isLoading,
    error,
  }
}
