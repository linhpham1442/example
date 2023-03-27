import { Button, Input, Popover } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { getMeProfile } from "@/common/api/user";

import { DetailCardData } from "./DetailCardData";
import Image from "next/image";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";
import { MakeInvestmentData } from "../MakeInvestment/MakeInvestmentData";
import classNames from "classnames";
import { useRouter } from "next/router";
import InvestmentModal from "../Modal";
import { AuthContext } from "@/common/hooks/useAuth";

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
  name: string;
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

export const DetailCard = ({ item, slug }: { item: MakeInvestmentItem; slug?: string }) => {
  const [showInputInvestment, setShowInputInvestment] = useState(false);
  const [data, setData] = useState(MakeInvestmentData);
  const [currentItem, setCurrentItem] = useState(null);
  const [invested, setInvested] = useState(0);
  const { state, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (slug) {
      setData(MakeInvestmentData.filter((x) => x.link !== slug));
      setCurrentItem(MakeInvestmentData.find((x) => x.link === slug));
    } else {
      setData(MakeInvestmentData);
    }
  }, [slug]);
  if (!item) return;

  return (
    <div>
      <div className="grid grid-cols-3 gap-x-10 w-full app shadow-[0px_4px_12px] shadow-black/20 py-5 pr-20 rounded-[4px] h-full">
        <div className="col-span-1">
          <div className="type text-center text-base font-bold mt-3 py-1 mb-8 bg-[#EFF0FF] rounded-r-full px-9">{item?.type}</div>
          <div className="img flex justify-center">
            <Image className="w-full" src={item?.img} alt="" width={200} height={200} />
          </div>
        </div>
        <div className="w-full col-span-2 ">
          <div className="grid grid-flow-col gap-x-10">
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
              <div className="title text-xl font-bold mb-6 text-[#2B1C50]">Resource</div>
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
      {!showInputInvestment ? (
        <div className="grid bg-white place-content-center gap-y-8 shadow-[0px_4px_12px] shadow-black/20 p-5 rounded-[4px]">
          <div className="text-xl title-main">You have not invested in this investment package yet.</div>
          <div className="flex items-center justify-center">
            <Button className="app bg-[#625DF5]" type="primary" size="large" onClick={() => setShowInputInvestment(true)}>
              Make Investment
            </Button>
          </div>
        </div>
      ) : (
        <div className="app bg-white grid grid-cols-3 p-10 shadow-[0px_4px_12px] shadow-black/20 rounded-[4px]">
          <div className="col-span-2 space-y-6 border-r-[1px] border-r-solid pr-10">
            <div className="text-[#3D2E7C] text-xl font-bold">Make Investment</div>
            <div className="available-sofin text-[#6C6684]">
              Available SF: <span className="text-[#2B1C50]">{state.profile.sfBalance}</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="title">Number of this investment packages you want to purchase</div>
              </div>
              <Input size="large" placeholder="Enter the numbers of this investment package you want to purchase (e.g 1)" />
            </div>
            <div className="text-[#6C6684] text-sm">
              By clicking the button below, you agree to SF&apos;s <span className="text-[#333a6d]">Terms of Service</span> and acknowledge
              you&apos;ve read our <span className="text-[#333a6d]">Privacy Policy.</span>
            </div>
            <InvestmentModal item={currentItem} />
          </div>
          <div className="col-span-1 space-y-6 pl-10">
            <div className="text-[#3D2E7C] text-xl font-bold">Your Order</div>
            <div className="available-sofin text-[#6C6684]">
              Number of packages: <span className="text-[#2B1C50]">{item.name}</span>
            </div>
            <div className="available-sofin text-[#6C6684]">
              Total SF invested: <span className="text-[#2B1C50]">2,000 SF</span>
            </div>
          </div>
        </div>
      )}
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

export default DetailCard;
