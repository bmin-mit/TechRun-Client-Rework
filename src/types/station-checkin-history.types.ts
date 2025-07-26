import type { Station } from '@/types/station.types'
import type { Team } from '@/types/team.types'

export interface StationCheckinHistory {
  team: Team
  station: Station
}
