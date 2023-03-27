import Image from "next/image";
import Link from "next/link";

const AppFooter = () => {
  return <footer className="bg-white md:pt-7 text-white p-5">
    <div className="footer-social md:self-center md:col-start-2 my-10 md:my-0 ">
      <div className="icon flex justify-center gap-7 mt-3 ">
      <a href="" target="/_blank"><Image alt="" src="/images/footer/twitter.png" width={32} height={32} /></a>
      <a href="" target="/_blank"><Image alt="" src="/images/footer/telegram.png" width={32} height={32} /></a>
        <a href="" target="/_blank"><Image alt="" src="/images/footer/discord.png" width={32} height={32} /></a>
      </div>
    </div>
    <div className="footer-copy-right text-[#2B1C50] text-center md:mt-6 md:font-bold md:leading-[28px]  md:text-[18px]">Copyright: ©SOFIN, LLC. All rights reserved.</div>
  </footer>;
};

export default AppFooter;
