import { use } from 'react'
import { PinProtected } from '@/components/staff/PinProtected'

// export async function generateStaticParams() {
//   const stations = await StationData.getAll()
//
//   return stations.map(station => ({
//     stationCodename: station.codename,
//   }))
// }

export default function StationPage({ params }: { params: Promise<{ stationCodename: string }> }) {
  const { stationCodename } = use(params)
  return <PinProtected stationCodename={stationCodename} />
}
