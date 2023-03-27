import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Select } from "antd";
import dayjs from "dayjs";
import { getClientHistory } from "@/common/api/history";
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
const ClientsChart = ({ onChangeTypeDate, dateType }: ChartProps) => {
  const [dataChart, setDataChart] = useState([]);
  const fetchClientHistory = async () => {
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
      const response = await handleApi(getClientHistory(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        for (let item in data) {
          const { total_clients, total_usage_clients, total_available_profiles, created_at } = data[item];
          let el_data: any = {
            name: moment(created_at).format("MMM DD"),
            total_clients,
            total_used_clients: total_usage_clients,
            total_available_profiles,
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
    fetchClientHistory();
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
            <Bar yAxisId="left" dataKey="total_used_clients" name="Total used clients" fill="#797899" />
            <Bar yAxisId="left" dataKey="total_clients" name="Total clients" fill="#ADCAB5" />
            <Bar yAxisId="left" dataKey="total_available_profiles" name="Total available profiles" fill="#DAA464" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClientsChart;
