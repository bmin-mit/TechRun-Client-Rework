'use client'

import type { SubmitHandler } from 'react-hook-form'
import { Box, Button, Card, Flex, Heading, Input, Show, Table, Text } from '@chakra-ui/react'
import { Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import PageSpinner from '@/components/general/PageSpinner'
import { Field } from '@/components/ui/field'
import { useCurrentAuction } from '@/hooks/useCurrentAuction'
import { useOtherTeamsCoins } from '@/hooks/useOtherTeamsCoins'

export default function BidPage() {
  const { auction, isLoading, isWaiting } = useCurrentAuction()

  console.log(auction)

  return (
    <Show when={!isLoading} fallback={<PageSpinner />}>
      <Show when={auction} fallback={<NoAuctionMessage />}>
        <Show when={!isWaiting} fallback={<WaitingAuction />}>
          <Box>
            <BidTimer />
            <BidForm />
          </Box>
        </Show>
      </Show>
    </Show>
  )
}

function BidTimer() {
  const { auction } = useCurrentAuction()

  return (
    <Box w="full" mb="4">
      <Flex justify="center" w="full" gap="2" alignItems="center">
        <Clock />
        <Text fontFamily="space">{auction === null ? '00:00' : ''}</Text>
      </Flex>
    </Box>
  )
}

interface BidFormFields {
  value: number
}

function BidForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BidFormFields>({
    defaultValues: {
      value: 0,
    },
  })

  const onSubmit: SubmitHandler<BidFormFields> = async (data) => {
    console.log(data)
  }

  // TODO thêm luật đấu giá

  return (
    <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
      <Card.Header>
        <Card.Title textAlign="center" fontFamily="space">
          Tham gia đấu giá
        </Card.Title>
        <Card.Description>
          chi tiết về cách đấu giá hoạt động
        </Card.Description>
      </Card.Header>

      {/*  THÊM THẺ ĐẤU GIÁ VÀO ĐÂY */}

      <Card.Body>
        <Field
          label="Lượng xu tham gia đấu giá"
          errorText={errors.value?.message}
          invalid={errors.value !== undefined}
        >
          <Input
            placeholder="Nhập số xu"
            disabled={isSubmitting}
            {...register('value', { required: 'Vui lòng nhập số lượng xu đấu giá' })}
            type="number"
          />
        </Field>
      </Card.Body>

      <Card.Footer>
        <Button w="100%" type="submit" disabled={isSubmitting}>
          Đấu giá
        </Button>
      </Card.Footer>
    </Card.Root>
  )
}

function NoAuctionMessage() {
  return (
    <Box py="8">
      <Text textAlign="center" fontFamily="space">Đấu giá chưa diễn ra</Text>
    </Box>
  )
}

function WaitingAuction() {
  const { auction } = useCurrentAuction()
  const { data, isLoading } = useOtherTeamsCoins()

  return (
    <Box>
      <Box spaceY="4">
        <Text textAlign="center" fontFamily="space">Đang chờ đấu giá bắt đầu...</Text>
        <Text textAlign="center">
          Đấu giá sẽ diễn ra lúc
          {' '}
          {auction?.startTime?.toLocaleTimeString()}
        </Text>
      </Box>

      <Show when={!isLoading}>
        <Heading mt="8" mb="2" textAlign="center">Tổng quan các đội</Heading>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Tên đội</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Byte</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(team => (
              <Table.Row key={team.username}>
                <Table.Cell>{team.name}</Table.Cell>
                <Table.Cell textAlign="end">{team.coins}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Show>
    </Box>
  )
}
