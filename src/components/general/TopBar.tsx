'use client'

import type { LucideIcon } from 'lucide-react'
import { Box, Flex, HStack, Show, Skeleton, Text } from '@chakra-ui/react'
import { CircleDollarSign, Flame, MapPin, Puzzle } from 'lucide-react'
import useSWR from 'swr'
import { getMyTeam } from '@/lib/data/team'

export default function TopBar() {
  const { data } = useSWR('/team/my-team', getMyTeam)

  return (
    <Box position="fixed" w="full" borderBottom="1px solid gray" bg="bg">
      <Flex h="12" maxW="lg" mx="auto" px="4" justify="space-between" gap="4" alignItems="center" fontSize={{ base: 'xs', sm: 'md' }}>
        <Show when={data} fallback={<Skeleton h="6" w="full" />}>
          <Text fontFamily="space" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">{data?.name}</Text>

          <HStack gap="4">
            <TopBarTile icon={CircleDollarSign} text={data?.coins} color="blue.500" />
            <TopBarTile icon={MapPin} text={3} color="green.500" />
            <TopBarTile icon={Puzzle} text={data?.unlockedPuzzles?.length ?? 0} color="red.500" />
            <TopBarTile icon={Flame} text={data?.skillCards?.length ?? 0} color="orange.500" />
          </HStack>
        </Show>
      </Flex>
    </Box>
  )
}

function TopBarTile({ icon: Icon, text, color }: { icon: LucideIcon, text?: string, color: string }) {
  return (
    <HStack color={color}>
      <Icon size="14" />
      <Text fontFamily="space">{text}</Text>
    </HStack>
  )
}
