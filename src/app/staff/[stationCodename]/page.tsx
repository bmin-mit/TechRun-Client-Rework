import { use } from 'react'
import { StationController } from '@/components/staff/StationController'
import StationData from '@/lib/data/station'

export async function generateStaticParams() {
  const stations = await StationData.getAll()

  return stations.map(station => ({
    stationCodename: station.codename,
  }))
}

export default function StationPage({ params }: { params: Promise<{ stationCodename: string }> }) {
  const { stationCodename } = use(params)

  return (
    <>
      <StationController stationCodename={stationCodename} />
    </>
  )
}
