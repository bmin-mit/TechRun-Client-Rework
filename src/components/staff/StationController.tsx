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
  Table,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import { PinProtected } from '@/components/staff/PinProtected'
import { toaster } from '@/components/ui/toaster'
import { getPin } from '@/lib/data/pin'
import { getSkillCardDisplayName, getTeamSkillCardHistory } from '@/lib/data/skill-card-history'
import StationData, {
  finishStation,
  minigamePass,
  skip,
  stationEndpoints,
  unskip,
  visitStation,
} from '@/lib/data/station'
import { getAllTeams } from '@/lib/data/team'

export function StationController({ stationCodename }: { stationCodename: string }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [selectValue, setSelectValue] = useState<string[]>([])

  const { data, isLoading } = useSWR(
    stationEndpoints.getByCodename(stationCodename),
    () => StationData.getByCodeName(stationCodename),
  )

  const { data: teamsData } = useSWR(
    authenticated ? `/team/staff/teams` : null,
    () => getAllTeams(getPin(stationCodename)!, stationCodename),
  )

  const currentTeam = useMemo(() => teamsData?.find((team: Team) => team.username === selectValue[0]), [teamsData, selectValue])

  const teamsCollection = useMemo(
    () => teamsData?.map(team => ({
      value: team.username,
      label: team.name,
    })) ?? [],
    [teamsData],
  )

  const { data: teamSkillCardHistory } = useSWR(
    currentTeam ? `/team/skill-card-history/${currentTeam.username}` : null,
    () => getTeamSkillCardHistory(currentTeam!.username, stationCodename, getPin(stationCodename)!).catch((error) => {
      console.error('Error fetching team skill card history:', error)
      toaster.create({
        type: 'error',
        title: 'Lỗi',
        description: 'Không thể tải lịch sử thẻ chức năng của đội. Vui lòng thử lại sau.',
      })
    }),
  )

  const teamSkillCardHistoryCollection = useMemo(
    () => teamSkillCardHistory?.map(card => ({
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
                value={selectValue}
                onValueChange={e => setSelectValue(e.value)}
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

            <StationAction action="start" team={currentTeam} stationCodename={stationCodename} />
            <StationAction action="finish" team={currentTeam} stationCodename={stationCodename} />
            <Button
              disabled={!currentTeam}
              variant="subtle"
              onClick={async () => {
                try {
                  await minigamePass(currentTeam!.username, stationCodename, getPin(stationCodename)!)
                  toaster.create({
                    type: 'success',
                    title: 'Thành công',
                    description: 'Đã sử dụng thẻ vượt trạm minigame.',
                  })
                }
                catch (error) {
                  console.error('Error using minigame pass:', error)
                  toaster.create({
                    type: 'error',
                    title: 'Lỗi',
                    description: 'Không thể sử dụng thẻ vượt trạm minigame. Vui lòng thử lại sau.',
                  })
                }
              }}
            >
              Sử dụng thẻ vượt trạm minigame
            </Button>
            <Button
              disabled={!currentTeam}
              variant="subtle"
              onClick={async () => {
                try {
                  await skip(currentTeam!.username, stationCodename, getPin(stationCodename)!)
                  toaster.create({
                    type: 'success',
                    title: 'Thành công',
                    description: 'Đã sử dụng thẻ ',
                  })
                }
                catch (error) {
                  console.error('Error using minigame pass:', error)
                  toaster.create({
                    type: 'error',
                    title: 'Lỗi',
                    description: 'Không thể sử dụng thẻ',
                  })
                }
              }}
            >
              SKIP
            </Button>
            <Button
              disabled={!currentTeam}
              variant="subtle"
              onClick={async () => {
                try {
                  await unskip(currentTeam!.username, stationCodename, getPin(stationCodename)!)
                  toaster.create({
                    type: 'success',
                    title: 'Thành công',
                    description: 'Đã sử dụng thẻ ',
                  })
                }
                catch (error) {
                  console.error('Error using minigame pass:', error)
                  toaster.create({
                    type: 'error',
                    title: 'Lỗi',
                    description: 'Không thể sử dụng thẻ',
                  })
                }
              }}
            >
              UNSKIP
            </Button>
          </Card.Body>
        </Card.Root>

        <Show when={teamSkillCardHistoryCollection}>
          <Box mt="6">
            <Heading fontSize="md" mb="2">
              Danh sách thẻ
              {' '}
              <Code>{currentTeam?.name}</Code>
              {' '}
              đã sử dụng
            </Heading>
            <Box overflowX="auto">
              <Table.Root>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Tên thẻ</Table.ColumnHeader>
                    <Table.ColumnHeader>Thời gian sử dụng</Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {teamSkillCardHistoryCollection?.map((card: { value: SkillCardHistory, label: string }) => (
                    <Table.Row key={card.value._id}>
                      <Table.Cell>{card.label}</Table.Cell>
                      <Table.Cell>{card.value.createdAt.toLocaleString('vi-VN')}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            </Box>
          </Box>
        </Show>
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
