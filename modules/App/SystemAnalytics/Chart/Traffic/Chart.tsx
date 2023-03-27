import { generateDecreaseOpacityPalette } from "@/common/utils";
import React from "react";
import { PieChart, Pie, Cell } from "recharts";

interface ChartProps {
  data: any[];
}
const Chart = ({ data = [] }: ChartProps) => {
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
    <div>
      <PieChart width={320} height={320}>
        <Pie data={data} cx="50%" cy="50%" innerRadius={110} outerRadius={150} fill="#8884d8" paddingAngle={5} dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Chart;
