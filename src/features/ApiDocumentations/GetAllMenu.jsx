/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function GetAllMenu({ serverUrl }) {
  const filterOptions = "appetizer";

  const apiUrl = `${serverUrl}menu/${filterOptions}`;

  return (
    <div>
      <div className="flex items-center gap-3 font-medium text-sm">
        <span className="text-green-500">GET</span>
        <span className="text-gray-700">Get All Menu Items</span>
      </div>
      <button className="bg-white text-xs flex items-center mt-3 w-64 rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <span className="">{apiUrl}</span>
      </button>
      <p className="text-gray-700 mt-3 text-sm">
        This endpoint retrieves the list of appetizers, pizzas, main courses,
        and cocktails menu items.
      </p>
      <p className="text-gray-700 mt-3 text-sm">
        The response will have a status code of 200, and the body will contain
        an array of menu items. Each item includes details such as type, name,
        description, price, quantity, preparation time, calories, photo, average
        ratings, and ratings quantity.
      </p>
      <CodeSnippet
        code={`
          export async function getAllMenu(filterOptions, sortOption) {
            const url = "${apiUrl}";
            
            try {
              const response = await axios.get(url);
              return response.data;
            } catch (error) {
              throw new Error(error);
            }
          }
        `}
      />
    </div>
  );
}

export default GetAllMenu;
