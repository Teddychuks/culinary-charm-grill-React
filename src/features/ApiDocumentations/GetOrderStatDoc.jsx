/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function GetOrderStatDoc({ serverUrl }) {
  const codeSnippet = `
    export async function getMenuStats() {
        const authToken = localStorage.getItem("token");
        const url = ${serverUrl}orders/statistics
      
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
      <div className="flex items-center gap-3 font-medium  text-sm">
        <span className="text-green-500">GET</span>
        <span className="text-gray-700">Get Order Statistics</span>
      </div>
      <button className="bg-white text-xs flex items-center w-64 mt-3 rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <span className="text-sm">${serverUrl}orders/statistics</span>
      </button>
      <p className="text-gray-700 mt-3 text-sm">
        This endpoint retrieves statistics related to orders.
      </p>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default GetOrderStatDoc;
