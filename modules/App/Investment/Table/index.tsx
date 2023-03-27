import React, { useEffect, useState } from "react";

import { getInvestmentPackage } from "@/common/api/investment";

export const Title = [{ titlex: ["Benefit", "Class I"] }, { titley: ["Profit rate (%)", "Profit rate (%)"] }];

const InvestmentTable = () => {
  const [listPackage, setListPackage] = useState([]);
  const fetchInvestmentPackage = async () => {
    const { data } = await getInvestmentPackage();
    if (data) {
      setListPackage(data?.data?.data);
      console.log(data);
    }
  };
  useEffect(() => {
    fetchInvestmentPackage();
  }, []);
  return (
    <div>
      <table className="table-auto w-full text-center">
        <thead className="bg-[#EFF0FF]">
          <tr>
            <th className="text-left py-6 px-5 w-[30%]">BENEFIT</th>
            {listPackage.map((item, index) => (
              <th key={item.packageId}>
                {item.packageId === 0 ? (
                  <div> Class I</div>
                ) : item.packageId === 1 ? (
                  <div> Class II</div>
                ) : item.packageId === 2 ? (
                  <div> Class III</div>
                ) : (
                  <div> Class IV</div>
                )}
                <div className="font-normal">
                  {item.amount} USDT = {item.amount}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left font-bold px-5 py-6">Profit share (%)</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.interest * 100}%</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Profit (SOFIN)</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.interest * item.amount} SF/month</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Investment insurance</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.minTime} months</td>
            ))}
          </tr>
        </tbody>

        <thead className="bg-[#EFF0FF]">
          <tr>
            <th className="text-left py-6  px-5">WITHDRAWAL FEE/INVESTMENT</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left font-bold px-5 py-6">7th Month</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.withdrawFee.sevenMonth * 100}%</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">8th Month</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.withdrawFee.eightMonth === 0.07 ? "7%" : <div>{item.withdrawFee.eightMonth * 100}%</div>}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">9th Month</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.withdrawFee.nineMonth * 100}%</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">10th Month</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.withdrawFee.tenMonth * 100}%</td>
            ))}
          </tr>
        </tbody>

        <thead className="bg-[#EFF0FF]">
          <tr>
            <th className="text-left py-6  px-5">OTHER BENEFITS</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left font-bold px-5 py-6">Transactions fee - OTC</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.OTCFeeDiscount === 1 ? <div>Free</div> : <div>Discount {item.OTCFeeDiscount * 100}%</div>}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Mining SF to SOFIN</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.miningRate}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Right to convert to Shares</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.isConvertShare === true ? "YES" : "NO"}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Right on voting on activities of proposal</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.isVoting === true ? "YES" : "NO"}</td>
            ))}
          </tr>
        </tbody>

        <thead className="bg-[#EFF0FF]">
          <tr>
            <th className="text-left py-6  px-5">RESOURCES</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-left font-bold px-5 py-6">Servers</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.amount / 1000}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Proxies</td>
            {listPackage.map((item, index) => (
              <td key={index}>{(item.amount*480) / 1000}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Accounts</td>
            {listPackage.map((item, index) => (
              <td key={index}>{(item.amount*480) / 1000}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Threads</td>
            {listPackage.map((item, index) => (
              <td key={index}>{(item.amount*480) / 1000}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Contents - Videos</td>
            {listPackage.map((item, index) => (
              <td key={index}>{item.amount*4}</td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Software</td>
            {listPackage.map((item, index) => (
              <td key={index}>
                {(item.packageId === 0) || (item.packageId === 1) ? (<div>6 months free</div>) : (<div>Free</div>)}
                </td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">Swap fees</td>
            {listPackage.map((item, index) => (
              <td key={index}>
                {(item.packageId === 0) || (item.packageId === 1) ? (<div>6 months free</div>) : (<div>Free</div>)}
                </td>
            ))}
          </tr>
          <tr>
            <td className="text-left font-bold px-5 py-6">System maintenance fee</td>
            {listPackage.map((item, index) => (
              <td key={index}>
                12 months free
                </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvestmentTable;
