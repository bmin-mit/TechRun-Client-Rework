'use client'

import type { LucideIcon } from 'lucide-react'
import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react'
import { CircleDollarSign, Flame, MapPin, Puzzle } from 'lucide-react'
import React from 'react'

export default function DashboardStatsGrid() {
  return (
    <SimpleGrid columns={2} gap="2" mb="4">
      {/* Xu, trạm đã qua, mảnh dữ liệu, năng lực số */}
      <StatsTile icon={CircleDollarSign} color="blue">
        20000 Xu
      </StatsTile>

      <StatsTile icon={MapPin} color="teal">
        3 Trạm đã qua
      </StatsTile>

      <StatsTile icon={Puzzle} color="red">
        40 Mảnh dữ liệu
      </StatsTile>

      <StatsTile icon={Flame} color="orange">
        3 Năng lực số
      </StatsTile>
    </SimpleGrid>
  )
}

function StatsTile({ children, icon: Icon, color }: { children: string, icon: LucideIcon, color: string }) {
  return (
    <HStack bg="colorPalette.600" p="2" rounded="md" colorPalette={color} color="white">
      <Box bg="colorPalette.700" p="2" rounded="md">
        <Icon size="24" />
      </Box>

      <Text fontFamily="space" fontWeight="semibold">
        {children}
      </Text>
    </HStack>
  )
}
