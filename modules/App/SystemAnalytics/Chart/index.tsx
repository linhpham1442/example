import React from "react";

const Chart = (props: any) => {
  return (
    <div className=" bg-white text-base  p-6 rounded-[10px] shadow-[0px_4px_12px] shadow-black/20">
      <div className="title-main mb-2">{props.title}</div>
      <div id={props.id} className="chart ">
        {props.chart}
      </div>
    </div>
  );
};

export default Chart;
