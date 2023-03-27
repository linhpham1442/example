// import { useAppDispatch, useAppSelector } from "@/common/redux/hooks";
// import { fetchAllAbi } from "@/common/redux/slices/abiSlice";

import React, { useEffect } from "react";

import Footer from "../Footer";
import Navbar from "../Header/Navbar";

// import { useMoralis } from "react-moralis";
// import Footer from "../Footer";
// import Header from "../Header";
// import { Loader } from "@mantine/core";
// import { fetchAllEnvironment } from "@/common/redux/slices/envSlice";
// import SideBar from "../SideBar";
// import { useRouter } from "next/router";
// import { Sidebar } from "../Sidebar";
// import { useAuth } from "@/common/hooks/useAuth";
// import types from "@/common/redux/types";
// import { useAppDispatch, useAppSelector } from "@/common/redux/hooks";
// import { selectValue } from "@/common/redux/utils";
// import { fetchData } from "@/common/redux/actions/fetchAction";
// import { getAllAbi, getCategories, getNetworks } from "@/common/api/metaData";
// import { Spin } from "antd";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  // const router = useRouter();
  // const { data: dataAbis, loading } = useAppSelector(selectValue(types.listAbis));
  // const { data: environment, loading: loadingEnv } = useAppSelector(selectValue(types.inputNetwork));
  // const { isInitial } = useAuth();
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (isInitial) {
  //     dispatch(fetchData(types.listAbis, getAllAbi(true)));
  //     dispatch(fetchData(types.inputNetwork, getNetworks(true)));
  //     dispatch(fetchData(types.inputCategory, getCategories("", true)));
  //   }
  // }, [isInitial, dispatch]);

  // if ((loading || loadingEnv || !isInitial) && window.ethereum) {
  //   return (
  //     <div className="relative flex items-center justify-center w-screen h-screen">
  //       <Spin className="z-[9999] relative" />
  //     </div>
  //   );
  // }

  // const notIncludeSidebar = ["/", "/bounty-task/create", "/top-tasks", "/callback/[strategyOAuth2Name]"].includes(router.pathname);
  return (
    <div className="layout-container">
    <Navbar isShowToggleTheme={false} />
      <div className="flex min-h-screen bg-white">
        {/* {!notIncludeSidebar ? <Sidebar /> : null} */}
        <div className="block w-full">
          {/* <Header isShowToggleTheme={false} /> */}
          <div>{children}</div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;
