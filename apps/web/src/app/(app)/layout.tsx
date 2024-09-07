import './globals.css'

import Image from 'next/image'

import logo from '@/assets/logo.svg'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <header className="bg-gold-400 px-10 py-5">
        <Image
          src={logo}
          className="size-6 dark:invert"
          alt="Fish"
          height={24}
          width={24}
        />
      </header>
      <div className="grid grid-cols-app">
        <aside className="col-span-1 py-8 pl-8 pr-5">Sidebar</aside>
        <div>{children}</div>
      </div>
    </div>
  )
}
