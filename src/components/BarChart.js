import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ ndata, labels, title, bgColor }) => {
  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    responsive: true,
    plugins: {
      legend: false,
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: ndata,
        backgroundColor: bgColor,
        borderColor: bgColor,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
