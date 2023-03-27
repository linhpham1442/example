import { CardReceive, CardSend, DiscountShape, MoneySend, Wallet } from "iconsax-react";
import { Divider, Menu } from "antd";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const WithdrawSidebar = (props:any) => (
  <div className="font-bold"> 
    <Menu
      defaultSelectedKeys={[props?.active]}
      className="sidebar title-main bottom-0 top-[56px] space-y-7 text-base lg:fixed pt-[60px] mr-8 bg-transparent"
      style={{ width: 253, borderInlineEnd: 0 }}
    >
      <Menu.Item key="1">
        <div className="flex space-x-5 items-center">
        <CardReceive size="32" color="#2B1C50"/>
          <Link href="/app/withdraw">Make Withdraw</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex space-x-5 items-center">
        <DiscountShape size="32" color="#2B1C50"/>
          <Link href="/app/withdraw/my-withdraw">My Withdraw</Link>
        </div>
      </Menu.Item>
    </Menu>
  </div>
);

export default WithdrawSidebar;
