'use client'

import type { SubmitHandler } from 'react-hook-form'
import { Box, Button, Card, Flex, HStack, Input, Text } from '@chakra-ui/react'
import { CircleDollarSign, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Field } from '@/components/ui/field'

export default function BidPage() {
  const isBidding = false

  return (
    <Box>
      <Flex justify="space-between">
        <BidTimer />
        <Balance />
      </Flex>

      <BidForm />
    </Box>
  )
}

function BidTimer() {
  return (
    <HStack>
      <Clock />
      <Text fontFamily="space">Time left</Text>
    </HStack>
  )
}

function Balance() {
  return (
    <HStack>
      <CircleDollarSign />
      <Text fontFamily="space">2000</Text>
    </HStack>
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
