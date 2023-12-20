import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useMenu } from "../hooks/useMenu";
import { serverUrl } from "../services/server";
import { getSelectedItemId, addItem } from "../features/cart/cartSlice";
import Reviews from "./Reviews";
import Button from "../ui/Button";
import { useMoveBack } from "../hooks/useMoveBack";
import ReviewStar from "../ui/ReviewStar";

function ProductDetails() {
  const { filter, itemId } = useParams();
  const { isFetching, menuDetail } = useMenu(filter, itemId);

  const selectedItemId = useSelector(getSelectedItemId);
  const dispatch = useDispatch();
  const moveback = useMoveBack();

  if (isFetching) {
    return <p>Loading...</p>;
  }

  const menu = menuDetail.data?.menuItem;

  if (!menu) {
    return <p>Menu item not found.</p>;
  }

  const validate = selectedItemId === menu._id;

  const handleAddToCart = (menuItem) => {
    dispatch(addItem(menuItem));
  };

  <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
    Check out
  </button>;
  return (
    <section className="text-gray-600 body-font overflow-hidden min-h-screen">
      <div className="container px-5 py-7 mx-auto">
        <h2 className="text-2xl text-center text-gray-900 font-bold mb-8">
          Menu Details
        </h2>

        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="commerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
            src={`${serverUrl}${menu.photo}`}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-2xl title-font font-medium mb-1">
              {menu.name}
            </h1>
            <div className="flex mb-4 items-center">
              <ReviewStar ratingsAverage={menu.ratingsAverage} />
              <span className="px-2 text-red-500">{menu.ratingsAverage}</span>/
              <span className="text-gray-600 ml-3 flex gap-1">
                <span className="text-red-500">{menu.ratingsQuantity} </span>
                <span className="font-bold">Reviews</span>
              </span>
            </div>

            <p className="leading-relaxed">{menu.description}</p>
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-1 font-bold">Time:</span>
                <p className="text-red-500">{menu.preparationTime}</p>
              </div>
              <div className="flex ml-6 items-center gap-1">
                <span className="mr-3"></span>
                <div className="relative font-bold">Calories:</div>
                <p className="text-red-500">{menu.calories}</p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <span className="font-medium text-2xl text-red-500">
                ${menu.price}
              </span>
              <Button onClick={moveback}>Back</Button>
              <button
                className={`flex ml-auto px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 ${
                  validate
                    ? "bg-gray-500 opacity-50 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-yellow-500"
                }`}
                disabled={validate}
                onClick={() => handleAddToCart(menu)}
              >
                {validate ? "Added to Cart" : "Add to Cart"}
              </button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-red-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Reviews ratingsAverage={menu.ratingsAverage} />
    </section>
  );
}

export default ProductDetails;
