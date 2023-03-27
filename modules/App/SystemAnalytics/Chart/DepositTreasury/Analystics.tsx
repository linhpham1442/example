import { ArrowDown, ArrowUp } from "iconsax-react";
import { formatNumber, formatShortNumber } from "@/common/utils";

import React from "react";
import classNames from "classnames";
import { round } from "lodash";

const DateTypeMapping: { [x: string]: string } = {
  FOUR_WEEKS: `28 days`,
  ONE_QUARTER: `3 months`,
  ONE_WEEK: `7 days`,
};

interface AnalyticProps {
  totalDeposit: number;
  watchTime: number;
  lastViews: number;
  lastWatchTime: number;
  onChangeActiveTab: (activeTab: number) => void;
  activeTab: number;
  dateType: string;
}

const Analystics = ({
  totalDeposit,
  watchTime,
  lastViews,
  lastWatchTime,
  onChangeActiveTab,
  activeTab,
  dateType,
}: AnalyticProps) => {
  const AnalysticsData = [
    {
      title: "Total deposit (USDT)",
      detail: "1M",
      icon:
        +totalDeposit >= +lastViews ? (
          <span className="rounded-full p-1 bg-[#00E04C] w-4 h-4 inline-flex justify-center items-center">
            <ArrowUp size={16} />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-4 h-4 p-1  bg-red-500 rounded-full">
            <ArrowDown size={16} />
          </span>
        ),
      percent: round(((totalDeposit - lastViews) / lastViews) * 100, 2),
    },
    // {
    //   title: "Total treasury (USDT)",
    //   detail: "900K",
    //   icon:
    //     +watchTime >= +lastWatchTime ? (
    //       <span className="rounded-full p-1 bg-[#00E04C] w-4 h-4 inline-flex justify-center items-center">
    //         <ArrowUp size={16} />
    //       </span>
    //     ) : (
    //       <span className="inline-flex items-center justify-center w-4 h-4 p-1 bg-red-500 rounded-full">
    //         <ArrowDown size={16} />
    //       </span>
    //     ),
    //   percent: round(((watchTime - lastWatchTime) / lastWatchTime) * 100, 2),
    // },
  ];

  return (
    <div className="grid app grid-cols-3 gap-x-8 mb-10 mt-6 justify-items-stretch">
      {AnalysticsData.map((item, index) => (
        <div key={index} onClick={() => onChangeActiveTab(index)} className="cursor-pointer h-full">
          <div
            className={classNames("h-full md:py-4 py-5 mb-3 md:mb-0 text-white text-center border-solid border rounded border-[#D8D4E8]", {
              "bg-[#EFF0FF]": activeTab === index,
            })}
          >
            <div className="title text-xs md:text-sm text-[#6C6684]">{item.title}</div>
            <div className="flex items-center justify-center gap-2 mt-2 text-base detail md:text-xl md:mt-3">
              <span className="text-[#2B1C50] title-app ">{item.detail}</span>
              <span className="text-white">{item.icon}</span>
            </div>
            {item.percent !== Infinity ? (
              <div className="text-[#6C6684] text-xs mt-3 italic">
                {item.percent}% more previous {DateTypeMapping[dateType]}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analystics;
