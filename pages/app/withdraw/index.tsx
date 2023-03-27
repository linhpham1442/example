import React, { ReactElement } from "react";

import AppLayout from "@/modules/App/Layout";
import DepositForm from "@/modules/App/Deposit/DepositForm";
import DepositSidebar from "@/modules/App/Deposit/Sidebar";
import StatusSofin from "@/modules/App/StatusSofin";
import Withdraw from "@/modules/App/Withdraw";
import WithdrawSidebar from "../../../modules/App/Withdraw/Sidebar/index";

const WithdrawPage = () => {
  return (
    <div className="mt-12 text-base pr-[60px] grid grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <WithdrawSidebar active="1" />
      </div>
      <div className="p-[40px] col-span-4 grid grid-flow-row lg:grid-cols-3">
        <div className="col-span-2">
          <StatusSofin />
        </div>
        <div className="invested app w-max md:w-full ml-8 bg-[#DDFFED] grid grid-rows-1 gap-y-2  shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] px-5 py-4">
          <div className="title text-sm text-[#6C6684]">Your Profit</div>
          <div className="SF title-app text-xl text-[#34C77B]">+ 139.05 SF</div>
        </div>
        <div className="bank-form mt-5 lg:col-span-3 lg:col-start-1">
          <div className="title text-xl app font-bold mb-5">Withdraw your SF</div>
          <Withdraw />
        </div>
      </div>
    </div>
  );
};
WithdrawPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default WithdrawPage;
