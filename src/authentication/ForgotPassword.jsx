import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "./useAuth";
import LoginSpinner from "../ui/LoginSpinner";

function ForgotPassword() {
  const { isPending, handleForgotPassword } = useForgotPassword();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    if (!data || !data.email) {
      return;
    }
    handleForgotPassword(data);
  }

  return (
    <section className="bg-white p-8 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="w-full max-w-md mx-auto p-6 mt-7 bg-white border rounded-xl shadow-lg">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800">
                Forgot password?
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Remember your password?
                <Link
                  className="text-blue-600 decoration-2 hover:underline font-medium"
                  to="/sign_in"
                >
                  Sign in here
                </Link>
              </p>
            </div>

            <div className="mt-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 ${
                          errors?.email ? "border-red-500" : ""
                        }`}
                        {...register("email", {
                          required: "This field is required",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Please provide a valid email address",
                          },
                        })}
                      />
                      {errors?.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                      <div className="hidden absolute inset-y-0 end-0 items-center pointer-events-none pe-3">
                        <svg
                          className="h-5 w-5 text-red-500"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-xs text-red-600 mt-2" id="email-error">
                      Please include a valid email address,check your email spam
                      for reset link
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {isPending ? <LoginSpinner /> : "Forgot Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="relative w-full mt-8 lg:w-1/2 lg:mt-0">
          <img
            className="w-full lg:h-[32rem] h-80 md:h-96 rounded-lg object-cover"
            src="/forgotpassword.jpg"
            alt="Forgot Password Illustration"
          />
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
