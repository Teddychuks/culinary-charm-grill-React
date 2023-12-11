import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

import { useResetPassword } from "./useAuth";
import LoginSpinner from "../ui/LoginSpinner";

const ResetPassword = () => {
  const { isPending, handleResetPassword } = useResetPassword();
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  const { token } = useParams();

  function onSubmit(data) {
    handleResetPassword({ token, resetData: data });
  }
  return (
    <section className="bg-white p-8 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex items-center justify-between lg:items-center lg:gap-12">
        <div className="w-full max-w-md mx-auto p-6 mt-7 bg-white border rounded-xl shadow-lg">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Reset password
              </h1>
            </div>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600 "
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                placeholder="********"
                disabled={isPending}
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
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm text-gray-600 "
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                autoComplete="new-password-confirm"
                placeholder="********"
                disabled={isPending}
                className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                  errors?.confirmPassword ? "border-red-500" : ""
                }`}
                {...register("passwordConfirm", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues().password ||
                    "passwords needs to match",
                })}
              />
              {errors?.passwordConfirm && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.passwordConfirm.message}
                </p>
              )}
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {isPending ? <LoginSpinner /> : "Reset Password"}
              </button>
            </div>
          </form>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover"
            src="/resetpassword.jpg"
            alt="Reset Password"
          />
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
