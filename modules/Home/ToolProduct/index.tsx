import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import React from "react";
import Title from "@/common/components/Title";
import { ToolProductData } from "./ToolProducData";

const ToolProduct = () => {
  return (
    <div className="md:pb-[160px] md:-mx-[120px] pb-20">
      <div className="text-center font-bold">
        <Title title="SOFIN Tool's Product" />
        <Swiper
          loop={true}
          freeMode={true}
          className="carousel-list grid"
          modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
          effect="coverflow"
          centeredSlides={true}
          coverflowEffect={{
            rotate: -25,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {ToolProductData.map((item, index) => (
            <SwiperSlide
              key={index}
              className="shadow-[0px_8px_8px] shadow-[#8AB0F9] carousel-item w-1/3 cursor-pointer flex flex-col md:py-5 md:px-6 px-5 py-4 bg-white rounded-[20px]"
            >
              <div className="img">
                <Image alt="" src={item.img} width={330} height={278} />
              </div>
              <div className=" border-[2px_2px_4px_2px] mt-5 py-[4px] px-5 text-[#8AB0F9] font-bold flex mx-auto border-[#8AB0F9] rounded-full w-fit md:px-6 md:py-[6px] md:text-[20px] text-center md:mt-[30px]">
                {item.name}
              </div>
              <div className="h-full flex flex-col justify-between">
                <div className="content font-light mt-4">{item.content}</div>
                <div className="tag place-content-center text-center mt-4">
                  {item.tag.map((list, index) => (
                    <span key={index} className="text-center text-[#8AB0F9] font-normal md:mt-[4px] break-all">
                      #{list}&nbsp;
                    </span>
                  ))}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ToolProduct;
