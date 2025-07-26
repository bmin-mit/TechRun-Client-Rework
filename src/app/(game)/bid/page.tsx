'use client'

import type { SubmitHandler } from 'react-hook-form'
import { Box, Button, Card, Flex, Input, Skeleton, Text } from '@chakra-ui/react'
import { Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Field } from '@/components/ui/field'
import { useCurrentAuction } from '@/hooks/useCurrentAuction'

export default function BidPage() {
  return (
    <Box>
      <BidTimer />

      <BidForm />
    </Box>
  )
}

function BidTimer() {
  const { auction, isLoading } = useCurrentAuction()

  console.log(auction)

  return (
    <Skeleton loading={isLoading} asChild>
      <Box w="full" mb="4">
        <Flex justify="center" w="full" gap="2" alignItems="center">
          <Clock />
          <Text fontFamily="space">{auction === null ? '00:00' : ''}</Text>
        </Flex>
      </Box>
    </Skeleton>
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
