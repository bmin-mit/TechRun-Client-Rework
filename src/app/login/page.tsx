'use client'

import type { SubmitHandler } from 'react-hook-form'
import { Box, Button, Card, Flex, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Field } from '@/components/ui/field'
import { toaster } from '@/components/ui/toaster'
import { login } from '@/lib/data/auth'

// TODO add logos (HPD, PTNK...) at the end of page

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

  const router = useRouter()

  // TODO handle login
  const onSubmit: SubmitHandler<LoginFormFields> = async (data) => {
    const toastId = toaster.create({
      type: 'loading',
      title: 'Đăng nhập',
      description: 'Đang đăng nhập...',
    })

    await login(data)
      .then((loginSuccess) => {
        if (loginSuccess) {
          toaster.update(toastId, {
            title: 'Đăng nhập',
            description: 'Đăng nhập thành công',
            type: 'success',
          })
          router.push('/')
        }
        else {
          toaster.update(toastId, {
            title: 'Đăng nhập',
            description: 'Sai thông tin đăng nhập, vui lòng thử lại',
            type: 'info',
          })
        }
      })
      .catch(() => {
        toaster.update(toastId, {
          title: 'Đăng nhập',
          description: 'Đã xảy ra lỗi, vui lòng thử lại',
          type: 'error',
        })
      })
  }

  return (
    <Flex direction="column" align="center" width="100%">
      <Flex direction="column" maxW="sm" width="100%" my="4" px="4">
        <Box mb="8">
          <Image src="/brand-logo.png" alt="TechRun" width={400} height={100} loading="eager" />
        </Box>

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
