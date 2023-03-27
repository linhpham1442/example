import Button from "@/common/components/Button/Button";
import Image from "next/image";
import { PackagesData } from "./PackagesData";
import React from "react";

const Packages = () => {
  return (
    <div className="md:mt-[93px] hover:px-3 h-full md:-mr-10 md:font-bold md:text-[16px] grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
      {PackagesData.map((item, index) => (
        <div
          key={index}
          className={`shadow-[4px_4px_10px] shadow-black/25 group cursor-pointer hover:bg-[#C5C5FB] md:px-[35px] md:pt-[12px] px-6 pt-2 pb-5 md:pb-[38px] bg-white rounded-[28px] md:-ml-10 relative md:transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:z-10 hover:text-white duration-300`}
        >
          <div className="img">
            <Image alt="" src={item.img} width={200} height={200} />
          </div>
          <div className="tag md:mb-[38px] group-hover:bg-white group-hover:text-[#887EE3]  mb-5 bg-[#887EE3] text-white rounded-full w-fit md:px-5 px-4 md:flex mx-auto">{item.tag}</div>
          {item.list.map((list, index) => (
            <div key={index} className="list text-left">
              <li className="md:mb-5 mb-2">{list}</li>
            </div>
          ))}
          <div className="hidden group-hover:flex md:mt-12 justify-center ">
          <Button content="Buy Now" />
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default Packages;
