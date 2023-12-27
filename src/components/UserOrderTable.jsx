import { HiArrowSmallLeft, HiArrowSmallRight } from "react-icons/hi2";
import { useState } from "react";

import { useUserOrder } from "../hooks/useUserOrders";
import { useUser } from "../authentication/useAuth";
import TableRow from "../ui/Table ui/TableRow";
import TableHeader from "../ui/Table ui/TableHeader";
import TableFooter from "../ui/Table ui/TableFooter";
import TableButton from "../ui/Table ui/TableButton";
import Spinner from "../ui/Spinner";

function UserOrderTable() {
  const { isLoading, userOrder } = useUserOrder();
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading || !userOrder) {
    return <Spinner />;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const flattenedData = userOrder.orders.flatMap((order) => order.menu);
  const totalResults = flattenedData.length;
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Extract the values to get the final aggregated data
  const aggregatedDataById = flattenedData.reduce((accumulator, item) => {
    const itemId = item.itemId;

    if (!accumulator[itemId]) {
      accumulator[itemId] = { ...item, count: 1 }; // Add a count property for multiple occurrences
    } else {
      accumulator[itemId].count += 1;
      // Add logic here if you want to accumulate other properties or perform other actions
    }

    return accumulator;
  }, {});

  const currentData = Object.values(aggregatedDataById).slice(
    startIndex,
    endIndex
  );

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <section className="container px-4 mx-auto min-h-screen overflow-hidden">
      <p className="mt-">Your order history: {user.name} </p>

      <div className="flex flex-col mt-6 overflow-hidden">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 ">
              <table className="min-w-full divide-y divide-gray-200 ">
                <thead className="bg-gray-50">
                  <TableHeader />
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  <TableRow isLoading={isLoading} currentData={currentData} />
                </tbody>
              </table>

              <TableFooter>
                <div>
                  <p className="text-sm text-gray-600 flex gap-2">
                    <span className="font-semibold text-gray-800">
                      {startIndex + 1}-{Math.min(endIndex, totalResults)}
                    </span>
                    <span>of {totalResults} results</span>
                  </p>
                </div>

                <div>
                  <div className="inline-flex gap-x-2">
                    <TableButton
                      type="footerbutton"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <HiArrowSmallLeft />
                      Prev
                    </TableButton>

                    <TableButton
                      type="footerbutton"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <HiArrowSmallRight />
                      Next
                    </TableButton>
                  </div>
                </div>
              </TableFooter>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserOrderTable;
