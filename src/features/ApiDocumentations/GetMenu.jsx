/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function GetMenu({ serverUrl }) {
  const filterOptions = "appetizer";

  const apiUrl = `${serverUrl}menu/${filterOptions}/:id`;

  return (
    <div>
      <div className="flex items-center gap-3 font-medium text-sm">
        <span className="text-green-500">GET</span>
        <span className="text-gray-700">Get Menu Item</span>
      </div>
      <button className="bg-white flex w-full md:w-64 items-center mt-3 text-xs sm:text-sm rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 overflow-hidden whitespace-normal">
        <span className="flex-grow flex-shrink-0 overflow-hidden">
          {apiUrl}
        </span>
      </button>
      <p className="text-gray-700 mt-3 text-sm">
        This HTTP GET request retrieves details of a specific
        (appetizer,maincourse,pizza,cocktail) menu item identified by the
        provided ID. The request does not contain a request body.
      </p>
      <p className="text-gray-700 mt-3 text-sm">
        The response will have a status code of 200, and it will include the
        details of the menu item in the JSON format. The response will contain
        the item's ID, type, name, description, price, quantity, preparation
        time, calories, photo, average ratings, and ratings quantity.
      </p>
      <CodeSnippet
        code={`
          export async function getMenu(filter, itemId) {
            const url = "${serverUrl}menu/${filterOptions}:id";
          
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

export default GetMenu;
