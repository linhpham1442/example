import { Button, Divider, Modal, Popover } from "antd";
import React, { useState } from "react";

import Image from "next/image";
import { InfoCircle } from "iconsax-react";
import router from "next/router";

const content = (
  <div className="bg-[#F8F6F0] p-3 leading-[22px] app text-sm  grid grid-flow-col justify-center items-center space-x-3">
    <InfoCircle size="20" color="#3D9ACC" variant="Bold" />
    <p>
      9% profit of this investment package is equally divided into 2 parts. 4.5% goes back to the investors and the remaining is used to pay
      for system maintenance.
    </p>
  </div>
);

interface MakeInvestmentItem {
  img: string;
  type: string;
  arr: string;
  require: string;
  link: string;
}
interface InvestmentModalProps {
  item: MakeInvestmentItem;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComplete, setComplete] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const InvestmentCard = (item: MakeInvestmentItem) => {
    return (
      <div className="h-full p-5 rounded-[4px] border border-[#D8D4E8] my-3">
        <div className="img flex justify-center">
          <Image src={item.img} alt="" width={200} height={200} />
        </div>
        <div>
          <div className="type text-center font-bold py-2 w-fit px-5 flex mx-auto mt-3 mb-8 bg-[#EFF0FF] rounded-full ">{item.type}</div>
          <div className="info grid gap-y-5">
            <div className="title grid grid-cols-7 gap-x-3">
              <div className="text-[#6C6684] col-span-3">Investment:</div>
              <div className="col-span-4">{item?.require}</div>
            </div>
            <div className="detail grid  grid-cols-7 gap-x-2">
              <div className="text-[#6C6684] col-span-4">Profit rate (%):</div>
              <div className="col-span-3 items-center grid grid-flow-col justify-start gap-x-2">
                {item?.arr}
                <Popover overlayInnerStyle={{ backgroundColor: "#F8F6F0", width: "20vw" }} className="cursor-pointer" content={content}>
                  <InfoCircle size="20" color="#3D9ACC" />
                </Popover>
              </div>
            </div>
            <Divider className="my-0" />
            <div className="title grid grid-cols-7 gap-x-3">
              <div className="text-[#6C6684] col-span-3">SF you invest:</div>
              <div className="col-span-4">2,000 SF</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <Button className="app bg-[#625DF5]" size="large" type="primary" onClick={showModal}>
          Make Investment
        </Button>
      </div>
      {!isComplete ? (
      <Modal
        footer={null}
        className="grid grid-flow-row app"
        title={<div className="text-center">Review your Investment</div>}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={410}
      >
        <div className="content mb-2 mt-4">Review this information to ensure this is what you want to invest in.</div>
        {InvestmentCard(item)}
        <div className="text-[#6C6684] text-sm my-3">
          By clicking the button below, you agree to SF&apos;s <span className="text-[#333a6d]">Terms of Service</span> and acknowledge
          you&apos;ve read our <span className="text-[#333a6d]">Privacy Policy.</span>
        </div>
        <div className="flex items-center justify-center">
          <Button onClick={() => setComplete(true)} type="primary" size="large" className="min-w-28 app bg-[#625DF5]">
            Invest
          </Button>
        </div>
      </Modal>):(
        <Modal
          footer={null}
          className="grid grid-flow-row app"
          title={<div className="text-center">Your Investment is Completed</div>}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={410}
        >
          <div className="flex items-center justify-center mt-5">
            <Button onClick={() => router.push("/app/investment/me")} type="primary" size="large" className="min-w-28 app bg-[#625DF5]">
              View
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default InvestmentModal;
