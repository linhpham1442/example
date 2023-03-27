import { Button, Popover } from "antd";
import React, { useEffect, useState } from "react";

import DetailCard from "../Detail/DetailCard";
import { DetailCardData } from '../Detail/DetailCardData';
import Image from "next/image";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";
import { MakeInvestmentData } from "../MakeInvestment/MakeInvestmentData";
import classNames from "classnames";
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
  profit: string;
  insurance: string;
  servers: string;
  proxies: string;
  account: string;
  thread: string;
  video: string;
  software: string;
  swapfee: string;
  systemfee: string;
}

export const MyDetailCard = ({ item, slug }: { item: MakeInvestmentItem; slug?: string }) => {
  if (!item) return;

  return (
    <div className="grid grid-flow-row gap-x-10 w-full app shadow-[0px_4px_12px] shadow-black/20 py-5 rounded-[4px] h-full">
      <div className="">
        <div className="type w-1/2 text-center text-base font-bold mt-3 py-1 mb-8 bg-[#EFF0FF] rounded-r-full">{item?.type}</div>
        <div className="img flex justify-center">
          <Image className="w-full" src={item?.img} alt="" width={200} height={200} />
        </div>
      </div>
      <div className="w-full p-6">
        <div className="grid grid-flow-row gap-x-10">
          <div className="benefit">
            <div className="title text-xl font-bold mb-6 text-[#2B1C50]">Benefit</div>
            <div className="info w-full space-y-6 text-base">
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">SF invested:</div>
                <div className="">{item?.require}</div>
              </div>
              <div className=" flex space-x-2 justify-between ">
                <div className="text-[#6C6684] flex items-center space-x-2">
                  <p> Profit rate (%):</p>
                  <Popover overlayInnerStyle={{ backgroundColor: "#F8F6F0", width: "20vw" }} className="cursor-pointer" content={content}>
                    <InfoCircle size="20" color="#3D9ACC" />
                  </Popover>
                </div>
                <div className="items-center justify-start gap-x-2">{item?.arr}</div>
              </div>
              <div className=" flex space-x-2 justify-between ">
                <div className="text-[#6C6684]">
                  <p> Profit (SF):</p>
                </div>
                <div className="items-center justify-start gap-x-2">{item?.profit}</div>
              </div>
              <div className=" flex space-x-2 justify-between ">
                <div className="text-[#6C6684]">
                  <p> Investment insurance:</p>
                </div>
                <div className="items-center justify-start gap-x-2">{item?.insurance}</div>
              </div>
            </div>
          </div>
          <div className="resource">
            <div className="title text-xl mt-10 font-bold mb-6 text-[#2B1C50]">Resource</div>
            <div className="info w-full space-y-6 text-base">
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Servers:</div>
                <div className="">{item?.servers}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Proxies:</div>
                <div className="">{item?.proxies}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Accounts:</div>
                <div className="">{item?.account}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Threads:</div>
                <div className="">{item?.thread}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Contents - Videos:</div>
                <div className="">{item?.video}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Software</div>
                <div className="">{item?.software}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">Swap fee:</div>
                <div className="">{item?.swapfee}</div>
              </div>
              <div className=" flex space-x-2 justify-between">
                <div className="text-[#6C6684] ">System maintenance fee:</div>
                <div className="">{item?.systemfee}</div>
              </div>
            </div>
          </div>
        </div>
        {item?.link !== slug && (
          <div className="mt-6 flex items-center justify-center">
            <Link href={`/app/investment/${item?.link}`}>
              <Button className="app bg-[#625DF5]" type="primary" size="large">
                See More
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

interface MakeInvestmentProps {}
const MakeInvestment: React.FC<MakeInvestmentProps> = ({}) => {
  const [data, setData] = useState(DetailCardData);
  const router = useRouter();
  const slug = router.query.id as string;

  useEffect(() => {
    if (slug) {
      setData(DetailCardData.filter((x) => x.link !== slug));
    } else {
      setData(DetailCardData);
    }
  }, [slug]);

  return (
    <div className="text-base">
      <div className="title text-[#3D2E7C] my-10 font-bold text-lg">Investment Package</div>
      <div className="grid grid-cols-4 gap-x-5">
        {data.map((item, index) => (
          <div key={index}>
            <DetailCard item={item} slug={slug} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDetailCard;
