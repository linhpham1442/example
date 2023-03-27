import { ReactElement, useEffect } from "react";

import AppLayout from "@/modules/App/Layout";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useAuth } from "@/common/hooks/useAuth";
import { useRouter } from "next/router";

const App = () => {
  const { isAuthenticated, isInitial } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isInitial && isAuthenticated) {
      router.push("/app/system-analytics");
    }
  }, [router, isInitial, isAuthenticated]);

  return <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />;
};

App.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default App;
