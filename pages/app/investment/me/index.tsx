import { ReactElement, useState } from "react";

import AppLayout from "@/modules/App/Layout";
import { InvestmentCard } from "@/modules/App/Investment/MakeInvestment";
import InvestmentSidebar from "@/modules/App/Investment/Sidebar";
import { MakeInvestmentData } from "@/modules/App/Investment/MakeInvestment/MakeInvestmentData";
import MyInvestment from "@/modules/App/Investment/MyInvestment";
import { MyInvestmentCard } from "@/modules/App/Investment/MyInvestment/MyInvestmentCard";
import StatusSofin from "@/modules/App/StatusSofin";

interface MakeInvestmentItem {
  img: string;
  type: string;
  arr: string;
  require: string;
  link: string;
}

const InvestmentMe = ({ item, slug }: { item: MakeInvestmentItem; slug?: string }) => {
  const [data, setData] = useState(MakeInvestmentData);
  return (
    <div className="grid app grid-flow-col lg:grid-cols-5 pt-20">
      <div className="col-span-1">
        <InvestmentSidebar active="2" />
      </div>
      <div className="p-[40px] col-span-4 grid grid-flow-row lg:grid-cols-3">
        <div className="col-span-2">
          <StatusSofin />
        </div>
        <div className="invested w-max md:w-full ml-8 bg-[#DDFFED] grid grid-rows-1 gap-y-2  shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] px-5 py-4">
          <div className="title text-sm text-[#6C6684]">Your Profit</div>
          <div className="SF title-app text-xl text-[#34C77B]">+ 139.05 SF</div>
        </div>
        <div className="package col-start-1 col-span-3 bg-blue">
          <div className="title text-xl my-10 title-main">Your Investment</div>
          <div className="grid lg:grid-cols-3 grid-cols-2 gap-x-5 gap-y-5">
            {data.map((item, index) => (
              <div key={index}>
                <MyInvestmentCard item={item} slug={slug} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

InvestmentMe.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default InvestmentMe;
