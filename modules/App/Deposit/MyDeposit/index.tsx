import { Button, Collapse, Divider } from "antd";
import { useEffect, useState } from "react";

import { Descriptions } from "antd";
import React from "react";
import classNames from "classnames";
import { getMyDeposit } from "@/common/api/deposit";

const { Panel } = Collapse;

const MyDeposit = () => {
  const [listDeposit, setListDeposit] = useState([]);
  const fetchMyDeposit = async () => {
    const { data } = await getMyDeposit();
    if (data) {
      setListDeposit(data.data);
    }
  };
  useEffect(() => {
    fetchMyDeposit();
  }, []);
  const getStringPaymentMethod = (method: string) => {
    if (method === "bank") {
      return "Bank Transfer - Techcombank";
    }
    if (method === "crypto") {
      return "Crypto Transfer";
    }
    if (method === "momo") {
      return "Momo Transfer";
    }
  };
  const getStringStatusDeposit = (status: string, expired: number) => {
    if (status === "processing") {
      if (expired >= Date.now()) {
        return "Verifying Payment";
      }
      if (expired < Date.now()) {
        return "Time Limit Exceeded";
      }
    }
    if (status === "done") {
      return "Deposit Successful";
    }
    if (status === "cancel") {
      return "Cancel by user";
    }
  };
  return (
    <div className="md:w-full w-max app">
      <div className="date-selector mb-10 flex space-x-2 font-normal">
        <div className="border-solid cursor-pointer px-3 py-1 rounded-[4px] bg-[#EFF0FF]">Past 30 days</div>
        <div className="border-solid px-3 py-1 rounded-[4px] text-[#6C6684] bg-inherit border-[1px] border-[#6C6684]">Past 60 days</div>
        <div className="border-solid px-3 py-1 rounded-[4px] text-[#6C6684]  bg-inherit border-[1px] border-[#6C6684]">Past 90 days</div>
        <div className="border-solid px-3 py-1 rounded-[4px] text-[#6C6684]  bg-inherit border-[1px] border-[#6C6684]">Customize date</div>
      </div>
      <div className="list-collapse">
        <div className="date mb-4 font-bold">Ongoing Deposit</div>
        {listDeposit.map((item, index) => (
          <div key={index} className="collapse-list">
            <Collapse className="bg-white mb-5 app" expandIconPosition="end">
              <Panel
                extra={
                  <div
                    className={classNames("status app px-3 py-1 text-xs rounded-[4px] text-white", {
                      ["bg-[#3E74FF]"]: item.status === "processing" && item.expired_at >= Date.now(),
                      ["bg-[#34C77B]"]: item.status === "done",
                      ["bg-[#EB5757]"]: item.status === "processing" && item.expired_at < Date.now(),
                      ["bg-[#a40b0b]"]: item.status === "cancel",
                    })}
                  >
                    {getStringStatusDeposit(item.status, item.expired_at)}
                  </div>
                }
                header={<p>Deposit ID: {item.depositIdStr}</p>}
                key="1"
              >
                <Descriptions className="app" column={1}>
                  <Descriptions.Item label="Deposit Amount">{item.depositAmount.toLocaleString("en-US")} VND</Descriptions.Item>
                  <Descriptions.Item label="Received SF">{item.receivedSofin} SF</Descriptions.Item>
                </Descriptions>
                <div className="-mt-5 -mb-3">
                  <Divider className="" />
                </div>
                <Descriptions className="app">
                  <Descriptions.Item label="Payment Method">{getStringPaymentMethod(item.paymentMethod)}</Descriptions.Item>
                </Descriptions>
                {item.status === "processing" && new Date(item.expired_at).getTime() > new Date().getTime() ? (
                  <Button size="middle" type="primary" className="hover:opacity-80 app mt-2" style={{ backgroundColor: "#EB5757" }}>
                    Cancel Deposit
                  </Button>
                ) : null}
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyDeposit;
