import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useEffect, useState } from "react";

import { Select } from "antd";
import dayjs from "dayjs";
import { formatShortNumber } from "@/common/utils";
import { getAccountHistory } from "@/common/api/history";
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
const AccountChart = ({ onChangeTypeDate, dateType }: ChartProps) => {
  const [dataChart, setDataChart] = useState([]);
  const fetchAccountHistory = async () => {
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
      const response = await handleApi(getAccountHistory(moment(start_date).format("YYYY-MM-DD"), moment(end_date).format("YYYY-MM-DD")));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        for (let item in data) {
          const { total_accounts, total_have_profiles, total_error_accounts, created_at } = data[item];
          let el_data: any = {
            name: moment(created_at).format("MMM DD"),
            total_accounts: total_accounts,
            total_have_profiles: total_have_profiles,
            total_error_accounts: total_error_accounts,
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
    fetchAccountHistory();
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
            <Bar yAxisId="left" dataKey="total_accounts" name="Total accounts" fill="#997895" />
            <Bar yAxisId="left" dataKey="total_have_profiles" name="Total have profiles" fill="#ADC1CA" />
            <Bar yAxisId="left" dataKey="total_error_accounts" name="Total error accounts" fill="#DA6464" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AccountChart;
