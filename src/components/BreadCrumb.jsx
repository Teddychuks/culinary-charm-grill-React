import { FaAngleRight, FaHouse } from "react-icons/fa6";

function BreadCrumb() {
  return (
    <div className="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden ">
      <div className="flex items-center py-4">
        <ol
          className="ms-3 flex items-center whitespace-nowrap"
          aria-label="Breadcrumb"
        >
          <li className="flex items-center text-sm text-gray-800 dark:text-sky-400">
            <FaHouse className="flex-shrink-0 mx-3 overflow-visible h-3 w-3 text-gray-400 dark:text-gray-600" />
            Home
            <FaAngleRight className="flex-shrink-0 mx-3 overflow-visible h-3 w-3 text-gray-400 dark:text-gray-600" />
          </li>
          <li
            className="text-sm font-semibold text-gray-800 truncate dark:text-sky-600"
            aria-current="page"
          >
            Menu
          </li>
        </ol>
      </div>
    </div>
  );
}

export default BreadCrumb;
