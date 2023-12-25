/* eslint-disable react/prop-types */
import { IoBarChartOutline } from "react-icons/io5";
import { FaMoneyBill } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";

import MenuStats from "./MenuStats";
import RevenueCard from "../../ui/RevenueCard";
import { useAggregation } from "../../hooks/useCharts";
import Spinner from "../../ui/Spinner";

function MenuAnalytics() {
  const { isFetching, aggregationData } = useAggregation();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isFetching) {
    return <Spinner />;
  }

  const testTotalRevenue = (
    aggregationData?.orderstats?.totalRevenue.map(
      (item) => item.totalRevenueNow
    )[0] || ""
  ).toLocaleString();

  const averageOrderValue = aggregationData?.orderstats?.averageOrderValue.map(
    (item) => item.averageOrderValue
  );

  const topCustomer =
    aggregationData?.orderstats?.topCustomers.map((item) => item._id)[0] || "";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 space-y-3">
      <div className="flex-col space-y-5 overflow-hidden mt-2 shadow-md rounded-lg ">
        <RevenueCard
          title="Total Revenue as at"
          currentDate={currentDate}
          currency={"$"}
          totalRevenue={testTotalRevenue}
          icon={<FaMoneyBill />}
        />
        <RevenueCard
          title="Average Order Value"
          currency={"$"}
          totalRevenue={averageOrderValue}
          icon={<IoBarChartOutline />}
        />
        <RevenueCard
          title="Top Customer"
          totalRevenue={topCustomer}
          icon={<FaUserLarge />}
        />
      </div>

      <div className="col-span-2 bg-white p-4 shadow-md rounded-lg overflow-hidden border">
        <MenuStats />
      </div>
    </div>
  );
}

export default MenuAnalytics;
