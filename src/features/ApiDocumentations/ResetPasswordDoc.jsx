/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function ResetPasswordDoc({ serverUrl }) {
  const codeSnippet = `
    export async function resetPassword(resetData) {
      const requestData = { ...resetData };
      const url = \`${serverUrl}user/reset_password/:token\`;
    
      try {
        const response = await axios.patch(url, requestData, {
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
      <div className="flex items-center gap-3 font-medium">
        <span className="text-violet-500">PATCH</span>
        <span className="text-gray-700">Reset User Password</span>
      </div>

      <button className="bg-white flex items-center mt-3 rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <span className="text-sm">{`${serverUrl}/user/resetpassword/:token`}</span>
      </button>

      <p className="text-gray-700 mt-3">
        This endpoint is used to reset the password for a user. The HTTP PATCH
        request is sent to the specified user email address with the user's
        unique reset password token. The request should include a JSON payload
        in the raw request body type with the keys "password" and
        "passwordConfirm" to set the new password and confirm the new password.
      </p>

      <ul className="mb-6 list-inside list-disc text-gray-500 text-base md:mb-8">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>password (string): The new password for the user.</li>
        <li>passwordConfirm (string): Confirmation of the new password.</li>
      </ul>

      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default ResetPasswordDoc;
