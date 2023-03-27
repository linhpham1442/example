import AppLayout from "@/modules/App/Layout";
import Chart from "@/modules/App/SystemAnalytics/Chart";
import HardwareWareHouse from "@/modules/App/SystemAnalytics/HardwareWareHouse";
import InvestmentSidebar from "@/modules/App/Investment/Sidebar";
import ListCard from "../../../../modules/App/SystemAnalytics/HardwareWareHouse/Card/index";
import MyInvestment from "@/modules/App/Investment/MyInvestment";
import { ReactElement } from "react";
import ResourceAllocation from "@/modules/App/SystemAnalytics/Chart/ResourceAllocation";
import StatusSofin from "@/modules/App/StatusSofin";

const InvestmentMe = () => {
  return (
    <div className="grid grid-flow-col lg:grid-cols-5 pt-20 mr-[60px]">
      <div className="col-span-1">
        <InvestmentSidebar active="3" />
      </div>
      <div className="col-span-4 py-[60px] space-y-10">
        <ListCard />
        <div>
        <Chart id="" title="Deposit & Treasury" chart={<ResourceAllocation />} />
        
        </div>
      </div>
    </div>
  );
};

InvestmentMe.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default InvestmentMe;
