'use client'

import type { LucideIcon } from 'lucide-react'
import { Box, Flex, HStack, Text } from '@chakra-ui/react'
import { CircleDollarSign, Flame, MapPin, Puzzle } from 'lucide-react'

export default function TopBar() {
  return (
    <Box position="fixed" w="full" borderBottom="1px solid gray" bg="bg">
      <Flex h="12" maxW="lg" mx="auto" px="4" justify="space-between" gap="4" alignItems="center" fontSize={{ base: 'xs', sm: 'md' }}>
        <Text fontFamily="space" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">this is a very long name</Text>

        <HStack gap="4">
          <TopBarTile icon={CircleDollarSign} text={20000} color="blue.500" />
          <TopBarTile icon={MapPin} text={3} color="green.500" />
          <TopBarTile icon={Puzzle} text={40} color="red.500" />
          <TopBarTile icon={Flame} text={3} color="orange.500" />
        </HStack>
      </Flex>
    </Box>
  )
}

function TopBarTile({ icon: Icon, text, color }: { icon: LucideIcon, text: string, color: string }) {
  return (
    <HStack color={color}>
      <Icon size="14" />
      <Text fontFamily="space">{text}</Text>
    </HStack>
  )
}
