import { Card, Divider, Space } from "antd";
import React, { useState } from "react";

import classNames from "classnames";

interface AnalyticProps {
  onChangeActiveTab: (activeTab: number) => void;
  activeTab: number;
  analysticsData: Array<any>;
}

const AnalysticsAllocation = ({ onChangeActiveTab, activeTab, analysticsData}: AnalyticProps) => {

  return (
    <div className="grid grid-cols-4 space-x-5 text-sm">
      {analysticsData?.map((item: any, index: number) => (
        <div
          key={index}
          onClick={() => onChangeActiveTab(index)}
          className={classNames("card cursor-pointer mt-5 mb-10 border-[#D8D4E8] rounded-[4px] text-sm border-solid border-[1px] p-3", {
            "bg-[#EFF0FF]": activeTab === index,
          })}
        >
          <div className="card-title title-main">{item.title}</div>
          <Divider className="my-3" />
          <div className="space-y-3">
            {item.content?.map((list: any, index: number) => (
              <div key={index} className="card-content flex justify-between ">
                <div className="title text-[#6C6684]">{list.title}</div>
                <div className="detail text-[#2B1C50]">{list.content}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalysticsAllocation;
