// import { AnalysticsData } from "./AnalysticsData";
import { formatNumber, formatShortNumber } from "@/common/utils";
import React from "react";
import { ArrowUp, ArrowDown } from "iconsax-react";

interface AnalyticProps {
  views: number;
  watchTime: number;
  estimatedPartnerRevenue: number;
  lastViews: number;
  lastWatchTime: number;
  lastEstimatedPartnerRevenue: number;
  onChangeActiveTab: (activeTab: number) => void;
  activeTab: number;
}

const Analystics = ({
  views,
  watchTime,
  estimatedPartnerRevenue,
  lastViews,
  lastWatchTime,
  lastEstimatedPartnerRevenue,
  onChangeActiveTab,
  activeTab,
}: AnalyticProps) => {
  const AnalysticsData = [
    {
      bg: "bg-[#F3B1DC]",
      border: "border-[#B086A2]",
      title: "Views",
      detail: formatShortNumber(views),
      icon:
        +views >= +lastViews ? (
          <span className="rounded-full p-1 bg-[#00E04C] w-5 h-5 inline-flex justify-center items-center font-bold">
            <ArrowUp size={16} />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-5 h-5 p-1 font-bold bg-red-500 rounded-full">
            <ArrowDown size={16} />
          </span>
        ),
    },
    {
      bg: "bg-[#F6C694]",
      border: "border-[#C58A4D]",
      title: "Watch time (hours)",
      detail: formatShortNumber(watchTime),
      icon:
        +watchTime >= +lastWatchTime ? (
          <span className="rounded-full p-1 bg-[#00E04C] w-5 h-5 inline-flex justify-center items-center font-bold">
            <ArrowUp size={16} />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-5 h-5 p-1 font-bold bg-red-500 rounded-full">
            <ArrowDown size={16} />
          </span>
        ),
    },
    {
      bg: "bg-[#B0BFF8]",
      border: "border-[#887EE3]",
      title: "Estimated partner revenue",
      detail: `$${formatNumber(estimatedPartnerRevenue)}`,
      icon:
        +estimatedPartnerRevenue >= +lastEstimatedPartnerRevenue ? (
          <span className="rounded-full p-1 bg-[#00E04C] w-5 h-5 inline-flex justify-center items-center font-bold">
            <ArrowUp size={16} />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-5 h-5 p-1 font-bold bg-red-500 rounded-full">
            <ArrowDown size={16} />
          </span>
        ),
    },
  ];

  return (
    <div className="md:grid md:grid-cols-3 md:gap-x-8 md:my-12">
      {AnalysticsData.map((item, index) => (
        <div key={index} onClick={() => onChangeActiveTab(index)} className="cursor-pointer">
          <div
            className={`md:py-6 py-5 mb-3 md:mb-0 text-white text-center border-solid border-[2px_2px_4px_2px] rounded-[30px] ${item.bg} ${item.border}`}
          >
            <div className={`title md:font-bold text-[16px] md:text-[20px] ${activeTab !== index ? "text-white" : "text-[#333A6D]"}`}>
              {item.title}
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-2xl detail md:text-4xl md:mt-4 md:font-bold">
              <span>{item.detail}</span>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analystics;
