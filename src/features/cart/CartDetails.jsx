import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { HiCheck, HiOutlineMinusSm, HiPlusSm } from "react-icons/hi";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
  clearCart,
  resetSelectedItemId,
} from "./cartSlice";
import { serverUrl } from "../../services/server";
import { useCreateNewOrder } from "../../hooks/useCreateOrder";
import LoginSpinner from "../../ui/LoginSpinner";

// Selector to get the cart items from the state
const selectCartItems = (state) => state.cart.cart;

// Selector to calculate the total cart price
const getTotalCartPrice = createSelector([selectCartItems], (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
});

function CartDetails() {
  const { isPending, handleCreateNewOrder } = useCreateNewOrder();

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalCartPrice = useSelector(getTotalCartPrice);

  // Memoize the cart items
  const memoizedCartItems = useMemo(() => cartItems, [cartItems]);

  // Memoize the total cart price
  const memoizedTotalCartPrice = useMemo(
    () => totalCartPrice,
    [totalCartPrice]
  );

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleDeleteItem = (itemId) => {
    dispatch(deleteItem(itemId));
  };

  const calculateItemTotal = (item) => {
    return item.quantity * item.price;
  };

  const handleCheckout = () => {
    if (memoizedCartItems.length === 0) {
      return;
    }
    const itemsToOrder = memoizedCartItems.map(({ _id, quantity }) => ({
      itemId: _id,
      quantity,
    }));

    handleCreateNewOrder({ menu: itemsToOrder });
    clearCart();
    dispatch(resetSelectedItemId());
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 min-h-screen">
      <div className="mx-auto max-w-screen-lg px-4 md:px-8">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Your Cart
          </h2>
        </div>

        {memoizedCartItems.map((item) => (
          <div
            key={item._id}
            className="mb-5 flex flex-col sm:mb-8 sm:divide-y sm:border-t sm:border-b"
          >
            <div className="py-5 sm:py-8">
              <div className="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6">
                <div className="sm:-my-2.5">
                  <a
                    href="#"
                    className="group relative block h-40 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-56 sm:w-40"
                  >
                    <img
                      src={`${serverUrl}${item.photo}`}
                      alt={item.name}
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </a>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <a
                      href="#"
                      className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      {item.name}
                    </a>

                    <span className="block text-gray-500">
                      Preparation Time: {item.preparationTime}
                    </span>
                    <span className="block text-gray-500">Calories: 50</span>
                  </div>

                  <div>
                    <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                      {item.price}
                    </span>

                    <span className="flex items-center gap-1 text-sm text-gray-500">
                      <HiCheck className="h-5 w-5 text-green-500" />
                      In stock
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-between border-t pt-4 sm:w-auto sm:border-none sm:pt-0">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex  ">
                      <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg ">
                        <div className="flex items-center gap-x-1.5">
                          <button
                            type="button"
                            onClick={() => handleDecreaseQuantity(item._id)}
                            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                          >
                            <HiOutlineMinusSm />
                          </button>
                          <input
                            className="p-0 w-6 bg-transparent border-0 text-gray-800 text-center focus:ring-0"
                            type="text"
                            value={item.quantity}
                            onChange={() => {}}
                          />
                          <button
                            type="button"
                            onClick={() => handleIncreaseQuantity(item._id)}
                            className="w-6 h-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                          >
                            <HiPlusSm />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(item._id)}
                      className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="ml-4 pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                    <span className="block font-bold text-gray-800 md:text-lg">
                      ${calculateItemTotal(item).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col items-end gap-4">
          <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
            <div className="mt-4 border-t pt-4">
              <div className="flex items-start justify-between gap-4 text-gray-800">
                <span className="text-lg font-bold">Total</span>

                <span className="flex flex-col items-end">
                  <span className="text-lg font-bold">
                    ${memoizedTotalCartPrice} USD
                  </span>
                  <span className="text-sm text-gray-500">including VAT</span>
                </span>
              </div>
            </div>
          </div>

          <button
            className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            onClick={handleCheckout}
          >
            {isPending ? <LoginSpinner /> : "Check out"}
          </button>

          <button
            className="inline-block rounded-lg bg-red-500 px-6 py-3 text-center text-sm font-semibold text-white outline-none ring-red-300 transition duration-100 hover:bg-red-600 focus-visible:ring active:bg-red-700 md:text-base"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
