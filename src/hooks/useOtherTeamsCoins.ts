'use client'

import useSWR from 'swr'
import { getAllTeamsCoins, getMyTeam } from '@/lib/data/team'

const refreshInterval = 1000

export function useOtherTeamsCoins() {
  const { data, isLoading } = useSWR('/team/other-teams-coins', getAllTeamsCoins, { refreshInterval })
  const { data: teamData } = useSWR('/team/my-team', getMyTeam)

  return {
    data: data?.filter(({ username }) => username !== teamData?.username) ?? [],
    isLoading,
  }
}
