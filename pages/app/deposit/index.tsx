import AppLayout from "@/modules/App/Layout";
import DepositForm from "@/modules/App/Deposit/DepositForm";
import DepositSidebar from "@/modules/App/Deposit/Sidebar";
import Invested from "@/modules/App/StatusSofin";
import MyDeposit from "@/modules/App/Deposit/MyDeposit";
import { ReactElement } from "react";

const Deposit = () => {
  return (
    <div className="mt-12 text-base pr-[60px] grid grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <DepositSidebar active="3" />
      </div>
      <div className="item col-span-4 lg:grid-cols-3 grid-flow-col py-[60px] px-8 gap-10">
        <div className="invested w-2/3">
          <Invested />
        </div>
        <div className="bank-form mt-5 lg:col-span-3 lg:col-start-1">
          <DepositForm button="Pay with Crypto" logo="/" name="crypto" />
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    redirect: {
      destination: "/app/deposit/crypto",
      permanent: false,
    },
  };
}

Deposit.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default Deposit;
