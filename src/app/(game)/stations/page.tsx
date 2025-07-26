'use client'

import type { StationPosition } from '@/types/station.types'
import { Accordion, Box, Card, For, Heading, Show, Spinner, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import useSWR from 'swr'
import StationData, { stationEndpoints } from '@/lib/data/station'

const stationLocation: Record<StationPosition, string> = {
  khtn: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM',
  thsg: 'Trường Trung học Thực hành Sài Gòn',
  khtn_thsg: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM & Trường Trung học Thực hành Sài Gòn',
}

export default function DataPiecePage() {
  const { data, isLoading } = useSWR(stationEndpoints.getAll(), StationData.getAll)

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
                        <Card.Root size="sm" key={station.codename}>
                          <Card.Body>
                            {station.name}
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
