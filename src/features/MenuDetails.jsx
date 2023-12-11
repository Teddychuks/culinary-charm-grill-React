import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa6";
import { useMenu } from "./useMenu";
import { addItem } from "./cart/cartSlice";
import { serverUrl } from "../services/server";
import { createSelector } from "reselect";

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
// Selector to get the cart items from the state
const selectCartItems = (state) => state.cart.cart;

// Selector to get the selected item ids
const selectSelectedItemIds = createSelector([selectCartItems], (cartItems) =>
  cartItems.map((item) => item._id)
);

const MenuDetails = () => {
  const navigate = useNavigate();
  const [selectedFilterOption, setSelectedFilterOption] = useState("appetizer");
  const [selectedSortedOption, setSelectedSortedOption] = useState("");
  const { isLoading, allMenu, refetch } = useMenu(
    selectedFilterOption,
    selectedSortedOption
  );

  const dispatch = useDispatch();

  // Memoized selectors
  const selectedItemIds = useSelector(selectSelectedItemIds);

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
