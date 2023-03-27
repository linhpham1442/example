import { Alert, Button, Card, Divider, Input, InputNumber, Modal, Select, Space, Steps } from "antd";
import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";

import Countdown from "./Countdown";
import { Descriptions } from "antd";
import { IDataDeposit } from "@/common/types";
import Image from "next/image";
import { createDepositOrder } from "@/common/api/deposit";
import { useCountdown } from "@/common/hooks/useCountdown";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export const ListMoney = [10000, 20000, 50000, 100000, 200000, 1000000];

const { Option } = Select;

const DepositForm = (props: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setOpen] = useState(true);
  const [current, setCurrent] = useState(0);
  const [isError, setError] = useState(true);
  const [isVerify, setVerify] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [value, setValue] = useState("USD");
  const [id, setID] = useState("");
  const [network, setNetwork] = useState("Binance Smart Chain");
  const [sofin, setSofin] = useState<number>(0);
  const [amountError, setAmountError] = useState<string>("");
  const [data, setData] = useState<any>({});
  const [targetTime, setTargetTime] = useState(0);
  const [days, hours, minutes, seconds] = useCountdown(targetTime);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelDeposit = () => {
    // can call api to cancel deposit
    setCurrent(3);
    setError(false);
  };

  const info = () => {
    Modal.info({
      icon: <div></div>,
      title: <div className="title-main">Your payment is being verified</div>,
      content: (
        <div className="text-center">
          <p>It only takes a few minutes to validate your payment. You can keep track on it by clicking the button below.</p>
        </div>
      ),
      onOk() {},
    });
  };

  const selectNetwork = (
    <Select
      defaultValue="Binance Smart Chain"
      className="mt-2"
      style={{ width: "50%" }}
      dropdownStyle={{ backgroundColor: "white" }}
      onChange={(value) => setNetwork(value)}
      popupClassName="bg-white"
    >
      <Option value="Binance Smart Chain">
        <div className="flex app">
          <Image src="/images/logo/binance.svg" alt="binance logo" width={24} height={23.71} />
          <div className="ml-2">Binance Smart Chain</div>
        </div>
      </Option>
      <Option value="Polygon">
        <div className="flex app">
          <Image src="/images/logo/polygon-matic-logo.svg" alt="polygon logo" width={24} height={24} />
          <div className="ml-2">Polygon</div>
        </div>
      </Option>
      <Option value="Ethereum">
        <div className="flex app">
          <Image src="/images/logo/ethereum-logo.svg" alt="ethereum logo" width={24} height={24} />
          <div className="ml-2">Ethereum</div>
        </div>
      </Option>
    </Select>
  );

  const selectAfterCrypto = (
    <Select
      onChange={(value) => {
        setValue(value);
      }}
      defaultValue="USDT"
    >
      <Option className="app" value="USDT">USDT</Option>
    </Select>
  );
  const handleBankSubmit = async () => {
    if ((amount < 24000 && (value === "USDT" || value === "USD")) || (amount < 576000000 && value === "VND")) {
      setAmountError("You need to deposit minimal 24000 SF");
    } else {
      const body: IDataDeposit = {
        amount,
        value,
        paymentMethod: props.name.toString(),
      };

      const response = await createDepositOrder(body);
      const { data } = response;
      setData(data.data);
      setCurrent(1);
      setOpen(!isOpen);
    }
  };

  useEffect(() => {
    if (!amount) {
      setAmount(0);
    }
    if (value === "VND") {
      setSofin(amount / 24000);
    } else {
      setSofin(amount * 1);
    }
    if (minutes + seconds <= 0 && current === 1) {
      handleCancelDeposit();
    }
    if (data) {
      setTargetTime(data.expired_at);
    }
  }, [value, amount, amountError, data, minutes, seconds, current]);

  return (
    <div className="w-max lg:w-full app">
      {/* Steps Bar */}
      <div className="steps mt-10 mb-3 bg-white py-5 pl-3 pr-40 rounded-[4px] shadow-[0px_4px_12px] shadow-black/20">
        <Steps
          size="small"
          current={current}
          className="text-base app"
          items={[
            {
              title: "Place Deposit",
            },
            {
              title: "Make Payment",
              subTitle: current === 1 ? <Countdown targetTime={data.expired_at} /> : <></>,
            },
            {
              title: "Verify",
              status: current === 2 ? (!isError ? "error" : "process") : null,
            },
            {
              title: "Complete",
            },
          ]}
        />
      </div>
      {/* Form */}
      <div className="grid grid-flow-col lg:grid-cols-3">
        <div className="shadow-[0px_4px_12px] col-span-2 bg-white shadow-black/20 p-6">
          {!isVerify ? (
            <div>
              {" "}
              <div className="logo">
                <Image src={props.logo} height={40} width={80} alt="" objectFit="contain" objectPosition="contain" />
              </div>
              <div className="title text-[#3D2E7C] mt-2">Payment with {props.name}</div>
              {/* Step 1: Place Deposit */}
              {isOpen && current === 0 ? (
                <div className="created-form">
                  <div className=" mt-6 flex justify-between space-x-8">
                    <div>
                      <div>Deposit Amount</div>
                      <Space className="mt-2" direction="vertical">
                        <InputNumber
                          addonAfter={selectAfterCrypto}
                          onChange={(amount) => {
                            setAmountError("");
                            setAmount(amount);
                          }}
                          defaultValue={null}
                          placeholder="0.00"
                          decimalSeparator=","
                          value={amount}
                        />
                      </Space>
                    </div>
                    <div className="button-transfer grid">
                      <button className="bg-inherit pb-[3px] grid items-end">
                        <Image
                          alt=""
                          src="/images/icon/transfer-2.png"
                          objectFit="contain"
                          objectPosition="contain"
                          width={24}
                          height={24}
                        />
                      </button>
                    </div>
                    <div className="received">
                      <div>Received SF</div>
                      <Space className="mt-2" direction="vertical">
                        <Input addonAfter="SF" value={sofin} placeholder="0" disabled />
                      </Space>
                    </div>
                  </div>
                  <p className="text-red-500">{amountError}</p>
                  <div className=" mt-6 font-normal gap-x-1 gap-y-2  grid grid-cols-6 text-[#6C6684]">
                    {ListMoney.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => setAmount(item)}
                        className="bg-[#F8F6F0] hover:text-[#2B1C50] cursor-pointer py-2 px-3 w-fit hover:bg-[#EFF0FF]"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                  {props.name === "crypto" ? (
                    <div>
                      <div className="title mt-5">Network</div>
                      {selectNetwork}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="text-sm font-normal my-6">
                    By clicking the button below, you agree to SF&apos;s Terms of Service and acknowledge you&apos;ve read our Privacy
                    Policy.
                  </div>
                  <Button className="app bg-[#625DF5]" onClick={handleBankSubmit} size="large" type="primary">
                    Make Payment
                  </Button>
                </div>
              ) : (
                <></>
              )}
              {/* Step 2: Make payment */}
              {!isOpen && current === 1 ? (
                <div className="mt-6 completed-form">
                  <div className="alert font-normal">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <Alert
                        className="app"
                        style={{ color: "#FF9900" }}
                        message="You are making payment to get SF. If the payment will be made to the wrong destination account it cannot be refunded! Double-check the payment details before confirming the transaction."
                        type="warning"
                      />
                    </Space>
                  </div>
                  <div className="steps mt-6 grid space-y-6">
                    <div className="step-1">
                      <div className="title flex space-x-5">
                        <div className="number bg-[#3D9ACC] rounded-full p-2 w-6 h-6 grid place-content-center text-white">1</div>
                        <div className="content"> Make a Payment Before </div>
                      </div>
                      <Space className="w-full mt-5 font-normal" direction="vertical" size={16}>
                        <Card className="app">
                          <div className="head-content grid space-y-6">
                            <p className="text-sm">Complete your payment with 15 minutes 00 seconds</p>
                          </div>
                        </Card>
                      </Space>
                    </div>
                    {/* Make payment step 2 */}
                    <div className="step-2">
                      <div className="title flex space-x-5">
                        <div className="number bg-[#3D9ACC] rounded-full p-2 w-6 h-6 grid place-content-center text-white">2</div>
                        <div className="content"> Please Transfer to</div>
                      </div>
                      {props.name !== "crypto" ? (
                        <Space className="w-full mt-5 font-normal" direction="vertical" size={16}>
                          {/* Make payment step 2: Momo & Bank */}
                          <Card
                            className="app"
                            headStyle={{ backgroundColor: "#F8F6F0" }}
                            title={props.name}
                            extra={<Image src={props.logo} height={40} width={80} alt="" objectFit="contain" objectPosition="contain" />}
                          >
                            <Descriptions className="app" column={1}>
                              <Descriptions.Item label={`${props.name} Number`}>0000000000000000000000</Descriptions.Item>
                              <Descriptions.Item label={`${props.name} Holder Name`}>NGUYEN QUANG VIET</Descriptions.Item>
                              <Descriptions.Item label="Transfer Note">Pay for deposit {data.depositIdStr}</Descriptions.Item>
                            </Descriptions>
                            <div className="-mt-5 -mb-3">
                              <Divider className="" />
                            </div>
                            <Descriptions className="app">
                              <Descriptions.Item label="Transfer Amount">
                                {amount.toLocaleString("en-US")} {value}
                              </Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </Space>
                      ) : (
                        <Space className="w-full mt-5 font-normal" direction="vertical" size={16}>
                          {/* Make payment step 2: Crypto */}
                          <Card
                            headStyle={{ backgroundColor: "#F8F6F0" }}
                            title={props.name}
                            extra={<Image src={props.logo} height={40} width={80} alt="" objectFit="contain" objectPosition="contain" />}
                          >
                            <Descriptions className="app" column={1}>
                              <Descriptions.Item label="Wallet Address">0x2f05c9fd53e9f87dd383d839daf78ec89ed</Descriptions.Item>
                              <Descriptions.Item label="Network">{network}</Descriptions.Item>
                            </Descriptions>
                            <div className="-mt-5 -mb-3">
                              <Divider className="" />
                            </div>
                            <Descriptions className="app">
                              <Descriptions.Item className="app" label="Transfer Amount">{amount.toLocaleString("en-US")} USDT</Descriptions.Item>
                            </Descriptions>
                          </Card>
                        </Space>
                      )}
                    </div>
                    {/* Make payment step 2 */}
                    <div className="">
                      <div className="title flex space-x-5">
                        <div className="number bg-[#3D9ACC] rounded-full p-2 w-6 h-6 grid place-content-center text-white">3</div>
                        <div className="content"> Complete Your Payment? </div>
                      </div>
                      <Space className="w-full mt-5 font-normal" direction="vertical" size={16}>
                        <Card className="app">
                          <div className="head-conten grid space-y-6">
                            <div>Once your payment is confirmed, your account balance will be increased.</div>
                            {props.name === "crypto" ? (
                              <div>
                                <div className="title mb-2">Transaction ID</div>
                                <Input onChange={(e) => setID(e?.target.value)} placeholder="Enter Transaction ID" />
                              </div>
                            ) : (
                              <></>
                            )}
                            <div>Please just click the button below once you have completed the bank transfer.</div>
                            <div className="button">
                              <div className="cursor-pointer space-x-5">
                                <>
                                  <Button className="app bg-[#625DF5]" onClick={showModal} size="large" type="primary">
                                    I&apos;ve Completed Payment
                                  </Button>
                                  <Modal
                                    footer={null}
                                    className="grid grid-flow-row app"
                                    title={<div className="text-center">Is your payment completely made? </div>}
                                    open={isModalOpen}
                                    onCancel={handleCancel}
                                    width={497}
                                  >
                                    <div className="content px-10 text-justify mb-2 mt-4">
                                      Please be assured that you have completely made your payment before confirm on the button
                                      &quot;I&apos;ve Completed Payment&quot;..
                                    </div>
                                    <div className="flex items-center justify-center space-x-[30px]">
                                      <Button
                                        onClick={handleCancel}
                                        type="primary"
                                        size="large"
                                        className="min-w-28 app bg-[#EFF0FF] text-[#625DF5]"
                                      >
                                        Check Again
                                      </Button>
                                      <Button
                                        onClick={() => {
                                          setVerify(!isVerify);
                                          setIsModalOpen(false);
                                          setCurrent(2);
                                          info();
                                        }}
                                        type="primary"
                                        size="large"
                                        className="min-w-28 app bg-[#625DF5]"
                                      >
                                        Confirm
                                      </Button>
                                    </div>
                                  </Modal>
                                </>
                                <Button
                                  onClick={() => handleCancelDeposit()}
                                  size="large"
                                  type="primary"
                                  className="hover:opacity-80 app"
                                  style={{ backgroundColor: "#EB5757" }}
                                >
                                  Cancel Deposit
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </Space>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
          {/* Step 3: Verify */}

          {isVerify && current === 2 ? (
            <div>
              <div className="title">Your Payment</div>
              {props.name !== "crypto" ? (
                <Space className="w-full mt-5 font-normal app" direction="vertical" size={16}>
                  <Card
                    className="app"
                    headStyle={{ backgroundColor: "#F8F6F0" }}
                    title={props.name}
                    extra={<Image src={props.logo} height={40} width={80} alt="" objectFit="contain" objectPosition="contain" />}
                  >
                    <Descriptions className="app" column={1}>
                      <Descriptions.Item label={`${props.name} Number`}>0000000000000000000000</Descriptions.Item>
                      <Descriptions.Item label={`${props.name} Holder Name`}>NGUYEN QUANG VIET</Descriptions.Item>
                      <Descriptions.Item label="Transfer Note">Pay for deposit {data.depositIdStr}</Descriptions.Item>
                    </Descriptions>
                    <div className="-mt-5 -mb-3">
                      <Divider className="" />
                    </div>
                    <Descriptions className="app">
                      <Descriptions.Item label="Transfer Amount">
                        {amount.toLocaleString("en-US")} {value}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Space>
              ) : (
                <Space className="w-full mt-5 font-normal" direction="vertical" size={16}>
                  <Card
                    className="app"
                    headStyle={{ backgroundColor: "#F8F6F0" }}
                    title={props.name}
                    extra={<Image src={props.logo} height={40} width={80} alt="" objectFit="contain" objectPosition="contain" />}
                  >
                    <Descriptions className="app" column={1}>
                      <Descriptions.Item label="Wallet Address">0x2f05c9fd53e9f87dd383d839daf78ec89ed</Descriptions.Item>
                      <Descriptions.Item label="Network">{network}</Descriptions.Item>
                    </Descriptions>
                    <div className="-mt-5 -mb-3">
                      <Divider className="" />
                    </div>
                    <Descriptions className="app" column={1}>
                      <Descriptions.Item label="Transfer Amount">
                        {amount.toLocaleString("en-US")} {value}
                      </Descriptions.Item>
                      <Descriptions.Item label="Transaction ID">{id}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Space>
              )}
              <div className="button space-x-5 mt-3">
                <Button
                  type="primary"
                  size="large"
                  className="min-w-28 app bg-[#625DF5] text-white"
                  onClick={() => {
                    setCurrent(3);
                  }}
                >
                  Report/Complain of Transaction
                </Button>
                <Button
                  onClick={() => handleCancelDeposit()}
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#EB5757" }}
                  className="app min-w-28 hover:opacity-80 text-white"
                >
                  Cancel Deposit
                </Button>
              </div>
            </div>
          ) : (
            <></>
          )}
          {/* Step 4: complete */}
          {current === 3 && isError && (
            <div>
              <div className="content font-bold">Your Deposit has been Completed!</div>
              <div className="flex items-center space-x-5 mt-6">
                <Button
                  onClick={() => router.push("/app/deposit/my-deposit")}
                  type="primary"
                  size="large"
                  className="min-w-28 bg-[#625DF5]"
                >
                  Check Your Deposit
                </Button>
                <Button type="primary" size="large" className="min-w-28 bg-[#EFF0FF] text-[#625DF5]">
                  Place New Deposit
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Fail */}
          {current === 3 && !isError && (
            <div>
              <div className="content font-bold text-[#EB5757]">Your Payment was Failed! </div>
              <div className="flex items-center space-x-5 mt-6">
                <Button onClick={() => window.location.reload()} type="primary" size="large" className="min-w-28 bg-[#625DF5]">
                  Place New Deposit
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Deposit Detail */}
        {!isOpen ? (
          <div className="ml-5">
            <div className="grid gap-y-5 rounded-[4px] bg-white shadow-[0px-4px-12px] shadow-black/20 p-6">
              <div className="">
                <div className="mb-1">Deposit Amount</div>
                {props.name === "crypto" ? (
                  <Input addonAfter="USDT" value={amount.toLocaleString("en-US")} className="w-full" disabled />
                ) : (
                  <Input addonAfter={value} value={amount.toLocaleString("en-US")} className="w-full" disabled />
                )}
              </div>
              <button className="bg-inherit grid items-center">
                <Image alt="" src="/images/icon/transfer.png" objectFit="contain" objectPosition="contain" width={24} height={24} />
              </button>
              <div className="received">
                <div className="mb-1">Received SF</div>
                <Input addonAfter="SF" value={sofin.toLocaleString("en-US")} disabled />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default DepositForm;
