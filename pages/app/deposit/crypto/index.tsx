import AppLayout from "@/modules/App/Layout";
import DepositForm from "@/modules/App/Deposit/DepositForm";
import DepositSidebar from "@/modules/App/Deposit/Sidebar";
import Invested from "@/modules/App/StatusSofin";
import { ReactElement } from "react";

const DepositCrypto = () => {
  return (
    <div className="mt-16 lg:w-full w-full text-base pr-[60px] grid grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <DepositSidebar active="3" />
      </div>
      <div className="item col-span-4 lg:w-full w-full grid-cols-3 py-[60px] px-8 gap-10">
        <div className="invested w-2/3">
          <Invested />
        </div>
        <div className="bank-form mt-5 col-span-3 col-start-1">
          <DepositForm button="Pay with Crypto" logo="/" name="crypto" />
        </div>
      </div>
    </div>
  );
};

DepositCrypto.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default DepositCrypto;
