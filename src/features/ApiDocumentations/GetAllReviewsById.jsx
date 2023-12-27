/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function GetAllReviewsById({ serverUrl }) {
  const codeSnippet = `
    export async function getAllReviewsById() {
        const authToken = localStorage.getItem("token");
        const url = ${serverUrl}menu/appetizer/:id
      
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
      <div className="flex items-center gap-3 font-medium text-sm">
        <span className="text-green-500">GET</span>
        <span className="text-gray-700">Get All Reviews On Menu Item</span>
      </div>
      <button className="bg-white flex w-full md:items-center mt-3 text-xs sm:text-sm rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 overflow-hidden whitespace-normal">
        <span className="flex-wrap overflow-hidden ">
          {serverUrl}menu/appetizer/:id
        </span>
      </button>
      <p className="text-gray-700 mt-3 text-sm">
        This endpoint retrieves the reviews for a specific menu item id. The
        request does not require a request body, use the url params to pass the
        id .
      </p>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default GetAllReviewsById;
