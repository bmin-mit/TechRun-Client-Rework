import { For, Table } from '@chakra-ui/react'

const members = [
  { id: '1', name: 'Trinh Van Quyet' },
  { id: '2', name: 'Truong My Lan' },
  { id: '3', name: 'Ngo Ba Kha' },
  { id: '4', name: 'Trinh Tran Phuong Tuan' },
  { id: '5', name: 'Pham Nhat Vuong' },
]

export default function TeamMembersBoard() {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Tên thành viên</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <For each={members}>
          {member => (
            <Table.Row key={member.id}>
              <Table.Cell>{member.name}</Table.Cell>
            </Table.Row>
          )}
        </For>
      </Table.Body>
    </Table.Root>
  )
}
