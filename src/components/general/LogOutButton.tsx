'use client'

import { Button, Dialog, Text } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LogOutButton() {
  const router = useRouter()

  const logout = () => {
    Cookies.remove('accessToken')
    router.replace('/login')
  }

  return (
    <Dialog.Root placement="center" size="xs">
      <Dialog.Trigger asChild>
        <Button colorPalette="red" variant="outline" w="full" fontFamily="space">
          <LogOut />
          Đăng xuất
        </Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title fontFamily="space">
              Đăng xuất
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text>Bạn có chắc chắn muốn đăng xuất?</Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">Huỷ</Button>
            </Dialog.ActionTrigger>
            <Button colorPalette="red" onClick={logout}>Đăng xuất</Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
