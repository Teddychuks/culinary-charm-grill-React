/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function UpdatePasswordDoc({ serverUrl }) {
  const codeSnippet = `
    export async function changePassword(updateData) {
      const authToken = localStorage.getItem("token");
      const requestData = { ...updateData };
    
      try {
        const response = await axios.patch(\`${serverUrl}user/updatemypassword\`, requestData, {
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
        <span className="text-violet-500">PATCH</span>
        <span className="text-gray-700">Change User Password</span>
      </div>

      <button className="bg-white flex w-full md:w-64 items-center mt-3 text-xs sm:text-sm rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 overflow-hidden whitespace-normal">
        <span className="flex-grow flex-shrink-0 overflow-hidden">{`${serverUrl}user/updatemypassword`}</span>
      </button>

      <p className="text-gray-700 mt-3 text-sm">
        This endpoint allows the user to update their password via an HTTP PATCH
        request. The request should include a JSON payload with the keys
        passwordCurrent, password, and passwordConfirm to update the user's
        password.
      </p>

      <ul className="mb-6 list-inside list-disc text-gray-500  md:mb-8 text-sm">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>passwordCurrent (string): The user's current password.</li>
        <li>password (string): The new password to be set.</li>
        <li>passwordConfirm (string): Confirmation of the new password.</li>
      </ul>

      <p className="text-gray-700 mt-3 text-sm">
        Upon a successful update, the endpoint returns a status code of 200
        along with a JSON response containing the updated user data.
      </p>
      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default UpdatePasswordDoc;
