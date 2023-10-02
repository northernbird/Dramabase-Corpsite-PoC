import './globals.css'
import { Noto_Sans_JP } from 'next/font/google'
import BgBg from '@/app/_assets/backgroud/base.png'
import Image from 'next/image'

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
    <title>DramaBase株式会社</title>
    <body className={notoSansJp.className}>
    <Image
      src={BgBg}
      alt="背景"
      className="fixed w-screen h-screen -z-50"
    />
    {children}
    </body>
    </html>
  )
}
