import { Button, Input, Popover } from "antd";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import { InfoCircle } from "iconsax-react";
import Link from "next/link";
import { MakeInvestmentData } from "./MakeInvestmentData";
import { useRouter } from "next/router";
import InvestmentModal from "../Modal";
import { getMeProfile } from "@/common/api/user";

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

export const InvestmentCard = ({ item, slug }: { item: MakeInvestmentItem; slug?: string }) => {
  if (!item) return;

  return (
    <div className="list-card app shadow-[0px_4px_12px] shadow-black/20 p-5 rounded-[4px] h-full">
      <div className="img flex justify-center">
        <Image className="w-full" src={item?.img} alt="" width={200} height={200} />
      </div>
      <div>
        <div className="type text-center text-base font-bold mt-3 py-1 mb-8 bg-[#EFF0FF] rounded-full px-9">{item?.type}</div>
        <div className="info grid gap-y-5">
          <div className="title grid grid-cols-7 space-x-5 justify-between">
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
  const [data, setData] = useState(MakeInvestmentData);
  const router = useRouter();
  const slug = router.query.id as string;
  const [showInputInvestment, setShowInputInvestment] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [balance, setBalance] = useState(0)
  const [invested, setInvested] = useState(0)
  const fetchMeProfile = async () => {
    try {
      let { data } = await getMeProfile() as any;

      if (data?.data) {
        setBalance(data?.data.balance);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    if (slug) {
      setData(MakeInvestmentData.filter((x) => x.link !== slug));
    } else {
      setData(MakeInvestmentData);
    }
  }, [slug]);

  return (
    <div>
      <div className="text-base">
        <div className="title text-[#3D2E7C] my-10 font-bold text-lg">Investment Package</div>
        <div className="grid grid-cols-4 gap-x-5">
          {data.map((item, index) => (
            <div key={index}>
              <InvestmentCard item={item} slug={slug} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MakeInvestment;
