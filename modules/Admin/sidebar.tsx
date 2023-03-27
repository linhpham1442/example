import { Bank, BitcoinConvert, MoneyRecive, ArrangeHorizontalCircle } from "iconsax-react";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const AdminSidebar = (props?: any) => (
  <div className="w-full h-full">
    <Menu
      defaultSelectedKeys={[props.active]}
      className="sidebar title-main bottom-0 top-[56px] space-y-7 md:text-base lg:fixed pt-[60px] md:mr-8 bg-transparent"
      style={{ width: 253, borderInlineEnd: 0 }}
    >
      <Menu.Item key="1">
        <div className="flex space-x-5 items-center">
          <BitcoinConvert size="32" color="#2B1C50" />
          <Link href="/admin/deposit">Deposit</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex space-x-5 items-center">
          <ArrangeHorizontalCircle size="32" color="#2B1C50" />
          <Link href="/admin/withdraw">Withdraw</Link>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="flex space-x-5 items-center">
          <MoneyRecive size="32" color="#2B1C50" />
          <Link href="/admin/investment">Investment</Link>
        </div>
      </Menu.Item>
    </Menu>
  </div>
);

export default AdminSidebar;
