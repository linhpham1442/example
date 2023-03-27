import React, { ReactElement } from 'react'

import AppLayout from '@/modules/App/Layout';
import MyWithdraw from '@/modules/App/Withdraw/MyWithdraw';
import WithdrawSidebar from '@/modules/App/Withdraw/Sidebar';

const MyWithdrawPage = () => {
  return (
    <div className="mt-12 text-base pr-[60px] grid grid-flow-col lg:grid-cols-5">
    <div className="col-span-1">
      <WithdrawSidebar active="2" />
    </div>
    <div className="item col-span-4 lg:grid-cols-3 grid-flow-col py-[60px] px-8 gap-10">
      <MyWithdraw />
      <div className="bank-form mt-5 lg:col-span-3 lg:col-start-1">
      </div>
    </div>
  </div>
  )
}
MyWithdrawPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;


export default MyWithdrawPage