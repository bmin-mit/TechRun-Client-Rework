import type { Team } from '@/types/team.types'
import { requests } from '@/lib/data/requests'

export async function getMyTeam(): Promise<Team> {
  return (await requests.get('/team/my-team')).data
}
