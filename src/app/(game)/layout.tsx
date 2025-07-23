import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" align="center" width="100%">
      <Box maxW="lg" width="100%" px="4">
        {children}
      </Box>
    </Flex>
  )
}
