import { Box, Spinner } from '@chakra-ui/react'

export default function PageSpinner() {
  return (
    <Box position="fixed" top="50%" left="50%" mt="-5" ms="-5">
      <Spinner size="xl" />
    </Box>
  )
}
