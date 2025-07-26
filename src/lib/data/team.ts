import type { Team } from '@/types/team.types'
import { requests } from '@/lib/data/requests'

export async function getMyTeam(): Promise<Team> {
  return (await requests.get('/team/my-team')).data
}

export async function getAllTeams(pin: string, stationCodename: string): Promise<Team[]> {
  return (await requests.post('/team/staff/teams', { pin, stationCodename })).data
}

export async function getAllTeamsCoins(): Promise<{ name: string, username: string, coins: number }[]> {
  return (await requests.get('/team/other-teams-coins')).data
}
