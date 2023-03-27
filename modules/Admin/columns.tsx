import { Button, Popconfirm, Space, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
export interface DataType {
  id: string,
  depositId: number;
  value: string;
  amount: number;
  paymentMethod: string;
  owner: string;
  status: string;
  depositIdStr: string;
  transactionId: string;
}

export const useColumns = (props: any): ColumnsType<DataType> => {
  const { handleMarkDone } = props;
  return [
    {
      title: "ID",
      dataIndex: "depositIdStr",
      key: "id",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (value: string) => {
        return (
          <div>
            <Tag>{value}</Tag>
          </div>
        );
      },
    },

    {
      title: "Action",
      key: "action",
      render: (_, { status, id }) => (
        <>
          {status === "processing" && (
            <Space size="middle">
              <Popconfirm
                title="Confirm"
                description="Are you sure to confirm this transaction?"
                onConfirm={(e) => handleMarkDone(e, id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary">Mark Done</Button>
              </Popconfirm>
            </Space>
          )}
        </>
      ),
    },
  ];
};
