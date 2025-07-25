import { Box } from '@chakra-ui/react'
import DashboardStatsGrid from '@/components/game/DashboardStatsGrid'
import TeamMembersBoard from '@/components/game/TeamMembersBoard'
import LogOutButton from '@/components/general/LogOutButton'

export default function Home() {
  return (
    <Box spaceY="4">
      <DashboardStatsGrid />
      <TeamMembersBoard />
      <LogOutButton />
    </Box>
  )
}
