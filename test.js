/* eslint-disable react/prop-types */
function TableRow({ userOrder }) {
  return (
    <>
      {userOrder.orders.map((order) =>
        order.menu.map((menuItem) => (
          <tr key={menuItem.id}>
            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
              <div>
                <h2 className="font-medium text-gray-800">{menuItem.name}</h2>
              </div>
            </td>
            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
              <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60">
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
              <div className="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60">
                {order.status}
              </div>
            </td>
          </tr>
        ))
      )}
    </>
  );
}

export default TableRow;
