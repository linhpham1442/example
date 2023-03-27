import { CardSend, DiscountShape, MoneySend, Wallet } from "iconsax-react";
import { Divider, Menu } from "antd";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const InvestmentSidebar = (props:any) => (
  <div className="font-bold"> 
    <Menu
      defaultSelectedKeys={[props?.active]}
      className="sidebar title-main bottom-0 top-[56px] space-y-7 text-base lg:fixed pt-[60px] mr-8 bg-transparent"
      style={{ width: 253, borderInlineEnd: 0 }}
    >
      <Menu.Item key="1">
        <div className="flex space-x-5 items-center">
        <CardSend size="32" color="#2B1C50"/>
          <Link href="/app/investment">Make Investment</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex space-x-5 items-center">
        <DiscountShape size="32" color="#2B1C50"/>
          <Link href="/app/investment/me">My Investment</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="flex space-x-5 items-center">
        <Wallet size="32" color="#2B1C50"/>
          <Link href="/app/investment/my-hardware">My Hardware</Link>
        </div>
      </Menu.Item>
    </Menu>
  </div>
);

export default InvestmentSidebar;
