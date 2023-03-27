import { Progress } from "antd";
import { generateDecreaseOpacityPalette } from "@/common/utils";

interface AnalysticsProps {
  data: any[];
}

const Analystics = ({ data }: AnalysticsProps) => {
  data = data.reduce((result, item) => {
    if (+item.value < 1) {
      const otherIndex = result.findIndex((item: any) => item.title === "Others");
      if (otherIndex !== -1) {
        result[otherIndex].value += +item.value;
        return result;
      }

      return [
        ...result,
        {
          title: "Others",
          value: +item.value,
        },
      ];
    }
    return [...result, item];
  }, []);
  const COLORS = generateDecreaseOpacityPalette("#6A51A3", data.length);

  return (
    <div className="app-overview-analytics-traffic-source title-main">
      {data.map((item, index) => (
        <div key={index} className="grid gap-4 grid-cols-3">
          <div>{item.title}</div>
          <div className="col-span-2">
            <Progress className="text-base title-main" percent={item.value} strokeColor={COLORS[index]} trailColor="#FFFFFF" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Analystics;
