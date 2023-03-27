import { getYoutubeTrackingAudience } from "@/common/api";
import { handleApi } from "@/common/utils";
import { Divider, Select } from "antd";
import { chain, get, groupBy, round, sumBy } from "lodash";
import React, { useEffect, useState } from "react";
import Analystics from "./Analytics";

const AgeGenderChart = () => {
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
    data?.cards?.[3]?.sideEntities?.demographics?.reduce((results: any, item: any) => {
      return {
        ...results,
        [item?.demographicsType]: item?.metadata?.title,
      };
    }, {}) || {};

  const titleAgeValues = get(data, "cards[3].demographicsCardData.tableData.dimensionColumns[0].enumValues.values", []);
  const titleGenderValues = get(data, "cards[3].demographicsCardData.tableData.dimensionColumns[1].enumValues.values", []);
  const percentValues = get(data, "cards[3].demographicsCardData.tableData.metricColumns[0].percentages.values", []);

  // const dataCalculated = titleAgeValues.map((titleItem: any, index: number) => ({
  //   title: `${titleMapping[titleItem]} | ${titleMapping[titleGenderValues[index]]}`,
  //   value: percentValues[index],
  // }));

  const dataAgeCal = titleAgeValues.map((titleItem: any, index: number) => ({
    title: titleMapping[titleItem],
    value: percentValues[index],
  }));
  const dataAgeCalculated = chain(dataAgeCal)
    .groupBy("title")
    .map((objs, key) => ({
      title: key,
      value: round(sumBy(objs, "value")),
    }))
    .value();

  const dataGenderCal = titleGenderValues.map((titleItem: any, index: number) => ({
    title: titleMapping[titleItem],
    value: percentValues[index],
  }));
  const dataGenderCalculated = chain(dataGenderCal)
    .groupBy("title")
    .map((objs, key) => ({
      title: key,
      value: round(sumBy(objs, "value"), 2),
    }))
    .value();

  return (
    <div id="Age&Gender">
      <div className="mb-6">
        <Select value={dateType} onChange={handleChangeDateType} className="min-w-[150px]">
          <Select.Option value="ONE_WEEK">Last 7 days</Select.Option>
          <Select.Option value="FOUR_WEEKS">Last 28 days</Select.Option>
          <Select.Option value="ONE_QUARTER">Last 3 months</Select.Option>
        </Select>
      </div>
      <div className="w-2/3">
        <Analystics data={dataGenderCalculated} />
        <Divider />
        <Analystics data={dataAgeCalculated} />
      </div>
    </div>
  );
};

export default AgeGenderChart;
