import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import NavBar from '@/components/general/NavBar'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" align="center" width="100%">
      <Box maxW="lg" width="100%" p="4" mb="16">
        {children}
      </Box>

      <NavBar />
    </Flex>
  )
}
