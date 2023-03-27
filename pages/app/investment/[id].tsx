import AppLayout from "@/modules/App/Layout";
import InvestmentSidebar from "@/modules/App/Investment/Sidebar";
import MakeInvestmentDetail from "@/modules/App/Investment/Detail";
import { ReactElement } from "react";
import StatusSofin from "@/modules/App/StatusSofin";

const Investment = () => {
  return (
    <div className="grid lg:w-full w-max grid-flow-col lg:grid-cols-5">
      <div className="col-span-1">
        <InvestmentSidebar active="1" />
      </div>
      <div className="p-[60px] mt-[60px] col-span-4 grid grid-cols-3">
        <div className="col-span-2 ">
          <StatusSofin />
        </div>
        <div className="package col-start-1 col-span-3 bg-blue">
          <MakeInvestmentDetail />
        </div>
      </div>
    </div>
  );
};

Investment.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default Investment;
