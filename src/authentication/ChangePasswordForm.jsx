/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import { useChangePassword } from "./useAuth";
import LoginSpinner from "../ui/LoginSpinner";
import { HiMiniEye } from "react-icons/hi2";
import { useState } from "react";

function ChangePasswordForm() {
  const { isPending, handleChangePassword } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    handleChangePassword(data);
    reset();
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Change Password
            </h1>
          </div>

          <div className="mt-5">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <div className="relative">
                  <label
                    htmlFor="passwordCurrent"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Current Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="passwordCurrent"
                    id="passwordCurrent"
                    autoComplete="current-password"
                    disabled={isPending}
                    placeholder="********"
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      errors?.passwordCurrent ? "border-red-500" : ""
                    }`}
                    {...register("passwordCurrent", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                  />
                  {errors?.passwordCurrent && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passwordCurrent.message}
                    </p>
                  )}
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-7"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <HiMiniEye className="h-4 w-4 text-gray-400" />
                    ) : (
                      <HiMiniEye className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    disabled={isPending}
                    placeholder="********"
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      errors?.password ? "border-red-500" : ""
                    }`}
                    {...register("password", {
                      required: "This field is required",
                      minLength: {
                        value: 8,
                        message: "Password needs a minimum of 8 characters",
                      },
                    })}
                  />
                  {errors?.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-7"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <HiMiniEye className="h-4 w-4 text-gray-400" />
                    ) : (
                      <HiMiniEye className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="passwordConfirm"
                    className="block mb-2 text-sm text-gray-600"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="passwordConfirm"
                    id="passwordConfirm"
                    autoComplete="new-password"
                    disabled={isPending}
                    placeholder="********"
                    className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                      errors?.passwordConfirm ? "border-red-500" : ""
                    }`}
                    {...register("passwordConfirm", {
                      required: "This field is required",
                      validate: (value) =>
                        value === getValues().password ||
                        "Passwords need to match",
                    })}
                  />
                  {errors?.passwordConfirm && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.passwordConfirm.message}
                    </p>
                  )}
                  <div
                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-7"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <HiMiniEye className="h-4 w-4 text-gray-400" />
                    ) : (
                      <HiMiniEye className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  {isPending ? <LoginSpinner /> : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordForm;
