import { Avatar, Divider, Popover } from "antd";

import Image from "next/image";
import Link from "next/link";
import { NavbarData } from "./NavbarData";
import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import router from "next/router";
import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/router";
import { useState } from "react";

const AccountMenuContent = () => {
  const { profile, logout } = useAuth();

  return (
    <div className="">
      <div className=" flex items-center">
        <div className="mr-2 cursor-pointer">
          <Link href="/app/profile">
            <Avatar size={50} icon={<UserOutlined />} src={profile.avatar} />
          </Link>
        </div>
        <div>
          <div className="text-base text-[#2B1C50] mb-1 font-semibold">{profile.email}</div>
          <div className="text-sm text-[#6C6684]">{profile.name}</div>
        </div>
      </div>
      <Divider className="mt-4 mb-3" />
      {profile.userRole === "admin" ? (
        <div>
          <div className="text-base text-[#2B1C50] mb-1 font-semibold cursor-pointer">
            <Link href="/admin">Admin</Link>
          </div>
          <Divider className="mt-2 mb-2" />
        </div>
      ) : null}
      <div className="text-base text-[#2B1C50] mb-1 font-semibold cursor-pointer" onClick={logout}>
        Logout
      </div>
    </div>
  );
};

const AppHeader = () => {
  const router = useRouter();
  const { profile } = useAuth();
  // const [navbar, setNavbar] = useState(false);
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="app-header app">
      <div className=" bg-white fixed md:flex text-[#333A6D] pr-4 md:px-4 right-0 left-0 top-0 z-20 flex items-center justify-between">
        <button
          onClick={() => setNavbar(!navbar)}
          className="menu md:hidden px-5 bg-inherit grid"
          data-collapse-toggle="navbar"
          type="button"
          aria-controls="navbar"
          aria-expanded="false"
        >
          {navbar ? (
            <div className=" top-4 z-10 ">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="black">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-white"
              fill="#000000"
              viewBox="0 0 24 24"
              stroke="#000000"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        <div className={`w-screen fixed ${navbar ? "block" : "hidden"}`}>
          <ul className=" mt-12  font-bold bg-white fixed px-5 py-5 h-screen w-2/3 top-0 space-y-8 lg:flex">
            {NavbarData.map((item, index) => (
              <li key={index} className="hover:text-white">
                <Link href={item.href}>
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="cursor-pointer grid h-full md:block md:h-fit w-auto p-0 py-2">
          <Link href="#" className="logo pr-5 lg:pr-0 text-white">
            <a>
              <Image alt="" src="/logo/sofin_logo.png" width={118} height={40} />
            </a>
          </Link>
        </div>
        <ul className="hidden md:flex md:text-base font-bold text-10 space-x-20 h-[60px]">
          {NavbarData.map((item, index) => (
            <li
              key={index}
              className={classNames(
                "relative flex justify-center items-center h-full after:h-[4px] after:bg-[#333A6D] after:w-full after:absolute after:bottom-0 after:rounded-t-[4px] after:opacity-0 hover:after:opacity-100 transition-all",
                {
                  "after:opacity-100": router.pathname.includes(item.href),
                }
              )}
            >
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <div className="py-2 ml-auto md:ml-0 avatar">
          <Popover placement="bottomRight" content={<AccountMenuContent />} arrow={false}>
            <div className="flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-md p-2">
              <Avatar icon={<UserOutlined />} src={profile.avatar} className="mr-2" />
              <div className="text-sm text-[#6C6684]">{profile.name}</div>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
