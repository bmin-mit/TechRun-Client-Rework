'use client'

export function useCurrentAuction() {
  const { data, isLoading, error } = useSWR('/auction/current', AuctionData.getCurrent, { refreshInterval: 1000 })

  return {
    auction: data,
    isLoading,
    error,
  }
}
