import React, { memo } from "react";

import Image from "next/image";
import Navbar from "./Navbar";

interface HeaderProps {
  isShowToggleTheme: boolean;
}
const Header: React.FC<HeaderProps> = ({ isShowToggleTheme = true }) => {
  return (
    <header className=" bg-gradient-to-b from-[#D1CDFB] to-[#A9DFFC] w-full mx-auto pb-5 grid">
      <Navbar isShowToggleTheme={isShowToggleTheme}  />
      <div className="header-title leading-[32px] md:mt-[145px] md:text-center text-[32px] font-black text-center mb-5 md:mb-9 md:text-[72px] drop-shadow-[0px_5px_1px_#8AB0F9] mt-20  text-white md:leading-[48px]">
        SOFIN TOOL
      </div>
      <div className="main-content md:text-[16px] font-bold md:px-[380px] px-10 text-center text-[10px] leading-[16px] md:leading-[24px] text-white">
        As the first product of SOFIN HUB, SOFIN Tool applies AI and web3 technology, giving profit-maximizing solutions and bringing
        sustainable revenue from Social Platforms to content creators, viewers and even potential investors in the digital content market.
      </div>
      <div className="relative md:-mt-24 -mt-10">
        <Image objectFit="cover" objectPosition="top" alt="" width={2000} height={881} src="/images/header.png" />
      </div>
    </header>
  );
};

export default memo(Header);
