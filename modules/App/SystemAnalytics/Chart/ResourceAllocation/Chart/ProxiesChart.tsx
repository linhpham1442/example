import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Select } from "antd";
import dayjs from "dayjs";
import { getProxyHistory } from "@/common/api/history";
import { handleApi } from "@/common/utils";
import moment from "moment";

const DateTypeMapping: { [x: string]: string } = {
  FOUR_WEEKS: `${dayjs().subtract(28, "days").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`,
  ONE_QUARTER: `${dayjs().subtract(3, "months").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`,
  ONE_WEEK: `${dayjs().subtract(7, "days").format("MMM D, YYYY")} - ${dayjs().format("MMM D, YYYY")}`,
};

interface ChartProps {
  onChangeTypeDate: (type: string) => void;
  dateType: string;
}

const ProxiesChart = ({ onChangeTypeDate, dateType }: ChartProps) => {
  const [dataChart, setDataChart] = useState([]);
  const fetchProxyHistory = async () => {
    try {
      const data_source: Array<any> = [];
      const end_date: Date = new Date();
      let start_date: Date;
      if (dateType === "FOUR_WEEKS") {
        start_date = moment(end_date).subtract(28, "days").toDate();
      } else if (dateType === "ONE_WEEK") {
        start_date = moment(end_date).subtract(7, "days").toDate();
      } else if (dateType === "ONE_QUARTER") {
        start_date = moment(end_date).subtract(60, "days").toDate();
      }
      const response = await handleApi(getProxyHistory(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        for (let item in data) {
          const { total_proxies, total_usage_proxies, total_available_proxies, total_dead_proxies, created_at } = data[item];
          let el_data: any = {
            name: moment(created_at).format("MMM DD"),
            total_proxies,
            total_used_proxies: total_usage_proxies,
            total_available_proxies,
            total_dead_proxies,
          };
          data_source.push(el_data);
        }
        setDataChart(data_source.reverse());
      }
    } catch (error) {
      console.log("error", error);
      setDataChart([]);
    }
  };

  useEffect(() => {
    fetchProxyHistory();
  }, [dateType]);

  return (
    <div className="mt-10 bg-white text-sm">
      <div className="time md:text-[18px] text-[14px]">{DateTypeMapping[dateType]}</div>
      <div className="selector md:mt-3 md:mb-7">
        <div className="mb-6">
          <Select value={dateType} onChange={onChangeTypeDate} className="min-w-[150px]">
            <Select.Option value="ONE_WEEK">Last 7 days</Select.Option>
            <Select.Option value="FOUR_WEEKS">Last 28 days</Select.Option>
            <Select.Option value="ONE_QUARTER">Last 3 months</Select.Option>
          </Select>
        </div>
      </div>
      <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dataChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <Tooltip />
            <Legend verticalAlign="top" align="left" height={50} />
            <Bar yAxisId="left" dataKey="total_proxies" name="Total proxies" fill="#9FA8C1" />
            <Bar yAxisId="left" dataKey="total_used_proxies" name="Total used proxies" fill="#997878" />
            <Bar yAxisId="left" dataKey="total_available_proxies" name="Total available proxies" fill="#9BB14A" />
            <Bar yAxisId="left" dataKey="total_dead_proxies" name="Total dead proxies" fill="#C397D8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProxiesChart;
