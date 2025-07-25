'use client'

import { Dialog, Heading, PinInput, Skeleton, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import useSWR from 'swr'
import { toaster } from '@/components/ui/toaster'
import { pinAuth } from '@/lib/data/auth'
import StationData, { stationEndpoints } from '@/lib/data/station'

export function PinProtected({ stationCodename }: { stationCodename: string }) {
  const { data, isLoading } = useSWR(
    stationEndpoints.getByCodename(stationCodename),
    () => StationData.getByCodeName(stationCodename),
  )

  const [open, setOpen] = useState(true)
  const [pin, setPin] = useState('')
  const [checking, setChecking] = useState(false)

  const validatePin = async (pin: string) => {
    const toastId = toaster.create({
      type: 'loading',
      title: 'Đăng nhập',
      description: 'Đang đăng nhập...',
    })

    setChecking(true)
    await pinAuth(pin, stationCodename)
      .then(() => {
        toaster.update(toastId, {
          title: 'Đăng nhập',
          description: 'Đăng nhập thành công',
          type: 'success',
        })
        setOpen(false)
        setPin(pin)
        setChecking(false)
      })
      .catch(() => {
        toaster.update(toastId, {
          title: 'Đăng nhập',
          description: 'Sai thông tin đăng nhập',
          type: 'error',
        })
        setChecking(false)
      })
  }

  return (
    <Dialog.Root defaultOpen open={open} size="sm">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.CloseTrigger />
          <Dialog.Header>
            <Skeleton asChild loading={isLoading}>
              <Dialog.Title fontFamily="space" textAlign="center" w="full">
                Trạm
                {' '}
                {data?.name}
              </Dialog.Title>
            </Skeleton>
          </Dialog.Header>

          <Dialog.Body as={VStack}>
            <Heading size="md">
              Nhập mã PIN
            </Heading>

            <PinInput.Root
              mask
              onValueComplete={details => validatePin(details.valueAsString)}
            >
              <PinInput.HiddenInput disabled={checking} />
              <PinInput.Control>
                <PinInput.Input index={0} />
                <PinInput.Input index={1} />
                <PinInput.Input index={2} />
                <PinInput.Input index={3} />
              </PinInput.Control>
            </PinInput.Root>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
