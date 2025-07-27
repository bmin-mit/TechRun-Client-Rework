import type { StationCheckinHistory } from '@/types/station-checkin-history.types'
import type { Station } from '@/types/station.types'
import { requests } from '@/lib/data/requests'

export const stationEndpoints = {
  getAll: () => '/station/stations',
  getByCodename: (codename: string) => `/station/codename/${codename}`,
  getVisitedStation: (teamUsername: string) => `/station/visited/${teamUsername}`,
}

export default class StationData {
  static async getByCodeName(codename: string): Promise<Station> {
    const res = await requests.get(stationEndpoints.getByCodename(codename))
    return res.data
  }

  static async getAll(): Promise<Station[]> {
    const res = await requests.get(stationEndpoints.getAll())
    return res.data
  }

  static async getVisitedStation(): Promise<StationCheckinHistory[]> {
    const res = await requests.get(`/station/visited`)
    return res.data
  }
}

export async function visitStation(teamUsername: string, stationCodename: string, pin: string): Promise<void> {
  const res = await requests.post(`/station/visit?teamUsername=${encodeURIComponent(teamUsername)}`, {
    stationCodename,
    pin,
  })

  return res.data
}

export async function finishStation(teamUsername: string, stationCodename: string, pin: string): Promise<void> {
  // TODO: Update this to reflect the new API endpoint
  const res = await requests.post(`/station/complete/${teamUsername}`, {
    stationCodename,
    pin,
  })

  return res.data
}
export async function minigamePass(teamUsername: string, stationCodename: string, pin: string) {
  return await requests.post(`/station/minigame-pass/${teamUsername}`, { stationCodename, pin })
}

export async function hoiSinh(teamUsername: string, stationCodename: string, pin: string) {
  return await requests.post(`/station/skip/?teamUsername=${teamUsername}`, { stationCodename, pin })
}
