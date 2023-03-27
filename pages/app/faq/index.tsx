import AppLayout from "@/modules/App/Layout";
import { ReactElement } from "react";

const FAQ = () => {
  return <div>FAQ</div>;
};

FAQ.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default FAQ;
