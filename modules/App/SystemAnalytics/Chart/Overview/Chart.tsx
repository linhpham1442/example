import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Select } from "antd";
import dayjs from "dayjs";
import { formatShortNumber } from "@/common/utils";

// import { ArrangeHorizontal, ArrowDown3 } from "iconsax-react";

// import Image from "next/image";

const DateTypeMapping: { [x: string]: string } = {
  FOUR_WEEKS: `${dayjs().subtract(28, "days").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`,
  ONE_QUARTER: `${dayjs().subtract(3, "months").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`,
  ONE_WEEK: `${dayjs().subtract(7, "days").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`,
};

const convertDate = (timestamp: any) => {
  if (!timestamp) return "";
  return dayjs(new Date(timestamp)).format("MMM DD");
};
const convertValue = (price: any) => {
  if (!price) return "";
  return `$${formatShortNumber(price, 2)}`;
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="py-2 px-4 bg-[#32324E] text-[#9896FF] border border-[#6966FF] rounded z-10 text-left">
        <div className="text-24 font-semibold text-[#FAFAFD] ">${formatShortNumber(payload?.[0]?.value ?? 0, 2)}</div>
        <div className="text-14 text-[#BCBBCA]">{label ? dayjs(new Date(label)).format("MMM DD YYYY") : ""}</div>
      </div>
    );
  }
};

interface ChartProps {
  dataChartViews: Array<{ x: number; y: number }>;
  dataChartWatchTime: Array<{ x: number; y: number }>;
  dataChartEstimatedPartnerRevenue: Array<{ x: number; y: number }>;
  onChangeTypeDate: (type: string) => void;
  dateType: string;
  activeTab: number;
}

const DepositTreasuryChart = ({
  dataChartViews,
  dataChartWatchTime,
  dataChartEstimatedPartnerRevenue,
  onChangeTypeDate,
  activeTab,
  dateType,
}: ChartProps) => {
  const dataCharts = [dataChartEstimatedPartnerRevenue, dataChartViews, dataChartWatchTime];

  const data = dataCharts[activeTab];

  return (
    <div className="mt-10 bg-white">
      <div className="time title-main md:text-base text-[14px]">{DateTypeMapping[dateType]}</div>
      <div className="selector md:mt-3 md:mb-7">
        <div className="mb-6 ">
          <Select value={dateType} onChange={onChangeTypeDate} className="min-w-[150px]">
            <Select.Option value="ONE_WEEK">Last 7 days</Select.Option>
            <Select.Option value="FOUR_WEEKS">Last 28 days</Select.Option>
            <Select.Option value="ONE_QUARTER">Last 3 months</Select.Option>
          </Select>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            // margin={{ left: -25, right: 25 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#5ec1d7" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#5ec1d7" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 14, color: "#BCBBCA" }}
              padding={{ left: 10 }}
              dataKey="x"
              tickFormatter={convertDate}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={7}
              tick={{ fontSize: 14, color: "#BCBBCA" }}
              padding={{ bottom: 10 }}
              dataKey="y"
              width={100}
              tickFormatter={convertValue}
              // orientation="right"
            />
            <Tooltip content={CustomTooltip} />
            <CartesianGrid vertical={false} horizontal={false} stroke="#FFF" opacity={0.1} />
            <Area type="monotone" dataKey="y" name="area" strokeWidth={2} fillOpacity={1} stroke="#5ec1d7" fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DepositTreasuryChart;
