import { FlashCircle, Slash } from "iconsax-react";
import React, { useCallback, useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { getDetailAccount } from "@/common/api/history";
import { handleApi } from "@/common/utils";
import moment from "moment";

interface DataType {
  key: React.Key;
  email: string;
  username: string;
  recovery_email: string;
  created_date: string;
  status: string;
}
type TablePaginationPosition = "bottomCenter";
const columns: ColumnsType<DataType> = [
  { title: "Email", dataIndex: "email", key: "1" },
  { title: "User name", dataIndex: "username", key: "2" },
  { title: "Recovery email", dataIndex: "recovery_email", key: "3" },
  { title: "Created date", dataIndex: "created_date", key: "4" },
  { title: "Status", dataIndex: "status", key: "status",
  render: (item) => (
    <div>
      {item === "Running" ? (
        <div className="flex items-center space-x-2">
          <FlashCircle size="20" color="#3E74FF" variant="Outline" /> <p>Running</p>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Slash size="20" color="#8F8C9C" variant="Outline" />
          <p>Stopped</p>
        </div>
      )}
    </div>
  ), },
];

const AccountsTable = () => {
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchDetailAccount = useCallback(async () => {
    try {
      setLoading(true);
      const data_source: Array<DataType> = [];
      const response = await handleApi(getDetailAccount(page, 10));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        data.map((item: any, index: number) => {
          data_source.push({
            key: index.toString(),
            email: item.email,
            username: item.username,
            recovery_email: item.recovery_email,
            created_date: moment(item.created_at).format("hh:mm A - DD/MM/YYYY"),
            status: item.status === 1 ? "Running" : "Stopped",
          } as DataType);
        });
        setDataTable(data_source);
        setTotalRecord(response.data.data.count);
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setDataTable([]);
    }
  }, [page]);

  useEffect(() => {
    fetchDetailAccount();
  }, [fetchDetailAccount, page]);

  const handleChangePage = (newPage: number, newLimit: number) => {
    setPage(newPage);
  };

  return (
    <div className="mt-8 table-allocation">
      <Table
        columns={columns}
        dataSource={dataTable}
        loading={loading}
        scroll={{ x: 900 }}
        pagination={{
          position: [bottom],
          total: totalRecord,
          showSizeChanger: false,
          current: page,
          pageSize: 10,
          showLessItems: true,
          onChange: handleChangePage,
        }}
      />
    </div>
  );
};
export default AccountsTable;