import Image from "next/image";
import { ListCardData } from "./ListCardData";
import React from "react";

const ListCard = () => {
  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-x-5  gap-5 md:gap-8">
      {ListCardData.map((item, index) => (
        <div key={index} className="bg-white px-6 pb-6 shadow-[0px_4px_12px] shadow-black/20 rounded-[4px]">
          <div className="tag bg-[#625DF5] text-white text-center mx-10 md:mx-10 2xl:mx-20 rounded-b-sm">{item.tag}</div>
          <div className="flex justify-center md:mt-5">
            <Image src={item.img} alt="" width={200} height={200} />
          </div>
          {item.detail.map((list, index) => (
            <div key={index} className="info md:mt-7 grid grid-cols-2">
              <div className="title">{list.title}</div>
              <div className="detail">{list.detail}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListCard;
