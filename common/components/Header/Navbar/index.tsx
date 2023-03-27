import React, { memo, useState } from "react";

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { NavbarData } from "./NavbarData";

interface NavBarProps {
  isShowToggleTheme: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isShowToggleTheme = true }) => {
  const [navbar, setNavbar] = useState(false);

  return (
    <div className="w-full mx-auto">
      <nav className=" md:py-5 bg-[#D1CDFB] fixed text-[#333A6D] lg:py-9 py-2 px-4  lg:px-[60px] md:h-24 h-16 right-0 left-0 z-20 flex items-center justify-between">
        <div className="cursor-pointer flex py-2 md:h-fit items-center">
          <Link href="/" className="logo pr-5 lg:pr-0 text-white">
            <Image alt="" src="/svg/logo.svg" width={55} height={65} objectFit="cover" objectPosition="cover" />
          </Link>
        </div>
        <ul className="hidden mb-0 md:flex md:mx-auto md:text-[16px] font-bold text-10 space-x-7">
          {NavbarData.map((item, index) => (
            <li key={index} className="hover:text-white cursor-pointer">
              <Link href={item.href}>
                <div>{item.name}</div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="authen hidden sm:flex space-x-3">
          <Link href="/app">
            <a>
              <div className="login md:transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:z-10  duration-300  cursor-pointer py-2 px-6 bg-[#333A6D] rounded-[4px] text-[16px] font-semibold text-white w-28 text-center">
                Launch
              </div>
            </a>
          </Link>
        </div>
        <button
            onClick={() => setNavbar(!navbar)}
            className="menu md:hidden pr-5 bg-inherit ml-auto grid"
            data-collapse-toggle="navbar"
            type="button"
            aria-controls="navbar"
            aria-expanded="false"
          >
            {navbar ? (
              <div className="absolute top-4 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
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
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        <div className={`w-screen fixed ${navbar ? "block" : "hidden"}`}>
          <ul className="bg-gradient-to-b mt-10  font-bold from-[#D1CDFB] to-[#A9DFFC] fixed px-5 py-5 h-screen bg-white w-screen top-0 left-1/3 space-y-8 lg:flex">
            {NavbarData.map((item, index) => (
              <li key={index} className="hover:text-white">
                <Link href={item.href}>
                  <a>{item.name}</a>
                </Link>
              </li>
            ))}
            <div>
              <div className="authen flex space-x-3">
                <Link href="/app">
                  <a>
                    <div className="login md:transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:z-10  duration-300  cursor-pointer py-2 px-6 bg-[#333A6D] rounded-[4px] text-[16px] font-semibold text-white w-28 text-center">
                      Launch
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default memo(NavBar);
