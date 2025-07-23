'use client'

import type { SubmitHandler } from 'react-hook-form'
import { Button, Card, Flex, Input, Text } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Field } from '@/components/ui/field'

interface LoginFormFields {
  username: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormFields>({
    defaultValues: {
      username: '',
      password: '',
    },
  })

  // TODO handle login
  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => { }

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex direction="column" maxW="sm" width="100%" my="4">
        <Text as="h1" textStyle="xl" fontWeight="semibold" textAlign="center" mb="8">TechRun 2025</Text>

        <Card.Root as="form" onSubmit={handleSubmit(onSubmit)}>
          <Card.Header>
            <Card.Title textAlign="center">
              Đăng nhập
            </Card.Title>
          </Card.Header>

          <Card.Body as={Flex} direction="column" gap="2">
            <Field
              label="Tên đăng nhập"
              errorText={errors.username?.message}
              invalid={errors.username !== undefined}
            >
              <Input
                placeholder="Tên đăng nhập"
                disabled={isSubmitting}
                {...register('username', {
                  required: 'Chưa điền tên đăng nhập',
                })}
              />
            </Field>

            <Field
              label="Mật khẩu"
              errorText={errors.password?.message}
              invalid={errors.password !== undefined}
            >
              <Input
                type="password"
                placeholder="Mật khẩu"
                disabled={isSubmitting}
                {...register('password', { required: 'Chưa điền mật khẩu' })}
              />
            </Field>
          </Card.Body>

          <Card.Footer>
            <Button type="submit" variant="solid" w="full" disabled={isSubmitting}>
              Đăng nhập
            </Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </Flex>
  )
}
