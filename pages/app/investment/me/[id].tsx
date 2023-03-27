import AppLayout from "@/modules/App/Layout";
import InvestmentSidebar from "@/modules/App/Investment/Sidebar";
import MakeInvestmentDetail from "@/modules/App/Investment/Detail";
import MyInvestment from '@/modules/App/Investment/MyInvestment';
import { MyInvestmentCard } from '../../../../modules/App/Investment/MyInvestment/MyInvestmentCard';
import MyInvestmentDetail from '../../../../modules/App/Investment/MyInvestment/Detail';
import { ReactElement } from "react";
import StatusSofin from "@/modules/App/StatusSofin";

const MyInvestmentItem = () => {

  return (
    <div className="app grid mt-[60px] lg:w-full w-max grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <InvestmentSidebar active="2"/>
      </div>
      <div className="p-[60px] col-span-4 grid grid-cols-3">
      <div className="col-span-2">
          <StatusSofin />
        </div>
        <div className="invested ml-8 bg-[#DDFFED] grid grid-rows-1 gap-y-2  shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] px-5 py-4">
          <div className="title text-sm text-[#6C6684]">Your Profit</div>
          <div className="SF title-app text-xl text-[#34C77B]">+ 139.05 SF</div>
        </div>
        <div className="package col-start-1 col-span-3 bg-blue">
          <MyInvestmentDetail />
        </div>
      </div>
    </div>
  );
};

MyInvestmentItem.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default MyInvestmentItem;
