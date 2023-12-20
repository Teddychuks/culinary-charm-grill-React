/* eslint-disable react/prop-types */

function getCategoryColor(category) {
  switch (category) {
    case "appetizer":
      return "text-yellow-500 bg-yellow-100/60";
    case "pizza":
      return "text-red-500 bg-red-100/60";
    case "maincourse":
      return "text-blue-500 bg-blue-100/60";
    case "cocktail":
      return "text-purple-500 bg-purple-100/60";
    default:
      return "text-gray-500 bg-gray-100/60";
  }
}

function TableRow({ currentData }) {
  return (
    <>
      {currentData.map((menuItem) => (
        <tr key={menuItem.itemId}>
          <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            <div>
              <h2 className="font-medium text-gray-800">{menuItem.name}</h2>
            </div>
          </td>
          <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
            <div
              className={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 ${getCategoryColor(
                menuItem.category
              )}`}
            >
              {menuItem.category}
            </div>
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div>
              <h4 className="text-gray-700">{menuItem.quantity}</h4>
            </div>
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="flex items-center">
              <p>${menuItem.price}</p>
            </div>
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <p>${menuItem.itemTotalPrice}</p>
          </td>
          <td className="px-4 py-4 text-sm whitespace-nowrap">
            <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60">
              completed
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}

export default TableRow;
