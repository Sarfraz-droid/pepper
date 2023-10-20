
import type { Metadata } from 'next'
import { Inter, Raleway } from 'next/font/google'
import './globals.css'
import RootLayoutComponent from '@/components/Layout/Root'
import { Toaster } from 'react-hot-toast'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body >
        <Toaster />
        <RootLayoutComponent>
          {children}
        </RootLayoutComponent>
      </body>
    </html>
  )
}
