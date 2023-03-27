import { CloseCircle, FlashCircle, Slash, TickCircle } from "iconsax-react";
import React, { useCallback, useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { getDetailClient } from "@/common/api/history";
import { handleApi } from "@/common/utils";

interface DataType {
  key: React.Key;
  id: string;
  ip: string;
  connection: string;
  status: string;
  thread: number;
  ram: number;
}
type TablePaginationPosition = "bottomCenter";
const columns: ColumnsType<DataType> = [
  { title: "ID", dataIndex: "id", key: "1" },
  { title: "IP Address", dataIndex: "ip", key: "2" },
  {
    title: "Connection",
    dataIndex: "connection",
    key: "connection",
    render: (item) => (
      <div>
        {item === "Connected" ? (
          <div className="flex items-center space-x-2">
            <TickCircle size="20" color="#34c77b" variant="Bold" /> <p>Connected</p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <CloseCircle size="20" color="#EB5757" variant="Bold" />
            <p>Disconnected</p>
          </div>
        )}
      </div>
    ),
  },
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
  { title: "Thread", dataIndex: "thread", key: "5" },
  { title: "Ram (GB)", dataIndex: "ram", key: "6" },
];

const data: DataType[] = [
  {
    key: "1",
    id: "33ab87d2-0b9b-48ca-125b-08db0be57711",
    ip: "171.225.123.183",
    connection: "Connected",
    status: "Running",
    thread: 0,
    ram: 0,
  },
  {
    key: "2",
    id: "33ab87d2-0b9b-48ca-125b-08db0be57711",
    ip: "171.225.123.183",
    connection: "Disconnected",
    status: "Stop",
    thread: 0,
    ram: 0,
  },
];

const ClientsTable = () => {
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchDetailClient = useCallback(async () => {
    try {
      setLoading(true);
      const data_source: Array<DataType> = [];
      const response = await handleApi(getDetailClient(page, 10));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        data.map((item: any, index: number) => {
          data_source.push({
            key: index.toString(),
            id: item.client_id,
            ip: item.ip_address,
            connection: item.connection === 1 ? "Connected" : "Disconnected",
            status: item.status === 1 ? "Running" : "Stop",
            thread: item.thread,
            ram: item.ram,
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
    fetchDetailClient();
  }, [fetchDetailClient, page]);

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
export default ClientsTable;