'use client'

import type { SkillCardHistory } from '@/types/skill-card-history.types'
import type { Team } from '@/types/team.types'
import {
  Box,
  Button,
  Card,
  Code,
  createListCollection,
  Dialog,
  Heading,
  Portal,
  Select,
  Show,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { PinProtected } from '@/components/staff/PinProtected'
import { toaster } from '@/components/ui/toaster'
import { getPin } from '@/lib/data/pin'
import { getSkillCardDisplayName, getTeamSkillCardHistory } from '@/lib/data/skill-card-history'
import StationData, { finishStation, stationEndpoints, visitStation } from '@/lib/data/station'
import { getAllTeams } from '@/lib/data/team'
import { SkillCardAction } from '@/types/skill-card-action.enum'

export function StationController({ stationCodename }: { stationCodename: string }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [currentTeam, setCurrentTeam] = useState<Team>()

  const { data, isLoading } = useSWR(
    stationEndpoints.getByCodename(stationCodename),
    () => StationData.getByCodeName(stationCodename),
  )

  const { data: teamsData } = useSWR(
    authenticated ? `/team/staff/teams` : null,
    () => getAllTeams(getPin(stationCodename)!, stationCodename),
  )

  const teamsCollection = useMemo(
    () => teamsData?.map(team => ({
      value: team,
      label: team.name,
    })) ?? [],
    [teamsData],
  )

  const { data: teamSkillCardHistory } = useSWR(
    currentTeam ? `/team/skill-card-history/${currentTeam.username}` : null,
    () => {
      getTeamSkillCardHistory(currentTeam!.username, stationCodename, getPin(stationCodename)!).catch((error) => {
        console.error('Error fetching team skill card history:', error)
        toaster.create({
          type: 'error',
          title: 'Lỗi',
          description: 'Không thể tải lịch sử thẻ chức năng của đội. Vui lòng thử lại sau.',
        })
      })
    },
  )

  const teamSkillCardHistoryCollection = useMemo(
    () => teamSkillCardHistory
      ?.filter((history: SkillCardHistory) => history.action === SkillCardAction.USED)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map(card => ({
        value: card,
        label: getSkillCardDisplayName(card.skillCard),
      })),
    [teamSkillCardHistory],
  )

  return (
    <>
      <PinProtected stationCodename={stationCodename} onValidated={() => setAuthenticated(true)} />
      <Show
        when={!isLoading}
        fallback={(
          <Box position="fixed" top="50%" left="50%" mt="-5" ms="-5">
            <Spinner size="xl" />
          </Box>
        )}
      >

        <Card.Root>
          <Card.Body spaceY="4">
            <VStack mb="4">
              <Heading fontSize="lg">{data?.name}</Heading>
              <Text>
                {data?.stationGroup.name}
                {' '}
                (
                {data?.stationGroup.position.toUpperCase()}
                )
              </Text>
            </VStack>

            <Show when={teamsData}>
              <Select.Root
                collection={createListCollection({ items: teamsCollection })}
                onValueChange={async ({ items }) => {
                  setCurrentTeam(items[0].value)
                }}
              >
                <Select.HiddenSelect />
                <Select.Label>Chọn đội chơi</Select.Label>

                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                    <Select.ClearTrigger />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Portal>
                  <Select.Positioner>
                    <Select.Content>
                      { teamsCollection?.map(team => (
                        <Select.Item key={team.label} item={team}>
                          <Select.ItemText>
                            {team.label}
                          </Select.ItemText>
                        </Select.Item>
                      )) }
                    </Select.Content>
                  </Select.Positioner>
                </Portal>
              </Select.Root>
            </Show>

            <Show when={teamSkillCardHistoryCollection && teamSkillCardHistoryCollection.length > 0}>
              <Box mt="6">
                <Heading fontSize="md" mb="2">Danh sách thẻ đã sử dụng</Heading>
                <Box overflowX="auto">
                  <table className="chakra-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Tên thẻ</th>
                        <th style={{ textAlign: 'left', padding: '8px' }}>Thời gian sử dụng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamSkillCardHistoryCollection?.map((card: { value: SkillCardHistory, label: string }) => (
                        <tr key={card.value._id}>
                          <td style={{ padding: '8px' }}>
                            {card.label}
                          </td>
                          <td style={{ padding: '8px' }}>
                            {/* TODO: Do we need to parse the Date first? It's from a JSON response */}
                            {card.value.createdAt.toLocaleString('vi-VN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </Box>
            </Show>

            <StationAction action="start" team={currentTeam} stationCodename={stationCodename} />
            <StationAction action="finish" team={currentTeam} stationCodename={stationCodename} />
          </Card.Body>
        </Card.Root>
      </Show>
    </>
  )
}

function StationAction({ action, team, stationCodename }: { action: 'start' | 'finish', team?: Team, stationCodename: string }) {
  const { data } = useSWR(
    stationEndpoints.getByCodename(stationCodename),
    () => StationData.getByCodeName(stationCodename),
  )

  const handleAction = async () => {
    if (!team)
      return

    const pin = getPin(stationCodename)
    if (!pin) {
      console.error('PIN not found for station:', stationCodename)
      return
    }

    try {
      if (action === 'start') {
        const toastId = toaster.create({
          type: 'loading',
          title: 'Đang xử lý',
          description: `Đang bắt đầu thử thách...`,
        })
        await visitStation(team.username, stationCodename, getPin(stationCodename)!)
        toaster.update(toastId, {
          type: 'success',
          title: 'Thành công',
          description: `Đã bắt đầu thử thách tại trạm ${data?.name} cho đội ${team.name}`,
        })
      }
      else if (action === 'finish') {
        const toastId = toaster.create({
          type: 'loading',
          title: 'Đang xử lý',
          description: `Đang hoàn thành thử thách...`,
        })
        await finishStation(team.username, stationCodename, getPin(stationCodename)!)
        toaster.update(toastId, {
          type: 'success',
          title: 'Thành công',
          description: `Đã hoàn thành thử thách tại trạm ${data?.name} cho đội ${team.name}`,
        })
      }
    }
    catch (error) {
      console.error('Error during station action:', error)
      toaster.create({
        type: 'error',
        title: 'Lỗi',
        description: `Đã xảy ra lỗi khi ${action === 'start' ? 'bắt đầu' : 'hoàn thành'} thử thách tại trạm ${data?.name} cho đội ${team.name}. Vui lòng thử lại.`,
      })
    }
  }

  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger asChild>
        <Button variant="outline" disabled={!team}>{action === 'start' ? 'Bắt đầu thử thách' : 'Hoàn thành thử thách'}</Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              Bạn có chắc chắn
              {' '}
              {action === 'start' ? 'bắt đầu' : 'hoàn thành'}
              {' '}
              thử thách tại trạm
              {' '}
              <Code>{data?.name}</Code>
              {' '}
              dành cho đội
              {' '}
              <Code>{team?.name}</Code>
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Huỷ</Button>
            </Dialog.ActionTrigger>

            <Dialog.ActionTrigger asChild>
              <Button onClick={handleAction}>Xác nhận</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
