'use client'

import type { ColorModeProviderProps } from './color-mode'
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google'
import { ColorModeProvider } from './color-mode'

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
})

const spaceGroteskFont = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin', 'vietnamese'],
})

const jetbrainsMonoFont = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'vietnamese'],
})

const systemConfig = defineConfig({
  globalCss: {
    html: {
      colorPalette: 'blue',
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: interFont.style.fontFamily },
        body: { value: interFont.style.fontFamily },
        space: { value: spaceGroteskFont.style.fontFamily },
        mono: { value: jetbrainsMonoFont.style.fontFamily },
      },
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
