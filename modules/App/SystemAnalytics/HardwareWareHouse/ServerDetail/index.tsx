import Image from "next/image";
import React from "react";
import { ServerDetailData } from "./ServerDetailData";

const ServerDetail = () => {
  return (
    <div>
      <div className="title text-xl text-[#3D2E7C] title-main md:mb-10 mb-5">Server Details</div>
      <div className="info grid grid-cols-4 2xl:grid-cols-5 gap-5 ">
        {ServerDetailData.map((item, index) => (
          <div key={index} className="card bg-white shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] py-4  px-5">
            <div className="img flex justify-center">
              <Image alt="" src={item.img} width={100} height={100} />
            </div>
            <div className="detail mt-6">
              <div className="item  grid grid-cols-2">
                <div className="text-[#6C6684]">Item</div>
                <div>{item.item}</div>
              </div>
              <div className="name mt-3 grid grid-cols-2">
                <div className="text-[#6C6684]">Name</div>
                <div>{item.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServerDetail;
