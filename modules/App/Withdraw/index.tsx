import { Alert, Button, Divider, Input, Modal, Space } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { createWithdraw, regenerateOtp, verifyWithdraw } from "@/common/api/withdraw";

import Link from "next/link";
import { ethers } from "ethers";
import { handleApi } from "@/common/utils";
import { useRouter } from "next/router";
import { getMeProfile } from "@/common/api/user";
import { AuthContext } from "@/common/hooks/useAuth";

const Withdraw = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState<number>();
  const [withdraw, setWithdraw] = useState<string>("");
  const [otp, setOtp] = useState<number>();
  const [msgError, setMsgError] = useState<string>("");
  const [amountError, setAmountError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [invested, setInvested] = useState(0);

  const { state, dispatch } = useContext(AuthContext);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCreateWithdraw = async () => {
    if (!amount) {
      setAmountError("It cannot be empty");
    }
    if (!address) {
      setAddressError("It cannot be empty");
    }
    if (amount < 1000) {
      setAmountError("You need to withdraw minimal 1000 SF");
    } else if (amount > state.profile.sfBalance) {
      setAmountError("You don't hold enough SF!");
    }
    if (!ethers.utils.isAddress(address)) {
      setAddressError("Invalid address");
    }

    if (!(amountError && addressError)) {
      const body = {
        amount,
        address,
      };

      setLoading(true);
      const response = await handleApi(createWithdraw(body));
      // console.log(response);
      setWithdraw(response.data.data._id);
      setLoading(false);
      showModal();
    }
  };

  const handleConfirm = async () => {
    const body = {
      otp,
      withdraw,
    };
    setLoading(true);
    const response = await handleApi(verifyWithdraw(body));
    setLoading(false);
    console.log(response);
    if (!response.success) {
      setMsgError(response.error.message);
    } else {
      setSuccess(true);
      alert("verify success");
      router.push("/app/investment");
    }
  };

  const handleResendOtp = async () => {
    const body = {
      withdraw,
    };
    const response = await handleApi(regenerateOtp(body));
  };

  return (
    <div className="app">
      <div
        className="alert shadow-[0px_4px_12px] shadow-black/20
              rounded-[4px]"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Alert
            message={
              <div className="app text-[#FF9900] text-base ">
                <span>
                  You only can withdraw your Available SF with no fee required. If you withdraw your Invested SF before its due date, please
                  cancel the investment package first that charges an amount of fee.&nbsp;
                  <Link href="/app/investment">Go to Investment Package</Link>
                </span>
              </div>
            }
            banner
          />
        </Space>
      </div>
      <div className="app md:mt-6 grid grid-cols-3 p-10 shadow-[0px_4px_12px] shadow-black/20 rounded-[4px]">
        <div className="col-span-2 space-y-6 ">
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="title">Recipient address</div>
            </div>
            <Input
              className="app"
              size="large"
              placeholder="e.g. 0x2f05c9fd53e9f87dd383d839daf78ec89ed "
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressError("");
              }}
            />
            <div style={{ width: "100%" }}>
              {addressError != "" && (
                <Alert className="app bg-inherit border-0 text-[#EB5757]" message={addressError} type="error" showIcon />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="title">Amount of withdraw</div>
              <div>Available SF: {state.profile.sfBalance}</div>
            </div>
            <Input
              className="app"
              addonBefore="SF"
              size="large"
              placeholder="0"
              onChange={(e) => {
                setAmount(parseInt(e.target.value));
                setAmountError("");
              }}
            />
            <div style={{ width: "100%" }}>
              {amountError != "" && (
                <Alert className="app bg-inherit border-0 text-[#EB5757]" message={amountError} type="error" showIcon />
              )}
            </div>
          </div>
          <Button onClick={handleCreateWithdraw} className="app bg-[#625DF5]" size="large" type="primary" loading={loading}>
            Withdraw
          </Button>
          <Modal
            footer={null}
            className="grid grid-flow-row app"
            title={<div className="text-center">Withdraw Verification</div>}
            open={isModalOpen}
            onCancel={handleCancel}
            width={497}
          >
            <Divider className="m-0 bg-[#D8D4E8]" />
            <div className="content px-10 text-justify mb-2 mt-4">
              <p>For security reason, we just sent an OTP to your email as registered with SF.</p>
              <p>The OTP will expire after 5 minutes</p>
              <Input className="app mt-2" size="large" placeholder="Enter OTP" onChange={(e) => setOtp(parseInt(e.target.value))} />
              <div className="validation flex justify-between items-center">
                <div>
                  {msgError && !success && (
                    <Alert className="app bg-inherit border-0 text-[#EB5757]" message={msgError} type="error" showIcon />
                  )}
                  {success && <Alert className="app bg-inherit border-0 text-[#34C77B]" message="Valid OTP" type="success" showIcon />}
                </div>
                <div className="resend font-bold cursor-pointer" onClick={handleResendOtp}>
                  Resend OTP
                </div>
              </div>
            </div>

            <div className="flex mt-6 items-center justify-center space-x-[30px]">
              <Button onClick={handleCancel} type="primary" size="large" className="min-w-28 app bg-[#EFF0FF] text-[#625DF5]">
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                type="primary"
                size="large"
                className="min-w-28  app bg-[#625DF5] text-white"
                loading={loading}
              >
                Confirm
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
