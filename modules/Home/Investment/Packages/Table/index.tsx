import React from "react";
import { TableData } from "./TableData";

const Table = () => {
  return (
    <div className="investment-table pt-20 -mx-2 rounded-[23px] md:border-b-[3px] border-b-solid border-b-[#887EE3] w-full ">
      <table className="rounded-[20px] shadow-[0px_4px_10px] shadow-black/20">
        <tr className=" bg-white md:text-[20px] text-[12px]">
          <td className="rounded-tl-[20px] px-[2px] bg-[#887EE333]/20 md:py-6 md:px-8 w-1/3 ">SIP Benefit</td>
          <td className=" bg-[#887EE333]/20 md:py-6 px-[2px] md:px-8 w-1/6 ">Advance</td>
          <td className=" bg-[#887EE333]/20 md:py-6 px-2 md:px-8 w-1/6 ">Premium</td>
          <td className=" bg-[#887EE333]/20 md:py-6 px-2 md:px-8 w-1/6 ">High-class</td>
          <td className=" rounded-tr-[20px] bg-[#887EE333]/20 md:py-6 md:px-8 w-1/6 ">Marvel</td>
        </tr>
        {TableData.map((item, index) => (
          <tr className="bg-white text-[12px] md:text-[16px]" key={index}>
            <td className="md:py-6 md:text-left md:px-8 w-1/3 ">{item.title}</td>
            {item.list.map((list, index) => (
              <td key={index} className="md:w-1/6">
                <p>{list}</p>
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Table;
