'use client'

import type { ColorModeProviderProps } from './color-mode'
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

const systemConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'blue',
    },
  },
})

const system = createSystem(defaultConfig, systemConfig)

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
