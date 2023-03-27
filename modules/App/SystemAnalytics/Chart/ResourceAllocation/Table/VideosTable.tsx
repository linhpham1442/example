import React, { useCallback, useEffect, useState } from "react";

import type { ColumnsType } from "antd/es/table";
import { Table } from "antd";
import { getDetailVideo } from "@/common/api/history";
import { handleApi } from "@/common/utils";

interface DataType {
  key: React.Key;
  id: string;
  link: string;
}
type TablePaginationPosition = "bottomCenter";
const columns: ColumnsType<DataType> = [
  { title: "ID", dataIndex: "id", key: "1" },
  { title: "Link", dataIndex: "link", key: "2" },
]

const VideosTable = () => {
  const [bottom, setBottom] = useState<TablePaginationPosition>("bottomCenter");
  const [dataTable, setDataTable] = useState<DataType[]>([]);
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchDetailVideo = useCallback(async () => {
    try {
      setLoading(true);
      const data_source: Array<DataType> = [];
      const response = await handleApi(getDetailVideo(page, 10));
      if (response?.data?.data) {
        const { data } = response?.data?.data;
        data.map((item: any, index: number) => {
          data_source.push({
            key: index.toString(),
            id: item.video_id,
            link: item.link,
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
    fetchDetailVideo();
  }, [fetchDetailVideo, page]);

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
export default VideosTable;
