import AppLayout from "@/modules/App/Layout";
import InvestmentModal from "@/modules/App/Investment/Modal";
import InvestmentSidebar from "@/modules/App/Investment/Sidebar";
import InvestmentTable from "@/modules/App/Investment/Table";
import MakeInvestment from "@/modules/App/Investment/MakeInvestment";
import { ReactElement } from "react";
import StatusSofin from "@/modules/App/StatusSofin";

const Investment = () => {
  return (
    <div className="grid app grid-flow-col w-max lg:w-full lg:grid-cols-5 mt-16">
      <div className="col-span-1">
        <InvestmentSidebar active="1" />
      </div>
      <div className="p-[40px] col-span-4 grid grid-cols-3">
        <div className="col-span-2">
          <StatusSofin />
        </div>
        <div className="package col-start-1 col-span-3 bg-blue text-xl ">
          <MakeInvestment />
        </div>
        <div className="mt-[60px] w-full shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] col-span-3">
            <InvestmentTable />
          </div>
      </div>
    </div>
  );
};

Investment.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default Investment;
