import { Button, Divider, Input } from "antd";
import React, { useEffect, useState } from "react";

import DetailCard from "./DetailCard";
import { InvestmentCard } from "../MakeInvestment";
import InvestmentModal from "../Modal";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { MakeInvestmentData } from "../MakeInvestment/MakeInvestmentData";
import { useRouter } from "next/router";

const MakeInvestmentDetail = () => {
  const [data, setData] = useState(MakeInvestmentData);
  const [currentItem, setCurrentItem] = useState(null);
  const [showInputInvestment, setShowInputInvestment] = useState(false);
  const router = useRouter();
  const slug = router.query.id as string;

  useEffect(() => {
    if (slug) {
      setData(MakeInvestmentData.filter((x) => x.link !== slug));
      setCurrentItem(MakeInvestmentData.find((x) => x.link === slug));
    } else {
      setData(MakeInvestmentData);
    }
  }, [slug]);

  return (
    <>
      <div className="underline mb-10 text-base mt-10 app">
        <Link href={`/app/investment`}>
          <a>
            <LeftOutlined />
            <span className="ml-1 text-lg">Back</span>
          </a>
        </Link>
      </div>
      <div className="mb-[60px]">
        <div className="">
          <div className="bg-[#F8F6F0] w-full">
            <DetailCard item={currentItem} slug={slug} />
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-[60px] text-lg font-bold text-[#3D2E7C] mb-8">Maybe you want to see more Investment Package</div>
      <div className="grid lg:grid-cols-3 grid-flow-col gap-x-6">
        {data
          .filter((x) => x.link !== slug)
          .map((item, index) => (
            <div key={index}>
              <InvestmentCard item={item} slug={slug} />
            </div>
          ))}
      </div>
    </>
  );
};

export default MakeInvestmentDetail;
