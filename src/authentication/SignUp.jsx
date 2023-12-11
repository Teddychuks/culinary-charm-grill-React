/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignUpUser } from "./useAuth";
import LoginSpinner from "../ui/LoginSpinner";

const SignUp = () => {
  const { handleSignUp, isPending } = useSignUpUser();
  const { register, formState, getValues, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    handleSignUp(data);
  }

  return (
    <section className="bg-white">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex justify-between lg:items-center lg:gap-12">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="bg-white w-96 p-8 rounded-md shadow-lg border">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Sign Up</h2>
            <p className="text-gray-600 mb-6">
              Nice to meet you! Enter your details to register.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  disabled={isPending}
                  placeholder="Teddy chuks"
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors?.name ? "border-red-500" : ""
                  }`}
                  {...register("name", { required: "This field is required" })}
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  autoComplete="email"
                  disabled={isPending}
                  placeholder="Teddychuks@example.com"
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors?.email ? "border-red-500" : ""
                  }`}
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please provide a valid email address ",
                    },
                  })}
                />
                {errors?.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="username"
                  disabled={isPending}
                  placeholder="********"
                  className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors?.name ? "border-red-500" : ""
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
                  htmlFor="passwordConfirm"
                  className="block mb-2 text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  autoComplete="confirm-password"
                  disabled={isPending}
                  placeholder="********"
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

              <button
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                type="submit"
              >
                {isPending ? <LoginSpinner /> : "Sign in"}
              </button>
            </form>
            <p className="mt-4 text-gray-600">
              Already have an account?
              <Link to="/sign_in" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            className=" w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover "
            src="/signup.jpg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
