import React, { useEffect, useState } from "react";

import Analystics from "./Analystics";
import Chart from "./Chart";
import { getYoutubeTracking } from "@/common/api";
import { handleApi } from "@/common/utils";
import moment from "moment";
import { getRevenueTotal, getRevenueList, getViewsTotal, getViewsList, getWatchTimeTotal, getWatchTimeList } from "@/common/api/history";

const OverviewChart = () => {
  const [revenueChart, setRevenueChart] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [lastRevenue, setLastRevenue] = useState(0);
  const [viewsChart, setViewsChart] = useState([]);
  const [totalViews, setTotalViews] = useState(0);
  const [lastTotalViews, setLastTotalViews] = useState(0);
  const [watchTimeChart, setWatchTimeChart] = useState([]);
  const [totalWatchTime, setTotalWatchTime] = useState(0);
  const [lastTotalWatchTime, setLastTotalWatchTime] = useState(0);

  const [activeTab, setActiveTab] = useState(0);
  const [dateType, setDateType] = useState("FOUR_WEEKS");

  const fetchRevenueHistory = async (dateType: string) => {
    const end_date: Date = new Date();
    let end_date_last: Date;
    let start_date: Date;
    let start_date_last: Date;
    if (dateType === "FOUR_WEEKS") {
      start_date = moment(end_date).subtract(28, "days").toDate();
      end_date_last = moment(end_date).subtract(29, "days").toDate();
      start_date_last = moment(start_date_last).subtract(28, "days").toDate();
    } else if (dateType === "ONE_WEEK") {
      start_date = moment(end_date).subtract(7, "days").toDate();
      end_date_last = moment(end_date).subtract(8, "days").toDate();
      start_date_last = moment(start_date_last).subtract(7, "days").toDate();
    } else if (dateType === "ONE_QUARTER") {
      start_date = moment(end_date).subtract(90, "days").toDate();
      end_date_last = moment(end_date).subtract(91, "days").toDate();
      start_date_last = moment(start_date_last).subtract(90, "days").toDate();
    }
    // revenue
    const revenueSum = await handleApi(getRevenueTotal(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
    const revenueLastSum = await handleApi(
      getRevenueTotal(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD"))
    );
    if (revenueSum.data?.data && revenueLastSum.data?.data) {
      setRevenue(revenueSum.data.data.data?.[0].totalRevenue);
      setLastRevenue(revenueLastSum.data.data.data?.[0].totalRevenue);
    }
    const revenueList = await handleApi(getRevenueList(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
    if (revenueList.data?.data) {
      setRevenueChart(revenueList.data.data.data.reverse());
    }

    // views
    const viewsSum = await handleApi(getViewsTotal(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
    const viewsLastSum = await handleApi(
      getViewsTotal(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD"))
    );
    if (viewsSum.data?.data && viewsLastSum.data?.data) {
      setTotalViews(viewsSum.data.data.data?.[0].totalViews);
      setLastTotalViews(viewsLastSum.data.data.data?.[0].totalViews);
    }
    const viewsList = await handleApi(getViewsList(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
    if (viewsList.data?.data) {
      setViewsChart(viewsList.data.data.data.reverse());
    }

    // watch-time
    const watchTimeSum = await handleApi(getWatchTimeTotal(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
    const watchTimeLastSum = await handleApi(
      getWatchTimeTotal(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD"))
    );
    if (watchTimeSum.data?.data && watchTimeLastSum.data?.data) {
      setTotalWatchTime(watchTimeSum.data.data.data?.[0].totalWatchTime);
      setLastTotalWatchTime(watchTimeLastSum.data.data.data?.[0].totalWatchTime);
    }
    const watchTimeList = await handleApi(getWatchTimeList(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
    if (watchTimeList.data?.data) {
      setWatchTimeChart(watchTimeList.data.data.data.reverse());
    }
  };

  useEffect(() => {
    fetchRevenueHistory(dateType);
  }, [dateType]);

  const handleChangeDateType = (dateType: string) => {
    setDateType(dateType);
  };

  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  const views = totalViews || 0;
  const watchTime = totalWatchTime || 0;
  const estimatedPartnerRevenue = revenue || 0;

  const lastViews = lastTotalViews || 0;
  const lastWatchTime = lastTotalWatchTime || 0;
  const lastEstimatedPartnerRevenue = lastRevenue || 0;

  const dataChartViews = viewsChart.map((item) => ({ x: item.created_at, y: item.totalViews }));
  const dataChartWatchTime = watchTimeChart.map((item) => ({ x: item.created_at, y: item.totalWatchTime }));
  const dataChartEstimatedPartnerRevenue = revenueChart.map((item: any) => ({ x: item.created_at, y: item.totalRevenue }));

  return (
    <div id="Overview" className="overview chart text-base">
      <Analystics
        views={views}
        watchTime={watchTime}
        estimatedPartnerRevenue={estimatedPartnerRevenue}
        lastViews={lastViews}
        lastWatchTime={lastWatchTime}
        lastEstimatedPartnerRevenue={lastEstimatedPartnerRevenue}
        onChangeActiveTab={handleActiveTab}
        activeTab={activeTab}
        dateType={dateType}
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

export default OverviewChart;
