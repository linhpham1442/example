import AgeGenderChart from "@/modules/App/SystemAnalytics/Chart/AgeGender";
import { Anchor } from "antd";
import AppLayout from "@/modules/App/Layout";
import Chart from "../../../modules/App/SystemAnalytics/Chart/index";
import DepositTreasuryChart from '../../../modules/App/SystemAnalytics/Chart/DepositTreasury/index';
import HardwareWareHouse from "@/modules/App/SystemAnalytics/HardwareWareHouse";
import OverviewChart from "@/modules/App/SystemAnalytics/Chart/Overview";
import React from "react";
import { ReactElement } from "react";
import ResourceAllocation from "@/modules/App/SystemAnalytics/Chart/ResourceAllocation";
import SystemAnalyticsSidebar from "@/modules/App/SystemAnalytics/Sidebar";
import TopGeographiesChart from "@/modules/App/SystemAnalytics/Chart/Geography";
import TrafficChart from "@/modules/App/SystemAnalytics/Chart/Traffic";

const SystemAnalytics = () => {
  return (
    <div className="grid grid-flow-col mt-12 lg:grid-cols-5 md:text-base pb-10 lg:w-full w-max mb-[60px] ">
      <SystemAnalyticsSidebar />
      <div className="col-span-4 px-10">
        <div className="chart  mx-auto space-y-10 py-20 md:pt-[60px] md:space-y-10">
          <Chart id="Deposit&Treasury" title="Deposit & Treasury" chart={<DepositTreasuryChart />} />
          <Chart id="Overview" title="Overview" chart={<OverviewChart />} />
          <Chart id="ResourceAllocation" title="Total Resource Allocation" chart={<ResourceAllocation />} />
          <Chart id="TrafficSource" title="Traffic Source Types" chart={<TrafficChart />} />
          <Chart id="Geography" title="Top Geographies" chart={<TopGeographiesChart />} />
          <Chart id="Age&Gender" title="Age & Gender" chart={<AgeGenderChart />} />
        </div>
        <div className="hardware-warehousemd px-5">
          <HardwareWareHouse />
        </div>
      </div>
    </div>
  );
};

SystemAnalytics.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default SystemAnalytics;
