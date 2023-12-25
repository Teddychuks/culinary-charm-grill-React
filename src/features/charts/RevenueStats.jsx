import ReactApexChart from "react-apexcharts";
import { useAggregation } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

const RevenueStats = () => {
  const { isFetching, aggregationData } = useAggregation();

  if (isFetching) {
    return <Spinner />;
  }

  const dynamicData = aggregationData?.orderstats.totalRevenueOvertime;

  const dates = dynamicData.map((entry) => new Date(entry._id.date).getTime());

  const chartData = {
    series: [
      {
        name: "Total Revenue",
        data: dynamicData.map((entry) => entry.totalRevenue),
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
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
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      yaxis: {
        labels: {
          formatter: (val) => (val / 1000).toFixed(0) + "K",
        },
        title: {
          text: "Total Revenue",
        },
      },
      xaxis: {
        type: "datetime",
        categories: dates,
      },
      tooltip: {
        shared: false,
        y: {
          formatter: (val) => "$" + (val / 1000).toFixed(0) + "K",
        },
      },
    },
  };

  return (
    <div>
      <h2 className="px-2 flex font-bold">Total Revenue Overtime </h2>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};

export default RevenueStats;
