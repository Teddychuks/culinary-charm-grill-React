import ReactApexChart from "react-apexcharts";
import { useAggregation } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

const PopularMenuStats = () => {
  const { isFetching, aggregationData } = useAggregation();

  if (isFetching) {
    return <Spinner />;
  }

  const dynamicData = aggregationData?.orderstats.popularMenuItems;

  const chartData = {
    series: dynamicData
      ? dynamicData.map((item) => item.totalQuantitySold)
      : [],
    options: {
      chart: {
        width: "100%",
        height: 350,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#FFD700", "#FF6347"],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      legend: {
        formatter: function (_, opts) {
          const itemName = dynamicData[opts.seriesIndex]?.name || "";
          return itemName + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <div>
      <h2 className="px-2 flex font-bold">Popular Menu Items</h2>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          width={chartData.options.chart.width}
          height={chartData.options.chart.height}
        />
      </div>
    </div>
  );
};

export default PopularMenuStats;
