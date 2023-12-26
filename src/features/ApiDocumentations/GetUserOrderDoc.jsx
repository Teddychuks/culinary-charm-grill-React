/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function GetUserOrderStatDoc({ serverUrl }) {
  const codeSnippet = `
    export async function getMenuStats() {
        const authToken = localStorage.getItem("token");
        const url = ${serverUrl}orders/user-orders
      
        try {
          const response = await axios.get(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: \`Bearer \${authToken}\`,
            }
          });
          return response.data;
        } catch (error) {
          throw new Error(error);
        }
      }
  `;

  return (
    <div>
      <div className="flex items-center gap-3 font-medium text-sm ">
        <span className="text-green-500">GET</span>
        <span className="text-gray-700">Get User Order Statistics</span>
      </div>
      <button className="bg-white flex items-center mt-3 text-xs w-64 rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <span className="flex-grow flex-shrink-0 overflow-hidden">
          {serverUrl}orders/statistics
        </span>
      </button>
      <p className="text-gray-700 mt-3 text-sm">
        This endpoint retrieves the orders placed by the user.The response will
        have a status code of 200, and it will include an array of orders with
        details such as order ID, username, order status, total price, creation
        date, and menu items with their respective details like item ID,
        category, name, price, quantity, and item total price.
      </p>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default GetUserOrderStatDoc;
