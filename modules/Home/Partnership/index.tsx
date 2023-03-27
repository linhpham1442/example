import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { ParnershipData } from "./PartnershipData";
import React from "react";
import Title from "@/common/components/Title";

const Partnership = () => {
  return (
    <div className="my-10 -mx-[150px] md:-mx-[200px] md:mb-[160px] overflow-hidden font-bold">
      <div className="title text-center">
        <Title title="SOFIN's Partnerships" />
        <div className="carousel">
          <Swiper
            spaceBetween={15}
            freeMode={true}
            speed={9000}
            grabCursor={true}
            autoplay={{
              delay: 1000,
            }}
            loop={true}
            
            className=" grid grid-cols-3 md:grid-cols-5 "
            modules={[Autoplay]}
            slidesPerView={"auto"}
          >
            {ParnershipData.map((item, index) => (
              <SwiperSlide key={index} className="md:-pl-5 overflow-hidden">
                <a href={item.link}>
                  <div className="bg-white md:py-[14px] h-full rounded-[30px] border-[#8AB0F9] border-[2px_2px_5px_2px]">
                    <Image className="w-full rounded-[30px]" src={item.img} width={160} height={160} alt="" />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Partnership;
