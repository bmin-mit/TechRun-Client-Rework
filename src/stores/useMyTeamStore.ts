import type { Team } from '@/types/team.types'
import { create } from 'zustand/react'
import { getMyTeam } from '@/lib/data/team'

export const useMyTeamStore = create(set => ({
  team: {} as Team,

  fetch: async () => {
    const team = await getMyTeam()
    set({ team })
  },
}))
