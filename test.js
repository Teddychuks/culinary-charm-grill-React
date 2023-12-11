import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa6";
import { useMenu } from "./useMenu";
import { addItem } from "./cart/cartSlice";
import { serverUrl } from "../services/server";

import CustomSelect from "../components/CustomSelect";
import CardSkeleton from "../ui/CardSkeleton";

function truncateDescription(description, wordLimit) {
  const words = description.split(" ");

  if (words.length > wordLimit) {
    const truncatedDescription = words.slice(0, wordLimit).join(" ");
    return `${truncatedDescription} more...`;
  }

  return description;
}

const MenuDetails = () => {
  const navigate = useNavigate();
  const [selectedFilterOption, setSelectedFilterOption] = useState("appetizer");
  const [selectedSortedOption, setSelectedSortedOption] = useState("");
  const { isLoading, allMenu, refetch } = useMenu(
    selectedFilterOption,
    selectedSortedOption
  );

  const dispatch = useDispatch();

  const selectCart = (state) => state.cart.cart;
  const selectedItemIds = useSelector((state) =>
    selectCart(state).map((item) => item._id)
  );

  const selectedItems = useMemo(() => selectedItemIds, [selectedItemIds]);

  const handleAddToCart = (menuItem) => {
    dispatch(addItem(menuItem));
  };

  const filterOptions = [
    { value: "appetizer", label: "Appetizers" },
    { value: "pizza", label: "Pizza" },
    { value: "maincourse", label: "Main Course" },
    { value: "cocktail", label: "Cocktails" },
  ];

  const sortOptions = [
    { value: "-price", label: "Price: Ascending" },
    { value: "price", label: "Price: Descending" },
    { value: "-ratingsAverage", label: "Ratings: Ascending" },
    { value: "ratingsAverage", label: "Ratings: Descending" },
  ];

  const handleFilterChange = (selectedValue) => {
    setSelectedFilterOption(selectedValue);
    navigate(`?filter=${selectedValue}`);
  };

  const handleSortChange = (selectedValue) => {
    setSelectedSortedOption(selectedValue);
    navigate(`?filter=${selectedFilterOption}&sort=${selectedValue}`);
    refetch();
  };

  if (isLoading || !allMenu.data) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className="p-6">
            <CardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2 py-3">
        <CustomSelect
          options={filterOptions}
          onSelectChange={handleFilterChange}
          selectedOption={selectedFilterOption}
          icon={FaFilter}
        />
        <CustomSelect
          options={sortOptions}
          onSelectChange={handleSortChange}
          selectedOption={selectedSortedOption}
          icon={FaSort}
          placeholder="sort..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {allMenu.data.menuItems.map((menuItem) => (
          <div
            className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 "
            key={menuItem._id}
          >
            <img
              className="w-1/3 object-cover"
              src={`${serverUrl}${menuItem.photo}`}
              alt={menuItem.name}
            />

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="text-xl font-bold text-gray-800  flex flex-wrap">
                {menuItem.name}
              </h1>

              <p className="mt-2 text-sm text-gray-600 ">
                {truncateDescription(menuItem.description, 12)}
              </p>

              <div className="flex mt-2 item-center">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {Array.from({ length: 5 }, (_, index) => (
                    <svg
                      key={index}
                      style={{
                        fill:
                          index < Math.round(menuItem.ratingsAverage)
                            ? "currentColor"
                            : "gray",
                      }}
                      className="w-4 h-4 text-yellow-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 20"
                      role="img"
                      aria-label={`Star ${index + 1}`}
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
                  {menuItem.ratingsAverage}
                </span>
              </div>

              <div className="flex justify-between mt-3 item-center">
                <h1 className="text-lg font-bold text-gray-700 md:text-xl">
                  ${menuItem.price}
                </h1>
                <button
                  className={`px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform ${
                    selectedItems.includes(menuItem._id)
                      ? "bg-gray-500 opacity-50 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-yellow-500"
                  } rounded`}
                  onClick={() => handleAddToCart(menuItem)}
                  disabled={selectedItems.includes(menuItem._id)}
                >
                  {selectedItems.includes(menuItem._id)
                    ? "Added to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuDetails;



import { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiCheck, HiOutlineMinusSm, HiPlusSm } from "react-icons/hi";
import { getTotalCartPrice } from "./cartSlice";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteItem,
} from "./cartSlice";
import { serverUrl } from "../../services/server";

function CartDetails() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
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

          <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartDetails;
