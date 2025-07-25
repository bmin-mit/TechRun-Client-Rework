'use client'

import type { LucideIcon } from 'lucide-react'
import { Box, Button, Flex, For, SimpleGrid, Text } from '@chakra-ui/react'
import { Flame, Gavel, Home, Puzzle } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navButtons = [
  {
    icon: Home,
    text: 'Trang chủ',
    link: '/',
  },
  {
    icon: Puzzle,
    text: 'Mảnh dữ liệu',
    link: '/data-piece',
  },
  {
    icon: Flame,
    text: 'Thẻ kỹ năng',
    link: '/skill-cards',
  },
  {
    icon: Gavel,
    text: 'Đấu giá',
    link: '/bid',
  },
]

export default function NavBar() {
  return (
    <Box position="fixed" bottom="0" w="full" borderTop="1px solid gray" bg="bg">
      <SimpleGrid w="full" maxW="lg" mx="auto" h="16" px="4" alignItems="stretch" columns={navButtons.length}>
        <For each={navButtons}>
          {props => <NavBarButton key={props.link} {...props} />}
        </For>
      </SimpleGrid>
    </Box>
  )
}

function NavBarButton({ text, icon: Icon, link }: { text: string, icon: LucideIcon, link: string }) {
  const pathname = usePathname()

  const textColor = pathname === link ? { base: 'blue.600', _dark: 'blue.400' } : 'gray'

  return (
    <Link href={link}>
      <Button variant="ghost" w="full" h="full" rounded="0" color={textColor}>
        <Flex direction="column" gap="1" alignItems="center">
          <Icon />
          <Text fontSize={{ base: '2xs', sm: 'md' }} fontFamily="space" textAlign="center">{text}</Text>
        </Flex>
      </Button>
    </Link>
  )
}
