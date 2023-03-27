import Image from "next/image";
import { MakeInvestmentData } from "../MakeInvestment/MakeInvestmentData";
import { Table } from "antd";
import classNames from 'classnames';
import { useColumns } from "./columns";
import { useState } from "react";

interface MakeInvestmentItemProps {
  item: {
    img: string;
    type: string;
    arr: string;
    require: string;
    link: string;
  };
}

const InvestmentCard = ({ item }: MakeInvestmentItemProps) => {
  if (!item) return;

  return (
    <div className="h-full p-5 rounded-[4px]">
      <div className="img flex justify-center">
        <Image src={item.img} alt="" width={200} height={200} />
      </div>
      <div>
        <div className="type text-center font-bold mt-3 mb-8 bg-[#EFF0FF] rounded-full mx-10">{item.type}</div>
        <div className="info grid gap-y-5 ">
          <div className="title grid grid-cols-2 gap-x-2">
            <div className="text-[#6C6684]">SF Holding:</div>
            <div>1,000 SF</div>
          </div>
          <div className="title grid grid-cols-2 gap-x-2">
            <div className="text-[#6C6684]">Interest Rate:</div>
            <div>1% per month</div>
          </div>
          <div className="detail grid grid-cols-2 gap-x-2">
            <div className="text-[#6C6684]">Benefits:</div>
            <div>1 Email - 1 Proxy</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyInvestment = () => {
  const [currentItem, setCurrentItem] = useState(MakeInvestmentData[0]);
  const columns = useColumns();
  const data = [
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

  return (
    <div className="grid w-max lg:w-full grid-flow-col lg:grid-cols-3 place-content-center gap-x-4 shadow-[0px_4px_12px] shadow-black/20 p-4 rounded-[4px] mt-8">
      <div className="bg-[#F8F6F0] w-full col-span-1">
        <InvestmentCard item={currentItem} />
      </div>
      <div className="col-span-2 table-investment">
        <Table bordered={false} columns={columns} dataSource={data} pagination={false} />
      </div>
    </div>
  );
};

export default MyInvestment;
