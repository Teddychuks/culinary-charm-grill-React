/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function ForgotPasswordDoc({ serverUrl }) {
  const codeSnippet = `
    export async function forgotPassword(email) {
      const requestData = { email };
      const url = \`${serverUrl}user/forgotPassword\`;
    
      try {
        const response = await axios.post(url, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
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
        <span className="text-gray-700">Forgot Password</span>
      </div>

      <button className="bg-white flex items-center text-xs mt-3 w-64 rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <span className="">{`${serverUrl}user/forgotPassword`}</span>
      </button>

      <p className="text-gray-700 text-sm mt-3">
        This endpoint is used to initiate the process of resetting a user's
        password by sending a reset link to the provided email address.
      </p>

      <ul className="mb-6 list-inside list-disc text-sm text-gray-500  md:mb-8">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>status (string): The status of the request.</li>
        <li>
          message (string): A message related to the status of the request.
        </li>
      </ul>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default ForgotPasswordDoc;
