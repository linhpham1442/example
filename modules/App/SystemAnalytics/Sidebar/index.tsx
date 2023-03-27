import { Cards, Courthouse, EmojiHappy, Microscope, Monitor, Share, Shop } from "iconsax-react";
import { Divider, Menu } from "antd";

import React from "react";

const SystemAnalyticsSidebar = () => (
  <div className="">
    <Menu
      defaultSelectedKeys={["1"]}
      className="sidebar text-[#2B1C50] lg:w-fit title-main bottom-0 top-[56px] space-y-7 md:text-base lg:fixed pt-[60px] lg:mr-8 bg-transparent"
      style={{ width: 253, borderInlineEnd: 0 }}
    >
        <Menu.Item key="0">
        <div className="flex space-x-5 items-center">
        <Cards size="32" color="#2B1C50"/>
          <a href="#Deposit&Treasury">Deposit & Treasury</a>
        </div>
      </Menu.Item>
      <Menu.Item key="1">
        <div className="flex space-x-5 items-center">
          <Monitor size="32" color="#2B1C50" />
          <a href="#Overview">Overview</a>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="flex space-x-5  items-center">
          <Share size="32" color="#2B1C50" />
          <a href="#ResourceAllocation">Resource Allocation</a>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div className="flex space-x-5  items-center">
          <Microscope size="32" color="#2B1C50" />
          <a href="#TrafficSource">Traffic Source</a>
        </div>
      </Menu.Item>
      <Menu.Item key="4">
        <div className="flex space-x-5  items-center">
          <Courthouse size="32" color="#2B1C50" />
          <a href="#Geography">Geography</a>
        </div>
      </Menu.Item>
      <Menu.Item key="5">
        <div className="flex space-x-5  items-center">
          <EmojiHappy size="32" color="#2B1C50" />
          <a href="#Age&Gender">Age & Gender</a>
        </div>
      </Menu.Item>
      <Divider className="bg-[#D9D9D9]" />
      <Menu.Item key="6">
        <div className="flex space-x-5  items-center">
          <Shop size="32" color="#2B1C50" />
          <a href="#HardwareWarehouse">Hardware Warehouse</a>
        </div>
      </Menu.Item>
    </Menu>
  </div>
);

export default SystemAnalyticsSidebar;
