'use client'

import 'flowbite'
import { Autoplay, Navigation } from 'swiper/modules'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import SengokuRanbuBanner from '../_assets/banner/sengoku_ranbu.png'
import NemyBanner from '../_assets/banner/nemy.png'
import TalentCampaign from '../_assets/banner/talent_campaign.png'
import Link from 'next/link'
import Image from 'next/image'

export default function BannerCarousel () {
  const [showBanner, setShowBanner] = useState(false)

  // MEMO: 一旦バナー固定
  // MEMO: loopスライドするために合計数は >= slidesPerView * 2である必要がある(Swiper仕様)
  // TODO: To make loop & autoplay works correctly, slidesPerView * 2 seems not to be enough.
  //       Instead, need one more slide (namely, slidesPerView * 2 + 1)
  //       For the demonstration: https://codesandbox.io/s/swiper-autoplay-forked-sl2g5t?file=/index.html
  const banners = [
    {
      src: SengokuRanbuBanner,
      url: 'https://sengoku.dramabase.tv/',
      alt: '上越戦国乱舞',
    },
    {
      src: TalentCampaign,
      //TODO : URLを設定しない仕様なのでどうするか検討
      url: '#',
      alt: 'タレントキャスティング費用割引キャンペーン実施中',
    },
    {
      src: NemyBanner,
      url: 'https://nemy-it.co.jp/',
      alt: 'Nemy',
    },
    {
      src: SengokuRanbuBanner,
      url: 'https://sengoku.dramabase.tv/',
      alt: '上越戦国乱舞',
    },
    {
      src: TalentCampaign,
      //TODO : URLを設定しない仕様なのでどうするか検討
      url: '#',
      alt: 'タレントキャスティング費用割引キャンペーン実施中',
    },
    {
      src: NemyBanner,
      url: 'https://nemy-it.co.jp/',
      alt: 'Nemy',
    },
    {
      src: TalentCampaign,
      //TODO : URLを設定しない仕様なのでどうするか検討
      url: '#',
      alt: 'タレントキャスティング費用割引キャンペーン実施中',
    },
  ]

  useEffect(() => {
    setShowBanner(true)
  }, [])

  return (
      <div>
        <Swiper
            spaceBetween={10}
            slidesPerView={3}
            navigation={false}
            lazyPreloadPrevNext={3}
            centeredSlides
            loop
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              el: '#pagination',
              type: 'custom',
              renderCustom: function (swiper, current, total) {
                let html = ''
                for (let i = 0; i < total; i++) {
                  if (current === i + 1) {
                    // MEMO: original
                    // html = html + `<span class="swiper-pagination-bullet swiper-pagination-bullet-active"></span>`;
                    html = html + `<div class="bg-white h-0.5 w-4">&nbsp</div>`
                  } else {
                    // MEMO: original
                    // html = html + `<span class="swiper-pagination-bullet"></span>`;
                    html = html + `<div class="bg-gray-400 h-0.5 w-4">&nbsp</div>`
                  }
                }
                return html
              }
            }}
            // modules={[Autoplay, Pagination, Navigation,]}
            modules={[ Autoplay, Navigation,]}
            id="banner-carousel"
        >
          {banners.length > 0 && banners.map((banner, index) => (
              <SwiperSlide
                  key={index}
                  virtualIndex={index}
                  className="relative min-h-[10vh] md:min-h-[9vh]"
              >
                <Link href={banner.url} rel="noopener noreferrer" target="_blank">
                  {showBanner &&
                      <Image
                          src={banner.src}
                          alt={banner.alt}
                          style={{objectFit:"contain"}}
                      />
                  }
                  <div className="swiper-lazy-preloader"/>
                </Link>
              </SwiperSlide>
          ))}
        </Swiper>
        {/* Currently, pagination won't be displayed*/}
        {/*<div id="pagination" className="p-2 w-full space-x-1 flex flex-row justify-center"/>*/}
      </div>
  )
}
