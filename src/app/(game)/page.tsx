import { Box, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import DashboardStatsGrid from '@/components/game/DashboardStatsGrid'
import LogOutButton from '@/components/general/LogOutButton'

export default function Home() {
  return (
    <Flex direction="column" h="full">
      <Box spaceY="4" flexGrow="1">
        <DashboardStatsGrid />
        {/* <TeamMembersBoard /> */}
        <LogOutButton />
      </Box>

      <Box pt="16" flexGrow="0">
        <Image src="/brand-logo.png" alt="TechRun" width={400} height={100} loading="eager" style={{ width: '100%' }} />
        <Image src="/organizers.png" alt="" height={63.5} width={500} style={{ width: '100%' }} />
      </Box>
    </Flex>
  )
}
