import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
const data = {
  labels: [
    "Web Developer",
    "Mobile Developer",
    "Data Anaylst",
    "UI/UX Developer",
  ],
  datasets: [
    {
      label: "Title",
      data: [12, 19, 4, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

function DoughnutChart() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', height: '500px'}}>
      <Pie data={data} />
      <Doughnut data={data} />
    </div>
  );
}

export default DoughnutChart;
