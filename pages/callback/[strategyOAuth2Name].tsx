import useCallbackOAuth2, { strategyName } from "@/common/hooks/useCallbackOAuth2";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useRouter } from "next/router";

export interface IGoogleCallbackPageProps {}

function GoogleCallbackPage(props: IGoogleCallbackPageProps) {
  const { query } = useRouter();
  const { strategyOAuth2Name = "" } = query;

  useCallbackOAuth2(strategyOAuth2Name as strategyName);
  return (
    <div className="min-h-[400px]">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    </div>
  );
}

export default GoogleCallbackPage;
