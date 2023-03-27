import Footer from "@/common/components/Footer";
import Header from "@/common/components/Header";
import Home from "@/modules/Home";
import type { NextPage } from "next";

const Main: NextPage = () => {
  return (
    <div style={{ minHeight: 400 }} className="bg-primary-blue">
      <Header isShowToggleTheme={false} />
      <Home /> 
    </div>
  );
};

export default Main;
