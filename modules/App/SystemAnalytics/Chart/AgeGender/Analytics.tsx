import { Progress } from "antd";

interface AnalysticsProps {
  data: any[];
}

const Analystics = ({ data }: AnalysticsProps) => {
  return (
    <div className="app-overview-analytics-audience">
      {data.map((item, index) => (
        <div key={index} className="grid gap-4 grid-cols-3">
          <div className="title-main">{item.title}</div>
          <div className="col-span-2">
            <Progress className="text-base title-main" percent={item.value} strokeColor="#6A51A3" trailColor="#FFFFFF" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analystics;
