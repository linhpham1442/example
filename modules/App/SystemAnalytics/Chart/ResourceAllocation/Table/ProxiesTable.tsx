import React, { useCallback, useEffect, useState } from "react";
import countriesFlags, { getKeyByAlias } from "@/common/vendor/countrys_flags";

import type { ColumnsType } from "antd/es/table";
import Image from "next/image";
import { Table } from "antd";
import { getDetailProxy } from "@/common/api/history";
import { handleApi } from "@/common/utils";
import moment from "moment";

interface DataType {
  key: React.Key;
  name: string;
  host: string;
  port: string;
  user_name: string;
  scheme: string;
  created_date: string;
  updated_date: string;
  location: string;
}
type TablePaginationPosition = "bottomCenter";
const columns: ColumnsType<DataType> = [
  { title: "Name", dataIndex: "name", key: "1" },
  { title: "Host", dataIndex: "host", key: "2" },
  { title: "Port", dataIndex: "port", key: "3" },
  { title: "User name", dataIndex: "user_name", key: "4" },
  { title: "Scheme", dataIndex: "scheme", key: "5" },
  { title: "Created date", dataIndex: "created_date", key: "6" },
  { title: "Updated date", dataIndex: "updated_date", key: "7" },
  {
    title: "Location",
    dataIndex: "location",
    key: "8",
    render: (item: string) => (
      <>
        <div className="flex space-x-2 items-center">
          <Image
            src={item in countriesFlags ? countriesFlags[item].mini : countriesFlags[getKeyByAlias(countriesFlags, item)].mini}
            alt={`${item} flag`}
            width={20}
            height={15}
          />
          <div className="">{item}</div>
        </div>
      </>
    ),
  },
];

const ProxiesTable = () => {
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchDetailProxy = useCallback(async () => {
    try {
      setLoading(true);
      const data_source: Array<DataType> = [];
      const response = await handleApi(getDetailProxy(page, 10));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        data.map((item: any, index: number) => {
          data_source.push({
            key: index.toString(),
            name: item.name,
            host: item.host,
            port: item.port,
            scheme: item.schema,
            created_date: moment(item.created_at).format("hh:mm A - DD/MM/YYYY"),
            updated_date: moment(item.updated_at).format("hh:mm A - DD/MM/YYYY"),
            location: item.location,
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
    fetchDetailProxy();
  }, [fetchDetailProxy, page]);

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
export default ProxiesTable;
