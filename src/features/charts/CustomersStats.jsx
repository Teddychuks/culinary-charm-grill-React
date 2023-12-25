import ReactApexChart from "react-apexcharts";
import { useAggregation } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

const colors = [
  "#008FFB",
  "#00E396",
  "#FEB019",
  "#FF4560",
  "#775DD0",
  "#00D9E9",
  "#FF66C3",
  "#D5D5D5",
];

const CustomersStats = () => {
  const { isFetching, aggregationData } = useAggregation();

  if (isFetching) {
    return <Spinner />;
  }

  const dynamicData = aggregationData?.orderstats.userSpendingPatterns;

  const chartData = {
    series: [
      {
        data: dynamicData.map((item) => item.totalSpending),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: { show: false },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: "40%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: dynamicData.map((item) => item._id),
        labels: {
          style: {
            colors: colors,
            fontSize: "12px",
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " sales";
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="px-2 flex font-bold">Top 7 Customers </h2>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default CustomersStats;
