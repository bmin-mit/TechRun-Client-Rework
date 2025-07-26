'use client'

import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Box, Grid, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { CircleDollarSign, Flame, MapPin, Puzzle } from 'lucide-react'
import useSWR from 'swr'
import StationData, { stationEndpoints } from '@/lib/data/station'
import { getMyTeam } from '@/lib/data/team'

export default function DashboardStatsGrid() {
  const { data, isLoading } = useSWR('/team/my-team', getMyTeam)
  const { data: visitedStationData } = useSWR(
    data ? stationEndpoints.getVisitedStation(data.username) : null,
    StationData.getVisitedStation,
    { refreshInterval: 2000 },
  )

  return (
    <SimpleGrid columns={2} gap="2" mb="4">
      {/* Xu, trạm đã qua, mảnh dữ liệu, thẻ kỹ năng */}
      <StatsTile icon={CircleDollarSign} color="blue" isLoading={isLoading}>
        {data?.coins ?? 0}
        {' '}
        Xu
      </StatsTile>

      <StatsTile icon={MapPin} color="teal" isLoading={isLoading}>
        {visitedStationData?.length ?? 0}
        {' '}
        Trạm đã qua
      </StatsTile>

      <StatsTile icon={Puzzle} color="red" isLoading={isLoading}>
        {data?.unlockedPuzzles?.length ?? 0}
        {' '}
        Mảnh dữ liệu
      </StatsTile>

      <StatsTile icon={Flame} color="orange" isLoading={isLoading}>
        {data?.skillCards?.length ?? 0}
        {' '}
        Thẻ kỹ năng
      </StatsTile>
    </SimpleGrid>
  )
}

function StatsTile({ children, icon: Icon, color, isLoading }: { children?: ReactNode, icon: LucideIcon, color: string, isLoading: boolean }) {
  return (
    <Grid bg="colorPalette.600" p="2" rounded="md" colorPalette={color} color="white" templateColumns="auto 1fr" gap="2" alignItems="center">
      <Box bg="colorPalette.700" p="2" rounded="md" h="fit">
        <Icon size="24" />
      </Box>

      <Skeleton w="full" asChild loading={isLoading}>
        <Text fontFamily="space" fontWeight="semibold">
          {children}
        </Text>
      </Skeleton>
    </Grid>
  )
}
