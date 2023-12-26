/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function CreateNewReviewsDoc({ serverUrl }) {
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
      <div className="flex items-center text-sm gap-3 font-medium">
        <span className="text-yellow-500">POST</span>
        <span className="text-gray-700">Create New Reviews</span>
      </div>

      <button className="bg-white flex w-full md:w-64 items-center mt-3 text-xs sm:text-sm rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 overflow-hidden">
        {`${serverUrl}menu/appetizer/:id/reviews`}
      </button>

      <p className="text-gray-700 mt-3 text-sm">
        This endpoint allows users to submit reviews for a specific menu items
      </p>

      <ul className="mb-6 list-inside list-disc text-gray-500 text-sm md:mb-8">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>menu (string): The ID of the menu item.</li>
        <li>rating (number): The rating given by the user.</li>
        <li>review (string): The review content.</li>
      </ul>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default CreateNewReviewsDoc;
