'use client'

import type { StationPosition } from '@/types/station.types'
import { Accordion, Box, Card, For, Heading, Show, Span, Spinner, Tag, Text, VStack } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'
import StationData, { stationEndpoints } from '@/lib/data/station'
import { getMyTeam } from '@/lib/data/team'

const stationLocation: Record<StationPosition, string> = {
  khtn: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM',
  thsg: 'Trường Trung học Thực hành Sài Gòn',
  khtn_thsg: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM & Trường Trung học Thực hành Sài Gòn',
}

export default function DataPiecePage() {
  const { data, isLoading } = useSWR(stationEndpoints.getAll(), StationData.getAll)
  const [teamUsername, setTeamUsername] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchTeam = async () => {
      try {
        const team = await getMyTeam()
        if (isMounted && team) {
          setTeamUsername(team.username)
        }
      }
      catch (error) {
        console.error('Failed to fetch team:', error)
      }
    }

    void fetchTeam()

    return () => {
      isMounted = false
    }
  }, [])

  const { data: visitedStationData } = useSWR(
    teamUsername ? stationEndpoints.getVisitedStation(teamUsername) : null,
    StationData.getVisitedStation,
  )

  const groupedStations = useMemo(
    () => data ? Object.groupBy(data, ({ stationGroup }) => stationGroup.name) : {},
    [data],
  )

  return (
    <Box>
      <Heading mb="4">Danh sách trạm</Heading>

      <Show
        when={!isLoading}
        fallback={(
          <Box position="fixed" top="50%" left="50%" mt="-5" ms="-5">
            <Spinner size="xl" />
          </Box>
        )}
      >
        <Accordion.Root variant="enclosed" collapsible>
          <For each={Object.keys(groupedStations)}>
            {stationGroupName => (
              <Accordion.Item key={stationGroupName} value={stationGroupName}>
                <Accordion.ItemTrigger>
                  <Box flex="1">
                    <Text fontFamily="space">
                      {stationGroupName}
                    </Text>

                    <Text fontSize="sm" color="gray">
                      Địa điểm:
                      {' '}
                      {stationLocation[groupedStations[stationGroupName]![0].stationGroup.position]}
                    </Text>
                  </Box>

                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>

                <Accordion.ItemContent>
                  <Accordion.ItemBody spaceY="2">
                    <For each={groupedStations[stationGroupName]}>
                      {station => (
                        <Card.Root size="sm" fontSize={{ base: 'xs', sm: 'md' }} key={station.codename}>
                          <Card.Body>
                            <Span display="flex" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap" alignItems="center">
                              {station.name}
                              <VStack flex="1" alignItems="flex-end" ml="2">
                                <Tag.Root
                                  colorPalette={{
                                    easy: 'green',
                                    medium: 'yellow',
                                    hard: 'red',
                                  }[station.difficulty]}
                                  size={{ base: 'md', sm: 'sm' }}
                                >
                                  <Tag.Label>
                                    {{
                                      easy: 'Dễ',
                                      medium: 'Trung bình',
                                      hard: 'Khó',
                                    }[station.difficulty]}
                                  </Tag.Label>
                                </Tag.Root>
                                {/* TODO: beware of these visited status */}
                                <Tag.Root
                                  colorPalette={{
                                    visited: 'orange',
                                    notVisited: 'gray',
                                    finished: 'purple',
                                  }[visitedStationData?.find(s => s.station.codename === station.codename) ? 'visited' : 'notVisited']}
                                  size={{ base: 'md', sm: 'sm' }}
                                >
                                  <Tag.Label>
                                    {{
                                      visited: 'Đã ghé thăm',
                                      notVisited: 'Chưa ghé thăm',
                                      finished: 'Đã hoàn thành',
                                    }[visitedStationData?.find(s => s.station.codename === station.codename) ? 'visited' : 'notVisited']}
                                  </Tag.Label>
                                </Tag.Root>
                              </VStack>
                            </Span>
                          </Card.Body>
                        </Card.Root>
                      )}
                    </For>
                  </Accordion.ItemBody>
                </Accordion.ItemContent>
              </Accordion.Item>
            )}
          </For>
        </Accordion.Root>
      </Show>
    </Box>
  )
}
