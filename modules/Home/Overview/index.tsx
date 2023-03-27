import React, { useEffect, useState } from "react";

import Analystics from "./Analystics";
import Chart from "./Chart";
import Title from "@/common/components/Title";
import { getYoutubeTracking } from "@/common/api";
import { handleApi } from "@/common/utils";

const Overview = () => {
  const [data, setData] = useState({} as any);
  const [activeTab, setActiveTab] = useState(0);
  const [dateType, setDateType] = useState("FOUR_WEEKS");

  const fetchYoutubeTracking = async (dateType: string) => {
    try {
      let response = await handleApi(getYoutubeTracking(dateType));

      if (response?.data?.data) {
        setData(response.data?.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchYoutubeTracking(dateType);
  }, [dateType]);

  const handleChangeDateType = (dateType: string) => {
    setDateType(dateType);
  };

  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  // console.log("data", data);
  // console.log("views", data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[0]?.primaryContent?.total);
  const views = data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[0]?.primaryContent?.total || 0;
  const watchTime = (data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[1]?.primaryContent?.total || 0) / 3600;
  const estimatedPartnerRevenue = data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[2]?.primaryContent?.total || 0;

  const lastViews = data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[0]?.primaryContent?.previousTotal || 0;
  const lastWatchTime = (data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[1]?.primaryContent?.previousTotal || 0) / 3600;
  const lastEstimatedPartnerRevenue = data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[2]?.primaryContent?.previousTotal || 0;

  const dataChartViews = data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[0]?.primaryContent?.mainSeries?.datums || [];
  const dataChartWatchTime = (data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[1]?.primaryContent?.mainSeries?.datums || []).map(
    (item: any) => ({ x: item.x, y: item.y / 3600 })
  );
  const dataChartEstimatedPartnerRevenue =
    data?.cards?.[0]?.keyMetricCardData?.keyMetricTabs?.[2]?.primaryContent?.mainSeries?.datums || [];

  return (
    <div className="md:pb-[160px] font-bold">
      <div className="text-center title ">
        <Title title="SOFIN’s Real-time Youtube Stats" />
        <div className="content md:-mt-5 -mt-2 mb-10 md:leading-[28px] leading-[20px] md:text-[20px] text-16px text-[#6289DA]">
          *The real-time stats is simultaneously transmitted from Youtube
        </div>
      </div>
      <Analystics
        views={views}
        watchTime={watchTime}
        estimatedPartnerRevenue={estimatedPartnerRevenue}
        lastViews={lastViews}
        lastWatchTime={lastWatchTime}
        lastEstimatedPartnerRevenue={lastEstimatedPartnerRevenue}
        onChangeActiveTab={handleActiveTab}
        activeTab={activeTab}
      />
      <Chart
        dataChartViews={dataChartViews}
        dataChartWatchTime={dataChartWatchTime}
        dataChartEstimatedPartnerRevenue={dataChartEstimatedPartnerRevenue}
        activeTab={activeTab}
        onChangeTypeDate={handleChangeDateType}
        dateType={dateType}
      />
    </div>
  );
};

export default Overview;
