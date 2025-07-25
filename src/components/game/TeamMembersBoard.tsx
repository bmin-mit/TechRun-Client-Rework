'use client'

import { For, Skeleton, Table, Text } from '@chakra-ui/react'
import useSWR from 'swr'
import { getMyTeam } from '@/lib/data/team'

const members = [
  { id: '1', name: 'Trinh Van Quyet' },
  { id: '2', name: 'Truong My Lan' },
  { id: '3', name: 'Ngo Ba Kha' },
  { id: '4', name: 'Trinh Tran Phuong Tuan' },
  { id: '5', name: 'Pham Nhat Vuong' },
]

export default function TeamMembersBoard() {
  const { data, isLoading } = useSWR('/team/my-team', getMyTeam)

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>
            <Skeleton h="5" loading={isLoading} asChild>
              <Text fontFamily="space">
                {data?.name}
              </Text>
            </Skeleton>
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <For each={members}>
          {member => (
            <Table.Row key={member.id}>
              <Table.Cell fontWeight="light">{member.name}</Table.Cell>
            </Table.Row>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  )
}
