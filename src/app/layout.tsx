import type { Metadata } from 'next'
import React from 'react'
import { Provider } from '@/components/ui/provider'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechRun | BDHVS25',
  icons: ['/logo.ico'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
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
