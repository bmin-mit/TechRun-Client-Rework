import type { Auction } from '@/types/auction.types'
import { AxiosError } from 'axios'
import { requests } from '@/lib/data/requests'

export class AuctionData {
  static async getCurrent(): Promise<Auction | null> {
    try {
      const res = await requests.get('/auction/current')
      return {
        ...res.data,
        endTime: new Date(res.data.endTime),
      }
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404)
          return null
      }

      if (error instanceof Error)
        console.error(`Error fetching current auction: ${error.message}`)
    }

    return null
  }
}
