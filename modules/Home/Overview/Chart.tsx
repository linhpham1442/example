import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { ArrangeHorizontal, ArrowDown3 } from "iconsax-react";
import React, { useRef } from "react";

import Image from "next/image";
import dayjs from "dayjs";
import { formatShortNumber } from "@/common/utils";

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

const Chart = ({
  dataChartViews,
  dataChartWatchTime,
  dataChartEstimatedPartnerRevenue,
  onChangeTypeDate,
  activeTab,
  dateType,
}: ChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const dataCharts = [dataChartViews, dataChartWatchTime, dataChartEstimatedPartnerRevenue];

  const data = dataCharts[activeTab];

  return (
    <div className="shadow-[0px_4px_10px] shadow-black/25 md:mt-20 mt-10 md:font-bold md:px-[52px] px-5 py-4 md:py-[24px] bg-white rounded-[30px] box-shadow-[0px_4px_10px_rgba(0, 0, 0, 0.25)] border-[#8AB0F9] border-[2px_2px_4px_2px]">
      <div className="time md:text-[18px] text-[14px]">
        {dateType === "FOUR_WEEKS"
          ? `${dayjs().subtract(28, "days").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`
          : `${dayjs().subtract(7, "days").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`}
      </div>
      <div className="selector md:mt-3 md:mb-7">
        <div
          className="item md:text-[24px] text-[18px] flex justify-start items-center gap-2 cursor-pointer"
          onClick={() => onChangeTypeDate(dateType === "FOUR_WEEKS" ? "ONE_WEEK" : "FOUR_WEEKS")}
        >
          <span>{dateType === "FOUR_WEEKS" ? "Last 28 days" : "Last 7 days"}</span>
          <ArrangeHorizontal className="path-stroke-2" />
        </div>
      </div>
      <div className="chart" ref={chartContainerRef}>
        <AreaChart
          width={chartContainerRef?.current?.scrollWidth || ("100%" as any)}
          height={300}
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
            orientation="right"
          />
          <Tooltip content={CustomTooltip} />
          <CartesianGrid vertical={false} horizontal={false} stroke="#FFF" opacity={0.1} />
          <Area type="monotone" dataKey="y" name="area" strokeWidth={2} fillOpacity={1} stroke="#5ec1d7" fill="url(#colorUv)" />
        </AreaChart>
      </div>
    </div>
  );
};

export default Chart;
