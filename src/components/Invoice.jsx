import { useLocation } from "react-router-dom";

const Invoice = () => {
  const { state } = useLocation();

  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const formattedDate = `${currentDate
    .getDate()
    .toString()
    .padStart(2, "0")}/${(currentDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${currentDate.getFullYear()}`;

  if (!state || !state.orderData.data) {
    return null;
  }
  const orderData = state?.orderData.data;

  return (
    <div className="bg-gray-50 min-h-screen py-5">
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl ">
            <div className="flex justify-between">
              <div>
                <img src={`brand.png`} className="w-10 h-10" alt="" />
                <h1 className="italic mt-2 text-lg md:text-xl font-semibold text-blue-600 ">
                  CulinaryCharm Grill
                </h1>
              </div>
              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">3682303</span>
                <address className="mt-4 not-italic text-gray-800">
                  Jedidiah Estate
                  <br />
                  Centenary
                  <br />
                  Enugu City
                  <br />
                  Enugu State
                  <br />
                </address>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 ">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800 ">
                  {orderData?.username}
                </h3>
              </div>
              <div className="sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">
                      {formattedDate}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    name
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    quantity
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    price
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>
                <div className="hidden sm:block border-b border-gray-200"></div>

                {orderData?.menu.map((menuItem) => (
                  <div
                    key={menuItem.itemId}
                    className="grid grid-cols-3 sm:grid-cols-5 gap-2"
                  >
                    <div className="col-span-full sm:col-span-2">
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Item
                      </h5>
                      <p className="font-medium text-gray-800">
                        {menuItem.name}
                      </p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Qty
                      </h5>
                      <p className="text-gray-800">{menuItem.quantity}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Rate
                      </h5>
                      <p className="text-gray-800">${menuItem.price}</p>
                    </div>
                    <div>
                      <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                        Amount
                      </h5>
                      <p className="sm:text-end text-gray-800">
                        ${menuItem.itemTotalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-red-500">
                      $ {orderData.sumTotalPrice}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800 ">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  thaddeuschuks@gmail.com
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  +234-81-331-18163
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">
              © {currentYear} CulinaryCharm Grill.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
