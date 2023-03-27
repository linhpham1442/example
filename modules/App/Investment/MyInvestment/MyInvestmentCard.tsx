import { Button, Divider, Popover } from "antd";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";
import { MakeInvestmentData } from "../MakeInvestment/MakeInvestmentData";
import { useRouter } from "next/router";

const content = (
  <div className="bg-[#F8F6F0] p-3 leading-[22px] app text-sm  grid grid-flow-col justify-center items-center space-x-3">
    <InfoCircle size="20" color="#3D9ACC" variant="Bold" />
    <p>
      9% profit of this investment package is equally divided into 2 parts. 4.5% goes back to the investors and the remaining is used to pay
      for system maintenance.
    </p>
  </div>
);

interface MakeInvestmentItem {
  img: string;
  type: string;
  arr: string;
  require: string;
  link: string;
}

export const MyInvestmentCard = ({ item, slug }: { item: MakeInvestmentItem; slug?: string }) => {
  if (!item) return;

  return (
    <div className="list-card app shadow-[0px_4px_12px] shadow-black/20 p-5 rounded-[4px] h-full">
      <div className="img flex justify-center">
        <Image className="w-full" src={item?.img} alt="" width={200} height={200} />
      </div>
      <div>
        <div className="type text-center text-base font-bold mt-3 py-1 mb-8 bg-[#EFF0FF] rounded-full px-9">{item?.type}</div>
        <div className="info grid gap-y-5 ">
          <div className="title grid grid-cols-7 gap-x-3">
            <div className="text-[#6C6684] col-span-3">Investment:</div>
            <div className="col-span-4">{item?.require}</div>
          </div>
          <div className="detail grid  grid-cols-7 gap-x-2">
            <div className="text-[#6C6684] col-span-4">Profit rate (%):</div>
            <div className="col-span-3 items-center grid grid-flow-col justify-start gap-x-2">
              {item?.arr}
              <Popover overlayInnerStyle={{ backgroundColor: "#F8F6F0", width: "20vw" }} className="cursor-pointer" content={content}>
                <InfoCircle size="20" color="#3D9ACC" />
              </Popover>
            </div>
          </div>
          <Divider className="m-0" />
          <div className="detail grid  grid-cols-7 gap-x-2">
            <div className="text-[#6C6684] col-span-4">SF you invest:</div>
            <div className="col-span-3 items-center grid grid-flow-col justify-start gap-x-2">2,000 SF</div>
          </div>
          <div className="detail grid  grid-cols-7 gap-x-2">
            <div className="text-[#6C6684] col-span-4">Executed date:</div>
            <div className="col-span-3 items-center grid grid-flow-col justify-start gap-x-2">16/02/2023</div>
          </div>
        </div>
        {item?.link !== slug && (
          <div className="mt-6 space-x-5 flex items-center justify-center">
            <Button className="app bg-[#EB5757]" type="primary">
              Cancel Investment
            </Button>
            <Link href={`/app/investment/me/${item?.link}`}>
              <Button className="app bg-[#625DF5]" type="primary">
                View
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
