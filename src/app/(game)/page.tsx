import { Box } from '@chakra-ui/react'
import DashboardStatsGrid from '@/components/game/DashboardStatsGrid'
import TeamMembersBoard from '@/components/game/TeamMembersBoard'

export default function Home() {
  return (
    <Box>
      <DashboardStatsGrid />
      <TeamMembersBoard />
    </Box>
  )
}
