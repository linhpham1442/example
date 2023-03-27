import Link from 'next/link';
import React from "react";

const Button = (props: any) => {
  return (
<button className="button w-fit md:px-[62px] px-8 py-3 md:py-4 md:text-[16px] rounded-full bg-white border-[2px_2px_4px_2px] border-[#887EE3] md:transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:z-10 font-bold text-[#887EE3] duration-300">
 <Link href="/">{props.content}</Link> 
</button>
  );
};
export default Button;  
