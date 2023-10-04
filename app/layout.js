import './globals.css'
import {Noto_Sans_JP} from 'next/font/google'
import BgBg from '@/app/_assets/backgroud/base.png'
import Image from 'next/image'

const notoSansJp = Noto_Sans_JP({
    weight: ['400', '700'],
    subsets: ['latin'],
})

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <title>DramaBase株式会社</title>
        <meta name="description"
              content="”ハマってしまう”ゲームデザインを映像に実装した、新感覚の動画コンテンツです。アメリカの「NETFLIX」や中国の「bilibili動画」も注目するインタラクティブドラマ。選択肢やキーワード入力といったゲームギミックで、高い没入感を実現しています。この体験型動画コンテンツを活用することで、サービスや商品をエンゲージメント高く、プロモーションすることが可能です。"/>
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
