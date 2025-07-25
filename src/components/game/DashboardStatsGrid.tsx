'use client'

import type { LucideIcon } from 'lucide-react'
import { Box, Grid, SimpleGrid, Skeleton, Text } from '@chakra-ui/react'
import { CircleDollarSign, Flame, MapPin, Puzzle } from 'lucide-react'
import React from 'react'
import useSWR from 'swr'
import { getMyTeam } from '@/lib/data/team'

export default function DashboardStatsGrid() {
  const { data, isLoading } = useSWR('/team/my-team', getMyTeam)

  return (
    <SimpleGrid columns={2} gap="2" mb="4">
      {/* Xu, trạm đã qua, mảnh dữ liệu, thẻ kỹ năng */}
      <StatsTile icon={CircleDollarSign} color="blue" isLoading={isLoading}>
        {data?.coins}
        {' '}
        Xu
      </StatsTile>

      <StatsTile icon={MapPin} color="teal" isLoading={isLoading}>
        3 Trạm đã qua
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

function StatsTile({ children, icon: Icon, color, isLoading }: { children?: string, icon: LucideIcon, color: string, isLoading: boolean }) {
  return (
    <Grid bg="colorPalette.600" p="2" rounded="md" colorPalette={color} color="white" templateColumns="auto 1fr" gap="2">
      <Box bg="colorPalette.700" p="2" rounded="md">
        <Icon size="24" />
      </Box>

      <Skeleton h="6" asChild loading={isLoading}>
        <Text fontFamily="space" fontWeight="semibold" alignSelf="center">
          {children}
        </Text>
      </Skeleton>
    </Grid>
  )
}
