import Image from 'next/image'

import fundo from '@/assets/FUNDO.png'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Image
          src={fundo}
          alt=""
          width={600}
          height={700}
          quality={100}
          className="h-full max-h-screen w-full object-cover"
        />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
