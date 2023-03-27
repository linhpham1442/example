import Image from 'next/image'
import React from 'react'
import Title from '@/common/components/Title'

const Hub = () => {
  return (
    <div className=" lg:py-[166px] pb-20 pt-10 flex flex-col-reverse lg:grid lg:grid-cols-3">
      <div className="img mt-10 lg:mt-0 lg:col-span-2">
        <Image className="w-full" alt="" src="/svg/hub.svg" width={800} height={505} objectFit="cover" />
      </div>
      <div className="info text-center lg:text-left lg:grid font-bold  lg:place-content-center lg:pl-[99px]">
        <Title title="SOFIN HUB"/>
        <div className="content lg:mt-[36px]lg:text-[20px] lg:leading-[36px]">SOFIN Hub - SocialFi platform operating on the following protocol: Proof of Work (POW) focuses on using Al & Web3 technology applications to exploit revenue from social platforms for content creators, end users and social channel operators.</div>
      </div>
    </div>
  )
}

export default Hub