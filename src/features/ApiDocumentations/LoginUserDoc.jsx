/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function LoginUserDoc({ serverUrl }) {
  const codeSnippet = `
    export async function signInUser(userData) {
      const requestData = { ...userData };
    
      try {
        const response = await axios.post(\`${serverUrl}user/login\`, requestData, {
          headers: {
            "Content-Type": "application/json",
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
        <span className="text-gray-700">Login In Users</span>
      </div>

      <button className="bg-white flex w-full md:items-center mt-3 text-xs sm:text-sm rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5 overflow-hidden whitespace-normal">
        <span className="flex-wrap overflow-hidden ">{`${serverUrl}user/login`}</span>
      </button>

      <p className="text-gray-700 mt-3 text-sm">
        This endpoint allows users to log in via HTTP POST request to{" "}
        {serverUrl}
        user/login. The request should include a raw body with the user's email
        and password.
      </p>

      <ul className="mb-6 list-inside list-disc text-gray-500  md:mb-8 text-sm">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>email (string): The user's email</li>
        <li>password (string): The user's password</li>
      </ul>

      <p className="text-gray-700 mt-3 text-sm">
        Upon a successful request, the server will respond with a status code of
        200 and a JSON object containing the status, a token for authentication,
        and user data including the user's ID, name, email, photo, and role.
      </p>
      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default LoginUserDoc;
