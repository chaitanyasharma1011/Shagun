import React from "react";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Chart, ArcElement, Tooltip } from "chart.js";
import { default_color_pallette } from "@/library/helper";
const PieChart = ({
  labels,
  values,
  width = 240,
  height = 240,
  datalabels = "auto",
}) => {
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: default_color_pallette,
        borderColor: default_color_pallette,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        display: datalabels,
        anchor: "center",
        align: "center",
        labels: {
          value: {
            color: "#FFFFFF",
          },
        },
        formatter: function (value, context) {
          return `₹ ${value}`;
        },
      },
    },
  };
  return (
    <div>
      <Pie data={data} options={options} width={width} height={height} />
    </div>
  );
};
export default PieChart;

Chart.register(ArcElement);
Chart.register(ChartDataLabels);
Chart.register(Tooltip);
