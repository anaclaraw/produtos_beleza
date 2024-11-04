import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
const labels = ["January", "February", "March", "April", "May", "June"];
const Infos = {
    labels: labels,
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [0, 10, 5, 2, 20, 30, 45],
        },
    ],
};
const LineChart = ({dataChart}) => {
    return (
        <div>
            <Line data={dataChart} />
        </div>
    );
};
export default LineChart;