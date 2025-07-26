'use client'

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
import { getPin } from '@/lib/data/pin'
import StationData, { stationEndpoints } from '@/lib/data/station'
import { getAllTeams } from '@/lib/data/team'

export function StationController({ stationCodename }: { stationCodename: string }) {
  const { data, isLoading } = useSWR(
    stationEndpoints.getByCodename(stationCodename),
    () => StationData.getByCodeName(stationCodename),
  )

  const { data: teamsData, mutate: mutateTeams } = useSWR(
    `/team/staff/teams`,
    () => getAllTeams(getPin(stationCodename)!, stationCodename),
    {
      revalidateOnMount: false, // do not fetch on mount
      revalidateOnFocus: false, // optional: prevent auto-refetch
    },
  )

  const teamsCollection = useMemo(
    () => teamsData?.map(team => ({
      value: team,
      label: team.name,
    })) ?? [],
    [teamsData],
  )

  const [currentTeam, setCurrentTeam] = useState<Team>()

  return (
    <>
      <PinProtected stationCodename={stationCodename} onValidated={mutateTeams} />
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
              <Select.Root collection={createListCollection({ items: teamsCollection })} onValueChange={({ items }) => setCurrentTeam(items[0].value)}>
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
              <Button>Xác nhận</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
