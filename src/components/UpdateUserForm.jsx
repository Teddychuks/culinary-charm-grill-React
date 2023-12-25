/* eslint-disable react/prop-types */

import { useState } from "react";
import { useUpdateUser } from "../hooks/useUpdateUser";
import LoginSpinner from "../ui/LoginSpinner";

const UpdateUserInfoForm = ({
  id,
  label,
  value,
  onChange,
  disabled,
  autoComplete,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={id === "email" ? "email" : "text"}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
          required
        />
      </div>
    </div>
  );
};

function UpdateUserForm() {
  const { isPending, handleUpdateUser } = useUpdateUser();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) return;
    handleUpdateUser(
      { email, name },
      {
        onSettled: () => {
          setEmail("");
          setName("");
        },
      }
    );
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Update User Information
            </h1>
          </div>

          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <UpdateUserInfoForm
                  id="email"
                  label="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                />

                <UpdateUserInfoForm
                  id="name"
                  label="Name"
                  autoComplete="name" // Corrected autoComplete value
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                />

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  {isPending ? <LoginSpinner /> : " Update Information "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUserForm;
