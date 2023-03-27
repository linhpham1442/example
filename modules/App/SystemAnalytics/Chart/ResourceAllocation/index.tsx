import React, { useEffect, useState } from "react";
import { getAccountHistory, getClientHistory, getProxyHistory, getVideoHistory } from "@/common/api/history";

import AccountChart from "./Chart/AccountsChart";
import AccountsTable from "./Table/AccountsTable";
import AnalysticsAllocation from "./AnalysticsAllocation";
import ClientsChart from "./Chart/ClientsChart";
import ClientsTable from "./Table/ClientsTable";
import ProxiesChart from "./Chart/ProxiesChart";
import ProxiesTable from "./Table/ProxiesTable";
import { Segmented } from "antd";
import VideosChart from "./Chart/VideosChart";
import VideosTable from "./Table/VideosTable";
import { handleApi } from "@/common/utils";

const ResourceAllocation = () => {
  const [dateType, setDateType] = useState("FOUR_WEEKS");
  const [activeTab, setActiveTab] = useState(0);
  const [isChart, setChart] = useState(true);
  const [analysticsData, setAnalysticsData] = useState([]);
  const handleActiveTab = (tab: number) => {
    setActiveTab(tab);
  };

  const fetchTotalHistory = async () => {
    try {
      let data_account = {},
        data_client = {},
        data_proxy = {},
        data_video = {};
      let accountHistory = await handleApi(getAccountHistory(null, null, 1));
      if (accountHistory?.data?.data) {
        const { total_accounts, total_have_profiles, total_error_accounts } = accountHistory?.data?.data.data[0];
        data_account = {
          title: "Accounts",
          content: [
            { title: "Total accounts:", content: total_accounts.toLocaleString() },
            { title: "Total have profiles:", content: total_have_profiles.toLocaleString() },
            { title: "Total error accounts:", content: total_error_accounts.toLocaleString() },
          ],
        };
      }
      let clientHistory = await handleApi(getClientHistory(null, null, 1));
      if (clientHistory?.data?.data) {
        const { total_clients, total_usage_clients, total_available_profiles } = clientHistory?.data?.data.data[0];
        data_client = {
          title: "Clients",
          content: [
            { title: "Total clients:", content: total_clients.toLocaleString() },
            { title: "Total used clients:", content: total_usage_clients.toLocaleString() },
            { title: "Total available profiles:", content: total_available_profiles.toLocaleString() },
          ],
        };
      }
      let proxyHistory = await handleApi(getProxyHistory(null, null, 1));
      if (proxyHistory?.data?.data) {
        const { total_proxies, total_usage_proxies, total_available_proxies, total_dead_proxies } = proxyHistory?.data?.data.data[0];
        data_proxy = {
          title: "Proxies",
          content: [
            { title: "Total proxies:", content: total_proxies.toLocaleString() },
            { title: "Total used proxies:", content: total_usage_proxies.toLocaleString() },
            { title: "Total available proxies:", content: total_available_proxies.toLocaleString() },
            { title: "Total dead proxies:", content: total_dead_proxies.toLocaleString() },
          ],
        };
      }
      let videoHistory = await handleApi(getVideoHistory(null, null, 1));
      if (videoHistory?.data?.data) {
        const { total_videos, total_usage_videos, total_available_videos, total_dead_videos } = videoHistory?.data?.data.data[0];
        data_video = {
          title: "Videos",
          content: [
            { title: "Total videos:", content: total_videos.toLocaleString() },
            { title: "Total used videos:", content: total_usage_videos.toLocaleString() },
            { title: "Total available videos:", content: total_available_videos.toLocaleString() },
            { title: "Total dead videos:", content: total_dead_videos.toLocaleString() },
          ],
        };
      }
      setAnalysticsData([data_client, data_account, data_proxy, data_video]);
    } catch (error) {
      console.log("error");
      setAnalysticsData([]);
    }
  };

  useEffect(() => {
    fetchTotalHistory();
  }, []);

  const handleChangeDateType = (dateType: string) => {
    setDateType(dateType);
  };

  return (
    <div className="allocation">
      <div className="analystics">
        <AnalysticsAllocation onChangeActiveTab={handleActiveTab} activeTab={activeTab} analysticsData={analysticsData} />
      </div>
      <div>
        <div className="chart-allocation flex items-center space-x-3">
          <p className="text-base title-main">View as</p>
          <Segmented onChange={() => setChart(!isChart)} className="rounded-[20px] text-white text-xs" options={["Chart", "Table"]} />
        </div>
        {activeTab === 0 ? (
          <div>{!isChart ? <ClientsTable /> : <ClientsChart onChangeTypeDate={handleChangeDateType} dateType={dateType} />}</div>
        ) : (
          <></>
        )}
        {activeTab === 1 ? (
          <div>{!isChart ? <AccountsTable /> : <AccountChart onChangeTypeDate={handleChangeDateType} dateType={dateType} />}</div>
        ) : (
          <></>
        )}
        {activeTab === 2 ? (
          <div>{!isChart ? <ProxiesTable /> : <ProxiesChart onChangeTypeDate={handleChangeDateType} dateType={dateType} />}</div>
        ) : (
          <></>
        )}
        {activeTab === 3 ? (
          <div>{!isChart ? <VideosTable /> : <VideosChart onChangeTypeDate={handleChangeDateType} dateType={dateType} />}</div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ResourceAllocation;
