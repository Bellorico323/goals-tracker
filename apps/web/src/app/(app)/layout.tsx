import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'

import logo from '@/assets/logo.svg'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fishpay',
  description: 'Goals tracker, helping you to control your finances',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gold-400 px-10 py-5">
          <Image
            src={logo}
            className="size-6 dark:invert"
            alt="Fish"
            height={24}
            width={24}
          />
        </header>
        <div className="grid-cols-app grid">
          <aside className="col-span-1 py-8 pl-8 pr-5">Sidebar</aside>
          <div>{children}</div>
        </div>
      </body>
    </html>
  )
}
