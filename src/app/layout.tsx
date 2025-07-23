import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from 'react'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const interFont = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
})

export const metadata: Metadata = {
  title: 'TechRun | BDHVS25',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={interFont.variable}
        style={{
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
