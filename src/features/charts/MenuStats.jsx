import ReactApexChart from "react-apexcharts";
import { useMenuStats } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

const MenuStats = () => {
  const { isFetching, menuStatsDataInfo } = useMenuStats();

  if (isFetching) {
    return <Spinner />;
  }

  if (
    !menuStatsDataInfo ||
    !menuStatsDataInfo.data ||
    !menuStatsDataInfo.data.statistics.length
  ) {
    return null;
  }

  const categories = menuStatsDataInfo.data.statistics.map((item) => item._id);
  const series = [
    {
      name: "Number of Ratings",
      data: menuStatsDataInfo.data.statistics.map((item) => item.numRating),
    },
    {
      name: "Minimum Price",
      data: menuStatsDataInfo.data.statistics.map((item) => item.minPrice),
    },
    {
      name: "Maximum Price",
      data: menuStatsDataInfo.data.statistics.map((item) => item.maxPrice),
    },
    {
      name: "Average Rating",
      data: menuStatsDataInfo.data.statistics.map((item) => item.avgRating),
    },
    {
      name: "Average Price",
      data: menuStatsDataInfo.data.statistics.map((item) => item.avgPrice),
    },
  ];

  const updatedOptions = {
    chart: {
      height: 350,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", endingShape: "rounded" },
    },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ["transparent"] },
    xaxis: {
      categories: categories,
      labels: { style: { fontSize: "15px" } },
    },
    yaxis: {
      title: { text: "Values", style: { fontSize: "16px" } },
      labels: { style: { fontSize: "14px" } },
      logarithmic: true,
      min: 0.3,
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div>
      <h2 className="flex font-bold">Menu Statistics</h2>
      <div id="chart" className="">
        <ReactApexChart
          options={updatedOptions}
          series={series}
          type="bar"
          height={287}
        />
      </div>
    </div>
  );
};

export default MenuStats;
