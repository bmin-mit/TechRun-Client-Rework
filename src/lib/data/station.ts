import type { Station } from '@/types/station.types'
import { requests } from '@/lib/data/requests'

export const stationEndpoints = {
  getAll: () => '/station/stations',
  getByCodename: (codename: string) => `/station/codename/${codename}`,
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
}
