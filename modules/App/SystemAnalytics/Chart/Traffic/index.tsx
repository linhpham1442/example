import { getYoutubeTrackingTrafficSource } from "@/common/api";
import { handleApi } from "@/common/utils";
import { Select } from "antd";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import Analystics from "./Analytics";
import Chart from "./Chart";

const TrafficChart = () => {
  const [data, setData] = useState({} as any);
  const [dateType, setDateType] = useState("FOUR_WEEKS");

  const fetchYoutubeTrackingTrafficSource = async (dateType: string) => {
    try {
      let response = await handleApi(getYoutubeTrackingTrafficSource(dateType));

      if (response?.data?.data) {
        setData(response.data?.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchYoutubeTrackingTrafficSource(dateType);
  }, [dateType]);

  const handleChangeDateType = (dateType: string) => {
    setDateType(dateType);
  };

  const titleMapping =
    data?.cards?.[1]?.sideEntities?.trafficSourceTypes?.reduce((results: any, item: any) => {
      return {
        ...results,
        [item?.trafficSourceType]: item?.metadata?.title,
      };
    }, {}) || {};

  const titleValues = get(data, "cards[1].tableCardData.mainTableData.dimensionColumns[0].enumValues.values", []);
  const percentValues = get(data, "cards[1].tableCardData.mainTableData.metricColumns[0].percentages.values", []);

  const dataCalculated = titleValues.map((titleItem: any, index: number) => ({
    title: titleMapping[titleItem],
    value: percentValues[index],
  }));

  return (
    <div id="TrafficSource">
      <div className="mb-6">
        <Select value={dateType} onChange={handleChangeDateType} className="min-w-[150px]">
          <Select.Option value="ONE_WEEK">Last 7 days</Select.Option>
          <Select.Option value="FOUR_WEEKS">Last 28 days</Select.Option>
          <Select.Option value="ONE_QUARTER">Last 3 months</Select.Option>
        </Select>
      </div>
      <div className="flex gap-10">
        <Chart data={dataCalculated} />
        <Analystics data={dataCalculated} />
      </div>
    </div>
  );
};

export default TrafficChart;
