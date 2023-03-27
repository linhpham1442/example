import { Bank, BitcoinConvert, MoneyRecive } from "iconsax-react";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const DepositSidebar = (props?:any) => (
  <div className="w-full h-full">
    <Menu
      defaultSelectedKeys={[props.active]}
      className="sidebar title-main bottom-0 top-[56px] space-y-7 md:text-base lg:fixed pt-[60px] md:mr-8 bg-transparent"
      style={{ width: 253, borderInlineEnd: 0 }}
    >
      {/* <Menu.Item key="1">
        <div className="flex space-x-5 items-center">
        <Bank size="32" color="#2B1C50"/>
          <Link href="/app/deposit/bank">Bank Transfer</Link>
        </div>
      </Menu.Item> */}
     {/* <Menu.Item key="2">
        <div className="flex space-x-5 items-center">
          <Image objectFit="contain" objectPosition="contain" alt="" src="/images/logo/momo.png" width={32} height={32} />
          <Link href="/app/deposit/momo">MoMo</Link>
        </div>
</Menu.Item> */}
      <Menu.Item key="3">
        <div className="flex space-x-5 items-center">
        <BitcoinConvert size="32" color="#2B1C50"/>
          <Link href="/app/deposit">Crypto</Link>
        </div>
      </Menu.Item>
      <Divider className="bg-[#D9D9D9]" />
      <Menu.Item key="4">
        <div className="flex space-x-5 items-center">
        <MoneyRecive size="32" color="#2B1C50"/>
          <Link href="/app/deposit/my-deposit">My Deposit</Link>
        </div>
      </Menu.Item>
    </Menu>
  </div>
);

export default DepositSidebar;
