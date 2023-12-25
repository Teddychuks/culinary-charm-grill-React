import ReactApexChart from "react-apexcharts";
import { useAggregation } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

const QuantityStats = () => {
  const { isFetching, aggregationData } = useAggregation();

  if (isFetching) {
    return <Spinner />;
  }

  const dynamicData = aggregationData?.orderstats.quantitySoldOverTime;

  const chartData = {
    series: [
      {
        name: "Stock",
        data: dynamicData.map((item) => item.totalQuantitySold),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: dynamicData.map((item) => item._id.date),
        type: "logarithmic",
        logarithmicBase: 2,
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return "Stock: " + value;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="px-2 flex font-bold">Total Stock Sold for the Month</h2>
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

export default QuantityStats;
