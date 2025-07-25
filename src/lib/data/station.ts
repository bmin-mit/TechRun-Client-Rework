import type { Station } from '@/types/station.types'
import { requests } from '@/lib/data/requests'

export default class StationData {
  static async getByCodeName(codename: string): Promise<Station> {
    const res = await requests.get(`/station/codename/${codename}`)
    return res.data
  }

  static async getAll(): Promise<Station[]> {
    const res = await requests.get(`/station/stations`)
    return res.data
  }
}
