import React from "react";

import "chartjs-plugin-doughnutlabel";
import { Doughnut } from "react-chartjs-2";
// import { Data } from "./GraphData";

const Graph = () => {
  // // numbers
  const coopTime = 760.5; // data require (working time)
  const totalCoopTime = 960.0; // data require (duration 960 || 480 || ???)
  const remainTime = totalCoopTime - coopTime;
  const coopPercent = Math.round((coopTime / totalCoopTime) * 100 * 10) / 10;
  const remainPercent =
    Math.round((remainTime / totalCoopTime) * 100 * 10) / 10;

  // // colors
  const blue500 = "#3B82F6";
  const gray200 = "#E5E7EB";
  const gray100 = "#F3F4F6";

  // data
  const data = {
    datasets: [
      {
        data: [coopPercent, remainPercent],
        backgroundColor: [blue500, gray200],
        // hoverBackgroundColor: ["#36A2EB", "#FF6384"],
        borderColor: ["transparent", "transparent"],
      },
    ],
    labels: ["Done", "Remain"],
  };

  // options
  const options = {
    cutoutPercentage: 70,
    // responsive: true,
    // maintainAspectRatio: true,
    legend: {
      display: false,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: `${coopPercent} %`,
            color: gray100,
            font: {
              size: 32,
            },
          },
          {
            text: `${coopTime} hrs`,
            color: gray100,
            font: {
              size: 20,
            },
          },
        ],
      },
    },
  };

  return (
    <div className="w-full border">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Graph;
