import React, { useEffect, useState, useContext } from "react";

import { getMeProfile } from "@/common/api/user";
import { handleApi } from "@/common/utils";
import { AuthContext } from "@/common/hooks/useAuth";

const StatusSofin = () => {
  const [balance, setBalance] = useState(0);
  const [invested, setInvested] = useState(0);
  const { state, dispatch } = useContext(AuthContext);

  return (
    <div className="grid app grid-flow-col w-max lg:w-full lg:grid-cols-2 space-x-8">
      <div className="invested bg-[#E3F3FF] grid grid-rows-2 gap-y-2  shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] px-5 py-4">
        <div className="title text-sm text-[#6C6684]">Your Available SF</div>
        <div className="SOFIN title-app text-xl text-[#3D9ACC]">{state.profile.sfBalance} SF</div>
      </div>
      <div className="invested bg-[#E3F3FF] grid grid-rows-2 gap-y-2  shadow-[0px_4px_12px] shadow-black/20 rounded-[4px] px-5 py-4">
        <div className="title text-sm text-[#6C6684]">Your Invested SF</div>
        <div className="SOFIN title-app text-xl text-[#3D9ACC]">{invested} SF</div>
      </div>
    </div>
  );
};

export default StatusSofin;
