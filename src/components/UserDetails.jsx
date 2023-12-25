import ChangePasswordForm from "../authentication/ChangePasswordForm";
import { useUser } from "../authentication/useAuth";
import { serverUrl } from "../services/server";
import LoginSpinner from "../ui/LoginSpinner";
import UpdateUserForm from "./UpdateUserForm";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useState } from "react";

function UserDetails() {
  const { isPending, handleUpdateUser } = useUpdateUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoading, user } = useUser();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      handleUpdateUser({ photo: selectedFile });
    }
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-contain lg:block lg:w-2/5"
          style={{
            backgroundImage: `url(${serverUrl}/usersettings.jpg)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="flex items-center w-full  lg:w-3/5 shadow-lg border">
          <div className="w-full">
            <div className="px-9 ">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
                User Settings
              </h1>
              {isLoading ? (
                <LoginSpinner />
              ) : (
                <>
                  <p className="mt-4 text-gray-500">{user?.name}</p>
                  <p className="mt-4 text-gray-500">{user?.email}</p>
                </>
              )}

              <div className="mt-6">
                <div>
                  <p className="block text-sm text-gray-500">
                    Upload Profile Photo
                  </p>
                </div>

                {isPending ? (
                  <LoginSpinner />
                ) : (
                  <>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="block px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full  dark:text-gray-300 placeholder-gray-400/70  focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 "
                    />
                    <button
                      onClick={handleUpload}
                      className="mt-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Upload
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <UpdateUserForm className="shadow-lg" />
              <ChangePasswordForm className="shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserDetails;
