import { Card, Select, Table, message, Divider } from "antd";
import { DataType, useColumns } from "./columns";
import { confirmDepositOrder, getListDeposit } from "@/common/api/admin";
import { useCallback, useEffect, useState } from "react";

const AdminDepositPage = () => {
  const [status, setStatus] = useState("");
  const [sortCreated, setSortCreated] = useState("");
  const [sortDone, setSortDone] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [listDeposit, setListDeposit] = useState<DataType[]>([]);
  const [totalRecord, setTotalRecord] = useState(0);

  const fetchDepositList = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await getListDeposit(page, limit, status);
      if (data) {
        setListDeposit(
          data.data.data.map((item: any) => {
            return {
              id: item._id,
              depositId: item.depositId,
              value: item.value,
              amount: item.depositAmount,
              paymentMethod: item.paymentMethod,
              owner: item.owner.name,
              status: item.status,
              depositIdStr: item.depositIdStr,
            };
          })
        );
        setTotalRecord(data.data.count);
        setLoading(false);
      }
    } catch (error) {
      console.log("Fail to get deposit list", error);
    }
  }, [limit, page, status]);
  const handleChangeStatus = (value: string) => {
    setStatus(value);
  };
  const handleChangeSortCreated = (value: string) => {
    setSortCreated(value);
  };
  const handleChangeSortDone = (value: string) => {
    setSortDone(value);
  };
  const handleMarkDone = async (e: React.MouseEvent<HTMLElement>, id: any) => {
    e.preventDefault();
    try {
      const response = await confirmDepositOrder(id);
      if (response) {
        message.success("Confirm successfully");
        fetchDepositList();
      }
    } catch (error) {
      console.log("Confirm error: ", error);
    }
  };
  const columns = useColumns({ handleMarkDone });
  useEffect(() => {
    //call data
    fetchDepositList();
    return () => {
      console.log("unmounted");
    };
  }, [status, page, limit, fetchDepositList]);
  const handleChangePage = async (newPage: number, newLimit: number) => {
    setPage(newPage);
    setLimit(newLimit);
  };
  return (
    <div className="item col-span-4 lg:grid-cols-3 grid-flow-col py-[60px] px-8 gap-10">
      <Card title="Deposit">
        <p>Filter</p>
        <div className="mb-3">
          <span className="mr-2">Status:</span>
          <Select value={status} className="min-w-[150px]" onChange={handleChangeStatus}>
            <Select.Option value="">All</Select.Option>
            <Select.Option value="processing">Processing</Select.Option>
            <Select.Option value="done">Done</Select.Option>
            <Select.Option value="cancel">Cancel</Select.Option>
          </Select>
        </div>
        <Divider />
        <div className="mb-3">
          <p>Sort</p>
          <span className="mr-2">Created at:</span>
          <Select value={sortCreated} className="min-w-[150px]" onChange={handleChangeSortCreated}>
            <Select.Option value="asc">latest to earliest</Select.Option>
            <Select.Option value="desc">earliest to latest</Select.Option>
          </Select>
          <span className="mx-2">Done at:</span>
          <Select value={sortDone} className="min-w-[150px]" onChange={handleChangeSortDone}>
            <Select.Option value="asc">latest to earliest</Select.Option>
            <Select.Option value="desc">earliest to latest</Select.Option>
          </Select>
        </div>
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={listDeposit}
          pagination={{
            total: totalRecord,
            showSizeChanger: true,
            current: page,
            pageSize: limit,
            showLessItems: true,
            pageSizeOptions: [20, 30, 50, 80, 100],
            onChange: handleChangePage,
          }}
        />
      </Card>
    </div>
  );
};
export default AdminDepositPage;
