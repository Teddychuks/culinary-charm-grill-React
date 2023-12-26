/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import CodeSnippet from "../../ui/CodeSnippets";

function SignUpDoc({ serverUrl }) {
  const codeSnippet = `
    export async function signUpUser(userData) {
      const requestData = { ...userData };
    
      try {
        const response = await axios.post(\`${serverUrl}user/signup\`, requestData, {
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
        <span className="text-gray-700">Signup users</span>
      </div>
      <button className="bg-white flex items-center text-xs w-64 mt-3 rounded-lg text-gray-700 hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
        <span className="flex-grow flex-shrink-0 overflow-hidden">{`${serverUrl}user/signup`}</span>
      </button>
      <p className="text-gray-700 mt-3 text-sm">
        This endpoint allows users to sign up by providing their name, email,
        password, and password confirmation.
      </p>
      <ul className="mb-6 list-inside list-disc text-gray-500  md:mb-8 text-sm">
        <span className="font-bold text-red-400 p-3"> Request Body:</span>
        <li>name (string, required): The name of the user.</li>
        <li>email (string, required): The email address of the user</li>
        <li>password (string, required): The user's chosen password</li>
        <li>
          passwordConfirm (string, required): Confirmation of the user's chosen
          password.
        </li>
      </ul>
      <CodeSnippet code={codeSnippet} />
    </div>
  );
}

export default SignUpDoc;
