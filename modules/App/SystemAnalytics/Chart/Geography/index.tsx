import { getYoutubeTrackingAudience } from "@/common/api";
import { handleApi } from "@/common/utils";
import { Select } from "antd";
import { get } from "lodash";
import React, { useEffect, useState } from "react";
import Analystics from "./Analytics";

const TopGeographiesChart = () => {
  const [data, setData] = useState({} as any);
  const [dateType, setDateType] = useState("FOUR_WEEKS");

  const fetchYoutubeTrackingAudience = async (dateType: string) => {
    try {
      let response = await handleApi(getYoutubeTrackingAudience(dateType));

      if (response?.data?.data) {
        setData(response.data?.data);
      }
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchYoutubeTrackingAudience(dateType);
  }, [dateType]);

  const handleChangeDateType = (dateType: string) => {
    setDateType(dateType);
  };

  const titleMapping =
    data?.cards?.[1].sideEntities?.countries?.reduce((results: any, item: any) => {
      return {
        ...results,
        [item?.value]: item?.metadata?.title,
      };
    }, {}) || {};

  const titleValues = get(data, "cards[1].tableCardData.mainTableData.dimensionColumns[0].strings.values", []);
  const percentValues = get(data, "cards[1].tableCardData.mainTableData.metricColumns[0].percentages.values", []);

  const dataCalculated = titleValues.map((titleItem: any, index: number) => ({
    title: titleMapping[titleItem],
    value: percentValues[index],
  }));

  return (
    <div id="Geography">
      <div className="mb-6">
        <Select value={dateType} onChange={handleChangeDateType} className="min-w-[150px]">
          <Select.Option value="ONE_WEEK">Last 7 days</Select.Option>
          <Select.Option value="FOUR_WEEKS">Last 28 days</Select.Option>
          <Select.Option value="ONE_QUARTER">Last 3 months</Select.Option>
        </Select>
      </div>
      <div className="w-2/3">
        <Analystics data={dataCalculated} />
      </div>
    </div>
  );
};

export default TopGeographiesChart;
