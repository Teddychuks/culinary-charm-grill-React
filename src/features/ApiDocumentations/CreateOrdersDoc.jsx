/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function CreateOrdersDoc({ serverUrl }) {
  const codeSnippet = `
    export async function createNewOrder(menu) {
      const authToken = localStorage.getItem("token");
    
      try {
        const response = await axios.post(\`${serverUrl}orders/create\`, menu, {
          headers: {
            "Content-Type": "application/json",
            Authorization: \`Bearer \${authToken}\`,

          },
        });
        return response.data;
      } catch (error) {
        throw new Error(error);
      }
    }
  `;

  return (
    <div>
      <div className="flex items-center gap-3 font-medium text-sm">
        <span className="text-yellow-500">POST</span>
        <span className="text-gray-700">Create New Order</span>
      </div>
      <button className="bg-white flex w-full md:w-64 items-center mt-3 text-xs sm:text-sm rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 overflow-hidden whitespace-normal">
        <span className="flex-grow flex-shrink-0 overflow-hidden">{`${serverUrl}orders/create`}</span>
      </button>

      <p className="text-gray-700 mt-3 text-sm">
        This endpoint allows you to create a new order.
      </p>

      <ul className="mb-6 text-sm list-inside list-disc text-gray-500  md:mb-8">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>itemId (string, required): The ID of the item.</li>
        <li>quantity (number, required): The quantity of the item.</li>
      </ul>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default CreateOrdersDoc;
