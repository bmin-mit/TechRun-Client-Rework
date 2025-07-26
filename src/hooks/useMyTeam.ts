'use client'

import useSWR from 'swr'
import { getMyTeam } from '@/lib/data/team'

export function useMyTeam() {
  return useSWR('/team/my-team', getMyTeam)
}
