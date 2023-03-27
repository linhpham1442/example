import AppLayout from "@/modules/App/Layout";
import DepositSidebar from "@/modules/App/Deposit/Sidebar";
import MyDeposit from "@/modules/App/Deposit/MyDeposit";
import { ReactElement } from "react";

const Deposit = () => {
  return (
    <div className="mt-16 text-base pr-[60px] grid grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <DepositSidebar active="4" />
      </div>
      <div className="item col-span-4 grid grid-flow-col lg:grid-cols-3 py-[60px] px-8 gap-10">
        <div className="col-span-2">
          <div className="bank-form">
            <MyDeposit />
          </div>
        </div>
      </div>
    </div>
  );
};

Deposit.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default Deposit;
