'use client'

import 'flowbite'
import DramaContainer from "@/app/_components/DramaContainer";

export default function Home () {

  return (
    <main className="w-full h-full">
      <div
          className="relative h-full w-screen flex flex-col justify-center mx-auto md:max-w-sm md:py-[10vh] 2xl:max-w-[24vw]"
      >
        <DramaContainer />
      </div>
    </main>
  )
}
