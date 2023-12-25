/* eslint-disable react/prop-types */

function RevenueCard({ title, currentDate, totalRevenue, icon, currency }) {
  return (
    <article className="border border-gray-100 bg-white p-6 shadow-md rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title} {currentDate}
          </p>

          <p className="text-2xl font-medium text-gray-900">
            {currency}
            {totalRevenue}
          </p>
        </div>

        <span className="rounded-full bg-blue-100 p-3 text-blue-600 ">
          {icon}
        </span>
      </div>
    </article>
  );
}

export default RevenueCard;
