import MenuAnalytics from "./MenuAnalytics";
import CustomersStats from "./CustomersStats";
import PopularMenuStats from "./PopularMenuStats";
import QuantityStats from "./QuantityStats";
import RevenueStats from "./RevenueStats";

function ChartEngine() {
  return (
    <div className="p-3">
      <MenuAnalytics />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7 ">
        <div className=" bg-white p-4 shadow-md rounded-lg overflow-hidden border">
          <PopularMenuStats />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden border">
          <RevenueStats />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg  overflow-hidden border">
          <CustomersStats />
        </div>
        <div className="bg-white p-4 shadow-md rounded-lg overflow-hidden border">
          <QuantityStats />
        </div>
      </div>
    </div>
  );
}

export default ChartEngine;
