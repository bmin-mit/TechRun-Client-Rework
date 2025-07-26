import { Box } from '@chakra-ui/react'
import React from 'react'
import NavBar from '@/components/general/NavBar'
import TopBar from '@/components/general/TopBar'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box width="100%">
      <TopBar />

      <Box maxW="lg" width="100%" p="4" mt="12" mb="16" mx="auto">
        {children}
      </Box>

      <NavBar />
    </Box>
  )
}
