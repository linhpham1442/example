import AppLayout from "@/modules/App/Layout";
import InvestmentSidebar from "@/modules/App/Investment/Sidebar";
import { ReactElement } from "react";
import StatusSofin from "@/modules/App/StatusSofin";
import Withdraw from "../../withdraw";

const InvestmentMe = () => {
  return (
    <div className="grid grid-flow-col lg:grid-cols-5 pt-20 app">
      <div className="col-span-1">
        <InvestmentSidebar active="4" />
      </div>
      <div className="p-[40px] col-span-4 grid grid-flow-row lg:grid-cols-3">
        <div className="col-span-2">
          <StatusSofin />
        </div>
        <div className="invested w-max md:w-full ml-8 bg-[#DDFFED] grid grid-rows-1 gap-y-2  shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] px-5 py-4">
          <div className="title text-sm text-[#6C6684]">Your Profit</div>
          <div className="SOFIN title-app text-xl text-[#34C77B]">+ 139.05 SF</div>
        </div>
        <div className="package col-start-1 col-span-3 bg-blue">
          <div className="title text-xl my-10 title-main">Withdraw your SF</div>
          <Withdraw />
        </div>
      </div>
    </div>
  );
};

InvestmentMe.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default InvestmentMe;
