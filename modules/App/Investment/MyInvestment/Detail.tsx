import React, { useEffect, useState } from "react";

import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { MakeInvestmentData } from "../MakeInvestment/MakeInvestmentData";
import MyDetailCard from './DetailCard';
import { MyInvestmentCard } from "./MyInvestmentCard";
import { Table } from "antd";
import { useColumns } from "./columns";
import { useRouter } from "next/router";

const MyInvestmentDetail = () => {
  const [data, setData] = useState(MakeInvestmentData);
  const [currentItem, setCurrentItem] = useState(null);
  const [showInputInvestment, setShowInputInvestment] = useState(false);
  const router = useRouter();
  const slug = router.query.id as string;
  const columns = useColumns();
  const data2 = [
    {
      date: new Date().toISOString(),
      rate: 1,
      profit: 10000,
      balance: 1000000,
    },
    {
      date: new Date().toISOString(),
      rate: 1,
      profit: 10000,
      balance: 1000000,
    },
    {
      date: new Date().toISOString(),
      rate: 1,
      profit: 10000,
      balance: 1000000,
    },
  ];
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
      <div className="mb-[60px] grid grid-cols-3 space-x-3">
          <div className="bg-[#F8F6F0] w-full">
            <MyDetailCard item={currentItem} slug={slug} />
          </div>
          <div className="col-span-2 table-investment shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] h-fit">
            <Table bordered={false} columns={columns} dataSource={data2} pagination={false} />
          </div>
      </div>
      <hr />
      <div className="grid lg:grid-cols-3 grid-flow-col gap-x-6">
        {data
          .filter((x) => x.link !== slug)
          .map((item, index) => (
            <div key={index}>
              <MyInvestmentCard item={item} slug={slug} />
            </div>
          ))}
      </div>
    </>
  );
};

export default MyInvestmentDetail;
