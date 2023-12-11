/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { useLogout } from "../authentication/useAuth";
import LoginSpinner from "../ui/LoginSpinner";
import { Link } from "react-router-dom";

function Header({ setOpen }) {
  const { isPending, logout } = useLogout();

  const cart = useSelector((state) => state.cart.cart);

  // Calculate the count of unique item IDs
  const selectedItemsCount = new Set(cart.map((item) => item._id)).size;

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64">
      <nav
        className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
        aria-label="Global"
      >
        <div className=" flex items-center me-5 lg:me-0 lg:hidden">
          <img src="logo.png" alt="logo" className="w-10 h-10" />
          <a
            className="italic flex-none text-base font-semibold dark:text-dark"
            href="#"
            aria-label="CulinaryCharm Grill"
          >
            CulinaryCharm Grill
          </a>
        </div>

        <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <div className="sm:hidden">
            <button
              type="button"
              className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none "
              onClick={() => {
                setOpen((prevOpen) => !prevOpen);
              }}
            >
              <FaBars />
            </button>
          </div>

          <div className="hidden sm:block">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="relative ">
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-4">
                <svg
                  className="flex-shrink-0 h-4 w-4 text-sky-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                type="text"
                id="icon"
                name="icon"
                className="py-2 px-4 ps-11 block w-full bg-sky-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring "
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <div className="relative inline-block">
              <button
                type="button"
                className="relative inline-flex justify-center items-center h-[3rem] w-[3.1rem] text-sm font-semibold  bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <Link to="/cart" className="relative">
                  <img src="trolley.png" alt="trolley" className="w-7 h-7" />
                </Link>
                {selectedItemsCount ? (
                  <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white">
                    {selectedItemsCount}
                  </span>
                ) : (
                  ""
                )}
              </button>
            </div>

            <button
              type="button"
              className="py-2 px-2 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
              onClick={logout}
            >
              {isPending ? <LoginSpinner /> : "logout"}
            </button>
            <button
              type="button"
              className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            >
              <img
                className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-sky-200"
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                alt="Image Description"
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
