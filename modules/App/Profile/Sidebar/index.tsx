import { Bank, BitcoinConvert, MoneyRecive, UserSquare } from "iconsax-react";
import { Divider, Menu, Switch } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const ProfileSidebar = (props?:any) => (
  <div className="w-full h-full">
    <Menu
      defaultSelectedKeys={[props.active]}
      className="sidebar title-main bottom-0 top-[56px] space-y-7 md:text-base lg:fixed pt-[60px] md:mr-8 bg-transparent"
      style={{ width: 253, borderInlineEnd: 0 }}
    >
      <Menu.Item key="1">
        <div className="flex space-x-5 items-center">
        <UserSquare size="32" color="#2B1C50"/>
          <Link href="/app/deposit/my-deposit">Account Information</Link>
        </div>
      </Menu.Item>
    </Menu>
  </div>
);

export default ProfileSidebar;
