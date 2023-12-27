import ReactApexChart from "react-apexcharts";
import { useMenuStats } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

const Chart = () => {
  const { isFetching, menuStatsDataInfo } = useMenuStats();

  if (isFetching) {
    return <Spinner />;
  }

  const newData = menuStatsDataInfo?.data?.statistics;

  const chartData = {
    series: [
      {
        name: "Number of Ratings",
        type: "column",
        data: newData.map((item) => item.numRating),
      },
      {
        name: "Minimum Price",
        type: "area",
        data: newData.map((item) => item.minPrice),
      },
      {
        name: "Maximum Price",
        type: "line",
        data: newData.map((item) => item.maxPrice),
      },
      {
        name: "Average Rating",
        type: "line",
        data: newData.map((item) => item.avgRating),
      },
      {
        name: "Average Price",
        type: "line",
        data: newData.map((item) => item.avgPrice),
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        toolbar: {
          autoSelected: "zoom",
          tools: {
            download: false,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true,
          },
        },
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },
      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: newData.map((item) => item._id),
      markers: {
        size: 0,
      },
      xaxis: {
        type: "category",
      },
      yaxis: {
        title: {
          text: "Values",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(2);
            }
            return y;
          },
        },
      },
    },
  };

  return (
    <div>
      <h2 className="px-2 flex font-bold">Menu Statistics</h2>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="line"
          height={350}
        />
      </div>
    </div>
  );
};

export default Chart;
