/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { FaBars } from "react-icons/fa";
import { useLogout, useUser } from "../authentication/useAuth";
import LoginSpinner from "../ui/LoginSpinner";
import { Link } from "react-router-dom";

import "../index.css";
import { serverUrl } from "../services/server";

function Header({ setOpen }) {
  const { isPending, logout } = useLogout();
  const { isLoading, user } = useUser();

  const cart = useSelector((state) => state.cart.cart);

  // Calculate the count of unique item IDs
  const selectedItemsCount = new Set(cart.map((item) => item._id)).size;

  if (isLoading) {
    return <LoginSpinner />;
  }

  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:ps-64">
      <nav
        className="flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8"
        aria-label="Global"
      >
        <div className=" flex items-center me-5 lg:me-0 lg:hidden">
          <Link
            className="italic flex-none text-base font-semibold   text-blue-500"
            aria-label="CulinaryCharm Grill"
            to="/"
          >
            CulinaryCharm Grill
          </Link>
        </div>

        <div className="w-full flex items-center justify-end ms-auto sm:justify-between sm:gap-x-3 sm:order-3">
          <div className="sm:hidden">
            <button
              type="button"
              className="w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none ml-5"
              onClick={() => {
                setOpen((prevOpen) => !prevOpen);
              }}
            >
              <FaBars />
            </button>
          </div>

          <div className="hidden sm:block font-semibold italic text-base text-blue-500">
            <p>Culinary Charm Grill</p>
          </div>

          <div className="flex flex-row items-center justify-end gap-2">
            <div className="relative inline-block">
              <Link to="/cart" className="relative">
                <button
                  type="button"
                  className="relative inline-flex justify-center items-center h-[3rem] w-[3.1rem] text-sm font-semibold  bg-white text-gray-800  hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none "
                >
                  <img
                    src={`${serverUrl}${"trolley.png"}`}
                    alt="trolley"
                    className="w-7 h-7"
                  />
                  {selectedItemsCount ? (
                    <span
                      style={{
                        animation:
                          "ping 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                        transformOrigin: "center",
                        transform: "scale(1.5)",
                      }}
                      className="animate-ping absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-sm font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white"
                    >
                      {selectedItemsCount}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </Link>
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
              <div className="relative">
                <img
                  className="inline-block h-[2.375rem] w-[2.375rem] rounded-full ring-2 ring-sky-200"
                  src={`${serverUrl}${user?.photo}`}
                  alt="User Profile"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-1 ring-white"></span>
              </div>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
