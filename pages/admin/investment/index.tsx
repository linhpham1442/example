import AdminDepositPage from "@/modules/Admin/deposit";
import AdminSidebar from "@/modules/Admin/sidebar";
import AppLayout from "@/modules/App/Layout";
import { ReactElement } from "react";

const InvestmentAdmin = () => {
  return (
    <div className="container h-full mx-auto mt-20 mb-10">
      <div className="mt-12 text-base pr-[6px] grid grid-flow-col lg:grid-cols-5">
        <div className="col-span-1">
          <AdminSidebar active="3" />
        </div>
        developing
      </div>
    </div>
  );
};

InvestmentAdmin.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default InvestmentAdmin;
