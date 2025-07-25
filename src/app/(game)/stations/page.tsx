'use client'

import { Accordion, Box, Card, For, Heading, Show, Spinner, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import useSWR from 'swr'
import StationData, { stationEndpoints } from '@/lib/data/station'

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
                  <Text fontFamily="space" flex="1">
                    {stationGroupName}
                  </Text>

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
