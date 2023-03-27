import { Button, Input } from "antd";
import React, { useEffect, useState } from "react";

import { InvestmentCard } from "@/modules/App/Investment/MakeInvestment";
import InvestmentModal from "@/modules/App/Investment/Modal";
import { LeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { MakeInvestmentData } from "@/modules/App/Investment/MakeInvestment/MakeInvestmentData";
import { useRouter } from "next/router";

const Treasury = () => {
  const [data, setData] = useState(MakeInvestmentData);
  const [currentItem, setCurrentItem] = useState(null);
  const [showInputInvestment, setShowInputInvestment] = useState(false);
  const router = useRouter();
  const slug = router.query.id as string;

  useEffect(() => {
    if (slug) {
      setData(MakeInvestmentData.filter((x) => x.link !== slug));
      setCurrentItem(MakeInvestmentData.find((x) => x.link === slug));
    } else {
      setData(MakeInvestmentData);
    }
  }, [slug]);

  return (
    <>
      <div className="grid lg:grid-cols-3 grid-flow-col gap-x-6">
        {data
          .filter((x) => x.link !== slug)
          .map((item, index) => (
            <div key={index}>
              <InvestmentCard item={item} slug={slug} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Treasury;
