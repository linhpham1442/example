import { formatCurrency } from "@/common/utils";
import moment from "moment";

export const useColumns = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value: any) => {
        return <span>{moment(value).format("DD MMM, YYYY")}</span>;
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      key: "rate",
      render: (value: any) => {
        return <span>{value}%</span>;
      },
    },
    {
      title: "Profit",
      dataIndex: "profit",
      key: "profit",
      render: (value: any) => {
        return <span className="text-[#34C77B]">+ {formatCurrency(value)}</span>;
      },
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value: any) => {
        return <span>{formatCurrency(value)}</span>;
      },
    },
  ];
};
