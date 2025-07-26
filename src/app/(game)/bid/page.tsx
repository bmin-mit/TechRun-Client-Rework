'use client'

import type { SubmitHandler } from 'react-hook-form'
import { Box, Button, Card, Code, Dialog, Flex, Heading, Input, Show, Skeleton, Table, Text } from '@chakra-ui/react'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import PageSpinner from '@/components/general/PageSpinner'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { useCurrentAuction } from '@/hooks/useCurrentAuction'
import { useMyTeam } from '@/hooks/useMyTeam'
import { useOtherTeamsCoins } from '@/hooks/useOtherTeamsCoins'
import { AuctionData } from '@/lib/data/auction'
import { skillCardBasePrice, skillCardImage } from '@/types/skill-card.enum'

export default function BidPage() {
  const { auction, isLoading, isWaiting } = useCurrentAuction()

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
  const [, setUpdate] = useState(false)

  const remainingTime = auction ? auction.endTime.getTime() - new Date().getTime() : 0

  const initialTimer = remainingTime > 0
    ? `${String(Math.floor(remainingTime / 1000 / 60)).padStart(2, '0')}:${String(Math.floor(remainingTime / 1000) % 60).padStart(2, '0')}`
    : '00:00'

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(prev => !prev)
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <Box w="full" mb="4">
      <Flex justify="center" w="full" gap="2" alignItems="center">
        <Clock />
        <Text fontFamily="space">{auction === null ? '00:00' : initialTimer}</Text>
      </Flex>
    </Box>
  )
}

interface BidFormFields {
  value: number
}

function BidForm() {
  const { auction } = useCurrentAuction()
  const { data } = useMyTeam()
  const [imageLoaded, setImageLoaded] = useState(false)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<BidFormFields>({
    defaultValues: {
      value: 0,
    },
  })

  const onSubmit: SubmitHandler<BidFormFields> = async (data) => {
    try {
      await AuctionData.postBid(data.value)
      toaster.create({
        type: 'success',
        title: 'Thành công',
        description: `Đặt cược thành công`,
      })
    }
    catch (error) {
      toaster.create({
        type: 'error',
        title: 'Lỗi',
        description: 'Đặt cược thất bại. Vui lòng thử lại sau.',
      })
    }
  }

  // TODO thêm luật đấu giá
  // TODO Disable button khi đã cược

  return (
    <>
      <Heading textAlign="center" mb="2">Vật phẩm đang được đấu giá</Heading>
      <Skeleton loading={!imageLoaded} w="full" mb="4">
        <Image loading="eager" src={skillCardImage[auction!.skillCard]} alt="" width="503" height="322" onLoad={() => setImageLoaded(true)} />
      </Skeleton>

      <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
        <Card.Header>
          <Card.Title textAlign="center" fontFamily="space">
            Tham gia đấu giá
          </Card.Title>
          <Card.Description textAlign="center">
            Giá khởi điểm:
            {' '}
            {skillCardBasePrice[auction!.skillCard]}
            {' '}
            Byte
          </Card.Description>
        </Card.Header>

        <Card.Body>
          <Field
            label="Lượng Byte tham gia đấu giá"
            errorText={errors.value?.message}
            invalid={errors.value !== undefined}
          >
            <Input
              placeholder="Nhập số Byte muốn cược"
              disabled={isSubmitting}
              min={1}
              step={1}
              {...register('value', { required: 'Vui lòng nhập số lượng xu đấu giá' })}
              type="number"
            />
          </Field>
        </Card.Body>

        <Card.Footer>
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button w="100%" type="button" disabled={!data || !auction || isSubmitting || getValues('value') < skillCardBasePrice[auction.skillCard] || getValues('value') > data.coins}>
                Đấu giá
              </Button>
            </Dialog.Trigger>

            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Xác nhận đấu giá</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                  Bạn có chắc chắn muốn đặt cược
                  {' '}
                  <Code>
                    {getValues('value')}
                  </Code>
                  {' '}
                  Byte cho vật phẩm này?
                </Dialog.Body>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="subtle">Huỷ</Button>
                  </Dialog.ActionTrigger>
                  <Dialog.ActionTrigger asChild>
                    <Button type="submit">Xác nhận</Button>
                  </Dialog.ActionTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Dialog.Root>
        </Card.Footer>
      </Card.Root>
    </>
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
